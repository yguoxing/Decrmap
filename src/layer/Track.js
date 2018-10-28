import ol from 'openlayers';
import { Log } from '../dataUtil/consoleLog';
import LayerBase from "./LayerBase";
import { CONST } from '../dataUtil/constant';
import { mapCtrl } from '../map/mapCtrl';
import { dataHandler} from '../dataUtil/dataHandler';
import { geoUtil } from '../dataUtil/geoUtil'

export default class Track extends LayerBase {

    constructor(options){
        super(options);
        this.layerType = CONST.LAYERTYPE.TRACK;
        this.defaultStyle = {
            radius: 20,
            stroke: {
                color: '#999',
                width: 2
            },
            fill: {
                color: '#4bea6f'
            }
        }
    }
    
    addLayer(options){
        this.mapId = options.mapId;
        super.addLayer(options);
    }

    setData(options){
        let cloneData = JSON.parse(JSON.stringify(options));
        let trackFeas = cloneData.data.map((e, i) => {
            let bezierData = this._createPixel(options.mapId,e.points);
            cloneData.data[i] = bezierData;
            let pointFea = new ol.Feature({
                geometry: new ol.geom.LineString(bezierData)
            });
            e.style = e.style || {};
            pointFea.setStyle(new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: e.style.color || this.defaultStyle.stroke.color,
                    width: e.style.strokeWidth || this.defaultStyle.stroke.width
                })
            }))
            return pointFea;
        })

        this.olLayer.getSource().addFeatures(trackFeas);
        this.data = cloneData.data;

        let trackCanvas = document.getElementById('decrmap_track');
        if(trackCanvas){
            trackCanvas.remove();
        }
        let mapSize = mapCtrl.getMapObj(this.mapId).olMap.getSize();
        let topCanvas = document.createElement('canvas');
        topCanvas.height = mapSize[1], topCanvas.width = mapSize[0];
        topCanvas.style.position = 'absolute';
        topCanvas.style.top = 0;
        topCanvas.style.left = 0;
        topCanvas.style.height = '100%';
        topCanvas.style.width = '100%';
        topCanvas.id = 'decrmap_track';
        let before = document.getElementById(mapId).getElementsByClassName('ol-viewport')[0];
        let next = document.getElementById(mapId).getElementsByClassName('ol-viewport')[0].getElementsByClassName('ol-overlaycontainer')[0];
        before.insertBefore(topCanvas, next);
    }

    start(){
        let step = 0, index, self = this;
        let olMap = mapCtrl.getMapObj(this.mapId).olMap;
        

        let interval = setInterval(function(){
            if(step >= self.data[0].length){
                self.stop.call(self);
            }
            self._removeTrackTail();
            index = step > 9 ? 9 : step + 1;
            self._createTrackTail(self.mapId, self.data[0].slice(step, step+1), '#4ff188');
            step++;
        },30)
        
        this.interval = interval;
    }

    stop(){
        clearInterval(this.interval);
    }

    lastPoint(){
        
    }

    pause(){

    }

    setSpeed(){

    }

    /* _createTrackTail(points, color){
        let radius = [1, 0, 2, 0, 3, 0, 4, 0, 6];
        let tailFeas = [];
        for(let i=0;i<points.length;i=i+2){
            let tailFea = new ol.Feature({
                geometry: new ol.geom.Point(points[i])
            });
            tailFea.setStyle(new ol.style.Style({
                image: new ol.style.Circle({
                    fill: new ol.style.Fill({
                        color: color
                    }),
                    stroke: new ol.style.Stroke({
                        width: 1,
                        color: 'rgba(79,241,136,0.65)'
                    }),
                    radius: radius[i]
                })
            }))
            tailFea.set('tailId', 'tail');
            tailFeas.push(tailFea);
        }
        this.olLayer.getSource().addFeatures(tailFeas);
    }

    _removeTrackTail(){
        let features = this.olLayer.getSource().getFeatures();
        for(let j=features.length -1;j>-1;j--){
            if(features[j].get('tailId') === 'tail'){
                this.olLayer.getSource().removeFeature(features[j]);
            }
        }
    } */

    _createTrackTail(mapId, points,color){
        var context = document.getElementById('decrmap_track').getContext("2d");//设置绘图环境
        let olMap = mapCtrl.getMapObj(mapId).olMap;
        let pixelData = points.map(e => {
            return olMap.getPixelFromCoordinate(e);
        });
        let mapSize = olMap.getSize();
        // context.save();
        context.fillStyle = 'rgba(0, 0, 0, 0.9)';
        var prev = context.globalCompositeOperation;
        context.globalCompositeOperation = 'destination-in';
        
        context.fillRect(0, 0, mapSize[0], mapSize[1]);
        context.globalCompositeOperation = prev;
        // context.restore();

        context.save();
        context.fillStyle = '#fff';
        context.shadowColor = '#fff';
        context.shadowBlur = 9;
        context.beginPath();
        context.arc(pixelData[0][0], pixelData[0][1], 3, 0, Math.PI * 2, true);
        context.fill();
        context.closePath();
        context.restore();

        var linear = context.createLinearGradient(0,0,400,400);
        linear.addColorStop(0.3,"rgba(255,0,0,1)");
        linear.addColorStop(0.5,"rgba(255,0,0,0.5)");
        linear.addColorStop(1,"rgba(255,0,0,0)");
        context.lineWidth = 3;
        context.strokeStyle = linear;   
        context.beginPath();  
        context.moveTo(0,0);  
        context.lineTo(200,300);
        context.lineTo(400,400);
        context.stroke();
    }

    _getBox(data){
        let maxX = data[0][0], maxY = data[0][1], minX = data[0][0], minY = data[0][1];
        data.forEach(d => {
            if(data[0] > maxX){
                maxX = data[0];
            }

            if(data[0] < minX){
                minX = data[0];
            }

            if(data[1] > maxY){
                maxY = data[1];
            }

            if(data[1] < minY){
                minY = data[1];
            }
        })

        return [minX, minY, maxX, maxY];
    }

    _removeTrackTail(){

    }

    /**
     * 线上拐点 贝塞尔计算后生成曲线点
     * @param {*} mapId 
     * @param {*} points 
     */
    _createPixel(mapId, points){
        let olMap = mapCtrl.getMapObj(mapId).olMap;
        let pixelData = points.map(e => {
            return olMap.getPixelFromCoordinate(geoUtil.projTo3857(e.coordinate));
        });
        let bezierData = dataHandler.getBeizerPoint(pixelData);
        return bezierData.map(e => {
            return olMap.getCoordinateFromPixel(e);
        })
    }
}
