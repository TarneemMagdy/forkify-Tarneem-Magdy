import previewView from "./previewView";
import View from "./view";
import icons from 'url:../../img/icons.svg';
class BookmarkView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _messageEror = ` No bookmarks yet. Find a nice recipe and bookmark it :)`;
  _messageSuccess = ``;

  _generateMarkup() {
    console.log(this._data);

    return this._data.map(bookmark=>previewView.render(bookmark,false)).join('');
  }

}
export default new BookmarkView();