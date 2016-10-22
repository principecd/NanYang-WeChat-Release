<template lang="jade">
.row
  v-loading(:show='loading')
  form.col.s12.content
    //- .input-field.col.s12
    //-   input.validate(type="text" v-model='basicData.rcName' placeholder='', v-bind:disabled='user.username')
    //-   label.active 人才姓名
    .input-field.col.s12
      input.validate(type="text" v-model='basicData.name' placeholder='')
      label.active 配偶姓名
    .col.s12
      label.active 性别
      v-select(:value.sync='basicData.sex', :options='xb')
    .input-field.col.s12
      input.validate(type="month" v-model='basicData.birthday' placeholder='')
      label.active 出生年月
    .input-field.col.s12
      input.validate(type="text" v-model='basicData.gjjg' placeholder='')
      label.active 国籍籍贯
    .input-field.col.s12
      input.validate(type="text" v-model='basicData.idCard' placeholder='')
      label.active 身份证号
    .col.s12
      label.active 人才类别
      v-select(:value.sync='basicData.rclb', :options='rclb')
    .input-field.col.s12
      input.validate(type="text" v-model='basicData.dwInfo' placeholder='')
      label.active 单位信息
    .input-field.col.s12
      input.validate(type="text" v-model='basicData.job' placeholder='')
      label.active 职务
    .input-field.col.s12
      input.validate(type="text" v-model='basicData.telephone' placeholder='')
      label.active 联系电话
    .input-field.col.s12
      input.validate(type="text" v-model='basicData.email' placeholder='')
      label.active 邮箱
    .col.s12
      label.active 申请住房保障类别
      v-select(:value.sync='basicData.sqlb', :options='sqlb')
    .input-field.col.s12
      input.validate(type="text" v-model='basicData.yhzh' placeholder='')
      label.active 开发商银行账号或申请人银行账号
    .input-field.col.s12
      input.validate(type="text" v-model='basicData.remark' placeholder='')
      label.active 说明
    h6 其他成员信息
    table
      thead
        th 姓名
        th 性别
        th 出生年月
        th 身份证
        th 单位信息
      tbody
        tr(v-for='item in myChildren')
          td {{item.name}}
          td {{item.sex}}
          td {{item.birthday}}
          td {{item.idCard}}
          td {{item.dwInfo}}
    .card(v-for='item in cacheFile')
      .card-content
        img(style='width: 100%;', v-bind:src='getSrc(item.fileId)')
      .card-action
        a(@click='deleteFlie(item)') 删除
    .card(v-for='item in cacheFile')
      .card-content
        img(style='width: 100%;', v-bind:src='getSrc(item.fileId)')
      .card-action
        a(@click='deleteFlie(item)') 删除
    a(class='btn waves-effect waves-light red', @click='modal')
      i.fa.fa-plus
    div.modal#modal1.bottom-sheet
      div.modal-dialog(style='padding: 20px')
        div.modal-content
          div.modal-header
          div.modal-body
            div.form-group
              div.col-lg-10
                input(type="text" class="form-control" placeholder="姓名" v-model="child.name")
            .col.s12
              label.active 性别
              v-select(:value.sync='child.sex', :options='xb')

            div.form-group
              div.col-lg-10
                input(type="month" class="form-control" placeholder="出生年月" v-model="child.birthday")
            div.form-group
              div.col-lg-10
                input(type="text" class="form-control" placeholder="身份证" v-model="child.idCard")
            div.form-group
              div.col-lg-10
                input(type="text" class="form-control" placeholder="单位信息" v-model="child.dwInfo")
            div.form-group
              div.col-lg-10
                input(type="text" class="form-control" placeholder="与申请人关系" v-model="child.cygx")
          div.modal-footer
            a(class="btn waves-effect waves-green" v-on:click="addChild") 确认
            a(class="modal-action modal-close waves-effect waves-green btn-flat") 取消
    br
    br
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
    //- a.btn.btn-up
    //-   vue-file-upload(v-bind:url='fileUploadUrl("GFHT")',
    //-     v-bind:files.sync = 'files',
    //-     v-bind:filters = "filters",
    //-     v-bind:events = 'cbEvents',
    //-     v-bind:request-options = "reqoptsZZCL",
    //-     name='fileData',
    //-     label='商品房购房合同（或购房发票和房产证）'
    //-     )
    //- br
    //- br
    //- a.btn.btn-up
    //-   vue-file-upload(v-bind:url='fileUploadUrl("XXZM")',
    //-     v-bind:files.sync = 'files',
    //-     v-bind:filters = "filters",
    //-     v-bind:events = 'cbEvents',
    //-     v-bind:request-options = "reqoptsLDHTS",
    //-     name='fileData',
    //-     label='房屋信息证明'
    //-     )
    a.btn.btn-up(@click='uploadImg("GFHT")')
      .fileupload-button 商品房购房合同（或购房发票和房产证）
    a.btn.btn-up(@click='uploadImg("XXZM")')
      .fileupload-button 房屋信息证明
    button.waves-effect.waves-light.btn(@click='submitData') 保存

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
import VLoading from './VLoading.vue'
import sha1 from 'sha1'
import _ from 'lodash'
import { getData } from '../vuex/getters'
import { uploadImage } from '../rest'
import { chooseImage } from '../rest'

var localStorage = window.localStorage
var poId = randomToken(32)

export default{
  vuex: {
    getters: {
      dataValue: getData
    }
  },
  props: ['index'],
  data () {
    return {
      loading: false,
      xb: [
        {value: '1', label: '男'},
        {value: '0', label: '女'}
      ],
      cacheFile2: [],
      cacheFile: [],
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
      },
      reqoptsZXHKB: {
        alias: 'fileData',
        formData: {
          'Encoding': 'utf-8',
          'Rpencoding': 'utf-8',
          '_x-requested-with': true,
          'ssoOpenId': this.user.ssoOpenId,
          'rcId': this.user.rcId,
          // zxId: zxId,
          'useType': 'GFHT'
        },
        responseType: 'json',
        withCredentials: false
      },
      reqoptsZXCSZ: {
        alias: 'fileData',
        formData: {
          'Encoding': 'utf-8',
          'Rpencoding': 'utf-8',
          '_x-requested-with': true,
          'ssoOpenId': this.user.ssoOpenId,
          'rcId': this.user.rcId,
          // zxId: zxId,
          'useType': 'XXZM'
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
    rest.getOptions('rcgfbt_sqlb').then(res => {
      me.sqlb = this.rebuildOptions(res)
    })

  },
  ready () {
    this.$parent.index = false

    if (this.dataValue && this.$route.query.do) this.basicData = this.dataValue
    if (this.dataValue) {
      rest.post(this.user, {poId: this.dataValue.poId}, '/rccore/Qtcy/list').then(res => {
        res.datas.forEach(v => {
          v.saveInDatebase = 'false'
        })
        this.myChildren  = res.datas
      })
    }
    if (this.dataValue) {
      rest.post(this.user, {useType: 'GFHT', poId: this.dataValue.poId}, '/rccore/RcpoFile/fileList').then(res => {
        this.cacheFile  = res.datas
      })
    }
    if (this.dataValue) {
      rest.post(this.user, {useType: 'XXZM', poId: this.dataValue.poId}, '/rccore/RcpoFile/fileList').then(res => {
        this.cacheFile2  = res.datas
      })
    }
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
        'rcId': rcId,
        'useType': useType
      }
      let vm = this
      vm.loading = true
      chooseImage()
        .then(localId => {
          return uploadImage(localId)
        })
        .then(serverId => {
          return rest.get(this.user, formData, '/rccore/RcpoFile/insert')
        })
        .then(res => {
          vm.loading = false
        })
    },
    deleteFlie(item) {
      this.loading = true
      rest.post(this.user, {refId: item.fileId}, '/rccore/RcpoFile/delete').then(res => {
        this.loading = false

        if (!res.success) return Materialize.toast(res.message, 4000)

        if (this.dataValue) {
          rest.post(this.user, {useType: 'GFHT'}, '/rccore/RcpoFile/fileList').then(res => {
            this.cacheFile  = res.datas
          })
        }
        if (this.dataValue) {
          rest.post(this.user, {useType: 'XXZM'}, '/rccore/RcpoFile/fileList').then(res => {
            this.cacheFile2  = res.datas
          })
        }
      })
    },
    closeModal() {
      $('#modal1').closeModal()
    },
    fileUploadUrl (useType) {
      return rest.basicUrl + '/rccore/RcpoFile/insert' + this.beforeUpload(useType)
    },
    // deleteItem (id) {
    //   rest.post(this.user, {ryId: id}, '/rccore/Rych/delete').then(res => {
    //
    //     this.getList()
    //   })
    // },
    addChild() {
      this.child.cyId = randomToken(32)
      this.child.poId = this.basicData.poId || poId
      this.child.saveInDatebase = true
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
      var me = this

      this.basicData.isAdd = this.basicData.poId ? false : true
      this.basicData.poId = this.basicData.poId || poId
      this.basicData.flowEntityId = this.basicData.poId
      this.basicData.flowEntityInfo = this.user.username + ' 申请购房补贴'
      this.basicData.flowVerId = 'BDB6AAC5734A2C5C3A44FA369A272E93',
      this.basicData.flowEntityUI = '/rccore/Rcpo/flowUI'
      this.basicData.qtcyInfo = this.myChildren
      this.basicData.qtcyInfo = JSON.stringify(this.basicData.qtcyInfo)
      this.basicData.rcName = this.user.username

      this.loading = true

      rest.post(this.user, this.basicData, '/rccore/Rcpo/entitySave').then(res => {
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
.content {
  padding: 0 20px;
}
.card-image {
  text-align: center;
  min-height: 150px;
  padding-top: 55px;
}
.fileupload-button {
  /*background-color: #666 !important;*/
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
