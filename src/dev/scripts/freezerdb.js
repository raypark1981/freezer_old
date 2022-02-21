const localMyFreezerName = 'MyFreezer'; 
const localAddFood = 'AddFood'; 
const localBasket = 'Basket'; 
const localCommonOption = 'Common'; 

const comomnOption = {
    reviewIntro : 'Y'
}
const initialAddFood = {
    FoodKey : -1,
    FoodCD : '', 
    FoodCDName: '',
    FoodName : '',
    FoodGrp : '',
    InputDate : new Date().convertFormatString('yyyy년 MM월 dd일') ,
    ExpiredDate : new Date().convertFormatString('yyyy년 MM월 dd일') ,
    FoodDetail : '' , 
    Memo : '',
    BasketMemo : '', 
    BasketYN : 'N'
};

const initialFoodList = [];
const initialBasket = [];

function createlocalFreezerDB () {
    // setLocalStorage([]);
}

function checkLocalStorage(){
    if(typeof localStorage.MyFreezer == 'undefined'){
        alert("this app has problem , it will be refreshed!")
        // location.reload();
        return false;
    }
    else{
        return true;
    }
}

function getLocalStorage(_key){
    if(checkLocalStorage()){
        return JSON.parse(localStorage.getItem(_key) == '' ? '[]' : localStorage.getItem(_key))
    }
}

function setLocalStorage(_key , _value){
    if(typeof _value != 'object'){
        console.warn('values must be object')
        return;
    }

    if(checkLocalStorage()){
        try{
            localStorage.setItem(_key , JSON.stringify(_value))
            return true;
        }
        catch(e){
            console.warn(e)
            return false;
        }
    }
}

createlocalFreezerDB.prototype.getCommonOption = function(){
    var _myCommonOption = localStorage.getItem(localCommonOption);
    return  JSON.parse(_myCommonOption);
}

createlocalFreezerDB.prototype.setCommonOption = function(_key , value){
    var _myCommonOption = localStorage.getItem(localCommonOption);
    localStorage.setItem(_key , { ..._myCommonOption , _key : value });
}

createlocalFreezerDB.prototype.getSyncData = function (){
    var _myfreezer = getLocalStorage(localMyFreezerName);
    return _myfreezer;
}

createlocalFreezerDB.prototype.insertFreezer = function(freezer){
    
    var _myfreezer = getLocalStorage(localMyFreezerName);

    var mainYN = _myfreezer.length == 0 ? "Y" : "N"

    var isExisted = false;
    _myfreezer.map((f) => {
        if(f.FreezerKey == freezer.FreezerKey && !isExisted)
            isExisted = true;
    })

    if(isExisted){
        console.warn('this freezer is already Existed')
        return;
    }

    if(freezer == undefined)
        console.warn('freezer is undefined')
    else
        _myfreezer.push({ ...freezer , MainYn : mainYN , MySections : []});

    setLocalStorage( localMyFreezerName , _myfreezer);
}

createlocalFreezerDB.prototype.updateFreezer = function(freezer){
    var _myfreezer = getLocalStorage(localMyFreezerName);

    _myfreezer.map((_freezer , i) => { 
        if(_freezer.FreezerKey === freezer.FreezerKey){
            _myfreezer[i] = { ..._myfreezer[i] , 
                FreezerName : freezer.FreezerName,
                MainYn : freezer.MainYn,		
            };
        } 
    });

    setLocalStorage( localMyFreezerName , _myfreezer);
}

createlocalFreezerDB.prototype.deleteFreezer = function(freezerkey){
    var _myfreezer = getLocalStorage(localMyFreezerName);
    
    _myfreezer.map((_freezer , i) => { 
        if(_freezer.FreezerKey === freezerkey){
            _myfreezer.splice(i, 1);
        } 
    });

    setLocalStorage( localMyFreezerName , _myfreezer);
}


createlocalFreezerDB.prototype.getFreezer = function(freezerKey){
    var _myfreezer = getLocalStorage(localMyFreezerName);
    if(freezerKey == undefined){
        var _filter_myfreezer = _myfreezer.filter(x=> {
            return true;
        })
        return _filter_myfreezer;
    }
    else{
        var _filter_myfreezer = _myfreezer.find(x=> x.FreezerKey == freezerKey)
        return _filter_myfreezer;
    }
};

createlocalFreezerDB.prototype.getSection = function(freezerKey, serctionKey){
    var _myfreezer = getLocalStorage(localMyFreezerName);
    if(freezerKey == undefined || serctionKey == undefined){
        var _filter_mySection = _myfreezer.filter(x=> {
            return true;
        })
        return _filter_mySection;
    }
    else{
        var _mySections = _myfreezer.find(x=> x.FreezerKey == freezerKey).MySections;
        var _filter_mySection = _mySections.find(s=> (s.SectionKey == serctionKey))

        return _filter_mySection
    }
};


createlocalFreezerDB.prototype.getMainFreezer = function(){
    var _myfreezer = getLocalStorage(localMyFreezerName);
    var _filter_myfreezer = _myfreezer.filter(x=> {
        return x.MainYn == "Y"
    })
    return _filter_myfreezer[0];
};

createlocalFreezerDB.prototype.getNewFreezerKey= function(){
    var _myFreezer = getLocalStorage(localMyFreezerName);
    var freezerKeys = _myFreezer.flatMap(f => f.FreezerKey.substring(1, 4))

    var max;
    for (var i=0 ; i<freezerKeys.length ; i++) {
        if (!max || parseInt(freezerKeys[i]) > parseInt(max))
            max = freezerKeys[i];
    }
    
    if (max == undefined)
        return "F001";

    var returnKey = parseInt(max) == -1 ? 1 : parseInt(max) + 1;
    return "F" + String(returnKey).padLeft(0, 3);
}

createlocalFreezerDB.prototype.insertSection = function(freezerkey , section){
    var _myfreezer = getLocalStorage(localMyFreezerName);

    var isExisted = false;
    _myfreezer.map((f) => {
        f.MySections.map(s => {
            if(s.SectionKey == section.SectionKey && !isExisted)
                isExisted = true;
        })
    })

    if(isExisted){
        console.warn('this section is already Existed')
        return;
    }

    if(_myfreezer.length == 0){
        console.warn('freezer is not existed')
    }
    else{
        _myfreezer.map((freezer , i ) => {
            if(freezer.FreezerKey == freezerkey){
                _myfreezer[i].MySections.push({ ...section , MyFoods : []})
            }
        })
    }

    setLocalStorage( localMyFreezerName , _myfreezer);
}

createlocalFreezerDB.prototype.updateSection = function(freezerKey, section){
    var _myfreezer = getLocalStorage(localMyFreezerName);
    if(_myfreezer.length == 0){
        console.warn('freezer is not existed')
    }
    else{
        _myfreezer.map((freezer , i) => {
            if(freezer.FreezerKey == freezerKey){
                freezer.MySections.map((mySetion , j) => {
                    if(mySetion.SectionKey == section.SectionKey)
                    _myfreezer[i].MySections[j] = {
                            ..._myfreezer[i].MySections[j],
                            SectionName : section.SectionName
                        }
                });
            }
        })
    }

    setLocalStorage( localMyFreezerName , _myfreezer);
}

createlocalFreezerDB.prototype.deleteSection = function(freezerKey, sectionKey){
    var _myfreezer = getLocalStorage(localMyFreezerName);
    if(_myfreezer.length == 0){
        console.warn('freezer is not existed')
    }
    else{
        _myfreezer.map((freezer , i) => {
            if(freezer.FreezerKey == freezerKey){
                freezer.MySections.map((mySetion , j) => {
                    if(mySetion.SectionKey == sectionKey)
                    _myfreezer[i].MySections.splice(j , 1) ;
                });
            }
        })
    }

    setLocalStorage( localMyFreezerName , _myfreezer);
}

createlocalFreezerDB.prototype.getNewSectionKey= function(freezerKey){
    var _myFreezer = getLocalStorage(localMyFreezerName);
    var _mySection = _myFreezer.filter(f => f.FreezerKey == freezerKey)[0].MySections;
    var sectionKeys = _mySection.flatMap(s => s.SectionKey.substring(1, 5));

    var max;
    for (var i=0 ; i<sectionKeys.length ; i++) {
        if (!max || parseInt(sectionKeys[i]) > parseInt(max))
            max = sectionKeys[i];
    }
    
    if (max == undefined)
        return "S0001";

    var returnKey = parseInt(max) == -1 ? 1 : parseInt(max) + 1;
    return "S" + String(returnKey).padLeft(0, 4);
}

createlocalFreezerDB.prototype.insertMyFood = function(sectionkey ,myFood , callback ){
    var _myfreezer = getLocalStorage(localMyFreezerName);

    var isExisted = false;
    _myfreezer.map((f) => {
        f.MySections.map(s => {
            s.MyFoods.map(f => {
                if(f.FoodKey == myFood.FoodKey && !isExisted)
                    isExisted = true;
            })
        })
    })

    if(isExisted){
        console.warn('this myFood is already Existed')
        return;
    }

    _myfreezer.map((freezer , i) =>{
        freezer.MySections.map((section , j) =>{
            if(section.SectionKey == sectionkey){
                _myfreezer[i].MySections[j].MyFoods.push(myFood);
            }
        })
    })

    setLocalStorage( localMyFreezerName , _myfreezer);

    if( callback != undefined){
        callback();
    }
}

createlocalFreezerDB.prototype.updateMyFood = function(myFood , callback ){
    var myFoods = [];
    var _myfreezer = getLocalStorage(localMyFreezerName);

    _myfreezer.map((freezer , i) =>{
        freezer.MySections.map((section , j) =>{
            section.MyFoods.map((food , k) => {
                if(myFood.FoodKey == food.FoodKey){
                    _myfreezer[i].MySections[j].MyFoods[k] = myFood;
                }
            })
        })
    })

    setLocalStorage( localMyFreezerName , _myfreezer);
    
    if( callback != undefined){
        callback();
    }
};

createlocalFreezerDB.prototype.deleteMyFood = function(myFoodkey , callback ){
    var myFoods = [];
    var _myfreezer = getLocalStorage(localMyFreezerName);
    _myfreezer.map((freezer , i) =>{
        freezer.MySections.map((section , j) =>{
            section.MyFoods.map((food , k) => {
                if(food.FoodKey == myFoodkey){
                    _myfreezer[i].MySections[j].MyFoods.splice(k , 1);
                }
            })
        })
    })

    setLocalStorage( localMyFreezerName , _myfreezer);

    if( callback != undefined){
        callback();
    }
};


createlocalFreezerDB.prototype.getMyFood = function(myFoodkey){
    var _myfreezer = getLocalStorage(localMyFreezerName);
    var myFood = [];
    _myfreezer.map((freezer , i) =>{
        freezer.MySections.map((section , j) =>{
           section.MyFoods.map((food , k) => {
               if(food.FoodKey == myFoodkey)
                myFood.push(food)
            });
        })
    })

    return myFood[0];
};

createlocalFreezerDB.prototype.getNewFoodKey = function(){
    var _myfreezer = getLocalStorage(localMyFreezerName);
    var myFood = [];
    _myfreezer.map((freezer , i) =>{
        freezer.MySections.map((section , j) =>{
           section.MyFoods.map((food , k) => {
                myFood.push(food);
            });
        })
    })

    var max;
    for (var i=0 ; i<myFood.length ; i++) {
        if (!max || parseInt(myFood[i]["FoodKey"]) > parseInt(max["FoodKey"]))
            max = myFood[i];
    }
    
    if (max == undefined)
        return 1;

    var returnKey = parseInt(max["FoodKey"]) == -1 ? 1 : parseInt(max["FoodKey"]) + 1;
    return returnKey;
};


createlocalFreezerDB.prototype.getAddFood = function(){
    return getLocalStorage(localAddFood);
};

createlocalFreezerDB.prototype.setAddFood = function(_value, callback ){
    setLocalStorage(localAddFood , _value);
    if( callback != undefined){
        callback();
    }
    return getLocalStorage(localAddFood);
};

createlocalFreezerDB.prototype.initializeAddFood = function(){
    setLocalStorage(localAddFood , initialAddFood);
    return getLocalStorage(localAddFood); 
};


function getBasketKey(){
    
    var _baskets = getLocalStorage(localBasket);
    var copybasket = [];
    copybasket = _baskets.filter((basket , i) =>{
            if(basket.BasketKey.toString().indexOf('N')  == -1)
            return basket;
    })

    var max;
    for (var i=0 ; i<copybasket.length ; i++) {
        if (!max || parseInt(copybasket[i]["BasketKey"].replace('Y' , '') == undefined ? -1 : copybasket[i]["BasketKey"].replace('Y' , '')) > parseInt(max["BasketKey"].replace('Y' , '')))
            max = copybasket[i];
    }
    
    if (max == undefined)
        return 'Y1';

    var returnKey = parseInt(max["BasketKey"].replace('Y' , '')) == -1 ? 'Y1' : 'Y'.concat(parseInt(max["BasketKey"].replace('Y' , '')) + 1);
    return returnKey;
};


createlocalFreezerDB.prototype.addBasket = function(basket , callback){
    var _baskets = getLocalStorage(localBasket);
    var _basketKey = getBasketKey();
    _baskets.push({ ...basket , BasketKey : _basketKey});

    setLocalStorage( localBasket , _baskets);
     
    return  { ...basket , BasketKey : _basketKey};
};

createlocalFreezerDB.prototype.getBasket = function(){
    var _baskets = getLocalStorage(localBasket);
    return _baskets;
};

createlocalFreezerDB.prototype.deleteBasket = function(basketkeyArray , callback){
    var _baskets = getLocalStorage(localBasket);

    for(var i = _baskets.length - 1; i >= 0; i--){
        for (var j = 0;  j < basketkeyArray.length; j++){
            if(_baskets[i] != undefined && _baskets[i].BasketKey  == basketkeyArray[j]){
                _baskets.splice(i , 1);
            }
        }
    }

    setLocalStorage( localBasket , _baskets);
    
    if( callback != undefined){
       return callback();
    }
    
};

createlocalFreezerDB.prototype.updateBasket= function(basket , callback){
    var _baskets = getLocalStorage(localBasket);

    _baskets.map((_basket , i) => { 
        if(_basket.BasketKey === basket.BasketKey){
            _baskets[i] = { ..._basket , 
                BasketMemo : basket.BasketMemo,		
                BasketYN : basket.BasketYN , 
                FoodName : basket.FoodName
            };
        } 
    });

    setLocalStorage( localBasket , _baskets);

    if( callback != undefined){
        return callback();
    }
}


createlocalFreezerDB.prototype.syncFromBasketToMyFreezer= function(){
    var _baskets = getLocalStorage(localBasket);
    var _myfreezer = getLocalStorage(localMyFreezerName);

    _myfreezer.map((freezer , i) => {
        freezer.MySections.map((section , j) =>{
            section.MyFoods.map((food , k) => {
                    _myfreezer[i].MySections[j].MyFoods[k] = {
                        ..._myfreezer[i].MySections[j].MyFoods[k] , 
                        BasketYN :  'N', 
                        BasketMemo : ''
                    }
                })
        }) 
    });

    _baskets.map((_basket , p) => { 
        _myfreezer.map((freezer , i) =>{
            freezer.MySections.map((section , j) =>{
                section.MyFoods.map((food , k) => {
                    if(_basket.FoodKey == food.FoodKey){
                        _myfreezer[i].MySections[j].MyFoods[k] = {
                            ...food , 
                            BasketYN :  _basket.BasketYN , 
                            BasketMemo : _basket.BasketMemo
                        }
                    }
                })
            })
        })
    });

    for(var i = _baskets.length - 1; i >= 0; i--){
        if(_baskets[i].IsNew == 'N'){
            _baskets.splice(i, 1);
        }
    }
        
    setLocalStorage( localMyFreezerName , _myfreezer);
    setLocalStorage( localBasket , _baskets);
}

createlocalFreezerDB.prototype.syncFromMyFreezerToBasket= function(){
    var _baskets = getLocalStorage(localBasket);
    var _myfreezer = getLocalStorage(localMyFreezerName);
    var basketkey = 0;
    var _filteredFreezer = []
    _myfreezer.map((freezer , p) => { 
        freezer.MySections.map((section , j) =>{
            section.MyFoods.map((food , k) => {
               if(food.BasketYN == 'Y') 
               _filteredFreezer.push({
                    BasketKey: 'N'.concat(++basketkey) , FoodKey : food.FoodKey , BasketYN : food.BasketYN , FoodName : food.FoodName , BasketMemo : food.BasketMemo ,  IsNew : 'N'
                })
            })
        })
    });

    var combined = common.mergeObjectByProperty(_baskets , _filteredFreezer , 'FoodName' , 'FoodKey')
    setLocalStorage( localBasket , combined);
    return combined;
}

;(function(){
    if(typeof localStorage.common == 'undefined')
        localStorage.setItem(localCommonOption , JSON.stringify(comomnOption));
    if(typeof localStorage.MyFreezer == 'undefined')
        localStorage.setItem(localMyFreezerName , initialFoodList);
    if(typeof localStorage.AddFood == 'undefined')
        localStorage.setItem(localAddFood , JSON.stringify(initialAddFood));
    if(typeof localStorage.Basket == 'undefined')
        localStorage.setItem(localBasket , JSON.stringify(initialBasket));
})()

module.exports = {
    createlocalFreezerDB: createlocalFreezerDB,
  };

//   var test = new freezer.createlocalFreezerDB();
//   test.insertFreezer({"FreezerKey" : "F001", "FreezerName" : "울집냉장고","MainYn" : "Y"})
//   test.insertSection('F001' , { "SectionKey" : "S0001", "SectionName"  : "신선칸"})
//   test.insertMyFood('S0001' , { "FoodKey" : "1", "FoodCD" : "100101000300000001" , "MasterCode" : "FM001" , "FoodCDName" : '과자', "FoodName" : "오트밀", "FoodGrp" : "FM001","InputDate" : "20181024", "ExpiredDate" : "20191024", "FoodDetail" : "","Memo" : "" ,"BasketMemo" : "", "BasketYN" : "N"})

//   test.updateSection({ "SectionKey" : "S0001", "SectionName"  : "과자칸"})
//   test.updateMyFood({"FoodKey" : "1", "FoodCD" : "100101000300000001", "FoodCDName" : '과자', "FoodName" : "과자", "FoodGrp" : "FM001","InputDate" : "20181024",
//   "ExpiredDate" : "20191024", "FoodDetail" : "","Memo" : ""})

//   test.deleteFreezer('F002')
//   test.deleteSection('S0002')
//   test.deleteMyFood('1')

//  var basket = { FoodKey : '' ,  FoodCD : '' , FoodName : '' , BasketMemo : '' , BasketKey :1 ,  IsNew : 'N'} // isNew == "N" ? 기존 냉장고 있는 데이터 : 장바구니 페이지에서 추가 