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

export { geoUtil }