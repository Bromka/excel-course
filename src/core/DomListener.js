import {capitalize} from '@core/utils';

export class DomListener {
  constructor($root, listeners) {
    if (!$root) {
      throw new Error('$root missing in constructor DomListener')
    }
    this.$root = $root;
    this.listeners = listeners || [];
  }
  initDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = methodName(listener);
      if (!this[method]) {
        throw new Error(`Not found ${method} in Component ${name}`);
      }
      this[method] = this[method].bind(this);
      this.$root.on(listener, this[method]);
    })  
  }
  removeDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = methodName(listener);
      this.$root.off(listener, this[method]);
    })
  }
}

function methodName(string) {
  return 'on' + capitalize(string);
}
