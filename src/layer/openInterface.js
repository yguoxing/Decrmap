import { layerCtrl } from './layerCtrl';

let openInterface = {
    isLayerExist: layerCtrl.isLayerExist,
    getAllLayerList: layerCtrl.getAllLayerList,
    removeAllLayer: layerCtrl.removeAllLayer,
    removeLayer: layerCtrl.removeLayer,
    setLayerVisible: layerCtrl.setLayerVisible,
    setLayerOpacity: layerCtrl.setLayerOpacity,
    getLayerData: layerCtrl.getLayerData,
    getLayerParam: layerCtrl.getLayerParam
};

export { openInterface };