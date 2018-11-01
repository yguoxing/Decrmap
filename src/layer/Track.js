import ol from 'openlayers';
import LayerBase from './LayerBase';
import { CONST } from '../dataUtil/constant';
import { mapCtrl } from '../map/mapCtrl';
import { dataHandler} from '../dataUtil/dataHandler';
import { geoUtil } from '../dataUtil/geoUtil';

export default class Track extends LayerBase {

    constructor(options){
        super(options);
        this.layerType = CONST.LAYERTYPE.TRACK;
        this.trackCanvasId = 'decrmap_track';
        this.intervals = {};
        this.currentStep = {};
        this.defaultStyle = {
            radius: 20,
            stroke: {
                color: '#999',
                width: 2
            },
            fill: {
                color: '#4bea6f'
            }
        };
    }
    
    addLayer(options){
        this.mapId = options.mapId;
        super.addLayer(options);
    }

    setData(options){
        if(options.type === 'line'){
            this._trackLine(options);
        }else{
            this._trackPoint(options);
        }
    }

    /**
     * 删除预置的canvas以及定时器
     */
    removeLayer(){
        let trackCanvas = this._getTrackCanvas();
        if(trackCanvas){
            trackCanvas.remove();
        }

        for(let i in this.intervals){
            clearInterval[this.intervals[i]];
        }
    }

    /* --- trackLine start --- */
    _trackLine(options){
        let cloneData = JSON.parse(JSON.stringify(options));
        let trackFeas = cloneData.data.map((e, i) => {
            let bezierData = this._createPixel(options.mapId,e.points);
            cloneData.data[i].points = bezierData;
            let pointFea = new ol.Feature({
                geometry: new ol.geom.LineString(bezierData)
            });
            e.style = e.style || {};
            pointFea.setStyle(new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: e.style.color || this.defaultStyle.stroke.color,
                    width: e.style.strokeWidth || this.defaultStyle.stroke.width
                })
            }));
            return pointFea;
        });

        this.olLayer.getSource().addFeatures(trackFeas);
        this.data = cloneData.data;

        this._createTrackCanvas();
    }

    _createTrackCanvas(){
        let trackCanvas = this._getTrackCanvas();
        if(trackCanvas){
            trackCanvas.remove();
        }
        let mapSize = mapCtrl.getMapObj(this.mapId).olMap.getSize();
        trackCanvas = document.createElement('canvas');
        trackCanvas.height = mapSize[1], trackCanvas.width = mapSize[0];
        trackCanvas.style.position = 'absolute';
        trackCanvas.style.top = 0;
        trackCanvas.style.left = 0;
        trackCanvas.style.height = '100%';
        trackCanvas.style.width = '100%';
        trackCanvas.id = this.trackCanvasId;
        let before = document.getElementById(this.mapId).getElementsByClassName('ol-viewport')[0];
        let next = document.getElementById(this.mapId).getElementsByClassName('ol-viewport')[0].getElementsByClassName('ol-overlaycontainer')[0];
        before.insertBefore(trackCanvas, next);
    }

    start(id){
        let step = this.currentStep[id] || 0, self = this;
        let trackData = this._getData(id);

        this.intervals['interval_' + id] = setInterval(function(){
            if(step > trackData.points.length - 1){
                self._removeTrackTail.call(self);
                self.stop.call(self, id);
                return;
            }
            self.currentStep[id] = step;
            self._createTrackTail.call(self, trackData.points[step], trackData.style.color);
            step++;
        },30);
    }

    stop(id){
        clearInterval(this.intervals['interval_' + id]);
    }

    stopAll(){
        for(let o in this.intervals){
            this.stop[this.intervals[o]];
        }
    }

    pause(id){
        this.stop(id);
    }

    /**
     * 计算飞线效果或者彗星扫尾
     * @param {*} points
     * @param {*} color
     */
    _createTrackTail(points, color){
        let olMap = mapCtrl.getMapObj(this.mapId).olMap;
        
        let context = this._getTrackCanvas(this.trackCanvasId).getContext('2d');//设置绘图环境
        context.fillStyle = 'rgba(0, 0, 0, 0.9)';
        
        let prev = context.globalCompositeOperation;
        context.globalCompositeOperation = 'destination-in';

        let mapSize = olMap.getSize();
        context.fillRect(0, 0, mapSize[0], mapSize[1]);
        context.globalCompositeOperation = prev;

        let pixelData = olMap.getPixelFromCoordinate(points);
        context.save();
        context.fillStyle = color;
        context.shadowColor = color;
        context.shadowBlur = 9;
        context.beginPath();
        context.arc(pixelData[0], pixelData[1], 3, 0, Math.PI * 2, true);
        context.fill();
        context.closePath();
        context.restore();
    }

    _getData(id){
        return this.data.filter(d => {
            return d.id === id;
        })[0];
    }

    _getTrackCanvas(){
        return document.getElementById(this.trackCanvasId);
    }

    _removeTrackTail(){
        let context = this._getTrackCanvas().getContext('2d');
        for(let i=0;i<50;i++){
            context.fillStyle = 'rgba(0, 0, 0, 0.9)';
        
            let prev = context.globalCompositeOperation;
            context.globalCompositeOperation = 'destination-in';

            let mapSize = mapCtrl.getMapObj(this.mapId).olMap.getSize();
            context.fillRect(0, 0, mapSize[0], mapSize[1]);
            context.globalCompositeOperation = prev;

            context.save();
            context.fillStyle = 'rgba(0,0,0,0)';
            context.shadowColor = 'rgba(0,0,0,0)';
            context.shadowBlur = 0;
            context.beginPath();
            context.arc(0, 0, 0, 0, Math.PI * 2, true);
            context.fill();
            context.closePath();
            context.restore();
        }
    }

    /**
     * 线上拐点 贝塞尔计算后生成曲线点
     * @param {*} mapId 地图ID
     * @param {*} points 原始轨迹点数据
     */
    _createPixel(mapId, points){
        let olMap = mapCtrl.getMapObj(mapId).olMap;
        let pixelData = points.map(e => {
            return olMap.getPixelFromCoordinate(geoUtil.projTo3857(e.coordinate));
        });
        let bezierData = dataHandler.getBeizerPoint(pixelData);
        return bezierData.map(e => {
            return olMap.getCoordinateFromPixel(e);
        });
    }
    /* --- trackPoint start --- */
    _trackPoint(options){
        let cloneData = JSON.parse(JSON.stringify(options));
        let trackFeas = cloneData.data.map(e => {
            let pointFea = new ol.Feature({
                geometry: new ol.geom.LineString(e.points)
            });
            e.style = e.style || {};
            pointFea.setStyle(new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: e.style.color || this.defaultStyle.stroke.color,
                    width: e.style.strokeWidth || this.defaultStyle.stroke.width
                })
            }));
            return pointFea;
        });

        this.olLayer.getSource().addFeatures(trackFeas);
        this.data = cloneData.data;
    }

    start1(){
    }
}
