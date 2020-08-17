import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {
  isCell,
  resizeTable,
  shouldResize,
} from '@/components/table/table.functions';
import {TableSelection} from '@/components/table/TableSelection';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      listeners: ['mousedown', 'keydown'],
      name: 'table',
    });
  }

  toHTML() {
    return createTable(20);
  }

  prepare() {
    super.prepare();
    this.selection = new TableSelection();
  }

  init() {
    super.init();
    const $cell = this.$root.find('[data-id="1:1"]');
    this.selection.select($cell);
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeTable(event, this.$root);
    } else if (isCell(event)) {
      const $cell = this.$root.find(`[data-id="${event.target.dataset.id}"]`);
      event.shiftKey ?
          this.selection.selectGroup($cell, this.$root) :
          this.selection.select($cell);
    }
  }
  onKeydown(event) {
    const keys = ['Tab', 'ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'Enter'];
    keys.indexOf(event.key) !== -1 ? this.selection.changeCell(event.key) : null
  }
}

