//"35.200" -> "35.2" 변환
function trimZeroPoint(value){
    return value ? value.replace(/(0+$)/, "").replace(/\.$/, "") : "";
}

function getPageingList(list, rowPerPage, pageNumber){
    return list.filter((element, idx) => (idx >= rowPerPage * pageNumber - rowPerPage && idx < rowPerPage * pageNumber));
}

//a, b 교집합
function intersect(a, b) {
    var tmp={}, res=[];
    tmp = a;
    for(var i=0;i<b.length;i++) {
        tmp.forEach(function(e){
            if(e.name == b[i].name){
                res.push({name: e.name, onoff:b[i].onoff});
                return false;
            }
        });
    }
    return res;
}

//a, b 차집합
function array_diff(a, b) {
    var res = []
    for(var i=0;i<b.length;i++) { 
        var idx = a.findIndex(e => (e && e.name == b[i].name));
        if(idx > -1) delete a[idx];
    }

    res = a.filter(e => (e));
    return res;
}

//교집합 + 차집합으로 a기준obj를 rerutn
function getNewArray(a, b){
    //a: 새로운 obj
    //b: 이전 obj

    //a, b 비교해서 name이 같으면, b의 상태값을 따라가고
    //name이 다르면 a에 있는 값만 선택!
    var intSt = intersect(a, b);
    var diff = array_diff(a, b);
    var res = [...intSt, ...diff];

    return res;
}



module.exports = {
    trimZeroPoint: trimZeroPoint,
    getPageingList: getPageingList,
    getNewArray: getNewArray,
  };