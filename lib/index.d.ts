import TaskManager from './tasks/TaskManager';
/**
 * Deltaframe Extra Extra is deltaframe but with extra features.
 */
export default class DeltaframeExtra {
    /**
     * A reference to the options for this instance of Deltaframe Extra Extra.
     *
     * @private
     *
     * @property {Options}
     */
    private _options;
    /**
     * The amount of times Deltaframe Extra Extra has had to restart due to the average fps dipping below the minimum fps for a
     * series of frames.
     *
     * @private
     *
     * @property {number}
     */
    private _restartAttempts;
    /**
     * Indicates whether Deltaframe Extra Extra is currently is currently running and not pausedor stopped.
     *
     * @private
     *
     * @property {boolean}
     */
    private _running;
    /**
     * Indicates whether Deltaframe Extra Extra is currently paused.
     *
     * @private
     *
     * @property {boolean}
     */
    private _paused;
    /**
     * The function that will be called on every Deltaframe Extra Extra update.
     *
     * @private
     *
     * @property {Function}
     */
    private _fn;
    /**
     * The current frame that Deltaframe Extra Extra is on.
     *
     * @private
     *
     * @property {number}
     */
    private _frame;
    /**
     * The current timestamp as of the latest call to RequestAnimationFrame.
     *
     * @private
     *
     * @property {DOMHighResTimeStamp|number}
     */
    private _time;
    /**
     * The timestamp before the current timestamp.
     *
     * @private
     *
     * @property {DOMHighResTimeStamp|number}
     */
    private _prevTime;
    /**
     * The difference in time between the current time and the last time.
     *
     * @private
     *
     * @property {number}
     */
    private _delta;
    /**
     * The average difference in time between frames.
     *
     * @private
     *
     * @property {number}
     */
    private _deltaAverage;
    /**
     * A set of up to 10 recent previous delta values that are used to get the mean delta.
     *
     * @private
     *
     * @property {Array<number>}
     */
    private _deltaHistory;
    /**
     * Since we only want to go up to 10 on the deltaHistory, we keep track of what index we're  on so we can reset to 0 once were at 10.
     *
     * @private
     *
     * @property {number}
     */
    private _deltaIndex;
    /**
     * Initialize the RequestAnimationFrame abstraction module.
     *
     * @private
     *
     * @property {RequestAnimationFrame}
     */
    private _raf;
    /**
     * Use the version of hidden that's supported by the user's browser.
     *
     * @private
     *
     * @property {document.hidden}
     */
    private _hidden;
    /**
     * A reference to the task manager.
     *
     * @private
     *
     * @property {TaskManager}
     */
    private _tasks;
    /**
     * @param {Object} [options] The options to pass to this Deltaframe Extra instance.
     * @param {number} [options.minFps=15] The minimum fps value allowed before Deltaframe Extra will restart to try to correct the issue.
     * @param {number} [options.targetFps=60] The fps that Deltaframe Extra should aim to achieve.
     * @param {number} [options.maxRestartAttempts=Infinity] The number of times Deltaframe Extra will restart due to problems before stopping entirely.
     * @param {number} [options.runTime=Infinity] The length of time that this instance of Deltaframe Extra will run. This can be used to create an animation that lasts a specific amount of time.
     * @param {boolean} [options.forceSetTimeout=false] If set to true, Deltaframe Extra will use setTimeout for the loop instead of requestAnimationFrame.
     */
    constructor(options?: Object);
    /**
     * Return the number of times that Deltafram has restarted.
     *
     * @returns {number}
     */
    get timesRestarted(): number;
    /**
     * Returns if Deltaframe Extra is running or not.
     *
     * @returns {boolean}
     */
    get isRunning(): boolean;
    /**
     * Returns if Deltaframe Extra is paused or not.
     *
     * @returns {boolean}
     */
    get isPaused(): boolean;
    /**
     * Returns the current frame.
     *
     * @returns {number}
     */
    get frame(): number;
    /**
     * Returns the current time.
     *
     * @returns {DOMHighResTimeStamp|number}
     */
    get time(): (DOMHighResTimeStamp | number);
    /**
     * Returns a reference to the task manager.
     *
     * @returns {TaskManager}
     */
    get tasks(): TaskManager;
    /**
     * Start the loop.
     *
     * @param {Function} fn The function to be called every step by the loop.
     */
    start(fn: Function): void;
    /**
     * Pause the loop operation saving the state to be resumed at a later time.
     */
    pause(): void;
    /**
     * Resume the loop from a paused state.
     */
    resume(): void;
    /**
     * Stop the loop and reset all time values of Deltaframe Extra.
     */
    stop(): void;
    /**
     * Initialize the page visibility events which will let us save resources by pausing our updates when the user is not
     * interacting with the page running Deltaframe Extra.
     *
     * @private
     */
    private _boot;
    /**
     * Update is called whenever requestAnimationFrame decides it can process the next step of the loop  or roughly 60
     * times per second using setTimeout.
     *
     * @private
     *
     * @param {DOMHighResTimeStamp|number} timestamp The timestamp as returned from requestAnimationFrame.
     */
    private _update;
    /**
     * When the the user has switched to a different tab and is not on the same page that Deltaframe Extra is running on, Deltaframe Extra
     * will pause and when the user comes back it will resume.
     *
     * @private
     */
    private _visibilityChange;
}
