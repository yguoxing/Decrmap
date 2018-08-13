import Osm from "../Osm";

function addOsmMap(mapId, options) {
    let osmObj = new Osm();
    osmObj.addMap(mapId, options);
}

export { addOsmMap };
