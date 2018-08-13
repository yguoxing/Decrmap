import Wms from "../Wms";

function addWmsMap(mapId, options) {
    let wmsObj = new Wms();
    wmsObj.addMap(mapId, options);
}

export { addWmsMap };
