var Promise = require('bluebird')
var sha1 = require('sha1')
var _ = require('lodash')
// var enGbk = require('liveinjs-gbk')

// var basicUrl = 'http://wechatordering.ngrok.cc'
//var basicUrl = 'http://www.nananzk.com/rcjk'
   var basicUrl = 'http://www.hzts.com.cn:80/rcjk'


function init () {
  var now = Date.now()
  var signature = ['NaRcJk4WeChat', now, '123332'].sort().join('')
  var timestamp = now
  var nonce = '123332'

  return {
    signature: sha1(signature),
    timestamp: timestamp,
    nonce: nonce
  }
}

module.exports = {
  basicUrl: basicUrl,
  resetConfig(url,readycallback){
    //alert(url);
    var basicUrl = this.basicUrl;
    $.ajax({
      type: 'post',
      url:basicUrl + '/webres/wechat/core/getJsSignature.jsp',
      data: {urlPath: url},
      dataType: 'json'
    })
      .then(res => {
        if (typeof res === 'string') res = JSON.parse(res)

        let config = {
          debug: false,
          appId: 'wxe1ec4830f40317a0',
          signature: res.data.signature,
          timestamp: res.data.timestamp,
          nonceStr: res.data.nonceStr,
          jsApiList: [
            'chooseImage',
            'previewImage',
            'uploadImage',
            'downloadImage'
          ]
        }
        //alert(JSON.stringify(config));
        wx.config(config)
        wx.ready(readycallback)
      })
  },
  chooseImage() {
    return new Promise((resolve, reject) => {
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          let localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          //alert(JSON.stringify(res));
          resolve(localIds[0])
        },
        fail:function(res){
          //alert(JSON.stringify((res)));
        }
      })
    })
  },
  uploadImage (localId) {
    return new Promise((resolve, reject) => {
      wx.uploadImage({
        localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: function (res) {
          let serverId = res.serverId; // 返回图片的服务器端ID
          console.log('serverId:', serverId)
          //alert(JSON.stringify(res));
          resolve(serverId)
        },
        fail:function(res){
          //alert(JSON.stringify(res));
        }
      })
    })
  },
  delete (user, query, url) {
    return new Promise((resolve, reject) => {
      var data = init()

      data = _.assignIn(data, query, user)
      url = basicUrl + url
      console.log(data)
      $.ajax({
        type: 'post',
        url: url,
        data: data,
        dataType: 'json',
        beforeSend: function (xhr) {
          xhr.overrideMimeType('text/html;charset=GBK')
        }
      })
      .done(res => {
        resolve(res)
      })
      // Vue.http.post(url, data).then((res) => {
      //   // if (res.body !== 'string') {
      //   //   res.body = JSON.stringify(res.body)
      //   //   if (charset === 'UTF-8') {
      //   //     res.body = gbk.toString('utf-8', res.body)
      //   //   }
      //   // }
      //
      //   if (res.body !== 'object') {
      //     res.body = JSON.parse(res.body)
      //   }
      //
      //   resolve(res.body)
      // }, errorCallback)
    })
  },
  getEnum(user, query, url) {
    return new Promise((resolve, reject) => {
      var data = init()

      data = _.extend(data, query, user)
      url = basicUrl + url
      $.ajax({
        type: 'get',
        url: url,
        data: data,
        dataType: 'json',
        beforeSend: function (xhr) {
          xhr.overrideMimeType('text/html;charset=GBK')
        }
      })
      .done(res => {
        resolve(res)
      })
    })
  },
  post (user, query, url) {
    return new Promise((resolve, reject) => {
      var data = init()

      data = _.assignIn(data, query, user)
      url = basicUrl + url
      $.ajax({
        type: 'post',
        url: url,
        data: data,
        dataType: 'json',
        beforeSend: function (xhr) {
          xhr.overrideMimeType('text/html;charset=GBK')
        }
      })
      .done(res => {
        resolve(res)
      })
      // Vue.http.post(url, data).then((res) => {
      //   // if (res.body !== 'string') {
      //   //   res.body = JSON.stringify(res.body)
      //   //   if (charset === 'UTF-8') {
      //   //     res.body = gbk.toString('utf-8', res.body)
      //   //   }
      //   // }
      //
      //   if (res.body !== 'object') {
      //     res.body = JSON.parse(res.body)
      //   }
      //
      //   resolve(res.body)
      // }, errorCallback)
    })
  },
  get (user, query, url) {
    return new Promise((resolve, reject) => {
      var data = init()
      data = _.extend(data, query, user)

      // url = url + '?'
      // Object.keys(data).forEach(key => {
      //   url = `${url}${key}=${data[key]}&`
      // })
      url = basicUrl + url
      $.ajax({
        type: 'get',
        url: url,
        data: data,
        dataType: 'json',
        beforeSend: function (xhr) {
          xhr.overrideMimeType('text/html;charset=GBK')
        }
      })
      .done(res => {
        resolve(res)
      })
      // Vue.http.get(url).then((res) => {
      //   if (res.body !== 'object') {
      //     res.body = JSON.parse(res.body)
      //   }
      //   // console.log(res)
      //   resolve(res.body)
      // }, errorCallback)
    })
  },
  postFile(user, query, wcMediaId, url) {
    return new Promise((resolve, reject) => {
      var data = init()

      data = _.extend(data, query, user)
      data.wcMediaId = wcMediaId
      url = basicUrl + url + '?'

      Object.keys(data).forEach(key => {
        url = url + key + '=' + data[key] + '&'
      })

      $.ajax({
        type: 'post',
        url: url,
        data: {},
        dataType: 'json',
        beforeSend: function (xhr) {
          xhr.overrideMimeType('text/html;charset=GBK')
        }
      })
      .done(res => {
        //alert(JSON.stringify(res));
        resolve(res)
      })
    })
  },
  postFile2(user, query, formData, url) {
    return new Promise((resolve, reject) => {
      var data = init()

      data = _.extend(data, query, user)
      url = basicUrl + url + '?'
      Object.keys(data).forEach(key => {
        url = url + key + '=' + data[key] + '&'
      })
      //alert(url);
      //var formData = new FormData($('#gauploadInput')[0]);
      //alert(JSON.stringify(formData));
      console.log(url);
      $.ajax({
        type: 'post',
        url: url,
        data: formData,
        // 告诉jQuery不要去处理发送的数据
        processData : false,
        // 告诉jQuery不要去设置Content-Type请求头
        contentType : false,
        cache: false,
        dataType: 'json',
        beforeSend: function (xhr) {
          //xhr.overrideMimeType('text/html;charset=GBK')
        }
      })
        .done(res => {
          //alert(JSON.stringify(res));
          resolve(res)
        })
    })
  },
  getOptions (dictCode) {
    return new Promise((resolve, reject) => {
      var url = basicUrl + '/corej2ee/utils/dict/all'

      // url = url + '?'
      var data = init()
      data.dictCode = dictCode

      // Object.keys(data).forEach(key => {
      //   url = `${url}${key}=${data[key]}&`
      // })
      // console.log('get:', data)
      $.ajax({
        type: 'get',
        url: url,
        data: data,
        dataType: 'json',
        beforeSend: function (xhr) {
          xhr.overrideMimeType('text/html;charset=GBK')
        }
      })
      .done(res => {
        resolve(res.datas)
      })
      // Vue.http.get(url).then((res) => {
      //   // if (res.body !== 'string') {
      //   //   res.body = JSON.stringify(res.body)
      //   //   if (charset === 'UTF-8') {
      //   //     res.body = gbk.toString('utf-8', res.body)
      //   //   }
      //   //   console.log(res.body)
      //   // }
      //
      //   if (res.body !== 'object') {
      //     res.body = JSON.parse(res.body)
      //   }
      //   resolve(res.body.datas)
      // }, errorCallback)
    })
  }
}
