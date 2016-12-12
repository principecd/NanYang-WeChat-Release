<template lang="jade">
.row
  v-loading(:show='loading')
  form.col.s12.content
    //- .input-field.col.s12
    //-   input.validate(type="text" v-model='basicData.rcName' placeholder='')
    //-   label.active 人才姓名
    .input-field.col.s12
      input.validate(type="text" v-model='basicData.poXm' placeholder='' v-bind:disabled="disabled_edit"  ,v-bind:class="{ 'vf-invalid-required': startvlwc&&!basicData.poXm}")
      label.active 配偶姓名
    .col.s12
      label.active 性别
      v-select(:value.sync='basicData.xb', :options='xb' v-bind:disabled="disabled_edit" ,v-bind:class="{ 'vf-invalid-required': startvlwc&&!basicData.xb }")
    .input-field.col.s12
      input.validate(type="month" v-model='basicData.csny' placeholder='' v-bind:disabled="disabled_edit" ,v-bind:class="{ 'vf-invalid-required': startvlwc&&!basicData.csny }")
      label.active 出生年月
    .input-field.col.s12
      input.validate(type="text" v-model='basicData.jg' placeholder='' v-bind:disabled="disabled_edit" ,v-bind:class="{ 'vf-invalid-required': startvlwc&&!basicData.jg }")
      label.active 国籍籍贯
    .input-field.col.s12
      input.validate(type="text" v-model='basicData.sfz' placeholder='' v-bind:disabled="disabled_edit" ,v-bind:class="{ 'vf-invalid-required': startvlwc&&!basicData.sfz }")
      label.active 身份证号(护照)
    .col.s12
      label.active 人才类别
      v-select(:value.sync='basicData.sqcc', :options='rclb' v-bind:disabled="disabled_edit" ,v-bind:class="{ 'vf-invalid-required': startvlwc&&!basicData.sqcc }")
    .input-field.col.s12
      input.validate(type="text" v-model='basicData.xgzdw' placeholder='' v-bind:disabled="disabled_edit" ,v-bind:class="{ 'vf-invalid-required': startvlwc&&!basicData.xgzdw }")
      label.active 工作单位及地址
    .input-field.col.s12
      input.validate(type="text" v-model='basicData.xgzzw' placeholder='' v-bind:disabled="disabled_edit")
      label.active 职务
    .input-field.col.s12
      input.validate(type="text" v-model='basicData.sjhm' placeholder='' v-bind:disabled="disabled_edit" ,v-bind:class="{ 'vf-invalid-required': startvlwc&&!basicData.sjhm }")
      label.active 联系电话
    .input-field.col.s12
      input.validate(type="text" v-model='basicData.dzyj' placeholder='' v-bind:disabled="disabled_edit")
      label.active 邮箱

    button.waves-effect.waves-light.btn(@click='submitData' v-if='!disabled_edit') 保存
</template>
<script>
import rest from '../rest'
import VueFileUpload from 'vue-file-upload'
import randomToken from 'random-token'
import vSelect from './VSelect.vue'
import VLoading from './VLoading.vue'
import sha1 from 'sha1'
import _ from 'lodash'
import { getData } from '../vuex/getters'

var localStorage = window.localStorage

export default{
  vuex: {
    getters: {
      dataValue: getData
    }
  },
  props: ['index'],

  data () {
    return {
    startvlwc:false,
      disabled_edit:false,
      loading: false,
      xb: [
        {value: '1', label: '男'},
        {value: '0', label: '女'}
      ],
      dengJi: [],
      myChildren: [],
      rclb: [],
      child: {},
      sqlb: [],
      rych: [],
      zydj: [],
      zgbmId: [],
      ryId: {},
      basicData: {
        xb:''
      },
      list: [],
      files:[],
      //文件过滤器，只能上传图片
      fileList: [],
      filters:[
        {
          name:"imageFilter",
          fn (file) {
              var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|'

              return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1
          }
        }
      ],
      //回调函数绑定
      cbEvents:{
        onCompleteUpload: (file, response, status, header) => {
          console.log(response)
          console.log(file)
          console.log('finish upload')
          // this.getFileList()
        }
      },
      //xhr请求附带参数

      reqopts: {
        alias: 'fileData',
        formData: {
          'Encoding': 'utf-8',
          'Rpencoding': 'utf-8',
          '_x-requested-with': true,
          'ssoOpenId': this.user.ssoOpenId,
          'rcId': this.user.rcId,
          'useType': 'RYZS'
        },
        responseType: 'json',
        withCredentials: false
      }
    }
  },
  init () {
    this.user = JSON.parse(localStorage.getItem('baseInfo'))

    var me = this
    rest.getOptions('rcrd_cengci').then(res => {
      me.rclb = this.rebuildOptions(res)
    })
  },
  ready () {
    this.$parent.index = false

    if (this.dataValue && this.$route.query.do)
      {
          this.basicData = this.dataValue
          if(this.$route.query.do=='edit'){
              this.disabled_edit=false;
          }else{ this.disabled_edit=true;
          }
          if(this.basicData.xb=='男'){
            this.basicData.xb='1';
          }else{
            this.basicData.xb='0';
          }
      }
      this.startvlwc=false;
  },
  attached () {
    $('#sidenav-overlay').remove()

  },
  methods: {
    fileUploadUrl (useType) {
      return rest.basicUrl + '/rccore/RcpoFile/insert' + this.beforeUpload(useType)
    },
    addChild() {
      this.myChildren.push(this.child)
      $('#modal1').closeModal()

      this.child = {}
    },
    beforeUpload (useType) {
      var now = Date.now()
      var signature = ['NaRcJk4WeChat', now, '123332'].sort().join('')
      var timestamp = now
      var nonce = '123332'
      var encoding = 'utf-8'
      var rpencoding = 'utf-8'

      var r = {
        signature : sha1(signature),
        timestamp : timestamp,
        nonce : '123332',
        'ssoOpenId': this.user.ssoOpenId,
        'encoding' : 'utf-8',
        'rpencoding' : 'utf-8',
        '_x-requested-with' : true,
        useType: useType
      }
      var k = '?'
      Object.keys(r).forEach(v => {
        k = k + v + '=' + r[v] + '&'
      })

      return k
    },
    getList () {
      var me = this

      rest.post(this.user, {}, '/rccore/Rcpo/page').then(res => {
        this.list = res.datas
      })
    },
    rebuildOptions (options) {
      var report = []

      options.forEach(option => {
        var item = {
          label: option.itemName,
          value: option.itemCode
        }
        report.push(item)
      })

      return report
    },
    onStatus (file) {
      if(file.isSuccess){
        return "上传成功"
      }else if(file.isError){
        return "上传失败"
      }else if(file.isUploading){
        return "正在上传"
      }else{
        return "待上传"
      }
    },
    uploadItem (file) {
      file.upload()
    },
    submitData (e) {
      e.preventDefault()
       if(!this.startvlwc){
          this.startvlwc=true;
      }
      if(!this.basicData.poXm||!this.basicData.xb||!this.basicData.csny||!this.basicData.jg ||!this.basicData.sfz||!this.basicData.sqcc||!this.basicData.xgzdw||!this.basicData.sjhm){
        return;
      }
       this.startvlwc=false;

      var me = this
      this.basicData.isAdd = this.basicData.poId ? false : true
      this.basicData.poId = this.basicData.poId || randomToken(32)
      this.basicData.flowEntityId = this.basicData.poId
      this.basicData.flowVerId =  JSON.parse(localStorage.getItem('/rccore/Poxx/flowUI'))[0].flowVerId;//'BDB6AAC5734A2C5C3A44FA369A272E93',
      this.basicData.flowEntityUI = '/rccore/Poxx/flowUI'
      this.basicData.flowEntityInfo = this.user.username + ' 申请租房补贴'

      this.loading = true

      this.basicData.qtcyInfo = this.myChildren
      rest.post(this.user, this.basicData, '/rccore/Poxx/entitySave').then(res => {
        me.loading = false
        if (!res.success) return Materialize.toast(res.message, 4000)
        Materialize.toast('保存成功', 2000)
        return this.$router.go('/')
      })
    },
    getSrc (fileId) {
      var now = Date.now()
      var signature = ['NaRcJk4WeChat', now, '123332'].sort().join('')
      var timestamp = now
      var nonce = '123332'
      var query = {
        signature : sha1(signature),
        timestamp : timestamp,
        nonce : '123332',
        'ssoOpenId': this.user.ssoOpenId,
        'rcId': this.user.rcId,
        refId: fileId
      }
      var r = '/rccore/RcxxFile/download?'

      Object.keys(query).forEach(key => {

        r = r + key + '=' + query[key] + '&'
      })

      return r
    },
    modal () {
      $('#modal1').openModal()
    },
    getFileList () {
      var me = this

      rest.post(this.user, {useType: 'RYZS'}, '/rccore/RcxxFile/fileList').then(res => {

        me.fileList = res.datas
      })
    }
  },
  components: {
    VueFileUpload,
    vSelect,
    VLoading
  }
}
</script>
<style scoped>
.content {
  padding: 0 20px;
}
.card-image {
  text-align: center;
  min-height: 150px;
  padding-top: 55px;
}
.fileupload-button {
  background-color: #666 !important;
  width: 100%;
}
.btn-add {
  position: fixed;
  bottom: 30px;
  right: 30px;
}
.modal {
  width: 100%;
}
.btn-up {
  width: 100%;
  background-color: transparent;
  box-shadow: none;
}
.vf-invalid-required{
 border-bottom: 1px solid #F44336 !important;
    box-shadow: 0 1px 0 0 #F44336 !important;
}
</style>
