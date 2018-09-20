import ol from 'openlayers';
import ControlBase  from './ControlBase';
import { CONST } from '../dataUtil/constant';
import { mapCtrl } from '../map/mapCtrl';

export default class Zoom extends ControlBase {

    constructor(options){
        super(options);
        this.type = CONST.CONTROL.OVERVIEWMAP;
        this.olCtrl = new ol.control.OverviewMap({
            target: this._createTarget()
        });
        let olMap = mapCtrl.getMapObj(this.mapId).olMap;
        olMap.addControl(this.olCtrl);
    }

    _createTarget(){
        let outer = document.createElement('div');
        outer.classList.add('overviewmap-container');
        let mapDom = document.getElementById(this.mapId);
        mapDom.appendChild(outer);
        return outer;
    }
}