import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import isString from 'lodash/isString';

// своя реплика для https://www.npmjs.com/package/react-bem-helper, так как нет типов для нее

export const classes = (namespace: string, elementDivider = '__', modifierDivider = '--') => (
  (element = '', modifier: string | string[] | { [p:string]: any } = '', additionalClassName = '') => {
    const cls:string[] = [];
    const elementCls:string = element ? `${namespace}${elementDivider}${element}` : namespace;

    cls.push(elementCls);

    if (modifier) {
      if (isString(modifier)) cls.push(`${elementCls}${modifierDivider}${modifier}`);
      if (isArray(modifier)) modifier.forEach((mod:string) => cls.push(`${elementCls}--${mod}`));
      if (isObject(modifier)) {
        Object.keys(modifier).forEach((key) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          if (modifier[key]) {
            cls.push(`${elementCls}--${key}`);
          }
        });
      }
    }

    if (additionalClassName) {
      if (isString(additionalClassName)) cls.push(additionalClassName);
      if (isArray(additionalClassName)) {
        additionalClassName.forEach((item:string) => cls.push(item));
      }
      if (isObject(additionalClassName)) {
        Object.keys(additionalClassName).forEach((key:string) => {
          if (additionalClassName[key]) {
            cls.push(`${elementCls}--${key}`);
          }
        });
      }
    }

    return { className: cls.join(' ') };
  }
);
