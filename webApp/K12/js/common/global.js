/**
 * @Author: Arvay
 * @Date:   2017年8月19日11:18:46
 * @Last modified by:   Arvay
 * @Last modified time: 2017年9月8日21:38:08
 */
var ajaxUrl = 'http://k12.yingshibao.com/';
var deBug = true;
function $ajax(url, data, successfn) {
    $.ajax({
        type: "post",
        url: ajaxUrl + url,
        dataType: 'json',
        data: data,
        contentType: "application/json;charset=utf-8",
        beforeSend: function(e) {
			$(".loading").show();
        },
        success: function(d) {
        	$(".loading").hide();
            successfn(d) && successfn(d);
            if (d.code != '000000') {
                mui.toast(d.msg); //错误信息
            }
        },
        error: function(data) {
        	$(".loading").hide();
            mui.toast(data.msg)
        }
    });
}
// 验证手机号
function isPhoneNo(phone) { 
 var pattern = /^1[34578]\d{9}$/; 
 return pattern.test(phone); 
}
function W_deBug(e) {
    if (deBug == true) {
        console.log(e);
    }
};
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
$(function(){
	/**
	 * 按钮按下状态
	 */
	$(".btnOpacity").hover(function(){
		$(this).addClass('hoverOpacity');
	},function(){
		$(this).removeClass('hoverOpacity');
	})
})
