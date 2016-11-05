<template lang="jade">
.row
  v-loading(:show='loading')
  form.col.s12.content
    .input-field.col.s12
      input.validate(type="text" v-model='basicData.sqzz' placeholder='')
      label.active 申请确认的资质
    .col.s12
      label.active 申请的人才层次

      v-select(:value.sync='basicData.sqcc', :options='sqcc')
    //- br
    //- .card(v-for='item in cacheFile')
    //-   .card-content
    //-     img(style='width: 100%;', v-bind:src='getSrc(item.fileId)')
    //-   .card-action
    //-     a(@click='deleteFlie(item)') 删除
    //- .card(v-for='item in cacheFile')
    //-   .card-content
    //-     img(style='width: 100%;', v-bind:src='getSrc(item.fileId)')
    //-   .card-action
    //-     a(@click='deleteFlie(item)') 删除
    //- br
    //- table
    //-   thead
    //-     tr
    //-       th(style='text-align: center') 文件名
    //-       th(style='text-align: center') 进度
    //-       th(style='text-align: center') 状态
    //-       //- th(style='text-align: center') action
    //-   tbody
    //-     tr(v-for='file in files', style='text-align: center')
    //-       td(v-text='file.name', style='text-align: center')
    //-       td(v-text='file.progress', style='text-align: center')
    //-       td(v-text='onStatus(file)', style='text-align: center')
          //- td(style='text-align: center')
          //-   button(type='button',@click="uploadItem(file)") 上传
    a.btn.btn-up(@click='uploadImg("ZZCL")')
      .fileupload-button 资质材料
    a.btn.btn-up(@click='uploadImg("LDHTS")')
      .fileupload-button 劳动合同书
    .col.s12(v-for='src in media')
      .card
        .card-image
          img(v-bind:src='src', style='width: 100%')
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

    button.waves-effect.waves-light.btn(@click='submitData') 保存

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
import { uploadImage } from '../rest'
import { chooseImage } from '../rest'

var localStorage = window.localStorage
var sqId = randomToken(32)

export default{
  vuex: {
    getters: {
      dataValue: getData
    }
  },
  props: ['index'],
  data () {
    return {
      media: [],
      cacheFile: [],
      cacheFile2: [],
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
          var done = true

          this.files.forEach(v => {
            if (v.progress !== 100) {
              done = false
            }
          })
          if (done) {
            return this.$router.go('/')
          }
          // this.getFileList()
        }
      },
      //xhr请求附带参数

      reqoptsZZCL: {
        alias: 'fileData',
        formData: {
          'Encoding': 'utf-8',
          'Rpencoding': 'utf-8',
          '_x-requested-with': true,
          'ssoOpenId': this.user.ssoOpenId,
          'sqId': sqId,
          'useType': 'ZZCL'
        },
        responseType: 'json',
        withCredentials: false
      },
      reqoptsLDHTS: {
        alias: 'fileData',
        formData: {
          'Encoding': 'utf-8',
          'Rpencoding': 'utf-8',
          '_x-requested-with': true,
          'ssoOpenId': this.user.ssoOpenId,
          'sqId': sqId,
          'useType': 'LDHTS'
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
      me.sqcc = this.rebuildOptions(res)
    })

  },
  ready () {
    this.$parent.index = false

    if (this.dataValue && this.$route.query.do) this.basicData = this.dataValue
    if (this.dataValue) {
      rest.post(this.user, {useType: 'ZZCL', sqId: this.dataValue.sqId}, '/rccore/RcrdFile/fileList').then(res => {
        this.cacheFile  = res.datas
      })
    }
    if (this.dataValue) {
      rest.post(this.user, {useType: 'LDHTS', sqId: this.dataValue.sqId}, '/rccore/RcrdFile/fileList').then(res => {
        this.cacheFile2  = res.datas
      })
    }
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
    $('#sidenav-overlay').remove()

  },
  methods: {
    uploadImg (useType) {
      let formData = {
        'Encoding': 'utf-8',
        'Rpencoding': 'utf-8',
        '_x-requested-with': true,
        'sqId': sqId,
        'useType': useType
      }
      let vm = this
      chooseImage()
        .then(localId => {
          vm.loading = true
          this.media.push(localId)
          return uploadImage(localId)
        })
        .then(serverId => {
          return rest.postFile(this.user, formData, serverId, '/rccore/RcrdFile/insert')
        })
        .then(res => {
          vm.loading = false
        })
    },
    fileUploadUrl (useType) {
      return rest.basicUrl + '/rccore/RcrdFile/insert' + this.beforeUpload(useType)
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
        'rpencoding' : 'gbk',
        '_x-requested-with' : true,
        'sqId': sqId,
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
        return '上传成功'
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

      this.basicData.isAdd = this.basicData.sqId ? false : true
      this.basicData.sqId = this.basicData.sqId || sqId
      this.basicData.flowEntityId = this.basicData.sqId
      this.basicData.flowEntityInfo = this.user.username + ' 申请人才认定'
      this.basicData.flowVerId = 'BDB6AAC5734A2C5C3A44FA369A272E93'
      this.basicData.flowEntityUI = '/rccore/Rcrd/flowUI'
      this.loading = true

      rest.post(this.user, this.basicData, '/rccore/Rcrd/entitySave').then(res => {
        me.loading = false
        if (!res.success) return Materialize.toast(res.message, 4000)
        if (this.files.length) Materialize.toast('保存成功,正在上传', 2000)
        else Materialize.toast('保存成功', 2000)
        this.files.forEach(file => {
          file.upload()
        })
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
  background: transparent !important;
  height: 100px !important;
  border: 2px solid #26a69a !important;
  color: #26a69a !important;
  line-height: 100px !important;
  border-style: dashed !important;
  border-radius: 5px !important;
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
  padding: 0;
  height: 100px;
  background-color: transparent;
  box-shadow: none;
}
</style>
