import "./BlobEvent";
if (!window.AudioContext) {
    window.AudioContext = window.webkitAudioContext;
}
function createWorker(fn) {
    var js = fn
        .toString()
        .replace(/^function\s*\(\)\s*{/, '')
        .replace(/}$/, '');
    var blob = new Blob([js]);
    return new Worker(URL.createObjectURL(blob));
}
var MediaRecorder = /** @class */ (function () {
    function MediaRecorder(stream) {
        var _this = this;
        this.state = 'inactive';
        this.mimeType = 'audio/wav';
        this.slicing = 0;
        this.input = null;
        this.processor = null;
        this.stream = stream;
        this.em = document.createDocumentFragment();
        this.encoder = createWorker(MediaRecorder.encoder);
        this.encoder.addEventListener('message', function (e) {
            var event = new Event('dataavailable');
            event.data = new Blob([e.data], { type: _this.mimeType });
            _this.em.dispatchEvent(event);
            if (_this.state === 'inactive') {
                _this.em.dispatchEvent(new Event('stop'));
            }
        });
    }
    MediaRecorder.prototype.start = function (timeslice) {
        if (this.state === 'inactive') {
            this.state = 'recording';
            this.context = new AudioContext();
            this.input = this.context.createMediaStreamSource(this.stream);
            this.processor = this.context.createScriptProcessor(2048, 1, 1);
            var recorder_1 = this;
            this.processor.onaudioprocess = function (e) {
                if (recorder_1.state === 'recording') {
                    recorder_1.encoder.postMessage([
                        'encode', e.inputBuffer.getChannelData(0)
                    ]);
                }
            };
            this.input.connect(this.processor);
            this.processor.connect(this.context.destination);
            this.em.dispatchEvent(new Event('start'));
            if (timeslice) {
                this.slicing = window.setInterval(function () {
                    if (recorder_1.state === 'recording')
                        recorder_1.requestData();
                }, timeslice);
            }
        }
    };
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
    MediaRecorder.prototype.stop = function () {
        if (this.state !== 'inactive') {
            this.requestData();
            this.state = 'inactive';
            clearInterval(this.slicing);
            this.slicing = 0;
            if (this.input) {
                this.input.disconnect();
                this.input = null;
            }
            if (this.processor) {
                this.processor.disconnect();
                this.processor = null;
            }
            if (this.context) {
                this.context.close();
                this.context = null;
            }
        }
    };
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
    MediaRecorder.prototype.pause = function () {
        if (this.state === 'recording') {
            this.state = 'paused';
            this.em.dispatchEvent(new Event('pause'));
        }
    };
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
    MediaRecorder.prototype.resume = function () {
        if (this.state === 'paused') {
            this.state = 'recording';
            this.em.dispatchEvent(new Event('resume'));
        }
    };
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
    MediaRecorder.prototype.requestData = function () {
        if (this.state !== 'inactive') {
            this.encoder.postMessage(['dump', this.context.sampleRate]);
        }
    };
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
    MediaRecorder.prototype.addEventListener = function (type, listener) {
        this.em.addEventListener(type, listener.bind(this));
    };
    MediaRecorder.prototype.removeEventListener = function (type, listener) {
        this.em.removeEventListener(type, listener.bind(this));
    };
    /**
     * Returns `true` if the MIME type specified is one the polyfill can record.
     *
     * This polyfill supports only `audio/wav`.
     *
     * @param {string} mimeType The mimeType to check.
     *
     * @return {boolean} `true` on `audio/wav` MIME type.
     */
    MediaRecorder.isTypeSupported = function (mimeType) {
        return /audio\/wave?/.test(mimeType);
    };
    MediaRecorder.notSupported = !navigator.mediaDevices || !AudioContext;
    MediaRecorder.encoder = require('./wave-encoder');
    return MediaRecorder;
}());
export default MediaRecorder;
//# sourceMappingURL=MediaRecorder.js.map