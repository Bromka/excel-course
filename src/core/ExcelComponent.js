import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  // Возвращает шаблон компонента
  constructor($root, options = {}) {
    super($root, options.Listeners);
    this.name = options.name || '';
  }
  toHTML() {
    return ''
  }
  init() {
    this.initDOMListeners()
  }
  destroy() {
    this.removeDOMListeners()
  }
}
