import Zoom from './Zoom';
import ScaleLine from './ScaleLine';
import OverviewMap from './OverviewMap';
import MousePosition from './MousePosition';
import { mapCtrl } from '../map/mapCtrl';
import { CONST } from '../dataUtil/constant';

let ctrlCollection = {};

function _setCtrl(mapId, type, zoomObj){
    if(!ctrlCollection[mapId]){
        ctrlCollection[mapId] = {};
    }
    ctrlCollection[mapId][type] = zoomObj;
}

function removeCtrls(mapId, ctrls){
    let olMap = mapCtrl.getMapObj(mapId).olMap;
    ctrls.forEach(c => {
        let olCtrl = _getCtrl(mapId, c.type);
        if(olCtrl){
            olMap.removeControl(olCtrl);
        }
        if(ctrlCollection[mapId] && ctrlCollection[mapId][c]){
            delete ctrlCollection[mapId][c];
        }
    });
}

function getAllCtrl(mapId){
    return ctrlCollection[mapId];
}

function _getCtrl(mapId, type){
    if(ctrlCollection[mapId] && ctrlCollection[mapId][type]){
        return ctrlCollection[mapId][type];
    }else{
        return null;
    }
}

function addCtrl(mapId, ctrls){
    let olMap = mapCtrl.getMapObj(mapId).olMap;
    ctrls.forEach(c => {
        if(!_getCtrl(mapId, c.type)){
            let ctrlObj = null;
            switch (c.type){
                case CONST.CONTROL.ZOOM:
                    ctrlObj = new Zoom({mapId: mapId});
                    _setCtrl(mapId, c, ctrlObj);
                    break;
                case CONST.CONTROL.SCALELINE:
                    ctrlObj = new ScaleLine({mapId: mapId});
                    _setCtrl(mapId, c, ctrlObj );
                    break;
                case CONST.CONTROL.OVERVIEWMAP:
                    ctrlObj = new OverviewMap(Object.assign({mapId: mapId}, c));
                    _setCtrl(mapId, c, ctrlObj);
                    break;
                case CONST.CONTROL.MOUSEPOSITION:
                    ctrlObj = new MousePosition({mapId: mapId});
                    _setCtrl(mapId, c, ctrlObj);
                    break;
            }
            olMap.addControl(ctrlObj.olCtrl);
        }
    });
}

function updateCtrl(mapId, ctrls){
    let allCtrls = Object.values(CONST.CONTROL);
    removeCtrls(allCtrls);
    addCtrl(mapId, ctrls);
}

let controlCtrl = {
    _setCtrl: _setCtrl,
    _getCtrl: _getCtrl,
    getAllCtrl: getAllCtrl,
    removeCtrl: removeCtrls,
    addCtrl: addCtrl,
    updateCtrl: updateCtrl
};

export { controlCtrl };
