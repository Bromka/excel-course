import {$} from '@core/dom';
export function resizeTable(e, $root) {
  const $resizer = $(e.target);
  if ($resizer.data.resize) {
    const $parent = $resizer.closest('[data-res="true"]');
    const coords = $parent.getCoords();
    let $columns;
    if ($resizer.data.resize === 'col') {
      const columnNumber = $parent.$el.dataset.columnNumber; // col
      $columns = $root.selectAll(`[data-column-number="${columnNumber}"]`); // col
      $resizer.css({bottom: -5000 + 'px'}); // col
    }
    if ($resizer.data.resize === 'row') {
      $resizer.css({right: -5000 + 'px'}); // col
    }

    $resizer.show();
    $root.selectableOff();
    document.onmousemove = (event) => {
      if ($resizer.data.resize === 'col') {
        const valueLine = event.pageX - coords.left; // col
        $resizer.css({left: valueLine + 'px'}); // col
      }

      if ($resizer.data.resize === 'row') {
        // Todo Scroll shift
        console.log(window.scrollY)
        const valueLine = event.pageY - coords.top - window.scrollY; // col
        $resizer.css({top: valueLine + 'px'}); // col
      }
    }
    document.onmouseup = (ev) => {
      $resizer.hide();
      if ($resizer.data.resize === 'col') {
        const delta = ev.pageX - coords.right; // col
        const value = coords.width + delta // col
        $parent.css({width: value + 'px'}); // col
        $resizer.css({left: $parent.getCoords().width - $resizer.$el.offsetWidth + 'px', bottom: 0 + 'px'});
        $columns.forEach(($column) => { // col
          $column.style.width = value + 'px'; // col
        })
      }

      if ($resizer.data.resize === 'row') {
        const delta = ev.pageY - coords.bottom; // col
        const value = coords.height + delta - window.scrollY// col
        $parent.css({height: value + 'px'}); // col
        $resizer.css({top: $parent.getCoords().height - $resizer.$el.offsetHeight + 'px', right: 0 + 'px'});
      }

      $root.selectableOn();
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
}

export function shouldResize(event) {
  return event.target.dataset.resize
}
