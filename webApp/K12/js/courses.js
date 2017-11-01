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
	 * 进入课程详情
	 */
	$(".mainRight").on('click','li',function(){
		var id = $(this).attr('id');
		window.location.href = 'particulars.html?id='+id
	})
	/**
	 * 获取我的课程
	 */
	function getMyCourseList() {
		var postData = {
			userId: userId
		}
		$ajax('/course/getMyCourseList ', JSON.stringify(postData),function(e){
			console.log(e)
			var str = '';
			$.each(e.data.gongkaiCourseList,function(index,data){
				str+='<li id="'+data.courseId+'"><dl><dt><img src="'+data.imgUrl
				+'"/></dt><dd>'+data.courseName+'</dd></dl></li>'
			});
			$.each(e.data.v1CourseList,function(index,data){
				str+='<li id="'+data.courseId+'"><dl><dt><img src="'+data.imgUrl
				+'"/></dt><dd>'+data.courseName+'</dd></dl></li>'
			});
			$.each(e.data.xiaobanCourseList,function(index,data){
				str+='<li id="'+data.courseId+'"><dl><dt><img src="'+data.imgUrl
				+'"/></dt><dd>'+data.courseName+'</dd></dl></li>'
			});
			$(".mainRight").append(str);
		})
	}
})