class CreateObserver {
    obsever;
    current = '';
    cb = this.callback.bind(this);

    constructor(arr, options = {}, navArr) {
        this.arr = arr;
        this.options = {...options};
        this.navArr = navArr;
    }

    checkNav(navArr, current) {
        for (let el of navArr) {
            el.classList.remove('selected');
            if(el.children[0].getAttribute('href') == current) {
                el.classList.add('selected');
            }
        }
    }

    callback(entries, observer) {
        for(let entry of entries) {
            if(entry.isIntersecting) {
                this.current = "#" + entry.target.getAttribute('id');
                this.checkNav(this.navArr, this.current);
            }
        }
    }

    launch() {
        this.observer = new IntersectionObserver(this.cb, this.options);
        if(typeof this.arr === 'object') {
            for(let el of this.arr) {
                this.observer.observe(el);
            }
        } else {
            this.observer.observe(this.arr)
        }
    }
}

let createObserver = new CreateObserver(
    document.querySelectorAll('section'),
    {root: null, rootMargin: "0px", threshold: [0.4]},
    document.querySelectorAll('.gn-list-item'),
)

createObserver.launch()

// class CreateObserver {

//     current = '';
//     cb = this.callback.bind(this);

//     constructor(arr, options = {}) {
//         this.arr = arr;
//         this.options = {...options}
//     }

//     callback(entries, observer) {
//         for(let entry of entries) {
//             if(entry.isIntersecting) {
//                 this.current = '#' + entry.target.getAttribute('id');
//             }
//         }
//     }

//     launch() {
//         this.observer = new IntersectionObserver(this.cb, this.options);
//         for(let el of this.arr) { //Just in case its not an arr
//             this.observer.observe(el);
//         }
//     }
// }

// let createObserver = new CreateObserver(
//     document.querySelectorAll('section'),
//     {root: null, rootMargin: "0px", threshold: [0.4]},
// )

// createObserver.launch()