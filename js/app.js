showCategories();

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
        showInfo(product);
    }
});

document.getElementById('btn').addEventListener('click', (event) => {
    const formElement = document.forms.orderingForm.elements;
    event.preventDefault();
    const paymentKey = formElement.paymentMethod.value;
    const formData = {
        'ПІБ': formElement.fullName.value,
        'Місто': formElement.city.options[formElement.city.selectedIndex].textContent,
        'Склад Нової пошти': formElement.novaPoshta.value,
        'Тип оплати': paymentMethods[paymentKey],
        'Кількість продукції': formElement.quantity.value,
        'Коментар до замовлення': formElement.comment.value,
    }
    const allIsValid = validateData(formData);
    if (allIsValid) {
        showEnteredData(formData);
    }
});





