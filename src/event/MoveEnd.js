import EventBase from './EventBase';
import { CONST } from '../dataUtil/constant';

export default class MoveEnd extends EventBase {

    constructor(options){
        super(options);
        this.EventType = CONST.EVENTTYPE.MOVEEND;
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