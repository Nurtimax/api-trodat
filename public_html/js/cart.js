const ordersData = [
  {
    id: 1,
    total: 5200,
    image: './icons/product-1.png',
    title: 'Рельефная печать',
    size: 'Размер: Max. 41мм* 24мм',
    color: 'white',
    count: 4,
    price: 3500,
  },
  {
    id: 2,
    total: 5200,
    image: './icons/product-1.png',
    title: 'Рельефная печать',
    size: 'Размер: Max. 41мм* 24мм',
    color: 'red',
    count: 5,
    price: 3500,
  },
];

const renderCartProductOrderItem = (product) => {
  return `
      <div class="product-order-item flex justify-space items-center">
                    <div class="flex gap-1">
                      <div class="product-order-item-img">
                        <img src="${product.image}" alt="" />
                      </div>
                      <div class="grid items-content-space">
                        <div class="product-order-item-price">${product.total}</div>
                        <div class="flex gap-2 product-order-item-action">
                          <div class="product-order-item-title">${product.title}</div>
                          <div class="flex gap-05 items-center product-order-item-title product-order-item-color">
                            Цвета корпуса:
  
                            <div class="circle" style="background: ${product.color};"></div>
                          </div>
                          <div class="product-order-item-title">Кол-во: ${product.count} шт</div>
                        </div>
                      </div>
                    </div>
                    <div class="grid gap-3 justify-items-end">
                        <div class="product-order-item-price" style="color: #000;">${product.price} c.</div>
                        <div class="flex gap-05 product-order-item-delete">
                            <img src="./icons/delete.svg" alt="" />
                            <div style="color: #ACACAC;">Удалить товар</div>
                        </div>
                    </div>
                  </div>
      `;
};

const cartModalContent = document.getElementById('cart-modal');
const orderProducts = document.getElementById('order-products');
const closeButton = document.querySelector('.cart-modal__close');
const cartSummaryContinueShopping = document.getElementById(
  'cart-summary__continue-shopping'
);
const cartSummaryCheckoutButton = document.getElementById(
  'cart-summary__checkout-button'
);
const orderConfirmationImage = document.getElementById(
  'order-confirmation__image'
);
const orderConfirmationButton = document.getElementById(
  'order-confirmation__button'
);

const swiperEl = document.getElementById('swiper-container-cart');

// Function to open the drawer
function openCartModal() {
  cartModalContent.classList.add('open');
  document.querySelector('.cart-modal-content').classList.add('open');
}

// Function to close the drawer
function closeCartModal() {
  cartModalContent.classList.remove('open');
  document.querySelector('.cart-modal-content').classList.remove('open');
}

// Event listener for the close button
closeButton.addEventListener('click', closeCartModal);
cartSummaryContinueShopping.addEventListener('click', closeCartModal);

// Example: Open the cart drawer when a button is clicked
document
  .getElementById('open-cart-button')
  .addEventListener('click', openCartModal);

const renderCartProductListOrderItem = (list) => {
  const renderList = list.map(renderCartProductOrderItem);

  orderProducts.innerHTML = renderList.join('');
};

cartSummaryCheckoutButton.addEventListener('click', () => {
  console.log('click');
  console.log(swiperEl, 'swipeer');
  swiperEl.swiper.slideNext();
  orderConfirmationImage.style.display = 'block';
});

orderConfirmationButton.addEventListener('click', () => {
  swiperEl.swiper.slidePrev();
  orderConfirmationImage.style.display = 'none';
});

const getOrderProducts = async () => {
  try {
    const LOCALSTORAGE_KEY = 'LOCALSTORAGE_KEY';

    const values = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));

    const response = await fetch(
      `${config.apiUrl}/api/users/cart/${values.email}`
    );
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

getOrderProducts();

renderCartProductListOrderItem(ordersData);
