/* eslint-disable */
import { computed, reactive } from 'vue';
import type { FormInstance } from 'element-plus';

const getValidator = (rule: () => string) => {
  const ruleForElemetUI = (_: any, __: string, callback: any) => {
    const result = rule();
    if (result !== '') {
      return callback(new Error(result));
    }
    return callback();
  };
  return ruleForElemetUI;
};

const checkIllegalCharacters = (_: any, value: any, callback: any) => {
  if(typeof(value) !== 'object' && /[<>]/.test(value)){
    return callback(new Error('Can not include illegal characters'));
  }
  return callback();
}
export interface IRule {
  customRule?: () => string,
  required?: boolean,
  isTriggerByChange?: boolean;
}

const getRules = (rules: Record<string, IRule>) => {
  const result: Record<string, Array<object>> = {};
  Object.keys(rules).forEach((key) => {
    result[key] = [];
    if (rules[key].required) {
      result[key].push({
        required: true,
        message: computed(() => 'Required'),
        trigger: 'blur',
      })
    }
    if(rules[key].customRule) {
      result[key].push({
        validator: getValidator(rules[key].customRule!),
        trigger: 'blur',
      });
    }
  });
  return reactive(result);
};
const getSubmitFunction = (func: () => void) => {
  const submitFunction = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate(async (valid) => {
      if (valid) {
        func();
      }
    });
  };
  return submitFunction;
};
const resetFormFunction = (func: () => void) => {
  const resetFunction = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.resetFields();
  };
  return resetFunction;
};
export default {
  getRules,
  getSubmitFunction,
  resetFormFunction
};