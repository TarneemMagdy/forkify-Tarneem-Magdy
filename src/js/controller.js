import icons from '../img/icons.svg'
import 'regenerator-runtime/runtime';
import 'core-js/stable'

import * as model from './model.js'
import recipeView from './views/recipeView.js';

import searchView from './views/searchView.js';

import paginationView from './views/paginationView.js';
import ResultsView from './views/resultsView.js';
import bookmarkView from './views/bookmarkView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';







// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
if (module.hot) {
  module.hot.accept()
  
}
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);
    if (!id) return;
    // loading recipes
   recipeView.spinner()
// update
ResultsView.update(model.getSearchResultsPage());
 bookmarkView.render(model.state.bookmarks);
// loading recipes
   await model.loadRecipe(id)
  // const recipe =model.state.recipe




// render recipes

recipeView.render(model.state.recipe)

// // test
//   controlServings();
 
  } catch (error) {
    console.error(error);
    recipeView.renderError()
  }
};
const controlSearchResults=async function(){

 try {
   ResultsView.spinner();
   console.log('view',ResultsView);
   

   // get query
   const query = searchView.getQuery();
   if (!query) return;
   //  load search
   await model.loadSearchResults(query);
   // render search
   ResultsView.render(model.getSearchResultsPage());
  //  console.log('res2', model.state.search.results);
 
  // render initial button 
  paginationView.render(model.state.search)
 
 } catch (error) {
  console.error(error);
  
  
 }
}



const controlPagination=function(goto){
     ResultsView.render(model.getSearchResultsPage(goto));
     //  console.log('res2', model.state.search.results);
     // render initial button
     paginationView.render(model.state.search);
  
}
const controlServings=function(newServings){
  // update servings(state)
    model.updateServings(newServings);
  // render servings
// recipeView.render(model.state.recipe);
recipeView.update(model.state.recipe);
}

const controlBookmark=function(){
  // add /remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  
  console.log('bookmark',model.state.recipe);
// update recipe
 recipeView.update(model.state.recipe);
//  render bookmarks
bookmarkView.render(model.state.bookmarks)
  
}

const controlAddRecipe=async function(newRecipe){
  try{

// show loading spinner

addRecipeView.spinner()
// upload recipe
 await model.uploadRecipe(newRecipe)
  console.log(model.state.recipe);

  // render recipe
  recipeView.render(model.state.recipe)

  // render bookmark view
  bookmarkView.render(model.state.bookmarks)

  // change id from url
  window.history.pushState(null,'',`#${model.state.recipe.id}`)
  // succes message
  addRecipeView.renderMessage()
    setTimeout(() => {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  }
  catch(err){
    console.error(err)
    addRecipeView.renderError(err.message)
   
    
 
  }

}

const controlAddCart=function(){
   model.getCartData()

    
}




const init=function(){
   recipeView.addHandlerRender(controlRecipes)
   recipeView.addHandelerUpdateServings(controlServings)
   recipeView.addHndelerBookmark(controlBookmark)
   searchView.addHandlerSearch(controlSearchResults)
   paginationView.addHandlerRenderClick(controlPagination)
   addRecipeView.addHandlerUpload(controlAddRecipe)
  recipeView.addHandlerBasket(controlAddCart)

  console.log('hellp');
  
   
  
}
init()
// showRecipe();
// Import the library


// Convert decimal to fraction


// console.log(frac.toString());



// window.addEventListener('load',showRecipe)
// window.addEventListener('hashchange',showRecipe)
