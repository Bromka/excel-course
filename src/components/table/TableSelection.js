const selectedClass = 'selected'
export class TableSelection {
  constructor() {
    this.group = [];
    this.current = null;
  }

  select($el) {
    this.unSelectAll();
    $el.addClass(selectedClass);
    this.current = $el;
    this.group[0] = $el;
  }

  unSelectAll() {
    this.group.forEach((item) => {
      item.removeClass(selectedClass);
    });
  }

  unSelectCell($cell) {
    const cellIndex = this.indexOf($cell);
    $cell.removeClass(selectedClass);
    this.group.splice(cellIndex, cellIndex + 1);
  }

  selectGroup($el, $root) {
    const firstCell = this.current.$el.dataset;
    let $cell
    console.log(this.group);
    this.unSelectAll()
    this.group = []
    const lastCell = $el.$el.dataset;
    const _ = parseInt
    if (firstCell.columnNumber != lastCell.columnNumber || firstCell.rowNumber != lastCell.rowNumber) {
      for (let i = Math.min(_(firstCell.columnNumber), _(lastCell.columnNumber)); i <= Math.max(_(firstCell.columnNumber), _(lastCell.columnNumber)); i++) {
        for (let j = Math.min(_(firstCell.rowNumber),
            _(lastCell.rowNumber)); j <=
             Math.max(_(firstCell.rowNumber), _(lastCell.rowNumber)); j++) {
          $cell = $root.find(`[data-id="${j}:${i}"]`);
          $cell.addClass(selectedClass);
          this.group.push($cell);
        }
      }
    } else if (this.indexOf($el) != -1) {
      this.unSelectAll();
      this.group = []
    }
  }

  changeCell(key) {
    console.log(key);
    switch (key) {


    }
  }

  indexOf($el) {
    return this.group.findIndex((item) => {
      if (item.$el == $el.$el) {
        return true;
      }
    })
  }
}

