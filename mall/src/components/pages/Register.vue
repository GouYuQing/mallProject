<template>
  <div>
    <van-nav-bar title="用户注册" left-text="返回" left-arrow @click-left="goBack" />
    <div class="register-panel">
      <van-field
        v-model="username"
        label="用户名"
        icon="clear"
        placeholder="请输入用户名"
        required
        @click-icon="username=''"
        :error-message="usernameError"
      />
      <van-field
        v-model="password"
        label="密码"
        icon="clear"
        placeholder="请输入密码"
        required
        @click-icon="password=''"
        :error-message="passwordError"
      />
      <div class="register-button">
        <van-button type="primary" @click="checkForm" size="large" :loading="openLoading">马上注册</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/serviceAPI.config.js";
import { Toast } from "vant";
export default {
  data() {
    return {
      username: "",
      password: "",
      openLoading: false, //不开启效果，为了检测是否提交，防止重复提交
      usernameError: '',//用户名出现错误的时候进行提示
      passwordError: ''
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    checkForm() {
      if(this.checkInput()){
        this.axiosRegisterUser()
      }
    },
    checkInput() {//后期将其改为正则表达式
      // console.log('1111111111111');
      let isOk = true;
      if (this.username.length < 4) {
        this.usernameError = "用户名不能少于4位";
        isOk = false;
      } else {
        this.usernameError = '';
      }
      if (this.password.length < 6) {
        this.passwordError = "密码不能少于6位";
        isOk = false;
      } else {
        this.passwordError = '';
      }
      return isOk;
    },
    axiosRegisterUser() {
      axios({
        url: url.registerUser,
        method: "post",
        data: {
          userName: this.username,
          password: this.password
        }
      })
        .then(response => {
          // console.log(response.data.code);
          if (response.data.code == 200) {
            Toast.success("注册成功");
            this.$router.push("/");
          } else {
            // console.log(response.data.message);
            Toast.fail("注册失败");
            this.openLoading = false;
          }
        })
        .catch(error => {
          // console.log(error);
          Toast.fail("注册失败");
          this.openLoading = false;
        });
    }
  }
};
</script>

<style scoped>
.register-panel {
  width: 96%;
  border-radius: 5px;
  margin: 20px auto;
  padding-bottom: 50px;
}
.register-button {
  padding-top: 10px;
}
</style>