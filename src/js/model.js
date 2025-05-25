import { API_URL, KEY, RES_PER_PAGE } from './config.js';
import { AJAX} from './helpers.js';
import recipeView from './views/recipeView.js';
import resultsView from './views/resultsView.js';
export const state = {
  recipe: {},
  search: {
    query: '',
    resultsPage: RES_PER_PAGE,
    page: 1,
    results: [],
  },
  bookmarks: [],
  cart:[],
  // productsCart:[]
};

const createRecipeObject = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    publisher: recipe.publisher,
    title: recipe.title,
    sourceUrl: recipe.source_url,
    servings: recipe.servings,
    ingredients: recipe.ingredients,
    image: recipe.image_url,
    cookingTime: recipe.cooking_time,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}/${id}`);

    state.recipe = createRecipeObject(data);
    if (state.bookmarks.some(ele => ele.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
    // console.log(state.recipe);
  } catch (error) {
    // console.error(`${error.message} `);
    throw error;
  }
};


export const loadSearchResults = async function (query) {
  try {
    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);

    state.search.results = data.data.recipes.map(res => {
      return {
        id: res.id,
        publisher: res.publisher,
        title: res.title,
        image: res.image_url,
        ...(res.key && { key: res.key }),
      };
    });
    state.search.page = 1;
  } catch (error) {
    // console.error(`${error.message} `);
    throw error;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPage;
  const end = page * state.search.resultsPage;
  console.log(start, end);

  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    // new quanitity=oldquantity * newservings / oldservings
    const newQty = (ing.quantity * newServings) / state.recipe.servings;
    ing.quantity = newQty;
  });
  state.recipe.servings = newServings;
};


export const addBookmark = function (recipe) {
  // add bookmark
  state.bookmarks.push(recipe);

  // make current recipe bookmark

  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  presistBookmark();
};
const presistBookmark = function () {
  localStorage.setItem('bookmark', JSON.stringify(state.bookmarks));
};


export const deleteBookmark = function (id) {
  // delete bookmark
  const index = state.bookmarks.findIndex(bookmark => bookmark.id);
  state.bookmarks.splice(index, 1);

  // make current recipe bookmark

  if (id === state.recipe.id) state.recipe.bookmarked = false;
  presistBookmark();
};
// Update the cart length in the navigation button
export const updateCartLengthInNav = function () {
  // Retrieve the cart from localStorage
  const basket = JSON.parse(localStorage.getItem('basket')) || [];

  // Get the 'Add Cart' button element
  const btnAddCart = document.querySelector('.nav__btn--add-cart'); // Adjust the selector to match your button

  // Update the button's text to show the number of items in the cart
  if (btnAddCart) {
    const basketLength = basket.length;
    btnAddCart.querySelector('span').textContent = `(${basketLength}) Add cart`;
  }
};


export const getCartData = async function () {
  const items = JSON.parse(localStorage.getItem('basket')) || [];

  const chosenData = [];



  for (const item of items) {
    let id;

    // لو العنصر كائن فيه خاصية id خذها
    if (typeof item === 'object' && item !== null && item.id) {
      id = item.id;
    } else if (typeof item === 'string' || typeof item === 'number') {
      id = item;
    } else {
      console.warn('Invalid ID skipped:', item);
      continue;
    }

    try {
      const data = await AJAX(`${API_URL}/${id}?key=${KEY}`);
      const recipe = createRecipeObject(data);
      chosenData.push(recipe);
    } catch (err) {
      console.error('Error loading recipe from basket:', err);
    }
  }

  // خزّن البيانات كاملة (مش الـ ID بس) في localStorage
  // localStorage.setItem('productsCart', JSON.stringify(chosenData));
};

   









const init = function () {
  const storage = localStorage.getItem('bookmark');
  if (storage) state.bookmarks = JSON.parse(storage);
   let basket = JSON.parse(localStorage.getItem('basket')) || [];
   if(basket)   state.cart = basket;
   updateCartLengthInNav()

};
init();
console.log('state', state.bookmarks);

//  const clearBookMark=function(){
//   localStorage.clear('bookmark')
//  }

export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].split(',').map(el=>el.trim())

        const [quantity, unit, description] = ingArr;
        if (ingArr.length !== 3)
          throw new Error(
            'wrong ingredient formate ! please use correct formate : )'
          );
        return { quantity: quantity ? +quantity : '', unit, description };
      });
    const recipe = {
      publisher: newRecipe.publisher,
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      servings: +newRecipe.servings,
      image_url: newRecipe.image,
      cooking_time: +newRecipe.cookingTime,
      ingredients,
    };
    // console.log(recipe);
    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
    state.recipe = createRecipeObject(data);
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};
