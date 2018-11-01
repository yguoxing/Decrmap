import ol from 'openlayers';
import ControlBase from './ControlBase';
import { registerMoveend } from '../event/interface/registerMoveend';
import { CONST } from '../dataUtil/constant';
import { mapCtrl } from '../map/mapCtrl';

export default class Zoom extends ControlBase {

    constructor(options){
        super(options);
        this.type = CONST.CONTROL.ZOOM;
        this.olCtrl = new ol.control.Zoom({
            target: this._createTarget()
        });
        let olMap = mapCtrl.getMapObj(this.mapId).olMap;
        olMap.addControl(this.olCtrl);

        registerMoveend({
            mapId: this.mapId,
            callback: this._setLevel
        });
    }

    _setLevel(param){
        let levelDOM = document.getElementById(param.mapId).getElementsByClassName('decrmap-level')[0];
        levelDOM.firstElementChild.innerText = param.level;
    }

    _createTarget(){
        let outer = document.createElement('div');
        outer.classList.add('zoom-container');
        let inner = document.createElement('div');
        inner.classList.add('decrmap-level');
        let levelSpan = document.createElement('span');
        inner.appendChild(levelSpan);
        outer.appendChild(inner);
        let mapDom = document.getElementById(this.mapId);
        mapDom.appendChild(outer);
        return outer;
    }
}