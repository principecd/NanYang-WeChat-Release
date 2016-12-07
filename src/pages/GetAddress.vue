<template lang="jade">
.row
  v-loading(:show='loading')
  v-progress(:progress='progress', :uploading='uploading')
  form.col.s12.content
    .input-field.col.s12
      input.validate(type="text" v-model='basicData.oldAddressOrOrg' placeholder=''  v-bind:disabled="disabled_edit")
      label.active 原住址或单位
    .input-field.col.s12
      input.validate(type="text" v-model='basicData.oldResidenceUnit' placeholder=''  v-bind:disabled="disabled_edit")
      label.active 原户口登记机关
    .input-field.col.s12
      input.validate(type="text" v-model='basicData.planAddressOrOrg' placeholder=''  v-bind:disabled="disabled_edit" )
      label.active 拟迁入地址或单位名称
    .input-field.col.s12
      input.validate(type="text" v-model='basicData.transferCause' placeholder=''  v-bind:disabled="disabled_edit")
      label.active 迁入原因
    h6 随迁人员
    table
      thead
        th 姓名
        th 称谓
        th 性别
        th 居民身份证号码
        th 所在单位
        th 删除
      tbody
        tr(v-for='item in myChildren')
          td( @click='modal($index)' ) {{item.transferName}}
          td( @click='modal($index)' ) {{item.appellation}}
          td( @click='modal($index)' ) {{item.transferSex=== "man" ? "男" : "女" }}
          td( @click='modal($index)' ) {{item.denizenSfz}}
          td( @click='modal($index)' ) {{item.denizenOrg}}
          td(@click='deletechild($index)' class='btn waves-effect waves-light red') 删除
    a(class='btn waves-effect waves-light red', @click='modal')
      i.fa.fa-plus
    div.modal#modal1.bottom-sheet
      div.modal-dialog(style='padding: 20px')
        div.modal-content
          div.modal-header
          div.modal-body
            div.form-group
              div.col-lg-10
                input(type="text" class="form-control" placeholder="姓名" v-model="child.transferName"   ,v-bind:class="{ 'vf-invalid-required': startvl&&!child.transferName }")
            div.form-group
              div.col-lg-10
                input(type="text" class="form-control" placeholder="称谓" v-model="child.appellation"   ,v-bind:class="{ 'vf-invalid-required': startvl&&!child.appellation }")
            .col.s12(style="padding:0")
              label.active 性别
              v-select(:value.sync='child.transferSex', :options='xb2'   ,v-bind:class="{ 'vf-invalid-required': startvl&&!child.transferSex }")
            div.form-group
              div.col-lg-10
                input(type="text" class="form-control" placeholder="居民身份证号码" v-model="child.denizenSfz"   ,v-bind:class="{ 'vf-invalid-required': startvl&&!child.denizenSfz }")
            div.form-group
              div.col-lg-10
                input(type="text" class="form-control" placeholder="所在单位" v-model="child.denizenOrg"   ,v-bind:class="{ 'vf-invalid-required': startvl&&!child.denizenOrg }")
          div.modal-footer
            a(class="btn waves-effect waves-green" v-on:click="addChild" v-if='!disabled_edit') 确认
            a(class="modal-action modal-close waves-effect waves-green btn-flat") 取消
    //- .card(v-for='item in cacheFile')
    //-   .card-content
    //-     img(style='width: 100%;', v-bind:src='getSrc(item.fileId)')
    //-   .card-action
    //-     a(@click='deleteFlie(item)') 删除
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
    //-       //-   a(type='button',@click="uploadItem(file)") 上传
    //- br
    //- br
    //- a.btn.btn-up
    //-   vue-file-upload(v-bind:url='fileUploadUrl("ZXHKB")',
    //-     v-bind:files.sync = 'files',
    //-     v-bind:filters = "filters",
    //-     v-bind:events = 'cbEvents',
    //-     v-bind:request-options = "reqoptsZXHKB",
    //-     name='fileData',
    //-     label='随迁人员关系证明'
    //-     )
    //-
    //- br
    br
    br
    //- a.btn.btn-up(@click='uploadImage("ZXHKB")')
    //-   .fileupload-button 户口本
    .col.s12
      .card
        .card-title 随迁人员关系证明
        div(v-for='item in fileList')
          .card-image(v-if='item.fileType==".jpg"||item.fileType==".png"||item.fileType==".jpeg"||item.fileType==".bmp"||item.fileType==".gif"')
            img(v-bind:src='getSrc(item.fileId)', style='width: 100%')
          .card-content(v-if='!(item.fileType==".jpg"||item.fileType==".png"||item.fileType==".jpeg"||item.fileType==".bmp"||item.fileType==".gif")')
              //- a(v-bind:href='getSrc(item.fileId)' target="_blank"'){{item.fileName}}{{item.fileType}}下载连接（请复制到浏览器中打开）:    {{getSrc(item.fileId)}}
              span {{item.fileName}}{{item.fileType}}下载连接（请复制到浏览器中打开）
                a(style='word-wrap:break-word;') {{getSrc(item.fileId)}}
          .card-action
          a(@click='deleteFile(item)') 删除
    .col.s12(v-if='!fileList.length||fileList.length==0')
      .card
        .card-title 随迁人员关系证明
        .card-content 暂无数据
    a.btn.btn-up(v-if='!disabled_edit')
      .card-title(style='color:black;text-align:left;')  随迁人员关系证明
      .fileupload-button(@click='uploadImg("ZXHKB")') 图片文件
      .fileupload-button(style="line-height: 0 !important;")
        div(style="margin-top: 15px;") 其他类型文件
        form(id="uploadForm" enctype="multipart/form-data")
          input(style="margin-top: 10px;" id="gauploadInput" type="file")
          .waves-effect.waves-light.btn(style="width: 100%;margin-top: 10px;" @click='uploadFile')上传
    .col.s12(v-for='src in media' v-if='!disabled_edit')
      .card
        .card-image
          img(v-bind:src='src', style='width: 100%')
    button.waves-effect.waves-light.btn(style='margin-top:150px' @click='submitData' v-if='!disabled_edit') 保存
    .col.s12
      .card

    //- div(style='position:fixed;width:100%;height:100%;top:0;left:0;background:#ccc;display:none' id='modalga')
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

var settledGuid = randomToken(32)
var localStorage = window.localStorage

export default{
  vuex: {
    getters: {
      dataValue: getData,
      uploadImage: uploadImage,
      chooseImage: chooseImage
    }
  },
  props: ['index'],

  data () {
    return {
    oFile:'',
     startvl:false,
      disabled_edit:false,
      media: [],
      xb: [
        {value: '1', label: '男'},
        {value: '0', label: '女'}
      ],
      xb2: [
        {value: 'man', label: '男'},
        {value: 'girl', label: '女'}
      ],
      uploading: false,
      progress: 0,
      loading: false,
      myChildren: [],
      child: {

      },
      dengJi: [],
      sqcc: [],
      rych: [],
      zydj: [],
      zgbmId: [],
      ryId: {},
      settledGuid: '',
      basicData: {
        settledGuid: '',
      },
      list: [],
      files:[],
      cacheFile: [],
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

      reqoptsZXHKB: {
        alias: 'fileData',
        formData: {
          'Encoding': 'utf-8',
          'Rpencoding': 'utf-8',
          '_x-requested-with': true,
          'ssoOpenId': this.user.ssoOpenId,
          'rcId': this.user.rcId,
          'useType': 'ZXHKB'
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
          'useType': 'ZXCSZ'
        },
        responseType: 'json',
        withCredentials: false
      }
    }
  },
  init () {
    this.user = JSON.parse(localStorage.getItem('baseInfo'))
    settledGuid = randomToken(32)

    var me = this
    rest.getOptions('rcrd_cengci').then(res => {
      me.sqcc = this.rebuildOptions(res)
    })

  },
  ready () {
    this.$parent.index = false

    if (this.dataValue && this.$route.query.do) this.basicData = this.dataValue
    if (this.dataValue&& this.$route.query.do) {
      rest.post(this.user, {settledGuid: this.dataValue.settledGuid}, '/rccore/TransferPerson/listBySettledGuid').then(res => {
        res.datas.forEach(v => {
          v.saveInDatebase = 'false'
        })
        //this.basicData.transferPersonJson  = res.datas
        this.myChildren  = res.datas
      })

      if(this.$route.query.do=='edit'){
              this.disabled_edit=false;
          }else{ this.disabled_edit=true;
      }
       this.getFileList();
    }
    /*if (this.dataValue&&this.dataValue.settledGuid && this.$route.query.do) {
       rest.post(this.user, {settledGuid: this.dataValue.settledGuid}, '/rccore/SettledAddressFile/fileList').then(res => {

        //this.cacheFile  = res.datas
        this.fileList = res.datas
      })

    }*/
    // var me = this
    // me.loading = true
    // rest.post(this.user, {}, '/rccore/SettledAddress/get').then(res => {
    //   me.loading = false
    //   console.log(res)
    //   me.basicData = res.data
    // })
    //
    // this.getList()
    var vm = this
    $('#gauploadInput').change(function(){
        vm.oFile = this.files[0];
        //alert(JSON.stringify(vm.oFile))



       // var xhr = new XMLHttpRequest();
       // xhr.onload = function() {
       //     alert("上传成功！");
       // }
       // xhr.open("POST", "upload.php", true);
        // 发送表单数据
        //xhr.send(formData);
    });
  },
  attached () {
    $('#sidenav-overlay').remove()

  },
  watch: {
  },
  methods: {
    uploadFile(){
    if(this.disabled_edit)return;
        var vm =this;
        let query = {
          'Encoding': 'utf-8',
          'Rpencoding': 'utf-8',
          '_x-requested-with': true,
          settledGuid: vm.basicData.settledGuid || settledGuid,
          'useType': "ZXHKB"
        }
        var file = $('#gauploadInput')[0].files[0];
        var formData = new FormData();
        formData.append(file.name,file);
        vm.loading = true;
        rest.postFile2(vm.user, query, formData,'/rccore/SettledAddressFile/insert')
        .then(res => {
            //alert(JSON.stringify(res));
            if (!res.success) return Materialize.toast(res.message, 4000)
            vm.getFileList();
            vm.media=[];
            vm.loading = false
        });
    },
    deletechild(index){
       this.myChildren.splice(index, 1);
    },
    uploadImg (useType) {
      let formData = {
        'Encoding': 'utf-8',
        'Rpencoding': 'utf-8',
        '_x-requested-with': true,
        settledGuid: this.basicData.settledGuid || settledGuid,
        'useType': useType
      }

      if(formData.settledGuid==='')formData.settledGuid=settledGuid
      let vm = this
      rest.resetConfig(window.location.href,function(){
       chooseImage()
        .then(localId => {
          //alert(localId);
          vm.loading = true
          vm.media.push(localId)
          return uploadImage(localId)
        })
        .then(serverId => {
          //alert(serverId);
          return rest.postFile(vm.user, formData, serverId, '/rccore/SettledAddressFile/insert')
        })
        .then(res => {
         // alert(JSON.stringify(res));
          if (!res.success) return Materialize.toast(res.message, 4000)
          vm.getFileList();
          vm.media=[];
          vm.loading = false
        })
      });

    },
    addChild() {
    if(!this.startvl){
          this.startvl=true;
    }
    if(!this.child.transferName||!this.child.appellation||!this.child.transferSex||!this.child.denizenSfz||!this.child.denizenOrg){
      return;
    }
      if(!this.child.transferGuid||this.child.transferGuid==''){
         this.child.transferGuid = randomToken(32)
      this.child.settledGuid = this.basicData.settledGuid || settledGuid
      this.child.orderNo = this.myChildren.length + 1
      this.myChildren.push(this.child)
      }else{
        for(var i =0;i<this.myChildren.length;i++){
          if(this.child.transferGuid==this.myChildren[i].transferGuid){
            this.myChildren[i]=this.child;
            break;
          }
        }
      }
      $('#modal1').closeModal()
      this.child = {}
       this.startvl=false;
    },
    fileUploadUrl (useType) {
      return rest.basicUrl + '/rccore/SettledAddressFile/insert' + this.beforeUpload(useType)
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
        settledGuid: this.basicData.settledGuid || settledGuid,
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

      rest.post(this.user, {}, '/rccore/SettledAddress/page').then(res => {
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
      var me = this

      this.basicData.isAdd = this.basicData.settledGuid ? false : true
      this.basicData.settledGuid = this.basicData.settledGuid || settledGuid
      this.basicData.flowEntityId = this.basicData.settledGuid
      this.basicData.flowVerId =  JSON.parse(localStorage.getItem('/rccore/SettledAddress/flowUI'))[0].flowVerId;//'41B557D7F306047DE5AF2892BC543065'
      this.basicData.flowEntityUI = '/rccore/SettledAddress/flowUI'
      this.basicData.flowEntityInfo = this.user.username + ' 申请人才落户'

      this.loading = true

      this.basicData.transferPersonJson = JSON.stringify(this.myChildren)

      rest.post(this.user, this.basicData, '/rccore/SettledAddress/entitySave').then(res => {
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
    deleteFile(item) {
      this.loading = true
      rest.post(this.user, {refId: item.fileId}, '/rccore/SettledAddressFile/delete').then(res => {
        this.loading = false

        if (!res.success) return Materialize.toast(res.message, 4000)
        /*
        if (this.dataValue) {
          rest.post(this.user, {settledGuid: this.dataValue.settledGuid}, '/rccore/SettledAddressFile/fileList').then(res => {
            this.cacheFile  = res.datas
          })
        }*/
        this.getFileList();
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
      rest.post(this.user, {useType: 'RYZS',settledGuid:this.basicData.settledGuid || settledGuid}, '/rccore/SettledAddressFile/fileList').then(res => {
      //alert(JSON.stringify(res));
        me.fileList = res.datas
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
