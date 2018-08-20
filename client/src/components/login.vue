<template>
  <div class="container">
      <input type="text" name="username" id="username" v-model="user.username" placeholder="用户名"><br />
      <input type="text" name="password" id="password" v-model="user.password" placeholder="密码"><br />
      <input type="button" value="登录" @click="login">
      <input type="button" value="主页" @click="home">
  </div>
</template>

<script>
// import apiclass from "@/api/classindex";
import api from "@/api/index";
export default {
  name: "login",
  data() {
    return {
      user: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      // console.log(this.user)
      // var ac = new apiclass();
      // ac.login(this.user);
      api.login(this.user)
      // api.home()
    },
    home() {
      api.home();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
