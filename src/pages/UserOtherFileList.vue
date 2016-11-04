<template lang="jade">
.col.s12
  v-loading(:show='loading')
  div.col.s12
    table
      thead
        tr
          th(style='text-align: center') 文件名
          th(style='text-align: center') 进度
          th(style='text-align: center') 状态
          th(style='text-align: center') 操作
      tbody
        tr(v-for='file in files', style='text-align: center')
          td(v-text='file.name', style='text-align: center')
          td(v-text='file.progress', style='text-align: center')
          td(v-text='onStatus(file)', style='text-align: center')
          td(style='text-align: center')
            button(type='button',@click="uploadItem(file)") 上传
    .fixed-action-btn(style="bottom: 45px; right: 54px;")
      a.btn-floating.btn-large.red
        span.fa.fa-plus
      ul
        li(v-for='item in buildDom')
          a.btn-floating.btn-floating2(@click='uploadImg(item.reqopts.formData.useType)')
            .fileupload-button {{item.label}}
          //- a.btn-floating.btn-floating2
          //-   vue-file-upload(v-bind:url='fileUploadUrl(item.reqopts.formData.useType)',
          //-     v-bind:files.sync = 'files',
          //-     v-bind:filters = "filters",
          //-     v-bind:events = 'cbEvents',
          //-     v-bind:request-options = "item.reqopts",
          //-     name='fileData',
          //-     v-bind:label='item.label'
          //-     )
    hr
    .col.s12(v-for='src in media')
      .card
        .card-image
          img(v-bind:src='src', style='width: 100%')
    .col.s12(v-for='item in fileList')
      .card
        .card-image
          .preloader-wrapper.active(v-show='')
            .spinner-layer.spinner-green-only
              .circle-clipper.left
                .circle
              .gap-patch
                .circle
              .circle-clipper.right
                .circle
          img(v-bind:src='getSrc(item.fileId)')
</template>
<script>
import rest from '../rest'
import VueFileUpload from 'vue-file-upload'
import randomToken from 'random-token'
import vSelect from './VSelect'
import _ from 'lodash'
import sha1 from 'sha1'
import VLoading from './VLoading.vue'
import { uploadImage } from '../rest'
import { chooseImage } from '../rest'

var localStorage = window.localStorage

export default{
  // vuex: {
  //   getters: {
  //     uploadImage: uploadImage,
  //     chooseImage: chooseImage
  //   }
  // },
  data () {
    return {
      media: [],
      loading: false,
      zyxz: [],
      zyxl: [],
      zydj: [],
      zgbmId: [],
      zyzcId: {},
      postData: {
      },
      buildDom: [
        {
          label: '身份证（护照）',
          reqopts:{
            alias: 'fileData',
            formData:{
              'encoding': 'utf-8',
              'rpencoding': 'utf-8',
              '_x-requested-with': true,
              'ssoOpenId': this.user.ssoOpenId,
              'rcId': this.user.rcId,
              'useType': 'SFZ'
            },
            responseType: 'json',
            withCredentials: false
          }
        },
        {
          label: '毕业证书',
          reqopts:{
            alias: 'fileData',
            formData:{
              'encoding': 'utf-8',
              'rpencoding': 'utf-8',
              '_x-requested-with': true,
              'ssoOpenId': this.user.ssoOpenId,
              'rcId': this.user.rcId,
              'useType': 'BYZS'
            },
            responseType: 'json',
            withCredentials: false
          }
        },
        {
          label: '学位证书',
          reqopts:{
            alias: 'fileData',
            formData:{
              'encoding': 'utf-8',
              'rpencoding': 'utf-8',
              '_x-requested-with': true,
              'ssoOpenId': this.user.ssoOpenId,
              'rcId': this.user.rcId,
              'useType': 'XWZS'
            },
            responseType: 'json',
            withCredentials: false
          }
        },
        {
          label: '劳动合同书',
          reqopts:{
            alias: 'fileData',
            formData:{
              'encoding': 'utf-8',
              'rpencoding': 'utf-8',
              '_x-requested-with': true,
              'ssoOpenId': this.user.ssoOpenId,
              'rcId': this.user.rcId,
              'useType': 'LDHTS'
            },
            responseType: 'json',
            withCredentials: false
          }
        },
        {
          label: '个人简历',
          reqopts:{
            alias: 'fileData',
            formData:{
              'encoding': 'utf-8',
              'rpencoding': 'utf-8',
              '_x-requested-with': true,
              'ssoOpenId': this.user.ssoOpenId,
              'rcId': this.user.rcId,
              'useType': 'GRJL'
            },
            responseType: 'json',
            withCredentials: false
          }
        }
      ],
      list: [],
      files:[],
      //文件过滤器，只能上传图片
      fileList: [],
      filters:[
        {
          name:"imageFilter",
          fn(file){
              var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
              return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
          }
        }
      ],
      //回调函数绑定
      cbEvents:{
        onCompleteUpload:(file,response,status,header)=>{
          console.log(response)
          console.log(file)
          console.log("finish upload")
          this.getFileList()
        }
      },
      //xhr请求附带参数

      reqopts:{
        alias: 'fileData',
        formData:{
          'encoding': 'utf-8',
          'rpencoding': 'utf-8',
          '_x-requested-with': true,
          'ssoOpenId': this.user.ssoOpenId,
          'rcId': this.user.rcId,
          'useType': 'ZCZS'
        },
        responseType: 'json',
        withCredentials: false
      }
    }
  },
  init () {
    // var me = this
    this.user = JSON.parse(localStorage.getItem('baseInfo'))
  },
  ready () {
    var me = this
    this.buildDom.forEach(req => {
      var now = Date.now()
      var signature = ['NaRcJk4WeChat', now, '123332'].sort().join('')
      var timestamp = now
      var nonce = '123332'
      var r = {
        signature : sha1(signature),
        timestamp : timestamp,
        nonce : '123332',
        'ssoOpenId': this.user.ssoOpenId,
        'rcId': this.user.rcId,
        useType: req.reqopts.formData.useType
      }
      var url = '/rccore/RcxxFile/fileList?'

      Object.keys(r).forEach(v => {
        url = url + v + '=' + r[v] + '&'
      })
      this.loading = true
      rest.get(this.user, {useType: req.reqopts.formData.useType}, '/rccore/RcxxFile/fileList').then(res => {
        this.loading = false

        me.fileList = _.union(me.fileList, res.datas)
      })
    })
  },
  attached () {
  },
  methods: {
    uploadImg (useType) {
      let formData = {
        'Encoding': 'utf-8',
        'Rpencoding': 'utf-8',
        '_x-requested-with': true,
        'rcId': this.user.rcId,
        'useType': useType
      }
      let vm = this
      vm.loading = true
      chooseImage()
        .then(localId => {
          this.media.push(localId)
          return uploadImage(localId)
        })
        .then(serverId => {
          return rest.postFile(this.user, formData, serverId, '/rccore/RcxxFile/insert')
        })
        .then(res => {
          vm.loading = false
        })
    },
    fileUploadUrl (useType) {
      return rest.basicUrl + '/rccore/RcxxFile/insert' + this.beforeUpload(useType)
    },

    beforeUpload (useType) {
      var now = Date.now()
      var signature = ['NaRcJk4WeChat', now, '123332'].sort().join('')
      var timestamp = now
      var nonce = '123332'
      var encoding = 'utf-8'
      var rpencoding = 'utf-8'

      var r = {
        signature: sha1(signature),
        timestamp: timestamp,
        nonce: '123332',
        'ssoOpenId': this.user.ssoOpenId,
        'rcId': this.user.rcId,
        'encoding': 'utf-8',
        'rpencoding': 'utf-8',
        '_x-requested-with': true,
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
      me.fileList = []

      this.buildDom.forEach(req => {

        rest.post(this.user, {useType: req.reqopts.useType}, '/rccore/RcxxFile/fileList').then(res => {
          me.fileList = _.union(me.fileList, res.datas)
        })
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
      var me = this
      this.postData.zyzcId = randomToken(32)
      this.postData.isAdd = true

      rest.post(this.user, this.postData, '/rccore/Rczyzc/save').then(res => {
        me.getList()
        this.postData = {}
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
      var r = rest.basicUrl + '/rccore/RcxxFile/download?'

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

      // rest.post(this.user, {useType: 'ZCZS'}, '/rccore/RcxxFile/fileList').then(res => {
      //
      //   me.fileList = res.datas
      // })
    }
  },
  components: {
    VLoading,
    VueFileUpload,
    vSelect
  }
}
</script>
<style scoped>

.card-image {
  text-align: center;
  min-height: 150px;
  padding-top: 55px;
}
.fileupload-button {
  /*float: left;*/
  width: 120px;
  background: none;
  color: #fff !important;
  line-height: 20px !important;
  height: 40px !important;
  /*border: 5px soild#666;
  color: #666;*/
}
.btn-floating2 {
  display: inline-block;
  color: #fff !important;
  position: relative;
  overflow: hidden;
  z-index: 1;
  width: 120px !important;
  height: 40px !important;;
  line-height: 40px;
  padding: 0;
  background-color: none;
  border-radius: 0;
  transition: .3s;
  cursor: pointer;
  vertical-align: middle;
}
.btn-add {
  position: fixed;
  bottom: 30px;
  right: 30px;
}
.modal {
  width: 100%;
}

</style>
