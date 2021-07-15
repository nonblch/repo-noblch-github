class Good {
    constructor(title, price, img_src,) {
        this._title = title;
        this._price = price;
        this._img_src = img_src;
    }

    getPrice() {
        return this._price;
    }

    render() {
        return `<div class="item">
<a href="single_page.html" class="product"><img class="product-img" src=${this._img_src} alt="product photo"><div class="product-text-box"><p class="product-text">${this._title}</p><p class="product-price">&#36;${this._price}</p></div></a>
<div class="box-add"><a class="add" href="shopping_cart.html"><img class="add-img" src="img/cart-add.svg" alt="cart-img">Add to cart</a></div></div>`
    }
}



class GoodMan extends Good {
    constructor (title, price, img_src, extra_class) {
        super (title, price, img_src);
        this._extra_class = extra_class;
    }

    getPrice() {
        return this._price;
    }

    render() {
        return `<div class="item transition-pro"><a href="single_page.html" class="product"><div class="div-for-img-pro ${this._extra_class}"><img class="product-img-pro" src=${this._img_src} alt="product photo"></div><div class="product-text-box"><p class="product-text">${this._title}</p><p class="product-price">&#36;${this._price}</p></div></a></div>`;
    }

}

class GoodInCart extends Good {
    constructor(title, price, img_src, quantity = 1) {
        super (title, price, img_src);
        this._quantity = quantity;
    }

    getPrice() {
        return this._price * this._quantity;
    }

    render() {
        return `<div class="basket-purch"><div class="basket-left"><a class="basket-item-a" href="single_page.html"><img src=${this._img_src} alt="cart_image" style="width: 72px; height: 82px"></a><div class="bask-img-cont"><a href="single_page.html"><span class="img-cont-span-1">${this._title}</span></a><img src="img/stars.png" alt="stars_image"><span class="img-cont-span-2">${this._quantity} x&nbsp; &#36;${this._price}</span></div></div><button class="right-drop-x"><span class="far fa-times-circle"></span></button></div>`
    }
}



class GoodList {
    constructor (goods){
        this._goods = goods;
        this._$goodsListContainer = document.querySelector('.box-product');
    }

    renderGoodsList () {
        const goodsList = this._goods.map(
            item => item.render()
            ).join('');

        this._$goodsListContainer.insertAdjacentHTML('beforeend', goodsList)
    }

}

class GoodListInCart extends GoodList {
    constructor (goods) {
        super (goods);
        this._$goodsListContainer = document.querySelector('.basket-dropdown')
    }

    renderGoodsList () {
        let goodsList = this._goods.map(
            item => item.render()
        );
        for (let i = 0; i <goodsList.length; i++) {

        }
        goodsList.join('');


        this._$goodsListContainer.insertAdjacentHTML('beforeend', goodsList)
    }
}

const list = new GoodList([
    new Good ('Marina Club Tee', 50, "img/product-1.jpg"),
    new Good ('Red Silk Blouse', 60, "img/2.jpg"),
    new Good ('Blue Lash Jacket', 120, "img/3.jpg"),
    new Good ('Marina Flower Blouse', 75, "img/4.jpg"),
    new Good ('Marina Stripe Blouse', 72, "img/5.jpg"),
    new Good ('Blue Business Jacket', 200, "img/6.jpg"),
    new Good ('Brown Trousers', 80, "img/7.jpg"),
    new Good ('Dark Blue Hoodie', 90, "img/8.jpg"),
]);



const listMan = new GoodList([
    new GoodMan('Black Hoodie',102, "img/man/man_1.png", 'pro-1'),
    new GoodMan('Brown Jacket', 200, "img/man/man_2.png", ''),
    new GoodMan('Blue Lash Jacket', 120,"img/man/man_3.png", ''),
    new GoodMan('Gray Spot Tee', 55, "img/man/man_4.png",  'pro-4'),
    new GoodMan('Dark Blue Hoodie', 90, "img/man/man_5.png",  'pro-5'),
    new GoodMan('American Style Jacket', 160, "img/man/man_6.png",  'pro-6'),
    new GoodMan('Blue Business Jacket', 200, "img/man/man_7.png",  ''),
    new GoodMan('Brown Viscose Jacket', 182, "img/man/man_8.png",  ''),
    new GoodMan('Blue Spot Tee', 55, "img/man/man_9.png",  'pro-9')
]);

const listInCart = new GoodListInCart ([]);

const $title = document.querySelector('title').innerHTML;


const $blockAdd = document.querySelector('.box-add');

$blockAdd.addEventListener('click', ()=> {

});

if ($title == 'Index') {
    list.renderGoodsList();
} else {
    listMan.renderGoodsList()
}



