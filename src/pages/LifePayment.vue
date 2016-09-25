<template lang="jade">
.row
  v-loading(:show='loading')
  form.col.s12.content
    .col.s12
      label.active 补贴层次
      v-select(:value.sync='basicData.btcc', :options='sqcc')
    .col.s12
      label.active 补贴标准（元）
      v-select0(:value.sync='basicData.btje', :options='sqcc')
    .input-field.col.s12
      input.validate(type="text" v-model='basicData.btMonth' placeholder='如：3')
      label.active 补贴月份
    button.waves-effect.waves-light.btn(@click='submitData') 保存
    //- br
    //- br
    //- a.btn.btn-up
    //-   vue-file-upload(v-bind:url='fileUploadUrl("ZZCL")',
    //-     v-bind:files.sync = 'files',
    //-     v-bind:filters = "filters",
    //-     v-bind:events = 'cbEvents',
    //-     v-bind:request-options = "reqoptsZZCL",
    //-     name='fileData',
    //-     label='资质材料'
    //-     )
    //- br
    //- br
    //- a.btn.btn-up
    //-   vue-file-upload(v-bind:url='fileUploadUrl("LDHTS")',
    //-     v-bind:files.sync = 'files',
    //-     v-bind:filters = "filters",
    //-     v-bind:events = 'cbEvents',
    //-     v-bind:request-options = "reqoptsLDHTS",
    //-     name='fileData',
    //-     label='劳动合同书'
    //-     )
    //- table
    //-   thead
    //-     tr
    //-       th(style='text-align: center') 文件名
    //-       th(style='text-align: center') 进度
    //-       th(style='text-align: center') 状态
    //-       th(style='text-align: center') action
    //-   tbody
    //-     tr(v-for='file in files', style='text-align: center')
    //-       td(v-text='file.name', style='text-align: center')
    //-       td(v-text='file.progress', style='text-align: center')
    //-       td(v-text='onStatus(file)', style='text-align: center')
    //-       td(style='text-align: center')
    //-         button(type='button',@click="uploadItem(file)") 上传
</template>
<script>
import rest from '../rest'
import VueFileUpload from 'vue-file-upload'
import randomToken from 'random-token'
import vSelect from './VSelect.vue'
import vSelect0 from '../components/VSelect0.vue'

import VLoading from './VLoading.vue'
import sha1 from 'sha1'
import _ from 'lodash'
var localStorage = window.localStorage

export default{
  data () {
    return {
      loading: false,
      dengJi: [],
      sqcc: [],
      rych: [],
      zydj: [],
      zgbmId: [],
      ryId: {},
      basicData: {
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
      console.log(res)
      me.sqcc = this.rebuildOptions(res)
    })

  },
  ready () {
    if (this.$router._currentRoute.query) this.basicData = this.$router._currentRoute.query

    // var me = this
    // me.loading = true
    // rest.post(this.user, {}, '/rccore/Rcpo/get').then(res => {
    //   me.loading = false
    //   console.log(res)
    //   me.basicData = res.data
    // })
    //
    // this.getList()
  },
  attached () {
  },
  methods: {
    fileUploadUrl (useType) {
      return rest.basicUrl + '/rccore/RcpoFile/insert' + this.beforeUpload(useType)
    },
    // deleteItem (id) {
    //   rest.post(this.user, {ryId: id}, '/rccore/Rych/delete').then(res => {
    //
    //     this.getList()
    //   })
    // },
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
          value: option.itemCode,
          itemNameB: option.itemNameB
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

      this.basicData.isAdd = this.basicData.jtId ? false : true
      this.basicData.jtId = this.basicData.jtId || randomToken(32)
      this.basicData.flowEntityId = this.basicData.jtId
      this.basicData.flowEntityInfo = this.user.username + ' 申请生活津贴'
      this.basicData.flowVerId = 'BDB6AAC5734A2C5C3A44FA369A272E93',
      this.basicData.flowEntityUI = '/rccore/Shjt/flowUI'

      this.loading = true

      rest.post(this.user, this.basicData, '/rccore/Shjt/entitySave').then(res => {
        me.loading = false
        if (!res.success) return Materialize.toast(res.message, 4000)
        Materialize.toast('保存成功', 2000)
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
    VLoading,
    vSelect0
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
</style>
