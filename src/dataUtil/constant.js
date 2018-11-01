const CONST = {
    MAPTYPE: {
        OSM: 'OSM',
        GOOGLE: 'GOOGLE',
        GAODE: 'GAODE',
        BAIDU: 'BAIDU',
        BLANK: 'BLANK',
        WMS: 'WMS'
    },
    LAYERTYPE: {
        CIRCLEPOINT: 'CIRCLEPOINT',
        MARKERPOINT: 'MARKERPOINT',
        LINE: 'LINE',
        HEATMAP: 'HEATMAP',
        TRACK: 'TRACK',
        POLYGON: 'POLYGON',
        SECTOR: 'SECTOR'
    },
    EVENTTYPE: {
        SINGLECLICK: 'SINGLECLICK',
        DOUBLECLICK: 'DOUBLECLICK',
        MOVEEND: 'MOVEEND'
    },
    OPENTYPE: {
        PUBLIC: 'PUBLIC',
        INTERNAL: 'INTERNAL'
    },
    CONTROL: {
        ZOOM: 'ZOOM',
        SCALELINE: 'SCALELINE',
        OVERVIEWMAP: 'OVERVIEWMAP',
        MOUSEPOSITION: 'MOUSEPOSITION'
    },
    ZINDEX: {
        BASELAYER: [0, 10],
        WMS: [11, 10],
        POLYGON: [101, 200],
        MARKERPOINT: [201, 300],
        CIRCLEPOINT: [301, 400],
        LINE: [401, 500]
    },
    MAPEVENTLAYER: 'decrmap_allLayer',
    MAPUTILLAYER: 'decrmap_utilLayer',
    DEBUG: {
        SHOWLOG: false
    }
};

export { CONST };