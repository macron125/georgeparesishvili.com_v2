class CreateObserver {
    obsever;
    current = '';
    cb = this.callback.bind(this);

    constructor(arr, options = {}, navArr) {
        this.arr = arr;
        this.options = { ...options };
        this.navArr = navArr;
    }

    checkNav(navArr, current) {
        for (let el of navArr) {
            el.classList.remove('selected');
            if (el.children[0].getAttribute('href') == current) {
                el.classList.add('selected');
            }
        }
    }

    callback(entries, observer) {
        for (let entry of entries) {
            if (entry.isIntersecting) {
                this.current = "#" + entry.target.getAttribute('id');
                this.checkNav(this.navArr, this.current);
                entry.target.classList.add('visible');
            }
        }
    }

    launch() {
        this.observer = new IntersectionObserver(this.cb, this.options);
        if (typeof this.arr === 'object') {
            for (let el of this.arr) {
                this.observer.observe(el);
            }
        } else {
            this.observer.observe(this.arr)
        }
    }
}

let createObserver = new CreateObserver(
    document.querySelectorAll('section'),
    { root: null, rootMargin: "0px", threshold: [0.4] },
    document.querySelectorAll('.gn-list-item'),
)

createObserver.launch()

class Navigation {
    constructor(body, btn) {
        this.btn = btn;
        this.body = body;
    }

    listenClick() {
        this.btn.addEventListener('click', () => {
            this.body.classList.toggle('open');
        })
    }
}

let nav = new Navigation(
    document.body,
    document.querySelector('.gn-ham')
)
nav.listenClick();