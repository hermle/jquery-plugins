jQuery(function($){

	$('#photo-rotator').photoRotator({
		captionSwitch: true,
		captionContainer: 'photo-rotator-caption',
		images: [
			{url:"/images/photo-rotator-jquery-demo/oldhouse.jpg",caption:"<h3>Old Style Living Room</h3><p>Eighteen century country style decoration. Warm color tone with simple lighting.</p><em>Stock photo by: Salvatore Vuono / FreeDigitalPhotos.net</em>"},
			{url:"/images/photo-rotator-jquery-demo/contempory.jpg",caption:"<h3>Contemporay Living Room</h3><p>Simple is better. Contempory style not necessary equal cold.</p><em>Stock photo by: photostock / FreeDigitalPhotos.net</em>"},
			{url:"/images/photo-rotator-jquery-demo/kitchen.jpg",caption:"<h3>Modern Kitchen</h3><p>Color, shape and pattern all matched perfectly. Well balance between usable and attractive.</p><em>Stock photo by: photostock / FreeDigitalPhotos.net</em>"},
			{url:"/images/photo-rotator-jquery-demo/bedroom.jpg",caption:"<h3>Hardwood Floor Bedroom</h3><p>Comfort and relaxing. Clean and simple. That's what a bedroom all about.</p><em>Stock photo by: photostock / FreeDigitalPhotos.net</em>",action:"link",href:"http://news.scratchinghead.com"},
			{url:"/images/photo-rotator-jquery-demo/meseum.jpg",caption:"<h3>Showroom</h3><p>Simple yet effectly decoration make all visitor focus on your gallery instead of your room.</p><em>Stock photo by: Salvatore Vuono / FreeDigitalPhotos.net</em>"},
			{url:"/images/photo-rotator-jquery-demo/greenhouse.jpg",caption:"<h3>Greenhouse</h3><p>Landscaping is a big topic. Eventhough it is outside your house, you still need interior design for a greenhouse</p><em>Stock photo by: Sura Nualpradid / FreeDigitalPhotos.net</em>"},
			{url:"/images/photo-rotator-jquery-demo/diningtable.jpg",caption:"<h3>Conference Room</h3><p>Ideal for home office, when you have visitor, a small conference room will bve handy.</p><em>Stock photo by: photostock / FreeDigitalPhotos.net</em>"},
			{url:"/images/photo-rotator-jquery-demo/sofa.jpg",caption:"<h3>Entertaining Room</h3><p>No matter you have a home theater or mini-bar, a nice sofa is a must in your entertaining room.</p><em>Stock photo by: Salvatore Vuono / FreeDigitalPhotos.net</em>"},
			{url:"/images/photo-rotator-jquery-demo/restaurant.jpg",caption:"<h3>Basement</h3><p>Multi-purpose basement that is a romantic restaurant and wine cellar at the same time.</p>",action:"fullsize"},
			{url:"/images/photo-rotator-jquery-demo/sofa2.jpg",caption:"<h3>Contemporay Great Room</h3><p>Euporean designer furniture plus cold color tone. Perfect match for contemporary interior design.</p><em>Stock photo by: fotographic1980 / FreeDigitalPhotos.net</em>"},
		]
	});


});	
