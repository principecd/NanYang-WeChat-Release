<template lang="jade">
.col.s12
  div.col.s12
    .row
      .col.s12(v-for='item in list')
        .card
          .card-content
            table
              thead

              tbody
                tr
                  th.col.s4 业绩成果类型
                  td.col.s6 {{item.jycgType_Str}}
                  th.col.s4 名称
                  td.col.s6 {{item.name_Str}}
                tr
                  th.col.s4 所属乡镇
                  td.col.s6 {{item.csxzId_Str}}
                  th.col.s4 负责人
                  td.col.s6 {{item.fzMan}}
                tr
                  th.col.s4 等级
                  td.col.s6 {{item.dengji_Str}}
                  th.col.s4 层次
                  td.col.s6 {{item.cengci_Str}}
          //- .card-action
          //-   a(@click='deleteItem(item.zyzcId)') 删除
    v-loading(:show='loading')

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
        a(class="modal-action modal-close waves-effect waves-green btn-flat") 取消
</template>
<script>
import rest from '../rest'
import VueFileUpload from 'vue-file-upload'
import randomToken from 'random-token'
import vSelect from 'vue-select'
import VLoading from './VLoading.vue'

var localStorage = window.localStorage
export default{
  // vuex: {
  //   getters: {
  //     count: getCount
  //   }
  // },
  data () {
    return {
      loading: false,
      yjcgType: [],
      csxzId: [],
      zgbmId: [],
      dengJi: [],
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
          'useType': 'tsinnet/mbmodel/rccore/cnst/UseTypeENUM/ZCZS/code'
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
      me.dengJi = this.rebuildOptions(res)
    })
    rest.getOptions('rcyj_cengci').then(res => {
      me.cengci = this.rebuildOptions(res)
    })

  },
  ready () {
    var me = this
    this.loading = true
    rest.post(this.user, {}, '/rccore/Rcyj/list').then(res => {
      this.loading = false
      me.list = res.datas
    })
  },
  attached () {
  },
  methods: {
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
      this.postData.yjId = randomToken(32)
      this.postData.isAdd = true
      this.loading = true
      rest.post(this.user, this.postData, '/rccore/Rcyj/save').then(res => {
        me.getList()
        me.loading = false
        Materialize.toast('保存成功', 2000)
        $('#modal1').closeModal()
        this.postData = {}
      })
    },
    getSrc (fileId) {
      return '/rccore/RcxxFile/dropdown?refId=' + fileId
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
</style>
