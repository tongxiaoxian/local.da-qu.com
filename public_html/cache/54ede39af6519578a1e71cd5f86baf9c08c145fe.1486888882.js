(function($,window,undefined){'use strict';var YOUTUBE_REGEXP=/^.*(youtu\.be\/|youtube\.com\/v\/|youtube\.com\/embed\/|youtube\.com\/watch\?v=|youtube\.com\/watch\?.*\&v=)([^#\&\?]*).*/i;$.fn.backstretch=function(images,options){var args=arguments;if($(window).scrollTop()===0){window.scrollTo(0,0)}
var returnValues;this.each(function(eachIndex){var $this=$(this),obj=$this.data('backstretch');if(obj){if(typeof args[0]==='string'&&typeof obj[args[0]]==='function'){var returnValue=obj[args[0]].apply(obj,Array.prototype.slice.call(args,1));if(returnValue===obj){returnValue=undefined}
if(returnValue!==undefined){returnValues=returnValues||[];returnValues[eachIndex]=returnValue}
return}
options=$.extend(obj.options,options);if(obj.hasOwnProperty('destroy')){obj.destroy(!0)}}
if(!images||(images&&images.length===0)){var cssBackgroundImage=$this.css('background-image');if(cssBackgroundImage&&cssBackgroundImage!=='none'){images=[{url:$this.css('backgroundImage').replace(/url\(|\)|"|'/g,"")}]}else{$.error('No images were supplied for Backstretch, or element must have a CSS-defined background image.')}}
obj=new Backstretch(this,images,options||{});$this.data('backstretch',obj)});return returnValues?returnValues.length===1?returnValues[0]:returnValues:this};$.backstretch=function(images,options){return $('body').backstretch(images,options).data('backstretch')};$.expr[':'].backstretch=function(elem){return $(elem).data('backstretch')!==undefined};$.fn.backstretch.defaults={duration:5000,transition:'fade',transitionDuration:0,animateFirst:!0,alignX:0.5,alignY:0.5,paused:!1,start:0,preload:2,preloadSize:1,resolutionRefreshRate:2500,resolutionChangeRatioThreshold:0.1};var styles={wrap:{left:0,top:0,overflow:'hidden',margin:0,padding:0,height:'100%',width:'100%',zIndex:-999999},itemWrapper:{position:'absolute',display:'none',margin:0,padding:0,border:'none',width:'100%',height:'100%',zIndex:-999999},item:{position:'absolute',margin:0,padding:0,border:'none',width:'100%',height:'100%',maxWidth:'none'}};var optimalSizeImages=(function(){var widthInsertSort=function(arr){for(var i=1;i<arr.length;i++){var tmp=arr[i],j=i;while(arr[j-1]&&parseInt(arr[j-1].width,10)>parseInt(tmp.width,10)){arr[j]=arr[j-1];--j}
arr[j]=tmp}
return arr};var selectBest=function(containerWidth,imageSizes){var devicePixelRatio=window.devicePixelRatio||1;var lastAllowedImage=0;var testWidth;for(var j=0,image;j<imageSizes.length;j++){image=imageSizes[j];if(typeof image==='string'){image=imageSizes[j]={url:image}}
if(image.pixelRatio&&image.pixelRatio!=='auto'&&parseFloat(image.pixelRatio)!==devicePixelRatio){continue}
lastAllowedImage=j;testWidth=containerWidth;if(image.pixelRatio==='auto'){containerWidth*=devicePixelRatio}
if(image.width>=testWidth){break}}
return imageSizes[Math.min(j,lastAllowedImage)]};var replaceTagsInUrl=function(url,templateReplacer){if(typeof url==='string'){url=url.replace(/{{(width|height)}}/g,templateReplacer)}else if(url instanceof Array){for(var i=0;i<url.length;i++){if(url[i].src){url[i].src=replaceTagsInUrl(url[i].src,templateReplacer)}else{url[i]=replaceTagsInUrl(url[i],templateReplacer)}}}
return url};return function($container,images){var containerWidth=$container.width(),containerHeight=$container.height();var chosenImages=[];var templateReplacer=function(match,key){if(key==='width'){return containerWidth}
if(key==='height'){return containerHeight}
return match};for(var i=0;i<images.length;i++){if($.isArray(images[i])){images[i]=widthInsertSort(images[i]);var chosen=selectBest(containerWidth,images[i]);chosenImages.push(chosen)}else{if(typeof images[i]==='string'){images[i]={url:images[i]}}
var item=$.extend({},images[i]);item.url=replaceTagsInUrl(item.url,templateReplacer);chosenImages.push(item)}}
return chosenImages}})();var isVideoSource=function(source){return YOUTUBE_REGEXP.test(source.url)||source.isVideo};var preload=(function(sources,startAt,count,batchSize,callback){var cache=[];var caching=function(image){for(var i=0;i<cache.length;i++){if(cache[i].src===image.src){return cache[i]}}
cache.push(image);return image};var exec=function(sources,callback,last){if(typeof callback==='function'){callback.call(sources,last)}};return function preload(sources,startAt,count,batchSize,callback){if(typeof sources==='undefined'){return}
if(!$.isArray(sources)){sources=[sources]}
if(arguments.length<5&&typeof arguments[arguments.length-1]==='function'){callback=arguments[arguments.length-1]}
startAt=(typeof startAt==='function'||!startAt)?0:startAt;count=(typeof count==='function'||!count||count<0)?sources.length:Math.min(count,sources.length);batchSize=(typeof batchSize==='function'||!batchSize)?1:batchSize;if(startAt>=sources.length){startAt=0;count=0}
if(batchSize<0){batchSize=count}
batchSize=Math.min(batchSize,count);var next=sources.slice(startAt+batchSize,count-batchSize);sources=sources.slice(startAt,batchSize);count=sources.length;if(!count){exec(sources,callback,!0);return}
var countLoaded=0;var loaded=function(){countLoaded++;if(countLoaded!==count){return}
exec(sources,callback,!next);preload(next,0,0,batchSize,callback)};var image;for(var i=0;i<sources.length;i++){if(isVideoSource(sources[i])){continue}else{image=new Image();image.src=sources[i].url;image=caching(image);if(image.complete){loaded()}else{$(image).on('load error',loaded)}}}}})();var processImagesArray=function(images){var processed=[];for(var i=0;i<images.length;i++){if(typeof images[i]==='string'){processed.push({url:images[i]})}
else if($.isArray(images[i])){processed.push(processImagesArray(images[i]))}
else{processed.push(processOptions(images[i]))}}
return processed};var processOptions=function(options,required){if(options.centeredX||options.centeredY){if(window.console&&window.console.log){window.console.log('jquery.backstretch: `centeredX`/`centeredY` is deprecated, please use `alignX`/`alignY`')}
if(options.centeredX){options.alignX=0.5}
if(options.centeredY){options.alignY=0.5}}
if(options.speed!==undefined){if(window.console&&window.console.log){window.console.log('jquery.backstretch: `speed` is deprecated, please use `transitionDuration`')}
options.transitionDuration=options.speed;options.transition='fade'}
if(options.resolutionChangeRatioTreshold!==undefined){window.console.log('jquery.backstretch: `treshold` is a typo!');options.resolutionChangeRatioThreshold=options.resolutionChangeRatioTreshold}
if(options.fadeFirst!==undefined){options.animateFirst=options.fadeFirst}
if(options.fade!==undefined){options.transitionDuration=options.fade;options.transition='fade'}
return processAlignOptions(options)};var processAlignOptions=function(options,required){if(options.alignX==='left'){options.alignX=0.0}
else if(options.alignX==='center'){options.alignX=0.5}
else if(options.alignX==='right'){options.alignX=1.0}
else{if(options.alignX!==undefined||required){options.alignX=parseFloat(options.alignX);if(isNaN(options.alignX)){options.alignX=0.5}}}
if(options.alignY==='top'){options.alignY=0.0}
else if(options.alignY==='center'){options.alignY=0.5}
else if(options.alignY==='bottom'){options.alignY=1.0}
else{if(options.alignX!==undefined||required){options.alignY=parseFloat(options.alignY);if(isNaN(options.alignY)){options.alignY=0.5}}}
return options};var Backstretch=function(container,images,options){this.options=$.extend({},$.fn.backstretch.defaults,options||{});this.firstShow=!0;processOptions(this.options,!0);this.images=processImagesArray($.isArray(images)?images:[images]);if(this.options.paused){this.paused=!0}
if(this.options.start>=this.images.length)
{this.options.start=this.images.length-1}
if(this.options.start<0)
{this.options.start=0}
this.isBody=container===document.body;var $window=$(window);this.$container=$(container);this.$root=this.isBody?supportsFixedPosition?$window:$(document):this.$container;this.originalImages=this.images;this.images=optimalSizeImages(this.options.alwaysTestWindowResolution?$window:this.$root,this.originalImages);preload(this.images,this.options.start||0,this.options.preload||1);var $existing=this.$container.children(".backstretch").first();this.$wrap=$existing.length?$existing:$('<div class="backstretch"></div>').css(this.options.bypassCss?{}:styles.wrap).appendTo(this.$container);if(!this.options.bypassCss){if(!this.isBody){var position=this.$container.css('position'),zIndex=this.$container.css('zIndex');this.$container.css({});this.$wrap.css({zIndex:-999998})}
this.$wrap.css({position:this.isBody&&supportsFixedPosition?'fixed':'absolute'})}
this.index=this.options.start;this.show(this.index);$window.on('resize.backstretch',$.proxy(this.resize,this)).on('orientationchange.backstretch',$.proxy(function(){if(this.isBody&&window.pageYOffset===0){window.scrollTo(0,1);this.resize()}},this))};var performTransition=function(options){var transition=options.transition||'fade';if(typeof transition==='string'&&transition.indexOf('|')>-1){transition=transition.split('|')}
if(transition instanceof Array){transition=transition[Math.round(Math.random()*(transition.length-1))]}
var $new=options['new'];var $old=options.old?options.old:$([]);switch(transition.toString().toLowerCase()){default:case 'fade':$new.fadeIn({duration:options.duration,complete:options.complete,easing:options.easing||undefined});break;case 'fadeinout':case 'fade_in_out':var fadeInNew=function(){$new.fadeIn({duration:options.duration/2,complete:options.complete,easing:options.easing||undefined})};if($old.length){$old.fadeOut({duration:options.duration/2,complete:fadeInNew,easing:options.easing||undefined})}else{fadeInNew()}
break;case 'pushleft':case 'push_left':case 'pushright':case 'push_right':case 'pushup':case 'push_up':case 'pushdown':case 'push_down':case 'coverleft':case 'cover_left':case 'coverright':case 'cover_right':case 'coverup':case 'cover_up':case 'coverdown':case 'cover_down':var transitionParts=transition.match(/^(cover|push)_?(.*)$/);var animProp=transitionParts[2]==='left'?'right':transitionParts[2]==='right'?'left':transitionParts[2]==='down'?'top':transitionParts[2]==='up'?'bottom':'right';var newCssStart={'display':''},newCssAnim={};newCssStart[animProp]='-100%';newCssAnim[animProp]=0;$new.css(newCssStart).animate(newCssAnim,{duration:options.duration,complete:function(){$new.css(animProp,'');options.complete.apply(this,arguments)},easing:options.easing||undefined});if(transitionParts[1]==='push'&&$old.length){var oldCssAnim={};oldCssAnim[animProp]='100%';$old.animate(oldCssAnim,{duration:options.duration,complete:function(){$old.css('display','none')},easing:options.easing||undefined})}
break}};Backstretch.prototype={resize:function(){try{var $resTest=this.options.alwaysTestWindowResolution?$(window):this.$root;var newContainerWidth=$resTest.width();var newContainerHeight=$resTest.height();var changeRatioW=newContainerWidth/(this._lastResizeContainerWidth||0);var changeRatioH=newContainerHeight/(this._lastResizeContainerHeight||0);var resolutionChangeRatioThreshold=this.options.resolutionChangeRatioThreshold||0.0;if((newContainerWidth!==this._lastResizeContainerWidth||newContainerHeight!==this._lastResizeContainerHeight)&&((Math.abs(changeRatioW-1)>=resolutionChangeRatioThreshold||isNaN(changeRatioW))||(Math.abs(changeRatioH-1)>=resolutionChangeRatioThreshold||isNaN(changeRatioH)))){this._lastResizeContainerWidth=newContainerWidth;this._lastResizeContainerHeight=newContainerHeight;this.images=optimalSizeImages($resTest,this.originalImages);if(this.options.preload){preload(this.images,(this.index+1)%this.images.length,this.options.preload)}
if(this.images.length===1&&this._currentImage.url!==this.images[0].url){var that=this;clearTimeout(that._selectAnotherResolutionTimeout);that._selectAnotherResolutionTimeout=setTimeout(function(){that.show(0)},this.options.resolutionRefreshRate)}}
var bgCSS={left:0,top:0,right:'auto',bottom:'auto'},rootWidth=this.isBody?this.$root.width():this.$root.innerWidth(),rootHeight=this.isBody?(window.innerHeight?window.innerHeight:this.$root.height()):this.$root.innerHeight(),bgWidth=rootWidth,bgHeight=bgWidth/this.$itemWrapper.data('ratio'),evt=$.Event('backstretch.resize',{              relatedTarget:this.$container[0]
            }),bgOffset,alignX=this._currentImage.alignX===undefined?this.options.alignX:this._currentImage.alignX,alignY=this._currentImage.alignY===undefined?this.options.alignY:this._currentImage.alignY;if(bgHeight>=rootHeight){bgCSS.top=-(bgHeight-rootHeight)*alignY}else{bgHeight=rootHeight;bgWidth=bgHeight*this.$itemWrapper.data('ratio');bgOffset=(bgWidth-rootWidth)/2;bgCSS.left=-(bgWidth-rootWidth)*alignX}
if(!this.options.bypassCss){this.$wrap.css({width:rootWidth,height:rootHeight}).find('>.backstretch-item').not('.deleteable').each(function(){var $wrapper=$(this);$wrapper.find('img,video,iframe').css({width:bgWidth,height:bgHeight}).css(bgCSS)})}
this.$container.trigger(evt,this)}catch(err){}
return this},show:function(newIndex,overrideOptions){if(Math.abs(newIndex)>this.images.length-1){return}
var that=this,$oldItemWrapper=that.$wrap.find('>.backstretch-item').addClass('deleteable'),oldVideoWrapper=that.videoWrapper,evtOptions={relatedTarget:that.$container[0]};that.$container.trigger($.Event('backstretch.before',evtOptions),[that,newIndex]);this.index=newIndex;var selectedImage=that.images[newIndex];clearTimeout(that._cycleTimeout);delete that.videoWrapper;var isVideo=isVideoSource(selectedImage);if(isVideo){that.videoWrapper=new VideoWrapper(selectedImage);that.$item=that.videoWrapper.$video.css('pointer-events','none')}else{that.$item=$('<img />')}
that.$itemWrapper=$('<div class="backstretch-item">').append(that.$item);if(this.options.bypassCss){that.$itemWrapper.css({'display':'none'})}else{that.$itemWrapper.css(styles.itemWrapper);that.$item.css(styles.item)}
that.$item.bind(isVideo?'canplay':'load',function(e){var $this=$(this),$wrapper=$this.parent(),options=$wrapper.data('options');if(overrideOptions){options=$.extend({},options,overrideOptions)}
var imgWidth=this.naturalWidth||this.videoWidth||this.width,imgHeight=this.naturalHeight||this.videoHeight||this.height;$wrapper.data('ratio',imgWidth/imgHeight);var getOption=function(opt){return options[opt]!==undefined?options[opt]:that.options[opt]};var transition=getOption('transition');var transitionEasing=getOption('transitionEasing');var transitionDuration=getOption('transitionDuration');var bringInNextImage=function(){if(oldVideoWrapper){oldVideoWrapper.stop();oldVideoWrapper.destroy()}
$oldItemWrapper.remove();if(!that.paused&&that.images.length>1){that.cycle()}
if(!that.options.bypassCss&&!that.isBody){}
$(['after','show']).each(function(){that.$container.trigger($.Event('backstretch.'+this,evtOptions),[that,newIndex])});if(isVideo){that.videoWrapper.play()}};if((that.firstShow&&!that.options.animateFirst)||!transitionDuration||!transition){$wrapper.show();bringInNextImage()}else{performTransition({'new':$wrapper,old:$oldItemWrapper,transition:transition,duration:transitionDuration,easing:transitionEasing,complete:bringInNextImage})}
that.firstShow=!1;that.resize()});that.$itemWrapper.appendTo(that.$wrap);that.$item.attr('alt',selectedImage.alt||'');that.$itemWrapper.data('options',selectedImage);if(!isVideo){that.$item.attr('src',selectedImage.url)}
that._currentImage=selectedImage;return that},current:function(){return this.index},next:function(){var args=Array.prototype.slice.call(arguments,0);args.unshift(this.index<this.images.length-1?this.index+1:0);return this.show.apply(this,args)},prev:function(){var args=Array.prototype.slice.call(arguments,0);args.unshift(this.index===0?this.images.length-1:this.index-1);return this.show.apply(this,args)},pause:function(){this.paused=!0;if(this.videoWrapper){this.videoWrapper.pause()}
return this},resume:function(){this.paused=!1;if(this.videoWrapper){this.videoWrapper.play()}
this.cycle();return this},cycle:function(){if(this.images.length>1){clearTimeout(this._cycleTimeout);var duration=(this._currentImage&&this._currentImage.duration)||this.options.duration;var isVideo=isVideoSource(this._currentImage);var callNext=function(){this.$item.off('.cycle');if(!this.paused){this.next()}};if(isVideo){if(!this._currentImage.loop){var lastFrameTimeout=0;this.$item.on('playing.cycle',function(){var player=$(this).data('player');clearTimeout(lastFrameTimeout);lastFrameTimeout=setTimeout(function(){player.pause();player.$video.trigger('ended')},(player.getDuration()-player.getCurrentTime())*1000)}).on('ended.cycle',function(){clearTimeout(lastFrameTimeout)})}
this.$item.on('error.cycle initerror.cycle',$.proxy(callNext,this))}
if(isVideo&&!this._currentImage.duration){this.$item.on('ended.cycle',$.proxy(callNext,this))}else{this._cycleTimeout=setTimeout($.proxy(callNext,this),duration)}}
return this},destroy:function(preserveBackground){$(window).off('resize.backstretch orientationchange.backstretch');if(this.videoWrapper){this.videoWrapper.destroy()}
clearTimeout(this._cycleTimeout);if(!preserveBackground){this.$wrap.remove()}
this.$container.removeData('backstretch')}};var VideoWrapper=function(){this.init.apply(this,arguments)};VideoWrapper.prototype.init=function(options){var that=this;var $video;var setVideoElement=function(){that.$video=$video;that.video=$video[0]};var videoType='video';if(!(options.url instanceof Array)&&YOUTUBE_REGEXP.test(options.url)){videoType='youtube'}
that.type=videoType;if(videoType==='youtube'){VideoWrapper.loadYoutubeAPI();that.ytId=options.url.match(YOUTUBE_REGEXP)[2];var src='https://www.youtube.com/embed/'+that.ytId+'?rel=0&autoplay=0&showinfo=0&controls=0&modestbranding=1'+'&cc_load_policy=0&disablekb=1&iv_load_policy=3&loop=0'+'&enablejsapi=1&origin='+encodeURIComponent(window.location.origin);that.__ytStartMuted=!!options.mute||options.mute===undefined;$video=$('<iframe />').attr({'src_to_load':src}).css({'border':0,'margin':0,'padding':0}).data('player',that);if(options.loop){$video.on('ended.loop',function(){if(!that.__manuallyStopped){that.play()}})}
that.ytReady=!1;setVideoElement();if(window.YT){that._initYoutube();$video.trigger('initsuccess')}else{$(window).one('youtube_api_load',function(){that._initYoutube();$video.trigger('initsuccess')})}}
else{$video=$('<video>').prop('autoplay',!1).prop('controls',!1).prop('loop',!!options.loop).prop('muted',!!options.mute||options.mute===undefined).prop('preload','auto').prop('poster',options.poster||'');var sources=(options.url instanceof Array)?options.url:[options.url];for(var i=0;i<sources.length;i++){var sourceItem=sources[i];if(typeof(sourceItem)==='string'){sourceItem={src:sourceItem}}
$('<source>').attr('src',sourceItem.src).attr('type',sourceItem.type||null).appendTo($video)}
if(!$video[0].canPlayType||!sources.length){$video.trigger('initerror')}else{$video.trigger('initsuccess')}
setVideoElement()}};VideoWrapper.prototype._initYoutube=function(){var that=this;var YT=window.YT;that.$video.attr('src',that.$video.attr('src_to_load')).removeAttr('src_to_load');var hasParent=!!that.$video[0].parentNode;if(!hasParent){var $tmpParent=$('<div>').css('display','none !important').appendTo(document.body);that.$video.appendTo($tmpParent)}
var player=new YT.Player(that.video,{events:{'onReady':function(){if(that.__ytStartMuted){player.mute()}
if(!hasParent){if(that.$video[0].parentNode===$tmpParent[0]){that.$video.detach()}
$tmpParent.remove()}
that.ytReady=!0;that._updateYoutubeSize();that.$video.trigger('canplay')},'onStateChange':function(event){switch(event.data){case YT.PlayerState.PLAYING:that.$video.trigger('playing');break;case YT.PlayerState.ENDED:that.$video.trigger('ended');break;case YT.PlayerState.PAUSED:that.$video.trigger('pause');break;case YT.PlayerState.BUFFERING:that.$video.trigger('waiting');break;case YT.PlayerState.CUED:that.$video.trigger('canplay');break}},'onPlaybackQualityChange':function(){that._updateYoutubeSize();that.$video.trigger('resize')},'onError':function(err){that.hasError=!0;that.$video.trigger({'type':'error','error':err})}}});that.ytPlayer=player;return that};VideoWrapper.prototype._updateYoutubeSize=function(){var that=this;switch(that.ytPlayer.getPlaybackQuality()||'medium'){case 'small':that.video.videoWidth=426;that.video.videoHeight=240;break;case 'medium':that.video.videoWidth=640;that.video.videoHeight=360;break;default:case 'large':that.video.videoWidth=854;that.video.videoHeight=480;break;case 'hd720':that.video.videoWidth=1280;that.video.videoHeight=720;break;case 'hd1080':that.video.videoWidth=1920;that.video.videoHeight=1080;break;case 'highres':that.video.videoWidth=2560;that.video.videoHeight=1440;break}
return that};VideoWrapper.prototype.play=function(){var that=this;that.__manuallyStopped=!1;if(that.type==='youtube'){if(that.ytReady){that.$video.trigger('play');that.ytPlayer.playVideo()}}else{that.video.play()}
return that};VideoWrapper.prototype.pause=function(){var that=this;that.__manuallyStopped=!1;if(that.type==='youtube'){if(that.ytReady){that.ytPlayer.pauseVideo()}}else{that.video.pause()}
return that};VideoWrapper.prototype.stop=function(){var that=this;that.__manuallyStopped=!0;if(that.type==='youtube'){if(that.ytReady){that.ytPlayer.pauseVideo();that.ytPlayer.seekTo(0)}}else{that.video.pause();that.video.currentTime=0}
return that};VideoWrapper.prototype.destroy=function(){var that=this;if(that.ytPlayer){that.ytPlayer.destroy()}
that.$video.remove();return that};VideoWrapper.prototype.getCurrentTime=function(seconds){var that=this;if(that.type==='youtube'){if(that.ytReady){return that.ytPlayer.getCurrentTime()}}else{return that.video.currentTime}
return 0};VideoWrapper.prototype.setCurrentTime=function(seconds){var that=this;if(that.type==='youtube'){if(that.ytReady){that.ytPlayer.seekTo(seconds,!0)}}else{that.video.currentTime=seconds}
return that};VideoWrapper.prototype.getDuration=function(){var that=this;if(that.type==='youtube'){if(that.ytReady){return that.ytPlayer.getDuration()}}else{return that.video.duration}
return 0};VideoWrapper.loadYoutubeAPI=function(){if(window.YT){return}
if(!$('script[src*=www\\.youtube\\.com\\/iframe_api]').length){$('<script type="text/javascript" src="https://www.youtube.com/iframe_api">').appendTo('body')}
var ytAPILoadInt=setInterval(function(){if(window.YT&&window.YT.loaded){$(window).trigger('youtube_api_load');clearTimeout(ytAPILoadInt)}},50)};var supportsFixedPosition=(function(){var ua=navigator.userAgent,platform=navigator.platform,wkmatch=ua.match(/AppleWebKit\/([0-9]+)/),wkversion=!!wkmatch&&wkmatch[1],ffmatch=ua.match(/Fennec\/([0-9]+)/),ffversion=!!ffmatch&&ffmatch[1],operammobilematch=ua.match(/Opera Mobi\/([0-9]+)/),omversion=!!operammobilematch&&operammobilematch[1],iematch=ua.match(/MSIE ([0-9]+)/),ieversion=!!iematch&&iematch[1];return!(((platform.indexOf("iPhone")>-1||platform.indexOf("iPad")>-1||platform.indexOf("iPod")>-1)&&wkversion&&wkversion<534)||(window.operamini&&({}).toString.call(window.operamini)==="[object OperaMini]")||(operammobilematch&&omversion<7458)||(ua.indexOf("Android")>-1&&wkversion&&wkversion<533)||(ffversion&&ffversion<6)||("palmGetResource" in window&&wkversion&&wkversion<534)||(ua.indexOf("MeeGo")>-1&&ua.indexOf("NokiaBrowser/8.5.0")>-1)||(ieversion&&ieversion<=6))}())}(jQuery,window));
