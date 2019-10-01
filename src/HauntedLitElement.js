import { LitElement } from 'lit-element';
import { State } from 'haunted/core.js';

export class HauntedLitElement extends LitElement {
  constructor() {
    super();
    this.haunted = new State(() => this.requestUpdate(), this);
  }

  update(_changedProperties) {
    this.haunted.run(() => super.update(_changedProperties));
  }
}
