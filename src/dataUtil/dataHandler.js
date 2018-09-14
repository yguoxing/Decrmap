
function getUUID(type) {
    function getCode() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }
    return (type + '_' + getCode() + getCode() + "-" + getCode());
}

/**
 * 一维数组去重
 * @param {Array} arr 
 */
function uniqueArray(arr){
    var hash=[];
    for (var i = 0; i < arr.length; i++) {
        if(hash.indexOf(arr[i])==-1){
            hash.push(arr[i]);
        }
    }
    return hash;
}

/**
 * 计算两向量顺时针夹角
 * @param {Array} vector1 起始向量
 * @param {Array} vector2 终止向量
 * @return {Number} 角度[0,2π]
 */
function calVectorAngle(vector1, vector2){
    var x1 = vector1[0], y1 = vector1[1],
        x2 = vector2[0], y2 = vector2[1];
    var epsilon = Number.MIN_VALUE;
    var nyPI = Math.PI;
    var dist, dot, degree, angle;
    
    //计算单位向量
    dist = Math.sqrt( x1 * x1 + y1 * y1 );
    x1 = x1/dist;
    y1 = y1/dist;
    dist = Math.sqrt( x2 * x2 + y2 * y2 );
    x2 = x2/dist;
    y2 = y2/dist;

    //计算向量夹角
    dot = x1 * x2 + y1 * y2;
    if ( Math.abs(dot-1.0) <= epsilon ){
		angle = 0.0;
    }else if ( Math.abs(dot+1.0) <= epsilon ){
		angle = nyPI;
    }else {
        //利用向量叉乘计算向量夹角是否大于180
        var cross;
        angle = Math.acos(dot);
        cross = x1 * y2 - x2 * y1;
        if (cross < 0 ) {
            angle = 2 * nyPI - angle;
        }
    }
    degree = angle *  180.0 / nyPI;
    return degree;
}

/**
 * 二维数组去重
 * @param {Array} arr [[x,y],[x,y]]
 */
/* function unique2DArray(arr){
    var hash=[];
    for (var i = 0; i < arr.length; i++) {
        if(hash.indexOf(arr[i])==-1){
            hash.push(arr[i]);
        }
    }
    for(var i = 0; i<arr.length; i++){
        for(hash){

        }
    }
    return hash;
} */

const dataHandler = {
    getUUID: getUUID,
    unique: uniqueArray,
    calVectorAngle: calVectorAngle
};
export { dataHandler }