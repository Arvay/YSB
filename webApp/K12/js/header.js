/**
 * @Author: Arvay
 * @Date:   2017年9月16日15:18:51
 * @Last modified by:   Arvay
 * @Last modified time: 2017年9月16日15:18:54
 */
$(function() {
	var a = true;
	$(".goCodeLogin").click(function(){
		a = !a;
		if(a){
			$(".passworldLogin").hide(),$(".loginCodeR").show(),$(this).html("密码登陆")
		}else{
			$(".passworldLogin").show(),$(".loginCodeR").hide(),$(this).html("验证码登陆");
		}
	})
})