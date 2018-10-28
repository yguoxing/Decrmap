
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
 * 根据三级贝塞尔曲线计算一条经过给定点的平滑曲线
 * 由于该算法主要是计算一个闭合圆形的平滑曲线
 * @param {Array} points [[x,y]]
 */
function getBeizerPoint(points){
    function createCurve(originPoint, originCount){
        let curvePoint = [];
        //控制点收缩系数 ，经调试0.6较好，CvPoint是opencv的，可自行定义结构体(x,y)  
        let scale = 0.6;
        let midpoints = [];  
        //生成中点       
        for(let i = 0 ;i < originCount ; i++){
            let nexti = (i + 1);
            if(i === originCount -1 ){
                nexti = i;
            }
            midpoints[i] = {};
            midpoints[i].x = (originPoint[i][0] + originPoint[nexti][0])/2.0;  
            midpoints[i].y = (originPoint[i][1] + originPoint[nexti][1])/2.0;  
        }
        
        //平移中点  
        let extrapoints = [];
        for(let i = 0 ;i < originCount ; i++){
            if(!extrapoints[i]){
                extrapoints[i] = [];
            }
            let nexti = i + 1;
            let backi = (i + originCount - 1) % originCount;
            let midinmid = {};
            midinmid.x = (midpoints[i].x + midpoints[backi].x)/2.0;
            midinmid.y = (midpoints[i].y + midpoints[backi].y)/2.0;
            let offsetx = originPoint[i][0] - midinmid.x;
            let offsety = originPoint[i][1] - midinmid.y;

            let extraindex = 2 * i;
            extrapoints[extraindex] = [];
            extrapoints[extraindex][0] = midpoints[backi].x + offsetx;
            extrapoints[extraindex][1] = midpoints[backi].y + offsety;
            //朝 originPoint[i]方向收缩 
            let addx = (extrapoints[extraindex][0] - originPoint[i][0]) * scale;
            let addy = (extrapoints[extraindex][1] - originPoint[i][1]) * scale;
            extrapoints[extraindex][0] = originPoint[i][0] + addx;
            extrapoints[extraindex][1] = originPoint[i][1] + addy;
            
            let extranexti = (extraindex + 1)%(2 * originCount);
            extrapoints[extranexti] = [];
            extrapoints[extranexti][0] = midpoints[i].x + offsetx;
            extrapoints[extranexti][1] = midpoints[i].y + offsety;
            //朝 originPoint[i]方向收缩
            addx = (extrapoints[extranexti][0] - originPoint[i][0]) * scale;
            addy = (extrapoints[extranexti][1] - originPoint[i][1]) * scale;
            extrapoints[extranexti][0] = originPoint[i][0] + addx;
            extrapoints[extranexti][1] = originPoint[i][1] + addy;
        }
        
        let controlPoint = [];
        //生成4控制点，产生贝塞尔曲线
        for(let i = 0 ;i < originCount ; i++){
            //最后两个点时不计算曲线，否则将构成闭合圆形
            if(i === originCount-1 || i === originCount-2){
                continue;
            }
            controlPoint[0] = originPoint[i];
            let extraindex = 2 * i;
            controlPoint[1] = extrapoints[extraindex + 1];
            let extranexti = (extraindex + 2) % (2 * originCount);
            controlPoint[2] = extrapoints[extranexti];
            let nexti = (i + 1) % originCount;
            controlPoint[3] = originPoint[nexti];
            let u = 1;
            while(u >= 0){
                let px = bezier3funcX(u,controlPoint);
                let py = bezier3funcY(u,controlPoint);
                //u的步长决定曲线的疏密
                u -= 0.05;
                let tempP = [px, py];
                //存入曲线点
                curvePoint.push(tempP);
            }
        }
        return curvePoint;
    }  
    //三次贝塞尔曲线  
    function bezier3funcX(uu, controlP){
        let part0 = controlP[0][0] * uu * uu * uu;
        let part1 = 3 * controlP[1][0] * uu * uu * (1 - uu);
        let part2 = 3 * controlP[2][0] * uu * (1 - uu) * (1 - uu);
        let part3 = controlP[3][0] * (1 - uu) * (1 - uu) * (1 - uu);
        return part0 + part1 + part2 + part3;
    }
    function bezier3funcY(uu, controlP){
        let part0 = controlP[0][1] * uu * uu * uu;
        let part1 = 3 * controlP[1][1] * uu * uu * (1 - uu);
        let part2 = 3 * controlP[2][1] * uu * (1 - uu) * (1 - uu);
        let part3 = controlP[3][1] * (1 - uu) * (1 - uu) * (1 - uu);
        return part0 + part1 + part2 + part3;
    }
    //多添加一个起始点，避免计算第一个点的曲线与最后一个点关联
    points.push(points[0]);
    return createCurve(points, points.length);
}

const dataHandler = {
    getUUID: getUUID,
    unique: uniqueArray,
    getBeizerPoint: getBeizerPoint,
    calVectorAngle: calVectorAngle
};
export { dataHandler }