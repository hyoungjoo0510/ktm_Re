$(function () {
    var winWidth = $(window).innerWidth();
    let initMenu = true;//메인메뉴가 펼쳐진 상태인지 아닌지 판단하기 위한 변수
    let subMenu = true;//처음 서브메뉴가 펼쳐질때는 판단하기 위한 변수

    $(window).on("resize", function(){
        winWidth = $(window).innerWidth();

        if(winWidth > 730){
            $(".rightGnb").css("opacity", 1)
            $(".rightGnb>li:eq(0)").css({
                "display": "block",
                opacity: 1
            })
        }else{
            if(initMenu == true){
                $(".rightGnb").css("opacity", 0)
            }
            $(".rightGnb>li:eq(0)").css("display", "none")
        }
    })
    $(".hdr").load("./header.html", function(){
        //메인메뉴가 펼쳐지지 않은 상태에서 검색 아이콘을 눌렀을때 동작
    $(".rightGnb>li:eq(1)").click(function () {
        //검색 상자가 펼쳐지는 애니메이션
        $("#search").css("visibility", "visible").stop().animate({
            width: 250,
            opacity: 1,
            "padding-left": 50
        }, 500).prev().animate({
            left: 10
        }, 500)
    })

    //메인메뉴 버튼을 클릭했을때의 동작
    $(".hamMenuBtn").click(function () {
        if (initMenu) {
            //바디의 스크롤바를 없애서 스크롤을 막는다.
            $("body").css({
                overflow: "hidden"
            })
            //검색상자를 펼치는 애니메이션
            $("#search").css("visibility", "visible").stop().animate({
                width: 250,
                opacity: 1,
                "padding-left": 50
            }, 500).prev().animate({
                left: 10
            }, 500)
            $(".rightGnb").stop().animate({
                opacity: 1
            }, 500)
            //메인메뉴가 펼쳐지면 .rightGnb의 li:eq(0)을 사라지게 한다.
            $(".rightGnb>li:eq(0)").stop().animate({
                opacity: 0
            }, 500, function () {//애니메이션으로 서서히 사라지게 한다음 display를 none 시켜서 완전히 사라지게한다.
                $(this).css("display", "none")
            })
            //메뉴버튼을 누르면 후손인 span을 선택하고, 서서히 사라지게 한다.
            $(this).find("span").stop().animate({
                opacity: 0
            }, 500, function () {//사라진후에 span의 텍스트를 CLOSE로 변경함
                $(this).text("CLOSE")
                $(this).stop().animate({//텍스트 변경한뒤에 다시 서서히 나타나게 함
                    opacity: 1
                }, 500)
            })

            //메뉴 버튼을 누르면 메인메뉴가 펼쳐지는 동작을 한다.
            $("nav").css("visibility", "visible").stop().animate({
                height: "90vh" //메인메뉴의 높이값을 변경해 펼쳐지는 애니메이션
            }, 500, function () {//메인메뉴가 다 펼쳐지고 나서 #nav가 서서히 나타나도록 한다.
                $("#nav").stop().animate({
                    opacity: 1
                }, 500)
                $(".menuGnb").stop().animate({//로그인 메뉴도 서서히 나타남
                    opacity: 1
                }, 500)
            })

            // 메인메뉴가 펼쳐졌으므로 다음에 클릭했을때 다시 조건문을 통해 
            // 닫힐수 있도록 initMenu를 false로 변경
            initMenu = false;
        } else {//initMenu가 false 일때 동작

            //스크롤을 되살린다.
            $("body").css({
                overflow: "auto"
            })
            //검색상자를 닫는다.
            $("#search").stop().animate({
                width: 0,
                opacity: 0,
                "padding-left": 0
            }, 500, function () {
                $(this).css("visibility", "hidden")
            }).prev().css({
                left: "initial"
            })
            if(winWidth<730){
                $(".rightGnb").stop().animate({
                    opacity: 0
                }, 500)
            }
            //찾기 아이콘과 검색 아이콘을 다시 나타나게 한다.
            if(winWidth > 730){
                $(".rightGnb>li:eq(0)").css("display", "block").stop().animate({
                    opacity: 1
                }, 1000)
            }

            //메인메뉴 버튼의 텍스트를 다시 변경
            $(this).find("span").stop().animate({
                opacity: 0
            }, 500, function () {
                $(this).text("MENU")
                $(this).stop().animate({
                    opacity: 1
                }, 500)
            })
            //로그인 메뉴를 사라지게 함
            $(".menuGnb").stop().animate({
                opacity: 0
            }, 500)
            //메인메뉴를 서서히 사라지게 한후 메인메뉴의 높이를 0으로 변경
            $("#nav").stop().animate({
                opacity: 0
            }, 500, function () {
                $("nav").stop().animate({
                    height: 0
                }, 500, function () {
                    $(this).css({
                        visibility: "hidden"
                    })
                })
            })
            //메인메뉴의 .active class를 모두 제거(초기화)
            $("#nav>li").removeClass("active")
            //model의 서브메뉴를 초기화
            $("#nav .modelSubWrap").fadeOut(500)
            //model 서브메뉴의 이미지의 동작을 초기화
            $(".subBox").animate({
                left: "-100%",
                opacity: 0
            }, 500)
            $("#nav>li").removeClass("active")
            initMenu = true;
            subMenu = true
        }
    })

    $("#nav>li").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
    })

    //메인메뉴의 model 메뉴를 선택 했을때 메뉴가 보이고, 다른 메뉴를 선택시 사라지게 함

    $("#nav>.model").click(function () {
        if($(this).hasClass("active")===true){
            $(".modelSubWrap").fadeIn(500)
            $(".modelSubWrap>ul").addClass("active")
        }else{
            $(".modelSubWrap").fadeOut(500)
            $(".modelSubWrap>ul").removeClass("active")
        }
    }).siblings().click(function () {
        $(".modelSubWrap").fadeOut(500)
        $(".modelSubWrap>ul").removeClass("active")
    })

    //model 서브 메뉴의 동작
    $(".modelSubWrap>.sub>li>a").mouseover(function () {
        let subIndex = $(this).parent().index();
        // console.log(subIndex)
        if (subMenu) {//메뉴를 열었을때 첫 동작
            $(".subBox>img").attr("src", "images/modelBackground/subImg_0" + (subIndex + 1) + ".jpg")
            $(".subBox").stop().animate({
                left: "0%",
                opacity: 1
            }, 500)
            subMenu = false;
        } else {//메뉴를 오픈한 상태에서의 동작
            $(".subBox").stop().animate({
                left: "-100%",
                opacity: 0
            }, 250, function () {
                $(".subBox>img").attr("src", "images/modelBackground/subImg_0" + (subIndex + 1) + ".jpg")
                $(this).stop().animate({
                    left: "0%",
                    opacity: 1
                }, 500)
            })
        }
    })
    })

    // mainbanner
    var showBanner = 0;
    var mainClone = $(".mainBannerWrap>li:eq(0)").clone();
    $(".mainBannerWrap").append(mainClone)

    var mainLength = $(".mainBannerWrap>li").length;
    // console.log("길이"+mainLength)
    $(".mainBannerWrap").width(mainLength * 100 + "%")

    function moveBanner() {
        $(".mainBannerWrap").stop().animate({
            marginLeft: -showBanner * 100 + "%"
        }, 1000)
    }

    $(".mainBannerBtn>.rightArrow").click(function () {
        if (showBanner == mainLength - 1) {
            $(".mainBannerWrap").css({
                marginLeft: 0
            })
            showBanner = 0;
        }
        showBanner++;
        moveBanner();
    })
    $(".mainBannerBtn>.leftArrow").click(function () {
        if (showBanner == 0) {
            $(".mainBannerWrap").css({
                marginLeft: -(mainLength - 1) * 100 + "%"
            })
            showBanner = (mainLength - 1)
        }
        showBanner--;
        moveBanner();
    })

    function autotimeBar() {
        $("#mainBanner>.timeBar>span").animate({
            width: 100 + "%"
        }, 5000, function () {
            $(this).css("width", 0)
        })
    }
    autotimeBar();

    var timer = setInterval(autoBanner, 5000)
    function autoBanner() {
        if (showBanner == mainLength - 1) {
            $(".mainBannerWrap").css({
                marginLeft: 0
            })
            showBanner = 0;
        }
        showBanner++;
        autotimeBar();
        moveBanner();
        // $(".mainBannerWrap>.rightArrow").trigger("click");
    }

    // container
    $(".newModelList>li").click(function () {
        let newModelIndex = $(this).index();
        console.log(newModelIndex)
        $(".newModelWrap .imgBox img").stop().animate({
            left: "-50%",
            opacity: 0
        }, 500, function () {
            $(this).attr("src", "images/newmodel_img/new_0" + (newModelIndex + 1) + ".png")
            $(this).stop().animate({
                left: 0,
                opacity: 1
            }, 500)
        })
    })


    // sub_page ***************************************************************
    var showCenterModel =0;
    var showLeftModel = (showCenterModel-1);
    var showRightModel = (showCenterModel+1);

    function fadeModel(){
        $(".centerList>ul>li").eq(showCenterModel).fadeIn(500).siblings().fadeOut(500)  
        $(".textList>li").eq(showCenterModel).fadeIn(500).siblings().fadeOut(500)
        $(".leftList>ul>li").eq(showLeftModel).fadeIn(500).siblings().fadeOut(500)
        $(".rightList>ul>li").eq(showRightModel).fadeIn(500).siblings().fadeOut(500)
    }
    $(".subPageCtlArrow>.rightArrow").click(function(){
        if(showCenterModel<7){
            showCenterModel++;
        }else{
            showCenterModel =0;
        }


        if(showLeftModel <7){
            showLeftModel++;
        }else{
            showLeftModel =0;
        }
        

        if(showRightModel <7){
            showRightModel++;
        }else{
            showRightModel=0;
        }

        fadeModel();
    })

    $(".subPageCtlArrow>.leftArrow").click(function(){
        if(showCenterModel>0){
            showCenterModel--;
        }else{
            showCenterModel =7;
        }

        if(showCenterModel >0){
            showLeftModel--;
        }else{
            showLeftModel = 7;
        }

        if(showCenterModel >0){
            showRightModel--;
        }else{
            showRightModel=7;
        }

        fadeModel();

    })

})