<template lang="jade">
.dad
  v-loading(:show='loading')

  form.col.content(v-form name="form")
    //- h6 请输入你的微信账号登录
    .input-field.col.s10
      i.fa.fa-user.prefix
      input.validate(type="text" v-model='user.username', name='username',  v-form-ctrl, required)
      label(v-bind:class='{active: user.username}') 用户名
    .input-field.col.s10
      i.fa.fa-lock.prefix
      input.validate(type="password" v-model='user.password', name='password',  v-form-ctrl, required)
      label(v-bind:class='{active: user.password}') 密码
    br
    br
    br
    .button
      a.waves-effect.waves-light.btn(@click='login', v-bind:disabled='form.$invalid') 登录
      a.signUp.waves-effect(v-link="{ path: '/SignUp' }", style='height: 36px; text-align: center;line-height: 36px;') 注册
</template>

<script>
import rest from '../rest'
import VLoading from './VLoading.vue'
import md5 from 'md5'
var localStorage = window.localStorage

export default {
  data() {
    return {
      loading: false,
      user: {
        wcOpenId: ''
      },
    };
  },
  computed: {},
  init() {
    var bind = JSON.parse(localStorage.getItem('bind'))

    if (bind && bind.wcOpenId) this.user = bind
  },
  ready() {
    console.log(this.$router)

  },
  attached() {},
  methods: {
    login() {
      var me = this
      this.loading = true
      this.user.wcOpenId = JSON.parse(localStorage.getItem('bind')).wcOpenId
      this.user.password = md5(this.user.password)

      rest.post( this.user,{}, '/rccore/WeChatUser/insert').then(res => {
        this.loading = false

        if (!res.success) return Materialize.toast(res.message, 4000)
        Materialize.toast('登录成功', 2000)

        var baseInfo = {
          ssoOpenId: res.data.ssoUserID,
          username: res.data.ssoLoginName,
          rcId: res.data.ssoUserID
        }

        localStorage.setItem('baseInfo', JSON.stringify(baseInfo))
        // setTimeout(function() {
        //   return me.$router.go({name: 'HomePage'})
        //
        // }, 500)
        //window.history.back()
        this.$router.go({name: 'Home'})
      })
    }
  },
  components: {
    VLoading
  }
};
</script>

<style lang="css" scoped>
.dad {
  width: 100%;
  padding: 40% 0;
  height: 100%;
  line-height: 100%;
}
.content {
  /*display: inline;*/
  /*padding: 20px;*/
  width: 84%;
  margin-left: 8%;
  /*text-align: center;*/
}
.button {
  position: relative;
  width: 90%;
  margin-left: 5%;
}
.button button{
  /*position: absolute;
  right: 0;*/
  width: 100%;
}
.button a{
  /*position: absolute;
  left: 0;*/
  width: 100%;

}
.signUp {
  width: 100%;
  margin-top: 30px;
  display: block;
  color: #666;
}
</style>
