showCategories();
let currentPrice;
let currentProductName;
const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
document.getElementById('categories').addEventListener('click', event => {
    if (event.target.nodeName === 'DIV') {
        const categoryKey = event.target.getAttribute('data-category');
        const categoryProducts = categories[categoryKey].products;
        showProducts(categoryProducts, categoryKey);
        showInfo(null);
    }
});

document.getElementById('products').addEventListener('click', event => {
    if (event.target.nodeName === 'DIV') {
        const productId = event.target.getAttribute('data-product');
        const categoryKey = event.target.getAttribute('data-category');
        const product = categories[categoryKey].products.find(product => product.id == productId);
        currentPrice =  product.price;
        currentProductName = product.name;
        showInfo(product);
    }
});

document.getElementById('btn').addEventListener('click', (event) => {
    const formElement = document.forms.orderingForm.elements;
    event.preventDefault();
    const paymentKey = formElement.paymentMethod.value;
    const formData = {
        productName: {
            value: currentProductName,
            label: 'Назва товару',
        },
        date: {
            value: new Date().toLocaleString(),
            label: 'Дата створення замовлення',
        },
        price: {
            value: sumOrderPrice(formElement.quantity.value),
            label: 'Сума замовлення $',
        },
        fullName: {
            value: formElement.fullName.value,
            label: 'ПІБ',
        },
        city: {
            value: formElement.city.options[formElement.city.selectedIndex].textContent,
            label: 'Місто',
        },
        novaPoshta: {
            value: formElement.novaPoshta.value,
            label: 'Склад Нової пошти',
        },
        paymentMethods: {
            value: paymentMethods[paymentKey],
            label: 'Тип оплати',
        },
        quantity: {
            value: formElement.quantity.value,
            label: 'Кількість продукції',
        },
        comment: {
            value: formElement.comment.value,
            label: 'Коментар до замовлення',
        },
    }
    const allIsValid = validateData(formData);
    if (allIsValid) {
        document.getElementById('order_form').classList.remove('show');
        saveEnteredData(formData, storedOrders);//функ localstorage
    }
});

document.getElementById('btnOrders').addEventListener('click', () => {
    showOnlyOrders();
    showUserOrders(storedOrders);
});

document.getElementById('btnBackToOrder').addEventListener('click', () => {
    const categories = (document.querySelectorAll('#categories #category'));
    categories.forEach((element) => element.classList.remove('hidden'));
    const myOrders  = document.getElementById('orders');
    const ordersDiv = document.getElementById('userOrders');
    if (ordersDiv) {
        myOrders.removeChild(ordersDiv);
    }
});

document.getElementById('btnClose').addEventListener('click', () => {
    hideForm();
})








