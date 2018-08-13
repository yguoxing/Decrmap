import Gaode from "../Gaode";

function addGaodeMap(mapId, options) {
    let gaodeObj = new Gaode();
    gaodeObj.addMap(mapId, options);
}

export { addGaodeMap };
