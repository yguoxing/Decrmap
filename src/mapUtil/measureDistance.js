/**
 * 测距工具，测量实际地理距离
 * 通过测绘工具变化时触发geometryFunction动态计算距离以及点击时绘制拐点
 * 注意点：测绘工具只要有变化都会触发geometryFunction，如鼠标位置每更改一次会触发一次
 *        单击地图时触发一次返回点信息最后两个点重复，双击地图时会触发三次，其中前两次
 *        与单机类似，最后一次代表测绘结束返回准确的点信息
 */
import ol from 'openlayers';
import MapUtilBase from './MapUtilBase';
import { mapCtrl } from '../map/mapCtrl';
import { geoUtil } from '../dataUtil/geoUtil';

export default class MeasureDistance extends MapUtilBase {

    constructor(options){
        
        super(options);

        // 测距拐点
        this.points = [];
        // 存储上次距离
        this.oldDistance = 0;

        // 测距拐点圆Id
        this.circleFeaId = 'circle_' + this.utilId;
        // 距离弹框Id
        this.popId = 'pop_' + this.utilId;
        this.movePopId = 'movePop_' + this.utilId;
        
        let olMap = mapCtrl.getMapObj(options.mapId).olMap;
        var self = this;
        this.drawInter = new ol.interaction.Draw({
            type: 'LineString',
            wrapX: false,
            stopEvent: true,
            source: this.getUtilSource(),
            style: new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: this.style.stroke.color,
                    width: this.style.stroke.width
                }),
                image: new ol.style.Icon({
                    src: '../css/images/ruler.cur',
                    offset: [-17, -12],
                    size: [44,35]
                })
            }),
            geometryFunction: function(e, geometry){
                self._drawing(e);
                if(!geometry){
                    geometry=new ol.geom.LineString(null);
                }
                geometry.setCoordinates(e);
                return geometry
            }
        });

        olMap.addInteraction(this.drawInter);
        this.drawInter.setActive(options.active);
        
        this.drawInter.on('drawend', function(e){
            self._drawEnd(e, self);
        });

        this.drawInter.on('drawstart', function(e){
            e.feature.setId(self.utilId);
        });
    }

    _drawEnd(e, self){
        e.feature.setStyle(new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: self.style.stroke.color,
                width: self.style.stroke.width
            })
        }));
        let showDistance = '总长：' + this._dealShow(this.oldDistance);

        var popHtml = self._createHtml(showDistance, true);
        
        let overlay = new ol.Overlay({
            element: popHtml,
            position: e.feature.getGeometry().getLastCoordinate(),
            offset: [8, 4]
        });
        overlay.set('popId', self.popId);
        mapCtrl.getMapObj(self.mapId).olMap.addOverlay(overlay);
        overlay.getElement().parentElement.style.zIndex = 10;
        popHtml.lastChild.addEventListener('click', function(e){
            self.closeUtil();
        });
        if(this.callback){
            this.points = [];
            this.callback({
                mapId: this.mapId,
                distance: this.oldDistance,
                coordinates: this.points
            })
        }
        setTimeout(() => {
            this.setActive(false);
        }, 200);
    }

    /**
     * 鼠标移动时获实时更新距离信息
     * @param {Array} e 测距工具点信息
     */
    _drawing(e){
        if(this.points.length - e.length === 0){
            return
        }
        let position = [0, 0], flag, overlayerId = this.popId;
        // 鼠标点击地图模式
        if(e.length - this.points.length === 2){
            this.points.push(e[e.length - 2]);
            this.refreshCircle();
            position = e[e.length - 2];
            if(this.points.length === 1){
                flag = 'start';
            }
        // 鼠标移动模式
        }else if(e.length - this.points.length === 1){
            //鼠标移动时将鼠标位置所在的点添加到this.points方便计算距离，得到距离后在删除该点
            this.points.push(e[e.length - 1]);

            position = e[e.length - 1];
            this.removeOverlay([this.movePopId]);
            flag = 'move';
            overlayerId = this.movePopId;
        }
        let overlay = new ol.Overlay({
            element: this._createHtml(this._getDistanceTip(flag, e)),
            position: position,
            offset: [8, 4]
        });
        if(flag === 'move'){
            this.points.pop();
        }
        overlay.set('popId', overlayerId);
        mapCtrl.getMapObj(this.mapId).olMap.addOverlay(overlay);
    }

    _dealShow(distance){
        let afterDeal = '';
        if(distance > 1000){
            afterDeal = Number((distance/1000).toFixed(2)) + '公里';
        }else{
            afterDeal = Number(distance.toFixed(2)) + '米';
        }
        return afterDeal;
    }

    setActive(flag){
        this.drawInter.setActive(flag);
    }

    /**
     * 根据点获取距离信息
     * @param {String} flag 测距模式
     * @param {Array} points 测距点
     */
    _getDistanceTip(flag, points){
        let tipInfo = '';
        
        if(flag === 'start'){
            tipInfo = '起点';
        }else{
            let lastPoint = geoUtil.projTo4326(this.points[this.points.length-1]);
            let prePoint = geoUtil.projTo4326(this.points[this.points.length-2]);
            let lastDistance = geoUtil.getDistance([prePoint,lastPoint]);

            tipInfo = this._dealShow(lastDistance + this.oldDistance);
            
            if(flag !== 'move'){
                this.oldDistance = lastDistance + this.oldDistance;
            }
        }
        return tipInfo;
    }

    /**
     * 生成测距显示框
     * @param {String} content 距离长度信息
     * @param {Boolean} isEnd 是否为结束显示框
     */
    _createHtml(content, isEnd){
        var outer = document.createElement('div');
        outer.style.backgroundColor = 'white';
        outer.style.borderRadius = '3px';
        outer.style.border = '1px solid #ce717d';
        outer.style.color = '#000000';
        outer.style.fontSize = '12px';
        outer.innerText = content;
        outer.style.padding = '1px 4px';
        if(isEnd){
            let closeImg = document.createElement('img');
            closeImg.src = '../demo/mapctrls.gif';
            closeImg.style.margin = '0 0 0 4px';
            closeImg.style.cursor = 'pointer';
            outer.appendChild(closeImg);
        }
        return outer;
    }

    /**
     * 刷新拐点圆圈
     * @param {Array} options 点信息
     */
    refreshCircle(options){
        let source = this.getUtilSource();
        let circleFea = source.getFeatureById(this.circleFeaId);
        if(circleFea){
            circleFea.setGeometry(new ol.geom.MultiPoint(this.points));
        }else{
            circleFea = new ol.Feature({
                geometry: new ol.geom.MultiPoint(this.points)
            });
            circleFea.setStyle(new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 4,
                    stroke: new ol.style.Stroke({
                        color: 'red',
                        width: 2
                    }),
                    fill: new ol.style.Fill({
                        color: 'white'
                    })
                })
            }))
            circleFea.setId(this.circleFeaId);
            source.addFeature(circleFea);
        }
    }

    closeUtil(){
        this.removeOverlay([this.movePopId, this.popId]);

        let utilSource = this.getUtilSource();

        let circleFea = utilSource.getFeatureById(this.circleFeaId);
        if(circleFea){
            utilSource.removeFeature(circleFea);
        }

        let lineFea = utilSource.getFeatureById(this.utilId);
        if(lineFea){
            utilSource.removeFeature(lineFea);
        }

        let olMap = mapCtrl.getMapObj(this.mapId).olMap;
        olMap.removeInteraction(this.drawInter);
    }
}