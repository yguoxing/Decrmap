var mapId = 'mapBox'

window.onload = function(){
    // initOSMMap();
    // initBaiduMap();
    // initGaodeMap();
    initGoogleMap();
    addCirclePoint();
    addPolygon();
    addMarkerPoint();
    addLine();
    // getCurrentPos();
}

function getCurrentPos(){
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {  
                console.log( position.coords.longitude );
                console.log( position.coords.latitude );
            },
            function (e) {
               throw(e.message);
            }
        )
    }
}


function initOSMMap(){
    DMap.Map.addOsmMap(mapId, {defaultCenter: [116,40]});
}

function initBaiduMap(){
    DMap.Map.addBaiduMap(mapId, {defaultCenter: [108.9290, 34.2583],zoom: 15});
}

function initGaodeMap(){
    DMap.Map.addGaodeMap(mapId, {defaultCenter: [116,40]});
}

function initGoogleMap(){
    DMap.Map.addGoogleMap(mapId, {defaultCenter: [116,40]});
}

function addCirclePoint(){
    DMap.Layer.CirclePoint.addLayer({
        mapId: mapId,
        layerId: 'circlePoint',
        callback: function(layerId){
            DMap.Layer.CirclePoint.setData({
                mapId: mapId,
                layerId: 'circlePoint',
                data: [{
                    point: [[116,40]],
                    style:{
                        radius: 15,
                        strokeColor: 'red',
                        strokeWidth: 3,
                        fillColor: 'gray'
                    }
                }]
            })
        }
    });
}

function addPolygon(){
    DMap.Layer.Polygon.addLayer({
        mapId: mapId,
        layerId: 'polygon',
        callback: function(layerId){
            DMap.Layer.Polygon.setData({
                mapId: mapId,
                layerId: 'polygon',
                data:[{
                    point: [[[[116, 40], [116.3, 40], [116.3, 40.2], [116, 40.2], [116, 40]]]]
                }]
            })
        }
    })
}

function addMarkerPoint(){
    DMap.Layer.MarkerPoint.addLayer({
        mapId: mapId,
        layerId: 'markerPoint',
        callback: function(layerId){
            DMap.Layer.MarkerPoint.setData({
                mapId: mapId,
                layerId: 'markerPoint',
                data: [{
                    point: [[116.25, 39], [116.45, 39.8]],
                    src: '../demo/marker.png',
                    size: 20
                }]
            })
        }
    })
}


function addLine(){
    var radius = 0.3;
    var center = [116.35, 39]
    var data = [];
    for(var i = 0; i < 1; i++){
        var angle = i/180 * Math.PI;
        data.push({
            // point: [center, [center[0] + Math.cos(angle)*radius, center[1] + Math.sin(angle)*radius]],
            point:[center, [116,40]],
            style: {
                color: '#FF0000',
                width: 3,
                arrow: true
            }
        })
    }
    DMap.Layer.Line.addLayer({
        mapId: mapId,
        layerId: 'lineArrow',
        callback: function(layerId){
            DMap.Layer.Line.setData({
                mapId: mapId,
                layerId: 'lineArrow',
                data: data
            })
        }
    })
}

var CONST = {
    disStatus: true,
    angleStatus: true
}

function measureDistance(){
    DMap.MapUtil.openMeasureDistance({
        mapId: mapId,
        active: true
    })
}

function measureAngle(){
    DMap.MapUtil.openMeasureAngle({
        mapId: mapId,
        active: true
    })
}

function measureArea(){
    DMap.MapUtil.openMeasureArea({
        mapId: mapId,
        active: true
    })
}

function drawPoint(){
    DMap.MapUtil.drawPoint({
        mapId: mapId,
        active: true,
        callback: function(param){
            console.log(param);
        }
    })
}

function drawLine(){
    DMap.MapUtil.drawLine({
        mapId: mapId,
        active: true,
        callback: function(param){
            console.log(param);
        }
    })
}

function drawCircle(){
    DMap.MapUtil.drawCircle({
        mapId: mapId,
        active: true,
        callback: function(param){
            console.log('draw circle', param);
        }
    })
}

function drawPolygon(){
    DMap.MapUtil.drawPolygon({
        mapId: mapId,
        active: true,
        callback: function(param){
            console.log('draw polygon', param);
        }
    })
}

function drawRectangle(){
    DMap.MapUtil.drawRectangle({
        mapId: mapId,
        active: true,
        callback: function(param){
            console.log('draw rectangle', param);
        }
    })
}