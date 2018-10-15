import { CONST } from '../dataUtil/constant';
import { geoUtil } from '../dataUtil/geoUtil';
import { eventCtrl } from '../event/eventCtrl';
import { controlCtrl } from '../control/controlCtrl';
import { overlay } from '../overlay/interface/overlayInterface';

let mapCollection = {};

function setMap(mapId, mapObj){
    if(!mapCollection[mapId]){
        mapCollection[mapId] = mapObj;
        _registerSingle(mapId);
        _registerDouble(mapId);
        _registerMoveend(mapId);
    }
}

/**
 * 删除地图
 * @param {String} mapId 地图ID
 */
function removeMap(mapId){
    delete mapCollection[mapId];
}

/**
 * 获取地图实例化对象
 * @param {String} mapId 地图ID
 */
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

/**
 * 设置底图中心点，支持更新地图中心点和地图级别，当为空时，不更新
 * @param {Object} opition 
 */
function setMapCenter(opition){
    let olView = _getMapObj(opition.mapId).olMap.getView();

    if(opition.center){
        olView.setCenter(geoUtil.projTo3857(opition.center));
    }
    if(opition.zoom){
        olView.setZoom(opition.zoom);
    }
}

/**
 * 获取当前地图中心点和地图级别
 * @param {Object} opition 
 * @return {Object}
 */
function getMapCenter(opition){
    let olView = _getMapObj(opition.mapId).olMap.getView();
    
    return {
        zoom: olView.getZoom(),
        center: geoUtil.projTo4326(olView.getCenter())
    }
}

/**
 * 根据范围居中地图位置
 * @param {Object} opition 
 */
function fitMapExtent(opition){
    let transExtent = geoUtil.projExtentTo3857(opition.extent);
    let olMap = _getMapObj(opition.mapId).olMap;
    olMap.getView().fit(transExtent, olMap.getSize());
}

/**
 * 获取图层范围
 * @param {Object} opition 
 */
function getMapExtent(opition){
    let size = _getMapObj(opition.mapId).olMap.getSize();
    let olView = _getMapObj(opition.mapId).olMap.getView();
    return geoUtil.projExtentTo4326(olView.calculateExtent(size))
}

/**
 * 更换底图图层，新图层将替换原有图层
 * @param {Object} opition 
 */
function updateBaselayer(opition){
    const olMap = _getMapObj(opition.mapId).olMap;
    
    let layers = olMap.getLayers().getArray();

    let index;
    layers.forEach((l,i) => {
        if(l.get('baselayer')){
            index - i;
        }
    });
    switch (opition.layer){
        case CONST.MAPTYPE.OSM :
            
    }
    let newLayer = _getMapObj(opition.mapId).createLayer();
    layers.splice(index, 1, newLayer);
}

/**
 * 设置底图是否可见
 * @param {Object} opition 
 */
function setBaselayerVisible(opition){
    const olMap = _getMapObj(opition.mapId).olMap;
    let layers = olMap.getLayers().getArray();
    const baselayer = layers.filter(l => {
        return l.get('baselayer')
    })[0];
    baselayer.setVisible(opition.visible);
}

/**
 * 设置底图透明度
 * @param {Object} opition 
 */
function setBaselayerOpacity(opition){
    const olMap = _getMapObj(opition.mapId).olMap;
    let layers = olMap.getLayers().getArray();
    const baselayer = layers.filter(l => {
        return l.get('baselayer')
    })[0];
    baselayer.setOpacity(opition.opacity);
}

/**
 * 更新地图控件，会覆盖原加载的控件
 * @param {Object} opition 
 */
function updateControl(opition){
    let loadedCtrls = controlCtrl.getAllCtrl(opition.mapId);
    let removeCtrls = [], newAddCtrls = [], remainCtrls = [];
    
    loadedCtrls.forEach(c => {
        opition.ctrls.forEach(j => {
            if(j.type === c.type){
                remainCtrls.push(c.type);
            }else{
                removeCtrls.push(c.type);
            }
        })
    })
    
    opition.ctrls.forEach(i => {
        if(remainCtrls.indexOf(i.type) < 0){
            newAddCtrls.push(i);
        }
    })
    
    controlCtrl.remainCtrls(opition.mapId, removeCtrls);
    controlCtrl.addCtrl(opition.mapId, newAddCtrls);
}

/**
 * 地图大小更新后刷新地图接口，避免图层失真
 * @param {*} opition 
 */
function updateSize(opition){
    let olMap = _getMapObj(opition.mapId).olMap;
    olMap.updateSize();
}

function disMapcolor(opition){
    let mapIns = _getMapObj(opition.mapId);
    mapIns.disColor(opition.param);
}

let mapCtrl = {
    setMap: setMap,
    setMapCenter: setMapCenter,
    getMapCenter: getMapCenter,
    fitMapExtent: fitMapExtent,
    getMapExtent: getMapExtent,
    updateBaselayer: updateBaselayer,
    setBaselayerVisible: setBaselayerVisible,
    setBaselayerOpacity: setBaselayerOpacity,
    updateControl: updateControl,
    removeMap: removeMap,
    getMapObj: _getMapObj,
    addPopup: overlay.addPopup,
    removePopup :overlay.removePopup,
    removeAllPopup: overlay.removeAllPopup,
    disMapcolor: disMapcolor
}

export { mapCtrl }
