const goods = [
    {title: 'Marina Club Tee', price: 50, img_src: "img/product-1.jpg"},
    {title: 'Red Silk Blouse', price: 60, img_src: "img/2.jpg"},
    {title: 'Blue Lash Jacket', price: 120, img_src: "img/3.jpg"},
    {title: 'Marina Flower Blouse', price: 75, img_src: "img/4.jpg"},
    {title: 'Marina Stripe Blouse', price: 72, img_src: "img/5.jpg"},
    {title: 'Blue Business Jacket', price: 200, img_src: "img/6.jpg"},
    {title: 'Brown Trousers', price: 80, img_src: "img/7.jpg"},
    {title: 'Dark Blue Hoodie', price: 90, img_src: "img/8.jpg"},
];

const goods_man = [
    {title: 'Black Hoodie', price: 102, img_src: "img/man/man_1.png", extra_class: 'pro-1'},
    {title: 'Brown Jacket', price: 200, img_src: "img/man/man_2.png", extra_class: ''},
    {title: 'Blue Lash Jacket', price: 120, img_src: "img/man/man_3.png", extra_class: ''},
    {title: 'Gray Spot Tee', price: 55, img_src: "img/man/man_4.png", extra_class: 'pro-4'},
    {title: 'Dark Blue Hoodie', price: 90, img_src: "img/man/man_5.png", extra_class: 'pro-5'},
    {title: 'American Style Jacket', price: 160, img_src: "img/man/man_6.png", extra_class: 'pro-6'},
    {title: 'Blue Business Jacket', price: 200, img_src: "img/man/man_7.png", extra_class: ''},
    {title: 'Brown Viscose Jacket', price: 182, img_src: "img/man/man_8.png", extra_class: ''},
    {title: 'Blue Spot Tee', price: 55, img_src: "img/man/man_9.png", extra_class: 'pro-9'},
];

const $goodsList = document.querySelector('.box-product');

const renderGoodsItem = ({ title, price, img_src}) => {
    return `<div class="item">
<a href="single_page.html" class="product"><img class="product-img" src=${img_src} alt="product photo"><div class="product-text-box"><p class="product-text">${title}</p><p class="product-price">&#36;${price}</p></div></a>
<div class="box-add"><a class="add" href="shopping_cart.html"><img class="add-img" src="img/cart-add.svg" alt="cart-img">Add to cart</a></div></div>`
};

const renderGoodsManItem = ({ title, price, img_src, extra_class }) => {
    return `<div class="item transition-pro"><a href="single_page.html" class="product"><div class="div-for-img-pro ${extra_class}"><img class="product-img-pro" src=${img_src} alt="product photo"></div><div class="product-text-box"><p class="product-text">${title}</p><p class="product-price">&#36;${price}</p></div></a></div>`
};

const renderGoodsList = (list = goods) => {
    let goodsList = list.map(
        item => renderGoodsItem(item)
    ).join('');

    $goodsList.insertAdjacentHTML('beforeend', goodsList);
};

const renderGoodsManList = (list_man = goods_man) => {
    let goodsManList = list_man.map(
        item => renderGoodsManItem(item)
    ).join('');

    $goodsList.insertAdjacentHTML('beforeend', goodsManList);
};

const $title = document.querySelector('title').innerHTML;

if ($title == 'Index') {
    renderGoodsList();
} else {
    renderGoodsManList();
}


