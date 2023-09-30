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
    /*myOrders(parentElement);*/
}

/*function myOrders(categoriesElement) {
    const ordersBtn = document.createElement('button');
    categoriesElement.appendChild(ordersBtn);
    ordersBtn.textContent = 'My orders';
    ordersBtn.id = 'ordersBtn';
}*/

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
        /*const userData =*/
        showElement(formContainer);
        /*resetProductsAndInfo();*/
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

function showEnteredData(data) {
    document.forms.orderingForm.classList.add('hidden');
    document.getElementById('formName').classList.add('hidden');
    const parent = document.getElementById('order_form');
    const userDataDiv = document.createElement('div');
    /*closeEnteredData(userDataDiv);*/
    parent.appendChild(userDataDiv);
    for (let key in data) {
        let infoParagraph = document.createElement('p');
        infoParagraph.textContent = `${data[key].label}: ${data[key].value}`;
        userDataDiv.appendChild(infoParagraph);
    }
    /*saveEnteredData(data);*/
}

/*function saveEnteredData(data) {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(data);
    localStorage.setItem('orders', JSON.stringify(orders));
}*/

/*function closeEnteredData(dataDiv) {
    const closeBtn = document.createElement('input');
    closeBtn.type = 'button';
    closeBtn.value = 'Close';
    dataDiv.appendChild(closeBtn);
    closeBtn.addEventListener('click', () => {
        cleanElement('#order_form');
    })
}

function cleanElement(element) {
    if (typeof element === 'string') {
        document.querySelector(element).innerHTML = '';
    } else {
        element.innerHTML = '';
    }
}*/

/*function resetProductsAndInfo() {
    const productsElement = document.getElementById('products');
    productsElement.innerHTML = '';

    const productInfoElement = document.getElementById('product_info');
    productInfoElement.innerHTML = '';
}*/