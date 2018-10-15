import EventBase from './EventBase';
import { CONST } from '../dataUtil/constant';

export default class SingleEvent extends EventBase {

    constructor(options){
        super(options);
        this.EventType = CONST.EVENTTYPE.SINGLECLICK;
    }

    triggerCallback(sourceData){
        this.callback();
    }

    _getData(sourceData){
        let data = [];
        if(this.layerId === 'dercmap_allLayer'){

        }else{

        }
        return data
    }
}