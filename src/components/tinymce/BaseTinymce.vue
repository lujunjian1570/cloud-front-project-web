<template>
  <vue-tinymce
    :key="tinymceFlag"
    v-model="content"
    :init="init"
    :disabled="disabled"
  />
</template>

<script>
import VueTinymce from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver'
export default {
  name: 'BaseTinymce',
  components:{
    VueTinymce
  },
  props: {
    // 父组件的传过来的内容
    tinymceHtml: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    plugins: {
      type: [String, Array],
      default: 'autoresize link image media table lists fullscreen preview print wordcount searchreplace hr emoticons code ax_wordlimit axupimgs'
    },
    toolbar: {
      type: [String, Array],
      default: 'undo redo | code preview fullscreen print searchreplace| formatselect alignleft aligncenter alignright alignjustify | link unlink | numlist bullist | emoticons image axupimgs media table | fontselect fontsizeselect forecolor backcolor | bold italic underline strikethrough | superscript subscript | hr removeformat'
    },
    // 限制图片大小
    maxSize: {
      type: Number,
      // 最大5M
      default: 5
    }
  },
  data() {
    return {
      content: '',
      // 动态key（解决切换页签富文本内容不保存的bug）
      tinymceFlag: 1,
      /* eslint-disable */
      init: {
        // 菜单
        menubar: false,
        // 工具栏模式
        toolbar_mode: "sliding",
        // 粘性工具栏
        toolbar_sticky: true,
        // language_url: '/tinymce/langs/zh_CN.js',
        language: 'zh_CN',
        //插件
        plugins: this.plugins,
        // 分组工具栏
        toolbar: this.toolbar,
        // 缩进不对齐调整
        indentation : "2em",
        // 图片超出屏幕大小，自适应
        content_style: "img{max-width:100%;}",
        // 高度
        min_height: 500,
        // 隐藏右下角技术支持
        branding: false,
        // 模态窗口允许拖动
        draggable_modal: true,
        // placeholder
        placeholder: '在这里输入内容',
        // 限制字符个数
        ax_wordlimit_num: 100000,
        // 限制字符个数回调
        ax_wordlimit_callback: (editor,txt,num) => {
          this.$message.error('当前字数：' + txt.length + '，限制字数：' + num)
        },
        // 图片上传（单个，多个）
        images_upload_handler: (blobInfo, success, failure) => {
          this.handleImgUpload(blobInfo, success, failure)
        }
      }
      /* eslint-enable */
    }
  },
  watch: {
    tinymceHtml: {
      handler(newVal) {
        // 同步父组件传递的tinymceHtml值
        this.content = newVal
      },
      // 代码一加载 立马执行监视函数
      immediate: true,
      // 深度监听(数组、对象)
      deep: true
    },
    content(newVal) {
      // 使用update事件来更新tinymceHtml,而在父组件不需要调用该函数
      this.$emit('update:tinymceHtml', newVal)
    }
  },
  activated() {
    this.tinymceFlag++
  },
  methods: {
    setup(editor) {
      // tab键 使用开启时，在引用组件上追加 :setup="setup"
      editor.on('keydown', (evt) => {
        if (evt.keyCode == 9) {
          if (evt.shiftKey) {
            editor.execCommand('Outdent')
          } else {
            editor.execCommand('Indent')
          }
          evt.preventDefault()
          evt.stopPropagation()
        }
      })
    },
    // 上传图片
    handleImgUpload(blobInfo, success, failure) {
      if(blobInfo.blob().size / 1024 / 1024 > this.maxSize) {
        failure('图片大小不能超过' + this.maxSize + 'M')
      }
      if('image/jpeg, image/png, image/jpg'.indexOf(blobInfo.blob().type) < 0) {
        failure('格式不正确')
      }
      let _self = this
      let reader = new FileReader()
      reader.readAsDataURL(blobInfo.blob())
      reader.onload = function() {
        // console.log("base64：",this.result)
        let formData = {
          fileType: 'imageFile',
          fileStr: this.result
        }
        _self.$Http.postAction(_self.$Api.uploadFileImg, formData).then(res => {
          if (res.msgCode === _self.$Common.sucCode) {
            // 上传成功，在成功函数里填入图片路径
            success(res.result.fileUrl)
          } else{
            failure(res.msgInfo)
          }
        }).catch(() => {
          failure('上传出错')
        })
      }
    }
  }
}
</script>
