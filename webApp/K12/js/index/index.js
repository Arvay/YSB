/**
 * @Author: Arvay
 * @Date:   2017年9月15日17:44:10
 * @Last modified by:   Arvay
 * @Last modified time: 2017年9月20日15:32:42
 */
$(function() {
	/**
	 * 加载头部
	 */
	$("header").load('views/header.html');
	/**
	 * 班级切换
	 */
	$(".ul4 li").click(function(){
		$(this).addClass('ulFff').siblings().removeClass('ulFff');//添加状态样式
	});
	
});