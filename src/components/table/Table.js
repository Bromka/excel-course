import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {$} from '@core/dom';

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
    if (e.target.dataset.resize == 'col') {
      const $resizer = $(e.target);
      const $parent = $resizer.closest('[data-res="column"]');
      const coords = $parent.getCoords();
      const $line = $(document.querySelector('[data-line="col"]'));
      console.log($line)
      const columnNumber = $parent.$el.dataset.columnNumber;
      const $columns = document.querySelectorAll(`[data-column-number="${columnNumber}"]`);
      // const MIN_CELL_WIDTH = 40;
      $line.show();
      $line.setLeft(coords.right-$line.$el.offsetWidth);
      this.$root.selectableOff();
      document.onmousemove = (event) => {
        const valueLine = event.pageX-$line.$el.offsetWidth;
        if (valueLine >= coords.left) {
          $line.setLeft(valueLine);
        }
      }
      document.onmouseup = (ev) =>{
        const delta = ev.pageX - coords.right;
        const value = coords.width + delta
        $parent.$el.style.width = value + 'px';
        $columns.forEach(($column) =>{
          $column.style.width = value + 'px';
        })
        document.onmousemove = null;
        $line.hide();
        this.$root.selectableOn();
      }
    } else if (e.target.dataset.resize == 'row') {
      const $resizer = $(e.target);
      console.log($resizer);
    }
  }
}

