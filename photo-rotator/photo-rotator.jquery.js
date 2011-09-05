/*
* Photo Rotator Plugin for jQuery
* By: Herman Lee, http://www.scratchinghead.com
* Version: 1.0.0
* Updated: July 27th, 2011
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

(function($) {

	$.fn.photoRotator = function(option) {
		option = $.extend( {}, $.fn.photoRotator.option, option );

		if (!option.images || option.images.length === 0) {
			throw new Error("ImageNotExistException");
		}
		
		var pageSize = __getPageSize();
		
		$('<div id="ph-container"></div>').css({
			'width':'960px',
			'height':'340px',
			'position':'relative',
		}).appendTo($(this));

		// preload
		$('<div id="ph-loading_box"></div>').css({
			'width':'100%',
			'height':'100%',
			'display':'block',
			'position':'absolute',
		}).append($('<img src="'+option.preloadImage+'"></img>').css({"display":"block","margin":"150px auto 0"})).appendTo($('#ph-container'));
		
		// lightbox
		$('<div id="ph-lightbox-overlay"></div>').css({
			'width': pageSize.pageWidth,
			'height': pageSize.pageHeight, 
			'display':'none',
			'position':'absolute',
			'opacity':'0.75',
			'background-color':'#FFF',
			'z-index':'4900',
			'top':'0',
			'left':'0'
		}).appendTo($('body'));

		$('<div id="ph-lightbox"></div>').css({
			'width': pageSize.pageWidth,
			'height': pageSize.pageHeight,
			'display':'none',
			'position':'absolute',
			'text-align':'center',
			'z-index':'5000',
			'top':'0',
			'left':'0'
		}).appendTo($('body'));
		$('#ph-lightbox').click(function(){
			$('[id|=ph-lightbox]').fadeOut(option.fadeSpeed);
		});

		
		return this.each(function() {
			var container = $(this).children('#ph-container'),
			    caption_class = option.captionContainer,
			    loaded = 0;

			$('<div id="image_box"></div>').css({
				'width':'100%',
				'height':'100%',
				'position':'absolute',
				'display':'none'
			}).appendTo(container);
			if (!option.captionContainer && option.captionSwitch) {
				caption_class = 'pr_caption_box';
				container.append('<div class="'+caption_class+'"></div>');
			}

			$.each(option.images, function(i,imgobj){
				$('<img />')
					.css((i < 7) ? image_box_style['pos'+(i+1)] : image_box_style.hide)
					.attr('src',imgobj.url)
					.attr('id','img'+(i+1))
					.attr('action',imgobj.action || '')
					.attr('href',imgobj.href || '')
					.addClass((i < 7) ? 'pos'+(i+1) : 'hide')
					.load(function(){
						loaded++;
						if (loaded === option.images.length) {
							$(container).children('#ph-loading_box').fadeOut(option.fadeSpeed);
							$(container).children('#image_box').fadeIn(option.fadeSpeed);							
						};
					})
					.appendTo($(container).children('#image_box'));
				if (option.captionSwitch) {
					$('<span></span>').attr('id','cap'+(i+1)).html(imgobj.caption).appendTo($('.'+caption_class));
				}
			});
		
			// apply css
			var image_objs = container.children('#image_box').find('img').css({
				'border':'5px solid #FFF',
				'position':'absolute',
				'cursor':'pointer',
				'-moz-box-shadow':'5px 5px 10px #333',
				'-webkit-box-shadow':'5px 5px 10px #333',
				'box-shadow':'5px 5px 10px #333',
				'-ms-filter':'"progid:DXImageTransform.Microsoft.Shadow(Strength=10, Direction=135, Color=\'#333333\')"', /* For IE 8 */
				'filter':'progid:DXImageTransform.Microsoft.Shadow(Strength=10, Direction=135, Color="#333333")' /* For IE 5.5 - 7 */
			});
			if (option.captionSwitch) {
				$('.'+caption_class).css('position','relative');
				$('.'+caption_class+' span').css({
					'display':'none',
					'position':'absolute'
				});
				if (!option.captionContainer) {
					$('.'+caption_class).css({width:'400px',height:'40px',margin:'0 auto'});
					$('.'+caption_class+' span').css({
						'font':'30px/36px helvetica, serif',
						'font-weight':'bold',
						'color':'#000',
						'text-align':'center',
						'width':'400px'
					});
				}
				$('.'+caption_class).find('#cap4').show();
			}

			var rotate_img = function(dir) {	
				$(image_objs).each(function() {
					var that = this;
					var curr_class = $(this).attr('class');
					var next_class = (dir > 0) ? $(this).next().attr('class') : $(this).prev().attr('class');
					if (!next_class) {
						next_class = (dir > 0) ? container.find('#image_box img:first-child').attr('class') : container.find('#image_box img:last-child').attr('class');
					}

					if (curr_class === 'hide' && next_class === 'hide') {
						return;
					}
					if (curr_class === 'pos4' && option.captionSwitch) {
						$('#'+$(this).attr('id').replace(/img/,'cap')).fadeOut(option.fadeSpeed);
					}
					// timeout
					var change_class_timeout = window.setTimeout(function(){$(that).removeClass(curr_class).addClass(next_class)}, 200);
					$(this).animate(image_box_style[next_class],option.rotateSpeed);
					if (next_class === 'pos4' && option.captionSwitch) {
						$('#'+$(this).attr('id').replace(/img/,'cap')).fadeIn(option.fadeSpeed);
					}
				});
			};
			
			// bind the click event
			$(image_objs).each(function() {
				$(this).click(function() {
					var curr_pos = $(this).attr('class');
					if (curr_pos.replace(/pos/,'') > 4) {
						rotate_img(1);
					} else if (curr_pos.replace(/pos/,'') < 4) {
						rotate_img(-1);
					} else {
						if ($(this).attr('action') === 'link') {
							if (!$(this).attr('href')) {
								throw new Error("MissingUrlForLinkException");
							}
							window.location = $(this).attr('href');
						} else if ($(this).attr('action') === 'fullsize') {
							$('#ph-lightbox').html('').append($(this).clone().css({'position':'static','height':'auto','margin':'20px'}));
							$('[id|=ph-lightbox]').fadeIn(option.fadeSpeed);
							var newPageSize = __getPageSize();
							if (newPageSize.pageWidth > (pageSize.pageWidth - 80) || newPageSize.pageHeight > (pageSize.pageHeight - 60)) {
								$('#ph-lightbox img').css({'height':(pageSize.pageHeight - 60)+'px'});
							}
						}
					}
				});
			});
			// bind the keydown event
			$(document).keydown(function(event) {
				if ( event.keyCode === 39 ) {
					rotate_img(1);
					event.preventDefault();
				} else if (event.keyCode === 37) {
					rotate_img(-1);
					event.preventDefault();				
				}
			});
		});			
	};
	
	// default options
	$.fn.photoRotator.option = {
		preloadImage: '/images/loading.gif', // String, name and location of loading image for preloader. Default is "/img/loading.gif"
		fadeSpeed: 900, // Number, set the speed of the fading animation in milliseconds
		rotateSpeed: 600, // Number, set the speed of the rotating animation in milliseconds
		captionSwitch: true, // Boolean, set to turn on and off the caption. Default is true
		captionContainer: '', // String, class name for caption container. If not set, it create one for you
	};

	/**
	/ THIRD-PARTY FUNCTION
	* getPageSize() by quirksmode.com
	*
	* @return Array Return an array with page width, height and window width, height
	*/
	var __getPageSize = function() {
		var xScroll, yScroll;
		if (window.innerHeight && window.scrollMaxY) {	
			xScroll = window.innerWidth + window.scrollMaxX;
			yScroll = window.innerHeight + window.scrollMaxY;
		} else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac
			xScroll = document.body.scrollWidth;
			yScroll = document.body.scrollHeight;
		} else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
			xScroll = document.body.offsetWidth;
			yScroll = document.body.offsetHeight;
		}
		var windowWidth, windowHeight;
		if (self.innerHeight) {	// all except Explorer
			if(document.documentElement.clientWidth){
				windowWidth = document.documentElement.clientWidth; 
			} else {
				windowWidth = self.innerWidth;
			}
			windowHeight = self.innerHeight;
		} else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
			windowWidth = document.documentElement.clientWidth;
			windowHeight = document.documentElement.clientHeight;
		} else if (document.body) { // other Explorers
			windowWidth = document.body.clientWidth;
			windowHeight = document.body.clientHeight;
		}	
		// for small pages with total height less then height of the viewport
		if(yScroll < windowHeight){
			pageHeight = windowHeight;
		} else { 
			pageHeight = yScroll;
		}
		// for small pages with total width less then width of the viewport
		if(xScroll < windowWidth){	
			pageWidth = xScroll;		
		} else {
			pageWidth = windowWidth;
		}
		return {'pageWidth': pageWidth, 'pageHeight': pageHeight, 'windowWidth': windowWidth, 'windowHeight': windowHeight};
	};
	
	
	// css stuff...
	var image_box_style = {
		pos1: {
			'left': '205px',
			'top': '130px',
			'z-index': '1',
			'height': '70px',
			'width': 'auto',
			'opacity': '0'
		},
		pos2: {
			'left': '50px',
			'top': '107px',
			'z-index': '10',
			'height': '115px',
			'width': 'auto',
			'opacity': '0.35'
		},
		pos3: {
			'left': '100px',
			'top': '45px',
			'z-index': '100',
			'height': '250px',
			'width': 'auto',
			'opacity': '0.75'
		},
		pos4: { /* main position */
			'left': '275px',
			'top': '20px',
			'height': '300px',
			'width': 'auto',
			'z-index': '200',
			'opacity': '10'
		},
		pos5: {
			'left': '516px',
			'top': '45px',
			'z-index': '100',
			'height': '250px',
			'width': 'auto',
			'opacity': '0.75'
		},
		pos6: {
			'left': '746px',
			'top': '107px',
			'z-index': '10',
			'height': '115px',
			'width': 'auto',
			'opacity': '0.35'
		},
		pos7: {
			'left': '650px',
			'top': '130px',
			'z-index': '1',
			'height': '70px',
			'width': 'auto',
			'opacity': '0'
		},
		hide: {
			'left': '400px',
			'top': '130px',
			'z-index': '0',
			'height': '70px',
			'width': 'auto',
			'opacity': '0'
		}
	};

})(jQuery);