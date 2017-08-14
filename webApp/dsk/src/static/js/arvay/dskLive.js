/**
 * @Author: Arvay
 * @Date:   2017年8月11日16:12:28
 * @Last modified by:   Arvay
 * @Last modified time: 2017年8月14日11:57:20
 */
$(function() {
	var mySwiper = new Swiper('.swiper-container', {
		direction: 'horizontal',
		slidesPerView: 3,
		spaceBetween: 30,
		// 如果需要前进后退按钮
		nextButton: '.swiper-button-next',
		prevButton: '.swiper-button-prev',
	});
	var player;
	var hrefPage = window.location.search.split('=')[1];
	if(hrefPage == '0') {
		zhiboShow();
		$(".liveNext h1").html("公益视频");
		$(".liveTab li").eq(0).addClass('liveTabAdd').siblings().removeClass('liveTabAdd');
	} else {
		zhiboHiden();
		$(".liveNext").show();
		$(".liveNext h1").html("公益直播");
		$(".liveTab li").eq(1).addClass('liveTabAdd').siblings().removeClass('liveTabAdd');
	};
	setTimeout(function() {
		player = new TcPlayer('id_test_video', {
			"mp4": "http://ccp.alihealth.cn/static/images/news.mp4", //增加了一个flv的播放地址，用于PC平台的播放 请替换成实际可用的播放地址
			"autoplay": true, //iOS下safari浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
			"width": '928', //视频的显示宽度，请尽量使用视频分辨率宽度
			"height": '522' //视频的显示高度，请尽量使用视频分辨率高度
		});
	}, 2000)
	$(".liveTab li").click(function() {
		var index = $(this).index();
		$(this).addClass('liveTabAdd').siblings().removeClass('liveTabAdd');
		if(index == 0) {
			zhiboShow();
			$(".liveNext h1").html("公益视频");
		} else {
			zhiboHiden();
			$(".liveNext").show();
			$(".liveNext h1").html("公益直播");
		}
	});
	//观看视频
	$(".liveNext,#id_test_video").show();
	$(".liveRight li").click(function() {
		mySwiper.update();
		$(".liveRight").hide();
	});
	$(".el-ul").on('click', 'span', function() {
		$(".contactUsBox").hide(); //联系我们
		var _html = $(this).attr('class');
		if(_html == 'teb2_1') {
			mySwiper.update();
			$(".liveTab li").eq(0).addClass('liveTabAdd').siblings().removeClass('liveTabAdd');
			$(".liveNext").hide();
			zhiboShow();
		} else if(_html == 'teb2_2') {
			$(".liveNext").show();
			$(".liveTab li").eq(1).addClass('liveTabAdd').siblings().removeClass('liveTabAdd');
			zhiboHiden();
		}
	});
	var vali = 1;

	function zhiboShow() {
		$(".indexBox").hide();
		$(".liveNext,#id_test_video").show();
		$(".dskVideo").removeClass('dskVideoBorder');
		$(".videoTitle,.indexLive").show();
		$('.liveTab li').eq(0).addClass('liveTabAdd').siblings().removeClass('liveTabAdd');
	};
	var val = setInterval(function() {
		mySwiper.update();
		vali++;
		if(vali > 30) {
			clearInterval(val)
		}
	}, 400)

	function zhiboHiden() {
		$(".indexLive").show();
		$(".dskVideo").addClass('dskVideoBorder');
		$(".videoTitle,.liveSwiper,#id_test_video,.liveRight,.indexBox").hide();
		$('.liveTab li').eq(1).addClass('liveTabAdd').siblings().removeClass('liveTabAdd');
		var val = setInterval(function() {
			mySwiper.update();
			vali++;
			if(vali > 6) {
				clearInterval(val)
			}
		}, 800)
	}
})