/**
 * @Author: Arvay
 * @Date:   2017年10月31日18:15:19
 * @Last modified by:   Arvay
 * @Last modified time: 2017年10月31日18:15:21
 */
$(function() {
	$("header").load('views/header.html');
	getMyCourseList();
	/**
	 * 获取我的课程
	 */
	function getMyCourseList() {
		var postData = {
			userId: userId
		}
		$ajax('/course/getMyCourseList ', JSON.stringify(postData),function(e){
			console.log(e)
		})

	}
})