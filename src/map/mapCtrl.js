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

function _getMapObj(mapId){
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

function setMapCenter(){

}

function getMapCenter(){

}

function fitMapExtent(){

}

function getMapExtent(){

}

function updateBaselayer(){

}

function setBaselayerVisable(){

}

function setBaselayerOpacity(){

}

function updateControl(){

}

function updateSize(){

}

let mapCtrl = {
    setMap: setMap,
    removeMap: removeMap,
    getMapObj: _getMapObj
}

export { mapCtrl }
