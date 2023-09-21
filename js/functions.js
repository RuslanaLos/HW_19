function showCategories() {
    const parentElement = document.getElementById('categories');
    for (let categoryKey in categories) {
        const category = categories[categoryKey];
        let element = document.createElement('div');
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
        const formContainer = document.getElementById('order_form');
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
        if (field === 'ПІБ' && usersData[field] === '') {
            document.getElementById('fullName').classList.add('red_border');
            allIsValid = false;
        } else if (field === 'Склад Нової пошти' && (usersData[field] === '' || isNaN(usersData[field]))) {
            document.getElementById('novaPoshta').classList.add('red_border');
            allIsValid = false;
        } else if (field === 'Кількість продукції' && (usersData[field] === '' || isNaN(usersData[field]))) {
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
    parent.appendChild(userDataDiv);
    for (let key in data) {
        let infoParagraph = document.createElement('p');
        infoParagraph.textContent = `${key}: ${data[key]}`;
        userDataDiv.appendChild(infoParagraph);
    }
}

/*function resetProductsAndInfo() {
    const productsElement = document.getElementById('products');
    productsElement.innerHTML = '';

    const productInfoElement = document.getElementById('product_info');
    productInfoElement.innerHTML = '';
}*/