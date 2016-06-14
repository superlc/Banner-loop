/**
 * banner模块
 * */
define(function (require,module,exports) {
    function getStyle(dom) {
        return window.getComputedStyle(null,dom);
    }
    /**
     * Banner的构造函数
     * */
    function Banner(params) {
        //需要的参数
        var ops = {
            //默认图的地址
            defaultImg : 'img/banner-default.png',
            //轮播图的地址
            images : [],
            //是否自动轮播
            autoPlay : true,
            //是否回弹
            autoBounce : false,
            width : window.innerWidth,
            //banner图  高/宽 比例
            ratio : 9/16,
            id : '',
            //是否正在切换动画中
            isMoving : false,
            //手指滑动的阈值，超过阈值的绝对值时才执行切换
            delta : 20,
            //默认banner的索引
            index : 1,
            transitionEnd : 'transitionEnd',
            //自动轮播间隔时间，单位毫秒
            showTime : 3000
        };
        //拷贝params的设置到ops
        for(var p in params){
            ops[p] = params[p];
        }
        //最大数目
        ops.maxim = ops.images.length;
        //必备参数校验
        if(ops.id == '' || document.getElementById(ops.id) == undefined){
            console.log('请设置正确的banner容器的id');
            return;
        }
        if(ops.images.length <= 0){
            console.log('请设置需要轮播的图片数组');
            return;
        }
        //参数配置赋值
        this.options = ops;
    }
    /**
     * Banner的方法
     * */
    Banner.prototype = {
        init : function () {
            var _this = this;
            var bannerHeight = _this.options.width * _this.options.ratio;
            //获取目标的zepto对象
            _this.el = document.getElementById(_this.options.id);
            var bannerList = _this.el.querySelector('.banner-list');
            var navList = _this.el.querySelector('.banner-navs');

            var imgCount = _this.options.images.length;

            //设置banner
            //_this.el.css('height',bannerHeight);
            _this.el.style.height = bannerHeight + 'px';
            //bannerList.css('width',_this.options.width * imgCount);
            bannerList.style.width = _this.options.width * imgCount + 'px';
            //填充dom
            var listHtml = '',
                navHtml = '';

            for(var i = 0 ; i < imgCount ; i++){
                listHtml += '<div class="banner-item" style="width: ' + _this.options.width + 'px" >'
                            + '<img src="' + _this.options.defaultImg + '"  data-url="' + _this.options.images[i] + '" style="height: ' + bannerHeight + 'px" />'
                            + '</div>';
                navHtml += i == 0 ? '<a class="banner-nav active"></a>' : '<a href="" class="banner-nav"></a>';
            }
            console.log(navHtml);
            //填充HTML到banner的容器中
            //bannerList.append(listHtml);
            bannerList.innerHTML = listHtml;

            //如果图片数目只有一张，则不展示下面的轮播，也不用添加swipe事件
            if(imgCount > 1){
                //navList.append(navHtml);
                navList.innerHTML = navHtml;
                //添加滑动事件处理
                var dom = _this.el;
                var Hammer = require('Hammer');
                var hammer = new Hammer(dom);
                hammer.on('swipe',function (e) {
                    if(_this.options.timer){
                        clearInterval(_this.options.timer);
                    }
                    //如果正在动画中则不处理滑动事件
                    if(_this.options.isMoving){
                        return;
                    }
                    //监听banner上的swipe事件
                    var _index = _this.options.index;

                    if(e.deltaX > _this.options.delta){
                        //向右滑动，当已经是第一张图时不处理
                        if(_index <= 1){
                            return;
                        }else{
                            _index--;
                        }
                    }
                    if(e.deltaX < -1 * _this.options.delta){
                        //向左滑动
                        if(_index + 1 > _this.options.maxim){
                            return;
                        }else{
                            _index++;
                        }
                    }
                    //切换状态
                    _this.options.index = _index;
                    _this.loop(_index);
                });
            }else{
                //navList.css('display','none');
                navList.style.display = 'none';
            }
        },
        loop : function (index) {
            //index为当前轮播图的索引值，显示第几幅图的api
            var ops = this.options,
                el = this.el,
                wrapper = el.querySelector('.banner-list');

            //设置移动标志
            //ops.isMoving = true;

            //容器移动
            /*
            wrapper.css('webkit-transform','translateX(' + (1-index)*ops.width + 'px)');
            wrapper.css('transform','translateX(' + (1-index)*ops.width + 'px)');
            */
            this.setCSS3(wrapper,'transform','translateX(' + (1-index)*ops.width + 'px)')

            //切换nav
            var navItems = el.querySelectorAll('.banner-nav');
            //navItems.removeClass('active');
            for(var i = 0 ; i < navItems.length ; i++){
                navItems[i].classList.remove('active');
            }
            navItems[index - 1].classList.add('active');

        },
        loadImgs : function () {
            //这个作为暴露的接口，由用户自主去在适合的时机去调用
            var _this = this;
            var banner = _this.el;
            var imgs = banner.querySelectorAll('.banner-item img');
            var imgCount = imgs.length;

            for(var i = 0 ; i < imgCount ; i++){
                var img = new Image();
                img.src = imgs[i].dataset['url'];
                //图片加载成功后就展示出来
                img.onload = (function (m) {
                     return function () {
                       imgs[m].src = imgs[m].dataset['url'];
                     };
                })(i);
            }
            //图片都加载完成后再启动自动轮播
            _this.autoPlay(_this.options.autoPlay);
        },
        //判断到底该怎么加前缀
        setCSS3 : function (el,propName,val) {
            var prefixes = ['-webkit-','-ms-','-moz-',''];
            for(var i = 0 ; i < prefixes.length ; i++){
                if(el.style[prefixes[i] + propName] != undefined || el.style[prefixes[i] + propName] != null){
                    el.style[prefixes[i] + propName] = val;
                    return;
                }
            }
        },
        //自动播放轮播图
        autoPlay : function (flag) {
            var _this = this;
            if(flag){
                _this.options.timer = setInterval(function () {
                    var nextIndex = (_this.options.index + 1) % _this.options.maxim;
                    _this.options.index =  nextIndex > 0 ? nextIndex : _this.options.maxim;
                    _this.loop(_this.options.index);
                },_this.options.showTime);
            }
        }
    };
    //导出Banner的构造函数
    return Banner;
});