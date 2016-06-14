define(function (require,module,exports) {
    var Banner = require('Banner');
    var banner = new Banner({
        id : 'banner',
        defaultImg : 'img/banner-default.png',
        images : ['http://115.159.36.96/chaoluo/imgHide/img/1.png','http://115.159.36.96/chaoluo/imgHide/img/Steganography_original.png','http://115.159.36.96/chaoluo/imgHide/img/qingxia-encoded.png']
    });
    banner.init();
    banner.loadImgs();
    /*
    setTimeout(function () {
        banner.loadImgs();
    },5000);
    */
});


