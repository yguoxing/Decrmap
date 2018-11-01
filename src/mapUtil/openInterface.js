import { utilCtrl } from './mapUtilCtrl';

let openInterface = {
    removeUtil: utilCtrl.removeUtil,
    removeAllUtil: utilCtrl.removeAllUtil,
    isUtilExist: utilCtrl.isUtilExist,
    setActive: utilCtrl.setActive,
    isActive: utilCtrl.isActive
};

export { openInterface };