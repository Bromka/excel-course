import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';

export class Table extends ExcelComponent {
  static className = 'excel__table';
  constructor($root) {
    super($root, {
      listeners: ['mousedown'],
      name: 'table',
    });
  }
  toHTML() {
    return createTable(20)
  }
  onMousedown(e) {
    if (e.target.dataset.resize) {
      console.log('start resizing: ', e.target.dataset.resize)
    }
  }
}
