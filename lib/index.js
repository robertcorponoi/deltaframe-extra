'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Options = _interopRequireDefault(require("./options/Options"));

var _TaskManager = _interopRequireDefault(require("./tasks/TaskManager"));

var _RequestAnimationFrame = _interopRequireDefault(require("./raf/RequestAnimationFrame"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Deltaframe Extra Extra is deltaframe but with extra features.
 */
var DeltaframeExtra =
/*#__PURE__*/
function () {
  /**
   * A reference to the options for this instance of Deltaframe Extra Extra.
   * 
   * @private
   * 
   * @property {Options}
   */

  /**
   * The amount of times Deltaframe Extra Extra has had to restart due to the average fps dipping below the minimum fps for a 
   * series of frames.
   * 
   * @private
   * 
   * @property {number}
   */

  /**
   * Indicates whether Deltaframe Extra Extra is currently is currently running and not pausedor stopped.
   * 
   * @private
   * 
   * @property {boolean}
   */

  /**
   * Indicates whether Deltaframe Extra Extra is currently paused.
   * 
   * @private
   * 
   * @property {boolean}
   */

  /**
   * The function that will be called on every Deltaframe Extra Extra update.
   * 
   * @private
   * 
   * @property {Function}
   */

  /**
   * The current frame that Deltaframe Extra Extra is on.
   * 
   * @private
   * 
   * @property {number}
   */

  /**
   * The current timestamp as of the latest call to RequestAnimationFrame.
   * 
   * @private
   * 
   * @property {DOMHighResTimeStamp|number}
   */

  /**
   * The timestamp before the current timestamp.
   * 
   * @private
   * 
   * @property {DOMHighResTimeStamp|number}
   */

  /**
   * The difference in time between the current time and the last time.
   * 
   * @private
   * 
   * @property {number}
   */

  /**
   * The average difference in time between frames.
   * 
   * @private
   * 
   * @property {number}
   */

  /**
   * A set of up to 10 recent previous delta values that are used to get the mean delta.
   * 
   * @private
   * 
   * @property {Array<number>}
   */

  /**
   * Since we only want to go up to 10 on the deltaHistory, we keep track of what index we're  on so we can reset to 0 once were at 10.
   * 
   * @private
   * 
   * @property {number}
   */

  /**
   * Initialize the RequestAnimationFrame abstraction module.
   * 
   * @private
   * 
   * @property {RequestAnimationFrame}
   */

  /**
   * Use the version of hidden that's supported by the user's browser.
   * 
   * @private
   * 
   * @property {document.hidden}
   */

  /**
   * A reference to the task manager.
   * 
   * @private
   * 
   * @property {TaskManager}
   */

  /**
   * @param {Object} [options] The options to pass to this Deltaframe Extra instance.
   * @param {number} [options.minFps=15] The minimum fps value allowed before Deltaframe Extra will restart to try to correct the issue.
   * @param {number} [options.targetFps=60] The fps that Deltaframe Extra should aim to achieve.
   * @param {number} [options.maxRestartAttempts=Infinity] The number of times Deltaframe Extra will restart due to problems before stopping entirely.
   * @param {number} [options.runTime=Infinity] The length of time that this instance of Deltaframe Extra will run. This can be used to create an animation that lasts a specific amount of time.
   * @param {boolean} [options.forceSetTimeout=false] If set to true, Deltaframe Extra will use setTimeout for the loop instead of requestAnimationFrame.
   */
  function DeltaframeExtra(options) {
    _classCallCheck(this, DeltaframeExtra);

    _defineProperty(this, "_options", void 0);

    _defineProperty(this, "_restartAttempts", void 0);

    _defineProperty(this, "_running", void 0);

    _defineProperty(this, "_paused", void 0);

    _defineProperty(this, "_fn", void 0);

    _defineProperty(this, "_frame", void 0);

    _defineProperty(this, "_time", void 0);

    _defineProperty(this, "_prevTime", void 0);

    _defineProperty(this, "_delta", void 0);

    _defineProperty(this, "_deltaAverage", void 0);

    _defineProperty(this, "_deltaHistory", void 0);

    _defineProperty(this, "_deltaIndex", void 0);

    _defineProperty(this, "_raf", void 0);

    _defineProperty(this, "_hidden", void 0);

    _defineProperty(this, "_tasks", new _TaskManager["default"]());

    this._options = new _Options["default"](options);
    this._restartAttempts = 0;
    this._running = false;
    this._paused = false;

    this._fn = function () {};

    this._frame = 0;
    this._time = 0;
    this._prevTime = 0;
    this._delta = 0;
    this._deltaAverage = 0;
    this._deltaHistory = [];
    this._deltaIndex = 0;
    this._raf = new _RequestAnimationFrame["default"]();
    this._hidden = document.hidden;

    this._boot();
  }
  /**
   * Return the number of times that Deltafram has restarted.
   * 
   * @returns {number}
   */


  _createClass(DeltaframeExtra, [{
    key: "start",

    /**
     * Start the loop.
     * 
     * @param {Function} fn The function to be called every step by the loop.
     */
    value: function start(fn) {
      var _this = this;

      this._fn = fn;
      this._prevTime = 0;
      this._running = true;

      this._raf.start(function (timestamp) {
        return _this._update(timestamp);
      }, this._options.forceSetTimeout);
    }
    /**
     * Pause the loop operation saving the state to be resumed at a later time.
     */

  }, {
    key: "pause",
    value: function pause() {
      this._paused = true;
      this._running = false;
    }
    /**
     * Resume the loop from a paused state.
     */

  }, {
    key: "resume",
    value: function resume() {
      this._paused = false;
      this._prevTime = window.performance.now();
      this._running = true;
    }
    /**
     * Stop the loop and reset all time values of Deltaframe Extra.
     */

  }, {
    key: "stop",
    value: function stop() {
      var _this2 = this;

      this._restartAttempts = 0;
      this._running = false;
      this._paused = false;

      this._fn = function () {};

      this._frame = 0;
      this._time = 0;
      this._prevTime = 0;
      this._delta = 0;
      this._deltaHistory = [];
      this._deltaIndex = 0;
      document.removeEventListener('visibilitychange', function () {
        return _this2._visibilityChange;
      });

      this._raf.stop();

      return;
    }
    /**
     * Initialize the page visibility events which will let us save resources by pausing our updates when the user is not 
     * interacting with the page running Deltaframe Extra.
     * 
     * @private
     */

  }, {
    key: "_boot",
    value: function _boot() {
      var _this3 = this;

      document.addEventListener("visibilitychange", function () {
        return _this3._visibilityChange();
      });
    }
    /**
     * Update is called whenever requestAnimationFrame decides it can process the next step of the loop  or roughly 60 
     * times per second using setTimeout.
     * 
     * @private
     * 
     * @param {DOMHighResTimeStamp|number} timestamp The timestamp as returned from requestAnimationFrame.
     */

  }, {
    key: "_update",
    value: function _update(timestamp) {
      if (this._paused) return;

      if (timestamp >= this._options.runTime) {
        this.stop();
        return;
      }

      this._time = timestamp;
      this._delta = timestamp - this._prevTime;
      if (this._deltaIndex === 10) this._deltaIndex = 0;
      this._deltaHistory[this._deltaIndex] = this._delta;
      this._deltaIndex++;
      var mean = 0;

      for (var i = 0; i < this._deltaHistory.length; ++i) {
        mean += this._deltaHistory[i];
      }

      mean /= 10;
      this._deltaAverage = mean;

      if (this._deltaAverage >= this._options.minFpsCalc) {
        if (this._restartAttempts === this._options.maxRestartAttempts) {
          this.stop();
          return;
        }

        this._raf.restart();

        this._restartAttempts++;
      }

      if (this._deltaAverage >= this._options.targetFpsCalc) {
        this._frame++;

        this._fn(timestamp, this._delta, this._deltaAverage);

        if (this._tasks.active.length > 0) this._tasks.update(this.time);
        this._prevTime = timestamp;
      }
    }
    /**
     * When the the user has switched to a different tab and is not on the same page that Deltaframe Extra is running on, Deltaframe Extra 
     * will pause and when the user comes back it will resume.
     * 
     * @private
     */

  }, {
    key: "_visibilityChange",
    value: function _visibilityChange() {
      var visibility = document.visibilityState;
      if (this.isPaused && visibility === 'visible') this.resume();else if (this.isRunning && visibility === 'hidden') this.pause();
    }
  }, {
    key: "timesRestarted",
    get: function get() {
      return this._restartAttempts;
    }
    /**
     * Returns if Deltaframe Extra is running or not.
     * 
     * @returns {boolean}
     */

  }, {
    key: "isRunning",
    get: function get() {
      return this._running;
    }
    /**
     * Returns if Deltaframe Extra is paused or not.
     * 
     * @returns {boolean}
     */

  }, {
    key: "isPaused",
    get: function get() {
      return this._paused;
    }
    /**
     * Returns the current frame.
     * 
     * @returns {number}
     */

  }, {
    key: "frame",
    get: function get() {
      return this._frame;
    }
    /**
     * Returns the current time.
     * 
     * @returns {DOMHighResTimeStamp|number}
     */

  }, {
    key: "time",
    get: function get() {
      return this._time;
    }
    /**
     * Returns a reference to the task manager.
     * 
     * @returns {TaskManager}
     */

  }, {
    key: "tasks",
    get: function get() {
      return this._tasks;
    }
  }]);

  return DeltaframeExtra;
}();

exports["default"] = DeltaframeExtra;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJEZWx0YWZyYW1lRXh0cmEiLCJvcHRpb25zIiwiVGFza01hbmFnZXIiLCJfb3B0aW9ucyIsIk9wdGlvbnMiLCJfcmVzdGFydEF0dGVtcHRzIiwiX3J1bm5pbmciLCJfcGF1c2VkIiwiX2ZuIiwiX2ZyYW1lIiwiX3RpbWUiLCJfcHJldlRpbWUiLCJfZGVsdGEiLCJfZGVsdGFBdmVyYWdlIiwiX2RlbHRhSGlzdG9yeSIsIl9kZWx0YUluZGV4IiwiX3JhZiIsIlJlcXVlc3RBbmltYXRpb25GcmFtZSIsIl9oaWRkZW4iLCJkb2N1bWVudCIsImhpZGRlbiIsIl9ib290IiwiZm4iLCJzdGFydCIsInRpbWVzdGFtcCIsIl91cGRhdGUiLCJmb3JjZVNldFRpbWVvdXQiLCJ3aW5kb3ciLCJwZXJmb3JtYW5jZSIsIm5vdyIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJfdmlzaWJpbGl0eUNoYW5nZSIsInN0b3AiLCJhZGRFdmVudExpc3RlbmVyIiwicnVuVGltZSIsIm1lYW4iLCJpIiwibGVuZ3RoIiwibWluRnBzQ2FsYyIsIm1heFJlc3RhcnRBdHRlbXB0cyIsInJlc3RhcnQiLCJ0YXJnZXRGcHNDYWxjIiwiX3Rhc2tzIiwiYWN0aXZlIiwidXBkYXRlIiwidGltZSIsInZpc2liaWxpdHkiLCJ2aXNpYmlsaXR5U3RhdGUiLCJpc1BhdXNlZCIsInJlc3VtZSIsImlzUnVubmluZyIsInBhdXNlIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQUVBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQTs7O0lBR3FCQSxlOzs7QUFDbkI7Ozs7Ozs7O0FBU0E7Ozs7Ozs7OztBQVVBOzs7Ozs7OztBQVNBOzs7Ozs7OztBQVNBOzs7Ozs7OztBQVNBOzs7Ozs7OztBQVNBOzs7Ozs7OztBQVNBOzs7Ozs7OztBQVNBOzs7Ozs7OztBQVNBOzs7Ozs7OztBQVNBOzs7Ozs7OztBQVNBOzs7Ozs7OztBQVNBOzs7Ozs7OztBQVNBOzs7Ozs7OztB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QyxTQUFMLEdBQWlCYSxTQUFqQjtBQUNEO0FBQ0Y7QUFFRDs7Ozs7Ozs7O3dDQU00QjtBQUMxQixVQUFNc0IsVUFBVSxHQUFHM0IsUUFBUSxDQUFDNEIsZUFBNUI7QUFFQSxVQUFJLEtBQUtDLFFBQUwsSUFBaUJGLFVBQVUsS0FBSyxTQUFwQyxFQUErQyxLQUFLRyxNQUFMLEdBQS9DLEtBQ0ssSUFBSSxLQUFLQyxTQUFMLElBQWtCSixVQUFVLEtBQUssUUFBckMsRUFBK0MsS0FBS0ssS0FBTDtBQUNyRDs7O3dCQXRMNEI7QUFBRSxhQUFPLEtBQUs5QyxnQkFBWjtBQUErQjtBQUU5RDs7Ozs7Ozs7d0JBS3lCO0FBQUUsYUFBTyxLQUFLQyxRQUFaO0FBQXVCO0FBRWxEOzs7Ozs7Ozt3QkFLd0I7QUFBRSxhQUFPLEtBQUtDLE9BQVo7QUFBc0I7QUFFaEQ7Ozs7Ozs7O3dCQUtvQjtBQUFFLGFBQU8sS0FBS0UsTUFBWjtBQUFxQjtBQUUzQzs7Ozs7Ozs7d0JBSzJDO0FBQUUsYUFBTyxLQUFLQyxLQUFaO0FBQW9CO0FBRWpFOzs7Ozs7Ozt3QkFLeUI7QUFBRSxhQUFPLEtBQUtnQyxNQUFaO0FBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXHJcblxyXG5pbXBvcnQgT3B0aW9ucyBmcm9tICcuL29wdGlvbnMvT3B0aW9ucyc7XHJcbmltcG9ydCBUYXNrTWFuYWdlciBmcm9tICcuL3Rhc2tzL1Rhc2tNYW5hZ2VyJztcclxuaW1wb3J0IFJlcXVlc3RBbmltYXRpb25GcmFtZSBmcm9tICcuL3JhZi9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUnO1xyXG5cclxuLyoqXHJcbiAqIERlbHRhZnJhbWUgRXh0cmEgRXh0cmEgaXMgZGVsdGFmcmFtZSBidXQgd2l0aCBleHRyYSBmZWF0dXJlcy5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERlbHRhZnJhbWVFeHRyYSB7XHJcbiAgLyoqXHJcbiAgICogQSByZWZlcmVuY2UgdG8gdGhlIG9wdGlvbnMgZm9yIHRoaXMgaW5zdGFuY2Ugb2YgRGVsdGFmcmFtZSBFeHRyYSBFeHRyYS5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7T3B0aW9uc31cclxuICAgKi9cclxuICBwcml2YXRlIF9vcHRpb25zOiBPcHRpb25zO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgYW1vdW50IG9mIHRpbWVzIERlbHRhZnJhbWUgRXh0cmEgRXh0cmEgaGFzIGhhZCB0byByZXN0YXJ0IGR1ZSB0byB0aGUgYXZlcmFnZSBmcHMgZGlwcGluZyBiZWxvdyB0aGUgbWluaW11bSBmcHMgZm9yIGEgXHJcbiAgICogc2VyaWVzIG9mIGZyYW1lcy5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3Jlc3RhcnRBdHRlbXB0czogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBJbmRpY2F0ZXMgd2hldGhlciBEZWx0YWZyYW1lIEV4dHJhIEV4dHJhIGlzIGN1cnJlbnRseSBpcyBjdXJyZW50bHkgcnVubmluZyBhbmQgbm90IHBhdXNlZG9yIHN0b3BwZWQuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge2Jvb2xlYW59XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfcnVubmluZzogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogSW5kaWNhdGVzIHdoZXRoZXIgRGVsdGFmcmFtZSBFeHRyYSBFeHRyYSBpcyBjdXJyZW50bHkgcGF1c2VkLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtib29sZWFufVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3BhdXNlZDogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGZ1bmN0aW9uIHRoYXQgd2lsbCBiZSBjYWxsZWQgb24gZXZlcnkgRGVsdGFmcmFtZSBFeHRyYSBFeHRyYSB1cGRhdGUuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge0Z1bmN0aW9ufVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2ZuOiBGdW5jdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGN1cnJlbnQgZnJhbWUgdGhhdCBEZWx0YWZyYW1lIEV4dHJhIEV4dHJhIGlzIG9uLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfZnJhbWU6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGN1cnJlbnQgdGltZXN0YW1wIGFzIG9mIHRoZSBsYXRlc3QgY2FsbCB0byBSZXF1ZXN0QW5pbWF0aW9uRnJhbWUuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge0RPTUhpZ2hSZXNUaW1lU3RhbXB8bnVtYmVyfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3RpbWU6IChET01IaWdoUmVzVGltZVN0YW1wIHwgbnVtYmVyKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHRpbWVzdGFtcCBiZWZvcmUgdGhlIGN1cnJlbnQgdGltZXN0YW1wLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtET01IaWdoUmVzVGltZVN0YW1wfG51bWJlcn1cclxuICAgKi9cclxuICBwcml2YXRlIF9wcmV2VGltZTogKERPTUhpZ2hSZXNUaW1lU3RhbXAgfCBudW1iZXIpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgZGlmZmVyZW5jZSBpbiB0aW1lIGJldHdlZW4gdGhlIGN1cnJlbnQgdGltZSBhbmQgdGhlIGxhc3QgdGltZS5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2RlbHRhOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBhdmVyYWdlIGRpZmZlcmVuY2UgaW4gdGltZSBiZXR3ZWVuIGZyYW1lcy5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2RlbHRhQXZlcmFnZTogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBBIHNldCBvZiB1cCB0byAxMCByZWNlbnQgcHJldmlvdXMgZGVsdGEgdmFsdWVzIHRoYXQgYXJlIHVzZWQgdG8gZ2V0IHRoZSBtZWFuIGRlbHRhLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtBcnJheTxudW1iZXI+fVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2RlbHRhSGlzdG9yeTogQXJyYXk8bnVtYmVyPjtcclxuXHJcbiAgLyoqXHJcbiAgICogU2luY2Ugd2Ugb25seSB3YW50IHRvIGdvIHVwIHRvIDEwIG9uIHRoZSBkZWx0YUhpc3RvcnksIHdlIGtlZXAgdHJhY2sgb2Ygd2hhdCBpbmRleCB3ZSdyZSAgb24gc28gd2UgY2FuIHJlc2V0IHRvIDAgb25jZSB3ZXJlIGF0IDEwLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfZGVsdGFJbmRleDogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBJbml0aWFsaXplIHRoZSBSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgYWJzdHJhY3Rpb24gbW9kdWxlLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtSZXF1ZXN0QW5pbWF0aW9uRnJhbWV9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfcmFmOiBSZXF1ZXN0QW5pbWF0aW9uRnJhbWU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0aGUgdmVyc2lvbiBvZiBoaWRkZW4gdGhhdCdzIHN1cHBvcnRlZCBieSB0aGUgdXNlcidzIGJyb3dzZXIuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge2RvY3VtZW50LmhpZGRlbn1cclxuICAgKi9cclxuICBwcml2YXRlIF9oaWRkZW46IE9iamVjdDtcclxuXHJcbiAgLyoqXHJcbiAgICogQSByZWZlcmVuY2UgdG8gdGhlIHRhc2sgbWFuYWdlci5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7VGFza01hbmFnZXJ9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfdGFza3M6IFRhc2tNYW5hZ2VyID0gbmV3IFRhc2tNYW5hZ2VyKCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gVGhlIG9wdGlvbnMgdG8gcGFzcyB0byB0aGlzIERlbHRhZnJhbWUgRXh0cmEgaW5zdGFuY2UuXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm1pbkZwcz0xNV0gVGhlIG1pbmltdW0gZnBzIHZhbHVlIGFsbG93ZWQgYmVmb3JlIERlbHRhZnJhbWUgRXh0cmEgd2lsbCByZXN0YXJ0IHRvIHRyeSB0byBjb3JyZWN0IHRoZSBpc3N1ZS5cclxuICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMudGFyZ2V0RnBzPTYwXSBUaGUgZnBzIHRoYXQgRGVsdGFmcmFtZSBFeHRyYSBzaG91bGQgYWltIHRvIGFjaGlldmUuXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm1heFJlc3RhcnRBdHRlbXB0cz1JbmZpbml0eV0gVGhlIG51bWJlciBvZiB0aW1lcyBEZWx0YWZyYW1lIEV4dHJhIHdpbGwgcmVzdGFydCBkdWUgdG8gcHJvYmxlbXMgYmVmb3JlIHN0b3BwaW5nIGVudGlyZWx5LlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5ydW5UaW1lPUluZmluaXR5XSBUaGUgbGVuZ3RoIG9mIHRpbWUgdGhhdCB0aGlzIGluc3RhbmNlIG9mIERlbHRhZnJhbWUgRXh0cmEgd2lsbCBydW4uIFRoaXMgY2FuIGJlIHVzZWQgdG8gY3JlYXRlIGFuIGFuaW1hdGlvbiB0aGF0IGxhc3RzIGEgc3BlY2lmaWMgYW1vdW50IG9mIHRpbWUuXHJcbiAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5mb3JjZVNldFRpbWVvdXQ9ZmFsc2VdIElmIHNldCB0byB0cnVlLCBEZWx0YWZyYW1lIEV4dHJhIHdpbGwgdXNlIHNldFRpbWVvdXQgZm9yIHRoZSBsb29wIGluc3RlYWQgb2YgcmVxdWVzdEFuaW1hdGlvbkZyYW1lLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM/OiBPYmplY3QpIHtcclxuICAgIHRoaXMuX29wdGlvbnMgPSBuZXcgT3B0aW9ucyhvcHRpb25zKTtcclxuXHJcbiAgICB0aGlzLl9yZXN0YXJ0QXR0ZW1wdHMgPSAwO1xyXG5cclxuICAgIHRoaXMuX3J1bm5pbmcgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLl9wYXVzZWQgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLl9mbiA9ICgpID0+IHsgfTtcclxuXHJcbiAgICB0aGlzLl9mcmFtZSA9IDA7XHJcblxyXG4gICAgdGhpcy5fdGltZSA9IDA7XHJcblxyXG4gICAgdGhpcy5fcHJldlRpbWUgPSAwO1xyXG5cclxuICAgIHRoaXMuX2RlbHRhID0gMDtcclxuXHJcbiAgICB0aGlzLl9kZWx0YUF2ZXJhZ2UgPSAwO1xyXG5cclxuICAgIHRoaXMuX2RlbHRhSGlzdG9yeSA9IFtdO1xyXG5cclxuICAgIHRoaXMuX2RlbHRhSW5kZXggPSAwO1xyXG5cclxuICAgIHRoaXMuX3JhZiA9IG5ldyBSZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKTtcclxuXHJcbiAgICB0aGlzLl9oaWRkZW4gPSBkb2N1bWVudC5oaWRkZW47XHJcblxyXG4gICAgdGhpcy5fYm9vdCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJuIHRoZSBudW1iZXIgb2YgdGltZXMgdGhhdCBEZWx0YWZyYW0gaGFzIHJlc3RhcnRlZC5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIGdldCB0aW1lc1Jlc3RhcnRlZCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fcmVzdGFydEF0dGVtcHRzOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgaWYgRGVsdGFmcmFtZSBFeHRyYSBpcyBydW5uaW5nIG9yIG5vdC5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgKi9cclxuICBnZXQgaXNSdW5uaW5nKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fcnVubmluZzsgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIGlmIERlbHRhZnJhbWUgRXh0cmEgaXMgcGF1c2VkIG9yIG5vdC5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgKi9cclxuICBnZXQgaXNQYXVzZWQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9wYXVzZWQ7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgY3VycmVudCBmcmFtZS5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIGdldCBmcmFtZSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fZnJhbWU7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgY3VycmVudCB0aW1lLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtET01IaWdoUmVzVGltZVN0YW1wfG51bWJlcn1cclxuICAgKi9cclxuICBnZXQgdGltZSgpOiAoRE9NSGlnaFJlc1RpbWVTdGFtcCB8IG51bWJlcikgeyByZXR1cm4gdGhpcy5fdGltZTsgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIGEgcmVmZXJlbmNlIHRvIHRoZSB0YXNrIG1hbmFnZXIuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1Rhc2tNYW5hZ2VyfVxyXG4gICAqL1xyXG4gIGdldCB0YXNrcygpOiBUYXNrTWFuYWdlciB7IHJldHVybiB0aGlzLl90YXNrczsgfVxyXG5cclxuICAvKipcclxuICAgKiBTdGFydCB0aGUgbG9vcC5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIGV2ZXJ5IHN0ZXAgYnkgdGhlIGxvb3AuXHJcbiAgICovXHJcbiAgc3RhcnQoZm46IEZ1bmN0aW9uKSB7XHJcbiAgICB0aGlzLl9mbiA9IGZuO1xyXG5cclxuICAgIHRoaXMuX3ByZXZUaW1lID0gMDtcclxuXHJcbiAgICB0aGlzLl9ydW5uaW5nID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLl9yYWYuc3RhcnQoKHRpbWVzdGFtcDogbnVtYmVyKSA9PiB0aGlzLl91cGRhdGUodGltZXN0YW1wKSwgdGhpcy5fb3B0aW9ucy5mb3JjZVNldFRpbWVvdXQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUGF1c2UgdGhlIGxvb3Agb3BlcmF0aW9uIHNhdmluZyB0aGUgc3RhdGUgdG8gYmUgcmVzdW1lZCBhdCBhIGxhdGVyIHRpbWUuXHJcbiAgICovXHJcbiAgcGF1c2UoKSB7XHJcbiAgICB0aGlzLl9wYXVzZWQgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMuX3J1bm5pbmcgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlc3VtZSB0aGUgbG9vcCBmcm9tIGEgcGF1c2VkIHN0YXRlLlxyXG4gICAqL1xyXG4gIHJlc3VtZSgpIHtcclxuICAgIHRoaXMuX3BhdXNlZCA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuX3ByZXZUaW1lID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpO1xyXG5cclxuICAgIHRoaXMuX3J1bm5pbmcgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RvcCB0aGUgbG9vcCBhbmQgcmVzZXQgYWxsIHRpbWUgdmFsdWVzIG9mIERlbHRhZnJhbWUgRXh0cmEuXHJcbiAgICovXHJcbiAgc3RvcCgpIHtcclxuICAgIHRoaXMuX3Jlc3RhcnRBdHRlbXB0cyA9IDA7XHJcblxyXG4gICAgdGhpcy5fcnVubmluZyA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuX3BhdXNlZCA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuX2ZuID0gKCkgPT4geyB9O1xyXG5cclxuICAgIHRoaXMuX2ZyYW1lID0gMDtcclxuXHJcbiAgICB0aGlzLl90aW1lID0gMDtcclxuXHJcbiAgICB0aGlzLl9wcmV2VGltZSA9IDA7XHJcblxyXG4gICAgdGhpcy5fZGVsdGEgPSAwO1xyXG5cclxuICAgIHRoaXMuX2RlbHRhSGlzdG9yeSA9IFtdO1xyXG5cclxuICAgIHRoaXMuX2RlbHRhSW5kZXggPSAwO1xyXG5cclxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Zpc2liaWxpdHljaGFuZ2UnLCAoKSA9PiB0aGlzLl92aXNpYmlsaXR5Q2hhbmdlKTtcclxuXHJcbiAgICB0aGlzLl9yYWYuc3RvcCgpO1xyXG5cclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEluaXRpYWxpemUgdGhlIHBhZ2UgdmlzaWJpbGl0eSBldmVudHMgd2hpY2ggd2lsbCBsZXQgdXMgc2F2ZSByZXNvdXJjZXMgYnkgcGF1c2luZyBvdXIgdXBkYXRlcyB3aGVuIHRoZSB1c2VyIGlzIG5vdCBcclxuICAgKiBpbnRlcmFjdGluZyB3aXRoIHRoZSBwYWdlIHJ1bm5pbmcgRGVsdGFmcmFtZSBFeHRyYS5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2Jvb3QoKSB7XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidmlzaWJpbGl0eWNoYW5nZVwiLCAoKSA9PiB0aGlzLl92aXNpYmlsaXR5Q2hhbmdlKCkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlIGlzIGNhbGxlZCB3aGVuZXZlciByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgZGVjaWRlcyBpdCBjYW4gcHJvY2VzcyB0aGUgbmV4dCBzdGVwIG9mIHRoZSBsb29wICBvciByb3VnaGx5IDYwIFxyXG4gICAqIHRpbWVzIHBlciBzZWNvbmQgdXNpbmcgc2V0VGltZW91dC5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7RE9NSGlnaFJlc1RpbWVTdGFtcHxudW1iZXJ9IHRpbWVzdGFtcCBUaGUgdGltZXN0YW1wIGFzIHJldHVybmVkIGZyb20gcmVxdWVzdEFuaW1hdGlvbkZyYW1lLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3VwZGF0ZSh0aW1lc3RhbXA6IChET01IaWdoUmVzVGltZVN0YW1wfG51bWJlcikpIHtcclxuICAgIGlmICh0aGlzLl9wYXVzZWQpIHJldHVybjtcclxuXHJcbiAgICBpZiAodGltZXN0YW1wID49IHRoaXMuX29wdGlvbnMucnVuVGltZSkge1xyXG4gICAgICB0aGlzLnN0b3AoKTtcclxuXHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl90aW1lID0gdGltZXN0YW1wO1xyXG5cclxuICAgIHRoaXMuX2RlbHRhID0gdGltZXN0YW1wIC0gdGhpcy5fcHJldlRpbWU7XHJcblxyXG4gICAgaWYgKHRoaXMuX2RlbHRhSW5kZXggPT09IDEwKSB0aGlzLl9kZWx0YUluZGV4ID0gMDtcclxuXHJcbiAgICB0aGlzLl9kZWx0YUhpc3RvcnlbdGhpcy5fZGVsdGFJbmRleF0gPSB0aGlzLl9kZWx0YTtcclxuXHJcbiAgICB0aGlzLl9kZWx0YUluZGV4Kys7XHJcblxyXG4gICAgbGV0IG1lYW4gPSAwO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fZGVsdGFIaXN0b3J5Lmxlbmd0aDsgKytpKSBtZWFuICs9IHRoaXMuX2RlbHRhSGlzdG9yeVtpXTtcclxuXHJcbiAgICBtZWFuIC89IDEwO1xyXG5cclxuICAgIHRoaXMuX2RlbHRhQXZlcmFnZSA9IG1lYW47XHJcblxyXG4gICAgaWYgKHRoaXMuX2RlbHRhQXZlcmFnZSA+PSB0aGlzLl9vcHRpb25zLm1pbkZwc0NhbGMpIHtcclxuICAgICAgaWYgKHRoaXMuX3Jlc3RhcnRBdHRlbXB0cyA9PT0gdGhpcy5fb3B0aW9ucy5tYXhSZXN0YXJ0QXR0ZW1wdHMpIHtcclxuICAgICAgICB0aGlzLnN0b3AoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLl9yYWYucmVzdGFydCgpO1xyXG5cclxuICAgICAgdGhpcy5fcmVzdGFydEF0dGVtcHRzKys7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuX2RlbHRhQXZlcmFnZSA+PSB0aGlzLl9vcHRpb25zLnRhcmdldEZwc0NhbGMpIHtcclxuICAgICAgdGhpcy5fZnJhbWUrKztcclxuXHJcbiAgICAgIHRoaXMuX2ZuKHRpbWVzdGFtcCwgdGhpcy5fZGVsdGEsIHRoaXMuX2RlbHRhQXZlcmFnZSk7XHJcblxyXG4gICAgICBpZiAodGhpcy5fdGFza3MuYWN0aXZlLmxlbmd0aCA+IDApIHRoaXMuX3Rhc2tzLnVwZGF0ZSh0aGlzLnRpbWUpO1xyXG5cclxuICAgICAgdGhpcy5fcHJldlRpbWUgPSB0aW1lc3RhbXA7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIHRoZSB0aGUgdXNlciBoYXMgc3dpdGNoZWQgdG8gYSBkaWZmZXJlbnQgdGFiIGFuZCBpcyBub3Qgb24gdGhlIHNhbWUgcGFnZSB0aGF0IERlbHRhZnJhbWUgRXh0cmEgaXMgcnVubmluZyBvbiwgRGVsdGFmcmFtZSBFeHRyYSBcclxuICAgKiB3aWxsIHBhdXNlIGFuZCB3aGVuIHRoZSB1c2VyIGNvbWVzIGJhY2sgaXQgd2lsbCByZXN1bWUuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIF92aXNpYmlsaXR5Q2hhbmdlKCkge1xyXG4gICAgY29uc3QgdmlzaWJpbGl0eSA9IGRvY3VtZW50LnZpc2liaWxpdHlTdGF0ZTtcclxuXHJcbiAgICBpZiAodGhpcy5pc1BhdXNlZCAmJiB2aXNpYmlsaXR5ID09PSAndmlzaWJsZScpIHRoaXMucmVzdW1lKCk7XHJcbiAgICBlbHNlIGlmICh0aGlzLmlzUnVubmluZyAmJiB2aXNpYmlsaXR5ID09PSAnaGlkZGVuJykgdGhpcy5wYXVzZSgpO1xyXG4gIH1cclxufSJdfQ==