$(function(){function e(){$(".indexBox").hide(),$(".liveNext,#id_test_video").show(),$(".dskVideo").removeClass("dskVideoBorder"),$(".videoTitle,.indexLive").show(),$(".liveTab li").eq(0).addClass("liveTabAdd").siblings().removeClass("liveTabAdd")}function i(){$(".indexLive").show(),$(".dskVideo").addClass("dskVideoBorder"),$(".videoTitle,.liveSwiper,#id_test_video,.liveRight,.indexBox").hide(),$(".liveTab li").eq(1).addClass("liveTabAdd").siblings().removeClass("liveTabAdd");var e=setInterval(function(){d.update(),++s>6&&clearInterval(e)},800)}var l,d=new Swiper(".swiper-container",{direction:"horizontal",slidesPerView:3,spaceBetween:30,nextButton:".swiper-button-next",prevButton:".swiper-button-prev"});"0"==window.location.search.split("=")[1]?(e(),$(".liveNext h1").html("公益视频"),$(".liveTab li").eq(0).addClass("liveTabAdd").siblings().removeClass("liveTabAdd")):(i(),$(".liveNext").show(),$(".liveNext h1").html("公益直播"),$(".liveTab li").eq(1).addClass("liveTabAdd").siblings().removeClass("liveTabAdd")),setTimeout(function(){l=new TcPlayer("id_test_video",{mp4:"http://ccp.alihealth.cn/static/images/news.mp4",autoplay:!0,width:"928",height:"522"})},2e3),$(".liveTab li").click(function(){var l=$(this).index();$(this).addClass("liveTabAdd").siblings().removeClass("liveTabAdd"),0==l?(e(),$(".liveNext h1").html("公益视频")):(i(),$(".liveNext").show(),$(".liveNext h1").html("公益直播"))}),$(".liveNext,#id_test_video").show(),$(".liveRight li").click(function(){d.update(),$(".liveRight").hide()}),$(".el-ul").on("click","span",function(){$(".contactUsBox").hide();var l=$(this).attr("class");"teb2_1"==l?(d.update(),$(".liveTab li").eq(0).addClass("liveTabAdd").siblings().removeClass("liveTabAdd"),$(".liveNext").hide(),e()):"teb2_2"==l&&($(".liveNext").show(),$(".liveTab li").eq(1).addClass("liveTabAdd").siblings().removeClass("liveTabAdd"),i())});var s=1,t=setInterval(function(){d.update(),++s>30&&clearInterval(t)},400)});