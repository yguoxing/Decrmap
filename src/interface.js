import { Map } from './map/interface/mapInterface';
import { Layer } from './layer/interface/layerInterface';
import { Event } from './event/interface/eventInterface';
import { MapUtil } from './mapUtil/interface/utilInterface';


window.DMap = {
    Map: Map,
    Layer: Layer,
    Event: Event,
    MapUtil: MapUtil
}