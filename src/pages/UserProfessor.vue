<template lang="jade">
.row(style='margin-top: -25px;')
  v-loading(:show='loading')
  div
    ul.tabs
      li.tab.col.s3
        a(href="#formContent") 专业职称
      li.tab.col.s3
        a(href="#fileContent") 专业职称证书
    #formContent
      .col.s12(v-for='item in list')
        .card
          .card-content(@click='edit(item)')
            table
              thead
              tbody
                tr(v-if='item.zshm')
                  th.col.s4 证书号码
                  td.col.s6 {{item.zshm}}
                tr(v-if='item.zyxzStr')
                  th.col.s4 性质
                  td.col.s6 {{item.zyxzStr}}
                tr(v-if='item.zyxlStr')
                  th.col.s4 系列
                  td.col.s6 {{item.zyxlStr}}
                tr(v-if='item.zymc')
                  th.col.s4 专业名称
                  td.col.s6 {{item.zymc}}
                tr(v-if='item.zgbmStr')
                  th.col.s4 主管部门
                  td.col.s6 {{item.zgbmStr}}
                tr(v-if='item.zydjStr')
                  th.col.s4 等级
                  td.col.s6 {{item.zydjStr}}
          .card-action
            a(@click='deleteItem(item.zyzcId)') 删除
      a(v-on:click="modal" class='btn-floating btn-large waves-effect waves-light red btn-add')
        span.fa.fa-plus
      .modal#modal1.col.s12.bottom-sheet
        .modal-content
          .row
            form.col.s12
              .col.s12
                label.active 性质
                v-select(:options='zyxz', :value.sync='postData.zyxz')
              .col.s12
                label.active 系列
                v-select(:options='zyxl', :value.sync='postData.zyxl')
              .input-field.col.s12
                input.validate(type="text" v-model='postData.zymc' placeholder='')
                label.active 专业名称
              .col.s12
                label.active 等级
                v-select(:options='zydj', :value.sync='postData.zydj')
              .input-field.col.s12
                input.validate(type="text" v-model='postData.zshm' placeholder='')
                label.active 证件号码
              .col.s12
                label.active 主管部门
                v-select(:options='zgbmId', :value.sync='postData.zgbmId')
        .modal-footer
          a(class="btn waves-effect waves-light" v-on:click='submitData') 保存
          a(class="modal-action modal-close waves-effect waves-green btn-flat", @click='clear') 取消
    #fileContent

        //- table
        //-   thead
        //-     tr
        //-       th(style='text-align: center') 文件名
        //-       th(style='text-align: center') 进度
        //-       th(style='text-align: center') 状态
        //-       th(style='text-align: center') 操作
        //-   tbody
        //-     tr(v-for='file in files', style='text-align: center')
        //-       td(v-text='file.name', style='text-align: center')
        //-       td(v-text='file.progress', style='text-align: center')
        //-       td(v-text='onStatus(file)', style='text-align: center')
        //-       td(style='text-align: center')
        //-         button(type='button',@click="uploadItem(file)") 上传
        //- a.btn.btn-up
        //-   vue-file-upload(v-bind:url='fileUploadUrl',
        //-     v-bind:files.sync = 'files',
        //-     v-bind:filters = "filters",
        //-     v-bind:events = 'cbEvents',
        //-     v-bind:request-options = "reqopts"
        //-     name='fileData',
        //-     label='添加专业职称证书'
        //-     )
        br
        br
        a.btn.btn-up(@click='uploadImg')
          .fileupload-button 添加专业职称证书
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
              img(v-bind:src='getSrc(item.fileId)', style='width: 100%')
</template>
<script>
import rest from '../rest'
import VueFileUpload from 'vue-file-upload'
import randomToken from 'random-token'
import vSelect from './VSelect.vue'
import VLoading from './VLoading.vue'
import sha1 from 'sha1'
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
      fileUploadUrl: rest.basicUrl + '/rccore/RcxxFile/insert' + this.beforeUpload(),
      zyxz: [],
      zyxl: [],
      zydj: [],
      zgbmId: [],
      zyzcId: {},
      postData: {
      },
      list: [],
      files: [],
      //文件过滤器，只能上传图片
      fileList: [],
      filters: [
        {
          name:"imageFilter",
          fn (file) {
              var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|'
              return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1
          }
        }
      ],
      //回调函数绑定
      cbEvents: {
        onCompleteUpload: (file,response,status,header) => {
          console.log(response)
          console.log(file)
          console.log("finish upload")
          this.getFileList()
        }
      },
      //xhr请求附带参数

      reqopts: {
        alias: 'fileData',
        formData:{
          'Encoding': 'utf-8',
          'Rpencoding': 'utf-8',
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
    var me = this
    this.user = JSON.parse(localStorage.getItem('baseInfo'))

    rest.getOptions('rczyzc_xz').then(res => {
      me.zyxz = this.rebuildOptions(res)
    })
    rest.getOptions('rczyzc_xl').then(res => {
      me.zyxl = this.rebuildOptions(res)
    })
    rest.getOptions('rczyzc_dj').then(res => {
      me.zydj = this.rebuildOptions(res)
    })
    rest.getOptions('rczyzc_zgbm').then(res => {
      me.zgbmId = this.rebuildOptions(res)
    })
  },
  ready () {
    var me = this
    this.loading = true
    rest.post(this.user, {}, '/rccore/Rczyzc/list').then(res => {

      me.loading = false
      me.list = res.datas
    })

    rest.post(this.user, {useType: 'ZCZS'}, '/rccore/RcxxFile/fileList').then(res => {
      me.fileList = res.datas
    })
  },
  attached () {
    $('ul.tabs').tabs()
  },
  methods:{
    uploadImg () {
      let formData = {
        'Encoding': 'utf-8',
        'Rpencoding': 'utf-8',
        '_x-requested-with': true,
        'rcId': this.user.rcId,
        'useType': 'ZCZS'
      }
      let vm = this
      chooseImage()
        .then(localId => {
          vm.loading = true
          this.media.push(localId)
          return uploadImage(localId)
        })
        .then(serverId => {
          return rest.postFile(this.user, formData, serverId, '/rccore/RcxxFile/insert')
        })
        .then(res => {
          if (!res.success) return Materialize.toast(res.message, 4000)

          vm.loading = false
        })
    },
    clear() {
      this.postData = {}
    },
    swipeleft(item) {

    },
    edit(item) {
      this.postData = item
      $('#modal1').openModal()
    },
    deleteItem (id) {
      this.loading = true
      rest.delete(this.user, {zyzcId: id}, '/rccore/Rczyzc/delete').then(res => {
        this.loading = false

        this.getList()
      })
    },
    beforeUpload () {
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
      }
      var k = '?'
      Object.keys(r).forEach(v => {
        k = k + v + '=' + r[v] + '&'
      })

      return k
    },
    getList () {
      var me = this
      rest.post(this.user, {}, '/rccore/Rczyzc/list').then(res => {
        me.list = res.datas
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

      this.postData.isAdd = this.postData.zyzcId ? 'false' : 'true'
      this.postData.zyzcId = this.postData.zyzcId || randomToken(32)
      this.loading = true
      $('#modal1').closeModal()
      rest.post(this.user, this.postData, '/rccore/Rczyzc/save').then(res => {
        this.loading = false
        if (!res.success) return Materialize.toast(res.message, 4000)

        me.getList()
        Materialize.toast('保存成功', 2000)
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

      rest.post(this.user, {useType: 'ZCZS'}, '/rccore/RcxxFile/fileList').then(res => {
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

.card-image {
  text-align: center;
  min-height: 150px;
  padding-top: 55px;
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
  width: 90%;
  margin-left: 5%;
  padding: 0;
  height: 100px;
  background-color: transparent;
  box-shadow: none;
}
.fileupload-button {
  background: transparent;
  height: 100px;
  border: 2px solid #26a69a;
  color: #26a69a;
  line-height: 100px;
  border-style: dashed;
  border-radius: 5px;
  width: 100%;
}

.tabs {
  background: #26a69a !important;
  position: fixed;
  top: 40px;
  left: 0;
  z-index: 9999;
}

.tabs li a {
  color: white;
}

.tabs .tab a:hover {
  color: #f3f3f3 !important;
}
.tabs .indicator {
  background-color: #fff !important;
}
#formContent {
  margin-top: 40px;
}
</style>
