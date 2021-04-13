var exhibitions_start;
var exhibitions_finish;
var lastScrollTop = 0;
var exhibitions;
var exhibitions_img;
var art_spaceship;
var art_spaceship_img;
var dartstudio;
var dartstudio_img;
var exhibitions_distance;

function ValidateEmail(inputText, parent)
{
	var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
	if(inputText.match(mailformat))
	{
		parent.addClass('success');
	}
	else
	{
		parent.addClass('error');
	}
}
 function validatePassword() {
    var validator = $("#signup").validate({
        rules: {
        	password: {
		      required: true,
		      minlength: 6
		    },
            confirmpassword: {
                equalTo: "#password"
            }
        },
        messages: {
            password: "Password",
            confirmpassword: "Confirm password"
        }
    });
    if (validator.form()) {
        $('#confirmpassword').parent().addClass('success');
    }else
    {
    	$('#confirmpassword').parent().addClass('error');
    }
}

function loadScripts()
{
	let lang_active = $('.header-lang').find('li.current-lang').attr('lang');
	let lang_active_text = $('.header-lang').find('li.current-lang').text();

	$('.header-lang').find('li.current-lang').addClass('hidden');
	$('.header-lang').prepend('<span class="active '+lang_active_text+'">'+lang_active_text+'</span>');

	$('.intro-carousel .owl-carousel').on('initialized.owl.carousel changed.owl.carousel', function(e) {
	    if (!e.namespace)  {
	      return;
	    }
    	var carousel = e.relatedTarget;
    	var changing_number = parseInt(carousel.relative(carousel.current())) + 1;
    	let artist_title = '';
    	let artist_info = '';

    	if(changing_number < 10)
    	{
    		changing_number = '0'+changing_number;
    	}
    	$this = $(this);

    	$this.parents('.vart-intro').find('.carousel-info .counter').find('span.current').text(changing_number);
    	$this.parents('.vart-intro').find('.carousel-info .counter').find('span.total').text(carousel.items().length);

    	setTimeout(function(){
	    	let artist_title = $this.find('.owl-item.active .ii-title').text();
	    	let artist_info = $this.find('.owl-item.active .ii-info').text();

	    	console.log(artist_title);
	    	console.log(artist_info);
	    	$this.parents('.vart-intro').find('.carousel-info .artist-name').text(artist_title);
	    	$this.parents('.vart-intro').find('.carousel-info .artist-info').text(artist_info);
    	},50)
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

	if($('.ch-at-tags').length)
	{
		$('body').on('click', '.ch-artwork-tags .ch-at-tags li', function(){
			if($(this).hasClass('active'))
			{
				// $(this).removeClass('active');

				// if($(this).parents('.ch-artwork-tags').find('.ch-at-tags li.active').length === 0)
				// {
				// 	$(this).parents('.ch-artwork-tags').find('.ch-at-tags li').eq(0).addClass('active');
				// }
			}else
			{
				// if($(this).index() === 0)
				// {
					$(this).parents('.ch-artwork-tags').find('.ch-at-tags li').removeClass('active');
					$(this).addClass('active');
				// }else
				// {
				// 	$(this).addClass('active');
				// 	if($(this).attr('data-label') !== 'all-genres')
				// 	{
				// 		$(this).parent().find('li[data-label="all-genres"]').removeClass('active');
				// 	}
				// }
			}
		})

		$('.ch-at-tags .current-tag').on('click', function(){
			if($(this).parent().hasClass('in-work'))
			{
				$(this).parent().removeClass('in-work');
				$(this).parent().find('.ch-at-tags-list').removeClass('opened');
			}else
			{	
				$(this).parent().addClass('in-work');
				$(this).parent().find('.ch-at-tags-list').addClass('opened');
			}
		})
		$('.ch-at-tags .ch-at-tags-list li').on('click', function(){
			$(this).parents('.ch-at-tags').removeClass('in-work');
			$(this).parent().find('li').removeClass('active');
			$(this).addClass('active');
			
			$(this).parents('.ch-at-tags').find('.current-tag').text($(this).text());
			$(this).parents('.ch-at-tags-list').removeClass('opened');
		})
	}

	if($('.art-chapters-content').length)
	{
		$('.chapters-list li a').on('click', function(e){
			$('.chapters-list li').removeClass('active');
			$(this).parent().addClass('active');

			e.preventDefault();
			$('.art-chapters-content .chapter').removeClass('active');
			$('.art-chapters-content .chapter'+$(this).attr('href')).addClass('active');
		})
	}

	$('.form-eye').on('click', function(){
		if($(this).parent().hasClass('pass-visible'))
		{
			$(this).parent().removeClass('pass-visible');
			$(this).parent().find('input').attr('type', 'password');
		}else
		{
			$(this).parent().addClass('pass-visible');
			$(this).parent().find('input').attr('type', 'text');
		}
	})

	$('form#signup').find('input').on('focus', function(){
		$(this).parent().removeClass('error success');
	})
	$('form#signup').find('input').on('blur', function(){
		if($(this).attr('type') === 'email')
		{
			if($(this).val() !== '')
			{
				ValidateEmail($(this).val(),$(this).parent());
			}else
			{
				$(this).parent().removeClass('error success');
			}

		}else if($(this).attr('id') === 'confirmpassword')
		{
			if($(this).val() !== '')
			{
				validatePassword();
			}else
			{
				$(this).parent().removeClass('error success');
			}
		}
	})

	$('input[readonly], input[disabled]').parent().addClass('readonly');
	// $('form#signup').find('input').on('input', function(){
	// 	if($(this).attr('type') === 'email' && $(this).val() !== '')
	// 	{
	// 		ValidateEmail($(this).val());
	// 	}else
	// 	{
	// 		$(this).parent().removeClass('error success');
	// 	}
	// })

	$('.intro-mobile-info').on('click', function(){
		$(this).toggleClass('active');
		$('#vart-content .vart-intro .intro-content').toggleClass('info-visible');
	})

	$(document).on('click', function (e) {
	    if ($(e.target).closest(".intro-mobile-info").length === 0 && $(e.target).closest(".ci-artist").length === 0) {
	        $(this).removeClass('active');
			$('#vart-content .vart-intro .intro-content').removeClass('info-visible');
	    }
	});
	$(document).mouseup(function (e)
	{

		var container = $('.ch-at-tags');

		if (!container.is(e.target) // if the target of the click isn't the container...
		    && container.has(e.target).length === 0) // ... nor a descendant of the container
		{
		    $('.ch-at-tags').removeClass('in-work');
		    $('.ch-at-tags .ch-at-tags-list').removeClass('opened');
		}
	});

}
function exhibitions()
{

	exhibitions = $('.vart-exhibitions-projects .project.exhibitions');
	exhibitions_img = exhibitions.find('.project-image');
	art_spaceship = $('.vart-exhibitions-projects .project.art-spaceship');
	art_spaceship_img = art_spaceship.find('.project-image');
	dartstudio = $('.vart-exhibitions-projects .project.dartstudio');
	dartstudio_img = dartstudio.find('.project-image');

	let exhibitions_woman_current = parseInt(exhibitions_img.find('.main').css('top').split('px')[0]);
	let exhibitions_cube_white_current = parseInt(exhibitions_img.find('.cube-white').css('top').split('px')[0]);
	let exhibitions_pyramid_current = parseInt(exhibitions_img.find('.pyramid').css('top').split('px')[0]);
	let exhibitions_cb1_current = parseInt(exhibitions_img.find('.cb1').css('top').split('px')[0]);
	let exhibitions_cb2_current = parseInt(exhibitions_img.find('.cb2').css('top').split('px')[0]);
	let exhibitions_cb3_current = parseInt(exhibitions_img.find('.cb3').css('top').split('px')[0]);

	let art_spaceship_spaceman_current = parseInt(art_spaceship_img.find('.spaceman').css('top').split('px')[0]);
	let art_spaceship_dots_current = parseInt(art_spaceship_img.find('.dots').css('top').split('px')[0]);
	let art_spaceship_pyramid_current = parseInt(art_spaceship_img.find('.pyramid').css('top').split('px')[0]);
	let art_spaceship_cube_black_current = parseInt(art_spaceship_img.find('.cube-black').css('top').split('px')[0]);
	let art_spaceship_cb1_current = parseInt(art_spaceship_img.find('.cb1').css('top').split('px')[0]);
	let art_spaceship_cb2_current = parseInt(art_spaceship_img.find('.cb2').css('top').split('px')[0]);

	let dartstudio_head_current = parseInt(dartstudio_img.find('.head').css('top').split('px')[0]);
	let dartstudio_triangle_current = parseInt(dartstudio_img.find('.triangle').css('top').split('px')[0]);
	let dartstudio_pyramid_current = parseInt(dartstudio_img.find('.pyramid').css('top').split('px')[0]);
	let dartstudio_cb1_current = parseInt(dartstudio_img.find('.cb1').css('top').split('px')[0]);
	let dartstudio_cb2_current = parseInt(dartstudio_img.find('.cb2').css('top').split('px')[0]);
	let dartstudio_cb3_current = parseInt(dartstudio_img.find('.cb3').css('top').split('px')[0]);


	let exhibitions_woman = 40;
	let exhibitions_cube_white = 47;
	let exhibitions_pyramid_cb = 32;
	let exhibitions_cb2 = 96;
	let exhibitions_cb3 = 80;

	let art_spaceship_spaceman = 60;
	let art_spaceship_dots = 110;
	let art_spaceship_pyramid = 83;
	let art_spaceship_cube_black = 45;
	let art_spaceship_cb1 = 80;
	let art_spaceship_cb2 = 34;

	let dartstudio_head = 48;
	let dartstudio_triangle = 77;
	let dartstudio_pyramid = 50;
	let dartstudio_cb1 = 8;
	let dartstudio_cb2 = 32;
	let dartstudio_cb3 = 62;

	if($(window).width() <= 1699)
	{
		let coef;

		if($(window).width() > 1024)
		{
			coef = 0.78;
		}else
		{
			coef = 0.68;
		}

		exhibitions_woman = exhibitions_woman*coef;
		exhibitions_cube_white = exhibitions_cube_white*coef;
		exhibitions_pyramid_cb = exhibitions_pyramid_cb*coef;
		exhibitions_cb2 = exhibitions_cb2*coef;
		exhibitions_cb3 = exhibitions_cb3*coef;

		art_spaceship_spaceman = art_spaceship_spaceman*coef;
		art_spaceship_dots = art_spaceship_dots*coef;
		art_spaceship_pyramid = art_spaceship_pyramid*coef;
		art_spaceship_cube_black = art_spaceship_cube_black*coef;
		art_spaceship_cb1 = art_spaceship_cb1*coef;
		art_spaceship_cb2 = art_spaceship_cb2*coef;

		dartstudio_head = dartstudio_head*coef;
		dartstudio_triangle = dartstudio_triangle*coef;
		dartstudio_pyramid = dartstudio_pyramid*coef;
		dartstudio_cb1 = dartstudio_cb1*coef;
		dartstudio_cb2 = dartstudio_cb2*coef;
		dartstudio_cb3 = dartstudio_cb3*coef;
	}


	exhibitions_start = $('.vart-exhibitions-projects .projects-list').offset().top + $('.vart-exhibitions-projects .projects-list').height() - $(window).height() - 50;
	exhibitions_finish = $('.vart-exhibitions-projects .projects-list').offset().top - 80;
	exhibitions_distance = exhibitions_finish - exhibitions_start;
	exhibitions_distance = Math.round(exhibitions_distance * 100) / 100;

	let coefficient_woman = exhibitions_woman/exhibitions_distance;
	let coefficient_cube_white = exhibitions_cube_white/exhibitions_distance;
	let coefficient_pyramid_cb = exhibitions_pyramid_cb/exhibitions_distance;
	let coefficient_cb2 = exhibitions_cb2/exhibitions_distance;
	let coefficient_cb3 = exhibitions_cb3/exhibitions_distance;

	let as_coefficient_spaceman = art_spaceship_spaceman/exhibitions_distance;
	let as_coefficient_dots = art_spaceship_dots/exhibitions_distance;
	let as_coefficient_pyramid = art_spaceship_pyramid/exhibitions_distance;
	let as_coefficient_cube_black = art_spaceship_cube_black/exhibitions_distance;
	let as_coefficient_cb1 = art_spaceship_cb1/exhibitions_distance;
	let as_coefficient_cb2 = art_spaceship_cb2/exhibitions_distance;

	let coefficient_ds_head = dartstudio_head/exhibitions_distance;
	let coefficient_ds_triangle = dartstudio_triangle/exhibitions_distance;
	let coefficient_ds_pyramid = dartstudio_pyramid/exhibitions_distance;
	let coefficient_ds_cb1 = dartstudio_cb1/exhibitions_distance;
	let coefficient_ds_cb2 = dartstudio_cb2/exhibitions_distance;
	let coefficient_ds_cb3 = dartstudio_cb3/exhibitions_distance;
	
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

			art_spaceship.find('.spaceman').css('top',(art_spaceship_spaceman_current-(scrolled_in*as_coefficient_spaceman))+'px');
			art_spaceship.find('.dots').css('top',(art_spaceship_dots_current-(scrolled_in*as_coefficient_dots))+'px');
			art_spaceship.find('.pyramid').css('top',(art_spaceship_pyramid_current-(scrolled_in*as_coefficient_pyramid))+'px');
			art_spaceship.find('.cube-black').css('top',(art_spaceship_cube_black_current+(scrolled_in*as_coefficient_cube_black))+'px');
			art_spaceship.find('.cb1').css('top',(art_spaceship_cb1_current+(scrolled_in*as_coefficient_cb1))+'px');
			art_spaceship.find('.cb2').css('top',(art_spaceship_cb2_current+(scrolled_in*as_coefficient_cb2))+'px');

			dartstudio.find('.head').css('top',(dartstudio_head_current-(scrolled_in*coefficient_ds_head))+'px');
			dartstudio.find('.triangle').css('top',(dartstudio_triangle_current-(scrolled_in*coefficient_ds_triangle))+'px');
			dartstudio.find('.pyramid').css('top',(dartstudio_pyramid_current+(scrolled_in*coefficient_ds_pyramid))+'px');
			dartstudio.find('.cb1').css('top',(dartstudio_cb1_current-(scrolled_in*coefficient_ds_cb1))+'px');
			dartstudio.find('.cb2').css('top',(dartstudio_cb2_current+(scrolled_in*coefficient_ds_cb2))+'px');
			dartstudio.find('.cb3').css('top',(dartstudio_cb3_current+(scrolled_in*coefficient_ds_cb3))+'px');
		}

		lastScrollTop = st;
	})
}
function digitalArt()
{
	let digital_art = $('.about-image');

	let w_flower_current = parseInt(digital_art.find('.flower').css('top').split('px')[0]);
	let w_waves_current = parseInt(digital_art.find('.waves').css('left').split('px')[0]);
	let w_digital_current = parseInt(digital_art.find('.digital').css('top').split('px')[0]);
	let w_pyramid_blue_current = parseInt(digital_art.find('.pyramid-blue').css('top').split('px')[0]);
	let w_pyramid_white_current = parseInt(digital_art.find('.pyramid-white').css('top').split('px')[0]);
	let w_cbw1_current = parseInt(digital_art.find('.cbw1').css('top').split('px')[0]);
	let w_cbw2_current = parseInt(digital_art.find('.cbw2').css('top').split('px')[0]);
	let w_cbb1_current = parseInt(digital_art.find('.cbb1').css('top').split('px')[0]);
	let w_cbb2_current = parseInt(digital_art.find('.cbb2').css('top').split('px')[0]);
	let w_cb_black_current = parseInt(digital_art.find('.cube-black').css('top').split('px')[0]);

	let w_flower = 52;
	let w_waves = 50;
	let w_digital = 25;
	let w_pyramid_blue = 45;
	let w_pyramid_white = 70;
	let w_cbw1 = 62;
	let w_cbw2 = 32;
	let w_cbb1 = 110;
	let w_cbb2 = 32;
	let w_cb_black = 60;

	if($(window).width() <= 1699)
	{
		let coef;

		if($(window).width() > 1023)
		{
			coef = 0.76;
		}else if($(window).width() <= 1023 && $(window).width() > 767)
		{
			coef = 0.72;
		}else
		{
			coef = 0.63;
		}

		w_flower = w_flower*coef;
		w_waves = w_waves*coef;
		w_digital = w_digital*coef;
		w_pyramid_blue = w_pyramid_blue*coef;
		w_pyramid_white = w_pyramid_white*coef;
		w_cbw1 = w_cbw1*coef;
		w_cbw2 = w_cbw2*coef;
		w_cbb1 = w_cbb1*coef;
		w_cbb2 = w_cbb2*coef;
		w_cb_black = w_cb_black*coef;
	}


	let da_start = $('.vart-intouch').offset().top - $(window).height() - 100;
	if($(window).width() <= 767)
	{
		da_start = $('.vart-about .about-content').offset().top - $(window).height() - 50;
	}
	let da_finish = $('.vart-about .about-image').offset().top - 80;
	let da_distance = da_finish - da_start;
	da_distance = Math.round(da_distance * 100) / 100;

	let coefficient_flower = w_flower/da_distance;
	let coefficient_waves = w_waves/da_distance;
	let coefficient_digital = w_digital/da_distance;
	let coefficient_pyramid_blue = w_pyramid_blue/da_distance;
	let coefficient_pyramid_white = w_pyramid_white/da_distance;
	let coefficient_cbw1 = w_cbw1/da_distance;
	let coefficient_cbw2 = w_cbw2/da_distance;
	let coefficient_cbb1 = w_cbb1/da_distance;
	let coefficient_cbb2 = w_cbb2/da_distance;
	let coefficient_cb_black = w_cb_black/da_distance;

	$(window).on('scroll', function(){
		var st = $(this).scrollTop();
		var scrolled = $(window).scrollTop();
		let scrolled_in;

		if(scrolled >= da_start && scrolled <= da_finish)
		{
			scrolled_in = scrolled - da_start;

			digital_art.find('.flower').css('top',(w_flower_current+(scrolled_in*coefficient_flower))+'px');
			digital_art.find('.waves').css('left',(w_waves_current+(scrolled_in*coefficient_waves))+'px');
			digital_art.find('.digital').css('top',(w_digital_current-(scrolled_in*coefficient_digital))+'px');

			digital_art.find('.pyramid-blue').css('top',(w_pyramid_blue_current-(scrolled_in*coefficient_pyramid_blue))+'px');
			digital_art.find('.pyramid-white').css('top',(w_pyramid_white_current-(scrolled_in*coefficient_pyramid_white))+'px');

			digital_art.find('.cbw1').css('top',(w_cbw1_current-(scrolled_in*coefficient_cbw1))+'px');
			digital_art.find('.cbw2').css('top',(w_cbw2_current-(scrolled_in*coefficient_cbw2))+'px');

			digital_art.find('.cbb1').css('top',(w_cbb1_current-(scrolled_in*coefficient_cbb1))+'px');
			digital_art.find('.cbb2').css('top',(w_cbb2_current+(scrolled_in*coefficient_cbb2))+'px');

			digital_art.find('.cube-black').css('top',(w_cb_black_current+(scrolled_in*coefficient_cb_black))+'px');
		}

		lastScrollTop = st;
	})
}
function seoDigital()
{
	let seo_digital = $('.boost-image');

	let seo_waves_current = parseInt(seo_digital.find('.waves').css('left').split('px')[0]);
	let seo_triangle_current = parseInt(seo_digital.find('.triangle').css('top').split('px')[0]);
	let seo_flower_current = parseInt(seo_digital.find('.flower').css('top').split('px')[0]);
	let seo_pyramid_current = parseInt(seo_digital.find('.pyramid').css('top').split('px')[0]);
	let seo_cbw_current = parseInt(seo_digital.find('.cube-white').css('top').split('px')[0]);
	let seo_cbb_current = parseInt(seo_digital.find('.cube-blue').css('top').split('px')[0]);

	let seo_waves = 130;
	let seo_triangle = 72;
	let seo_flower = 97;
	let seo_pyramid = 96;
	let seo_cbw = 62;
	let seo_cbb = 35;

	if($(window).width() <= 1699)
	{
		let coef;

		if($(window).width() > 1152)
		{
			coef = 0.85;
		}else if($(window).width() < 1152 && $(window).width() > 1024)
		{
			coef = 0.66;
		}else
		{
			coef = 0.68;
		}

		seo_waves = seo_waves*coef;
		seo_triangle = seo_triangle*coef;
		seo_flower = seo_flower*coef;
		seo_pyramid = seo_pyramid*coef;
		seo_cbw = seo_cbw*coef;
		seo_cbb = seo_cbb*coef;
	}

	let seo_start = $('.vart-boost .row:nth-child(2)').offset().top - $(window).height();
	let seo_finish = $('.vart-boost .boost-image').offset().top - 120;
	let seo_distance = seo_finish - seo_start;
	seo_distance = Math.round(seo_distance * 100) / 100;

	let coefficient_seo_waves = seo_waves/seo_distance;
	let coefficient_seo_triangle = seo_triangle/seo_distance;
	let coefficient_seo_flower = seo_flower/seo_distance;
	let coefficient_seo_pyramid = seo_pyramid/seo_distance;
	let coefficient_seo_cbw = seo_cbw/seo_distance;
	let coefficient_seo_cbb = seo_cbb/seo_distance;

	$(window).on('scroll', function(){
		var st = $(this).scrollTop();
		var scrolled = $(window).scrollTop();
		let scrolled_in;

		if(scrolled >= seo_start && scrolled <= seo_finish)
		{
			scrolled_in = scrolled - seo_start;

			seo_digital.find('.waves').css('left',(seo_waves_current+(scrolled_in*coefficient_seo_waves))+'px');
			seo_digital.find('.triangle').css('top',(seo_triangle_current+(scrolled_in*coefficient_seo_triangle))+'px');
			seo_digital.find('.flower').css('top',(seo_flower_current+(scrolled_in*coefficient_seo_flower))+'px');
			seo_digital.find('.pyramid').css('top',(seo_pyramid_current+(scrolled_in*coefficient_seo_pyramid))+'px');
			seo_digital.find('.cube-white').css('top',(seo_cbw_current-(scrolled_in*coefficient_seo_cbw))+'px');
			seo_digital.find('.cube-blue').css('top',(seo_cbb_current+(scrolled_in*coefficient_seo_cbb))+'px');
		}

		lastScrollTop = st;
	})
}


$(function() {
	loadScripts();

	if($('.vart-exhibitions-projects').length)
	{
		exhibitions();
	}
	if($('.vart-about').length)
	{
		 digitalArt();
	}
	if($('.vart-boost').length)
	{
		 seoDigital();
	}
});
