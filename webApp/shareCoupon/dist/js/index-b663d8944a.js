$(function(){function e(e,t,n,i){$.ajax({type:"post",url:a+"shareCoupon/getShareUser",dataType:"json",data:{openId:e,name:t,image:n,toOpenId:i},success:function(e){console.log(e),i==o?($(".contentText h1").html("您目前的积分"+e.data.mystore),localStorage.setItem("store",e.data.mystore)):($(".contentText h1").html("您目前的积分"+e.data.store),localStorage.setItem("store",e.data.store)),$(".userimg").attr("src",e.data.image),$(".userNum").html(e.data.name+"目前的积分："+e.data.store)}})}function t(){var e=location.href.split("#")[0];mui.ajax('http://www.yingshibao.com/payment/getWeiXinSignature?token=kjasjdkldaszbjjakalk254sad&url="+encodeURIComponent('+e+"&toOpenId="+i+")",{dataType:"json",type:"get",success:function(e){if("000000"==e.code){var t=e.data.nonceStr,a=e.data.timestamp,o=e.data.signature;wx.config({debug:!1,appId:"wxe559147454192307",timestamp:a,nonceStr:t,signature:o,jsApiList:["onMenuShareTimeline","onMenuShareAppMessage"]}),wx.onMenuShareTimeline({title:"助力好友拿优惠券",link:"www.yingshibao.com/shareCoupon/index?openId="+i,imgUrl:"http://down.yingshibao.com/yingshibao/courseLibrary/userAvatar/DCB03AD6A6EAE05475E27B022024D244-2.jpg ",success:function(){alert("分享成功")},cancel:function(){alert("取消分享")}}),wx.onMenuShareAppMessage({title:"助力好友拿优惠券",desc:"点我给好友助力获取积分，兑换优惠券，上应试宝精品直播课",link:"www.yingshibao.com/shareCoupon/index?openId="+i,imgUrl:"",type:"",dataUrl:"http://down.yingshibao.com/yingshibao/courseLibrary/userAvatar/DCB03AD6A6EAE05475E27B022024D244-2.jpg ",success:function(){alert("分享成功")},cancel:function(){alert("取消分享")}})}},error:function(e,t,a){}})}var a="http://www.yingshibao.com/",o=window.location.search,n=o.split("toOpenId=")[1];o=o.split("code=")[1].split("&")[0],localStorage.setItem("toOpenId",n);var i=localStorage.getItem("openId"),s=localStorage.getItem("nickname"),c=localStorage.getItem("headimgurl");n&&"undefined"!=n||($(".clickBtn,.userNum").hide(),n=""),"undefined"!=i&&i?(e(i,s,c,n),t()):$.ajax({type:"post",url:a+"tools/getLonginAccessToken",dataType:"json",data:{code:o},success:function(a){console.log(a),"000000"==a.code?(a.data.openid,localStorage.setItem("openId",a.data.openid),localStorage.setItem("nickname",a.data.nickname),localStorage.setItem("headimgurl",a.data.headimgurl),e(a.data.openid,a.data.nickname,a.data.headimgurl),t()):"000001"==a.code&&mui.alert(a.msg,"错误","返回",function(e){e.index},"div")}}),$(".clickBtn").click(function(){$.ajax({type:"post",url:a+"shareCoupon/clickSuccess",dataType:"json",data:{openId:i,toOpenId:n},success:function(e){mui.toast(e.msg,{duration:"long",type:"div"})}})})});