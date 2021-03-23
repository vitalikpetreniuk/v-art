var exhibitions_start;
var exhibitions_finish;
var lastScrollTop = 0;
var exhibitions;
var art_spaceship;
var exhibitions_distance;

function loadScripts()
{
	let lang_active = $('.header-lang').find('li').eq(0).attr('lang');
	let lang_active_text = $('.header-lang').find('li').eq(0).text();
	$('.header-lang').find('li').eq(0).addClass('hidden');
	$('.header-lang').prepend('<span class="active '+lang_active_text+'">'+lang_active_text+'</span>');

	$('.intro-carousel .owl-carousel').on('initialized.owl.carousel changed.owl.carousel', function(e) {
	    if (!e.namespace)  {
	      return;
	    }
    	var carousel = e.relatedTarget;
    	var changing_number = parseInt(carousel.relative(carousel.current())) + 1;
    	let artist_title = $(this).find('.owl-item.active .ii-title').text();
    	let artist_info = $(this).find('.owl-item.active .ii-info').text();

    	if(changing_number < 10)
    	{
    		changing_number = '0'+changing_number;
    	}

    	$(this).parents('.vart-intro').find('.carousel-info .counter').find('span.current').text(changing_number);
    	$(this).parents('.vart-intro').find('.carousel-info .counter').find('span.total').text(carousel.items().length);
    	$(this).parents('.vart-intro').find('.carousel-info .artist-name').text(artist_title);
    	$(this).parents('.vart-intro').find('.carousel-info .artist-info').text(artist_info);
  	}).owlCarousel({
	    items: 1,
	    loop: true,
	    nav: true,
	    dots: false,
	    slideTransition: 'cubic-bezier(.785,.135,.15,.86) 0s'
	});

	$('.carousel-info .ci-nav .prev').on('click', function(){
		$('.intro-carousel .owl-prev').trigger('click');
	})
	$('.carousel-info .ci-nav .next').on('click', function(){
		$('.intro-carousel .owl-next').trigger('click');
	})

	$('.grid').masonry({
	  // options
	  itemSelector: '.grid-item',
	  gutter: 24
	});

	$('.vart-head-tabs li a').on('click', function(e){
		e.preventDefault();

		$(this).parents('ul').find('li').removeClass('active');
		$(this).parent().addClass('active');
		$(this).parents('section').find('.tab').removeClass('active');
		$('.tab'+$(this).attr('href')).addClass('active');
	})

	$('.ca-artwork-tablist ul.tablist li a').on('click', function(e){
		e.preventDefault();
		e.stopPropagation();

		$(this).parents('ul').find('li').removeClass('active');
		$(this).parent().addClass('active');
		$(this).parents('.ca-artwork-tablist').find('.artwork-tab').removeClass('active');
		$('.artwork-tab'+$(this).attr('href')).addClass('active');
	})
	$('.ca-artwork-tablist ul.tablist li').eq(0).find('a').trigger('click');

	$('button.menu-toggle').on('click', function(){
		$('body').toggleClass('mobile-menu-opened');
	})


	$('.artworks-carousel .owl-carousel').owlCarousel({
	    loop: true,
	    nav: true,
	    dots: false,
	    slideTransition: 'cubic-bezier(.785,.135,.15,.86) 0s',
	    responsive : {
	    	// breakpoint from 0 up
		    0 : {
		    	items: 1,
		        margin: 0
		    },
	    	// breakpoint from 768 up
		    768 : {
		    	items: 2,
		        margin: 22
		    },
	    	// breakpoint from 1024 up
		    1024 : {
		    	items: 3,
		        margin: 22
		    },
	    	// breakpoint from 1152 up
		    1152 : {
		        margin: 40
		    },
		    // breakpoint from 1281 up
		    1281 : {
		        margin: 42
		    },
		    // breakpoint from 1441 up
		    1441 : {
		        margin: 24
		    }
		}
	});

	$('.chapter-artwork_visual button').on('click', function(){
		$('.chapter-artwork_visual').addClass('active');
	})
	$('.chapter-artwork_visual .vn-fullscreen').on('click', function(){
		$('body').addClass('visual-lightbox-onscreen');
	})
	$('.visual-lightbox-close').on('click', function(){
		$('body').removeClass('visual-lightbox-onscreen');
	})

	if($('.chapter-artwork-list').length)
	{
		$('body').on('click', '.ch-at-tags li', function(){
			if($(this).hasClass('active'))
			{
				$(this).removeClass('active');
				if($('.ch-at-tags li.active').length === 0)
				{
					$('.ch-at-tags li').eq(0).addClass('active');
				}
			}else
			{
				$(this).addClass('active');

				if($(this).attr('data-label') !== 'all-genres')
				{
					$(this).parent().find('li[data-label="all-genres"]').removeClass('active');
				}
			}
		})
	}
}
function exhibitions()
{
	let exhibitions_woman_current;
	let exhibitions_cube_white_current;
	let exhibitions_pyramid_current;
	let exhibitions_cb1_current;
	let art_spaceship_cb2_current;
	let exhibitions_cb3_current;

	let exhibitions_cb2_current;

	let exhibitions_woman = 40;
	let exhibitions_cube_white = 47;
	let exhibitions_pyramid_cb = 32;
	let exhibitions_cb2 = 96;
	let exhibitions_cb3 = 80;

	let art_spaceship_cb2 = 32;

	exhibitions = $('.vart-exhibitions-projects .project.exhibitions');
	art_spaceship = $('.vart-exhibitions-projects .project.art-spaceship');

	exhibitions_start = $('.vart-exhibitions-projects .projects-list').offset().top + $('.vart-exhibitions-projects .projects-list').height() - $(window).height();
	exhibitions_finish = $('.vart-exhibitions-projects .projects-list').offset().top - 80;
	exhibitions_distance = exhibitions_finish - exhibitions_start;
	exhibitions_distance = Math.round(exhibitions_distance * 100) / 100;

	if($(window).width() > 1439)
	{
		exhibitions_woman_current = 40;
		exhibitions_cube_white_current = 208;
		exhibitions_pyramid_current = 210;
		exhibitions_cb1_current = 383;
		exhibitions_cb2_current = 303;
		exhibitions_cb3_current = 430;

		art_spaceship_cb2_current = 502;
	}

	let coefficient_woman = exhibitions_woman/exhibitions_distance;
	let coefficient_cube_white = exhibitions_cube_white/exhibitions_distance;
	let coefficient_pyramid_cb = exhibitions_pyramid_cb/exhibitions_distance;
	let coefficient_cb2 = exhibitions_cb2/exhibitions_distance;
	let coefficient_cb3 = exhibitions_cb3/exhibitions_distance;

	let as_coefficient_cb2 = art_spaceship_cb2/exhibitions_distance;
	
	$(window).on('scroll', function(){
		var st = $(this).scrollTop();
		var scrolled = $(window).scrollTop();
		let scrolled_in;

		if(scrolled >= exhibitions_start && scrolled <= exhibitions_finish)
		{
			scrolled_in = scrolled - exhibitions_start;

			exhibitions.find('.main').css('top',(exhibitions_woman_current-(scrolled_in*coefficient_woman))+'px');
			exhibitions.find('.cube-white').css('top',(exhibitions_cube_white_current-(scrolled_in*coefficient_cube_white))+'px');
			exhibitions.find('.pyramid').css('top',(exhibitions_pyramid_current+(scrolled_in*coefficient_pyramid_cb))+'px');
			exhibitions.find('.cb1').css('top',(exhibitions_cb1_current+(scrolled_in*coefficient_pyramid_cb))+'px');
			exhibitions.find('.cb2').css('top',(exhibitions_cb2_current+(scrolled_in*coefficient_cb2))+'px');
			exhibitions.find('.cb3').css('top',(exhibitions_cb3_current+(scrolled_in*coefficient_cb3))+'px');

			console.log(art_spaceship_cb2_current+(scrolled_in*as_coefficient_cb2));
			art_spaceship.find('.cb2').css('top',(art_spaceship_cb2_current+(scrolled_in*as_coefficient_cb2))+'px');
		}

		lastScrollTop = st;
	})
}


$(function() {
	loadScripts();

	if($('.vart-exhibitions-projects ').length)
	{
		exhibitions();
	}
});
