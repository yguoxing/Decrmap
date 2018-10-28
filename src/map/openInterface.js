import { mapCtrl } from './mapCtrl';

let openInterface = {
    setMapCenter: mapCtrl.setMapCenter,
    getMapCenter: mapCtrl.getMapCenter,
    fitMapExtent: mapCtrl.fitMapExtent,
    getMapExtent: mapCtrl.getMapExtent,
    updateBaselayer: mapCtrl.updateBaselayer,
    setBaselayerVisible: mapCtrl.setBaselayerVisible,
    setBaselayerOpacity: mapCtrl.setBaselayerOpacity,
    updateControl: mapCtrl.updateControl,
    removeMap: mapCtrl.removeMap,
    addPopup: mapCtrl.addPopup,
    removePopup: mapCtrl.removePopup,
    removeAllPopup: mapCtrl.removeAllPopup,
    colorMap: mapCtrl.colorMap,
    switchSatellite: mapCtrl.switchSatellite,
    switchRoad: mapCtrl.switchRoad,
    transform: mapCtrl.transform,
    transExtent: mapCtrl.transExtent
}

export { openInterface }