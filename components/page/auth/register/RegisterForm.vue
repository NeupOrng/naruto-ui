<template>
  <div class="w-[80vw] md:w-[50vw] shadow-lg rounded-md px-5 py-10">
    <div class="w-full flex items-center justify-center py-3 mb-5">
      <p class="font-bold text-2xl">Register</p>
    </div>
    <el-form :model="registerModel" :rules="formRules" ref="formInstance" label-width="140px" label-position="left">
      <el-form-item prop="Username" label="Username">
        <el-input v-model="registerModel.Username" />
      </el-form-item>
      <el-form-item prop="Email" label="Email">
        <el-input v-model="registerModel.Email" />
      </el-form-item>
      <el-form-item prop="Password" label="Password">
        <el-input v-model="registerModel.Password" type="password">
          <template #subfix>

          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="ConfirmPassword" label="Confirm Password">
        <el-input v-model="registerModel.ConfirmPassword" type="password" />
      </el-form-item>
      <div class="w-full flex items-center justify-center">
        <el-button type="primary" @click="onSubmit(formInstance)">Sign Up</el-button>
      </div>
    </el-form>
  </div>
</template>
<script lang="ts">
import { SignUpModel } from '~~/models/request/auth/signUpRequest';
import type { FormInstance } from 'element-plus';
import formHelper, { IRule } from '~~/utils/helpes/formHelper';
import apiCalling from '~~/utils/apiService';
import { notification, enumMessageStatus } from '~~/utils/helpes/notificationHelp';

export default defineComponent({
  name: 'RegisterFormComponent',
  setup() {
    const registerModel = ref<SignUpModel>(new SignUpModel());
    const formInstance = ref<FormInstance>();
    const rules: Record<string, IRule> = {
      Username: { required: true },
      Email: { required: true },
      Password: { required: true },
      ConfirmPassword: { required: true, customRule: (): string => !registerModel.value.IsConfirmPasswordCorrect ? 'Incorrect Confirm Password' : '' }
    };
    const submit = async () => {
      const response = await apiCalling.Register(registerModel.value.SignUpRequest);
      if (response.data.ErrorCode !== 200) {
        notification(response.data.Message, enumMessageStatus.Error);
      } else {
        notification(response.data.Message, enumMessageStatus.Success);
      }
    }
    const onSubmit = formHelper.getSubmitFunction(submit);

    const isShowPassword = ref(false);
    return {
      registerModel,
      formInstance,
      formRules: formHelper.getRules(rules),
      onSubmit,
      isShowPassword
    }
  },
});
</script>