<template lang="jade">
.row(style='margin-top: -25px;')
  v-loading(:show='loading')
  div
    #formContent
      .col.s12(v-for='item in list')
        .card
          .card-img
            img(v-for='foo in fileList', style='width: 100%', v-bind:src='getSrc(foo.fileId)', v-if='foo.yjId === item.yjId')
          .card-content(@click='edit(item)')
            table.responsive-table
              thead
                tr
                  th 业绩成果类型
                  th 名称
                  th 所属乡镇
                  th 负责人
                  th 等级
                  th 层次
              tbody
                tr
                  td {{item.yjcgType_Str}}
                  td {{item.name_Str}}
                  td {{item.csxzId_Str}}
                  td {{item.fzMan}}
                  td {{item.dengji_Str}}
                  td {{item.cengci_Str}}
          .card-action
            a(@click='deleteItem(item.yjId)') 删除
      a(v-on:click="modal" class='btn-floating btn-large waves-effect waves-light red btn-add')
        span.fa.fa-plus
      .modal#modal1.col.s12.bottom-sheet
        .modal-content
          .row
            form.col.s12
              .col.s12
                label.active 业绩成果类型
                v-select(:options='yjcgType', :value.sync='postData.yjcgType')
              //- .col.s12
              //-   label.active 名称
              //-   v-select(:options='nameCode', :value.sync='postData.nameCode')
              .col.s12
                label.active 所属乡镇
                v-select(:options='csxzId', :value.sync='postData.csxzId')
              .input-field.col.s12
                input.validate(type="text" v-model='postData.ytDept' placeholder='')
                label.active 依托单位
              .col.s12
                label.active 主管部门
                v-select(:options='zgbmId', :value.sync='postData.zgbmId')
              .input-field.col.s12
                input.validate(type="text" v-model='postData.fzMan' placeholder='')
                label.active 负责人
              .input-field.col.s12
                input.validate(type="date" v-model='postData.xmTime' placeholder='')
                label.active 时间
              .input-field.col.s12
                input.validate(type="text" v-model='postData.zyly' placeholder='')
                label.active 业绩领域
              .col.s12
                label.active 名称
                v-select(:options='mc', :value.sync='postData.nameCombo')
              .col.s12
                label.active 等级
                v-select(:options='dengji', :value.sync='postData.dengji')
              .col.s12
                label.active 层次
                v-select(:options='cengci', :value.sync='postData.cengci')
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
              //-       //- td(style='text-align: center')
              //-       //-   button(type='button',@click="uploadItem(file)") 上传
              //- a.btn.btn-up
              //-   vue-file-upload(v-bind:url='fileUploadUrl',
              //-     v-bind:files.sync = 'files',
              //-     v-bind:filters = "filters",
              //-     v-bind:events = 'cbEvents',
              //-     v-bind:request-options = "reqopts"
              //-     name='fileData',
              //-     label='添加业绩成果附件'
              //-     )
              a.btn.btn-up(@click='uploadImg')
                .fileupload-button 添加业绩成果附件
              .col.s12(v-for='src in media')
                .card
                  .card-image
                    img(v-bind:src='src', style='width: 100%')
        .modal-footer
          a(class="btn waves-effect waves-light" v-on:click='submitData') 保存
          a(class="modal-action modal-close waves-effect waves-green btn-flat", @click='clear') 取消
    //- #fileContent
    //-   .col.s12(v-for='item in fileList')
    //-     .card
    //-       .card-image
    //-         .preloader-wrapper.active(v-show='')
    //-           .spinner-layer.spinner-green-only
    //-             .circle-clipper.left
    //-               .circle
    //-             .gap-patch
    //-               .circle
    //-             .circle-clipper.right
    //-               .circle
    //-         img(v-bind:src='getSrc(item.fileId)')
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
      yjcgType: [],
      csxzId: [],
      zgbmId: [],
      dengji: [],
      nameCode: [],
      mc: [],
      cengci: [],
      yjId: {},
      postData: {
      },
      list: [],
      files:[],
      //文件过滤器，只能上传图片
      fileList: [],
      filters: [
        {
          name:"imageFilter",
          fn (file) {
              var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
              return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
          }
        }
      ],
      //回调函数绑定
      cbEvents: {
        onCompleteUpload: (file,response,status,header) => {

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
          'rcId': this.user.rcId
        },
        responseType: 'json',
        withCredentials: false
      }
    }
  },
  init () {
    var me = this

    this.user = JSON.parse(localStorage.getItem('baseInfo'))
    rest.getOptions('rcyj_yjType').then(res => {
      me.yjcgType = this.rebuildOptions(res)
    })
    rest.getOptions('rcyj_xzjd').then(res => {
      me.csxzId = this.rebuildOptions(res)
    })
    rest.getOptions('rcyj_zgbm').then(res => {
      me.zgbmId = this.rebuildOptions(res)
    })
    rest.getOptions('rcyj_dj').then(res => {
      me.dengji = this.rebuildOptions(res)
    })
    rest.getOptions('rcyj_cengci').then(res => {
      me.cengci = this.rebuildOptions(res)
    })
    rest.getOptions('rcyj_xyjg').then(res => {
      me.mc = this.rebuildOptions(res)
    })

    // rest.getOptions('rcyj_nameCode').then(res => {
    //   me.nameCode = this.rebuildOptions(res)
    // })
  },
  ready () {
    var me = this
    this.loading = true

    rest.post(this.user, {}, '/rccore/Rcyj/list').then(res => {
      this.loading = false

      me.list = res.datas
      me.list.forEach((value, index) => {
        rest.post(me.user, {yjId: value.yjId}, '/rccore/RcyjFile/fileList').then(cb => {
          if (!res.success) return Materialize.toast(res.message, 4000)
          console.log(cb)
          me.fileList = _.concat(me.fileList, cb.datas)

        })
      })
    })
  },
  attached () {
    // $('ul.tabs').tabs()
    $('.collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
  },
  methods: {
    edit(item) {
      this.postData = item
      $('#modal1').openModal()
    },
    uploadImg () {
      let formData = {
        'Encoding': 'utf-8',
        'Rpencoding': 'utf-8',
        '_x-requested-with': true,
        'rcId': this.user.rcId
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
        '_x-requested-with' : true
      }
      var k = '?'
      Object.keys(r).forEach(v => {
        k = k + v + '=' + r[v] + '&'
      })

      return k
    },
    deleteItem(id) {
      rest.post(this.user, {yjId: id}, '/rccore/Rcyj/delete').then(res => {

        this.getList()
      })
    },
    getList () {
      var me = this

      rest.post(this.user, {}, '/rccore/Rcyj/list').then(res => {
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
        this.loading = false
        Materialize.toast('上传成功', 2000)
        return "上传成功"
      }else if(file.isError){
        this.loading = false

        Materialize.toast('上传失败', 2000)
        return "上传失败"
      }else if(file.isUploading){
        // Materialize.toast('正在上传', 2000)
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
      this.postData.yjId = randomToken(32)
      this.postData.isAdd = true
      this.postData.nameText = this.mc.filter(v => {
        return v.value === this.postData.nameCombo
      })
      this.postData.nameText = this.postData.nameText[0].label
      // this.postData.nameCombo = this.postData.nameText

      // if (!files.length) return Materialize.toast('')
      $('#modal1').closeModal()
      this.loading = true
      rest.post(this.user, this.postData, '/rccore/Rcyj/save').then(res => {
        this.loading = false
        if (!res.success) return Materialize.toast(res.message, 4000)
        if (files.length) {
          files[0].upload()
          this.loading = true

          Materialize.toast('数据已保存，正在上传附件', 4000)
        }
        this.postData = {}
        me.getList()
        // Materialize.toast('保存成功', 2000)
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

      rest.post(this.user, {useType: 'tsinnet/mbmodel/rccore/cnst/UseTypeENUM/ZCZS/code'}, '/rccore/RcxxFile/fileList').then(res => {

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
td,th {
  padding: 0;
}
</style>
