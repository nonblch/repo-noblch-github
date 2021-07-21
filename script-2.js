const arrOfGoods = [
    {title: 'Marina Club Tee', price: 50, img_src: "img/product-1.jpg"},
    {title: 'Red Silk Blouse', price: 60, img_src: "img/2.jpg"},
    {title: 'Blue Lash Jacket', price: 120, img_src: "img/3.jpg"},
    {title: 'Marina Flower Blouse', price: 75, img_src: "img/4.jpg"},
    {title: 'Marina Stripe Blouse', price: 72, img_src: "img/5.jpg"},
    {title:  'Blue Business Jacket', price: 200, img_src: "img/6.jpg"},
    {title: 'Brown Trousers', price: 80, img_src: "img/7.jpg"},
    {title: 'Dark Blue Hoodie', price: 90, img_src: "img/8.jpg"},
];

const arrOfManGoods = [
    {title: 'Black Hoodie', price:102, img_src: "img/man/man_1.png", extra_class: 'pro-1'},
    {title: 'Brown Jacket', price:200, img_src: "img/man/man_2.png", extra_class: ''},
    {title: 'Blue Lash Jacket', price: 120, img_src: "img/man/man_3.png", extra_class: ''},
    {title: 'Gray Spot Tee', price: 55, img_src: "img/man/man_4.png", extra_class: 'pro-4'},
    {title: 'Dark Blue Hoodie', price: 90, img_src: "img/man/man_5.png", extra_class: 'pro-5'},
    {title: 'American Style Jacket', price: 160, img_src: "img/man/man_6.png", extra_class: 'pro-6'},
    {title: 'Blue Business Jacket', price:200, img_src: "img/man/man_7.png", extra_class: ''},
    {title: 'Brown Viscose Jacket', price:182, img_src: "img/man/man_8.png", extra_class: ''},
    {title: 'Blue Spot Tee', price: 55, img_src: "img/man/man_9.png", extra_class: 'pro-9'},
];

const arrOfCart = [];

class GoodList {
    constructor(container = '.box-product', list) {
        this.container = container;
        this.list = list;
        this.goods = arrOfGoods;
        this.allProducts = [];
    }

    renderList() {
        const block = document.querySelector(this.container);

        this.goods.forEach((item) => {
            const newItem = new this.list(item);
            this.allProducts.push(newItem);
            block.insertAdjacentHTML("beforeend", newItem.render());
        });
    }
}

class Good {
    constructor(el) {
        this.title = el.title;
        this.price = el.price;
        this.img_src = el.img_src;
    }

    render() {
        return `<div class="item">
<a href="single_page.html" class="product"><img class="product-img" src=${this.img_src} alt="product photo"><div class="product-text-box"><p class="product-text">${this.title}</p><p class="product-price">&#36;${this.price}</p></div></a>
<div class="box-add"><a class="add" href="#"><img class="add-img" src="img/cart-add.svg" alt="cart-img">Add to cart</a></div></div>`
    }
}

class GoodMan extends Good {
    constructor(el) {
        super (el);
        this.extra_class = el.extra_class;
    }

    render() {
        return `<div class="item transition-pro"><a href="single_page.html" class="product"><div class="div-for-img-pro ${this.extra_class}"><img class="product-img-pro" src=${this.img_src} alt="product photo"></div><div class="product-text-box"><p class="product-text">${this.title}</p><p class="product-price">&#36;${this.price}</p></div></a></div>`;
    }
}

const $title = document.querySelector('title').innerHTML;

if ($title == 'Index') {
    const goodList = new GoodList('.box-product', Good);

    goodList.renderList()

} else {

    const goodList = new GoodList('.box-product', GoodMan);

    goodList.goods = arrOfManGoods;

    goodList.renderList()
}

class GoodCart extends Good {
    constructor (el) {
        super(el);
        this.quantity = el.quantity;
    }

    render() {
        return `<div class="basket-purch"><div class="basket-left"><a class="basket-item-a" href="single_page.html"><img src=${this.img_src} alt="cart_image" style="width: 72px; height: 82px"></a><div class="bask-img-cont"><a href="single_page.html"><span class="img-cont-span-1">${this.title}</span></a><img src="img/stars.png" alt="stars_image"><span class="img-cont-span-2"><span class="quant-span">${this.quantity}</span> x&nbsp; &#36;${this.price}</span></div></div><button class="right-drop-x"><span class="far fa-times-circle"></span></button></div><hr class="hr-for-right-drop"/>`
    }
}

class GoodCartList {
    constructor(container = '.basket-dropdown', list){
        this.container = container;
        this.list = list;
        this.allProducts = [];
        this.cartGoods = arrOfCart;
    }

    renderCartList() {
        const block = document.querySelector(this.container);

        this.cartGoods.forEach((item) => {
            const newItem = new this.list(item);
            this.allProducts.push(newItem);
            block.insertAdjacentHTML("afterbegin", newItem.render());
        });
    }
}


const $blockAdd = document.querySelectorAll('.add');

for (let i = 0; i < $blockAdd.length; i++) {
    $blockAdd[i].classList.add('control-box-' + i);

    $blockAdd[i].addEventListener('click', (event) => {
        event.preventDefault();
        const getClasses = $blockAdd[i].getAttribute('class').split(' ');
        const neededClass = getClasses[1].split('-');

        const numberOfItem = parseInt(neededClass[2]);

        const itemOfCart = arrOfGoods[numberOfItem];



        function contains(arr, elem) {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].title === elem.title) {
                    return true;
                }
            }
            return false;
        }

        if (contains(arrOfCart, itemOfCart)) {
            let searchTitle = itemOfCart.title;
            let index = arrOfCart.findIndex(el => el.title === searchTitle);
            arrOfCart[index].quantity++;
            document.querySelector('.quant-span').innerHTML = arrOfCart[index].quantity;
        } else {
            itemOfCart.quantity = 1;
            arrOfCart.push(itemOfCart);
            const goodCartList = new GoodCartList('.basket-dropdown', GoodCart);

            document.querySelectorAll('.basket-purch').forEach(item => item.remove());
            document.querySelectorAll('.hr-for-right-drop').forEach(item => item.remove());
            goodCartList.renderCartList()
        }

        function getFullPrice(arr) {
            let sum = 0;
            for (let i = 0; i < arr.length; i++) {
                sum += arr[i].quantity*arr[i].price;
            }
            return sum
        }
        getFullPrice(arrOfCart);

        document.querySelector('.total-price').innerHTML = '&#36;'+ getFullPrice(arrOfCart);


    });

}

