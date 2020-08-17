// eslint-disable-next-line no-unused-vars
class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'
        ? document.querySelector(selector)
        : selector;
  }
  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this;
    } else return this.$el.outerHTML.trim();
  }
  clear() {
    this.html('');
    return this;
  }
  append(node) {
    if (node.$el) {
      node = node.$el
    }
    if (Element.prototype.append) {
      this.$el.appendChild(node)
      return this
    } else {
      this.$el.appendChild(node);
      return this
    }
  }
  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback);
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback);
  }

  closest(selector) {
    return $(this.$el.closest(selector));
  }
  getCoords() {
    return this.$el.getBoundingClientRect();
  }
  show() {
    this.$el.style.opacity = '1';
  }
  setLeft(coord) {
    this.$el.style.left = parseInt(coord) + 'px';
  }

  setTop(coord) {
    this.$el.style.top = parseInt(coord) + 'px';
  }
  hide() {
    this.$el.style.opacity = '0';
  }
  selectableOff() {
    this.$el.style.userSelect = 'none';
  }

  selectableOn() {
    this.$el.style.userSelect = 'auto';
  }
  get data() {
    return this.$el.dataset;
  }

  find(selector) {
    return $(this.$el.querySelector(selector))
  }

  selectAll(selector) {
    return this.$el.querySelectorAll(selector)
  }
  css(style = {}) {
    Object.keys(style).forEach((key) =>{
      this.$el.style[key] = style[key];
    })
  }

  addClass(className) {
    this.$el.classList.add(className)
  }
  removeClass(className) {
    this.$el.classList.remove(className)
  }
}

export function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }
  return $(el);
}
