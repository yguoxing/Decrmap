import { registerLayerEvent } from './registerLayerEvent';
import { registerMapEvent } from './registerMapEvent';
import { registerMoveend } from './registerMoveend';
import { eventCtrl } from '../eventCtrl';

let Event = {
    removeEvent: eventCtrl.removeEvent,
    registerLayerEvent: registerLayerEvent,
    registerMapEvent: registerMapEvent,
    registerMoveend: registerMoveend
};

export { Event }