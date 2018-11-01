import EventBase from './EventBase';
import { CONST } from '../dataUtil/constant';

export default class DoubleClick extends EventBase {

    constructor(options){
        super(options);
        this.EventType = CONST.EVENTTYPE.DOUBLECLICK;
    }

    triggerCallback(){
        this.callback();
    }

    _getData(){
        let data = [];
        return data;
    }
}