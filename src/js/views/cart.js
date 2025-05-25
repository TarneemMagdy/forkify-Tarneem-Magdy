document.addEventListener('DOMContentLoaded', () => {
  const cartList = document.querySelector('.cart__list');
  const products = JSON.parse(localStorage.getItem('basket')) || [];
document.addEventListener('DOMContentLoaded', () => {
  const cartList = document.querySelector('.cart__list');


  if (products.length === 0) {
    cartList.innerHTML = '<p>No items in your cart yet.</p>';
    return;
  }


});

  if (products.length === 0) {
    cartList.innerHTML = '<p>No items in your cart yet.</p>';
    return;
  }

  products.forEach(product => {
    const li = document.createElement('li');
    li.innerHTML = `
      <button class="delete-btn me-auto" data-id="${product.id}" title="Delete">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="red" viewBox="0 0 24 24">
          <path d="M9 3v1H4v2h1v14a2 2 0 002 2h10a2 2 0 002-2V6h1V4h-5V3H9zm2 2h2v1h-2V5zM7 8h2v10H7V8zm4 0h2v10h-2V8zm4 0h2v10h-2V8z"/>
        </svg>
      </button>
      <div class="basket-item">
        <img src="${product.image}" alt="${product.title}" class="basket-img">
        <div class="basket-content">
          <h3 class="basket-item-title">${product.title}</h3>
          <p class="basket-item-subtitle">${product.publisher}</p>
          <div class="basket-details">
            <span class="recipe__info-data recipe__info-data--people">${product.servings}</span>
            <span class="recipe__info-text">servings</span>
            <span class="recipe__info-data recipe__info-data--minutes">${product.cookingTime}</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <a href="${product.sourceUrl}" class="view-ingredients">Click to view ingredients</a>
        </div>
      </div>
    `;

    cartList.appendChild(li);

    const deleteBtn = li.querySelector('.delete-btn');

    deleteBtn.addEventListener('click', () => {
      const basket = JSON.parse(localStorage.getItem('basket')) || [];
      console.log('Before filter:', basket);
      const updatedBasket = basket.filter(
        item => String(item.id) !== String(product.id)
      );
      console.log('After filter:', updatedBasket);
      localStorage.setItem('basket', JSON.stringify(updatedBasket));
      li.remove();
    });
    
  });
  
  
});
document.querySelector('.icon-back').addEventListener('click', () => {
  history.back();
});


