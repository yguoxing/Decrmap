var mapId = 'mapBox'

window.onload = function(){
    initMap();
    addCirclePoint();
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
                    point: [[116,40]]
                }]
            })
        }
    });
}
