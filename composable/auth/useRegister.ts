import type { FormInstance, FormRules } from 'element-plus';
import { IRule } from '~~/utils/helpes/formHelper';

const useRegister = () => {
  const formInstance = ref<FormInstance>();

  return {
    formInstance,
  }
}