<template lang="jade">
.row(style='margin-top: -25px;')
  v-loading(:show='loading')
  div
    #formContent
      .col.s12(v-for='item in list')
        .card
          .card-content(@click='edit(item)')
            table
              thead

              tbody
                tr(v-if='item.yjcgType_Str')
                  th 业绩成果类型

                  td {{item.yjcgType_Str}}
                tr(v-if='item.yjcgType_Str')
                  th 名称

                  td {{item.name_Str}}
                tr(v-if='item.yjcgType_Str')
                  th 所属乡镇

                  td {{item.csxzId_Str}}
                tr(v-if='item.yjcgType_Str')
                  th 负责人

                  td {{item.fzMan}}
                tr(v-if='item.yjcgType_Str')
                  th 等级

                  td {{item.dengji_Str}}
                tr(v-if='item.yjcgType_Str')
                  th 层次

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
                v-select(:options='yjcgType', :value.sync='yjcgTypeChoose'  v-bind:class="{ 'vf-invalid-required': startv&&!yjcgTypeChoose }")
              .col.s12
                label.active 名称
                input.validate(v-if='isnameText' type="text" ,v-model='postData.nameText' placeholder=''  v-bind:class="{ 'vf-invalid-required': startv&&!postData.nameText }")
                v-select( :options='mc', :value.sync='postData.nameCombo' v-if='!isnameText'  v-bind:class="{ 'vf-invalid-required': startv&&!postData.nameCombo }")
              //- .col.s12
              //-   label.active 名称
              //-   v-select(:options='nameCode', :value.sync='postData.nameCode')
              .col.s12
                label.active 所属乡镇
                v-select(:options='csxzId', :value.sync='postData.csxzId'  v-bind:class="{ 'vf-invalid-required': startv&&!postData.csxzId }")
              .input-field.col.s12
                input.validate(type="text" v-model='postData.ytDept' placeholder=''  v-bind:class="{ 'vf-invalid-required': startv&&!postData.ytDept }")
                label.active 依托单位
              .col.s12
                label.active 主管部门
                v-select(:options='zgbmId', :value.sync='postData.zgbmId'  v-bind:class="{ 'vf-invalid-required': startv&&!postData.zgbmId }")
              .input-field.col.s12
                input.validate(type="text" v-model='postData.fzMan' placeholder=''  v-bind:class="{ 'vf-invalid-required': startv&&!postData.fzMan }")
                label.active 负责人
              .input-field.col.s12
                input.validate(type="date" v-model='postData.xmTime' placeholder=''  v-bind:class="{ 'vf-invalid-required': startv&&!postData.xmTime }")
                label.active 时间
              .input-field.col.s12
                input.validate(type="text" v-model='postData.zyly' placeholder=''  v-bind:class="{ 'vf-invalid-required': startv&&!postData.zyly }")
                label.active 业绩领域
              .col.s12
                label.active 等级
                v-select(:options='dengji', :value.sync='postData.dengji'  v-bind:class="{ 'vf-invalid-required':startv&& !postData.dengji }")
              .col.s12
                label.active 层次
                v-select(:options='cengci', :value.sync='postData.cengci'  v-bind:class="{ 'vf-invalid-required': startv&&!postData.cengci }")
              a.btn.btn-up(@click='uploadImg')
                .fileupload-button 添加业绩成果附件
              .col.s12(v-for='src in media')
                .card
                  .card-image
                    img(v-bind:src='src', style='width: 100%')
              .card
                div(v-for='item in fileList')
                  .card-content
                    img(style='width: 100%', v-bind:src='getSrc(item.fileId)')
                  a(@click='deleteFile(item.fileId)') 删除
                  .card-action
        .modal-footer
          a(class="btn waves-effect waves-light" v-on:click='submitData'  v-if="!(!yjcgTypeChoose||((isnameText&&!postData.nameText)||(!isnameText&&!postData.nameCombo) )||!postData.csxzId||!postData.ytDept||!postData.zgbmId ||! postData.fzMan ||! postData.xmTime ||! postData.zyly ||! postData.dengji  ||!postData.dengji ||! postData.cengci)") 保存
          a(class="waves-effect waves-green btn-flat"  v-on:click='startvf'  v-if="!yjcgTypeChoose||((isnameText&&!postData.nameText)||(!isnameText&&!postData.nameCombo) )||!postData.csxzId||!postData.ytDept||!postData.zgbmId ||! postData.fzMan ||! postData.xmTime ||! postData.zyly ||! postData.dengji  ||!postData.dengji ||! postData.cengci" ) 保存
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
      startv:false,//true开始验证 false 不验证
      yjcgTypeChoose: '',
      media: [],
      loading: false,
      fileUploadUrl: rest.basicUrl + '/rccore/RcxxFile/insert' + this.beforeUpload(),
      yjcgType: [],
      yjcgTypeSelected: {},
      isnameText:false,//是否手动输入name
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

    // Rcyj_xsjlcg
    // 参与(主导)学术交流成果
    rest.getOptions('Rcyj_xsjlcg').then(res => {
      me.yjcgTypeSelected['rcyj_xsjlcg'] = this.rebuildOptions(res)
    })
    // rcyj_kjjx
    // 获得科技奖项
    rest.getOptions('rcyj_kjjx').then(res => {
      me.yjcgTypeSelected['rcyj_kjjx'] = this.rebuildOptions(res)
    })
    // rcyj_ggpx
    // 参与(主导)公共培训
    rest.getOptions('rcyj_ggpx').then(res => {
      me.yjcgTypeSelected['rcyj_ggpx'] = this.rebuildOptions(res)
    })
    // Rcyj_qyjspt
    // 从事(参与)企业技术平台
    rest.getOptions('Rcyj_qyjspt').then(res => {
      me.yjcgTypeSelected['rcyj_qyjspt'] = this.rebuildOptions(res)
    })
    // Rcyj_cycxpt
    // 参与(主导)创业创新平台
    rest.getOptions('Rcyj_cycxpt').then(res => {
      me.yjcgTypeSelected['rcyj_cycxpt'] = this.rebuildOptions(res)
    })
    // rcyj_xyjg
    // 从事(参与)产学研机构
    rest.getOptions('rcyj_xyjg').then(res => {
      me.yjcgTypeSelected['rcyj_xyjg'] = this.rebuildOptions(res)
    })

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


    // rest.getOptions('rcyj_nameCode').then(res => {
    //   me.nameCode = this.rebuildOptions(res)
    // })
  },
  watch: {
    'yjcgTypeChoose': function (newVal, oldVal) {
      this.postData.yjcgType = newVal
      console.log(newVal)
      console.log(this.yjcgTypeSelected)
      this.mc = this.yjcgTypeSelected[newVal]
      console.log(this.mc)
      if(newVal=='rcyj_xsjlcg'||newVal=='rcyj_cycxpt'){//手动输入nameText， nameCombo 空
            this.postData.nameCombo='';
            this.isnameText=true;
      }else{
        this.isnameText=false;
      }

    }
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
    // $('ul.tabs').tabs()
    $('.collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
  },
  methods: {
    startvf(){//开始校验
      this.startv=true;
    },
    edit(item) {

      this.postData = item
      $('#modal1').openModal()
      this.yjcgTypeChoose=item.yjcgType;
      if(this.yjcgTypeChoose=='rcyj_xsjlcg'||this.yjcgTypeChoose=='rcyj_cycxpt'){//手动输入nameText， nameCombo 空
            this.postData.nameCombo='';
            this.isnameText=true;
            this.postData.nameText=item.name_Str;
      }else{
        this.isnameText=false;
        this.postData.nameCombo=item.nameCode;
      }
      this.getFileList();

    },
    uploadImg () {
      let formData = {
        'Encoding': 'utf-8',
        'Rpencoding': 'utf-8',
        '_x-requested-with': true,
        'rcId': this.user.rcId,
        'yjId':this.postData.yjId
      }
      let vm = this
       rest.resetConfig(window.location.href,function(){
             chooseImage()
                  .then(localId => {
                    vm.loading = true
                    vm.media.push(localId)
                    return uploadImage(localId)
                  })
                  .then(serverId => {
                    return rest.postFile(vm.user, formData, serverId, '/rccore/RcyjFile/insert')
                  })
                  .then(res => {
                    if (!res.success)   alert(res.message)  //return Materialize.toast(res.message, 4000)
                    vm.media=[];
                    vm.getFileList();
                    vm.loading = false
                  })
        });
    },
    clear() {
      this.postData = {}
      this.fileList = {}
      this.yjcgTypeChoose ='';
      this.loading=false;
    },
    deleteFile(fileId){
      var vm = this;
      vm.loading = true
      rest.delete(vm.user, {refId: fileId}, '/rccore/RcyjFile/delete').then(res => {

      if (!res.success) return Materialize.toast(res.message, 4000)
        vm.loading = false
        vm.getFileList();
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
      this.postData.isAdd = this.postData.yjId ? 'false' : 'true'
      this.postData.yjId = this.postData.yjId || randomToken(32)

      // this.postData.nameText = this.mc.filter(v => {
      //   return v.value === this.postData.nameCombo
      // })
      // this.postData.nameText = this.postData.nameText[0].label
      // this.postData.nameCombo = this.postData.nameText

      // if (!files.length) return Materialize.toast('')
      $('#modal1').closeModal()
      this.loading = true
      rest.post(this.user, this.postData, '/rccore/Rcyj/save').then(res => {

          this.loading = false
          if (!res.success) {
            Materialize.toast(res.message, 4000)

            return $('#modal1').openModal()
          }
          this.postData = {}
          /*if (media.length) {
            this.loading = true
            Materialize.toast('数据已保存，正在上传附件', 4000)

            uploadImage(media[0])
              .then(serverId => {
                return rest.postFile(this.user, formData, serverId, '/rccore/RcxxFile/insert')
              })
              .then(res => {
                if (!res.success) return Materialize.toast(res.message, 4000)
                vm.loading = false
              })
          }*/
          Materialize.toast('保存成功', 2000)

          me.getList()
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
      this.yjcgTypeChoose='';
    },
    getFileList () {
    /*
      var me = this

      rest.post(this.user, {useType: 'tsinnet/mbmodel/rccore/cnst/UseTypeENUM/ZCZS/code'}, '/rccore/RcxxFile/fileList').then(res => {

        me.fileList = res.datas
      })
    }*/
    /*
      me.list.forEach((value, index) => {
        rest.post(me.user, {yjId: value.yjId}, '/rccore/RcyjFile/fileList').then(cb => {
          if (!res.success) return Materialize.toast(res.message, 4000)
          console.log(cb)
          me.fileList = _.concat(me.fileList, cb.datas)

        })
      }) */

      //alert(JSON.stringify(this.postData))
      let vm = this
      rest.post(this.user, {yjId:  this.postData.yjId}, '/rccore/RcyjFile/fileList').then(res => {
          //alert(JSON.stringify(res));
          if (!res.success)
           {
              //return Materialize.toast(res.message, 4000)
              alert(res.message);
              return ;
           }
          vm.fileList = res.datas
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
.vf-invalid-required{
 border-bottom: 1px solid #F44336 !important;
    box-shadow: 0 1px 0 0 #F44336 !important;
}
table{
table-layout:fixed;
}
table td{
  word-wrap:break-word;
}
</style>
