$(function(){
    $("#selectDealer").change(function () {
        var selctIndex = $("#selectDealer>option:selected").index();
        var selectVal = $(this).children("option:selected").val();
        var selctText = $("#selectDealer>option:selected").text();
        mapindex = selctIndex-1;
        // var x = document.getElementById("selectDealer").selectedIndex;
        // var y = document.getElementById("selectDealer").options;
        // console.log(y[x].index)
        console.log(selctIndex)
        console.log(selctText)
        console.log(selectVal)
        if (selctIndex != 0) {
            $(".dealerTextBox>h3").text(selctText)
            $(".dealerTextBox").children("." + selectVal).css("opacity", 1).siblings("ul").css("opacity", 0)
            $(".mapBox>div").eq((selctIndex - 1)).css("opacity", 1).siblings().css("opacity", 0)
            
        }
        mapActcive();
    })
    // map *********************************************************************

    var mapX = new Array(37.55323379942983, 37.343502451849986, 35.85814005922832,
        35.16390164604411, 37.69302568542974, 37.547287267637465,
        35.850677671723176, 37.52042439543111, 35.153321557845416,
        36.59246247686406, 37.48409267529583, 37.9867039175627,
        37.53114863035828, 37.53151793501961);
    var mapY = new Array(127.07053320509714, 126.98576058171675, 129.22443419745048,
        126.9122146785764, 127.12978282619872, 126.87090876465939,
        128.58172194945925, 126.9920815692143, 129.0491765215147,
        127.29511788645708, 127.49884395390316, 127.17869430328751,
        127.00702578498263, 127.0086238824582);
    
    var mapindex = 0;

    function mapActcive() {
        var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
            mapOption = {
                center: new kakao.maps.LatLng(mapX[mapindex], mapY[mapindex]), // 지도의 중심좌표
                level: 2 // 지도의 확대 레벨
            };

        var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

        var imageSrc = '../images/icon_map_ktm.png', // 마커이미지의 주소입니다    
            imageSize = new kakao.maps.Size(64, 32), // 마커이미지의 크기입니다
            imageOption = { offset: new kakao.maps.Point(32, 44) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

        // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
            markerPosition = new kakao.maps.LatLng(mapX[mapindex], mapY[mapindex]); // 마커가 표시될 위치입니다

        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({
            position: markerPosition,
            image: markerImage // 마커이미지 설정 
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);
        //지도의 확대 축소 컨트롤 버튼 활성화
        var zoomControl = new kakao.maps.ZoomControl();
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

        map.setZoomable(false);//마우스 휠로 인한 확대축소 비활성화
    }
    mapActcive();
})