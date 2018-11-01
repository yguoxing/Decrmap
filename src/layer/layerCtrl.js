import { mapCtrl } from '../map/mapCtrl';

let layerCtrl = {};

/**
 * 图层是否存在判断
 * @param {Object} options 地图对象
 */
function isLayerExist(options){
    var layerArr = mapCtrl.getMapObj(options.mapId).DLayer;
    var filterLayer = layerArr.filter(l => {
        return l.layerId === options.layerId;
    })[0];
    return filterLayer ? true : false;
}

function getLayerIns(options){
    let mapIns = mapCtrl.getMapObj(options.mapId);
    let layerIns = mapIns.DLayer.filter(ele => {
        return ele.layerId === options.layerId;
    });
    return layerIns[0];
}

/**
 * 获取所加载图层所有的信息
 * @param {String} mapId 地图ID
 */
function getAllLayerList(mapId){
    let layers = mapCtrl.getMapObj(mapId).DLayer;
    return layers.map(function(ele){
        return {
            mapId: mapId,
            layerId: ele.layerId,
            layerType: ele.layerType,
            opacity: ele.olLayer.getOpacity(),
            visible: ele.olLayer.getVisible(),
            zindex: ele.olLayer.getZIndex()
        };
    });
}

/**
 * 删除所有图层
 * @param {String} mapId 地图ID
 */
function removeAllLayer(mapId){
    let mapIns = mapCtrl.getMapObj(mapId);
    let layers = mapIns.DLayer;
    for(var i = layers.length - 1;i > 0; i--){
        mapIns.olMap.removeLayer(layers[i]);
        layers.splice(i,1);
    }
}

/**
 * 删除图层
 * @param {Object} options 图层ID 地图ID
 */
function removeLayer(options){
    let mapIns = mapCtrl.getMapObj(options.mapId);
    let layers = mapIns.DLayer;
    layers.forEach((l, i) => {
        if(l.layerId === options.layerId){
            mapIns.olMap.removeLayer(l.olLayer);
            let removeIns = layers.splice(i, 1);
            removeIns[0].removeLayer();
        }
    });
}

/**
 * 设置图层显隐
 * @param {Object} options 显隐参数
 */
function setLayerVisible(options){
    let layers = mapCtrl.getMapObj(options.mapId).DLayer;
    layers.forEach(l =>{
        if(l.layerId === options.layerId){
            l.setLayerVisible(options.visible);
        }
    });
}

/**
 * 设置图层的透明度
 * @param {Object} options 图层透明度
 */
function setLayerOpacity(options){
    let layers = mapCtrl.getMapObj(options.mapId).DLayer;
    layers.forEach(l =>{
        if(l.layerId === options.layerId){
            l.setLayerOpacity(options.opacity);
        }
    });
}

/**
 * 获取图层数据
 * @param {Object} options 地图ID，图层ID
 */
function getLayerData(options){
    let layers = mapCtrl.getMapObj(options.mapId).DLayer;
    let layerIns = layers.filter(l =>{
        return l.layerId === options.layerId;
    })[0];
    return layerIns.getLayerData();
}

/**
 * 获取图层信息
 * @param {Object} options 地图ID 图层ID
 */
function getLayerParam(options){
    let layers = mapCtrl.getMapObj(options.mapId).DLayer;
    let layersIns = layers.filter(l => {
        return l.layerId === options.layerId;
    })[0];
    return {
        mapId: options.mapId,
        layerId: layersIns.layerId,
        layerType: layersIns.layerType,
        opacity: layersIns.olLayer.getOpacity(),
        visible: layersIns.olLayer.getVisible(),
        zindex: layersIns.olLayer.getZIndex()
    };
}

layerCtrl = {
    isLayerExist: isLayerExist,
    getLayerIns: getLayerIns,
    getAllLayerList: getAllLayerList,
    removeAllLayer: removeAllLayer,
    removeLayer: removeLayer,
    setLayerVisible: setLayerVisible,
    setLayerOpacity: setLayerOpacity,
    getLayerData: getLayerData,
    getLayerParam: getLayerParam
};

export { layerCtrl };
