import { removeMap } from './removeMap';
import { addBaiduMap } from './addBaidu';
import { addGaodeMap } from './addGaode';
import { addGoogleMap } from './addGoogle';
import { addOsmMap } from './addOsm';
import { addWmsMap } from './addWms';
import { addBlankMap } from './addBlank';
import { openInterface } from '../openInterface'; 

const Map = {
    ...openInterface,
    addBaiduMap: addBaiduMap,
    addGaodeMap: addGaodeMap,
    addGoogleMap: addGoogleMap,
    addOsmMap: addOsmMap,
    addWmsMap: addWmsMap
}

export { Map }