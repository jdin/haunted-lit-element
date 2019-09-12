import { HauntedLitElement } from './HauntedLitElement.js';

export const litElementComponent = (renderer, props = {}, baseCls = HauntedLitElement) => {
  const retCls = class extends baseCls {
    render() {
      return renderer.call(this, this);
    }
  };

  Object.entries(props).forEach(([key, val]) => {
    retCls[key] = val;
  });

  return retCls;
};
