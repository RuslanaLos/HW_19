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
    if (product){
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
        alert(`You bought ${name} for $${price}`);
        resetProductsAndInfo();
    });
}
function resetProductsAndInfo() {
    const productsElement = document.getElementById('products');
    productsElement.innerHTML = '';

    const productInfoElement = document.getElementById('product_info');
    productInfoElement.innerHTML = '';
}

showCategories();

document.getElementById('categories').addEventListener('click', event => {
    if (event.target.nodeName === 'DIV') {
        const categoryKey = event.target.getAttribute('data-category');
        const  categoryProducts = categories[categoryKey].products;
        showProducts(categoryProducts, categoryKey);
        showInfo(null);
    }
})

document.getElementById('products').addEventListener('click', event => {
    if (event.target.nodeName === 'DIV') {
        const productId = event.target.getAttribute('data-product');
        const categoryKey = event.target.getAttribute('data-category');
        const product = categories[categoryKey].products.find(product => product.id == productId);
        showInfo(product);
    }
})



