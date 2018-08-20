import { mapCtrl } from '../map/mapCtrl';
import { layerCtrl } from '../layer/layerCtrl';
import { CONST } from '../dataUtil/constant';

let singleCollection = {}, doubleCollection = {}, moveendCollection = {}, eventCtrl = {};

function removeEvent(options){
    if(singleCollection[options.mapId] && singleCollection[options.mapId][options.layerId]){
        delete  singleCollection[options.mapId][options.layerId];
    }
}

function setSingle(options){
    singleCollection[options.mapId] = singleCollection[options.mapId] || {};
    singleCollection[options.mapId][options.layerId] = options.eventIns;
}

function setMoveend(options){
    moveendCollection[options.mapId] = moveendCollection[options.mapId] || {};
    moveendCollection[options.mapId][options.layerId] = options.eventIns;
}

function setDouble(options){
    doubleCollection[options.mapId] = doubleCollection[options.mapId] || {};
    doubleCollection[options.mapId][options.layerId] = options.eventIns;
}

function getClickData(options){
    let mapIns = mapCtrl.getMapObj(options.mapId);
    let layerIns = mapIns.DLayer.filter(ele => {
        return ele.layerId === options.layerId
    });
    return layerIns.data.filter(e => {
        return e.id === options.id
    })
}

function triggerSingle(e){
    const mapId = e.map.getTarget();

    let allData = {};
    e.map.forEachFeatureAtPixel(e.pixel, function(fea,layer){
        const dataId = fea.getId();
        const layerId = layer.get('layerId');
        let data = getClickData({
            mapId: mapId,
            layerId: layerId,
            id: dataId
        });
        allData[layerId] = data;
    });

    /* if(singleCollection[mapId] && singleCollection[mapId][CONST.MAPEVENTLAYER]){
        if(Object.keys(singleCollection[mapId]).length !== 1){
            singleCollection[mapId][CONST.MAPEVENTLAYER].callback(allData);
        }else if(){
            let filterData = {};
            for(var o in allData){
                if(singleCollection[mapId][o] && singleCollection[mapId][o].openType === CONST.OPENTYPE.PUBLIC){
                    filterData[o] = allData[o];
                }
            }
            singleCollection[mapId][CONST.MAPEVENTLAYER].callback(filterData);
        }
    }else{
        
    }

    if(singleCollection[mapId] && singleCollection[mapId][CONST.MAPEVENTLAYER]){
        if(){
            
        }
    }else if(){

    } */
}

function _dealLayerEvent(){
    let popDom = document.createAttribute('div');   
}

function dealInnerEvent(){

}

function triggerDouble(e){

}

function triggerMoveend(e){

}

eventCtrl = {
    removeEvent: removeEvent,
    setSingle: setSingle,
    setMoveend: setMoveend,
    setDouble: setDouble,
    triggerSingle: triggerSingle,
    triggerDouble: triggerDouble,
    triggerMoveend: triggerMoveend,
    getClickData: getClickData
}

export { eventCtrl }
