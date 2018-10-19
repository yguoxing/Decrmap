var mapId = 'mapBox';

const constData = {
    maptype: ''
}

window.onload = function(){
    collapsed();
    let status = false;
    $("#switchButton").click(function(){
        let width = status ? 0 : 400;
        let left = status ? 12 : 412;
        status = !status;
        $(".menuOuter").animate({
            width: width
        }, 1000 );

        $("#switchButton").animate({
            left: left
        }, 1000 );
    });
    

    // initOSMMap();
    // initBaiduMap();
    initGaodeMap();
    // initGoogleMap();
    /* addCirclePoint();
    addPolygon();
    addMarkerPoint();
    addLine(); */
}



function collapsed(defaultShow){
    $('.menu h3').click(function(){
        if(!$(this).next().hasClass('collapsed_open')){
            let self = this;
            $(".menu .collapsed_open").stop();
            $(".menu .collapsed_open").animate({
                height: '0'
            }, 600 );

            let showSpan = $(this).next('div');
            let outerHeight = $('.menuOuter').height();
            let h3Height = $('.menu h3').height();
            let childrenHeight = $('.menu h3').length * h3Height;
            showSpan.animate({
                height: (outerHeight - childrenHeight - 10) + 'px'
            }, 600);

            $(".menu div").removeClass('collapsed_open');
            $(self).next('div').addClass('collapsed_open');
        }
    })
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
    DMap.Map.addOsmMap(mapId, {
        defaultCenter: [116,40], 
        ctrls:[{type: 'ZOOM'}, {type: 'SCALELINE'}, {type: 'OVERVIEWMAP', collapsed: false}, {type: 'MOUSEPOSITION'}]
    });
}

function initBaiduMap(){
    DMap.Map.addBaiduMap(mapId, {
        defaultCenter: [108.9290, 34.2583],
        zoom: 15,
        ctrls: [{type: 'ZOOM'}, {type: 'SCALELINE'}, {type: 'OVERVIEWMAP', collapsed: false}, {type: 'MOUSEPOSITION'}]
    });
}

function initGaodeMap(){
    DMap.Map.addGaodeMap(mapId, {
        defaultCenter: [116,40],
        zoom: 15,
        ctrls: [{type: 'ZOOM'}, {type: 'SCALELINE'}, {type: 'OVERVIEWMAP', collapsed: false}, {type: 'MOUSEPOSITION'}]
    });
}

function initGoogleMap(){
    DMap.Map.addGoogleMap(mapId, {
        defaultCenter: [116,40],
        zoom: 15,
        ctrls: [{type: 'ZOOM'}, {type: 'SCALELINE'}, {type: 'OVERVIEWMAP', collapsed: false}, {type: 'MOUSEPOSITION'}]
    });
}

function updateBaselayer(type){
    DMap.Map.updateBaselayer({
        mapId: mapId,
        type: type
    })
}

function addCirclePoint(num){
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

function addPolygon(num){
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

function addMarkerPoint(num){
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


function addLine(num){
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

var util = {
    measDis: { id: 'measureDis', status: false },
    measAng: { id: 'measureAng', status: false },
    measArea: { id: 'measureArea', status: false },
    drawLine: { id: 'drawLine', status: false },
    drawPoint: { id: 'drawPoint', status: false},
    drawCircle: { id: 'drawCircle', status: false },
    drawPolygon: { id: 'drawPolygon', status: false },
    drawRectangle: { id: 'drawRectangle', status: false }
}

function measureDistance(){
    let param = {mapId: mapId, utilId: util.measDis.id};

    if(!DMap.MapUtil.isUtilExist(param)){

        DMap.MapUtil.openMeasureDistance({
            mapId: mapId,
            utilId: util.measDis.id,
            active: true,
            callback: function(param){
                console.log('measure distance', param);
            }
        })
    } else {
        if(DMap.MapUtil.isActive(param)){
            DMap.MapUtil.removeUtil(param);
        }else{
            util.measDis.id = 'measureDis' + Math.ceil(Math.random()*1000);
            DMap.MapUtil.openMeasureDistance({
                mapId: mapId,
                utilId: util.measDis.id,
                active: true,
                callback: function(param){
                    console.log('measure distance', param);
                }
            })
        } 
    }
}

function measureAngle(){
    let param = {mapId: mapId, utilId: util.measAng.id};

    if(!DMap.MapUtil.isUtilExist(param)){

        DMap.MapUtil.openMeasureAngle({
            mapId: mapId,
            active: true,
            utilId: param.utilId,
            callback: function(param){
                console.log('measure angle', param);
            }
        })
    } else {
        if(DMap.MapUtil.isActive(param)){
            DMap.MapUtil.removeUtil(param);
        }else{
            util.measAng.id = 'measureAng' + Math.ceil(Math.random()*1000);
            DMap.MapUtil.openMeasureAngle({
                mapId: mapId,
                active: true,
                utilId: util.measAng.id,
                callback: function(param){
                    console.log('measure angle', param);
                }
            })
        } 
    }
}

function measureArea(){
    let param = {mapId: mapId, utilId: util.measArea.id};

    if(!DMap.MapUtil.isUtilExist(param)){

        DMap.MapUtil.openMeasureArea({
            mapId: mapId,
            active: true,
            utilId: util.measArea.id,
            callback: function(param){
                console.log('measure area', param);
            }
        })
    } else {
        if(DMap.MapUtil.isActive(param)){
            DMap.MapUtil.removeUtil(param);
        }else{
            util.measArea.id = 'measureArea' + Math.ceil(Math.random()*1000);
            DMap.MapUtil.openMeasureArea({
                mapId: mapId,
                active: true,
                utilId: util.measArea.id,
                callback: function(param){
                    console.log('measure area', param);
                }
            })
        } 
    }
}

function drawPoint(){
    let param = {mapId: mapId, utilId: util.drawPoint.id};

    if(!DMap.MapUtil.isUtilExist(param)){
        DMap.MapUtil.drawPoint({
            mapId: mapId,
            active: true,
            utilId: param.utilId,
            callback: function(param){
                console.log(param);
            }
        })
    } else {
        if(DMap.MapUtil.isActive(param)){
            DMap.MapUtil.removeUtil(param);
        }else{
            util.drawPoint.id = 'drawPoint' + Math.ceil(Math.random()*1000);
            DMap.MapUtil.drawPoint({
                mapId: mapId,
                active: true,
                utilId: util.drawPoint.id,
                callback: function(param){
                    console.log(param);
                }
            })
        }
    }
}

function drawLine(){
    let param = {mapId: mapId, utilId: util.drawLine.id};

    if(!DMap.MapUtil.isUtilExist(param)){
        DMap.MapUtil.drawLine({
            mapId: mapId,
            active: true,
            utilId: util.drawLine.id,
            callback: function(param){
                console.log(param);
            }
        })
    } else {
        if(DMap.MapUtil.isActive(param)){
            DMap.MapUtil.removeUtil(param);
        }else{
            util.drawLine.id = 'drawLine' + Math.ceil(Math.random()*1000);
            DMap.MapUtil.drawLine({
                mapId: mapId,
                active: true,
                utilId: util.drawLine.id,
                callback: function(param){
                    console.log(param);
                }
            })
        }
    }
}

function drawCircle(){
    let param = {mapId: mapId, utilId: util.drawCircle.id};

    if(!DMap.MapUtil.isUtilExist(param)){
        DMap.MapUtil.drawCircle({
            mapId: mapId,
            active: true,
            utilId: util.drawCircle.id,
            callback: function(param){
                console.log('draw circle', param);
            }
        })
    } else {
        if(DMap.MapUtil.isActive(param)){
            DMap.MapUtil.removeUtil(param);
        }else{
            util.drawCircle.id = 'drawCircle' + Math.ceil(Math.random()*1000);
            DMap.MapUtil.drawCircle({
                mapId: mapId,
                active: true,
                utilId: util.drawCircle.id,
                callback: function(param){
                    console.log('draw circle', param);
                }
            })
        }
    }
}

function drawPolygon(){
    let param = {mapId: mapId, utilId: util.drawPolygon.id};

    if(!DMap.MapUtil.isUtilExist(param)){
        DMap.MapUtil.drawPolygon({
            mapId: mapId,
            active: true,
            utilId: util.drawPolygon.id,
            callback: function(param){
                console.log('draw polygon', param);
            }
        })
    } else {
        if(DMap.MapUtil.isActive(param)){
            DMap.MapUtil.removeUtil(param);
        }else{
            util.drawPolygon.id = 'drawPolygon' + Math.ceil(Math.random()*1000);
            DMap.MapUtil.drawPolygon({
                mapId: mapId,
                active: true,
                utilId: util.drawPolygon.id,
                callback: function(param){
                    console.log('draw polygon', param);
                }
            })
        }
    }
}

function drawRectangle(){
    let param = {mapId: mapId, utilId: util.drawRectangle.id};

    if(!DMap.MapUtil.isUtilExist(param)){
        DMap.MapUtil.drawRectangle({
            mapId: mapId,
            active: true,
            utilId: util.drawRectangle.id,
            callback: function(param){
                console.log('draw rectangle', param);
            }
        })
    } else {
        if(DMap.MapUtil.isActive(param)){
            DMap.MapUtil.removeUtil(param);
        }else{
            util.drawRectangle.id = 'drawRectangle' + Math.ceil(Math.random()*1000);
            DMap.MapUtil.drawRectangle({
                mapId: mapId,
                active: true,
                utilId: util.drawRectangle.id,
                callback: function(param){
                    console.log('draw rectangle', param);
                }
            })
        }
    }
}

function changeMapColor(){
    let isShow = ($('.sliderContainer')[0].style.display === 'none'  || $('.sliderContainer')[0].style.display === '') ?false:true;
    if(isShow){
        $('.sliderContainer').hide();
        return;
    }else{
        $('.sliderContainer').show();
    }
    
    for(var i=1;i<10;i++){
        $("#slider"+i).slider({
            max: 200,
            min: 0,
            value: 0,
            change: function(event, ui){
                var id = event.target.id.substr(event.target.id.length-1, 1);
                $('#input' + id).val(Number(ui.value)/100);
                let list = getParaList();
                var options = {
                    mapId: mapId,
                    param: list
                }
                DMap.Map.colorMap(options);
            }
        });
    }
}

function getParaList(){
    let list = [[],[],[]];
    for(var i=0;i<3;i++){
        list[i].push(Number($('#input'+(i*3+1)).val()));
        list[i].push(Number($('#input'+(i*3+2)).val()));
        list[i].push(Number($('#input'+(i*3+3)).val()));
    }
    return list;
}

function changeColor(commonColor){
    let list;
    if(commonColor){
        if(commonColor === 'default'){
            list = null;
        }else if(commonColor === 'same'){
            list = [[0.38, 0.19, 0.28],[0.15, 0.19,0.19],[0.17, 0.15, 0.16]];
        }else{
            list = commonColor;
        }
    }else{
        list = getParaList();
        $( this.event.target.previousSibling ).slider( "option", "value", Number(this.event.target.value)*100 )
    }
    var options = {
        mapId: mapId,
        param: list
    }
    DMap.Map.colorMap(options);
}

function switchSat(def){
    if(def){
        DMap.Map.switchRoad({mapId: mapId});
        constData.maptype = '';
    }else{
        DMap.Map.switchSatellite({mapId: mapId});
        constData.maptype = 'sat';
    }
}