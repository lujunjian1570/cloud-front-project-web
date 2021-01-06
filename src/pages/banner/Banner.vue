<template>
  <div class="common-page">
    <div>
      <base-pane
        ref="basePane"
        @change="getCurIndex"
      >
        <div slot="rc">
          <div class="inner-cont">
            <div class="opts">
              <a-button
                id="add"
                type="primary"
                icon="plus"
                @click="add"
              >
                新增
              </a-button>
            </div>
            <a-table
              :columns="columns"
              :data-source="dataSource"
              :row-key="(record,index)=>{return index}"
              :bordered="true"
              :loading="loading"
              :pagination="ipagination"
              size="middle"
              class="components-table-demo-nested"
              :row-class-name="(record)=>{return 'tr-' + record.id}"
              @expand="toCng"
            >
              <span
                slot="hasAutoplay"
                slot-scope="hasAutoplay"
              >
                {{ hasAutoplay? '是' : '否' }}
              </span>
              <span
                slot="bannerInterval"
                slot-scope="text,record"
              >
                {{ record.hasAutoplay? record.bannerInterval : '' }}
              </span>
              <span
                slot="operation"
                slot-scope="text, record"
              >
                <a
                  :id="`edit-`+record.id"
                  @click="edit(record)"
                >编辑</a>
                <a-divider type="vertical" />
                <a-popconfirm
                  :id="`del-`+record.id"
                  title="确定删除吗?"
                  @confirm="() => del(record)"
                >
                  <a>删除</a>
                </a-popconfirm>
              </span>
              <a-table
                slot="expandedRowRender"
                slot-scope="record"
                size="small"
                :bordered="false"
                :columns="innerColumns"
                :data-source="record.bannerPicList"
                :row-key="(subRecord,index)=>{return index}"
                :pagination="false"
              >
                <span
                  slot="enableFlag"
                  slot-scope="enableFlag"
                  class="status-active"
                  :class="{'status-default' : enableFlag!=1}"
                >
                  {{ enableFlag==1 ? '应用中' : '已禁用' }}

                </span>
                <img
                  slot="imgPathUrl"
                  slot-scope="imgPathUrl"
                  :src="imgPathUrl"
                  width="180"
                >
                <span
                  v-if="subRecord.enableFlag==1"
                  slot="operation"
                  slot-scope="text, subRecord"
                >
                  <!--                                  <a @click="toDisable(record,subRecord)">禁用</a>-->
                  <a-popconfirm
                    :id="`en-disabled-`+record.id"
                    title="确定禁用吗?"
                    @confirm="() => toDisable(record,subRecord)"
                  >
                    <a>禁用</a>
                  </a-popconfirm>
                </span>
                <span
                  v-else
                  slot="operation"
                >
                  <!--                                  <a @click="toEnable(record,subRecord)">启用</a>-->
                  <a-popconfirm
                    id="`en-disabled-`+record.id"
                    title="确定启用吗?"
                    @confirm="() => toEnable(record,subRecord)"
                  >
                    <a>启用</a>
                  </a-popconfirm>
                </span>
              </a-table>
            </a-table>
          </div>
        </div>
      </base-pane>
    </div>
    <div>
      <a-modal
        :title="modalTitle"
        :visible="visible"
        centered
        :width="800"
        @ok="onSubmit"
        @cancel="handleCancel"
      >
        <a-card
          :body-style="{padding: '0'}"
          :bordered="false"
        >
          <a-form-model
            ref="ruleForm"
            :model="params"
            :rules="rules"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-model-item
              prop="bannerLocation"
              label="轮播位置"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
            >
              <a-select
                id="banner-location"
                v-model="params.bannerLocation"
                placeholder="请选择"
              >
                <a-select-option
                  v-for="(item,index) in bannerLocationList"
                  :key="index"
                  :value="item.code"
                >
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-model-item>

            <a-form-model-item
              label="是否自动轮播"
              prop="hasAutoplay"
            >
              <a-switch
                id="has-auto-play"
                :checked="params.hasAutoplay"
                size="small"
                :style="{ display: 'inline-block' }"
                @change="onCngPlay"
              />
              <a-form-model-item
                v-if="params.hasAutoplay"
                label="切换间隔时长："
                prop="bannerInterval"
                :label-col="labelCol1"
                :wrapper-col="wrapperCol1"
                class="interval-time"
              >
                <a-input
                  id="banner-interval"
                  v-model="params.bannerInterval"
                  placeholder="请输入切换间隔时间"
                  :style="{ display: 'inline-block', width:'86%' }"
                />
                <span style=" display: inline-block; width: 12%; text-align: right;">ms</span>
              </a-form-model-item>
            </a-form-model-item>

            <a-form-model-item
              label="指引样式"
              prop="indicatorMode"
            >
              <span
                id="ind-mode"
                class="ind-mode"
                @click="toCngMode('mode')"
              >
                {{ params.indicatorModeText ? params.indicatorModeText : '请选择指引样式 ' }}
              </span>
            </a-form-model-item>
            <a-form-model-item
              label="指引位置"
              prop="indicatorPos"
            >
              <span
                id="ind-pos"
                class="ind-mode"
                @click="toCngMode('pos')"
              >
                {{ params.indicatorPosText ? params.indicatorPosText : '请选择指引位置 ' }}
              </span>
            </a-form-model-item>
            <div style="height: 1px; margin-bottom: 10px; border-top: 1px dashed #e1e1e1;" />
            <a-form-model-item
              label="banner轮播图"
            >
              <span style=" display: block; font-size: 12px; line-height: 20px;">
                （ 图片像素：750*300，格式：jpg、png、gif，图片数量不能超过8张 ）
              </span>
            </a-form-model-item>
            <a-form-model-item
              v-if="params.bannerPicList.length<8"
              :wrapper-col="{span: 6}"
              style="text-align: right;"
            >
              <a-button
                id="sub-add"
                type="primary"
                icon="plus"
                @click="addDomain"
              >
                新增
              </a-button>
            </a-form-model-item>
            <draggable
              v-model="params.bannerPicList"
              handle=".mover"
              animation="1000"
              chosen-class="chosen"
              @update="datadragEnd"
              @start="onStart"
              @end="onEnd"
            >
              <a-form-model-item
                v-for="(domain, index) in params.bannerPicList"
                :key="index"
                class="sep-error"
                :wrapper-col="{span: 22}"
                :prop="'bannerPicList.' + index + '.imgPath'"
                :rules="{
                  required: true,
                  message: '图片上传不能为空',
                  trigger: 'change',
                }"
              >
                <div
                  class="item-banner"
                  @click="toCutDown(index)"
                >
                  <span class="mover"><a-icon type="menu" /></span>

                  <a-upload
                    list-type="picture-card"
                    class="avatar-uploader"
                    :class="`img-path-url-`+index"
                    :accept="acceptType"
                    :show-upload-list="false"
                    :before-upload="beforeUpload"
                    :custom-request="customRequest"
                  >
                    <img
                      v-if="domain.imgPath"
                      :src="domain.imgPathUrl"
                      width="100"
                    >
                    <div v-else>
                      <a-icon :type="domain.loading ? 'loading' : 'plus'" />
                    </div>
                  </a-upload>

                  <a-input
                    v-model="domain.linkUrl"
                    :class="`link-url-`+index"
                    placeholder="链接地址:http://"
                    style="width: 60%; margin-right: 8px;"
                  />
                  <a-icon
                    v-if="params.bannerPicList.length > 1"
                    class="dynamic-delete-button"
                    :class="`dynamic-delete-button-`+index"
                    type="minus-circle-o"
                    :disabled="params.bannerPicList.length === 1"
                    @click="removeDomain(domain)"
                  />
                </div>
              </a-form-model-item>
            </draggable>
          </a-form-model>
        </a-card>
      </a-modal>
      <!-- modal -->
      <cropper-modal
        ref="cropperModal"
        @ok="handleCropperSuccess"
      />
      <a-modal
        v-model="indVisible"
        :title="visibleTitle"
        centered
        :footer="null"
        width="300px"
      >
        <div
          v-for="(item,index) in indicatorList"
          :key="index"
          class="item-ind-mode"
          :class="{'active': index == (indType == 'mode' ? params.indicatorMode-1 : params.indicatorPos-1)}"
          @click="selIndMode(item)"
        >
          <span>{{ item.name }}</span>
          <img
            :src="item.imgUrl"
            width="210"
          >
        </div>
      </a-modal>
    </div>
  </div>
</template>

<script>
import BasePane from '@/components/pane/BasePane'
import { tableMixins } from '@/mixins/tableMixins'
import draggable from 'vuedraggable'
import { fn } from '@/utils/common'
import cropperModal from '@/components/cropperModal/cropperModal'
const columns = [
  { title: '轮播图位置', dataIndex: 'bannerLocationText', key: 'bannerLocationText', align: 'center' },
  {
    title: '是否自动轮播',
    dataIndex: 'hasAutoplay',
    key: 'hasAutoplay',
    scopedSlots: { customRender: 'hasAutoplay' },
    align: 'center'
  },
  {
    title: '切换间隔时间',
    dataIndex: 'bannerInterval',
    key: 'bannerInterval',
    scopedSlots: { customRender: 'bannerInterval' },
    align: 'center'
  },
  { title: '指引样式', dataIndex: 'indicatorModeText', key: 'indicatorModeText', align: 'center' },
  { title: '指引位置', dataIndex: 'indicatorPosText', key: 'indicatorPosText', align: 'center' },
  { title: '操作', key: 'operation', scopedSlots: { customRender: 'operation' }, width: 160, align: 'center' }
]

const innerColumns = [
  { title: '排序', customRender: (text, record, index) => `${index + 1}`, align: 'center' },
  {
    title: '图片',
    dataIndex: 'imgPathUrl',
    key: 'imgPathUrl',
    scopedSlots: { customRender: 'imgPathUrl' },
    width: 342,
    align: 'center'
  },
  { title: '链接地址', dataIndex: 'linkUrl', key: 'linkUrl', align: 'center' },
  {
    title: '状态',
    dataIndex: 'enableFlag',
    key: 'enableFlag',
    scopedSlots: { customRender: 'enableFlag' },
    width: 120,
    align: 'center'
  },
  { title: '操作', key: 'operation', scopedSlots: { customRender: 'operation' }, width: 160, align: 'center' }
]

export default {
  name: 'Demo',
  components: {
    // 'sketch-picker': Sketch
    BasePane,
    draggable,
    cropperModal
  },
  mixins: [tableMixins],
  props: {
    // 图片裁切配置
    options: {
      type: Object,
      default: function() {
        return {
          autoCropWidth: 750,
          autoCropHeight: 300
        }
      }
    }
  },
  i18n: require('./i18n'),
  data() {
    return {
      curIndex: 1,
      url: {
        list: this.$Api.getBannerList
      },
      queryParam: {
        appId: ''
      },
      loading: false,
      acceptType: 'image/*',
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }

      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 }
      },
      labelCol1: {
        xs: { span: 24 },
        sm: { span: 8 }

      },
      wrapperCol1: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      bannerList: [],
      indicatorList: [], // 弹框的指引列表
      visibleTitle: '', // 弹框的标题
      indType: '', // mode指的是样式，  pos指的是位置
      bannerLocationList: [],
      tmpBannerLocationList: [],
      indicatorModeList: [],
      indModeList: [{
        imgUrl: require('../../assets/img/ind1.jpg')
      },
      {
        imgUrl: require('../../assets/img/ind2.jpg')
      },
      {
        imgUrl: require('../../assets/img/ind3.jpg')
      },
      {
        imgUrl: require('../../assets/img/ind4.jpg')
      }],
      indicatorPosList: [],
      indPosList: [{
        imgUrl: require('../../assets/img/pos1.jpg')
      },
      {
        imgUrl: require('../../assets/img/pos2.jpg')
      },
      {
        imgUrl: require('../../assets/img/pos3.jpg')
      }],
      columns,
      innerColumns,
      modalTitle: '',
      visible: false,
      indVisible: false,
      curImgIndex: 0,
      curBannerIndex: 0,
      drag: false,
      appId: '',
      params: {
        appId: '',
        bannerLocation: '',
        hasAutoplay: true,
        indicatorMode: '',
        indicatorPos: '',
        bannerInterval: 3000,
        bannerPicList: []
      },
      rules: {
        bannerLocation: [
          { required: true, message: '请选择轮播图位置', trigger: 'change' }
        ],
        indicatorMode: [
          { required: true, message: '请选择指引方式', trigger: 'blur' }
        ],
        indicatorPos: [
          { required: true, message: '请选择指引位置', trigger: 'blur' }
        ]
      }

    }
  },
  mounted() {
    this.getBannerLocation()
    this.getIndicatorMode()
    this.getIndicatorPos()
    this.$refs.basePane.getAppList().then(res => {
      this.queryParam.appId = res.id
      // this.getBannerList()
      this.loadData()
    })
  },
  methods: {
    getCurIndex(res) {
      this.queryParam.appId = res.id
      this.loadData()
    },

    // 获取banner轮播图列表
    // getBannerList() {
    //   var params = {
    //     appId: this.appId
    //   }
    //   this.loading = true
    //   this.getBannerLocation()
    //   this.getIndicatorMode()
    //   this.getIndicatorPos()
    //   this.$Http.postAction(this.$Api.getBannerList, params).then(res => {
    //     if (res.msgCode === this.$Common.sucCode) {
    //       this.bannerList = res.result
    //     }
    //     this.loading = false
    //   })
    // },
    // 指引样式调整
    toCngMode(type) {
      // console.log(type)
      if (type == 'mode') {
        this.indicatorList = this.indicatorModeList // 弹框的指引列表
        this.visibleTitle = '指引样式' // 弹框的标题
        this.indType = 'mode' // mode指的是样式，  pos指的是位置
      }
      if (type == 'pos') {
        this.indicatorList = this.indicatorPosList // 弹框的指引列表
        this.visibleTitle = '指引位置' // 弹框的标题
        this.indType = 'pos' // mode指的是样式，  pos指的是位置
      }
      this.indVisible = true
    },
    // 选中指引样式
    selIndMode(item) {
      if (this.indType == 'mode') {
        this.params.indicatorMode = item.code
        this.params.indicatorModeText = item.name
      }
      if (this.indType == 'pos') {
        this.params.indicatorPos = item.code
        this.params.indicatorPosText = item.name
      }
      this.indVisible = false
    },

    // 获取Banner轮播图详情数据
    getBannerDetail(id, record) {
      let params = {
        id: id
      }
      this.bannerLocationList = []
      //  const rst = this.tmpBannerLocationList;
      // 将旧数组的值处理成id集合
      // const bannerLocations = this.bannerList.map(item => item.bannerLocation)
      // console.log('bannerLocations：',bannerLocations)
      // this.bannerLocationList  = rst.filter(item => !bannerLocations.includes(item.value))
      this.$Http.postAction(this.$Api.getBannerDetail, params).then(res => {
        // console.log(res)
        if (res.msgCode === this.$Common.sucCode) {
          this.params = res.result
          this.params.bannerInterval = this.params.hasAutoplay ? this.params.bannerInterval : '3000'
          this.tmpBannerLocationList.forEach(item => {
            if (item.code == this.params.bannerLocation) {
              this.bannerLocationList.push(item)
            }
          })
          if (record) {
            record.bannerPicList = res.result.bannerPicList
          }
        }
      })
    },
    // 获取轮播图位置列表
    getBannerLocation() {
      let params = {}
      this.$Http.postAction(this.$Api.getBannerLocation, params).then(res => {
        if (res.msgCode === this.$Common.sucCode) {
          this.tmpBannerLocationList = res.result
        }
      })
    },
    // 获取指引样式
    getIndicatorMode() {
      let params = {}
      this.$Http.postAction(this.$Api.getIndicatorMode, params).then(res => {
        if (res.msgCode === this.$Common.sucCode) {
          this.indicatorModeList = res.result
          // indModeList
          this.indicatorModeList.forEach((item, index) => {
            item.imgUrl = this.indModeList[index].imgUrl
          })
        }
      })
    },
    // 获取指引位置
    getIndicatorPos() {
      let params = {}
      this.$Http.postAction(this.$Api.getIndicatorPos, params).then(res => {
        if (res.msgCode === this.$Common.sucCode) {
          this.indicatorPosList = res.result
          // indModeList
          this.indicatorPosList.forEach((item, index) => {
            item.imgUrl = this.indPosList[index].imgUrl
          })
        }
      })
    },
    // 点击列表显示详情数据
    toCng(expanded, record) {
      console.log(expanded, record)
      if (expanded) {
        // this.getBannerDetail(record.id, record)
      }
    },
    add() {
      if (this.dataSource.length >= this.tmpBannerLocationList.length) {
        this.$message.warning('此主题轮播图位置已满，无法新增！')
      } else {
        const rst = this.tmpBannerLocationList
        // 将旧数组的值处理成id集合
        const bannerLocations = this.dataSource.map(item => item.bannerLocation)
        // console.log('bannerLocations：', bannerLocations)
        this.bannerLocationList = rst.filter(item => !bannerLocations.includes(item.code))
        this.modalTitle = '新增'
        this.params = {
          bannerLocation: '',
          appId: this.queryParam.appId,
          hasAutoplay: true,
          indicatorMode: '',
          indicatorPos: '',
          bannerInterval: 3000,
          bannerPicList: []
        }
        this.visible = true
      }
    },
    // 增加banner轮播图
    addDomain() {
      this.params.bannerPicList.push({
        imgPath: '',
        imgPathUrl: '',
        linkUrl: '',
        loading: false
      })
    },
    // 是否自动轮播切换
    onCngPlay(e) {
      // this.params.hasAutoplay= e ? 1 : 0;
      this.params.hasAutoplay = e
      if (!e) {
        this.params.bannerInterval = 3000
      }
      // console.log(this.params.hasAutoplay)
    },
    // 图片上传创建索引
    toCutDown(index) {
      this.curImgIndex = index
    },
    // 上传轮播图限制
    beforeUpload(file) {
      if (fn.beforeUpload(file, ['image/png', 'image/gif', 'image/jpeg', 'image/jpg'], 2)) {
        return true
      } else {
        return false
      }
    },

    // 轮播图截取
    customRequest(info) {
      const { options } = this
      // console.log('info:',info)
      fn.getBase64(info.file, imageUrl => {
        let blogImg = window.URL.createObjectURL(this.$Common.dataURLtoBlob(imageUrl))
        // console.log(blogImg)
        const target = Object.assign({}, options, {
          // img:imageUrl
          img: blogImg
        })
        this.$refs['cropperModal'].edit(target)
      })
    },

    // 裁剪成功后的File对象
    handleCropperSuccess(data) {
      // console.log('File:',data);
      // 进行图片上传动作
      this.params.bannerPicList[this.curImgIndex].loading = true
      // 正式应用
      let params = {
        fileType: 'imageFile',
        fileStr: data
      }
      // uploadFileImg(params).then(res => {
      this.$Http.postAction(this.$Api.uploadFileImg, params).then(res => {
        //  console.log("res：", res)
        if (res.msgCode === this.$Common.sucCode) {
          this.params.bannerPicList[this.curImgIndex].imgPath = res.result.id
          this.params.bannerPicList[this.curImgIndex].imgPathUrl = res.result.fileUrl
          this.$refs.ruleForm.clearValidate('bannerPicList.' + this.curImgIndex + '.imgPath')
          //  this.$message.success('上传成功')
          this.$emit('ok')
          this.params.bannerPicList[this.curImgIndex].loading = false
        }
      })
    },
    // 删除数据
    removeDomain(item) {
      const index = this.params.bannerPicList.indexOf(item)
      if (index !== -1) {
        this.params.bannerPicList.splice(index, 1)
      }
    },
    onStart() {
      this.drag = true
    },
    onEnd() {
      this.drag = false
    },
    datadragEnd() {
      //  console.log(this.params.bannerPicList)
    },

    // 启用
    toEnable(record, item) {
      const params = {
        id: item.id
      }
      this.$Http.postAction(this.$Api.enablePic, params).then(res => {
        if (res.msgCode === this.$Common.sucCode) {
          this.$message.success('启用成功')
          this.getBannerDetail(record.id, record)
        }
      })
    },
    // 禁用
    toDisable(record, item) {
      const params = {
        id: item.id
      }
      this.$Http.postAction(this.$Api.disablePic, params).then(res => {
        if (res.msgCode === this.$Common.sucCode) {
          this.$message.success('禁用成功')
          this.getBannerDetail(record.id, record)
        }
      })
    },
    onSubmit(e) {
      e.preventDefault()
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.params.bannerPicList.forEach((item, index) => {
            item.sortNumber = index + 1
          })
          this.$Http.postAction(this.$Api.saveBanner, this.params).then(res => {
            if (res.msgCode === this.$Common.sucCode) {
              this.$message.success('保存成功')
              this.getBannerList()
              this.visible = false
            }
          })
        } else {
          return false
        }
      })
    },
    handleCancel() {
      this.$refs.ruleForm.resetFields()
      this.visible = false
    },
    edit(item) {
      //  this.params = {};
      // this.getBannerDetail(item.id)
      this.modalTitle = '编辑'
      this.visible = true
      this.params = Object.assign({}, item)
      this.tmpBannerLocationList.forEach(item => {
        if (item.code == this.params.bannerLocation) {
          this.bannerLocationList.push(item)
        }
      })
    },

    // 确认删除轮播
    del(item) {
      const params = {
        id: item.id
      }
      this.$Http.postAction(this.$Api.delBanner, params).then(res => {
        if (res.msgCode === this.$Common.sucCode) {
          this.$message.success('删除成功')
          this.getBannerList()
          this.delVisible = false
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
    @import "index";

</style>
