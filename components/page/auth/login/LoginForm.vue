<template>
  <div class="w-[80vw] md:w-[50vw] shadow-lg rounded-md px-5 py-10">
    <div class="w-full flex items-center justify-center py-3 mb-5">
      <p class="font-bold text-2xl">Login</p>
    </div>
    <el-form :model="loginModel" :rules="formRules" ref="formInstance" label-width="140px" label-position="left">
      <el-form-item prop="Email" label="Email">
        <el-input v-model="loginModel.Email" />
      </el-form-item>
      <el-form-item prop="Password" label="Password">
        <el-input v-model="loginModel.Password" type="password">
          <template #subfix>

          </template>
        </el-input>
      </el-form-item>
      <div class="w-full flex items-center justify-center">
        <el-button type="primary" :loading="isLoading" @click="onSubmit(formInstance)">Sign In</el-button>
      </div>
    </el-form>
  </div>
</template>
<script lang="ts">
import { LoginRequest } from '~~/models/request/auth/loginRequest';
import type { FormInstance } from 'element-plus';
import formHelper, { IRule } from '~~/utils/helpes/formHelper';
import apiCalling from '~~/utils/apiService';
import { notification, enumMessageStatus } from '~~/utils/helpes/notificationHelp';
import { useAuthStore } from '~~/store/auth';

export default defineComponent({
  name: 'LoginFormComponent',
  setup() {
    const loginModel = ref<LoginRequest>(new LoginRequest());
    const formInstance = ref<FormInstance>();
    const authStore = useAuthStore();
    const isLoading = ref(false);

    console.log(authStore.GetToken);

    const rules: Record<string, IRule> = {
      Email: { required: true },
      Password: { required: true }
    };
    const submit = async () => {
      isLoading.value = true;
      const response = await apiCalling.Login(loginModel.value.GetLoginRequest);
      if (response.data.ErrorCode !== 200) {
        notification(response.data.Message, enumMessageStatus.Error);
      } else {
        authStore.UpdateToken(response.data.Data.Token);
        notification(response.data.Message, enumMessageStatus.Success);
        console.log(authStore.GetToken);
      }
      isLoading.value = false;
    }
    const onSubmit = formHelper.getSubmitFunction(submit);

    const isShowPassword = ref(false);
    return {
      loginModel,
      formInstance,
      formRules: formHelper.getRules(rules),
      onSubmit,
      isShowPassword,
      isLoading
    }
  },
});
</script>