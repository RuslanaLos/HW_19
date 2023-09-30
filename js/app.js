showCategories();
let currentPrice;
let currentProductName;
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
        date: {
            value: new Date().toLocaleString(),
            label: 'Дата створення замовлення',
        },
        price: {
            value: sumOrderPrice(formElement.quantity.value),
            label: 'Сума замовлення',
        },
        productName: {
            value: currentProductName,
            label: 'Назва товару',
        }


    }
    const allIsValid = validateData(formData);
    if (allIsValid) {
        /*showEnteredData(formData);*/
        document.getElementById('order_form').classList.remove('show');
        saveEnteredData(formData, userOrders);//функ localstorage
    }
});

function sumOrderPrice(quantity) {
    return quantity * currentPrice;
}
document.getElementById('btnOrders').addEventListener('click', () => {
    showOnlyOrders();
    showUserOrders(userOrders);
});

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
}

document.getElementById('btnBackToOrder').addEventListener('click', () => {
    const categories = (document.querySelectorAll('#categories #category'));
    categories.forEach((element) => element.classList.remove('hidden'));
    const myOrders  = document.getElementById('orders');
    const ordersDiv = document.getElementById('myOrders');
    myOrders.removeChild(ordersDiv);


});
const userOrders = JSON.parse(localStorage.getItem('orders')) || [];
function saveEnteredData(formData, orders) {
    orders.push(formData);
    localStorage.setItem('orders', JSON.stringify(orders));
    console.log(orders);
}

function showUserOrders (orders) {
    const parentElement = document.getElementById('orders');
    const userOrders = document.createElement('div');
    userOrders.id = 'userOrders';
    parentElement.appendChild(userOrders);
    if (orders.length === 0) {
        userOrders.textContent = 'У вас немає збережених замовлень.';
        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'Close';
        userOrders.appendChild(closeBtn);
        closeBtn.addEventListener('click', (event) => {
            if (event.target.nodeName === 'BUTTON') {
                parentElement.removeChild(userOrders);
            }
        })
    } else {
        orders.forEach((order, index) => {
            const userOrder = document.createElement('div');
            userOrder.id = index;
            for (let userData in order) {
                if (userData === 'date' || userData === 'price') {
                    const dataObj  = (order[userData]);
                    const orderData = document.createElement('p');
                    orderData.setAttribute('order-index', `${index}`);
                    orderData.innerHTML += `${dataObj.label}: ${dataObj.value}`;
                    userOrder.appendChild(orderData);
                    userOrders.appendChild(userOrder);
                }
            }
            const viewDetails = document.createElement('input');
            viewDetails.type = 'button';
            viewDetails.value = 'Деталі замовлення';
            viewDetails.setAttribute('order-index', `${index}`);
            userOrder.appendChild(viewDetails);
            viewDetails.addEventListener('click',  (event) => {
                if (document.getElementById('orderDetails') !== null) {
                    removeElement(document.getElementById('orderDetails'));
                }
                if (event.target.nodeName === 'INPUT') {
                    const orderIndex = event.target.getAttribute('order-index');
                    console.log(orderIndex);
                    const orderDetails = document.createElement('div');
                    orderDetails.id = 'orderDetails';
                    userOrders.appendChild(orderDetails);
                    console.log(orderDetails);
                    const checkedOrder = orders[orderIndex];
                    for (let userData in checkedOrder) {
                        const dataObj = checkedOrder[userData]
                        console.log(dataObj);
                        const orderData = document.createElement('p');
                        orderData.innerHTML += `${dataObj.label}: ${dataObj.value}`;
                        orderDetails.appendChild(orderData);



                    }
                }
            })
        })
    }
}
/*function showUserOrders (orders) {
    const userOrders = document.getElementById('orders');
    const myOrderDiv = document.createElement('div');
    myOrderDiv.id = 'myOrders';
    if (orders.length === 0) {
        myOrderDiv.innerHTML = '<p>У вас немає збережених замовлень.</p>';
        userOrders.appendChild(myOrderDiv);
        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'Close';
        myOrderDiv.appendChild(closeBtn);
        closeBtn.addEventListener('click', (event) => {
            if (event.target.nodeName === 'BUTTON') {
                myOrderDiv.classList.add('hidden');
            }
        });
    } else {
        orders.forEach((order, index) => {
            const orderItem = document.createElement('div');
            orderItem.classList.add(`${index}`);
            orderItem.setAttribute('order-index', `${index}`);
            orderItem.innerHTML = `
                <p>Замовлення #${index + 1}</p>
                <p>Товар: ${order.productName.value}</p>
                <p>Дата: ${order.date.value}</p>
                <p>Загальна ціна: $${order.price.value}</p>
            `;
            const btnDeleteOrder = document.createElement('button');
            btnDeleteOrder.textContent = 'Видалити';
            btnDeleteOrder.setAttribute('data-order-index',`${index}`);
            orderItem.appendChild(btnDeleteOrder);
            myOrderDiv.appendChild(orderItem);
            userOrders.appendChild(myOrderDiv);
            orderItem.addEventListener('click', () => {
                showOrderDetails(order, orderItem, index);
                /!*showEnteredData(order);*!/
            })
            btnDeleteOrder.addEventListener('click', () => {
                const orderDiv = document.getElementsByClassName(index).item(0);
                const myOrders = document.getElementById('myOrders');
                myOrders.removeChild(orderDiv);
                if (index >= 0 && index < orders.length) {
                    orders.splice(index, 1);
                    localStorage.setItem('orders', JSON.stringify(orders));
                    showUserOrders();
                }

            })
                /!*const deleteButtons = myOrderDiv.querySelectorAll('button[data-order-index]');
                deleteButtons.forEach(button => {
                    button.addEventListener('click', (event) => {
                        const orderIndex = event.target.getAttribute('data-order-index');
                        deleteOrder(orderIndex);
                    });
                });*!/
            })
    }
}*/
/*function deleteOrder(orderIndex) {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];

    if (orderIndex >= 0 && orderIndex < orders.length) {
        orders.splice(orderIndex, 1);
        localStorage.setItem('orders', JSON.stringify(orders));
        showUserOrders();
    }
}*/
function showOrderDetails(order, orderItem, index) {
    orderItem.innerHTML = `
                <p>Замовлення #${index + 1}</p>
                <p>Товар: ${order.productName.value}</p>
                <p>Дата: ${order.date.value}</p>
                <p>Загальна ціна: $${order.price.value}</p>
                <p>Ім'я: ${order.fullName.value}</p>
                <p>Місто: ${order.city.value}</p>
                <p>Склад Нової пошти: ${order.novaPoshta.value}</p>
                <p>Тип оплати: ${order.paymentMethods.value}</p>
                <p>Кількість продукції: ${order.quantity.value}</p>
                <p>Коментар до замовлення: ${order.comment.value}</p>   
                <button data-order-index="${index}">Видалити</button>
            `;
}
/*function deleteOrder (order, btn, orders) {
    const orderToDelete = btn.getAttribute('data-order-index');
    orders.splice(orderToDelete, 1);
    localStorage.setItem('orders', JSON.stringify(orders));
    order.remove();
    /!*if (event.target.nodeName === 'BUTTON') {
        const btnIndex = event.target.getAttribute('data-order-index');
        deleteOrderByIndex(btnIndex,orders);*!/
        /!*const orderToDelete = document.getElementsByName(`${btnKey}`);
        console.log(orderToDelete);
        const myOrders = document.getElementById('myOrders');
        myOrders.removeChild(orderToDelete);*!/

    }*/




/*function deleteOrderByIndex(id,orders) {
    const indexToRemove = orders.findIndex(order => order[]);
    orders.splice(indexToRemove, 1);
    removeElement(`div[order-index="${id}"]`);
    /!*updateStorage();*!/
}*/
/*document.getElementById('myOrders').addEventListener('click', event => {
    if (event.target.nodeName === 'DIV') {
        const orderId = event.target.getAttribute('order-index');
        const orderInfo = userOrders[orderId];
        console.log(orderInfo);
    }
})*/
 /*if (document.getElementById('myOrders') !== null) {
     document.getElementById('myOrders').addEventListener('click', event => {
         if (event.target.nodeName === 'DIV') {
             const orderId = event.target.getAttribute('order-index');
             const orderInfo = userOrders[orderId];
             console.log(orderInfo);
         }
     })
 }*/
/*document.getElementById('ordersBtn').addEventListener('click', () => {
    const categories = document.querySelectorAll('#main #categories #category');
    categories.forEach((element) => element.innerHTML = '');
    document.getElementById('products').innerHTML = '';
    document.getElementById('product_info').innerHTML = '';
    document.getElementById('order_form').classList.remove('show');
    const cat = document.getElementById('categories');
    const myOrders = document.createElement('div');
    myOrders.id = 'myOrdersList';
    myOrders.innerHTML = '';
    cat.appendChild(myOrders);
    let orders = document.createElement('div');
    orders = JSON.parse(localStorage.getItem('orders'));
    if (orders && orders.length > 0) {
        orders.forEach((order, index) => {
            const orderItem = document.createElement('div');
            orderItem.classList.add('order-item');
            orderItem.innerHTML = `<p>Замовлення #${index + 1}</p><button data-order-index="${index}">Видалити</button>`;
            myOrders.appendChild(orderItem);
        });
    } else {
        myOrders.innerHTML = '<p>У вас немає збережених замовлень.</p>';
    }





})*/

function removeElement(element) {
    if (typeof element === 'string') {
        document.querySelector(element).remove();
    } else {
        element.remove();
    }
}



