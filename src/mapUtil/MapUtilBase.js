import { mapCtrl } from '../map/mapCtrl';
import { dataHandler } from '../dataUtil/dataHandler';
import { layerCtrl } from '../layer/layerCtrl';
import { CONST } from '../dataUtil/constant';
import LayerBase from './../layer/LayerBase';

export default class MapUtilBase {

    constructor(options) {
        this.mapId = options.mapId;

        this.drawInter = null;
        // 工具Id
        this.utilId = options.utilId || dataHandler.getUUID('mapUtil');
        
        // 操作工具结束后的业务回调函数
        this.callback = options.callback || null;
        
        // 操作工具的样式
        this.style = {
            fill: {
                color: 'rgba(255,0,0,0.2)'
            },
            stroke: {
                color: '#ce717d',
                width: 3
            }
        };
        
        // 操作工具所在图层
        const utilLayer = CONST.MAPUTILLAYER;
        
        const layerOpt = {
            mapId: options.mapId,
            layerId: utilLayer,
        };
        if(!layerCtrl.isLayerExist(layerOpt)){
            let layerObj = new LayerBase();
            layerObj.addLayer(layerOpt);
        }
    }

    /**
     * 获取操作图层的Source
     * @return {Ol} Source对象
     */
    getUtilSource(){
        const options = {
            mapId: this.mapId,
            layerId: CONST.MAPUTILLAYER
        };
        return layerCtrl.getLayerIns(options).olLayer.getSource();
    }

    /**
     * 移除操作工具中的相关弹出框
     * @param {Array} ids 弹出框Id
     */
    removeOverlay(ids){
        let olMap = mapCtrl.getMapObj(this.mapId).olMap;
        var overlayArr = olMap.getOverlays().getArray();
        for(var i = overlayArr.length - 1; i >= 0; i--){
            if(ids.indexOf(overlayArr[i].get('popId')) > -1){
                olMap.removeOverlay(overlayArr[i]);
            }
        }
    }

    /**
     * 获取工具的状态，打开或者关闭
     */
    isActive(){
        return this.drawInter.getActive();
    }

    /**
     * 从Ol中删除工具对象
     */
    closeUtil(){}
}