import { expect, html } from '@open-wc/testing';
import { css } from 'lit-element';
import compDefault, { HauntedLitElement, component } from '../index.js';

class MyCls extends HauntedLitElement {}

describe('library tests', () => {
  it('can create basic component', () => {
    const comp = compDefault(() => html``);
    expect(comp).to.be.not.null;
    window.customElements.define('my-el', comp);
    const C = window.customElements.get('my-el');
    expect(new C() instanceof HauntedLitElement).to.be.true;
  });

  it('can create basic component with props, styles and custom stuff', () => {
    const properties = { a: { type: String } };
    const styles = css`
      :host {
        display: block;
      }
    `;
    const custom = { a: 'b' };
    const comp = compDefault(() => html``, { properties, styles, custom });
    expect(comp.properties).to.equal(properties);
    expect(comp.styles).to.equal(styles);
    expect(comp.custom).to.equal(custom);
  });

  it('can create basic comp with custom class and props', () => {
    const properties = { a: { type: String } };
    const comp = compDefault(() => html``, MyCls, { properties });
    window.customElements.define('my-custom-el', comp);
    const C = window.customElements.get('my-custom-el');
    expect(new C() instanceof MyCls).to.be.true;
    expect(comp.properties).to.equal(properties);
  });

  it('can create basic comp with custom class as a second param', () => {
    const comp = compDefault(() => html``, MyCls);
    window.customElements.define('my-custom-el-2', comp);
    const C = window.customElements.get('my-custom-el-2');
    expect(new C() instanceof MyCls).to.be.true;
  });

  it('can create basic comp using component', () => {
    const comp = component(() => html``);
    window.customElements.define('my-el-3', comp);
    const C = window.customElements.get('my-el-3');
    expect(new C() instanceof HauntedLitElement).to.be.true;
  });
});
