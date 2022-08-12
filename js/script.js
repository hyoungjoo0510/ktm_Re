$(function(){

    $(window).on("wheel", function(){
        // console.log("스크롤")
        if($("#fullpage>div:eq(3)").hasClass("active")===true){
            upPageInit();
        }
    })


    var myFull = new fullpage("#fullpage",{
        sectionsColor: ["black", "black", "white", "black", "black", "black"], //각 섹션 컬러
        navigation: true, //도트 유무
        navigationTooltips: ["New Game", "Recommend", "News", "Upgrade", "Event", "Goods"],
        showActiveTooltip: true,
    })

    $("#fp-nav>ul>li:eq(3)>a").on("click", function(){
        console.log("클릭")
        upPageInit();
    })

    // main01 *********************
    var mainIndex = 0;

    // $(".main>ul>li").on("mouseover", function(){
    //     $(this).addClass("over").siblings().removeClass("over")
    // })
    $(".main>ul>li").on({
        "mouseover": function(){
            // console.log("호버");
            $(this).addClass("over").siblings().removeClass("over");
        },
        // "mouseleave": function(){
        //     $(this).removeClass("over")
        // },
        "click": function(){
            
            mainIndex = $(this).index();
            console.log(mainIndex);
            $(".main>div").eq(mainIndex).addClass("active").siblings().removeClass("active")
        }
    })

    $(".closepageBtn").on("click", function(){
        $(".main>div").removeClass("active")
    })

    //main02 *************************
    var recIndex = 0;
    
    $(".recBanner>li").on("click", function(){
        var recAni = $(".pack").is(":animated");

        // console.log(recAni)
        if(recAni == false){

            recIndex = $(this).index();
            // console.log(recIndex)

            $(this).addClass("active").siblings().removeClass("active");

            // $(".recBg>li").eq(recIndex).addClass("active").siblings().removeClass("active");
            $(".recBg").css({
                background: "url(./images/rec_bg_0"+(recIndex+1)+".jpg)",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "fixed",
                backgroundSize: "cover"
            })

            $(".pack").stop().animate({
                right: -60+"%"
            },500, function(){
                $(this).stop().animate({
                    right: 0
                }, 500)
            })

            $(".pack>ul>li").eq(recIndex).addClass("active").siblings().removeClass("active")
        }
        // console.log(recTrans)
    })

    // main03 **************************************
    $(".news>div").on({
        "mouseover": function(){
            // console.log("오버")
            newsIndex = $(this).index();
            $(this).addClass("active").siblings().removeClass("active");
        },

        "mouseout": function(){
            $(this).removeClass("active")
        }
    })

    // main04 **************************************
    function upPageInit(){
        
        // console.log("엑티브")
        $(".upBg>div").eq(0).stop().animate({
            left: 0
        }, 1000, function(){
            $(this).children().stop().animate({"opacity": 1}, 300)

            $(this).next().stop().animate({
                left: 0
            }, 1000, function(){
                $(this).children().stop().animate({"opacity": 1}, 300)

                $(this).next().stop().animate({
                    left: 0
                }, 1000, function(){
                    $(this).children().stop().animate({"opacity": 1}, 300, function(){
                        $(".upText").stop().animate({"opacity": 1}, 500)
                    })

                })
            })
        })
        
    }
    // main05 ***************************************

    $(".eventList>li").on({
        "mouseover": function(){
            // console.log($(this).index());
            $(this).addClass("over").siblings().removeClass("over");
        },
        
        "mouseout": function(){
            $(this).removeClass("over");
        },

        "click": function(){
            $(this).addClass("active").siblings().removeClass("active");
        }
    })


    // main06 ************************************
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
})