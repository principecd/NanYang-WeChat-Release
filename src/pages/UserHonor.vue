<template lang="jade">
.row(style='margin-top: -25px;')
  v-loading(:show='loading')
  div
    ul.tabs
      li.tab.col.s3.active
        a(href="#formContent") 荣誉称号
      li.tab.col.s3
        a(href="#fileContent") 荣誉证书
    #formContent
      .col.s12(v-for='item in list')
        .card
          .card-content(@click='edit(item)')
            table
              thead
              tbody
                tr(v-if='item.dengJi_Str')
                  th.col.s4 等级
                  td.col.s6 {{item.dengJi_Str}}
                tr(v-if='item.rych_Str')

                  th.col.s4 荣誉称号
                  td.col.s6 {{item.rych_Str}}
          .card-action
            a(@click='deleteItem(item.ryId)') 删除
      a(v-on:click="modal" class='btn-floating btn-large waves-effect waves-light red btn-add')
        span.fa.fa-plus
      .modal#modal1.col.s12.bottom-sheet
        .modal-content
          .row
            form.col.s12
              .col.s12
                label.active 等级
                v-select(:options='dengJi', :value.sync='postData.dengJi')
              .col.s12
                label.active 荣誉称号
                v-select(v-if='postData.dengJi ==="rych_guoJia"', :options='guoJia', :value.sync='postData.rych')
                v-select(v-if='postData.dengJi ==="rych_shengJi"', :options='shengJi', :value.sync='postData.rych')
                v-select(v-if='postData.dengJi ==="rych_quanZhou"', :options='quanZhou', :value.sync='postData.rych')
                v-select(v-if='postData.dengJi ==="rych_nanAn"', :options='nanAn', :value.sync='postData.rych')

        .modal-footer
          a(class="btn waves-effect waves-light" v-on:click='submitData') 保存
          a(class="modal-action modal-close waves-effect waves-green btn-flat", @click='clear') 取消
    #fileContent
      br
      div.col.s12
        .col.s12
          br
          a.btn.btn-up(@click='uploadImg')
            .fileupload-button 添加荣誉证书
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
  data () {
    return {
      media: [],
      loading: false,
      fileUploadUrl: rest.basicUrl + '/rccore/RcxxFile/insert' + this.beforeUpload(),
      dengJi: [],
      rych: {
        'rych_guoJia': this.guoJia,
        'rych_nanAn': this.nanAn,
        'rych_shengJi': this.shengJi,
        'rych_quanZhou': this.quanZhou
      },
      zydj: [],
      zgbmId: [],
      ryId: {},
      quanZhou: [],
      guoJia: [],
      nanAn: [],
      shengJi: [],
      postData: {
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
          this.getFileList()
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
  // watch: {
  //   'postData.dengJi': (newVal, old) => {
  //     var k = newVal.split('_')[1]
  //     this.rclb = this[k]
  //   }
  // },
  init () {
    var me = this
    this.user = JSON.parse(localStorage.getItem('baseInfo'))

    rest.getOptions('rych_dengJi').then(res => {
      me.dengJi = this.rebuildOptions(res)
    })
    rest.getOptions('rych_guoJia').then(res => {
      me.guoJia = this.rebuildOptions(res)
    })
    rest.getOptions('rych_nanAn').then(res => {
      me.nanAn = this.rebuildOptions(res)
    })
    rest.getOptions('rych_quanZhou').then(res => {
      me.quanZhou = this.rebuildOptions(res)
    })
    rest.getOptions('rych_shengJi').then(res => {
      me.shengJi = this.rebuildOptions(res)
    })

  },
  ready () {
    var me = this
    me.loading = true
    rest.post(this.user, {}, '/rccore/Rych/list').then(res => {
      me.loading = false
      me.list = res.datas
    })

    rest.post(this.user, {useType: 'RYZS'}, '/rccore/RcxxFile/fileList').then(res => {

      me.fileList = res.datas
    })
  },
  attached () {
    $('ul.tabs').tabs()
  },
  methods: {
    uploadImg () {
      let formData = {
        'Encoding': 'utf-8',
        'Rpencoding': 'utf-8',
        '_x-requested-with': true,
        'rcId': this.user.rcId,
        'useType': 'RYZS'
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
    edit(item) {
      this.postData = item
      $('#modal1').openModal()
    },
    formatSelect() {

    },
    deleteItem (id) {
      rest.post(this.user, {ryId: id}, '/rccore/Rych/delete').then(res => {

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
      rest.post(this.user, {}, '/rccore/Rych/list').then(res => {
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

      this.postData.isAdd = this.postData.ryId ? 'false' : 'true'
      this.postData.ryId = this.postData.ryId || randomToken(32)
      this.loading = true
      $('#modal1').closeModal()

      rest.post(this.user, this.postData, '/rccore/Rych/save').then(res => {
        me.loading = false
        me.postData = {}
        if (!res.success) return Materialize.toast(res.message, 4000)
        me.getList()
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

.card-image {
  text-align: center;
  min-height: 150px;
  padding-top: 55px;
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
.btn-add {
  position: fixed;
  bottom: 30px;
  right: 30px;
}
.modal {
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
