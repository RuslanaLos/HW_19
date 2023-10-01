function showCategories() {
    const parentElement = document.getElementById('categories');
    for (let categoryKey in categories) {
        const category = categories[categoryKey];
        let element = document.createElement('div');
        element.id = 'category';
        element.textContent = category.name;
        element.setAttribute('data-category', categoryKey);
        parentElement.appendChild(element);
    }
}

function showProducts(products, category) {
    const parentElement = document.getElementById('products');
    parentElement.innerHTML = '';
    for (let product of products) {
        let element = document.createElement('div');
        element.id = 'product'
        element.textContent = `${product.name} $${product.price}`;
        element.setAttribute('data-product', product.id);
        element.setAttribute('data-category', category);
        parentElement.appendChild(element);
    }
}

function showInfo(product) {
    const parentElement = document.getElementById('product_info');
    parentElement.innerHTML = '';
    if (product) {
        let element = document.createElement('div');
        element.textContent = `${product.name} $${product.price} ${product.description}`;
        element.id = 'productsInfo'
        parentElement.appendChild(element);
        buyProduct(product.name, product.price);
    }
}

function buyProduct(name, price) {
    const parentElement = document.getElementById('product_info');
    let buyButton = document.createElement('button');
    buyButton.textContent = 'Buy';
    buyButton.id = 'buyButton';
    parentElement.appendChild(buyButton);
    buyButton.addEventListener('click', () => {
        document.getElementById("orderingForm").reset();
        const formContainer = document.getElementById('order_form');
        showElement(formContainer);
    });
}

function showElement(element) {
    element.classList.add('show');
}

function validateData(usersData) {
    let allIsValid = true;
    for (let field in usersData) {
        if (field === 'fullName' && usersData[field].value === '') {
            document.getElementById('fullName').classList.add('red_border');
            allIsValid = false;
        } else if (field === 'novaPoshta' && (usersData[field].value === '' || isNaN(usersData[field].value))) {
            document.getElementById('novaPoshta').classList.add('red_border');
            allIsValid = false;
        } else if (field === 'quantity' && (usersData[field].value === '' || isNaN(usersData[field].value))) {
            document.getElementById('quantity').classList.add('red_border');
            allIsValid = false;
        }
    }
    return allIsValid;
}
function hideForm() {
    const orderingForm = document.getElementById('order_form');
    orderingForm.classList.remove('show');
}

function sumOrderPrice(quantity) {
    return quantity * currentPrice;
}

function showOnlyOrders() {
    const categories = (document.querySelectorAll('#categories #category'));
    categories.forEach((element) => element.classList.add('hidden'));
    const products = (document.querySelectorAll('#products #product'));
    products.forEach((element) => element.classList.add('hidden'));
    const product_info = (document.querySelectorAll('#product_info #productsInfo'));
    product_info.forEach((element) => element.classList.add('hidden'));
    if (document.getElementById('buyButton') !== null) {
        document.getElementById('buyButton').classList.add('hidden');
    }
    hideForm();
}

function saveEnteredData(formData, orders) {
    orders.push(formData);
    localStorage.setItem('orders', JSON.stringify(orders));
}

function showUserOrders (storedOrders) {
    const parentElement = document.getElementById('orders');
    const userOrders = document.createElement('div');
    userOrders.id = 'userOrders';
    parentElement.appendChild(userOrders);
    if (storedOrders.length === 0) {
        showEmptyOrders(parentElement, userOrders);
    } else {
        storedOrders.forEach((order, index) => {
            const userOrder = document.createElement('div'); //date and sum div
            userOrder.id = index; // id equals obj[i]
            userOrder.classList.add('userOrder');
            showBasicInfo(order, userOrder, index, userOrders);
            userOrder.addEventListener('click', (event) => {
                if (event.target.nodeName === 'P') {
                    showFullOrderInfo(event, index);
                }
            });
        })
    }
}

function showFullOrderInfo (event, index) {
    const orderIndex = event.target.getAttribute('order-index');// индекс заказа на который нажали
    const userOrder = document.getElementById(orderIndex); // date and sum div
    userOrder.innerHTML = ''; // очищаем date and sum div
    const checkedOrder = storedOrders[orderIndex]; // obj with users data
    for (let field in checkedOrder) { //userData -fullName i td
        const fieldValue = checkedOrder[field] // obj wit label and value
        const orderData = document.createElement('p');
        orderData.innerHTML += `${fieldValue.label}: ${fieldValue.value}`;
        userOrder.appendChild(orderData);
    }
    addDeleteOrderBtn(userOrder, index);
}

function addDeleteOrderBtn(userOrder, index) {
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Видалити замовлення';
    deleteBtn.setAttribute('order-index', `${index}`);
    userOrder.appendChild(deleteBtn);
    deleteBtn.addEventListener('click', () => {
        deleteOrder(deleteBtn, userOrder);
    })
}
function showBasicInfo(order, userOrder, index, userOrders) {
    for (let field in order) { //field -fullName i td, order - obj with users data
        if (field === 'date' || field === 'price') {
            const fieldValue = (order[field]); // obj wit label and value
            const orderData = document.createElement('p'); //Дата створення замовлення: 30.09.2023, 14:22:55, Сума замовлення: 4900
            orderData.setAttribute('order-index', `${index}`)// attribute for p
            orderData.innerHTML += `${fieldValue.label}: ${fieldValue.value}`;// text in p
            userOrder.appendChild(orderData); //date and sum div
            userOrders.appendChild(userOrder); //div with divs with date and sums
        }
    }
}
function showEmptyOrders(parentElement, userOrders) {
    userOrders.textContent = 'У вас немає збережених замовлень.';
    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Close';
    userOrders.appendChild(closeBtn);
    closeBtn.addEventListener('click', (event) => {
        if (event.target.nodeName === 'BUTTON') {
            parentElement.removeChild(userOrders);
        }
    })
}
function deleteOrder (deleteBtn, userOrder) {
    const orderToDelete = deleteBtn.getAttribute('order-index');
    storedOrders.splice(orderToDelete, 1);
    localStorage.setItem('orders', JSON.stringify(storedOrders));
    userOrder.remove();
    const orders = document.getElementById('userOrders');
    orders.remove();
    showUserOrders(storedOrders);
}

