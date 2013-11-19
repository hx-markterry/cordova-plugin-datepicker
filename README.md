cordova-plugin-datepicker
=========================

Date picker replacement for older android phones as kitkat and Samsung phones support this.

Heavily based on <https://github.com/bikasv/cordova-android-plugins/tree/master/datepicker> but updated to work with cordova 3.1.


Installation
------------

    cordova plugin install https://github.com/hx-markterry/cordova-plugin-datepicker.git


Usage
-----

(In coffeescript)

Create an HTML5 date input:

    <input type="date" min="2012-01-01" max="2017-01-01"/>

Assign an event:

    "click :input[name='DateTo']"   : "_handleDate"

Code to run:

    _handleDate: (e) ->
        currentField = e.currentTarget
        minVal = currentField.min || 0
        maxVal = currentField.max || 0
    
        #get current date from field if any
        currentDate = Date.parse(currentField.value) || new Date()
        if typeof currentDate == "number"
          currentDate = new Date currentDate
        dp = new NativeDatePicker()
        dp.show({
            date: currentDate
            mode: 'date'
            minDate: Date.parse minVal
            maxDate: Date.parse maxVal
        }, (returnDate) ->
          if returnDate != "" and returnDate != "OK"
            newDate = moment(returnDate).format 'YYYY-MM-DD'
            currentField.value = newDate
          currentField.blur()
        )
