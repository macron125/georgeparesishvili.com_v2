// import anime from './animejs/lib/anime.es.json'

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
            if (el.children[0].getAttribute('href') == current) 
                el.classList.add('selected');
        }
    }

    callback(entries, observer) {
        for (let entry of entries) {
            if (entry.isIntersecting) {
                this.current = "#" + entry.target.getAttribute('id');
                this.checkNav(this.navArr, this.current);
                entry.target.classList.add('visible');
                if(history.pushState) {
                    history.pushState(null, null, this.current);
                }
                else {
                    location.hash = this.current;
                }
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
    constructor(btn, body = document.body) {
        this.btn = btn;
        this.body = body;
    }

    listenClick() {
        this.btn.addEventListener('click', () => {
            this.body.classList.toggle('open');
            this.fixBody(this.body);
        })
    }

    fixBody(body) {
        body.classList.contains('open') ? body.style.overflow = 'hidden' : body.style.removeProperty('overflow');
    }
}

let nav = new Navigation(
    document.querySelector('.gn-ham'),
)
nav.listenClick();


class AgeCalculator {
    _age = 0;
    today = new Date(Date.now());
    birthday;

    constructor(birthdate = []) {
        [this.year, this.month, this.day] = birthdate;
    }

    set age(value) {
        if(value < 0) {
            throw new Error("Age value below 0")
        } else {
            this._age = value;
        }
    }

    get age() {
        this.birthday = new Date(this.year, this.month - 1, this.day);
        return this.calcAge(this.birthday, this.today);
    }

    calcAge(birthdate, today) {
        let result = today.getFullYear() - birthdate.getFullYear();
        if(today.getMonth() > birthdate.getMonth() && today.getDate() > birthdate.getDate()) {
            return result;
        } else {
            return result - 1;
        }
    }
}

let ageCalc = new AgeCalculator([1995, 9, 10]);

let ageEl = document.querySelector("#age span");
ageEl.textContent = ageCalc.age


class TableGenerator {
    constructor(){}
}

let accordionRows = Array.from(accordion.rows).slice(1);

for(let tr of accordionRows) {
	tr.addEventListener('click', (x) => {
        console.log(tr)
        tr.classList.toggle('collapse');
  })
}