
$(document).ready(function(){
	var guideSlideLength = $('.tabcont').length;
    if(guideSlideLength > 0) {
        var tabCont = {};
        var guideSwiper = new Swiper('.tabcont', {
        	slidesPerView: 3,
            spaceBetween: 20,
            observer: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: '.monze_guide_section .swiper-button-next',
                prevEl: '.monze_guide_section .swiper-button-prev',
            },
            pagination: {
                el: '.monze_guide_section .swiper-pagination',
                type: 'fraction',
            },
        });
       
        
        $('.monze_guide_section').css('opacity', 1);
    	$('.tabcont .swiper-slide').each(function(){
            var $this = $(this);
        	var slideDataTitle = $(this).attr('data-title');
            var slideTitle;
            var slideText = $(this).find('.guide_text');
            
            var hashReg = /(#[^#$]+)/g;
            slideTitle = slideDataTitle.replaceAll(hashReg,'');
            slideText.html(slideTitle);
            
            var slideHash = slideDataTitle.match(hashReg);
            
            if(!!slideHash) {
            	slideHash.forEach(function(hashTitle, index){
                	if(!tabCont[hashTitle]) {
                    	tabCont[hashTitle] = [];
                        tabCont[hashTitle].push($this.index());
                    } else {
                        tabCont[hashTitle].push($this.index());
                    }
                });
            }
        });
        if(Object.keys(tabCont).length >= 1) {
        	Object.keys(tabCont).forEach(function(title, index){
            	var titleSpan = $('<span>' + title +'</span>');
                var tabItemCopy = $('.monze_guide_section .tab_item:first-child').clone(false);
                tabItemCopy.html(titleSpan).appendTo('.monze_guide_section .tab_list');
            });
        }
        $('.monze_guide_section .tab_item:first-child').addClass('on');
        
        
        $('.tab_item').click(function(){
        	var tabIndex = $(this).text();
            $(this).addClass('on').siblings().removeClass('on');
            var guideSlide = $('.guide_slide');
			if(tabIndex == '#전체') {
            	guideSlide.removeClass('displaynone');
            } else {
            	var slideIndex = tabCont[tabIndex];
                guideSlide.addClass('displaynone');
                slideIndex.forEach(function(no, index){
                	guideSlide.eq(no).removeClass('displaynone');
                });
            }
            guideSwiper.update();
        });
    }
});

