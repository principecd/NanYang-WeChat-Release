<template lang="jade">
.dad
  v-loading(:show='loading')
  form.col.content(v-form name="myform")
    .input-field.col.s10
      i.fa.fa-mobile-phone.prefix
      input.validate(type="text", name='mobilePhone' v-model='user.mobilePhone', v-form-ctrl, required, pattern='0?(13|14|15|18)[0-9]{9}', number)
      label(v-bind:class='{active: user.mobilePhone}') 手机号码
    .input-field.col.s10
      i.fa.fa-credit-card.prefix
      v-select.validate(:options='zjlx', :value.sync='user.zjlx', style='width: calc(100% - 42px); margin-left: 42px; z-index: 2; position: relative') 证件类型
      input.validate(type="text", name='lxrZj' v-model='user.lxrZj', v-form-ctrl, required, v-if='user.zjlx==="sfz"', placeholder='填入号码')
      input.validate(type="text", name='lxrZj' v-model='user.lxrZj', v-form-ctrl, required, v-if='user.zjlx==="hz"', placeholder='填入号码')
      label(v-if='!user.zjlx', style='z-index: 1;') 身份证（护照）
    //- .input-field.col.s10
    //-   i.fa.fa-credit-card.prefix
    //-   input.validate(type="text", name='lxrZj' v-model='user.lxrZj', v-form-ctrl, required)
    //-   label(v-bind:class='{active: user.lxrZj}') 号码
    .input-field.col.s10
      i.fa.fa-user.prefix
      input.validate(type="text", name='rcName' v-model='user.rcName', v-form-ctrl, required, autocomplete="off")
      label(v-bind:class='{active: user.rcName}') 姓名
    //- .input-field.col.s10
    //-   i.fa.fa-wechat.prefix
    //-   input.validate(type="text" v-model='user.wcOpenId' placeholder='')
    //-   label 微信账号
    .input-field.col.s10
      i.fa.fa-lock.prefix
      input.validate(type="password", name='pwd' v-model='user.pwd', v-form-ctrl, required, autocomplete="off")
      label(v-bind:class='{active: user.pwd}') 密码
    //- pre {{myform | json}}
    //- .verifyCode
    //-   button.waves-effect.waves-light.btn(@click='getCode') {{verifyBtn}}
    //-   input.validate(type="text" v-model='user.codePhone' placeholder='')
    .button(style='margin-top: 50px !important')
      a.waves-effect.waves-light.btn(@click='signUp', v-bind:disabled='myform.$invalid') 注册
      a.signUp.waves-effect(v-link="{ path: '/Login' }", style='height: 36px; text-align: center;line-height: 36px;') 登录
</template>

<script>
import rest from '../rest'
import VLoading from './VLoading.vue'
var sha1 = require('sha1')
import md5 from 'md5'
import vSelect from './VSelect.vue'

var localStorage = window.localStorage
export default {
  data() {
    return {
      zjlx: [
        {value: 'sfz', label: '身份证'},
        {value: 'hz', label: '护照'}
      ],
      loading: false,
      user: {
      },
      verifyBtn: '验证码'
    };
  },
  computed: {},
  init() {
    if (this.$router._currentRoute.query) this.user = this.$router._currentRoute.query

    let q = {
      p: 'tsinnet/mbmodel/rccore/cnst/Zjlx'
    }

    rest.getEnum(this.user, q, '/enum/enumjs').then(res => {
      console.log(res)
    })
  },
  ready() {
    console.log(this.$router)
  },
  attached() {},
  methods: {
    signUp() {
      if(!this.isCardNo(this.user.lxrZj)){
        return Materialize.toast('身份证格式验证失败', 4000)
      }
      this.user.password = md5(this.user.pwd)
      this.user.wcOpenId = JSON.parse(localStorage.getItem('bind')).wcOpenId
 //alert(JSON.stringify(this.user));
      rest.post( this.user,{}, '/rccore/WeChatUser/noneToInsert').then(res => {
      //alert(JSON.stringify(res));
        if (!res.success) return Materialize.toast(res.message, 4000)
        var baseInfo = {
          ssoOpenId: res.data.rcId,
          username: res.data.ssoLoginName,
          rcId: res.data.rcId
        }

        localStorage.setItem('baseInfo', JSON.stringify(baseInfo))
        this.loading=false;
        return this.$router.go({name: 'Home'})
        // window.history.back()

      })
    },
   isCardNo(card)
    {
       // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
       var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
       if(reg.test(card) === false)
       {
           return  false;
       }  else return true
    } ,
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
    VLoading,
    vSelect
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
