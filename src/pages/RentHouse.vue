<template lang="jade">
.row
  v-loading(:show='loading')
  form.col.s12.content
    //- .input-field.col.s12
    //-   input.validate(type="text" v-model='basicData.rcName' placeholder='')
    //-   label.active 人才姓名
    .input-field.col.s12
      input.validate(type="text" v-model='basicData.poId' placeholder='' v-bind:disabled="disabled_edit"  ,v-bind:class="{ 'vf-invalid-required': startvlwc&&!basicData.poId }")
      label.active 租房补贴标识
    .input-field.col.s12
      input.validate(type="text" v-model='basicData.poXm' placeholder='' v-bind:disabled="disabled_edit"  ,v-bind:class="{ 'vf-invalid-required': startvlwc&&!basicData.poXm}")
      label.active 配偶姓名
    .col.s12
      label.active 性别
      v-select(:value.sync='basicData.xb', :options='xb' v-bind:disabled="disabled_edit" ,v-bind:class="{ 'vf-invalid-required': startvlwc&&!basicData.xb }")
    .input-field.col.s12
      input.validate(type="month" v-model='basicData.csny' placeholder='' v-bind:disabled="disabled_edit" ,v-bind:class="{ 'vf-invalid-required': startvlwc&&!basicData.csny }")
      label.active 出生年月
    .input-field.col.s12
      input.validate(type="text" v-model='basicData.jg' placeholder='' v-bind:disabled="disabled_edit" ,v-bind:class="{ 'vf-invalid-required': startvlwc&&!basicData.jg }")
      label.active 国籍籍贯
    .input-field.col.s12
      input.validate(type="text" v-model='basicData.sfz' placeholder='' v-bind:disabled="disabled_edit" ,v-bind:class="{ 'vf-invalid-required': startvlwc&&!basicData.sfz }")
      label.active 身份证号(护照)
    .col.s12
      label.active 人才类别
      v-select(:value.sync='basicData.sqcc', :options='rclb' v-bind:disabled="disabled_edit" ,v-bind:class="{ 'vf-invalid-required': startvlwc&&!basicData.sqcc }")
    .input-field.col.s12
      input.validate(type="text" v-model='basicData.xgzdw' placeholder='' v-bind:disabled="disabled_edit" ,v-bind:class="{ 'vf-invalid-required': startvlwc&&!basicData.xgzdw }")
      label.active 工作单位及地址
    .input-field.col.s12
      input.validate(type="text" v-model='basicData.xgzzw' placeholder='' v-bind:disabled="disabled_edit")
      label.active 职务
    .input-field.col.s12
      input.validate(type="text" v-model='basicData.sjhm' placeholder='' v-bind:disabled="disabled_edit" ,v-bind:class="{ 'vf-invalid-required': startvlwc&&!basicData.sjhm }")
      label.active 联系电话
    .input-field.col.s12
      input.validate(type="text" v-model='basicData.dzyj' placeholder='' v-bind:disabled="disabled_edit")
      label.active 邮箱
    .col.s12
      label.active 申请类别
      v-select(:value.sync='basicData.sqlb', :options='sqlb' v-bind:disabled="disabled_edit"  ,v-bind:class="{ 'vf-invalid-required': startvlwc&&!basicData.sqlb }")
    .input-field.col.s12
      textarea.validate(type="text" rows='10' cols='30' v-model='basicData.remark' placeholder='' v-bind:disabled="disabled_edit")
      label.active 申请人及配偶在本地自有住房和享受政策情况说明
    .input-field.col.s12
      input.validate(type="text" v-model='basicData.yhzh' placeholder='' v-bind:disabled="disabled_edit"  ,v-bind:class="{ 'vf-invalid-required': startvlwc&&!basicData.yhzh }")
      label.active 申请人银行账号及开户行
    .input-field.col.s12
      input.validate(type="text" v-model='basicData.gzMonth' placeholder='如：3' v-bind:disabled="disabled_edit"  ,v-bind:class="{ 'vf-invalid-required': startvlwc&&!basicData.gzMonth }")
      label.active 工作月数
    .col.s12
      label.active 补贴标准（元/月）
      input.validate(readonly="readonly" v-model='basicData.btbz' placeholder='' value='200/人/月' v-bind:disabled="disabled_edit"  ,v-bind:class="{ 'vf-invalid-required': startvlwc&&!basicData.btbz }")
    .input-field.col.s12
      input.validate(type="text" readonly="readonly" v-model='basicData.btje' placeholder='' v-bind:disabled="disabled_edit"  ,v-bind:class="{ 'vf-invalid-required': startvlwc&&!basicData.btje }")
      label.active 补贴金额
    h6 其他成员信息(直系)
    table
      thead
        th 姓名
        th 性别
        th 出生年月
        th 身份证(护照)
        th 单位信息
        th 删除
      tbody
        tr(v-for='item in myChildren' )
          td(@click='modal($index)') {{item.name}}
          td(@click='modal($index)') {{item.sex === "1" ? "男" : "女" }}
          td(@click='modal($index)') {{item.birthday}}
          td(@click='modal($index)') {{item.idCard}}
          td(@click='modal($index)') {{item.dwInfo}}
          td(@click='deletechild($index)' class='btn waves-effect waves-light red') 删除
    a(class='btn waves-effect waves-light red', @click='modal')
      i.fa.fa-plus
    div.modal#modal1.bottom-sheet
      div.modal-dialog(style='padding: 20px')
        div.modal-content
          div.modal-header
          div.modal-body()
            div.form-group
              div.col-lg-10
                input(type="text" class="form-control" placeholder="姓名" v-model="child.name" ,v-bind:class="{ 'vf-invalid-required': startvl&&!child.name }")
            .col.s12(style="padding:0;")
              label.active 性别
              v-select(:value.sync='child.sex', :options='xb'  ,v-bind:class="{ 'vf-invalid-required': startvl&&!child.sex }")
            div.form-group
              div.col-lg-10(style="padding:0;")
                label.active 出生年月
                input(type="month" class="form-control" placeholder="出生年月" v-model="child.birthday" ,v-bind:class="{ 'vf-invalid-required': startvl&&!child.birthday }")
            div.form-group
              div.col-lg-10
                input(type="text" class="form-control" placeholder="身份证(护照)" v-model="child.idCard" ,v-bind:class="{ 'vf-invalid-required': startvl&&!child.idCard }")
            div.form-group
              div.col-lg-10
                input(type="text" class="form-control" placeholder="单位信息" v-model="child.dwInfo" )
            div.form-group
              div.col-lg-10
                input(type="text" class="form-control" placeholder="与申请人关系" v-model="child.cygx" ,v-bind:class="{ 'vf-invalid-required': startvl&&!child.cygx }")
          div.modal-footer
            a(class="btn waves-effect waves-green" v-on:click="addChild" ) 确认
            a(class="modal-action modal-close waves-effect waves-green btn-flat") 取消
    br
    br
    .col.sl2
    .card
      .card-title 商品房购房合同（或购房发票和房产证）
      .card-content(v-show='!cacheFile||!cacheFile.length||cacheFile.length==0') 暂无数据
      div(v-for='item in cacheFile')
        .card-content(v-if='item.fileType==".jpg"||item.fileType==".png"||item.fileType==".jpeg"||item.fileType==".bmp"||item.fileType==".gif"')
          img(style='width: 100%;'  v-bind:src='getSrc(item.fileId)')
        .card-content(v-if='!(item.fileType==".jpg"||item.fileType==".png"||item.fileType==".jpeg"||item.fileType==".bmp"||item.fileType==".gif")')
          span {{item.fileName}}{{item.fileType}}下载连接（请复制到浏览器中打开）
            a(style='word-wrap:break-word;') {{getSrc(item.fileId)}}
        a(@click='deleteFile(item)') 删除
        .card-action

    .card
      .card-title 房屋信息证明
      .card-content(v-show='!cacheFile2||!cacheFile2.length||cacheFile2.length==0') 暂无数据
      div(v-for='item in cacheFile2')
        .card-content(v-if='item.fileType==".jpg"||item.fileType==".png"||item.fileType==".jpeg"||item.fileType==".bmp"||item.fileType==".gif"')
          img(style='width: 100%;'  v-bind:src='getSrc(item.fileId)')
        .card-content(v-if='!(item.fileType==".jpg"||item.fileType==".png"||item.fileType==".jpeg"||item.fileType==".bmp"||item.fileType==".gif")')
            span {{item.fileName}}{{item.fileType}}下载连接（请复制到浏览器中打开）
              a(style='word-wrap:break-word;') {{getSrc(item.fileId)}}
        a(@click='deleteFile(item)') 删除
        .card-action

  .btn.btn-up(v-if='!disabled_edit')
      .card-title(style='color:black;text-align:left;') 商品房购房合同（或购房发票和房产证）
      .fileupload-button(@click='uploadImg("ZLHT")') 图片文件
      .fileupload-button(style="line-height: 0 !important;")
        div(style="margin-top: 15px;") 其他类型文件
          form(id="uploadForm" enctype="multipart/form-data")
            input(style="margin-top: 10px;" id="ZLHTuploadInput" type="file")
            .waves-effect.waves-light.btn(style="width: 100%;margin-top: 10px;" @click='uploadFile("ZLHT")')上传
  .btn.btn-up(style='margin-top: 140px;' v-if='!disabled_edit')
      .card-title(style='color:black;text-align:left;') 房屋信息证明
      .fileupload-button(@click='uploadImg("WZFZM")') 图片文件
      .fileupload-button(style="line-height: 0 !important;")
        div(style="margin-top: 15px;") 其他类型文件
          form(id="uploadForm" enctype="multipart/form-data")
            input(style="margin-top: 10px;" id="WZFZMuploadInput" type="file")
            .waves-effect.waves-light.btn(style="width: 100%;margin-top: 10px;" @click='uploadFile("WZFZM")')上传
  .col.s12(v-for='src in media' v-if='!disabled_edit')
      .card
        .card-image
          img(v-bind:src='src', style='width: 100%')
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
    startvlwc:false,
      disabled_edit:false,
      loading: false,
      xb: [
        {value: '1', label: '男'},
        {value: '0', label: '女'}
      ],
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
        xb:'',
        btje:'',
        gzMonth:''
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
      reqopts: {
        alias: 'fileData',
        formData: {
          'Encoding': 'utf-8',
          'Rpencoding': 'utf-8',
          '_x-requested-with': true,
          'ssoOpenId': this.user.ssoOpenId,
          'rcId': this.user.rcId,
          // zxId: zxId,
          'useType': 'ZLHT'
        },
        responseType: 'json',
        withCredentials: false
      },
      reqopts: {
        alias: 'fileData',
        formData: {
          'Encoding': 'utf-8',
          'Rpencoding': 'utf-8',
          '_x-requested-with': true,
          'ssoOpenId': this.user.ssoOpenId,
          'rcId': this.user.rcId,
          // zxId: zxId,
          'useType': 'WZFZM'
        },
        responseType: 'json',
        withCredentials: false
      }
    }
  },
  init () {
    this.user = JSON.parse(localStorage.getItem('baseInfo'))

    var me = this
    poId = randomToken(32)
    rest.getOptions('rcrd_cengci').then(res => {
      me.rclb = this.rebuildOptions(res)
    })
    rest.getOptions('rczfbz_sqlb').then(res => {
      me.sqlb = this.rebuildOptions(res)
    })
  },
//ready () {
//  this.$parent.index = false
//
//  if (this.dataValue && this.$route.query.do){
//        this.basicData = this.dataValue
//        if(this.$route.query.do=='edit'){
//            this.disabled_edit=false;
//        }else{ this.disabled_edit=true;
//        }
//        if(this.basicData.xb=='男'){
//          this.basicData.xb='1';
//        }else{
//          this.basicData.xb='0';
//        }
//    }
//    if (this.dataValue&& this.$route.query.do) {
//	      rest.post(this.user, {poId: this.dataValue.poId}, '/rccore/Qtcy/list').then(res => {
//	        res.datas.forEach(v => {
//	          v.saveInDatebase = 'false'
//	        })
//	        this.myChildren  = res.datas
//	      })
//	      if(this.$route.query.do=='edit'){
//	          this.disabled_edit=false;
//	      }else{ this.disabled_edit=true;
//	      }
//	       this.getFileList();
//	    }
//    this.startvlwc=false;
//},
	ready () {
    this.$parent.index = false

    if (this.dataValue && this.$route.query.do) this.basicData = this.dataValue
    if (this.dataValue && this.$route.query.do) {
      rest.post(this.user, {poId: this.dataValue.poId}, '/rccore/PoxxQtcy/list').then(res => {
        res.datas.forEach(v => {
          v.saveInDatebase = 'false'
        })
        this.myChildren  = res.datas
      })
      if(this.$route.query.do=='edit'){
          this.disabled_edit=false;
      }else{ this.disabled_edit=true;
      }
       this.getFileList();
    }
    this.startvlwc=false;
  },
  attached () {
    $('#sidenav-overlay').remove()

  },
	watch:{
		'basicData.gzMonth':function(){
			
			if(this.basicData.gzMonth){
				this.basicData.btje = parseFloat(this.basicData.gzMonth) * parseFloat(this.basicData.btbz)
			}else if(this.basicData.gzMonth.innerHTML==null){
				this.basicData.btje = ''
			}
		}
	},
  methods: {
    fileUploadUrl (useType) {
      return rest.basicUrl + '/rccore/PoxxFile/insert' + this.beforeUpload(useType)
    },
    startvlfn(){
      this.startvl=true;
    },
//  addChild() {
//    this.myChildren.push(this.child)
//    $('#modal1').closeModal()
//
//    this.child = {}
//  },
    uploadFile(useType){
     let vm = this
        if(this.disabled_edit)return;
        let query = {
        'Encoding': 'utf-8',
        'Rpencoding': 'utf-8',
        '_x-requested-with': true,
        'poId': this.basicData.poId || poId,
        'rcId' : this.user.rcId,
        'useType': useType
      }	

        var file = $('#'+useType+'uploadInput')[0].files[0];
        var formData = new FormData();
        formData.append(file.name,file);
        vm.loading = true;
        rest.postFile2(vm.user, query, formData,'/rccore/PoxxFile/insert')
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
        'poId': this.basicData.poId || poId,
        'rcId' : this.user.rcId,
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
          return rest.postFile(vm.user, formData, serverId, '/rccore/PoxxFile/insert')
        })
        .then(res => {
          if (!res.success) return Materialize.toast(res.message, 4000)
          vm.media=[];
          vm.getFileList();
          vm.loading = false
        })
      })
    },
    deleteFile(item) {
      this.loading = true
      rest.post(this.user, {refId: item.fileId}, '/rccore/PoxxFile/delete').then(res => {
        this.loading = false

        if (!res.success) return Materialize.toast(res.message, 4000)
        this.getFileList();
      })
    },
		closeModal() {
      $('#modal1').closeModal()
    },
    addChild() {
    if(!this.startvl){
      this.startvl=true;
    }
    if(!this.child.name||!this.child.sex||!this.child.birthday||!this.child.idCard||!this.child.cygx){
      return;
    }
     this.startvl=false;
      if(!this.child.cyId||this.child.cyId==''){
        this.child.cyId = randomToken(32)
        this.child.poId = this.basicData.poId || poId
        this.child.saveInDatebase = true
        this.myChildren.push(this.child)

      }else{
        for(var i =0;i<this.myChildren.length;i++){
          if(this.child.cyId==this.myChildren[i].cyId){
            this.myChildren[i]=this.child;
            break;
          }
        }
      }
      $('#modal1').closeModal()
      this.child={};
    },
    deletechild(index){

     this.myChildren.splice(index, 1);
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

      rest.post(this.user, {}, '/rccore/Poxx/page').then(res => {
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
       if(!this.startvlwc){
          this.startvlwc=true;
      }
      if(!this.basicData.poXm||!this.basicData.xb||!this.basicData.csny||!this.basicData.jg ||!this.basicData.sfz||!this.basicData.sqcc||!this.basicData.xgzdw||!this.basicData.sjhm||!this.basicData.dzyj||!this.basicData.sqlb||!this.basicData.remark||!this.basicData.yhzh||!this.basicData.gzMonth||!this.basicData.btbz||!this.basicData.btje){
        return;
      }
       this.startvlwc=false;

      var me = this
      this.basicData.isAdd = this.basicData.poId ? false : true
      this.basicData.poId = this.basicData.poId || randomToken(32)
      this.basicData.flowEntityId = this.basicData.poId
      this.basicData.flowVerId =  JSON.parse(localStorage.getItem('/rccore/Poxx/flowUI'))[0].flowVerId;//'BDB6AAC5734A2C5C3A44FA369A272E93',
      this.basicData.flowEntityUI = '/rccore/Poxx/flowUI'
      this.basicData.flowEntityInfo = this.user.username + ' 申请租房补贴'

      this.loading = true

      this.basicData.qtcyInfo = this.myChildren
      rest.post(this.user, this.basicData, '/rccore/Poxx/entitySave').then(res => {
        me.loading = false
        if (!res.success) return Materialize.toast(res.message, 4000)
        Materialize.toast('保存成功', 2000)
        return this.$router.go('/')
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
//  modal () {
//    $('#modal1').openModal()
//  },
		modal(index) {
    if(this.disabled_edit)return;
    //alert(JSON.stringify(this.myChildren));
    //alert(JSON.stringify(this.child));
      if(typeof index =='number'){

        this.child=this.myChildren[index];
      }else{
      this.child={};
      }
      $('#modal1').openModal()
    },
    getFileList () {
//    var me = this

      rest.post(this.user, {useType: 'RYZS'}, '/rccore/RcxxFile/fileList').then(res => {
			
//      me.fileList = res.datas
      })
      rest.post(this.user, {useType: 'ZLHT', poId: this.basicData.poId || poId}, '/rccore/RcxxFile/fileList').then(res => {
        this.cacheFile2  = res.datas
      })
			rest.post(this.user, {useType: 'WZFZM', poId: this.basicData.poId || poId}, '/rccore/RcxxFile/fileList').then(res => {
        this.cacheFile2  = res.datas
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
  background-color: transparent;
  box-shadow: none;
  margin-bottom: 60px;
}

.vf-invalid-required{
 border-bottom: 1px solid #F44336 !important;
    box-shadow: 0 1px 0 0 #F44336 !important;
}
.card .card-title{
  font-size:16px;
}
table{
table-layout:fixed;
}
table td{
  word-wrap:break-word;
}
.vf-invalid-customValidator{
  border-bottom: 1px solid #F44336 !important;
  box-shadow: 0 1px 0 0 #F44336 !important;
}
.vf-invalid-required{
 border-bottom: 1px solid #F44336 !important;
    box-shadow: 0 1px 0 0 #F44336 !important;
}
textarea{
	height: 4em;
	margin-top: 5px;
}
</style>
