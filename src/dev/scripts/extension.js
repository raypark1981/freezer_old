
//// date to string ["yyyy" , "MM" , "dd" , "HH" , "mm" , "ss" , "SSS"]
Date.prototype.convertFormatString = function (dateformat){
    if(dateformat == undefined)
        dateformat = 'yyyy-MM-dd HH:mm:ss';

    var _year = this.getFullYear();
    var _month = this.getMonth() + 1;
    var _date = this.getDate();
    var _hours = this.getHours();
    var _minutes = this.getMinutes();
    var _seconds = this.getSeconds();
    var _milliseconds = this.getMilliseconds();
    
    
    var _yearFormat = new RegExp("[y]{1,4}").exec(dateformat)
    var _monthFormat = new RegExp("[M]{1,2}").exec(dateformat)
    var _dateFormat = new RegExp("[d]{1,2}").exec(dateformat)
    var _hoursFormat = new RegExp("[H]{1,2}").exec(dateformat)
    var _minutesFormat = new RegExp("[m]{1,2}").exec(dateformat)
    var _secondsFormat = new RegExp("[s]{1,2}").exec(dateformat)
    var _millisecondsFormat = new RegExp("[S]{1,3}").exec(dateformat)

    var __year = _yearFormat != null ? _year.toString().substring(4 - _yearFormat[0].length , 4) : '';
    var __month = _monthFormat != null ? _month.toString().padLeft('0',2).substring(2 - _monthFormat[0].length , 2): '';
    var __date = _dateFormat != null ?  _date.toString().padLeft('0',2).substring(2 - _dateFormat[0].length , 2): '';
    var __hours = _hoursFormat != null ? _hours.toString().padLeft('0',2).substring(2 - _hoursFormat[0].length , 2): '';
    var __minutes = _minutesFormat != null ? _minutes.toString().padLeft('0',2).substring(2 - _minutesFormat[0].length , 2): '';
    var __seconds = _secondsFormat != null ?  _seconds.toString().padLeft('0',2).substring(2 - _secondsFormat[0].length , 2): '';
    var __milliseconds = _millisecondsFormat != null ? _milliseconds.toString().padLeft('0',3).substring(3 - _millisecondsFormat[0].length , 3): '';
    
    if(_yearFormat != null) dateformat = dateformat.replace(_yearFormat[0] , __year);
    if(_monthFormat != null) dateformat = dateformat.replace(_monthFormat[0] , __month);
    if(_dateFormat != null) dateformat = dateformat.replace(_dateFormat[0] , __date);
    if(_hoursFormat != null) dateformat = dateformat.replace(_hoursFormat[0] , __hours);
    if(_minutesFormat != null) dateformat = dateformat.replace(_minutesFormat[0], __minutes);
    if(_secondsFormat != null) dateformat = dateformat.replace(_secondsFormat[0], __seconds);
    if(_millisecondsFormat != null) dateformat = dateformat.replace(_millisecondsFormat[0], __milliseconds);

    return dateformat;
}


//// 패딩 left '0'.padLeft('0' , 2)
if (!String.prototype.padLeft) {
    String.prototype.padLeft = function( pad , size) {
        var s = String(this);
        while (s.length < (size || 2)) {s = pad + s;}
        return s;
    }
}

//// 패딩 right '0'.padRight('0' , 2)
if (!String.prototype.padRight) {
    String.prototype.padRight = function(pad , size) {
        var s = String(this);
        while (s.length < (size || 2)) {s = s + pad;}
        return s;
    }
}

//// string.format "".format(...param)
if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

//// 정규식 이용한 indexof
if(!String.prototype.regexIndexOf){
    String.prototype.regexIndexOf = function(regex, startpos) {
        var indexOf = this.substring(startpos || 0).search(regex);
        return (indexOf >= 0) ? (indexOf + (startpos || 0)) : indexOf;
    }
}

//// string to DateTime
if(!String.prototype.stringToDate){
    String.prototype.stringToDate = function(dateformat) {
        
    if(dateformat == undefined){
        console.warn('stringToDate need formating string sort of "yyyy-MM-dd" ');
    }   

    var _yearFormat = new RegExp("[y]{1,4}").exec(dateformat)
    var _monthFormat = new RegExp("[M]{1,2}").exec(dateformat)
    var _dateFormat = new RegExp("[d]{1,2}").exec(dateformat)
    var _hoursFormat = new RegExp("[H]{1,2}").exec(dateformat)
    var _minutesFormat = new RegExp("[m]{1,2}").exec(dateformat)
    var _secondsFormat = new RegExp("[s]{1,2}").exec(dateformat)
    var _millisecondsFormat = new RegExp("[S]{1,3}").exec(dateformat)

    var _year = _yearFormat != null ? this.substring(_yearFormat.index , _yearFormat.index + _yearFormat[0].length) : 0;
    var _month =  _monthFormat != null ? this.substring(_monthFormat.index , _monthFormat.index + _monthFormat[0].length) : 0;
    var _date =  _dateFormat != null ? this.substring(_dateFormat.index , _dateFormat.index + _dateFormat[0].length) : 0;
    var _hour =  _hoursFormat != null ? this.substring(_hoursFormat.index , _hoursFormat.index + _hoursFormat[0].length) : 0;
    var _minutes =  _minutesFormat != null ? this.substring(_minutesFormat.index , _minutesFormat.index + _minutesFormat[0].length) : 0;
    var _seconds =  _secondsFormat != null ? this.substring(_secondsFormat.index , _secondsFormat.index + _secondsFormat[0].length) : 0;
    var _milliseconds =  _millisecondsFormat != null ? this.substring(_millisecondsFormat.index , _millisecondsFormat.index + _millisecondsFormat[0].length) : 0;
    
    return new Date(parseInt(_year) , parseInt(_month) - 1 , parseInt(_date) , parseInt(_hour) , parseInt(_minutes) , parseInt(_seconds) ,parseInt( _milliseconds));

    }
}

//// 정규식 이용한 lsatIndexof
if(!String.prototype.regexLastIndexOf){
    String.prototype.regexLastIndexOf = function(regex, startpos) {
        regex = (regex.global) ? regex : new RegExp(regex.source, "g" + (regex.ignoreCase ? "i" : "") + (regex.multiLine ? "m" : ""));
        if(typeof (startpos) == "undefined") {
            startpos = this.length;
        } else if(startpos < 0) {
            startpos = 0;
        }
        var stringToWorkWith = this.substring(0, startpos + 1);
        var lastIndexOf = -1;
        var nextStop = 0;
        while((result = regex.exec(stringToWorkWith)) != null) {
            lastIndexOf = result.index;
            regex.lastIndex = ++nextStop;
        }
        return lastIndexOf;
    }
}
