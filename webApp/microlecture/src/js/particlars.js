/**
 * @Author: Arvay
 * @Date:   2017年8月18日10:38:53
 * @Last modified by:   Arvay
 * @Last modified time: 2017年8月18日10:38:55
 */
$(function(){
var scroll = mui('.mui-scroll-wrapper').scroll();
    document.querySelector('.mui-scroll-wrapper' ).addEventListener('scroll', function (e) {
        if(e.detail.y < -230){
        }
});
    var tops =  $(".arvay").offset().top;
    mui('.rightBtn').on('tap','img',function(){
 	   mui('.mui-scroll-wrapper').scroll().scrollTo(0,-tops,600);//100毫秒滚动到顶
    }) 
})
