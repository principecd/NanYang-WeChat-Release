<template lang="jade">
.row
  v-loading(:show='loading')
  v-progress(:progress='progress', :uploading='uploading' )
  //- pre {{dataValue | json}}
  form.col.s12.content
    .input-field.col.s12
      input.validate(type="text" v-model='basicData.najzdz' placeholder='' v-bind:disabled="disabled_edit" ,v-bind:class="{ 'vf-invalid-required': startvlwc&&!basicData.najzdz }")
      label.active 在南安居住地址
    .input-field.col.s12
      input.validate(type="text" v-model='basicData.hkss' placeholder='' v-bind:disabled="disabled_edit" ,v-bind:class="{ 'vf-invalid-required': startvlwc&&!basicData.hkss }")
      label.active 户口所属单位
    h6 子女情况基本信息
    table
      thead
        th 与申请人关系
        th 姓名
        th 性别
        th 出生年月
        th 现就读学校及年级
        th 拟申请就读学校及年级
        th 删除
      tbody
        tr(v-for='item in myChildren')
          td( @click='modal($index)' ) {{item.syrgx}}
          td( @click='modal($index)' ) {{item.xm}}
          td( @click='modal($index)' ) {{item.xb === "1" ? "男" : "女" }}
          td( @click='modal($index)' ) {{item.csny}}
          td( @click='modal($index)' ) {{item.xjdxxnj}}
          td( @click='modal($index)' ) {{item.sqxxnj}}
          td(@click='deletechild($index)' class='btn waves-effect waves-light red') 删除
    //- .card(v-for='item in cacheFile')
    //-  .card-content
    //-   img(style='width: 100%;', v-bind:src='getSrc(item.fileId)')
      //- .card-action
      //-   a(@click='deleteFlie(item)') 删除
    a(class='btn waves-effect waves-light red', @click='modal')
      i.fa.fa-plus
    div.modal#modal1.bottom-sheet
      div.modal-dialog(style='padding: 20px')
        div.modal-content
          div.modal-header
          div.modal-body
            div.form-group
              div.col-lg-10
                input(type="text" class="form-control" placeholder="与申请人关系"     v-model="child.syrgx" ,v-bind:class="{ 'vf-invalid-required': startvl&&!child.syrgx }")
            div.form-group
              div.col-lg-10
                input(type="text" class="form-control" placeholder="姓名"     , v-model="child.xm"  ,v-bind:class="{ 'vf-invalid-required': startvl&&!child.xm }")
            .col.s12(style="padding:0;")
              label.active 性别
              v-select(:value.sync='child.xb', :options='xb'       ,v-bind:class="{ 'vf-invalid-required': startvl&&!child.xb }")
            div.form-group
              div.col-lg-10(style="padding:0;")
                label.active 出生年月
                input(type="month" class="form-control" placeholder="出生年月" v-model="child.csny"  ,v-bind:class="{ 'vf-invalid-required': startvl&&!child.csny }")
            div.form-group
              div.col-lg-10
                input(type="text" class="form-control" placeholder="现就读学校及年级" v-model="child.xjdxxnj"  ,v-bind:class="{ 'vf-invalid-required': startvl&&!child.xjdxxnj }")
            div.form-group
              div.col-lg-10
                input(type="text" class="form-control" placeholder="拟申请就读学校及年级" v-model="child.sqxxnj"  ,v-bind:class="{ 'vf-invalid-required': startvl&&!child.sqxxnj }")
          div.modal-footer
            a(class="btn waves-effect waves-green" v-on:click="addChild") 确认
            a(class="modal-action modal-close waves-effect waves-green btn-flat") 取消
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
    //-         a(type='button',@click="uploadItem(file)") 上传
    //- br
    //- br
    //- a.btn.btn-up
    //-   vue-file-upload(v-bind:url='fileUploadUrl("ZXHKB")',
    //-     v-bind:files.sync = 'files',
    //-     v-bind:filters = "filters",
    //-     v-bind:events = 'cbEvents',
    //-     v-bind:request-options = "reqoptsZXHKB",
    //-     name='fileData',
    //-     label='户口本'
    //-     )
    //- br
    //- br
    //- a.btn.btn-up
    //-   vue-file-upload(v-bind:url='fileUploadUrl("ZXCSZ")',
    //-     v-bind:files.sync = 'files',
    //-     v-bind:filters = "filters",
    //-     v-bind:events = 'cbEvents',
    //-     v-bind:request-options = "reqoptsZXCSZ",
    //-     name='fileData',
    //-     label='出生证'
    //-     )
    //-
    //- br
    //- br
    br

    .col.s12(v-for='src in media')
      .card
        .card-image
          img(v-bind:src='src', style='width: 100%')
    .col.sl2
    .card
        .card-title 户口本
        .card-content(v-show='!cacheFile||!cacheFile.length||cacheFile.length==0') 暂无数据
        div(v-for='item in cacheFile')
          .card-content(v-if='item.fileType==".jpg"||item.fileType==".png"||item.fileType==".jpeg"||item.fileType==".bmp"||item.fileType==".gif"')
            img(style='width: 100%;'  v-bind:src='getSrc(item.fileId)')
          .card-content(v-if='!(item.fileType==".jpg"||item.fileType==".png"||item.fileType==".jpeg"||item.fileType==".bmp"||item.fileType==".gif")')
            span {{item.fileName}}{{item.fileType}}下载连接（请复制到浏览器中打开）
              a(style='word-wrap:break-word;') {{getSrc(item.fileId)}}
          a(@click='deleteFile(item.fileId)') 删除
          .card-action

    .card
        .card-title 出生证
        .card-content(v-show='!cacheFile2||!cacheFile2.length||cacheFile2.length==0') 暂无数据
        div(v-for='item in cacheFile2')
           .card-content(v-if='item.fileType==".jpg"||item.fileType==".png"||item.fileType==".jpeg"||item.fileType==".bmp"||item.fileType==".gif"')
              img(style='width: 100%;'  v-bind:src='getSrc(item.fileId)')
            .card-content(v-if='!(item.fileType==".jpg"||item.fileType==".png"||item.fileType==".jpeg"||item.fileType==".bmp"||item.fileType==".gif")')
              span {{item.fileName}}{{item.fileType}}下载连接（请复制到浏览器中打开）
                a(style='word-wrap:break-word;') {{getSrc(item.fileId)}}
           a(@click='deleteFile(item.fileId)') 删除
           .card-action
  .btn.btn-up(v-if='!disabled_edit')
      .card-title(style='color:black;text-align:left;') 户口本
      .fileupload-button(@click='uploadImg("ZXHKB")') 图片文件
      .fileupload-button(style="line-height: 0 !important;")
        div(style="margin-top: 15px;") 其他类型文件
          form(id="uploadForm" enctype="multipart/form-data")
            input(style="margin-top: 10px;" id="ZXHKBuploadInput" type="file")
            .waves-effect.waves-light.btn(style="width: 100%;margin-top: 10px;" @click='uploadFile("ZXHKB")')上传

  .btn.btn-up(style='margin-top: 140px;' v-if='!disabled_edit')
      .card-title(style='color:black;text-align:left;') 出生证
      .fileupload-button(@click='uploadImg("ZXCSZ")') 图片文件
      .fileupload-button(style="line-height: 0 !important;")
        div(style="margin-top: 15px;") 其他类型文件
          form(id="uploadForm" enctype="multipart/form-data")
            input(style="margin-top: 10px;" id="ZXCSZuploadInput" type="file")
            .waves-effect.waves-light.btn(style="width: 100%;margin-top: 10px;" @click='uploadFile("ZXCSZ")')上传

  button.waves-effect.waves-light.btn(style="width: 100%;margin-top: 140px;" @click='submitData' v-if='!disabled_edit') 保存
</template>
<script>
import rest from '../rest'
import VueFileUpload from 'vue-file-upload'
import randomToken from 'random-token'
import vSelect from './VSelect.vue'
import VLoading from './VLoading.vue'
import sha1 from 'sha1'
import _ from 'lodash'
import VProgress from '../components/VProgress.vue'
import { getData } from '../vuex/getters'
import { uploadImage } from '../rest'
import { chooseImage } from '../rest'

var zxId = randomToken(32)
var localStorage = window.localStorage

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
     startvlwc:false,
      disabled_edit:false,
      media: [],
      xb: [
        {value: '1', label: '男'},
        {value: '0', label: '女'}
      ],
      cacheFile: [],
      cacheFile2:[],
      uploading: false,
      progress: 0,
      loading: false,
      myChildren: [],
      child: {},
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
           this.getFileList()
        }
      },
      //xhr请求附带参数

      reqoptsZXHKB: {
        alias: 'fileData',
        responseType: 'json',
        withCredentials: false
      },
      reqoptsZXCSZ: {
        alias: 'fileData',
        responseType: 'json',
        withCredentials: false
      }
    }
  },
  init () {
    this.user = JSON.parse(localStorage.getItem('baseInfo'))
    zxId = randomToken(32)
    var me = this
    rest.getOptions('rcrd_cengci').then(res => {
      me.sqcc = this.rebuildOptions(res)
    })

  },
  ready () {
    this.$parent.index = false

    if (this.dataValue && this.$route.query.do) this.basicData = this.dataValue
    if (this.dataValue&& this.$route.query.do) {
      rest.post(this.user, {zxId: this.dataValue.zxId}, '/rccore/Zxzn/list').then(res => {
        res.datas.forEach(v => {
          v.saveInDatebase = 'false'
        })
        this.myChildren  = res.datas
      })

      this.getFileList();
      if(this.$route.query.do=='edit'){
              this.disabled_edit=false;
          }else{ this.disabled_edit=true;
      }
    }
    this.startvlwc=false;
    this.startvl=false;

  },
  attached () {
    $('#sidenav-overlay').remove()

  },
  watch: {
  },
  methods: {
     deletechild(index){

       this.myChildren.splice(index, 1);
    },
    uploadFile(useType){
     let vm = this
        if(this.disabled_edit)return;
         let query = {
        'Encoding': 'utf-8',
        'Rpencoding': 'utf-8',
        '_x-requested-with': true,
        'zxId': vm.basicData.zxId||zxId,
        'useType': useType
      }

        var file = $('#'+useType+'uploadInput')[0].files[0];
        var formData = new FormData();
        formData.append(file.name,file);
        vm.loading = true;
        rest.postFile2(vm.user, query, formData,'/rccore/ZxFile/insert')
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
      let vm = this
      let formData = {
        'Encoding': 'utf-8',
        'Rpencoding': 'utf-8',
        '_x-requested-with': true,
        'zxId': vm.basicData.zxId||zxId,
        'useType': useType
      }

      rest.resetConfig(window.location.href,function(){
       chooseImage()
        .then(localId => {
          vm.loading = true
          vm.media.push(localId)
          return uploadImage(localId)
        })
        .then(serverId => {
          return rest.postFile(vm.user, formData, serverId, '/rccore/ZxFile/insert')
        })
        .then(res => {
          if (!res.success) return Materialize.toast(res.message, 4000)
          vm.media=[];
          vm.getFileList();
          vm.loading = false
        })
      });

    },
    deleteFile(fileId){
      if(this.disabled_edit)return;
      var vm = this;
      vm.loading = true
      rest.delete(vm.user, {refId: fileId}, '/rccore/ZxFile/delete').then(res => {

      if (!res.success) return Materialize.toast(res.message, 4000)
        vm.loading = false
        vm.getFileList();
      })
    },
    /*
    deleteFlie(fileId) {
      var me = this
      this.loading = true
      rest.post(me.user, {refId: item.fileId}, '/rccore/SettledAddressFile/delete').then(res => {
        me.loading = false

        if (!res.success) return Materialize.toast(res.message, 4000)

        if (me.dataValue) {
          rest.post(me.user, {zxId: me.dataValue.zxId}, '/rccore/Zxzn/list').then(res => {
            me.cacheFile  = res.datas
          })
        }
      })
    },
    */
    closeModal() {
      $('#modal1').closeModal()
    },
    addChild() {
    if(!this.startvl){
          this.startvl=true;
    }
    if(!this.child.syrgx||!this.child.xm||!this.child.xb||!this.child.csny||!this.child.xjdxxnj||!this.child.sqxxnj){
      return;
    }
     this.startvl=false;
     if(!this.child.znId||this.child.znId==''){
         this.child.znId = randomToken(32)
        this.child.rcId = this.user.rcId
        this.child.zxId = this.basicData.zxId || this.zxId
        this.myChildren.push(this.child)

      }else{
        for(var i =0;i<this.myChildren.length;i++){
          if(this.child.znId==this.myChildren[i].znId){
            this.myChildren[i]=this.child;
            break;
          }
        }
      }
      $('#modal1').closeModal()
      this.child={};

    },
    fileUploadUrl (useType) {
      return rest.basicUrl + '/rccore/ZxFile/insert' + this.beforeUpload(useType)
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
        zxId: this.basicData.zxId||zxId,
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

      rest.post(this.user, {}, '/rccore/Zx/page').then(res => {
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
        Materialize.toast('上传成功', 4000)
        return "上传成功"
      }else if(file.isError){
        Materialize.toast('上传失败', 4000)
        return "上传失败"
      }else if(file.isUploading){
        Materialize.toast('正在上传', 4000)
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
       if(!this.startvlwc){
          this.startvlwc=true;
      }
      if(!this.basicData.hkss||!this.basicData.najzdz){
        return;
      }
       this.startvlwc=false;

      var me = this

      this.basicData.isAdd = this.basicData.zxId ? false : true
      this.basicData.zxId = this.basicData.zxId || zxId
      this.basicData.flowEntityId = this.basicData.zxId
      this.basicData.flowEntityInfo = this.user.username + ' 申请子女择校'
      this.basicData.flowVerId =  JSON.parse(localStorage.getItem('/rccore/Zx/flowUI'))[0].flowVerId;//'41B557D7F306047DE5AF2892BC543065',
      this.basicData.flowEntityUI = '/rccore/Zx/flowUI'

      this.basicData.zxznData = this.myChildren
      this.basicData.zxznData = JSON.stringify(this.basicData.zxznData)

      this.loading = true

      rest.post(this.user, this.basicData, '/rccore/Zx/entitySave').then(res => {
        me.loading = false
        if (!res.success) return Materialize.toast(res.message, 4000)
        if (me.files.length) Materialize.toast('保存成功,正在上传', 2000)
        else Materialize.toast('保存成功', 2000)
         return this.$router.go('/')
        me.files.forEach(file => {
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
      var r =  rest.basicUrl +'/rccore/RcxxFile/download?'

      Object.keys(query).forEach(key => {

        r = r + key + '=' + query[key] + '&'
      })
      return r
    },
    modal (index) {
      if(this.disabled_edit)return;
      if(typeof index =='number'){
        this.child=this.myChildren[index];
      }else{
        this.child={};
      }
      $('#modal1').openModal()
    },
    getFileList () {

      var me = this
       me.cacheFile  =[]
       me.cacheFile2 = []
      //rest.post(this.user, {useType: 'RYZS'}, '/rccore/RcxxFile/fileList').then(res => {
      //  me.fileList = res.datas
      //})

        rest.post(me.user, {useType: 'ZXHKB', zxId: me.basicData.zxId||zxId}, '/rccore/ZxFile/fileList').then(res => {


          me.cacheFile  = res.datas
        })

        rest.post(me.user, {useType: 'ZXCSZ', zxId: me.basicData.zxId||zxId}, '/rccore/ZxFile/fileList').then(res => {


          me.cacheFile2  = res.datas
        })

    }
  },
  components: {
    VueFileUpload,
    vSelect,
    VLoading,
    VProgress
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
.vf-invalid-customValidator{
  border-bottom: 1px solid #F44336 !important;
  box-shadow: 0 1px 0 0 #F44336 !important;
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
