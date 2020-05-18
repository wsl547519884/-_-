// 点击选上
function tab(address, container, hidden, arr) {
    container.onmouseenter = function () {
        hidden.style.display = 'block';
    };
    container.onmouseleave = function () {
        hidden.style.display = 'none';
    };

    [].forEach.call(arr, item => {
        item.onclick = function () {
            address.innerText = this.innerText;
            hidden.style.display = 'none';
        };
    });
};
let header_left = document.querySelector('.header_left'),
    header_left_hidden = header_left.querySelector('.header_left_hidden'),
    address = header_left.querySelector('#address'),
    links = header_left_hidden.querySelectorAll('.header_ul li a');
let select = document.querySelector('.header_search .search .select'),
    select_span = select.querySelector('.select #span'),
    select_hidden = select.querySelector('.select_hidden'),
    select_list = select_hidden.querySelectorAll('a');
tab(address, header_left, header_left_hidden, links);
tab(select_span, select, select_hidden, select_list);

// 轮播图渐隐渐显
(function () {
    let bannerTop = document.querySelector('.banner_top'),
        slideList = bannerTop.querySelectorAll('.banner_top li'),
        pagerList = bannerTop.querySelectorAll('.pager span');
    let step = 0,
        prev = 0,
        interval = 1000,
        autoTimer = null,
        len = slideList.length;
    // 实现渐隐渐显
    function change() {
        let slidePrev = slideList[prev],
            slideStep = slideList[step];
        slidePrev.style.zIndex = 0;
        slideStep.style.zIndex = 1;
        slideStep.style.transitionDuration = '.3s';
        slideStep.style.opacity = 1;
        // slidePrev.style.opacity = 0;
        slideStep.addEventListener('transitionend', handle, false);

        function handle() {
            slidePrev.style.transitionDuration = '0s';
            slidePrev.style.opacity = 0;
        }
        pagination();
    }
    // 实现自动渐隐渐显
    function autoFunc() {
        prev = step;
        step++;
        step === len ? step = 0 : null;
        change();
    }
    // 实现焦点对齐
    function pagination() {
        [...pagerList].forEach((item, index) => {
            index === step ? item.className = 'active' : item.className = '';
        });
    };
    autoTimer = setInterval(autoFunc, interval);
    // 鼠标移上时，不动，移开时，接着动
    bannerTop.onmouseenter = function () {
        clearInterval(autoTimer);
    };
    bannerTop.onmouseleave = function () {
        autoTimer = setInterval(autoFunc, interval);
    };
    // 点击焦点实现切换
    [...pagerList].forEach((item, index) => {
        item.onmouseenter = function () {
            if (step === index) return;
            prev = step;
            step = index;
            change();
        };
    });
})();

// 轮播图左右切换
(function () {
    function move(box) {
        let width = parseFloat(window.getComputedStyle(box)['width']);
        let container = box.querySelector('.container'),
            wrapper = container.querySelector('.wrapper'),
            sliderList = wrapper.querySelectorAll('.slider'),
            paginationList = box.querySelectorAll('.pager span'),
            changeLeft = box.querySelector('.btn_left'),
            changeRight = box.querySelector('.btn_right');
        let step = 0,
            len = sliderList.length;

        // 自动轮播的方法
        function autoMove() {
            if (step === (len - 1)) {
                step = 0;
                wrapper.style.transitionDuration = '0s';
                wrapper.style.left = '0px';
                wrapper.offsetWidth;
            }
            step++;
            wrapper.style.transitionDuration = '0.3s';
            wrapper.style.left = -step * width + 'px';
            paginationFocus();
        }

        // 焦点对齐
        function paginationFocus() {
            let tempStep = step;
            tempStep === (len - 1) ? tempStep = 0 : null;
            [].forEach.call(paginationList, (item, index) => {
                if (index === tempStep) {
                    item.className = 'active';
                    return;
                }
                item.className = '';
            });
        }

        // 点击焦点实现切换
        [].forEach.call(paginationList, (item, index) => {
            item.onmouseenter = function () {
                if (index === step || (index === 0 && step === (len - 1))) {
                    return;
                }
                step = index;
                wrapper.style.transitionDuration = '0.3s';
                wrapper.style.left = -step * width + 'px';

                // 焦点对齐
                paginationFocus();
            };
        });
        changeRight.onclick = autoMove;
        changeLeft.onclick = function () {
            if (step === 0) {
                step = len - 1;
                wrapper.style.transitionDuration = '0s';
                wrapper.style.left = -step * width + 'px';
                wrapper.offsetWidth;
            }
            step--;
            wrapper.style.transitionDuration = '0.3s';
            wrapper.style.left = -step * width + 'px';
            paginationFocus();
        };
    }
    let bannerMain = document.querySelector('.banner_bottom_main'),
        bannerNew = document.querySelector('.banner_new'),
        lists = document.querySelectorAll('.recommend .list_bottom');
    move(bannerNew);
    move(bannerMain);
    [...lists].forEach(item => {
        move(item);
    });
})();

function across(box) {
    let bars = box.querySelectorAll('.bar'),
        items = box.querySelectorAll('.item');

    function clear() {
        [...bars].forEach((item, index) => {
            item.className = 'bar';
            items[index].style.display = 'none';
        })
    }
    [...bars].forEach((item, index) => {
        item.onmouseenter = function () {
            clear();
            this.className += ' hide';
            items[index].style.display = 'block';
        }
    });
}
let bars1 = document.querySelectorAll('#bars1 .divList'),
    bars2 = document.querySelectorAll('#bars2 .divList'),
    bars3 = document.querySelector('#bars3');
[...bars2].forEach((_, index) => {
    across(bars2[index]);
});
[...bars1].forEach((_, index) => {
    across(bars1[index]);
});
across(bars3);

// 回到顶部
let asideTop = document.querySelector('#top'),
    timer = null;
window.onscroll = function () {
    if (document.documentElement.scrollTop >= document.documentElement.clientHeight / 2) {
        asideTop.style.display = 'block';
        return;
    }
    asideTop.style.display = 'none';
}
asideTop.onclick = function () {
    let count = 0;
    timer = setInterval(function () {
        count = document.documentElement.scrollTop;
        count -= 100;
        if (count <= 0) {
            count = 0;
            document.documentElement.scrollTop = count;
            clearInterval(timer);
            return;
        }
        document.documentElement.scrollTop = count;
    }, 16);
}

// 选项卡
let box1 = document.querySelector('#box1'),
    box2 = document.querySelector('#box2'),
    box3 = document.querySelector('#box3'),
    box4 = document.querySelector('#box4'),
    box5 = document.querySelector('#box5'),
    box6 = document.querySelector('#box6');

function option(box) {
    let list = box.querySelectorAll('.list'),
        divList = box.querySelectorAll('.divList');

    function clear() {
        [].forEach.call(list, (item, index) => {
            item.className = 'list';
            divList[index].className = 'divList';
        });
    };
    [].forEach.call(list, (item, index) => {
        item.onmouseenter = () => {
            clear();
            item.className += ' active';
            divList[index].className += ' active';
        }
    });
}
option(box1);
option(box2);
option(box3);
option(box4);
option(box5);
option(box6);

// 换一批
let change = document.querySelector('.guess_logo>a'),
    guessList = document.querySelectorAll('.guess_main ul'),
    count = 1;
change.onclick = function () {
    if (count > 3) count = 0;
    [...guessList].forEach(item => {
        item.className = '';
    });
    guessList[count].className = 'active';
    count++;
}
