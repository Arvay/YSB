$(function() {
	var id = GetQueryString('id');//课程id
	/**
	 * 加载头部
	 */
	$("header").load('views/header.html');
	getCourseDetail();//获取课程详情
	//box选项点击
	$(".listBtn").on('click','li',function(){
		$(this).addClass('listBtnClick').siblings().removeClass('listBtnClick')
	})
	function getCourseDetail(){
		var postData = {
			courseId: id,
			userId: userId
		}
		$ajax('/course/getCourseDetail',JSON.stringify(postData),function(e){
			console.log(e)
			var data = e.data
			if(e.code == '000000'){
				$(".headerLeft").html('<img src="'+data.imgUrl+'">')
				$(".headerRight").html('<h1>'+data.name+'</h1><h1 style="color:#24CF62">￥'+data.price
				+'</h1><h2>课时：64&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;有效期：</h2><h2>主讲：'+
				data.teacherName+'</h2><h2 style="margin-top: 10px;">开课时间：</h2><h2>购买人数：'+
				(!data.buyerNumber ? '0' : data.buyerNumber)+'</h2><span class="apply">立即报名</span><span class="audition">试听</span>')
			}
		})
	}
})