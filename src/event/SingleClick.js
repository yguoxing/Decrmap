import EventBase from './EventBase';
import { CONST } from '../dataUtil/constant';

export default class SingleEvent extends EventBase {

    constructor(options){
        super(options);
        this.EventType = CONST.EVENTTYPE.SINGLECLICK;
    }

    triggerCallback(){
        this.callback();
    }

    _getData(){
        let data = [];
        // if(this.layerId === 'dercmap_allLayer'){}
        return data;
    }
}