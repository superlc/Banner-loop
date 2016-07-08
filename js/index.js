define(function (require,module,exports) {
    var Banner = require('Banner');
    var banner = new Banner({
        id : 'banner',
        defaultImg : 'img/banner-default.png',
        images : [{
        	url : 'http://115.159.36.96/chaoluo/imgHide/img/1.png',
        	link : '#'
        },{
        	url : 'http://115.159.36.96/chaoluo/imgHide/img/Steganography_original.png',
        	link : '#'
        },{
        	url : 'http://115.159.36.96/chaoluo/imgHide/img/qingxia-encoded.png',
        	link : '#'
        }]
    });
    banner.init();
    banner.loadImgs();
    /*
    setTimeout(function () {
        banner.loadImgs();
    },5000);
    */
});


