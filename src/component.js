import { HauntedLitElement } from './HauntedLitElement.js';

export const litElementComponent = (renderer, props = {}, baseCls = HauntedLitElement) =>
  class extends baseCls {
    static get styles() {
      return props.styles || [];
    }

    static get properties() {
      return props.properties || {};
    }

    render() {
      return renderer.call(this, this);
    }
  };
