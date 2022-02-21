//가장 먼저 페이스북 sdk 로딩 
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = 'https://connect.facebook.net/ko_KR/sdk.js#xfbml=1&version=v3.1&appId=2207998352819248&autoLogAppEvents=1';
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

Main = {
    checkLoginStatus: function () {
        $(".loading").css('display', 'block');
        //db 로그인 유지 or not 가져 오기 
        var keepLogin = false;

        if (keepLogin) {//로그인 유지인 경우
           //자동로그인
        } else {//로그인 유지가 아닌 경우
            //페이스북으로 시작할것인지? 아니면 직접 입력할것인지 선택버튼 보이기 
            setTimeout(function () {
                Main.showLoginOption();
            }, 1000);
        }
    },

    showLoginOption: function(){
        if (document.querySelector(".logo").classList.length == 1) {
            $(".tooltip .tooltiptext").addClass("active");
            $(".logo").addClass("active");
            $(".loading").css('display', 'none');
            
        }
    },
      
    checkFaceBookLoginState: function () {
        FB.login(function (response) {
            Main.statusChangeCallback(response);
        }, { scope: 'public_profile,email' });
    },

    statusChangeCallback: function (response) {
        if (response.status === 'connected') {
            Main.getInfoByFbAPI();
        } else {
            console.log('Please log ' + 'into this app.');
        }
    },

    getInfoByFbAPI: function () {
        FB.api('/me', { fields: 'email,name,last_name,first_name' }, function (response) {
            console.log('Successful login for');
            console.log(response);
        });
    },

    showRightArea: function (type) {
        var val = true;
        switch (type) {
            case "login":
                $(".title span").text("로그인");
                break
            case "complete":
                $(".title span").text("로그인");
                val = confirm("정상적으로 가입되었습니다. 로그인하시겠습니까?");
                break;
            case "sign":
                $(".title span").text("회원가입");
                break;
        }

        if (val) {
            $(".input-wrapper").removeClass("login sign");
            $(".input-wrapper").addClass(type);
            $('.join-wrapper').removeClass("hide");
        }
    },

    CloseRightArea: function () {
        Main.showLoginOption();
        $('.join-wrapper').addClass("hide");
    },

    showErrMsg: function(type, msg){
        if (type == "sign") {
            $("#signErrMsg").text(msg);
        }
        else if (type == "login") {
            $("#loginErrMsg").text(msg);
        }
    },
    
    BindEvent: function() {
        
    }
    
}