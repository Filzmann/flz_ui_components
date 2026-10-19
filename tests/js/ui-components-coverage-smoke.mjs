import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

class ClassList {
  constructor() {
    this.values = new Set();
  }

  add(name) {
    this.values.add(name);
  }

  remove(name) {
    this.values.delete(name);
  }

  toggle(name, force) {
    if (force === undefined ? !this.values.has(name) : force) this.values.add(name);
    else this.values.delete(name);
  }

  contains(name) {
    return this.values.has(name);
  }
}

class Element {
  constructor(tagName = 'div') {
    this.tagName = tagName.toUpperCase();
    this.attributes = new Map();
    this.children = [];
    this.classList = new ClassList();
    this.hidden = false;
    this.checked = false;
    this.disabled = false;
    this.type = '';
  }

  setAttribute(name, value) {
    this.attributes.set(name, String(value));
  }

  getAttribute(name) {
    return this.attributes.has(name) ? this.attributes.get(name) : null;
  }

  removeAttribute(name) {
    this.attributes.delete(name);
  }

  appendChild(child) {
    this.children.push(child);
    return child;
  }

  querySelector() {
    return null;
  }

  querySelectorAll() {
    return [];
  }

  focus() {
    this.focused = true;
  }
}

const listeners = new Map();
const document = {
  activeElement: null,
  body: new Element('body'),
  createElement: (tagName) => new Element(tagName),
  getElementById: () => null,
  querySelector: () => null,
  querySelectorAll: () => [],
  addEventListener(type, handler) {
    if (!listeners.has(type)) listeners.set(type, []);
    listeners.get(type).push(handler);
  }
};
const window = {
  document,
  clearTimeout() {},
  setTimeout(callback) {
    callback();
    return 1;
  },
  confirm: () => false
};
const context = vm.createContext({window, document, console, Array, Boolean, Error, String});

const execute = (relativePath) => {
  const filename = path.join(root, relativePath);
  vm.runInContext(fs.readFileSync(filename, 'utf8'), context, {filename});
};

execute('assets/js/flz-ui-components.js');
assert.ok(window.flzUi);

for (const name of ['plus', 'save', 'delete', 'edit', 'filter', 'upload', 'export', 'reset', 'view', 'image', 'close', 'unknown']) {
  const icon = window.flzUi.createIcon(name, `Icon ${name}`);
  assert.equal(icon.getAttribute('role'), 'img');
  assert.ok(icon.textContent);
}
assert.throws(() => window.flzUi.createIcon('save', '  '), /altText/);

const link = window.flzUi.createButton({href: '/ziel', label: 'Öffnen', variant: 'Primary Unsafe'});
assert.equal(link.tagName, 'A');
assert.equal(link.href, '/ziel');
const iconButton = window.flzUi.createButton({label: 'Speichern', icon: 'save', altText: 'Speichern', iconOnly: true});
assert.equal(iconButton.getAttribute('aria-label'), 'Speichern');
assert.throws(() => window.flzUi.createButton({icon: 'save', label: 'Speichern'}), /altText/);

assert.equal(window.flzUi.validateForm(null), true);
assert.equal(window.flzUi.validateForm({reportValidity: () => false, checkValidity: () => true}), false);
assert.equal(window.flzUi.validateForm({checkValidity: () => true}), true);

const checkedCard = new Element();
const uncheckedCard = new Element();
checkedCard.querySelector = () => ({checked: true});
uncheckedCard.querySelector = () => ({checked: false});
window.flzUi.updateChoiceCardState({querySelectorAll: () => [checkedCard, uncheckedCard]});
assert.equal(checkedCard.classList.contains('is-checked'), true);
assert.equal(uncheckedCard.classList.contains('is-checked'), false);

const field = new Element();
const validTarget = new Element('input');
validTarget.closest = (selector) => selector === '.flz-ui-field' ? field : null;
validTarget.checkValidity = () => true;
listeners.get('invalid')[0]({target: validTarget});
assert.equal(field.classList.contains('flz-ui-field--has-error'), true);
validTarget.setAttribute('aria-invalid', 'true');
listeners.get('input')[0]({target: validTarget, isComposing: false});
assert.equal(field.classList.contains('flz-ui-field--has-error'), false);
assert.equal(validTarget.getAttribute('aria-invalid'), null);

let prevented = false;
let stopped = false;
const confirmation = new Element('button');
confirmation.setAttribute('data-flz-ui-confirm', 'Wirklich?');
confirmation.closest = (selector) => selector === '[data-flz-ui-confirm]' ? confirmation : null;
listeners.get('click')[0]({
  target: confirmation,
  preventDefault: () => { prevented = true; },
  stopImmediatePropagation: () => { stopped = true; }
});
assert.equal(prevented, true);
assert.equal(stopped, true);

listeners.get('DOMContentLoaded')[0]();
listeners.get('keydown')[0]({key: 'Escape'});

const floatingTrigger = new Element('button');
const floatingDrawer = new Element('section');
const firstPanelControl = new Element('button');
const lastPanelControl = new Element('button');
const floatingPanel = new Element('aside');
floatingPanel.classList.add('flz-ui-floating-panel');
floatingPanel.classList.add('is-open');
floatingPanel.querySelector = (selector) => {
  if (selector === '[data-flz-ui-floating-panel-open]') return floatingTrigger;
  if (selector === '.flz-ui-floating-panel__drawer') return floatingDrawer;
  return null;
};
floatingPanel.querySelectorAll = () => [firstPanelControl, lastPanelControl];
floatingPanel.contains = (element) => element === firstPanelControl || element === lastPanelControl;
document.querySelectorAll = (selector) => selector === '.flz-ui-floating-panel.is-open' ? [floatingPanel] : [];
document.querySelector = (selector) => selector === '.flz-ui-floating-panel.is-open' ? floatingPanel : null;

document.activeElement = lastPanelControl;
let tabPrevented = false;
listeners.get('keydown')[0]({
  key: 'Tab',
  shiftKey: false,
  preventDefault: () => { tabPrevented = true; }
});
assert.equal(tabPrevented, true);
assert.equal(firstPanelControl.focused, true);

document.activeElement = firstPanelControl;
let reverseTabPrevented = false;
listeners.get('keydown')[0]({
  key: 'Tab',
  shiftKey: true,
  preventDefault: () => { reverseTabPrevented = true; }
});
assert.equal(reverseTabPrevented, true);
assert.equal(lastPanelControl.focused, true);

listeners.get('keydown')[0]({key: 'Escape'});
assert.equal(floatingPanel.classList.contains('is-open'), false);
assert.equal(floatingTrigger.getAttribute('aria-expanded'), 'false');
assert.equal(floatingTrigger.focused, true);

const matrixTemplate = new Element('tr');
const matrixRow = new Element('tr');
const matrixField = new Element('input');
matrixField.setAttribute('name', 'slots[__index__][start]');
matrixField.setAttribute('id', 'slot-__index__');
matrixField.setAttribute('disabled', 'disabled');
matrixField.disabled = true;
matrixRow.querySelectorAll = () => [matrixField];
matrixRow.querySelector = () => matrixField;
matrixRow.removeAttribute = Element.prototype.removeAttribute;
matrixTemplate.cloneNode = () => matrixRow;
const matrixBody = new Element('tbody');
matrixBody.setAttribute('data-flz-ui-next-index', '2');
matrixBody.querySelector = (selector) => selector === '[data-flz-ui-field-matrix-template]' ? matrixTemplate : null;
matrixBody.insertBefore = (row, template) => { matrixBody.inserted = {row, template}; };
const matrixButton = new Element('button');
matrixButton.setAttribute('data-flz-ui-add-matrix-row', 'slots');
matrixButton.closest = (selector) => selector === '[data-flz-ui-add-matrix-row]' ? matrixButton : null;
const originalQuerySelector = document.querySelector;
document.querySelector = (selector) => selector === '[data-flz-ui-field-matrix="slots"]' ? matrixBody : originalQuerySelector(selector);
let matrixPrevented = false;
listeners.get('click')[0]({
  target: matrixButton,
  preventDefault: () => { matrixPrevented = true; }
});
assert.equal(matrixPrevented, true);
assert.equal(matrixBody.getAttribute('data-flz-ui-next-index'), '3');
assert.equal(matrixField.getAttribute('name'), 'slots[2][start]');
assert.equal(matrixField.getAttribute('id'), 'slot-2');
assert.equal(matrixField.disabled, false);
assert.equal(matrixField.focused, true);
assert.equal(matrixBody.inserted.template, matrixTemplate);

const editableRow = new Element('tr');
const editableField = new Element('input');
editableRow.querySelector = () => editableField;
const editButton = new Element('button');
editButton.closest = (selector) => {
  if (selector === '[data-flz-ui-edit-row]') return editButton;
  if (selector === '[data-flz-ui-editable-row]') return editableRow;
  return null;
};
let editPrevented = false;
listeners.get('click')[0]({
  target: editButton,
  preventDefault: () => { editPrevented = true; }
});
assert.equal(editPrevented, true);
assert.equal(editableRow.classList.contains('is-editing'), true);
assert.equal(editableField.focused, true);

const registered = new Map();
const createElement = (type, props, ...children) => ({type, props: props || {}, children});
window.wp = {
  blocks: {
    getBlockType: () => null,
    registerBlockType(name, definition) {
      registered.set(name, definition);
    }
  },
  element: {createElement, Fragment: 'fragment'},
  blockEditor: {InspectorControls: 'inspector', useBlockProps: () => ({className: 'editor'})},
  components: {PanelBody: 'panel', TextControl: 'text', ToggleControl: 'toggle', SelectControl: 'select'}
};
window.flzUiShortcodeBlocks = [{
  name: 'flz/test',
  shortcode: 'flz_test',
  title: 'Testblock',
  description: 'Beschreibung',
  attributes: {title: {type: 'string'}, active: {type: 'boolean'}},
  fields: [
    {name: 'active', control: 'toggle', label: 'Aktiv'},
    {name: 'title', control: 'select', options: [{label: 'A', value: 'a'}]},
    {name: 'free', control: 'text'}
  ]
}];
execute('assets/js/flz-ui-shortcode-blocks.js');
const definition = registered.get('flz/test');
assert.ok(definition);
assert.equal(definition.save(), null);
assert.equal(definition.transforms.from[0].attributes.active.shortcode({named: {active: 'true'}}), true);
assert.equal(definition.transforms.from[0].attributes.title.shortcode({named: {title: 'Hallo'}}), 'Hallo');
const rendered = definition.edit({attributes: {title: 'a', active: true}, setAttributes() {}});
assert.equal(rendered.type, 'fragment');

const inspector = rendered.children[0];
const inspectorFields = inspector.children[0].children[0];
assert.equal(inspectorFields[0].type, 'toggle');
assert.equal(inspectorFields[0].props.checked, true);
assert.equal(inspectorFields[1].type, 'select');
assert.deepEqual(inspectorFields[1].props.options, [{label: 'A', value: 'a'}]);
assert.equal(inspectorFields[2].type, 'text');
