import "./BlobEvent";
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
export default class MediaRecorder {
    stream: MediaStream;
    state: 'inactive' | 'recording' | 'paused';
    em: DocumentFragment;
    encoder: Worker;
    mimeType: string;
    slicing: number;
    input: MediaStreamAudioSourceNode | null;
    processor: ScriptProcessorNode | null;
    context: AudioContext | null;
    constructor(stream: MediaStream);
    start(timeslice?: number): void;
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
    stop(): void;
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
    pause(): void;
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
    resume(): void;
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
    requestData(): void;
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
    addEventListener<K extends keyof MediaRecorderEventMap>(type: K, listener: (this: MediaRecorder, ev: MediaRecorderEventMap[K]) => any): void;
    removeEventListener<K extends keyof MediaRecorderEventMap>(type: K, listener: (this: MediaRecorder, ev: MediaRecorderEventMap[K]) => any): void;
    /**
     * Returns `true` if the MIME type specified is one the polyfill can record.
     *
     * This polyfill supports only `audio/wav`.
     *
     * @param {string} mimeType The mimeType to check.
     *
     * @return {boolean} `true` on `audio/wav` MIME type.
     */
    static isTypeSupported(mimeType: string): boolean;
    static notSupported: boolean;
    static encoder: any;
}
export {};
