import { geoUtil } from '../dataUtil/geoUtil';
import ol from 'openlayers';

export default class MapBase {

    constructor(options) {
        options = options || {};
        this.DLayer = options.DLayer || [];
        this.mapId = options.mapId || null;
        this.olMap = options.olMap || null;
    }

    addMap(mapId, options){
        options = options || {};
        let mapObj = new ol.Map({
            target: mapId,
            view: new ol.View({
                center: geoUtil.projTo3857(options.defaultCenter || [0,0]),
                zoom: options.zoom || 9,
                minZoom: 0,
                maxZoom: 20
            })
        });
        this.olMap = mapObj;
        this.mapId = mapId;
    }

    createChange(){
        let baselayer = this.getBaselayer();
        baselayer.getSource().on('tileloadend', Function.prototype.bind.apply(this.changeColor, [null].concat(this)));
    }
    
    /**
     * 地图颜色变化
     */
    colorMap(color){
        const common = {
            gray: [[0.1, 0.2, 0.1], [0.1, 0.2, 0.1], [0.1, 0.2, 0.1]],
            drakBlue: [[0.3, 0.3, 0.3], [0.3, 0.3, 0.3], [0.07,0.07,0.07]],
            brightBlack: [[0.35, 0.35, 0.35], [0.35, 0.35, 0.35], [0.35, 0.35, 0.35]],
            red: [[0.07, 0.07, 0.07], [0.3, 0.3, 0.3], [0.3, 0.3, 0.3]],
            green: [[0.2, 0.2, 0.2], [0.1, 0.1, 0.1], [0.2, 0.2, 0.2]]
        };
        if(Array.isArray(color)){
            this.colorParam = color;
        }else{
            this.colorParam = common[color];
        }
        
        let layers = this.olMap.getLayers().getArray();
        let baselayer = layers.filter(l => {
            return l.get('baselayer');
        })[0];
        baselayer.getSource().refresh();
    }

    /**
     * 修改底图的颜色
     */
    changeColor(self, e){
        if(!self.colorParam){
            return;
        }
        let color = self.colorParam;
        let image = e.tile.getImage();
        var tempC = document.createElement('canvas');
        tempC.width = image.width;
        tempC.height = image.height;
        var ctx = tempC.getContext('2d');
        ctx.drawImage(image, 0, 0, image.width, image.height);
        let imgData = ctx.getImageData(0,0,tempC.width,tempC.height);
        let oldR, oldG, oldB;
        for(var i=0; i<imgData.data.length-1;i = i+4){
            oldR = imgData.data[i], oldG = imgData.data[i+1]; oldB = imgData.data[i+2];
            imgData.data[i] = 255 - (oldR * color[0][0] + oldG * color[0][1] + oldB * color[0][2]);
            imgData.data[i+1] = 255 - (oldR * color[1][0] + oldG * color[1][1] + oldB * color[1][2]);
            imgData.data[i+2] = 255 - (oldR * color[2][0] + oldG * color[2][1] + oldB * color[2][2]);
            imgData.data[i] = imgData.data[i]>0?imgData.data[i]:0;
            imgData.data[i+1] = imgData.data[i]>0?imgData.data[i+1]:0;
            imgData.data[i+2] = imgData.data[i]>0?imgData.data[i+2]:0;
        }
        ctx.putImageData(imgData, 0, 0);
        e.tile.g.src = ctx.canvas.toDataURL();
    }

    /**
     * 获取底图图层
     */
    getBaselayer(){
        return this.olMap.getLayers().getArray().filter(l => {
            return l.get('baselayer');
        })[0];
    }

    /**
     * 切换卫星地图
     */
    switchSatellite(){}

    /**
     * 切换道路地图
     */
    switchRoad(){
        let mapSource = this.createRoadSource();
        this.getBaselayer().setSource(mapSource);
        this.createChange();
    }
}