const charCode = {
  A: 65,
  Z: 90,
}
export function createTable(row = 15) {
  let table = '';
  const lineTables = `<div class="table-line-col" data-line="col"></div><div class="table-line-row" data-line="row"></div>`;
  table += lineTables;
  for (let i=0; i<row+1; i++) {
    table += createRow(i);
  }
  return table;
}
function createRow(rowNumber) {
  const rowResizeBlock = `<div data-resize="row" class="row-resize"></div>`
  const rowInfoData = rowNumber === 0 ? '' : rowNumber+rowResizeBlock;
  const rowData = `<div class="row-data">${createColumn(rowNumber)}</div>`;
  let Row = ''
  Row += `<div class="row" data-res="row">
                <div class="row-info">
                    ${rowInfoData}
                    
                    
                </div>
                ${rowData}
            </div>`

  return Row
}
function createColumn(rowNumber) {
  let columns = ``;
  for (let i = charCode.A; i < charCode.Z + 1; i++) {
    columns += columnData(rowNumber, i)
  }
  return columns;
}

function columnData(rowNumber, index) {
  const Data = rowNumber === 0 ? `<div class="column" data-res="column" data-column-number="${index-charCode.A}">${String.fromCharCode(index)}<div class="col-resize" data-resize="col"></div></div>` : `<div class="cell" contenteditable spellcheck="false" data-column-number="${index-charCode.A}"></div>`;
  return Data;
}
