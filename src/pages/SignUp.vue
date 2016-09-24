<template lang="jade">
.dad
  v-loading(:show='loading')
  form.col.content
    .input-field.col.s10
      i.fa.fa-mobile-phone.prefix
      input.validate(type="text" v-model='user.mobilePhone' placeholder='')
      label 手机号码
    .input-field.col.s10
      i.fa.fa-credit-card.prefix
      input.validate(type="text" v-model='user.lxrZj' placeholder='')
      label 身份证号码
    .input-field.col.s10
      i.fa.fa-user.prefix
      input.validate(type="text" v-model='user.rcName' placeholder='')
      label 用户名
    //- .input-field.col.s10
    //-   i.fa.fa-wechat.prefix
    //-   input.validate(type="text" v-model='user.wcOpenId' placeholder='')
    //-   label 微信账号
    .input-field.col.s10
      i.fa.fa-lock.prefix
      input.validate(type="password" v-model='user.pwd' placeholder='')
      label 密码
    //- .verifyCode
    //-   button.waves-effect.waves-light.btn(@click='getCode') {{verifyBtn}}
    //-   input.validate(type="text" v-model='user.codePhone' placeholder='')
    .button(style='margin-top: 50px !important')
      a.waves-effect.waves-light.btn(@click='signUp') 注册
      a.signUp.waves-effect(v-link="{ path: '/Login' }", style='height: 36px; text-align: center;line-height: 36px;') 登录
</template>

<script>
import rest from '../rest'
import VLoading from './VLoading.vue'
var sha1 = require('sha1')
var localStorage = window.localStorage
export default {
  data() {
    return {
      loading: false,
      user: {
        mobilePhone: '',
        lxrZj: '',
        wcOpenId: ''
      },
      verifyBtn: '验证码'
    };
  },
  computed: {},
  ready() {},
  attached() {},
  methods: {
    signUp() {
      this.user.password = sha1(this.user.pwd)
      this.user.wcOpenId = JSON.parse(localStorage.getItem('bind')).wcOpenId
      rest.post({}, this.user, '/rccore/WeChatUser/noneToInsert').then(res => {
        if (!res.success) return Materialize.toast(res.message, 4000)
        var baseInfo = {
          ssoOpenId: res.data.rcId,
          username: res.data.ssoLoginName,
          rcId: res.data.rcId
        }

        localStorage.setItem('baseInfo', JSON.stringify(baseInfo))
        return this.$router.go({name: 'Home'})
      })
    },
    getCode() {
      if (!this.user.mobilePhone || !this.user.lxrZj) {
        return Materialize.toast('请输入完整信息', 4000)
      }
      this.loading = true
      rest.post({}, {mobilePhone: this.user.mobilePhone, lxrZj: this.user.lxrZj}, '/rccore/Register/getCode').then(res => {
        if (!res.success) {
          return Materialize.toast(res.message, 4000)
        }
        this.verifyBtn = '已发送'
        this.loading = false
      })
    },
  },
  components: {
    VLoading
  }
};
</script>

<style lang="css" scoped>
.dad {
  width: 100%;
  padding: 20px 0;
  height: 100%;
  line-height: 100%;
}
.content {
  /*display: inline;*/
  width: 84%;
  /*padding: 20px;*/
  padding-top: 20px;
  margin-left: 8%;
  /*text-align: center;*/
}
.verifyCode {
  width: 100%;
}
.verifyCode input{
  float: right;
  width: 45%;
}
.verifyCode button{
  float: right;
  width: 40%;
  background-color: #f9f9f9;
  color: #666;
  box-shadow: none;
  border: 1px solid #999;
  margin-top: 7px;
  margin-left: 5px
}
.button {
  position: relative;
  width: 80%;
  margin-left: 10%;
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
