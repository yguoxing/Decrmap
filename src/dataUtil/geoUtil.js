import ol from 'openlayers';

let geoUtil = {};

/**
 * 转换点坐标为4326格式
 * @param {Array} coordnites 3857格式点坐标
 */
geoUtil.projTo4326 = function(coordnites){

    return ol.proj.transform(coordnites, 'EPSG:3857', 'EPSG:4326');
};

/**
 * 转换点坐标为3857格式
 * @param {*} coordnites 原坐标
 */
geoUtil.projTo3857 = function(coordnites){
    
    return ol.proj.transform(coordnites, 'EPSG:4326', 'EPSG:3857');
};

/**
 * 转换范围坐标成墨卡托坐标
 * @param {Array} extent [minx, miny, maxx, maxy]
 * @return {Array} [minx,miny,maxx,maxy]
 */
geoUtil.projExtentTo3857 = function(extent){

    return ol.proj.transformExtent(extent, 'EPSG:4326', 'EPSG:3857');
};

/**
 * 转换坐标
 * @param {Array} extent [minx, miny, maxx, maxy]
 * @return {Array} [minx,miny,maxx,maxy]
 */
geoUtil.projExtentTo4326 = function(extent){
    
    return ol.proj.transformExtent(extent, 'EPSG:3857', 'EPSG:4326');
};

/**
 * 获取多个点之间的距离，实际地理长度
 * @param {Array} points 线顶点
 */
geoUtil.getDistance = function(points){
    let sphere = new ol.Sphere(6378137);
    return sphere.haversineDistance(points[0], points[1]);
};

/**
 * 获取区域地理面积
 * @param {Array} points 多边形定点坐标
 */
geoUtil.getArea = function(points){
    let sphere = new ol.Sphere(6378137);
    return sphere.geodesicArea(points);
};

geoUtil.loadMask = function(id, flag){
    const maskId = 'decrmap_mask';
    if(document.getElementById(maskId)){
        document.getElementById(maskId).remove();
    }
    if(flag){
        let mask = document.createElement('div');
        mask.id = maskId;
        mask.style.height = '100%';
        mask.style.width = '100%';
        mask.style.position = 'absolute';
        mask.style.top = 0;
        mask.style.left = 0;
        document.getElementById(id).appendChild(mask);
    }
};

export { geoUtil };