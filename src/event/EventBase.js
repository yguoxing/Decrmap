import { dataHandler } from '../dataUtil/dataHandler';

export default class EventBase {

    constructor(options) {
        this.layerId = options.layerId || null;
        this.callback = options.callback || null;
        this.id = options.id || dataHandler.getUUID('event');
        this.eventType = options.eventType || null;
        this.openType = options.openType || null;
        this.active = true;
    }

    setActive(flag){
        this.active = flag;
    }
    getActive(){
        return this.active;
    }
}