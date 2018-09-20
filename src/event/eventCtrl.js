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
    moveendCollection[options.mapId] = moveendCollection[options.mapId] || [];
    moveendCollection[options.mapId].push(options.eventIns);
}

function setDouble(options){
    doubleCollection[options.mapId] = doubleCollection[options.mapId] || {};
    doubleCollection[options.mapId][options.layerId] = options.eventIns;
}

function getClickData(options){
    let olMap = mapCtrl.getMapObj(options.mapId);
    let layerIns = olMap.DLayer.filter(ele => {
        return ele.layerId === options.layerId
    })[0];
    return layerIns.data.filter(e => {
        return e.id === options.id
    })
}

function triggerSingle(e){
    const mapId = e.map.getTarget();
    var eventColl = singleCollection[mapId];
    let allData = {};
    e.map.forEachFeatureAtPixel(e.pixel, function(fea,layer){
        if(layer && layer.get('layerId')){
            const dataId = fea.getId();
            const layerId = layer.get('layerId');
            let data = getClickData({
                mapId: mapId,
                layerId: layerId,
                id: dataId
            });
            allData[layerId] = data;
        }
    });

    if(eventColl && eventColl[CONST.MAPEVENTLAYER]){
        if(eventColl[CONST.MAPEVENTLAYER].getActive()){
            eventColl[CONST.MAPEVENTLAYER].callback(filterData);
        }
    }else if(eventColl && eventColl[CONST.MAPEVENTLAYER] &&eventColl[CONST.MAPEVENTLAYER].length !== 0){
        let showData = [], layerIns;
        filterData.forEach(e => {
            if(eventColl[e.layerId].getActive()){
                layerIns = layerCtrl.getLayerIns({mapId: mapId, layerId: e.layerId});
                let featureData = layerIns.getLayerData.filter(d => {
                    return d.id = e.get('id')
                })[0];
                if(featureData){
                    showData.push({
                        labelName: layerIns.labelName,
                        featureName: featureData.name || '未知',
                        callback: eventColl[e.layerId].callback,
                        data: featureData
                    })
                }
            }
        })
    }

    for(var o in eventColl){
        if(eventColl[o].openType === CONST.OPENTYPE.INTERNAL && eventColl[o].getActive()){
            eventColl[o].callback(e);
        }
    }
}

function _dealLayerEvent(){
    let popDom = document.createAttribute('div');
}

function dealInnerEvent(){

}

function triggerDouble(e){
    const mapId = e.map.getTarget();
}

function triggerMoveend(e){
    const mapId = e.map.getTarget();
    const level = e.map.getView().getZoom();
    moveendCollection[mapId].forEach(moveEvent => {
        moveEvent.callback({mapId: mapId, level: level})
    })
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
