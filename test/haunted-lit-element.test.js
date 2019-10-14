import { useState, useEffect, useCallback, useLayoutEffect, useMemo } from 'haunted';
import { html, fixture, expect, fixtureCleanup } from '@open-wc/testing';
import { component } from '../src/component.js';

const runEffects = () => new Promise(resolve => setTimeout(resolve));

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
    await runEffects();
    expect(el).shadowDom.to.equal(`<p>1</p><button>+</button>`);
  });

  it('checks pure useEffect works', async () => {
    let isCleanedUp = false;
    const renderer = () => {
      useEffect(() => {
        console.log('use effect');
        isCleanedUp = false;
        return () => {
          console.log('clean up');
          isCleanedUp = true;
        };
      }, []);
      return html`
        ...
      `;
    };
    register('test-el-4', renderer);
    await fixture(
      html`
        <test-el-4></test-el-4>
      `,
    );
    expect(isCleanedUp).to.equal(false);
    fixtureCleanup();
    expect(isCleanedUp).to.equal(true);
  });

  it('checks haunted useEffect works', async () => {
    let isCleanedUp = false;
    const renderer = () => {
      const [val, setVal] = useState(null);
      const [loading, setLoading] = useState(true);
      useEffect(() => {
        isCleanedUp = false;
        setVal(loading ? '...' : 'loaded');
        return () => {
          isCleanedUp = true;
        };
      }, [loading]);
      return html`
        <p>${val}</p>
        <button @click=${() => setLoading(false)}></button>
      `;
    };
    register('test-el-5', renderer);
    const el = await fixture(
      html`
        <test-el-5></test-el-5>
      `,
    );
    expect(el).shadowDom.to.equal(`<p>...</p><button></button>`);
    expect(isCleanedUp).to.equal(false);
    el.shadowRoot.querySelector('button').click();
    await runEffects();
    expect(el).shadowDom.to.equal(`<p>loaded</p><button></button>`);
    expect(isCleanedUp).to.equal(false);
    fixtureCleanup();
    expect(isCleanedUp).to.equal(true);
  });

  it('checks pure useLayoutEffect works', async () => {
    let isCleanedUp = false;
    const renderer = () => {
      useLayoutEffect(() => {
        console.log('use effect');
        isCleanedUp = false;
        return () => {
          console.log('clean up');
          isCleanedUp = true;
        };
      }, []);
      return html`
        ...
      `;
    };
    register('test-el-6', renderer);
    await fixture(
      html`
        <test-el-6></test-el-6>
      `,
    );
    expect(isCleanedUp).to.equal(false);
    fixtureCleanup();
    expect(isCleanedUp).to.equal(true);
  });

  it('checks haunted useLayoutEffect works', async () => {
    let isCleanedUp = false;
    const renderer = ({ shadowRoot }) => {
      const [loading, setLoading] = useState(true);
      useLayoutEffect(() => {
        isCleanedUp = false;
        // eslint-disable-next-line no-param-reassign
        shadowRoot.querySelector('p').innerText = loading ? '...' : 'loaded';
        return () => {
          isCleanedUp = true;
        };
      }, [loading]);
      return html`
        <p></p>
        <button @click=${() => setLoading(false)}></button>
      `;
    };
    register('test-el-7', renderer);
    const el = await fixture(
      html`
        <test-el-7></test-el-7>
      `,
    );
    expect(el).shadowDom.to.equal(`<p>...</p><button></button>`);
    expect(isCleanedUp).to.equal(false);
    el.shadowRoot.querySelector('button').click();
    await runEffects();
    expect(el).shadowDom.to.equal(`<p>loaded</p><button></button>`);
    expect(isCleanedUp).to.equal(false);
    fixtureCleanup();
    expect(isCleanedUp).to.equal(true);
  });

  it('checks useMemo works', async () => {
    const renderer = () => {
      const a = useMemo(() => 25, []);
      return html`
        ${a}
      `;
    };
    register('test-el-8', renderer);
    const el = await fixture(
      html`
        <test-el-8></test-el-8>
      `,
    );
    expect(el).shadowDom.to.equal(`25`);
  });

  it('checks useMemo works with updates', async () => {
    const renderer = () => {
      const [loading, setLoading] = useState(true);
      const a = useMemo(() => loading, [loading]);
      const onClick = useCallback(() => setLoading(false), []);
      return html`
        <p>${a}</p>
        <button @click=${onClick}></button>
      `;
    };
    register('test-el-9', renderer);
    const el = await fixture(
      html`
        <test-el-9></test-el-9>
      `,
    );
    expect(el).shadowDom.to.equal(`<p>true</p><button></button>`);
    el.shadowRoot.querySelector('button').click();
    await runEffects();
    expect(el).shadowDom.to.equal(`<p>false</p><button></button>`);
  });
});
