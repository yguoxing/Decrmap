import { eventCtrl } from '../event/eventCtrl';

let mapCollection = {};

function setMap(mapId, mapObj){
    if(!mapCollection[mapId]){
        mapCollection[mapId] = mapObj;
        _registerSingle(mapId);
        _registerDouble(mapId);
        _registerMoveend(mapId);
    }
}

function removeMap(mapId){
    delete mapCollection[mapId];
}

function getMapObj(mapId){
    return mapCollection[mapId]
}

function _registerSingle(mapId){
    mapCollection[mapId].olMap.on('singleclick',function(e){
        eventCtrl.triggerSingle(e);
    })
}

function _registerDouble(mapId){
    mapCollection[mapId].olMap.on('dblclick',function(e){
        eventCtrl.triggerDouble(e);
    })
}

function _registerMoveend(mapId){
    mapCollection[mapId].olMap.on('moveend',function(e){
        eventCtrl.triggerMoveend(e);
    })
}

let mapCtrl = {
    setMap: setMap,
    removeMap: removeMap,
    getMapObj: getMapObj
}

export { mapCtrl }
