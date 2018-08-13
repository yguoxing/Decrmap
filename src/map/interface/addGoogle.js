import Google from "../Google";

function addGoogleMap(mapId, options) {
    let googleObj = new Google();
    googleObj.addMap(mapId, options);
}

export { addGoogleMap };
