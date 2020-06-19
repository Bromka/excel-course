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
        console.log(e.target.dataset)
        if (e.target.dataset.resize === 'col') {
            const $resizer = $(e.target);
            const $parent = $resizer.closest('[data-res="column"]');
            const coords = $parent.getCoords();
            const $line = $(document.querySelector('[data-line="col"]'));
            const columnNumber = $parent.$el.dataset.columnNumber;
            const $columns = document.querySelectorAll(`[data-column-number="${columnNumber}"]`);
            $line.show();
            $line.setLeft(coords.right - $line.$el.offsetWidth);
            this.$root.selectableOff();
            document.onmousemove = (event) => {
                const valueLine = event.clientX - $line.$el.offsetWidth;
                if (valueLine >= coords.left) {
                    $line.setLeft(valueLine);
                } else {
                    $line.setLeft(coords.left)
                }
            }
            document.onmouseup = (ev) => {
                const delta = ev.pageX - coords.right;
                const value = coords.width + delta
                $parent.$el.style.width = value + 'px';
                $columns.forEach(($column) => {
                    $column.style.width = value + 'px';
                })
                document.onmousemove = null;
                $line.hide();
                this.$root.selectableOn();
            }
        } else if (e.target.dataset.resize === 'row') {
            const $resizer = $(e.target);
            const $parent = $resizer.closest('[data-res="row"]');
            const coords = $parent.getCoords();
            const $line = $(document.querySelector('[data-line="row"]'));
            console.log($line)

            $line.show();
            this.$root.selectableOff();
            const rootCoords = this.$root.getCoords();
            document.onmousemove = (event) => {
                const valueLine = event.clientY - rootCoords.top - $line.$el.offsetHeight;
                if (event.pageY > coords.top) {
                    $line.setTop(valueLine);
                } else {
                    $line.setTop(coords.top - rootCoords.top)
                }
            }
            document.onmouseup = (ev) => {
                const delta = ev.clientY - coords.bottom;
                const value = coords.height + delta
                console.log(delta);
                $parent.$el.style.height = value + 'px';
                document.onmousemove = null;
                $line.hide();
                this.$root.selectableOn();
            }
        } else {
            document.onmouseup = null
        }
    }
}

