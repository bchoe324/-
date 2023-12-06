
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
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                type: 'fraction',
            },
        });
        guideSwiper.on('reachEnd', function(){
            setTimeout(function(){
            	guideSwiper.slideToLoop(0, 1000, false);
            }, 4000);
            
        });
        
        if ( !!$('.tabcont .guide_slide:first-child').attr('data-title') ) {
            
        	var tabTitles = $('.tabcont .guide_slide:first-child').attr('data-title').split(',');
            $('.tabcont .guide_slide:first-child').remove();
            $('.monze_guide_section').css('opacity', 1);
            
            tabTitles.forEach(function(title, index){
                var tabItemCopy = $('.monze_guide_section .tab_item:first-child').clone(false);
                tabItemCopy.text(title).appendTo('.monze_guide_section .tab_list');
                tabCont['#'+ (index + 1)] = [];
            });
            $('.monze_guide_section .tab_item:first-child').addClass('on');
        }
        
        
    	$('.tabcont .swiper-slide').each(function(){
            var $this = $(this);
        	var slideDataTitle = $(this).attr('data-title');
            var slideTitle;
            var slideText = $(this).find('.guide_text');
            
            var hashReg = /(#[0-9])/g;
            slideTitle = slideDataTitle.replaceAll(hashReg,'');
            slideText.html(slideTitle);
            
            var slideHash = slideDataTitle.match(hashReg);
            if(!!slideHash) {
            	slideHash.forEach(function(hashNum, index){
                	tabCont[hashNum].push($this.index());
                });
            }
        });
        
        
        $('.tab_item').click(function(){
        	var tabIndex = '#' + $(this).index();
            console.log('click',tabIndex);
            $(this).addClass('on').siblings().removeClass('on');
            var guideSlide = $('.guide_slide');
			if(tabIndex == '#0') {
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

