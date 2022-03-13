<template>
  <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="pswp__bg"></div>
    <div class="pswp__scroll-wrap">
      <div class="pswp__container">
        <div class="pswp__item"></div>
        <div class="pswp__item"></div>
        <div class="pswp__item"></div>
      </div>
      <div class="pswp__ui pswp__ui--hidden">
        <div class="pswp__top-bar">
          <div class="pswp__counter"></div>
          <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
          <button class="pswp__button pswp__button--share" title="Share"></button>
          <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
          <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
          <div class="pswp__preloader">
            <div class="pswp__preloader__icn">
              <div class="pswp__preloader__cut">
                <div class="pswp__preloader__donut"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
          <div class="pswp__share-tooltip"></div>
        </div>
        <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
        </button>
        <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
        </button>
        <div class="pswp__caption">
          <div class="pswp__caption__center"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import PhotoSwipe from 'photoswipe/dist/photoswipe'
  import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default'
  import 'photoswipe/dist/photoswipe.css'
  import 'photoswipe/dist/default-skin/default-skin.css'

  export default {
    name: "AppPhotoSwipeElement",
    props: ['items'],
    methods: {
      open(index) {
        var pswpElement = document.querySelectorAll('.pswp')[0]
        var options = {
          index: index,
          closeEl:true,
          captionEl: true,
          fullscreenEl: true,
          zoomEl: true,
          shareEl: false,
          counterEl: true,
          arrowEl: true,
          preloaderEl: true,

        };
        let gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, this.items, options)
        //vm.gallery.updateSize(true)
        // create variable that will store real size of viewport
        var realViewportWidth,
            useLargeImages = false,
            firstResize = true,
            imageSrcWillChange

        // beforeResize event fires each time size of gallery viewport updates
        gallery.listen('beforeResize', function() {
            // gallery.viewportSize.x - width of PhotoSwipe viewport
            // gallery.viewportSize.y - height of PhotoSwipe viewport
            // window.devicePixelRatio - ratio between physical pixels and device independent pixels (Number)
            //                          1 (regular display), 2 (@2x, retina) ...


            // calculate real pixels when size changes
            realViewportWidth = gallery.viewportSize.x * window.devicePixelRatio

            // Code below is needed if you want image to switch dynamically on window.resize

            // Find out if current images need to be changed
            if(useLargeImages && realViewportWidth < 1000) {
                useLargeImages = false;
                imageSrcWillChange = true;
            } else if(!useLargeImages && realViewportWidth >= 1000) {
                useLargeImages = true;
                imageSrcWillChange = true
            }

            // Invalidate items only when source is changed and when it's not the first update
            if(imageSrcWillChange && !firstResize) {
                // invalidateCurrItems sets a flag on slides that are in DOM,
                // which will force update of content (image) on window.resize.
                gallery.invalidateCurrItems()
            }

            if(firstResize) {
                firstResize = false
            }

            imageSrcWillChange = false

        });

        // gettingData event fires each time PhotoSwipe retrieves image source & size
        gallery.listen('gettingData', function(index, item) {

            // Set image source & size based on real viewport width
            if( useLargeImages ) {
                item.src = item.preview2048.src
                item.w = item.preview2048.w
                item.h = item.preview2048.h
            } else {
                item.src = item.preview1024.src
                item.w = item.preview1024.w
                item.h = item.preview1024.h
            }

            // It doesn't really matter what will you do here,
            // as long as item.src, item.w and item.h have valid values.
            //
            // Just avoid http requests in this listener, as it fires quite often

        });
        // Note that init() method is called after gettingData event is bound
        gallery.init()
      }
    }
  }
</script>
