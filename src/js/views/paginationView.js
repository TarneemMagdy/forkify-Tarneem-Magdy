import { RES_PER_PAGE } from "../config";
import { state } from "../model";
import View from "./view";
import icons from 'url:../../img/icons.svg';
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  addHandlerRenderClick(handler) {
    this._parentElement.addEventListener('click',function(e){
        e.preventDefault()
     const btn=   e.target.closest('.btn--inline')
      console.log(btn);
      if(!btn) return;
     const goToPage = +btn.dataset.goto;
    console.log(goToPage);
    
     handler(goToPage)
     
    })
  }
  _generateMarkup() {
    console.log('data', this._data);
    const currPage = this._data.page;

    const numPages = Math.ceil(
      this._data.results.length / state.search.resultsPage
    );
    console.log(numPages);

    // page1,other pages
    if (currPage === 1 && numPages > 1) {
      return ` <button data-goto=${
        currPage + 1
      } class="btn--inline pagination__btn--next">
            <span>Page ${currPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
          
       <span class='pagination__all-pages'>All Pages (${numPages})</span>
      
          `;
    }

    //   last page
    if (this._data.page === numPages && numPages > 1) {
      return `<button data-goto=${
        currPage - 1
      } class="btn--inline pagination__btn--prev ">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currPage - 1}</span>
          </button>
         <span class='pagination__all-pages'>All Pages (${numPages})</span>`;
    }
    // other page
    if (currPage < numPages) {
      return `<button data-goto=${
        currPage - 1
      } class="btn--inline pagination__btn--prev ">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currPage - 1}</span>
          </button>
          <button  data-goto=${
            currPage + 1
          } class="btn--inline pagination__btn--next">
            <span>Page ${currPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button> 
           <span class='pagination__all-pages'>All Pages (${numPages})</span>`;
          
    }
    // page1,no other pages

    return '';
  }
}
export default new PaginationView();