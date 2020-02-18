'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Task = _interopRequireDefault(require("./Task"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * The task manager is used to add and manage tasks that are supposed to run at specific times, on repeat, or a 
 * predetermined number of times.
 */
var TaskManager =
/*#__PURE__*/
function () {
  function TaskManager() {
    _classCallCheck(this, TaskManager);

    _defineProperty(this, "_active", []);
  }

  _createClass(TaskManager, [{
    key: "addTask",

    /**
     * Adds a task to the task manager.
     * 
     * @param {string} name The name of the task to add.
     * @param {string} fn The function to call when this task is run.
     * @param {Object} [options]
     * @param {number} [options.interval=1000] Specifies the time in between runs of this task.
     * @param {number} [options.delay=0] An initial delay before running this task for the first time.
     * @param {number} [options.timesToRun=Infinity] Specify this to have the task be destroyed after being run the specified amount of times.
     */
    value: function addTask(name, fn) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var task = new _Task["default"](name, fn, options);

      this._active.push(task);
    }
    /**
     * Removes a task by its name.
     * 
     * @param {string} name The name of the task to remove.
     */

  }, {
    key: "removeTask",
    value: function removeTask(name) {
      this._active = this._active.filter(function (task) {
        return task.name !== name;
      });
    }
    /**
     * Checks to see if any tasks need to be run and runs them if so.
     * 
     * This will also remove tasks if they are no longer needed.
     * 
     * @param {number} time The current timestamp.
     */

  }, {
    key: "update",
    value: function update(time) {
      var _this = this;

      this.active.map(function (task) {
        if (time > task.options.delay && time - task.lastRunAt >= task.options.interval) {
          task.run();
          task.lastRunAt = time;
          if (task.timesRun > task.options.timesToRun) _this.removeTask(task.name);
        }
      });
    }
  }, {
    key: "active",

    /**
     * Returns all of the active tasks.
     * 
     * @returns {Array<Tas>}
     */
    get: function get() {
      return this._active;
    }
  }]);

  return TaskManager;
}();

exports["default"] = TaskManager;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90YXNrcy9UYXNrTWFuYWdlci50cyJdLCJuYW1lcyI6WyJUYXNrTWFuYWdlciIsIm5hbWUiLCJmbiIsIm9wdGlvbnMiLCJ0YXNrIiwiVGFzayIsIl9hY3RpdmUiLCJwdXNoIiwiZmlsdGVyIiwidGltZSIsImFjdGl2ZSIsIm1hcCIsImRlbGF5IiwibGFzdFJ1bkF0IiwiaW50ZXJ2YWwiLCJydW4iLCJ0aW1lc1J1biIsInRpbWVzVG9SdW4iLCJyZW1vdmVUYXNrIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQUVBOzs7Ozs7Ozs7Ozs7QUFFQTs7OztJQUlxQkEsVzs7Ozs7O3FDQVFZLEU7Ozs7OztBQVMvQjs7Ozs7Ozs7Ozs0QkFVUUMsSSxFQUFjQyxFLEVBQW9DO0FBQUEsVUFBdEJDLE9BQXNCLHVFQUFKLEVBQUk7QUFDeEQsVUFBTUMsSUFBVSxHQUFHLElBQUlDLGdCQUFKLENBQVNKLElBQVQsRUFBZUMsRUFBZixFQUFtQkMsT0FBbkIsQ0FBbkI7O0FBRUEsV0FBS0csT0FBTCxDQUFhQyxJQUFiLENBQWtCSCxJQUFsQjtBQUNEO0FBRUQ7Ozs7Ozs7OytCQUtXSCxJLEVBQWM7QUFDdkIsV0FBS0ssT0FBTCxHQUFlLEtBQUtBLE9BQUwsQ0FBYUUsTUFBYixDQUFvQixVQUFDSixJQUFEO0FBQUEsZUFBZ0JBLElBQUksQ0FBQ0gsSUFBTCxLQUFjQSxJQUE5QjtBQUFBLE9BQXBCLENBQWY7QUFDRDtBQUVEOzs7Ozs7Ozs7OzJCQU9PUSxJLEVBQWM7QUFBQTs7QUFDbkIsV0FBS0MsTUFBTCxDQUFZQyxHQUFaLENBQWdCLFVBQUNQLElBQUQsRUFBZ0I7QUFDOUIsWUFBSUssSUFBSSxHQUFHTCxJQUFJLENBQUNELE9BQUwsQ0FBYVMsS0FBcEIsSUFBNkJILElBQUksR0FBR0wsSUFBSSxDQUFDUyxTQUFaLElBQXlCVCxJQUFJLENBQUNELE9BQUwsQ0FBYVcsUUFBdkUsRUFBaUY7QUFDL0VWLFVBQUFBLElBQUksQ0FBQ1csR0FBTDtBQUVBWCxVQUFBQSxJQUFJLENBQUNTLFNBQUwsR0FBaUJKLElBQWpCO0FBRUEsY0FBSUwsSUFBSSxDQUFDWSxRQUFMLEdBQWdCWixJQUFJLENBQUNELE9BQUwsQ0FBYWMsVUFBakMsRUFBNkMsS0FBSSxDQUFDQyxVQUFMLENBQWdCZCxJQUFJLENBQUNILElBQXJCO0FBQzlDO0FBQ0YsT0FSRDtBQVNEOzs7O0FBakREOzs7Ozt3QkFLMEI7QUFBRSxhQUFPLEtBQUtLLE9BQVo7QUFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcclxuXHJcbmltcG9ydCBUYXNrIGZyb20gJy4vVGFzayc7XHJcblxyXG4vKipcclxuICogVGhlIHRhc2sgbWFuYWdlciBpcyB1c2VkIHRvIGFkZCBhbmQgbWFuYWdlIHRhc2tzIHRoYXQgYXJlIHN1cHBvc2VkIHRvIHJ1biBhdCBzcGVjaWZpYyB0aW1lcywgb24gcmVwZWF0LCBvciBhIFxyXG4gKiBwcmVkZXRlcm1pbmVkIG51bWJlciBvZiB0aW1lcy5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhc2tNYW5hZ2VyIHtcclxuICAvKipcclxuICAgKiBBIHJlZmVyZW5jZSB0byB0aGUgdGFza3MgdGhhdCBoYXZlIGJlZW4gY3JlYXRlZCBhbmQgYXJlIGN1cnJlbnRseSBhY3RpdmUuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge0FycmF5PFRhc2s+fVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2FjdGl2ZTogQXJyYXk8VGFzaz4gPSBbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyBhbGwgb2YgdGhlIGFjdGl2ZSB0YXNrcy5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7QXJyYXk8VGFzPn1cclxuICAgKi9cclxuICBnZXQgYWN0aXZlKCk6IEFycmF5PFRhc2s+IHsgcmV0dXJuIHRoaXMuX2FjdGl2ZTsgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGRzIGEgdGFzayB0byB0aGUgdGFzayBtYW5hZ2VyLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSB0YXNrIHRvIGFkZC5cclxuICAgKiBAcGFyYW0ge3N0cmluZ30gZm4gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgd2hlbiB0aGlzIHRhc2sgaXMgcnVuLlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cclxuICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMuaW50ZXJ2YWw9MTAwMF0gU3BlY2lmaWVzIHRoZSB0aW1lIGluIGJldHdlZW4gcnVucyBvZiB0aGlzIHRhc2suXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLmRlbGF5PTBdIEFuIGluaXRpYWwgZGVsYXkgYmVmb3JlIHJ1bm5pbmcgdGhpcyB0YXNrIGZvciB0aGUgZmlyc3QgdGltZS5cclxuICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMudGltZXNUb1J1bj1JbmZpbml0eV0gU3BlY2lmeSB0aGlzIHRvIGhhdmUgdGhlIHRhc2sgYmUgZGVzdHJveWVkIGFmdGVyIGJlaW5nIHJ1biB0aGUgc3BlY2lmaWVkIGFtb3VudCBvZiB0aW1lcy5cclxuICAgKi9cclxuICBhZGRUYXNrKG5hbWU6IHN0cmluZywgZm46IEZ1bmN0aW9uLCBvcHRpb25zOiBPYmplY3QgPSB7fSkge1xyXG4gICAgY29uc3QgdGFzazogVGFzayA9IG5ldyBUYXNrKG5hbWUsIGZuLCBvcHRpb25zKTtcclxuXHJcbiAgICB0aGlzLl9hY3RpdmUucHVzaCh0YXNrKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZXMgYSB0YXNrIGJ5IGl0cyBuYW1lLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSB0YXNrIHRvIHJlbW92ZS5cclxuICAgKi9cclxuICByZW1vdmVUYXNrKG5hbWU6IHN0cmluZykge1xyXG4gICAgdGhpcy5fYWN0aXZlID0gdGhpcy5fYWN0aXZlLmZpbHRlcigodGFzazogVGFzaykgPT4gdGFzay5uYW1lICE9PSBuYW1lKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWNrcyB0byBzZWUgaWYgYW55IHRhc2tzIG5lZWQgdG8gYmUgcnVuIGFuZCBydW5zIHRoZW0gaWYgc28uXHJcbiAgICogXHJcbiAgICogVGhpcyB3aWxsIGFsc28gcmVtb3ZlIHRhc2tzIGlmIHRoZXkgYXJlIG5vIGxvbmdlciBuZWVkZWQuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWUgVGhlIGN1cnJlbnQgdGltZXN0YW1wLlxyXG4gICAqL1xyXG4gIHVwZGF0ZSh0aW1lOiBudW1iZXIpIHtcclxuICAgIHRoaXMuYWN0aXZlLm1hcCgodGFzazogVGFzaykgPT4ge1xyXG4gICAgICBpZiAodGltZSA+IHRhc2sub3B0aW9ucy5kZWxheSAmJiB0aW1lIC0gdGFzay5sYXN0UnVuQXQgPj0gdGFzay5vcHRpb25zLmludGVydmFsKSB7XHJcbiAgICAgICAgdGFzay5ydW4oKTtcclxuXHJcbiAgICAgICAgdGFzay5sYXN0UnVuQXQgPSB0aW1lO1xyXG5cclxuICAgICAgICBpZiAodGFzay50aW1lc1J1biA+IHRhc2sub3B0aW9ucy50aW1lc1RvUnVuKSB0aGlzLnJlbW92ZVRhc2sodGFzay5uYW1lKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59Il19