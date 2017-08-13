$(function() {
	//搜索
	$('body').bind('input propertychange', function() {
		var t = $(".el-input__inner").val();
		$(".indexSearch").show();
		$(".type-in").html(t);
		$(".subnav,.footerNav,.indexLive,.indexBox,.contactUs,.indexFQA").hide();
	});
	//绑定菜单栏 划过事件
	$(".hvr-underline-from-center").mouseover(function(){
//		console.log('1')
	});
	//菜单光标位置恢复
	$(".find_nav li").hover(function(){
		$(this).fadeIn('a').addClass('navHover').siblings().removeClass('navHover');
		$(this).find('.navList').addClass('flipInX');
		$(this).siblings().find('.navList').removeClass('flipInX').hide();
		$(this).find('i').fadeIn(100);
		$(this).siblings().find('i').hide();
	},function(){
		$(this).find('i').hide();
		$(this).find('.navList').removeClass('flipInX').hide();
	});
	//网站地图.
	$(".siteMap").click(function(){
		window.location.href = 'contactUs.html'
		localStorage.setItem('contact','false');
	});
	//联系我们
	$(".contact").click(function(){
		window.location.href = 'contactUs.html';
		localStorage.setItem('contact','true');
	});
	//加入收藏
	$(".addcollect").click(function() {
		var ctrl = (navigator.userAgent.toLowerCase()).indexOf('mac') != -1 ? 'Command/Cmd' : 'CTRL';
		if(document.all) {
			window.external.addFavorite('http://ccp.alihealth.cn/', '中华预防医学会')
		} else if(window.sidebar) {
			window.sidebar.addPanel('中华预防医学会', 'http://ccp.alihealth.cn/', "")
		} else {
			alert('您可以尝试通过快捷键' + ctrl + ' + D 加入到收藏夹~')
		}
	});
	$("body").on('click','.videoBox',function(){
		window.location.href = 'dskLive.html?page=0'
	});
//设为首页
$(".homepage").click(function(){
	SetHome('http://ccp.alihealth.cn/')
});
//搜索
$(".search img").click(function(){
	window.location.href = 'search.html'
});
	function SetHome(url) {
		if(document.all) {
			document.body.style.behavior = 'url(#default#homepage)';
			document.body.setHomePage(url);
		} else {
			alert("您好,您的浏览器不支持自动设置页面为首页功能,请您手动在浏览器里设置该页面为首页!");
		}
	}
})