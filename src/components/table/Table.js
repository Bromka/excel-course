import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resizeTable, shouldResize} from '@/components/table/table.functions';

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

    onMousedown(event) {
      if (shouldResize(event)) {
        resizeTable(event, this.$root)
      }
    }
}

