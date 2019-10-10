import { useState, useEffect, useCallback } from 'haunted';
import { html, fixture, expect, fixtureCleanup } from '@open-wc/testing';
import { component } from '../src/component.js';

const register = (name, renderer, props = undefined) =>
  window.customElements.define(name, component(renderer, props));

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

  it('checks haunted useState and useCallback works', async () => {
    const renderer = () => {
      const [count, setCount] = useState(0);
      const onClick = useCallback(() => {
        setCount(count + 1);
      }, []);
      return html`
        <p>${count}</p>
        <button @click=${onClick}>+</button>
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

  it('checks haunted useEffect works', async () => {
    let isCleanudUp = false;
    const renderer = () => {
      const [val, setVal] = useState(0);
      useEffect(() => {
        setVal(1);
        return () => {
          isCleanudUp = true;
        };
      }, [true]);
      return html`
        <p>${val}</p>
      `;
    };
    register('test-el-4', renderer);
    const el = await fixture(
      html`
        <test-el-4></test-el-4>
      `,
    );
    expect(el).shadowDom.to.equal(`<p>1</p>`);
    expect(isCleanudUp).to.equal(false);
    fixtureCleanup();
    expect(isCleanudUp).to.equal(true);
  });
});
