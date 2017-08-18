/**
 * @Author: Arvay
 * @Date:   2017年8月3日23:26:36
 * @Last modified by:   Arvay
 * @Last modified time: 2017年8月3日23:26:38
 */
window.onload = function(){
	mui('.tab').on('tap','span',function(){
		$(this).addClass('pitchOn').siblings().removeClass('pitchOn');
	}) 
};
