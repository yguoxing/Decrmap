import { CONST } from './constant';

function _checkShowLog(){
    return CONST.DEBUG.SHOWLOG && !window.navigator.userAgent.indexOf('NET') >-1;
}

let Log = {};

Log.info = function(info){
    console.log(info);
};

Log.error = function(info){
    console.error(info);
};

Log.warn = function(info){
    console.warn('%c' + info, 'background:#ccc;color:#0366d6;');
};

export { Log };