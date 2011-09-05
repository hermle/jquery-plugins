PhotoRotator jQuery Plugin
==========================

a jQuery Plugin that can be used as slide show or site navigation. Once set up, you can show as many photo as you want and on clicking the main photo (middle one), it will enlarge in a light box to it original size or be a hyperlink to other pages..

Features
--------

* Lightweight script
* No external CSS

Supported Browsers
------------------

The plugin has been successfully tested in the following browsers:

* Firefox 3.6
* Internet Explorer 7.0
* Chrome 13.0

Dependencies
------------

The plugin requires jQuery v1.4.2 (or higher).

Usage
-----

To render the photo-rotator, invoke `.photoRotator()`. You need to pass an options object to load the images and customize the appearance:

 - **images**
   Array of objects, store all the raw data for the images you want to show. Seven images are required otherwise the plugin will work oddly. The object must contain `url` and may contain following properties:
	- **url**
	  String, required. The path for the image file you want to show.
	- **caption**
	  String. The html/text you want to put in the caption box.
	- **action**
	  String. Can be either `"fullsize"` or `"link"`. It determine the action when the main photo is being clicked. It either restore to the full size of the image or become a link to a url determined in **href** property.
	- **href**
	  String, required if **action** is set to `"link"`.
	
 - **preloadImage**
   String, name and location of loading image for preloader. Default is "/img/loading.gif".

 - **fadeSpeed**
   Number, set the speed of the fading animation in milliseconds. Default is `900`.
   
 - **rotateSpeed**
   Number, set the speed of the rotating animation in milliseconds. Default is `600`.
   
 - **captionSwitch**
   Boolean, set to turn on and off the caption. Default is `true`.

 - **captionContainer**
   String, CSS class name for caption container. If not set, it create one for you if captionSwitch is set to `true`. Default is an empty string.


You may change the global defaults by modifying the `$.fn.photoRotator.option` object.

Links
-----

* Author:  [Herman Lee](http://github.com/hermle)
* Demo:    http://www.scratchinghead.com/programming/photo-rotator-jquery-demo.html
