/**
 * @Author: Arvay
 * @Date:   2017年9月16日15:18:51
 * @Last modified by:   Arvay
 * @Last modified time: 2017年9月16日15:18:54
 */
$(function() {
	var a = false,
		rememb = false;
	$("[data-toggle='tooltip']").tooltip()
	$("input").click(function() {
		$('#enrolName').tooltip('hide')
	})
	/**
	 * 手机号密码登陆
	 */
	$(".loginBtn ").click(function(e) {
		rememb = $("input[type='checkbox']").is(':checked'); //是否自动登陆
		var phone = $("#loginName").val();
		var password = $("#loginPassword").val();
		if(phone == '') {
			$('#enrolName').tooltip('show')
			$(".tooltip-inner").html('手机号不能为空')
			return false;
		} else if(isPhoneNo(phone) == false) {
			$('#enrolName').tooltip('show')
			$(".tooltip-inner").html('手机号格式错误')
			return false;
		}
		if(password.length < 6) {
			$.message({
				message: '密码错误',
				type: 'error'
			})
			return false;
		}
		var password = hex_md5(password);
		password = password.toLocaleUpperCase();
		var postData = {
			phone: phone,
			password: password
		}
		$ajax('/pc/login/loginByPhonePassword', JSON.stringify(postData), function(e) {
			if(e.code == '000000') {
				$.message('登陆成功')
				$(".loginBox").hide() // 登陆注册按钮
				$(".userInfo").show(); //用户信息菜单
				var avatar = e.data.avatar; //头像
				var nickName = e.data.userName; // 账户昵称
				var phone = e.data.phone; // 用户手机号
				var userId = e.data.id; // 用户id
				$('#myModal').modal('hide'); //登陆框隐藏
				$(".userImg").css('background', 'url(' + avatar + ')')
				if(rememb) {
					localStorage.setItem('avatar', avatar)
					localStorage.setItem('nickName', nickName)
					localStorage.setItem('phone', phone)
					localStorage.setItem('userId', userId)
				}
			}
		})

	})
	/**
	 * 注册
	 */
	$(".enrolBtn").click(function() {
		var phone = $("#enrolName").val();
		var password = $("#enrolPassword").val();
		var smsCode = $("#enrolCode").val();
		if(phone == '') {
			$('#enrolName').tooltip('show')
			$(".tooltip-inner").html('手机号不能为空')
			return false;
		} else if(isPhoneNo(phone) == false) {
			$('#enrolName').tooltip('show')
			$(".tooltip-inner").html('手机号格式错误')
			return false;
		}
		if(password.length < 6) {
			$.message({
				message: '密码不得低于6位',
				type: 'error'
			})
			return false;
		}
		if(smsCode.length < 4) {
			$.message({
				message: '验证码错误',
				type: 'error'
			})
			return false;
		}
		var password = hex_md5(password);
		password = password.toLocaleUpperCase();
		var postData = {
			phone: phone,
			password: password,
			checkCode: smsCode,
			grade: '1'
		}
		$ajax('/pc/login/userRegister', JSON.stringify(postData), function(e) {
			console.log(e)
		})
	})
	/**
	 * 切换登陆方式
	 */
	$(".goCodeLogin").click(function() {
		a = !a;
		if(a) {
			$(".passworldLogin").hide(), $(".loginCodeR").show(), $(this).html("密码登录")
		} else {
			$(".passworldLogin").show(), $(".loginCodeR").hide(), $(this).html("验证码登录");
		}
	});
	/**
	 * 注册显示框
	 */
	$(".loginBox").on('click', 'span', function() {
		var i = $(this).index();
		if(i == 0) {
			modalShow.login(); //显示登陆框
		} else if(i == 2) {
			modalShow.enrol(); //显示注册框
		}
	});
	/**
	 * 登陆框内切换注册
	 */
	$(".nextEmrol").click(function() {
		modalShow.enrol();
	});
	/**
	 * 注册框内切换登陆
	 */
	$(".nextLogin").click(function() {
		modalShow.login()
	});
	$(".goHome").click(function() {
		window.location.href = 'index.html'
	})
	/**
	 * 验证码
	 */
	var isCountdown = false;
	$(".getCode").click(function() {
		var phone = $("#enrolName").val();
		if(phone == '') {
			$('#enrolName').tooltip('show')
			$(".tooltip-inner").html('手机号不能为空')
			return false;
		} else if(isPhoneNo(phone) == false) {
			$('#enrolName').tooltip('show')
			$(".tooltip-inner").html('手机号格式错误')
			return false;
		}
		var postData = {
			phone: phone
		}
		$ajax('pc/login/getRegPhoneMsg', JSON.stringify(postData), function(e) {
			console.log(e)
			if(e.code != '000000') {

			}
		})
		codeTime() //验证码倒计时
	});
	/**
	 * 退出登陆
	 */
	$(".logOut").click(function() {
		logOut()
	});
	/**
	 * 菜单
	 */
	$(".userImg").hover(function() {
		$(".userList").stop().slideDown(300);
	}, function() {
		$(".userList").stop().slideUp(300);
	})
	/**
	 * 登录注册显示方法
	 */
	var modalShow = {
		login: function() {
			$(".modalLogin").show(), $(".modalEnrol").hide();
		},
		enrol: function() {
			$(".modalEnrol").show(), $(".modalLogin").hide();
		}
	}
	/**
	 * 进入我的课程
	 */
	$("body").on('click', '.myCourse', function() {
		window.location.href = 'myCourses.html'
	})

	function codeTime() {
		var i = 60;
		if(isCountdown) { //倒计时进行中 不执行任何操作
			return false;
		};
		$('.getCode').html("已发送(重发" + i + ")")
		var countdown = setInterval(function() {
			isCountdown = true, i--, $('.getCode').html("已发送(重发" + i + ")")
			if(i == 1) {
				clearInterval(countdown), $(".getCode").html('重新获取验证码'), isCountdown = false;
			}
		}, 1000)
	}
})