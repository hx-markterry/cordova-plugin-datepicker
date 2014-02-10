/**
 * Phonegap DatePicker Plugin Copyright (c) Greg Allen 2011 MIT Licensed
 * Reused and ported to Android plugin by Daniel van 't Oever
 * Updated to cordova 3.1 by Mark Terry
 */
 
 var exec = require('cordova/exec'),
    cordova = require('cordova');
 
	function DatePicker() {
		this._callback;
	}

	/**
	 * show - true to show the ad, false to hide the ad
	 */
	DatePicker.prototype.show = function(options, cb) {
		if (options.date) {
			options.date = (options.date.getMonth() + 1) + "/" + (options.date.getDate()) + "/" + (options.date.getFullYear()) + "/" + (options.date.getHours()) + "/" + (options.date.getMinutes());
		}
		var defaults = {
			mode : '',
			date : '',
			minDate: 0,
			maxDate: 0
		};

		for ( var key in defaults) {
			if (typeof options[key] !== "undefined" && options[key] !== null){
				defaults[key] = options[key];
			}
		}
		this._callback = cb;

		return exec(cb, failureCallback, 'NativeDatePicker', defaults.mode, new Array(defaults));
	};

	DatePicker.prototype._dateSelected = function(date) {
		var d = new Date(parseFloat(date) * 1000);
		if (this._callback){
			this._callback(d);
		}
	};

	function failureCallback(err) {
		console.log("datePickerPlugin.js failed: " + err);
	}
	
module.exports = DatePicker;
