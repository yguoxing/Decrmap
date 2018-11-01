import PopOverlay from '../PopOverlay';
import { overlayCtrl } from '../overlayCtrl';

function addPopup(options){
    let overlayIns = new PopOverlay(options);
    let param = {
        ...options,
        overlayIns: overlayIns
    };
    overlayCtrl.setOverlay(param);
}

const overlay = {
    addPopup: addPopup,
    removePopup: overlayCtrl.removeOverlay,
    removeAllPopup: overlayCtrl.removeAllOverlay
};

export { overlay };