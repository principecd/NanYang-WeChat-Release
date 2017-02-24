<template lang="jade">
.row
  v-loading(:show='loading')
  form.col.s12.content
      .input-field.col.s12
        input.validate(type="text" v-model='basicData.sqzz' placeholder='' v-bind:disabled="disabled_edit" ,v-bind:class="{ 'vf-invalid-required': startvl&&!basicData.sqzz }")
        label.active 申请确认的资质
      .col.s12
        label.active 申请的人才层次

        v-select(:value.sync='basicData.sqcc', :options='sqcc'  v-bind:disabled="disabled_edit" ,v-bind:class="{ 'vf-invalid-required': startvl&&!basicData.sqcc }")
      .col.s12
        .card
            .card-title 资质材料
            .card-content(v-show='!cacheFile||!cacheFile.length||cacheFile.length==0') 暂无数据
            div(v-for='item in cacheFile')
               .card-content(v-if='item.fileType==".jpg"||item.fileType==".png"||item.fileType==".jpeg"||item.fileType==".bmp"||item.fileType==".gif"')
                 img(style='width: 100%;'  v-bind:src='getSrc(item.fileId)')
               .card-content(v-if='!(item.fileType==".jpg"||item.fileType==".png"||item.fileType==".jpeg"||item.fileType==".bmp"||item.fileType==".gif")')
                  span {{item.fileName}}{{item.fileType}}下载连接（请复制到浏览器中打开）
                    a(style='word-wrap:break-word;') {{getSrc(item.fileId)}}
               a(@click='deleteItem(item.fileId)') 删除
               .card-action
        .card
           .card-title 劳动合同书
           .card-content(v-show='!cacheFile2||!cacheFile2.length||cacheFile2.length==0') 暂无数据
           div(v-for='item in cacheFile2')
             .card-content(v-if='item.fileType==".jpg"||item.fileType==".png"||item.fileType==".jpeg"||item.fileType==".bmp"||item.fileType==".gif"')
               img(style='width: 100%;'  v-bind:src='getSrc(item.fileId)')
              .card-content(v-if='!(item.fileType==".jpg"||item.fileType==".png"||item.fileType==".jpeg"||item.fileType==".bmp"||item.fileType==".gif")')
                span {{item.fileName}}{{item.fileType}}下载连接（请复制到浏览器中打开）
                  a(style='word-wrap:break-word;') {{getSrc(item.fileId)}}
             a(@click='deleteItem(item.fileId)') 删除
             .card-action
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
  .btn.btn-up(v-if='!disabled_edit')
        .card-title(style='color:black;text-align:left;') 资质材料
        .fileupload-button(@click='uploadImg("ZZCL")') 图片文件
        .fileupload-button(style="line-height: 0 !important;")
          div(style="margin-top: 15px;") 其他类型文件
            form(id="uploadForm" enctype="multipart/form-data")
              input(style="margin-top: 10px;" id="ZZCLuploadInput" type="file")
              .waves-effect.waves-light.btn(style="width: 100%;margin-top: 10px;" @click='uploadFile("ZZCL")')上传
  .btn.btn-up(style='margin-top: 140px;' v-if='!disabled_edit')
        .card-title(style='color:black;text-align:left;') 劳动合同书
        .fileupload-button(@click='uploadImg("LDHTS")') 图片文件
        .fileupload-button(style="line-height: 0 !important;")
          div(style="margin-top: 15px;") 其他类型文件
            form(id="uploadForm" enctype="multipart/form-data")
              input(style="margin-top: 10px;" id="LDHTSuploadInput" type="file")
              .waves-effect.waves-light.btn(style="width: 100%;margin-top: 10px;" @click='uploadFile("LDHTS")')上传
  .col.s12(v-for='src in media' v-if='!disabled_edit')
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

  button.waves-effect.waves-light.btn( style='width:100%;margin-top:150px' @click='submitData' v-if='!disabled_edit') 保存

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
        startvl:false,
      disabled_edit:false,
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
    sqId = randomToken(32)
    rest.getOptions('rcrd_cengci').then(res => {
      me.sqcc = this.rebuildOptions(res)
    })

  },
  ready () {

     var me = this
    this.$parent.index = false

    if (this.dataValue && this.$route.query.do) this.basicData = this.dataValue
    if (this.dataValue && this.$route.query.do) {
      me.loading = true
      rest.post(this.user, {sqId:this.dataValue.sqId}, '/rccore/Rcrd/get').then(res => {
        me.loading = false
        //(JSON.stringify(res));
        me.basicData = res.data
      })

      if(this.$route.query.do=='edit'){
          this.disabled_edit=false;
      }else{ this.disabled_edit=true;
      }
      this.getFileList();

    }
        this.startvl=false;

    //this.initAll()

    //this.getList()
  },
  attached () {
    $('#sidenav-overlay').remove()

  },
  methods: {

    getFileList(){
      rest.post(this.user, {useType: 'ZZCL', sqId: this.basicData.sqId||sqId}, '/rccore/RcrdFile/fileList').then(res => {
        //alert(JSON.stringify(res.datas));
        this.cacheFile  = res.datas
      })
      rest.post(this.user, {useType: 'LDHTS', sqId: this.basicData.sqId||sqId}, '/rccore/RcrdFile/fileList').then(res => {
        this.cacheFile2  = res.datas
      })
    },
     uploadFile(useType){
       let vm = this
        if(this.disabled_edit)return;
        let query = {
          'Encoding': 'utf-8',
          'Rpencoding': 'utf-8',
          '_x-requested-with': true,
          'sqId': this.basicData.sqId||sqId,
          'useType': useType
        }

        var file = $('#'+useType+'uploadInput')[0].files[0];
        var formData = new FormData();
        formData.append(file.name,file);
        vm.loading = true;
        rest.postFile2(vm.user, query, formData,'/rccore/RcrdFile/insert')
        .then(res => {
            //alert(JSON.stringify(res));
            if (!res.success) return Materialize.toast(res.message, 4000)
            vm.getFileList();
            vm.media=[];
            vm.loading = false
        });
    },
    uploadImg (useType) {
    if(this.disabled_edit)return;
      let formData = {
        'Encoding': 'utf-8',
        'Rpencoding': 'utf-8',
        '_x-requested-with': true,
        'sqId': this.basicData.sqId||sqId,
        'useType': useType
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
          return rest.postFile(vm.user, formData, serverId, '/rccore/RcrdFile/insert')
        })
        .then(res => {
          if (!res.success) return Materialize.toast(res.message, 4000)
          vm.media=[];
          vm.getFileList();
          vm.loading = false
        })
      });

    },
    deleteItem(fileId){
    if(this.disabled_edit)return;
      //alert(fileId);
      var vm = this;
      vm.loading = true
      rest.delete(vm.user, {refId: fileId}, '/rccore/RcrdFile/delete').then(res => {
      //alert(JSON.stringify(res))
        vm.loading = false
        vm.cacheFile=[];
        vm.cacheFile2=[];
        vm.getFileList()
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
        'sqId': this.basicData.sqId||sqId,
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
       if(!this.startvl){
            this.startvl=true;
      }
      if(!this.basicData.sqcc||!this.basicData.sqcc){
        return;
      }
      this.startvl=false;
      var me = this

      this.basicData.isAdd = this.basicData.sqId ? false : true
      this.basicData.sqId = this.basicData.sqId || sqId
      this.basicData.flowEntityId = this.basicData.sqId
      this.basicData.flowEntityInfo = this.user.username + ' 申请人才认定'
      this.basicData.flowVerId =   JSON.parse(localStorage.getItem('/rccore/Rcrd/flowUI'))[0].flowVerId ;//'BDB6AAC5734A2C5C3A44FA369A272E93'
      this.basicData.flowEntityUI = '/rccore/Rcrd/flowUI'
      this.loading = true

      rest.post(this.user, this.basicData, '/rccore/Rcrd/entitySave').then(res => {
        me.loading = false
        if (!res.success) return Materialize.toast(res.message, 4000)
        if (this.files.length) Materialize.toast('保存成功,正在上传', 2000)
        else Materialize.toast('保存成功', 2000)
         return this.$router.go('/')
        this.files.forEach(file => {
          file.upload()
        })
      })
    },
    getSrc (fileId) {
      //alert(fileId);
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
      var r =  rest.basicUrl +'/rccore/RcxxFile/download?'

      Object.keys(query).forEach(key => {

        r = r + key + '=' + query[key] + '&'
      })
      //alert(r);
      return r
    },
    modal () {
      $('#modal1').openModal()
    }
    /*
    getFileList () {
      var me = this

      rest.post(this.user, {useType: 'RYZS'}, '/rccore/RcxxFile/fileList').then(res => {

        me.fileList = res.datas
      })
    }*/
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
.card .card-title{
  font-size:16px;
}
.vf-invalid-required{
 border-bottom: 1px solid #F44336 !important;
    box-shadow: 0 1px 0 0 #F44336 !important;
}
</style>
