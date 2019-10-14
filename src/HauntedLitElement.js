import { LitElement } from 'lit-element';
import { State } from 'haunted/core.js';

const defer = Promise.resolve().then.bind(Promise.resolve());

export class HauntedLitElement extends LitElement {
  constructor() {
    super();
    this.haunted = new State(() => this.requestUpdate(), this);
  }

  update(_changedProperties) {
    this.haunted.run(() => {
      super.update(_changedProperties);
    });
  }

  updated(_changedProperties) {
    super.updated(_changedProperties);
    this.haunted.runLayoutEffects();
    defer(() => this.haunted.runEffects());
  }

  disconnectedCallback() {
    this.haunted.teardown();
    super.disconnectedCallback();
  }
}
