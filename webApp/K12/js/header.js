/**
 * @Author: Arvay
 * @Date:   2017年9月16日15:18:51
 * @Last modified by:   Arvay
 * @Last modified time: 2017年9月16日15:18:54
 */
$(function() {
	var a = false;
	/**
	 * 切换登陆方式
	 */
	$(".goCodeLogin").click(function(){
		a = !a;
		if(a){
			$(".passworldLogin").hide(),$(".loginCodeR").show(),$(this).html("密码登录")
		}else{
			$(".passworldLogin").show(),$(".loginCodeR").hide(),$(this).html("验证码登录");
		}
	});
	/**
	 * 注册
	 */
	$(".loginBox").on('click','span',function(){
		var i = $(this).index();
		if(i==0){
			modalShow.login();//显示登陆框
		}else if(i==2){
			modalShow.enrol();//显示注册框
		}
	});
	/**
	 * 登陆框内切换注册
	 */
	$(".nextEmrol").click(function(){
		modalShow.enrol();
	});
	/**
	 * 注册框内切换登陆
	 */
	$(".nextLogin").click(function(){
		modalShow.login()
	});
	/**
	 * 验证码
	 */
	var isCountdown=false;
	$(".getCode").click(function(){
		codeTime()//验证码倒计时
	});
	/**
	 * 菜单
	 */
	$(".userImg").hover(function(){
		$(".userList").stop().slideDown(300);
	},function(){
		$(".userList").stop().slideUp(300);
	})
	/**
	 * 登录注册显示方法
	 */
	var modalShow = {
		login:function(){
			$(".modalLogin").show(),$(".modalEnrol").hide();
		},
		enrol:function(){
			$(".modalEnrol").show(),$(".modalLogin").hide();
		}
	}
	function codeTime(){
		var i = 60;
		if(isCountdown){//倒计时进行中 不执行任何操作
			return false;
		};
		$('.getCode').html("已发送(重发"+i+")")
		var countdown = setInterval(function(){
			isCountdown = true,i--,$('.getCode').html("已发送(重发"+i+")")
			if(i == 1){
				clearInterval(countdown),$(".getCode").html('重新获取验证码'),isCountdown=false;
			}
		},1000)
	}
})