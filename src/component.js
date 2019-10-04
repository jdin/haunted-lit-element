import { HauntedLitElement } from './HauntedLitElement.js';

export const component = (renderer, propsOrBaseCls = HauntedLitElement, props = {}) => {
  const localProps = typeof propsOrBaseCls === 'object' ? propsOrBaseCls : props;
  const localBaseClass = typeof propsOrBaseCls === 'function' ? propsOrBaseCls : HauntedLitElement;

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
