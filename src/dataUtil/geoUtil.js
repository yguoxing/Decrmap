import ol from 'openlayers';

let geoUtil = {};

/**
 * 转换点坐标为4326格式
 * @param {Array} coordnites 3857格式点坐标
 */
geoUtil.projTo4326 = function(coordnites){

    return ol.proj.transform(coordnites, 'EPSG:3857', 'EPSG:4326');
}

/**
 * 转换点坐标为3857格式
 * @param {*} coordnites 
 */
geoUtil.projTo3857 = function(coordnites){
    
    return ol.proj.transform(coordnites, 'EPSG:4326', 'EPSG:3857');
}

/**
 * 获取多个点之间的距离，实际地理长度
 * @param {Array} points 
 */
geoUtil.getDistance = function(points){
    let sphere = new ol.Sphere({
        geometry: new ol.geom.LineString(points),
        options: {
            projection: 'EPSG:4326',
            radius: 6370997
        }
    });
    return sphere.getLength();
}

/**
 * 获取区域地理面积
 * @param {Array} points 
 */
geoUtil.getArea = function(points){
    let sphere = new ol.Sphere({
        geometry: new ol.geom.Polygon(points),
        options: {
            projection: 'EPSG:4326',
            radius: 6370997
        }
    });
    return sphere.getArea();
}

export { geoUtil }