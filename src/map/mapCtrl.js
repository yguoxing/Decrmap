import { CONST } from '../dataUtil/constant';
import Baidu from './Baidu';
import Gaode from './Gaode';
import Google from './Google';
import Osm from './Osm';
import Wms from './Wms';

function addMap(mapId, param){
    let mapCla;
    if(param.type === CONST.MAPTYPE.OSM){
        mapCla = new OSM();
    }else if(param.type === CONST.MAPTYPE.GOOGLE){
        mapCla = new Google();
    }else if(param.type === CONST.MAPTYPE.GAODE){
        mapCla = new Gaode();
    }else if(param.type === CONST.MAPTYPE.BAIDU){
        mapCla = new Baidu();
    }else if(param.type === CONST.MAPTYPE.WMS){
        mapCla = new Wms();
    }
    mapCla.addMap(mapId, param);
}

function updateMap(mapId, param){}

function delMap(mapId){}

function getMapObj(mapId){}

let map = {
    addMap: addMap,
    updateMap: updateMap,
    delMap: delMap,
    getMapObj: getMapObj
}

export { map }
