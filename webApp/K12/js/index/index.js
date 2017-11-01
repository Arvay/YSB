/**
 * @Author: Arvay
 * @Date:   2017年9月15日17:44:10
 * @Last modified by:   Arvay
 * @Last modified time: 2017年9月20日15:32:42
 */
$(function() {
	//获取全部课程
	getCourseList('all');
	$(".daban").append("<h1>公开课大班</h1>")
	$(".xiaoban").append("<h1>公开课小班</h1>")
	/**
	 * 加载头部
	 */
	$("header").load('views/header.html');

	/**
	 * 班级切换
	 */
	$(".ul4 li").click(function() {
		var type = $(this).attr('id');
		$(".daban").html("<h1>公开课大班</h1>")
		$(".xiaoban").html("<h1>公开课小班</h1>")
		getCourseList(type); //获取指定课程
		$(this).addClass('ulFff').siblings().removeClass('ulFff'); //添加状态样式
	});
	/**
	 * 进入我的课程
	 */
	$("body").on('click','.myCourse',function(){
		window.location.href = 'myCourses.html'
	})
	/**
	 * 进入详情
	 * @param {Object} type
	 */
	$(".content").on('click','li',function(){
		var id  = $(this).attr('id');
		window.location.href='particulars.html?id='+id
	})
	function getCourseList(type) {
		var postData = {
			type: type
		}
		$ajax('/course/getCourseList ', JSON.stringify(postData), function(e) {
			console.log(e)
			if(e.code == '000000') {
				var str = '';
				var xiaoban = '';
				if(e.data.gongkaiCourseList.length < 1){
					$(".daban").append('<span class="listNull">暂无课程</span>')
				}
				if(e.data.xiaobanCourseList.length < 1){
					$(".xiaoban").append('<span class="listNull">暂无课程</span>')
				}
				$.each(e.data.gongkaiCourseList, function(index, data) {
					str += '<li id="' + data.id + '"><dl><dt><img src="' +
						data.imgUrl + '"></dt><dd><h2>' +
						data.name + '</h2><span class="homePrice">¥' +
						data.price + '</span><span class="homeTip">' +
						(!data.buyerNumber ? '0' : data.buyerNumber) + '人已购买</span></dd></dl></li>'
				})
				$.each(e.data.xiaobanCourseList, function(index, data) {
					xiaoban += '<li id="' + data.id + '"><dl><dt><img src="' +
						data.imgUrl + '"></dt><dd><h2>' +
						data.name + '</h2><span class="homePrice">¥' +
						data.price + '</span><span class="homeTip">' +
						(!data.buyerNumber ? '0' : data.buyerNumber) + '人已购买</span></dd></dl></li>'
				})
				$(".daban").append(str)
				$(".xiaoban").append(xiaoban)
			} else {
				$.message({
					message: '密码不得低于6位',
					type: 'error'
				})
			}
		})
	}
});