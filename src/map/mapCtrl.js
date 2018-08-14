import { CONST } from '../dataUtil/constant';

let mapCollection = {};

function setMap(mapId, mapObj){
    mapCollection[mapId] = mapObj;
}

function removeMap(mapId){
    delete mapCollection[mapId];
}

function getMapObj(mapId){
    return mapCollection[mapId]
}

let mapCtrl = {
    setMap: setMap,
    removeMap: removeMap,
    getMapObj: getMapObj
}

export { mapCtrl }
