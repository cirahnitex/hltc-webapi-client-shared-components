import workerSource from "./wave-encoder-worker";
if(!(window as any).AudioContext) {(window as any).AudioContext = (window as any).webkitAudioContext}
function createWorker (workerSource:string):Worker {
    const blob = new Blob([workerSource]);
    return new Worker(URL.createObjectURL(blob))
}

interface BlobEvent extends Event {
    data: Blob;
    timeCode: number;
}

interface MediaStreamRecorderEvent extends Event {
    error: DOMException;
}
interface MediaRecorderEventMap {
    dataavailable: BlobEvent;
    error: MediaStreamRecorderEvent;
    pause: Event;
    resume: Event;
    start: Event;
    stop: Event;
}


export default class MediaRecorder{
    stream: MediaStream;
    state: 'inactive'|'recording'|'paused' = 'inactive';
    em: DocumentFragment;
    encoder: Worker;
    mimeType: string = 'audio/wav';
    slicing: number = 0;
    input: MediaStreamAudioSourceNode | null = null;
    processor: ScriptProcessorNode | null = null;
    context: AudioContext | null;
    constructor(stream:MediaStream, options?:any) {
        this.stream = stream;
        this.em = document.createDocumentFragment();
        this.encoder = createWorker(workerSource);
        this.encoder.addEventListener('message', (e)=> {
            const event = new Event('dataavailable');
            (event as any).data = new Blob([e.data], { type: this.mimeType });
            this.em.dispatchEvent(event);
            if (this.state === 'inactive') {
                this.em.dispatchEvent(new Event('stop'));
            }
        })
    }
    start (timeslice?:number) {
        if (this.state === 'inactive') {
            this.state = 'recording';

            this.context = new AudioContext();
            this.input = this.context.createMediaStreamSource(this.stream);
            this.processor = this.context.createScriptProcessor(2048, 1, 1);
            const recorder = this;
            this.processor.onaudioprocess = function (e) {
                if (recorder.state === 'recording') {
                    recorder.encoder.postMessage([
                        'encode', e.inputBuffer.getChannelData(0)
                    ])
                }
            };

            this.input.connect(this.processor);
            this.processor.connect(this.context.destination);
            this.em.dispatchEvent(new Event('start'));

            if (timeslice) {
                this.slicing = window.setInterval(function () {
                    if (recorder.state === 'recording') recorder.requestData()
                }, timeslice)
            }
        }
    }
    /**
     * Stop media capture and raise `dataavailable` event with recorded data.
     *
     * @return {undefined}
     *
     * @example
     * finishButton.addEventListener('click', function () {
   *   recorder.stop()
   * })
     */
    stop() {
        if (this.state !== 'inactive') {
            this.requestData();
            this.state = 'inactive';
            clearInterval(this.slicing);
            this.slicing = 0;

            if(this.input) {
                this.input.disconnect();
                this.input = null;
            }
            if(this.processor) {
                this.processor.disconnect();
                this.processor = null;
            }
            if(this.context) {
                this.context.close();
                this.context = null;
            }
        }
    }
    /**
     * Pauses recording of media streams.
     *
     * @return {undefined}
     *
     * @example
     * pauseButton.addEventListener('click', function () {
   *   recorder.pause()
   * })
     */
    pause () {
        if (this.state === 'recording') {
            this.state = 'paused';
            this.em.dispatchEvent(new Event('pause'));
        }
    }
    /**
     * Resumes media recording when it has been previously paused.
     *
     * @return {undefined}
     *
     * @example
     * resumeButton.addEventListener('click', function () {
   *   recorder.resume()
   * })
     */
    resume () {
        if (this.state === 'paused') {
            this.state = 'recording';
            this.em.dispatchEvent(new Event('resume'))
        }
    }
    /**
     * Raise a `dataavailable` event containing the captured media.
     *
     * @return {undefined}
     *
     * @example
     * this.on('nextData', function () {
   *   recorder.requestData()
   * })
     */
    requestData () {
        if (this.state !== 'inactive') {
            this.encoder.postMessage(['dump', this.context!.sampleRate])
        }
    }

    /**
     * Add listener for specified event type.
     *
     * @param {"start"|"stop"|"pause"|"resume"|"dataavailable"} type Event type.
     * @param {function} listener The listener function.
     *
     * @return {undefined}
     *
     * @example
     * recorder.addEventListener('dataavailable', function (e) {
   *   audio.src = URL.createObjectURL(e.data)
   * })
     */
    addEventListener<K extends keyof MediaRecorderEventMap>(type: K, listener: (this: MediaRecorder, ev: MediaRecorderEventMap[K]) => any) {
        this.em.addEventListener(type, listener.bind(this));
    }

    removeEventListener<K extends keyof MediaRecorderEventMap>(type: K, listener: (this: MediaRecorder, ev: MediaRecorderEventMap[K])=>any) {
        this.em.removeEventListener(type, listener.bind(this));
    }

    /**
     * Returns `true` if the MIME type specified is one the polyfill can record.
     *
     * This polyfill supports only `audio/wav`.
     *
     * @param {string} mimeType The mimeType to check.
     *
     * @return {boolean} `true` on `audio/wav` MIME type.
     */
    static isTypeSupported (mimeType:string) {
        return /audio\/wave?/.test(mimeType);
    }

    static notSupported = !navigator.mediaDevices || !AudioContext;

}

