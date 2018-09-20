import EventBase from './EventBase';
import { CONST } from '../dataUtil/constant';
import { mapCtrl } from '../map/mapCtrl';

export default class MoveEnd extends EventBase {

    constructor(options){
        super(options);
        this.EventType = CONST.EVENTTYPE.MOVEEND;
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