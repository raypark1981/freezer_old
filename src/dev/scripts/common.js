



function loadScript(url, callback) {
    var script = document.createElement("script")
    script.type = "text/javascript";

    if (script.readyState) {  //IE
        script.onreadystatechange = function () {
            if (script.readyState == "loaded" ||
                    script.readyState == "complete") {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {  //Others
        script.onload = function () {
            callback();
        };
    }

    var filename = url.substring(url.lastIndexOf('/') + 1);

    for (var i = 0; i < document.scripts.length; i++) {
        if (document.scripts[i].src.indexOf(filename) > -1) {
            break;
        } else {
            script.src = url;
            document.getElementsByTagName("head")[0].appendChild(script);
            break;
        }
    }
}

function loadCSS(url, callback, cssId) {
    cssId == undefined ? 'css' + new Date().getTime() : cssId;
    if (!document.getElementById(cssId)) {
        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.id = cssId;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = url;
        link.media = 'all';
        head.appendChild(link);

        if (link.readyState) {  //IE
            link.onreadystatechange = function () {
                if (link.readyState == "loaded" ||
                        link.readyState == "complete") {
                    link.onreadystatechange = null;
                    callback();
                }
            };
        } else {  //Others
            link.onload = function () {
                callback();
            };
        }


    }
}

function dateDiff(today , beCompared){
    var one_day=1000*60*60*24;
    
    // Convert both dates to milliseconds
    var date1_ms = today.getTime();
    var date2_ms = beCompared.getTime();

    // Calculate the difference in milliseconds
    var difference_ms = date1_ms - date2_ms;
        
    // Convert back to days and return
    //return Math.round(difference_ms/one_day); -> 반올림 처리
    //-> 올림 처리로 바꿈 오늘 부터 냉장고에 넣었으면 무조건 1일 의미 
    return Math.ceil(difference_ms / one_day)
}
  
/* property 3개까지 가능 */
function mergeObjectByProperty(arr1, arr2, ...props) {
    var arr3 = [];
    for(var i in arr1){
        var shared = false;
        for (var j in arr2)
            if (arr2[j][props[0]] == arr1[i][props[0]] && arr2[j][props[1]] == arr1[i][props[1]] && arr2[j][props[2]] == arr1[i][props[2]]) {
                shared = true;
                break;
            }
        if(!shared) arr3.push(arr1[i])
    }
    arr3 = arr3.concat(arr2);
    return arr3
}

module.exports = {
    loadScript : loadScript, 
    loadCSS : loadCSS , 
    dateDiff : dateDiff , 
    mergeObjectByProperty : mergeObjectByProperty
};