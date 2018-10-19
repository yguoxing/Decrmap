import { mapCtrl } from '../map/mapCtrl';

let utilCollection = {};

function setUtil(options){
    utilCollection[options.mapId] = utilCollection[options.mapId] || {};
    utilCollection[options.mapId][options.utilId] = options.utilIns;
}

function removeUtil(options){
    if(utilCollection[options.mapId] && utilCollection[options.mapId][options.utilId]){
        utilCollection[options.mapId][options.utilId].closeUtil();
        delete utilCollection[options.mapId][options.utilId];
    }
}

function removeAllUtil(mapId){
    delete utilCollection[mapId];
}

function deActive(options){

}

function getUtilIns(options){
    let filterIns = null;
    if(utilCollection[options.mapId]){
        return utilCollection[options.mapId][options.utilId] || null
    }
    return filterIns;
}

function isUtilExist(options){
    return getUtilIns(options) === null?false:true;
}

function setActive(options, flag){
    let drawIns = getUtilIns(options);
    drawIns.setActive(flag);
}

function isActive(options){
    let drawIns = getUtilIns(options);
    return drawIns.isActive();
}

function closeAllUtil(mapId){
    
}

let utilCtrl = {
    setUtil: setUtil,
    removeUtil: removeUtil,
    removeAllUtil: removeAllUtil,
    getUtilIns: getUtilIns,
    isUtilExist: isUtilExist,
    setActive: setActive,
    isActive: isActive
}

export { utilCtrl }
