import icons from 'url:../../img/icons.svg';

export default class View {
  _data;
  render(data,render=true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    if(!render) return markup;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
   
  }
  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDom.querySelectorAll('*'));
    const currElement = Array.from(this._parentElement.querySelectorAll('*'));
    // console.log(newElements,currElement);
    newElements.forEach((newEl, i) => {
      const currEl = currElement[i];
      // console.log(currEl,newEl.isEqualNode(currEl));

      if (
        !newEl.isEqualNode(currEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // console.log('first',newEl.firstChild?.nodeValue.trim())

        currEl.textContent = newEl.textContent;
      }
      if (!newEl.isEqualNode(currEl)) {
        // console.log('att',newEl.attributes);
        // console.log('arrt',Array.from(newEl.attributes));

        Array.from(newEl.attributes).forEach(attr => {
          // console.log('artr',attr);

          currEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }
  _clear() {
    this._parentElement.innerHTML = '';
  }
  spinner = function () {
    const markup = `<div class="spinner">
              <svg>
                <use href="${icons}#icon-loader"></use>
              </svg>
            </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  };

  renderError(messageError = this._messageEror) {
    const markup = `
       <div class="error">
                <div>
                  <svg>
                    <use href="${icons}_icon-alert-triangle"></use>
                  </svg>
                </div>
                <p>${messageError}</p>
              </div> `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  renderMessage(message = this._messageSuccess) {
    const markup = `
         <div class="message">
                        <div>
                          <svg>
                            <use href="${icons}_icon-smile"></use>
                          </svg>
                        </div>
                        <p>
                    ${message}
                        </p>
                      </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
