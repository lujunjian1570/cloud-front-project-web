<template>
  <a-modal
    :visible="visible"
    centered
    title="上传图片"
    :mask-closable="false"
    :confirm-loading="confirmLoading"
    :width="1000"
    @cancel="cancelHandel"
  >
    <div class="cropper-wrapper">
      <vue-cropper
        ref="cropper"
        :img="options.img"
        :info="true"
        :original="true"
        :auto-crop="options.autoCrop"
        :auto-crop-width="options.autoCropWidth"
        :auto-crop-height="options.autoCropHeight"
        :fixed-box="options.fixedBox"
        output-type="png"
        @realTime="realTime"
      />
    </div>
    <!--        <div class="result-wrapper">-->
    <!--            <div class="tar-img" :style="previews.div">-->
    <!--                <img :src="previews.url" :style="previews.img"/>-->
    <!--            </div>-->
    <!--        </div>-->
    <template slot="footer">
      <a-button
        key="back"
        @click="cancelHandel"
      >
        取消
      </a-button>
      <a-button
        key="submit"
        type="primary"
        :loading="confirmLoading"
        @click="okHandel"
      >
        保存
      </a-button>
    </template>
  </a-modal>
</template>
<script>
import { VueCropper } from 'vue-cropper'
// import Utils from "@/utils/util"

export default {
  name: 'CropperModal',
  components: {
    VueCropper
  },
  data() {
    return {
      visible: false,
      img: null,
      confirmLoading: false,
      options: {
        img: '', // 裁剪图片的地址
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 200, // 默认生成截图框宽度
        autoCropHeight: 200, // 默认生成截图框高度
        fixedBox: true // 固定截图框大小 不允许改变
      },
      previews: {}
    }
  },
  methods: {
    edit(record) {
      const { options } = this
      this.options = Object.assign({}, options, record)
      this.visible = true
      console.log(this.options)
    },
    cancelHandel() {
      this.options = {
        img: '',
        autoCrop: true,
        autoCropWidth: 200,
        autoCropHeight: 200,
        fixedBox: true
      }
      this.visible = false
    },
    okHandel() {
      const that = this
      that.confirmLoading = true
      // 获取截图的base64 数据
      this.$refs.cropper.getCropData((data) => {
        // console.log('data:',data)
        // 转换为File对象
        // let file = Utils.dataURLtoFile(data,'测试哟');
        // 将裁剪侯的图片对象返回给父组件
        that.$emit('ok', data)
        this.confirmLoading = false
        that.cancelHandel()
      })
    },
    // 移动框的事件
    realTime(data) {
      this.previews = data
    }
  }
}
</script>

<style lang="less" scoped>
.cropper-wrapper{
  position: relative;
  width: 750px;
  height: 400px;
  margin: 0 auto;
}
.result-wrapper{
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
  padding: 20px;
  .tar-img{
    overflow: hidden;
  }
}

</style>
