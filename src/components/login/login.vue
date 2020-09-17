<template>
<div class="login-wrap">
    <h1>用户登录</h1>
<el-form label-position="top" label-width="80px" :model="formdata">
  <el-form-item label="用户账号">
    <el-input v-model="formdata.username"></el-input>
  </el-form-item>
  <el-form-item label="用户密码">
    <el-input v-model="formdata.password"></el-input>
  </el-form-item>
</el-form>
  <el-button type="primary" @click.prevent="handleLogin()">登录</el-button>
</div>
</template>

<script>
export default {
  data () {
    return {
      labelPosition: 'top',
      formdata: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async handleLogin () {
      const res = await this.$http.post('login', this.formdata)
      // eslint-disable-next-line no-undef
      // console.log(res)
      // eslint-disable-next-line standard/object-curly-even-spacing
      const { meta: { msg, status}} = res.data
      // eslint-disable-next-line no-unused-vars
      const token = res.data.data.token
      if (status === 200) {
        this.$router.push({path: '/home'})
        // eslint-disable-next-line no-use-before-define
        window.localStorage.setItem('token', token)
        window.sessionStorage.setItem('token', token)
        this.$message.success(msg)
      } else {
        this.$message.error(msg)
      }
    }
  }
}
</script>
<style>
.login-wrap{
    height:100%;
    background-color:#324152;
    display:flex;
    justify-content:center;
    align-items:center
}
</style>
