/**
 * @Author: Arvay
 * @Date:   2017年8月12日12:10:01
 * @Last modified by:   Arvay
 * @Last modified time: 2017年8月14日15:14:04
 */
var isToOpenId;//true为分享的  false自己
$(function() {
	var ajaxUrl = "http://www.yingshibao.com/";
	var htmlUrl = window.location.search; //微信code
	var toOpenId = GetQueryString("openId")
	htmlUrl = htmlUrl.split('code=')[1].split('&')[0];
	localStorage.setItem('toOpenId', toOpenId);
	var openId = htmlUrl;
	console.log(openId)
	var nickname = localStorage.getItem('nickname'); //用户名
	var headimgurl = localStorage.getItem('headimgurl'); //头像
	if(!toOpenId || toOpenId=="undefined") {
		$(".clickBtn,.userIcoName").hide();
		toOpenId = "";
	};
	//用户信息获取成功后不再获取
	if(openId == 'undefined' || !openId) {
		getLonginAccessToken();
	} else {
		getShareUser(openId, nickname, headimgurl, toOpenId);
		onMenuShare();
	};
	//  ========== 
	//  = 登陆获取信息 = 
	//  ========== 
	function getLonginAccessToken() {
		$.ajax({
			type: "post",
			url: ajaxUrl + "tools/getLonginAccessToken",
			dataType: 'json',
			data: {
				code: htmlUrl,
			},
			success: function(data) {
				console.log(data);
				if(data.code == '000000') {
					var appId, timestamp, nonceStr, signature;
					var openId = data.data.openid;
					localStorage.setItem('openId', data.data.openid);
					localStorage.setItem('nickname', data.data.nickname);
					localStorage.setItem('headimgurl', data.data.headimgurl);
					getShareUser(data.data.openid, data.data.nickname, data.data.headimgurl,toOpenId);
					onMenuShare();
				} else if(data.code == '000001') {
					mui.alert(data.msg, '错误', '返回', function(e) {
						e.index
					}, 'div')
				}

			}
		});
	};
	//  ========== 
	//  = 获取用户点赞数量 = 
	//  ========== 
	function getShareUser(openId, nickname, headimgurl, toOpenId) {
		$.ajax({
			type: "post",
			url: ajaxUrl + "shareCoupon/getShareUser",
			dataType: 'json',
			data: {
				'openId': openId,
				'name': nickname,
				'image': headimgurl,
				'toOpenId': toOpenId,
			},
			success: function(data) {
				//toOpenId 不为空为分页的页面 
				if(!toOpenId) {
					$(".myjf").html(data.data.store);
					$(".myjf").numberRock({
					    speed:12,//数字越大数字滚动速度越慢
					    count:data.data.store//最终停留数字
					})
					localStorage.setItem('store', data.data.store);
				} else {
					$(".myjf").html(data.data.mystore);
					$(".myjf").numberRock({
					    speed:12,//数字越大数字滚动速度越慢
					    count:data.data.mystore//最终停留数字
					})
					localStorage.setItem('store', data.data.mystore);
				}
				$(".userimg").attr('src', data.data.image);
				$(".userName").html(data.data.name + '目前的积分：<span>' + data.data.store+'</span>');
				$(".userName span").numberRock({
					    speed:12,//数字越大数字滚动速度越慢
					    count:data.data.store//最终停留数字
				})
			}
		});
	};
	//  ========== 
	//  = 分享 = 
	//  ========== 
	function onMenuShare() {
		var url = location.href.split('#')[0];
		mui.ajax('http://www.yingshibao.com/payment/getWeiXinSignature?token=kjasjdkldaszbjjakalk254sad&url='+encodeURIComponent(url), {
			dataType: 'json', //服务器返回json格式数据
			type: 'get', //HTTP请求类型
			success: function(data) {
				if(data.code == '000000') {
					var noncestr = data.data.nonceStr;
					var timestamp = data.data.timestamp;
					var signature = data.data.signature;
					var appId = "wxf43300d4595ea216";
					wx.config({
						debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
						appId: appId, // 必填，公众号的唯一标识
						timestamp: timestamp, // 必填，生成签名的时间戳
						nonceStr: noncestr, // 必填，生成签名的随机串
						signature: signature, // 必填，签名，见附录1
						jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
					});
					//  ========== 
					//  = 分享到朋友圈 = 
					//  ========== 
					wx.onMenuShareTimeline({
						title: '点我给好友助力获取积分，兑换优惠券，上应试宝精品直播课', // 分享标题
						link: 'http://www.yingshibao.com/shareCoupon/index?openId=' + openId, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						imgUrl: 'http://7sblip.com1.z0.glb.clouddn.com/activity/icon_score.png', // 分享图标
						success: function() {
							// 用户确认分享后执行的回调函数
							alert("分享成功")
						},
						cancel: function() {
							// 用户取消分享后执行的回调函数
						}
					});
										
					//  ========== 
					//  = 分享给朋友 = 
					//  ========== 
					wx.onMenuShareAppMessage({
						title: '助力好友拿优惠券', // 分享标题
						desc: '点我给好友助力获取积分，兑换优惠券，上应试宝精品直播课', // 分享描述
						link: 'http://www.yingshibao.com/shareCoupon/index?openId=' + openId, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						imgUrl: 'http://7sblip.com1.z0.glb.clouddn.com/activity/icon_score.png', // 分享图标
						type: '', // 分享类型,music、video或link，不填默认为link
						dataUrl: 'http://7sblip.com1.z0.glb.clouddn.com/activity/icon_score.png', // 如果type是music或video，则要提供数据链接，默认为空
						success: function() {
							// 用户确认分享后执行的回调函数
							alert("分享成功")
						},
						cancel: function() {
							// 用户取消分享后执行的回调函数
						}
					});
				}
			},
			error: function(xhr, type, errorThrown) {

			}
		});
	};
	//  ========== 
	//  = 好友助力 = 
	//  ========== 
	$(".clickBtn").click(function() {
		$.ajax({
			type: "post",
			url: ajaxUrl + "shareCoupon/clickSuccess",
			dataType: 'json',
			data: {
				openId: openId,
				toOpenId: toOpenId,
			},
			success: function(data) {
				getShareUser(openId, nickname, headimgurl, toOpenId);
				mui.toast(data.msg, {
					duration: 'long',
					type: 'div'
				})
			}
		});
	})
	//  ========== 
	//  = 数字缓冲 = 
	//  ========== 
	 $.fn.numberRock=function(options){
        var defaults={
            speed:24,
            count:100
        };
        var opts=$.extend({}, defaults, options);

        var div_by = 100,
        count=opts["count"],
        speed = Math.floor(count / div_by),
        sum=0,
        $display = this,
        run_count = 1,
        int_speed = opts["speed"];
        var int = setInterval(function () {
            if (run_count <= div_by&&speed!=0) {
                $display.text(sum=speed * run_count);
                run_count++;
            } else if (sum < count) {
                $display.text(++sum);
            } else {
                clearInterval(int);
            }
        }, int_speed);
    }
	function GetQueryString(name){
	     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	     var r = window.location.search.substr(1).match(reg);
	     if(r!=null)return  unescape(r[2]); return null;
	}
});