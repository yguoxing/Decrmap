var mapId = 'mapBox'

window.onload = function(){
    initMap();
    addCirclePoint();
    addPolygon();
    addMarkerPoint();
    addLine();
}

function initMap(){
    DMap.Map.addOsmMap(mapId, {defaultCenter: [116,40]});
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
    for(var i=0;i<1;i++){
        var angle = i/180 * Math.PI;
        data.push({
            // point: [center, [center[0] + Math.cos(angle)*radius, center[1] + Math.sin(angle)*radius]],
            point:[center, [116,40]],
            style: {
                color: '#00FF00',
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