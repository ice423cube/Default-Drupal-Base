
/*

	GalleryView - jQuery Content Gallery Plugin
	Author: 		Jack Anderson
	Version:		1.1 (April 5, 2009)
	Documentation: 	http://www.spaceforaname.com/jquery/galleryview/
	
	Updated by: Joe Roberts so that it will integrate directly with drupal 7.
	
*/
(function($){
	$.fn.galleryView = function(options) {
		var opts = $.extend($.fn.galleryView.defaults,options);
		
		var id;
		var iterator = 0;
		var gallery_width;
		var gallery_height;
		var frame_margin = 10;
		var strip_width;
		var wrapper_width;
		var item_count = 0;
		var slide_method;
		//var img_path = 'sites/all/themes/jmr/images';
		var paused = false;
		var frame_caption_size = opts.caption_height;
		var frame_margin_top = 5;
		var pointer_width = 2;
		var pointer_arrow_width = 12;
		
		//Define jQuery objects for reuse
		var j_gallery;
		var j_filmstrip;
		var j_frames;
		var j_panels;
		var j_pointer;
		
		if(opts.filmstrip_style == 'popupthumbnails'){
			var popup_image_frame_height = opts.frame_height;
			//sets the opts width to 22px for the width of the numbered versions
			opts.frame_height = 22;
			
			var popup_image_frame_width = opts.frame_width;
			//sets the opts width to 44px for the width of the numbered versions
			opts.frame_width = 44;
		}
		
		//var show_caption;
		//var has_filmstrip;
		//var has_panels;
		//var strip_size;
		
/************************************************/
/*	Plugin Methods								*/
/************************************************/	
		function showItem(i) {
			//Disable next/prev buttons until transition is complete
			$('div.nav-next').unbind('click');
			$('div.nav-prev').unbind('click');
			j_frames.unbind('click');
			if(has_panels) {
				if(opts.fade_panels) {
					//Fade out all panels and fade in target panel
					j_panels.fadeOut(opts.transition_speed).eq(i%item_count).fadeIn(opts.transition_speed,function(){
						if(!has_filmstrip) {
							$('div.nav-prev').click(showPrevItem);
							$('div.nav-next').click(showNextItem);		
						}
					});
				} 
			}
			
			if(has_filmstrip) {
				//Slide either pointer or filmstrip, depending on transition method
				if(slide_method=='strip') {
					//Stop filmstrip if it's currently in motion
					j_filmstrip.stop();
					
					//Determine distance between pointer (eventual destination) and target frame
					var distance = getPos(j_frames[i]).left - (getPos(j_pointer[0]).left+2);
					var leftstr = (distance>=0?'-=':'+=')+Math.abs(distance)+'px';
					
					//Animate filmstrip and slide target frame under pointer
					//If target frame is a duplicate, jump back to 'original' frame
					j_filmstrip.animate({
						'left':leftstr
					},opts.transition_speed,opts.easing,function(){
						//Always ensure that there are a sufficient number of hidden frames on either
						//side of the filmstrip to avoid empty frames
						if(i>item_count) {
							i = i%item_count;
							iterator = i;
							j_filmstrip.css('left','-'+((opts.frame_width+frame_margin)*i)+'px');
						} else if (i<=(item_count-strip_size)) {
							i = (i%item_count)+item_count;
							iterator = i;
							j_filmstrip.css('left','-'+((opts.frame_width+frame_margin)*i)+'px');
						}
						
						if(!opts.fade_panels) {
							j_panels.hide().eq(i%item_count).show();
						}
						$('div.nav-prev').click(showPrevItem);
						$('div.nav-next').click(showNextItem);
						enableFrameClicking();
					});
				} else if(slide_method=='pointer') {
					//Stop pointer if it's currently in motion
					j_pointer.stop();
					//Get position of target frame
					var pos = getPos(j_frames[i]);
					//Slide the pointer over the target frame
					j_pointer.animate({
						'left':(pos.left-2+'px')
					},opts.transition_speed,opts.easing,function(){	
						if(!opts.fade_panels) {
							j_panels.hide().eq(i%item_count).show();
						}	
						$('div.nav-prev').click(showPrevItem);
						$('div.nav-next').click(showNextItem);
						enableFrameClicking();
					});
				}
			
				if($('a',j_frames[i])[0]) {
					j_pointer.unbind('click').click(function(){
						var a = $('a',j_frames[i]).eq(0);
						if(a.attr('target')=='_blank') {window.open(a.attr('href'));}
						else {location.href = a.attr('href');}
					});
				}
			}
		};
		
		
		
		function showNextItem() {
			$(document).stopTime("transition");
			if(++iterator==j_frames.length) {iterator=0;}
			showItem(iterator);
			$(document).everyTime(opts.transition_interval,"transition",function(){
				showNextItem();
			});
		};
		
		
		
		function showPrevItem() {
			$(document).stopTime("transition");
			if(--iterator<0) {iterator = item_count-1;}
			//alert(iterator);
			showItem(iterator);
			$(document).everyTime(opts.transition_interval,"transition",function(){
				showNextItem();
			});
		};
		
		
		
		function getPos(el) {
			var left = 0, top = 0;
			var el_id = el.id;
			if(el.offsetParent) {
				do {
					left += el.offsetLeft;
					top += el.offsetTop;
				} while(el = el.offsetParent);
			}
			//If we want the position of the gallery itself, return it
			if(el_id == id) {return {'left':left,'top':top};}
			//Otherwise, get position of element relative to gallery
			else {
				var gPos = getPos(j_gallery[0]);
				var gLeft = gPos.left;
				var gTop = gPos.top;
				
				return {'left':left-gLeft,'top':top-gTop};
			}
		};
		
		
		
		function enableFrameClicking() {
			j_frames.each(function(i){
				//If there isn't a link in this frame, set up frame to slide on click
				//Frames with links will handle themselves
				if($('a',this).length==0) {
					$(this).click(function(){
						$(document).stopTime("transition");
						showItem(i);
						iterator = i;
						$(document).everyTime(opts.transition_interval,"transition",function(){
							showNextItem();
						});
					});
				}
			});
		};
		
		
		
		
		function buildPanels() {
			//If there are panel captions, add overlay divs
			if($('.panel-overlay').length>0) {j_panels.append('<div class="overlay"></div>');}
			
			if(!has_filmstrip) {
				
				if(opts.filmstrip_position != 'none'){
				//Add navigation buttons != none
				$('<div />').addClass('nav-next').appendTo(j_gallery).css({
					'position':'absolute',
					'cursor':'pointer',
					'top':(opts.panel_height/2)+'px',
					'right':'-20px',
					//'border-color': ' transparent transparent transparent' + opts.filmstrip_arrow_color,
					'border-top-color':'transparent',
					'border-right-color':'transparent',
					'border-bottom-color':'transparent',
					'border-left-color':opts.filmstrip_arrow_color,
					'border-style': 'solid',
					'border-width': pointer_arrow_width+'px',
					'height': '0px',
					'zIndex': '250',
					//'display':'none',
					'height': '0',
					'width': '0'
				}).click(showNextItem);
				$('<div />').addClass('nav-prev').appendTo(j_gallery).css({
					'position':'absolute',
					'cursor':'pointer',
					'top':(opts.panel_height/2)+'px',
					'left':'-20px',
					//'border-color': 'transparent' + opts.filmstrip_arrow_color + ' transparent transparent',
					'border-top-color':'transparent',
					'border-right-color':opts.filmstrip_arrow_color,
					'border-bottom-color':'transparent',
					'border-left-color':'transparent',
					'border-style': 'solid',
					'border-width': pointer_arrow_width+'px',
					'height': '0px',
					'zIndex': '250',
					//'display':'none',
					'height': '0',
					'width': '0'
				}).click(showPrevItem);
				} else {
				//Add navigation buttons == none
				$('<div />').addClass('nav-next').appendTo(j_gallery).css({
					'position':'absolute',
					'cursor':'pointer',
					'top':(opts.panel_height/2)+'px',
					'right':'-5px',
					'border-top-color':'transparent',
					'border-right-color':'transparent',
					'border-bottom-color':'transparent',
					'border-left-color':opts.filmstrip_arrow_color,
					'border-style': 'solid',
					'border-width': pointer_arrow_width+'px',
					'height': '0px',
					'zIndex': '250',
					'height': '0',
					'width': '0'
				}).click(showNextItem);
				$('<div />').addClass('nav-prev').appendTo(j_gallery).css({
					'position':'absolute',
					'cursor':'pointer',
					'top':(opts.panel_height/2)+'px',
					'left':'-5px',
					'border-top-color':'transparent',
					'border-right-color':opts.filmstrip_arrow_color,
					'border-bottom-color':'transparent',
					'border-left-color':'transparent',
					'border-style': 'solid',
					'border-width': pointer_arrow_width+'px',
					'height': '0px',
					'zIndex': '250',
					'height': '0',
					'width': '0'
				}).click(showPrevItem);
				}
			}
			
			
			
			if(opts.filmstrip_style == 'thumbnails'){
				j_panels.css({
					'width':(opts.panel_width-parseInt(j_panels.css('paddingLeft').split('px')[0],10)-parseInt(j_panels.css('paddingRight').split('px')[0],10))+'px',
					'height':(opts.panel_height-parseInt(j_panels.css('paddingTop').split('px')[0],10)-parseInt(j_panels.css('paddingBottom').split('px')[0],10))+'px',
					'position':'absolute',
					'top':(opts.filmstrip_position=='top'?(opts.frame_height+frame_margin_top+(opts.show_captions?frame_caption_size:frame_margin_top))+'px':'0px'),
					'left':'0px',
					'overflow':'hidden',
					'background':'white',
					'margin':'0',
					'display':'none'
				});
			} else{
				j_panels.css({
					'width':(opts.panel_width-parseInt(j_panels.css('paddingLeft').split('px')[0],10)-parseInt(j_panels.css('paddingRight').split('px')[0],10))+'px',
					'height':(opts.panel_height-parseInt(j_panels.css('paddingTop').split('px')[0],10)-parseInt(j_panels.css('paddingBottom').split('px')[0],10))+'px',
					'position':'absolute',
					'top':(opts.filmstrip_position=='top'?(opts.frame_height+frame_margin_top+frame_margin_top)+'px':'0px'),
					'left':'0px',
					'overflow':'hidden',
					'background':'white',
					'margin':'0',
					'display':'none'
				});
			}
			
			
			
			$('.panel-overlay a',j_panels).css({
				'color':opts.overlay_text_color
			}).addClass('rotationLinks');
			
			$('.panel-overlay h2',j_panels).addClass('rotationHeader');
			
			
			if(opts.overlay_position == "left"){
			
					$('.panel-overlay',j_panels).css({
						'position':'absolute',
						'zIndex':'26',
						'width':(opts.overlay_width-20)+'px',
						'height':opts.panel_height+'px',
						'left':'0',
						'top':'0',
						'padding':'0 10px',
						'background-color':'transparent',
						'margin':'0',
						'color':opts.overlay_text_color,
						'fontSize':opts.overlay_font_size
					});
					
					$('.overlay',j_panels).css({
						'position':'absolute',
						'zIndex':'25',
						'width':opts.overlay_width+'px',
						'height':opts.panel_height+'px',
						'left':'0',
						'top':'0',
						'background':opts.overlay_color,
						'opacity':opts.overlay_opacity
					});
					$('.panel iframe',j_panels).css({
						'width':(opts.panel_width-opts.overlay_width)+'px',
						'height':opts.panel_height+'px',
						'margin':'0',
						'border':'0'
					});
			
			}
			if(opts.overlay_position == "right"){
			
					$('.panel-overlay',j_panels).css({
						'position':'absolute',
						'zIndex':'26',
						'width':(opts.overlay_width-20)+'px',
						'height':opts.panel_height+'px',
						'left':(opts.panel_width-opts.overlay_width)+'px',
						'top':'0',
						'padding':'0 10px',
						'background-color':'transparent',
						'margin':'0',
						'color':opts.overlay_text_color,
						'fontSize':opts.overlay_font_size
					});
					
					$('.overlay',j_panels).css({
						'position':'absolute',
						'zIndex':'25',
						'width':opts.overlay_width+'px',
						'height':opts.panel_height+'px',
						'left':(opts.panel_width-opts.overlay_width)+'px',
						'top':'0',
						'background':opts.overlay_color,
						'opacity':opts.overlay_opacity
					});
					$('.panel iframe',j_panels).css({
						'width':(opts.panel_width-opts.overlay_width)+'px',
						'height':opts.panel_height+'px',
						'margin':'0',
						'border':'0'
					});
			
			}
			if(opts.overlay_position == "top"){
			
					$('.panel-overlay',j_panels).css({
						'position':'absolute',
						'zIndex':'26',
						'width':(opts.panel_width-20)+'px',
						'height':opts.overlay_height+'px',
						'top':'0',
						'left':'0',
						'padding':'0 10px',
						'background-color':'transparent',
						'margin':'0',
						'color':opts.overlay_text_color,
						'fontSize':opts.overlay_font_size
					});
					
					$('.overlay',j_panels).css({
						'position':'absolute',
						'zIndex':'25',
						'width':opts.panel_width+'px',
						'height':opts.overlay_height+'px',
						'top':'0',
						'left':'0',
						'background':opts.overlay_color,
						'margin':'0',
						'opacity':opts.overlay_opacity
					});
					$('.panel iframe',j_panels).css({
						'width':opts.panel_width+'px',
						'height':(opts.panel_height-opts.overlay_height)+'px',
						'margin':'0',
						'border':'0'
					});
			
			}
			
			if(opts.overlay_position == "bottom"){
			
					$('.panel-overlay',j_panels).css({
						'position':'absolute',
						'zIndex':'26',
						'width':(opts.panel_width-20)+'px',
						'height':opts.overlay_height+'px',
						'top':(opts.panel_height-opts.overlay_height)+'px',
						'left':'0',
						'padding':'0 10px',
						'background-color':'transparent',
						'color':opts.overlay_text_color,
						'fontSize':opts.overlay_font_size
					});
					
					$('.overlay',j_panels).css({
						'position':'absolute',
						'zIndex':'25',
						'width':opts.panel_width+'px',
						'height':opts.overlay_height+'px',
						'top':(opts.panel_height-opts.overlay_height)+'px',
						'left':'0',
						'background':opts.overlay_color,
						'opacity':opts.overlay_opacity
					});
					$('.panel iframe',j_panels).css({
						'width':opts.panel_width+'px',
						'height':(opts.panel_height-opts.overlay_height)+'px',
						'margin':'0',
						'border':'0'
					});
			
			}
			
			
		};
		
		function buildFilmstrip() {
			//Add wrapper to filmstrip to hide extra frames
			j_filmstrip.wrap('<div class="strip_wrapper"></div>');
			if(slide_method=='strip') {
				j_frames.clone().appendTo(j_filmstrip);
				j_frames.clone().appendTo(j_filmstrip);
				j_frames = $('li',j_filmstrip);
			}
			
			/*If captions are enabled, add caption divs and fill with the image titles
			if(opts.show_captions) {
				j_frames.append('<div class="caption"></div>').each(function(i){
					$(this).find('.caption').html($(this).find('img').attr('title'));			   
				});
			}*/
			
			
			if(opts.filmstrip_style == 'thumbnails'){
				j_filmstrip.css({
					'listStyle':'none',
					'margin':'0',
					'padding':'0',
					'width':strip_width+'px',
					'position':'absolute',
					'zIndex':'90',
					'top':'0',
					'left':'0',
					'height':(opts.frame_height+10)+'px',
					'background':opts.background_color
				});
			} else {
				j_filmstrip.css({
					'listStyle':'none',
					'margin':'0',
					'padding':'0',
					'width':strip_width+'px',
					'position':'absolute',
					'zIndex':'90',
					'top':'0',
					'left':'0',
					'height':(opts.frame_height+frame_margin_top)+'px',
					'background':opts.background_color
				});
			}
			
			//li's styles
			j_frames.css({
				'float':'left',
				'position':'relative',
				'height':opts.frame_height+'px',
				'width':opts.frame_width+'px',
				'zIndex':'151',
				'marginTop':frame_margin_top+'px',
				'marginBottom':frame_margin_top+'px',
				'marginRight':frame_margin+'px',
				'marginLeft':'0px',
				'padding':'0',
				'cursor':'pointer',
				'list-style-image':'none',
				'list-style-type': 'none'
			});
			$('div',j_frames).css({
				'border':'none'
			});
			
			if(opts.filmstrip_style == 'popupthumbnails'){
				$('.strip_wrapper',j_gallery).css({
					'position':'absolute',
					'top':(opts.filmstrip_position=='top'?'0px':opts.panel_height+'px'),
					'left':((gallery_width-wrapper_width)/2)+'px',
					'width':wrapper_width+'px',
					'height':(opts.frame_height+frame_margin_top)+'px'
					//'overflow':'hidden'
					//remove this to show popups
				});
				
				
				$('.imageWrapper').css({
					'width':popup_image_frame_width+'px',
					'height':popup_image_frame_height+'px',
					'overflow':'hidden',
					'margin':'0 auto',
					'paddingTop':frame_margin_top+'px'
				});
				$('.caption').css({
					'top':popup_image_frame_height+'px',
					'width':popup_image_frame_width+'px',
					'height':frame_caption_size+'px',
					'color':opts.caption_text_color,
					'paddingTop':frame_margin_top+'px',
					'paddingLeft':frame_margin_top+'px'
				});
				
			} else { 
				$('.strip_wrapper',j_gallery).css({
					'position':'absolute',
					'top':(opts.filmstrip_position=='top'?'0px':opts.panel_height+'px'),
					'left':((gallery_width-wrapper_width)/2)+'px',
					'width':wrapper_width+'px',
					'height':(opts.frame_height+frame_margin_top+(opts.show_captions?frame_caption_size:frame_margin_top))+'px',
					'overflow':'hidden'
				});
				$('.caption').css({
					'top':opts.frame_height+'px',
					'width':opts.frame_width+'px',
					'color':opts.caption_text_color
				});
				$('.imageWrapper').css({
					'width':opts.frame_width+'px',
					'height':opts.frame_height+'px',
					'overflow':'hidden'
				});
			}
			
			
			$('.numberWrapper').css({
				'width':opts.frame_width+'px',
				'color':opts.caption_text_color,
				'lineHeight':'20px',
				'backgroundColor':opts.frame_color
			});
			
			
			if(opts.filmstrip_position == 'top'){
				$('.popupWrapper').css({
					'position':'absolute',
					'top':(opts.frame_height+12)+'px',
					'zIndex':'150',
					'backgroundColor':opts.frame_color,
					'width':(popup_image_frame_width+10)+'px',
					'height':(popup_image_frame_height+frame_margin_top+(opts.show_captions?frame_caption_size:frame_margin_top))+'px',
					'textAlign':'center',
					'margin':'0 auto',
					'left':((opts.frame_width/2))-((popup_image_frame_height/2)+6)+'px'
					
				});
				$('.rotation-arrow').css({
					'border-top-color':'transparent',
					'border-right-color':'transparent',
					'border-bottom-color':opts.frame_color,
					'border-left-color':'transparent',
					'border-style': 'solid',
					'border-width': pointer_arrow_width+'px',
					'position':'absolute',
					'bottom':(popup_image_frame_height+frame_margin_top+(opts.show_captions?frame_caption_size:frame_margin_top))+'px',
					'left':((popup_image_frame_height/2)-(pointer_arrow_width/2))+'px',
					'height': '0',
					'width': '0',
					'zIndex':'150'
				});
			} 
			if(opts.filmstrip_position == 'bottom'){
				$('.popupWrapper').css({
					'position':'absolute',
					'bottom':(opts.frame_height+12)+'px',
					'zIndex':'150',
					'backgroundColor':opts.frame_color,
					'width':(popup_image_frame_width+10)+'px',
					'height':(popup_image_frame_height+frame_margin_top+(opts.show_captions?frame_caption_size:frame_margin_top))+'px',
					'textAlign':'center',
					'margin':'0 auto',
					'left':((opts.frame_width/2))-((popup_image_frame_height/2)+(pointer_arrow_width/2))+'px'
				});
				$('.rotation-arrow').css({
					'border-top-color':opts.frame_color,
					'border-right-color':'transparent',
					'border-bottom-color':'transparent',
					'border-left-color':'transparent',
					'border-style': 'solid',
					'border-width': pointer_arrow_width+'px',
					'position':'absolute',
					'top':(popup_image_frame_height+frame_margin_top+(opts.show_captions?frame_caption_size:frame_margin_top))+'px',
					'left':((popup_image_frame_height/2)-(pointer_arrow_width/2))+'px',
					'height': '0',
					'width': '0',
					'zIndex':'150'
				});
			}
			
						
			var pointer = $('<div></div>');
			pointer.attr('id','pointer').appendTo(j_gallery).css({
				 'position':'absolute',
				 'zIndex':'100',
				 'cursor':'pointer',
				 'top':getPos(j_frames[0]).top-(pointer_width/2)+'px',
				 'left':getPos(j_frames[0]).left-(pointer_arrow_width/2)+(pointer_width*2)+'px',
				 'height':(opts.frame_height-pointer_width)+'px',
				 'width':(opts.frame_width-pointer_width)+'px',
				 'border':pointer_width+'px solid '+opts.filmstrip_border_color
			});
			
			j_pointer = $('#pointer',j_gallery);
			
			if(has_panels) {
				var pointerArrow = $('<div />');

				
				
				if(opts.filmstrip_position == 'bottom'){
				pointerArrow.appendTo($('#pointer')).css({
					'position':'absolute',
					'zIndex':'101',
					'bottom':(opts.filmstrip_position=='top'?'-'+(10+pointer_width)+'px':opts.frame_height+'px'),
					'left':((opts.frame_width/2)-10)+'px',
					'border-top-color':'transparent',
					'border-right-color':'transparent',
					'border-bottom-color':opts.filmstrip_arrow_color,
					'border-left-color':'transparent',
					'border-style': 'solid',
					'border-width': pointer_arrow_width+'px',
					'height': '0',
					'width': '0'
				});
				}
				if(opts.filmstrip_position == 'top'){
				pointerArrow.appendTo($('#pointer')).css({
					'position':'absolute',
					'zIndex':'101',
					'top':(opts.filmstrip_position=='bottom'?'-'+(10+pointer_width)+'px':opts.frame_height+'px'),
					'left':((opts.frame_width/2)-10)+'px',
					'border-top-color':opts.filmstrip_arrow_color,
					'border-right-color':'transparent',
					'border-bottom-color':'transparent',
					'border-left-color':'transparent',
					'border-style': 'solid',
					'border-width': pointer_arrow_width+'px',
					'height': '0',
					'width': '0'
				});
				}
			}
			
			//If the filmstrip is animating, move the strip to the middle third
			if(slide_method=='strip') {
				j_filmstrip.css('left','-'+((opts.frame_width+frame_margin)*item_count)+'px');
				iterator = item_count;
			}
			//If there's a link under the pointer, enable clicking on the pointer
			if($('a',j_frames[iterator])[0]) {
				j_pointer.click(function(){
					var a = $('a',j_frames[iterator]).eq(0);
					if(a.attr('target')=='_blank') {window.open(a.attr('href'));}
					else {location.href = a.attr('href');}
				});
			}
			
			//Add navigation buttons
			$('<div />').addClass('nav-next').appendTo(j_gallery).css({
				'position':'absolute',
				'cursor':'pointer',
				'top':(opts.filmstrip_position=='top'?0:opts.panel_height)+frame_margin_top+((opts.frame_height-22)/2)+'px',
				//'right':(gallery_width/2)-(wrapper_width/2)-10-22+'px',  strip_width
				'right':(gallery_width/2)-(wrapper_width/2)-(pointer_arrow_width*2)-(frame_margin_top*2)+'px',
				'border-top-color':'transparent',
				'border-right-color':'transparent',
				'border-bottom-color':'transparent',
				'border-left-color':opts.filmstrip_arrow_color,
				'border-style': 'solid',
				//'border-width': pointer_arrow_width+'px',
				'border-width': (opts.filmstrip_style == 'thumbnails'?pointer_arrow_width+'px':((pointer_arrow_width-2)+'px')),
				'height': '0',
				'wdith': '0'
			}).click(showNextItem);
			
			$('<div />').addClass('nav-prev').appendTo(j_gallery).css({
				'position':'absolute',
				'cursor':'pointer',
				'top':(opts.filmstrip_position=='top'?0:opts.panel_height)+frame_margin_top+((opts.frame_height-22)/2)+'px',
				//'left':(gallery_width/2)-(wrapper_width/2)-10-22+'px',
				'left':(gallery_width/2)-(wrapper_width/2)-(pointer_arrow_width*2)-(frame_margin_top*2)+'px',
				'border-top-color':'transparent',
				'border-right-color':opts.filmstrip_arrow_color,
				'border-bottom-color':'transparent',
				'border-left-color':'transparent',
				'border-style': 'solid',
				//'border-width': pointer_arrow_width+'px',
				'border-width': (opts.filmstrip_style == 'thumbnails'?pointer_arrow_width+'px':((pointer_arrow_width-2)+'px')),
				'height': '0',
				'wdith': '0'
			}).click(showPrevItem);
			
			
		};
		
		//Check mouse to see if it is within the borders of the panel
		//More reliable than 'mouseover' event when elements overlay the panel
		function mouseIsOverPanels(x,y) {		
			var pos = getPos(j_gallery[0]);
			var top = pos.top;
			var left = pos.left;
			return x > left && x < left+opts.panel_width && y > top && y < top+opts.panel_height;				
		};
		
/************************************************/
/*	Main Plugin Code							*/
/************************************************/
		return this.each(function() {
			j_gallery = $(this);
			//Determine path between current page and filmstrip images
			//Scan script tags and look for path to GalleryView plugin
			
			
			//Hide gallery to prevent Flash of Unstyled Content (FoUC) in IE
			//j_gallery.css('visibility','hidden');
			
			//Assign elements to variables for reuse
			j_filmstrip = $('.filmstrip',j_gallery);
			j_frames = $('li',j_filmstrip);
			j_panels = $('.panel',j_gallery);
			
			id = j_gallery.attr('id');
			
			has_panels = j_panels.length > 0;
			has_filmstrip = j_frames.length > 0;
			
			if(!has_panels) opts.panel_height = 0;
			
			//Number of frames in filmstrip
			item_count = has_panels?j_panels.length:j_frames.length;
			
			//Number of frames that can display within the screen's width
			//64 = width of block for navigation button * 2
			//5 = minimum frame margin
			strip_size = has_panels?Math.floor((opts.panel_width-64)/(opts.frame_width+frame_margin)):Math.min(item_count,opts.filmstrip_size); 
			
			
			/************************************************/
			/*	Determine transition method for filmstrip	*/
			/************************************************/
					//If more items than strip size, slide filmstrip
					//Otherwise, slide pointer
					if(strip_size >= item_count) {
						slide_method = 'pointer';
						strip_size = item_count;
					}
					else {slide_method = 'strip';}
			
			/************************************************/
			/*	Determine dimensions of various elements	*/
			/************************************************/
					
					//Width of gallery block
					gallery_width = has_panels?opts.panel_width:(strip_size*(opts.frame_width+frame_margin))-frame_margin+64;
					
					//Height of gallery block = screen + filmstrip + captions (optional)
					//Make 2
					if(opts.filmstrip_style == 'popupthumbnails'){
						gallery_height = (has_panels?opts.panel_height:0)+(has_filmstrip?opts.frame_height+frame_margin_top+(frame_margin_top):0);
					} else {
						gallery_height = (has_panels?opts.panel_height:0)+(has_filmstrip?opts.frame_height+frame_margin_top+(opts.show_captions?frame_caption_size:frame_margin_top):0);
					}
					
					//Width of filmstrip
					if(slide_method == 'pointer') {strip_width = (opts.frame_width*item_count)+(frame_margin*(item_count));}
					else {strip_width = (opts.frame_width*item_count*3)+(frame_margin*(item_count*3));}
					
					//Width of filmstrip wrapper (to hide overflow)
					wrapper_width = ((strip_size*opts.frame_width)+((strip_size-1)*frame_margin));
			
			/************************************************/
			/*	Apply CSS Styles							*/
			/************************************************/
					j_gallery.css({
						'position':'relative',
						'margin':'0 atuo',
						'background':opts.background_color,
						'width':gallery_width+'px',
						'height':gallery_height+'px',
						'overflow':'hidden'
					});
			
			/************************************************/
			/*	Build filmstrip and/or panels				*/
			/************************************************/
					if(has_filmstrip) {
						buildFilmstrip();
					}
					if(has_panels) {
						buildPanels();
					}

			
			/************************************************/
			/*	Add events to various elements				*/
			/************************************************/
					if(has_filmstrip) enableFrameClicking();
					
						
						
						$(this).mousemove(function(e){
							
							if(mouseIsOverPanels(e.pageX,e.pageY)) {
								if(opts.pause_on_hover) {
									$(document).oneTime(500,"animation_pause",function(){
										$(document).stopTime("transition");
										paused=true;
									});
								}
								if(has_panels && !has_filmstrip) {
									$('.nav-overlay').fadeIn('fast');
									$('.nav-next').fadeIn('fast');
									$('.nav-prev').fadeIn('fast');
								}
							} else {
								if(opts.pause_on_hover) {
									$(document).stopTime("animation_pause");
									if(paused) {
										$(document).everyTime(opts.transition_interval,"transition",function(){
											showNextItem();
										});
										paused = false;
									}
								}
								if(has_panels && !has_filmstrip) {
									$('.nav-overlay').fadeOut('fast');
									$('.nav-next').fadeOut('fast');
									$('.nav-prev').fadeOut('fast');
								}
							}
						});
			
			
			/************************************************/
			/*	Initiate Automated Animation				*/
			/************************************************/
					//Show the first panel
					j_panels.eq(0).show();

					//If we have more than one item, begin automated transitions
					if(item_count > 1) {
						$(document).everyTime(opts.transition_interval,"transition",function(){
							showNextItem();
						});
					}
					
					//Make gallery visible now that work is complete
					j_gallery.css('visibility','visible');
					
					//Joe Added to turn on any other
					$(".galleryview").css( "visibility", "visible" );
					
					/*
					alert(typeof(opts.panel_width));
					alert(typeof(opts.panel_height));
					alert(typeof(opts.transition_interval));
					alert(typeof(opts.background_color));
					alert(typeof(opts.border));
					alert(typeof(opts.overlay_width));
					alert(typeof(opts.overlay_height));
					alert(typeof(opts.overlay_position));
					alert(typeof(opts.overlay_text_color));
					alert(typeof(opts.overlay_color));
					alert(opts.overlay_opacity);
					alert(typeof(opts.frame_width));
					alert(typeof(opts.frame_height));
					alert(typeof(opts.filmstrip_border_color));
					alert(typeof(opts.filmstrip_arrow_color));
					alert(typeof(opts.filmstrip_position));	
					alert(typeof(opts.show_captions));
					alert(typeof(caption_text_color));
					*/
	
					
		});
	};
	
	$.fn.galleryView.defaults = {
		panel_width: 700,
		panel_height: 300,
		background_color: '#000000',
		easing: 'swing',
		transition_interval: 12000,
		transition_speed: 400,
		frame_width: 100,
		frame_height: 100,
		frame_color: '#425F78',
		overlay_position: 'bottom',
		overlay_height: 100,
		overlay_width: 700,
		overlay_font_size: '1em',
		overlay_opacity: 0.8,
		overlay_color: '#425F78',
		overlay_text_color: '#ffffff',
		filmstrip_border_color: '#ffffff',
		filmstrip_arrow_color: '#ffffff',
		filmstrip_size: 3,
		filmstrip_position: 'bottom',
		filmstrip_style: 'thumbnails',
		show_captions: false,
		caption_text_color: '#ffffff',
		caption_height: 20,
		fade_panels: true,
		pause_on_hover: true
	};
	
	
})(jQuery);