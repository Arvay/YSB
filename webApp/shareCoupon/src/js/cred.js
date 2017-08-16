/**
 * @Author: Arvay
 * @Date:   2017年8月12日14:57:55
 * @Last modified by:   Arvay
 * @Last modified time: 2017年8月12日14:57:58
 */
window.onload = function(){
	var ajaxUrl = "http://www.yingshibao.com/";
//	var ajaxUrl = "http://192.168.1.118/";
	var openId = localStorage.getItem('openId');
	var store = localStorage.getItem('store');//当前我的积分
	$(".topCredits span").html(store+'分');
	//  ========== 
	//  = 兑换优惠券 = 
	//  ========== 
	mui('.creditsList').on('tap','li',function(){
		var thisIndex = $(this).index()+1;
		var num = $(".search input").val();
		var myreg = /^(((1[0-9]{1}))+\d{9})$/; 
		if(!myreg.test(num)) 
		{ 
		    mui.toast('手机号码无效',{ duration:'long', type:'div' }) 
		    return false; 
		};
	  mui.ajax(ajaxUrl+'shareCoupon/exchangeCoupon',{
	  	data:{
	  		openId:openId,
	  		phone:num,
	  		couponId: thisIndex
	  	},
	  	dataType:'json',//服务器返回json格式数据
	  	type:'post',//HTTP请求类型
	  	success:function(data){
	  		console.log(data);
	  		if(data.code == '000000'){
	  			$(".topCredits span").html(data.data.store+'分');
	  			mui.alert('请在应试宝网站或者app中我的优惠券查看','兑换成功','确定',function (e) {
	  			},'div')
	  		}else if(data.code == '000003'){
	  			mui.alert('快去邀请更多好友，助力你得积分','积分不足','确定',function (e) {},'div')
	  		}
	  		
	  	},
	  	error:function(xhr,type,errorThrown){
	  		mui.alert('后台错误稍后重试','请求失败','返回',function (e) {},'div')
	  	}
	  });
	}) 
};
