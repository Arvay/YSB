$(function(){function e(e){document.all?(document.body.style.behavior="url(#default#homepage)",document.body.setHomePage(e)):alert("您好,您的浏览器不支持自动设置页面为首页功能,请您手动在浏览器里设置该页面为首页!")}$(".indexBox").load("templates/classroom.html"),$(".indexLive").load("templates/dskLive.html"),$(".contactUs").load("templates/contactUs.html"),$(".indexFQA").load("templates/FQA.html"),$(".indexSearch").load("templates/search.html"),$(".nav li").click(function(){var e=$(this).index();2==e?($(".contacList li").eq(0).addClass("contacListAdd").siblings().removeClass("contacListAdd"),$(".contactUs,.contactUsBox,.comBox").show(),$(".subnav,.footerNav,.indexLive,.indexBox,.map,.indexSearch,.indexFQA").hide()):3==e&&($(".contacList li").eq(1).addClass("contacListAdd").siblings().removeClass("contacListAdd"),$(".contactUs,.contactUsBox,.map").show(),$(".subnav,.footerNav,.indexLive,.indexBox,.comBox,.indexFQA,.indexSearch").hide()),player.pause()}),$("body").bind("input propertychange",function(){var e=$(".el-input__inner").val();$(".indexSearch").show(),$(".type-in").html(e),$(".subnav,.footerNav,.indexLive,.indexBox,.contactUs,.indexFQA").hide(),player.pause()}),$("body").on("click",".navLeft",function(){$(".subnav,.footerNav").show(),$(".indexBox,.indexLive,.contactUs,.indexFQA,.indexSearch").hide(),player.pause()}),$("body").on("mouseover",".el-tabs__item",function(){var e=$(this).index()-1;$(".el-tabs__item").eq(e).trigger("click")}),$("#addcollect").click(function(){var e=-1!=navigator.userAgent.toLowerCase().indexOf("mac")?"Command/Cmd":"CTRL";document.all?window.external.addFavorite("http://www.baidu.com","中华预防医学会"):window.sidebar?window.sidebar.addPanel("中华预防医学会","http://www.baidu.com",""):alert("您可以尝试通过快捷键"+e+" + D 加入到收藏夹~")}),$("body").on("click",".videoBox",function(){$(".subnav,.footerNav,.liveRight").hide(),$(".indexLive,.liveNext").show(),$(".liveTab li").eq(0).addClass("liveTabAdd"),setTimeout(function(){player.play()},3e3)}),$("#homepage").click(function(){e("www.baidu.com")})});