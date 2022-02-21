
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
(function () {
    
    loadCSS("http://www.freezer.com/css/common/temp.css", function () {
        var menubutton = $('<div class="menu-button"></div>')
        menubutton.on('click', function () {
            $('.menu-button-content').toggleClass('show');
        })

        var menulist = $('<div class="menu-button-content"><ul class="room-list" id="room-list"></ul></div>');
        var menudata = [
            { 'title': 'Freezer/addDetail', url: '/html/Freezer/html/addDetail.html' },
            { 'title': 'Freezer/addFood', url: '/html/Freezer/html/addFood.html' },
            { 'title': 'Freezer/addMemo', url: '/html/Freezer/html/addMemo.html' },
            { 'title': 'Freezer/EditMyFreezer', url: '/html/Freezer/html/EditMyFreezer.html' },
            { 'title': 'Freezer/FoodList', url: '/FoodList' },
            { 'title': 'Freezer/FoodList_rightMenu', url: '/html/Freezer/html/FoodList_rightMenu.html' },
            { 'title': 'Freezer/FoodList_swipe', url: '/html/Freezer/html/FoodList_swipe.html' },
            { 'title': 'Freezer/load', url: '/html/Freezer/html/load.html' },
            { 'title': 'Freezer/searchRecipe', url: '/html/Freezer/html/searchRecipe.html' },
            { 'title': 'Freezer/Recipe', url: '/html/Freezer/html/Recipe.html' },
            { 'title': 'Freezer/main', url: '/html/Freezer/html/main.html' },
            { 'title': 'Freezer/searchFood', url: '/html/Freezer/html/searchFood.html' },

        ]
        
        $(menudata).each(function (x, item) {
            var li = $('<li data-value="' + item.url + '">' + item.title + '</li>');
            li.on('click', function () {
                var _url = $(this).data('value');
                location.href = _url
            })
            li.appendTo(menulist.find('.room-list'));
        })
        var gomain = $('<li data-value="/">메인</li>');
        gomain.on('click', function () {
            var _url = $(this).data('value');
            location.href = _url
        });
        gomain.appendTo(menulist.find('.room-list'));

        menubutton.appendTo($('body'));
        menulist.appendTo($('body'));

    })


    loadScript("http://unpkg.com/draggabilly@2/dist/draggabilly.pkgd.min.js", function () {

        var dragbutton = $('.menu-button').draggabilly({

        })

    })
    
})()