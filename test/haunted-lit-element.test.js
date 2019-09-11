import { useState } from 'haunted';
import { html, fixture, expect } from '@open-wc/testing';
import { litElementComponent } from '../src/component.js';

const register = (name, renderer, props = undefined) =>
  window.customElements.define(name, litElementComponent(renderer, props));

describe('HauntedLitElement', () => {
  it('shows basic text', async () => {
    register(
      'test-el-1',
      () =>
        html`
          Test
        `,
    );
    const el = await fixture(
      html`
        <test-el-1></test-el-1>
      `,
    );
    expect(el).shadowDom.to.equal(`Test`);
  });

  it('checks props are set', async () => {
    const properties = { test: { type: String } };
    register(
      'test-el-2',
      ({ test }) =>
        html`
          test=${test}
        `,
      { properties },
    );
    const el1 = await fixture(
      html`
        <test-el-2></test-el-2>
      `,
    );
    expect(el1).shadowDom.to.equal(`test=`);
    const el2 = await fixture(
      html`
        <test-el-2 test="bla"></test-el-2>
      `,
    );
    expect(el2.test).to.equal('bla');
    expect(el2).shadowDom.to.equal(`test=bla`);
  });

  it('checks haunted works', async () => {
    const renderer = () => {
      const [count, setCount] = useState(0);
      return html`
        <p>${count}</p>
        <button @click=${() => setCount(count + 1)}>+</button>
      `;
    };
    register('test-el-3', renderer);
    const el = await fixture(
      html`
        <test-el-3></test-el-3>
      `,
    );
    expect(el).shadowDom.to.equal(`<p>0</p><button>+</button>`);
    el.shadowRoot.querySelector('button').click();
    await new Promise(resolve => setTimeout(resolve)); // wait for run effects
    expect(el).shadowDom.to.equal(`<p>1</p><button>+</button>`);
  });
});
