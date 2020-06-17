import {ExcelComponent} from '@core/ExcelComponent';

export class Header extends ExcelComponent {
  static className = 'excel__header';
  toHTML() {
    return ` <input type="text" class="input" value="Новая таблица">
            <div class="buttons__container">
                <div class="buttons__delete button">
                    <i class="material-icons">delete</i>
                </div>
                <div class="buttons__exit button">
                    <i class="material-icons">exit_to_app</i>
                </div>

            </div>
`
  }
}
