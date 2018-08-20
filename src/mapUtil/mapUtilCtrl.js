import { mapCtrl } from '../map/mapCtrl';

let utilCollection = {};

function setUtil(options){
    utilCollection[options.mapId] = utilCollection[options.mapId] || {};
    utilCollection[options.mapId][options.utilId] = options.utilIns;
}

function removeUtil(options){
    if(utilCollection[options.mapId]){
        delete utilCollection[options.mapId][options.utilId];
    }
}

function removeAllUtil(mapId){
    delete utilCollection[mapId];
}

function getUtilIns(options){
    let filterIns = null;
    if(utilCollection[mapId]){
        filterIns = utilCollection.filter(e => {
            return e.utilId
        })[0];
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

let utilCtrl = {
    setUtil: setUtil,
    removeUtil: removeUtil,
    removeAllUtil: removeAllUtil,
    getUtilIns: getUtilIns,
    isUtilExist: isUtilExist,
    setActive: setActive
}

export { utilCtrl }
