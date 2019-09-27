import { HauntedLitElement } from './HauntedLitElement.js';

export const litElementComponent = (renderer, propsOrBaseCls = {}, baseCls = HauntedLitElement) => {
  const localProps = typeof propsOrBaseCls === 'object' ? propsOrBaseCls : {};
  const localBaseClass = typeof propsOrBaseCls === 'function' ? propsOrBaseCls : baseCls;

  const retCls = class extends localBaseClass {
    render() {
      return renderer.call(this, this);
    }
  };

  Object.entries(localProps).forEach(([key, val]) => {
    retCls[key] = val;
  });

  return retCls;
};
