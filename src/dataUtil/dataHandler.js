
function getUUID(type) {
    function getCode() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }
    return (type + '_' + getCode() + getCode() + "-" + getCode());
}

const dataHandler = {
    getUUID: getUUID
};
export { dataHandler }