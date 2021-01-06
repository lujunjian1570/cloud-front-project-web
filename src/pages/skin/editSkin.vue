<template>
  <div class="common-page">
    <div class="inner-cont">
      <a-breadcrumb>
        <a-breadcrumb-item>
          <router-link
            tag="a"
            to="/setting/skin"
          >
            换肤设置
          </router-link>
        </a-breadcrumb-item>
        <a-breadcrumb-item>{{ params.id ? '编辑' : '新增' }}</a-breadcrumb-item>
      </a-breadcrumb>
      <div>
        <a-card
          :body-style="{padding: '30px 0'}"
          :bordered="false"
        >
          <a-form-model
            ref="ruleForm"
            :label-col="labelCol"
            :model="params"
            :rules="rules"
            :wrapper-col="wrapperCol"
          >
            <a-form-model-item
              label="封面图"
              prop="viewPic"
            >
              <a-upload
                list-type="picture-card"
                class="avatar-uploader view-pic-upload"
                :show-upload-list="false"
                :accept="acceptType"
                :before-upload="beforeUpload"
                :custom-request="customRequest"
              >
                <img
                  v-if="params.viewPic"
                  :src="params.viewPicUrl"
                  width="300"
                >
                <div v-else>
                  <a-icon :type="loading ? 'loading' : 'plus'" />
                </div>
              </a-upload>
            </a-form-model-item>

            <a-form-model-item
              label="皮肤名称"
              prop="themeName"
            >
              <a-input
                id="theme-name"
                v-model="params.themeName"
                placeholder="请输入皮肤名称"
              />
            </a-form-model-item>
            <a-form-model-item
              label="皮肤类型"
              prop="themeType"
            >
              <a-select
                id="theme-type"
                v-model="params.themeType"
                placeholder="请选择皮肤类型"
                default-value=""
              >
                <a-select-option
                  v-for="(item,index) in themeTypeList"
                  :key="index"
                  :value="item.code"
                >
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-model-item>

            <a-form-model-item
              label="皮肤描述"
              prop="remark"
            >
              <a-textarea
                id="remark"
                v-model="params.remark"
                :style="{ 'resize': 'none', height:'80px'}"
                placeholder="请输入皮肤描述"
              />
            </a-form-model-item>
            <div class="hr" />
            <div class="skin-cont">
              <div class="phone spe-phone">
                <div
                  :style="{ background: params.navbarBackgroundColor }"
                  class="top-phone"
                >
                  <div class="fix-phone">
                    <div>{{ hours > 9 ? hours : `0`+ hours }}:{{ minutes > 9 ? minutes : `0`+ minutes }}</div>
                    <div>
                      <img
                        src="../../assets/img/iconPhone/sign.png"
                        width="10px"
                      >
                      <img
                        src="../../assets/img/iconPhone/wifi.png"
                        width="10px"
                      >
                      <img
                        src="../../assets/img/iconPhone/battery.png"
                        width="10px"
                      >
                    </div>
                  </div>
                  <div class="phone-header">
                    <p :style="{ color: params.navbarColor }">
                      {{ selIconBarText }}
                    </p>
                  </div>
                </div>
                <div
                  :style="{ background: params.tabbarBackgroundColor , color: params.tabbarColor }"
                  class="bot-phone"
                >
                  <div
                    v-for="(item,index) in params.platformThemeIconList"
                    :key="index"
                    class="item-bot-icon"
                    :class="`item-bot-icon-`+index"
                    @click="selIconBar(index)"
                  >
                    <span>
                      <img
                        :src="selIconBarIndex == index ? item.selectedIconPathUrl : item.iconPathUrl"
                        height="20"
                        width="20"
                      >
                    </span>
                    <span
                      v-if="selIconBarIndex == index"
                      :style="{ color: params.tabbarSelectColor }"
                    >{{ item.iconText }}</span>
                    <span v-else>{{ item.iconText }}</span>
                  </div>
                </div>
              </div>
              <div
                class="set-skin"
                style="margin-left: 20px;"
              >
                <a-row>
                  <a-col
                    :xs="20"
                    :offset="2"
                  >
                    顶部导航栏
                  </a-col>
                </a-row>
                <a-row>
                  <a-col
                    :md="24"
                    :xs="24"
                    :sm="24"
                    :xxl="24"
                  >
                    <a-form-model-item
                      :label-col="labelCol1"
                      :wrapper-col="wrapperCol1"
                      label="背景颜色"
                      prop="navbarBackgroundColor"
                    >
                      <a-input
                        id="navbar-background-color"
                        v-model="params.navbarBackgroundColor"
                        :style="{background:params.navbarBackgroundColor }"
                        placeholder="示例：#ffffff"
                        :max-length="7"
                        @click="handleShowColor(0)"
                      />
                      <div
                        v-show="listColorShow[0].colorShow && selColorIndex == 0"
                        class="picker-color-choose"
                      >
                        <div
                          class="mask-cover"
                          @click="hidePicker(0)"
                        >
                          <a-icon
                            type="close"
                            class="mask-close"
                          />
                        </div>
                        <sketch-picker
                          v-model="params.navbarBackgroundColor"
                          @input="updateValue"
                        />
                      </div>
                    </a-form-model-item>
                    <a-form-model-item
                      :label-col="labelCol1"
                      :wrapper-col="wrapperCol1"
                      label="文字颜色"
                      prop="navbarColor"
                    >
                      <a-input
                        id="navbar-color"
                        v-model="params.navbarColor"
                        :style="{background:params.navbarColor }"
                        placeholder="示例：#333333"
                        :max-length="7"
                        @click="handleShowColor(1)"
                      />
                      <div
                        v-show="listColorShow[1].colorShow && selColorIndex == 1"
                        class="picker-color-choose"
                      >
                        <div
                          class="mask-cover"
                          @click="hidePicker(1)"
                        >
                          <a-icon
                            type="close"
                            class="mask-close"
                          />
                        </div>
                        <sketch-picker
                          v-model="params.navbarColor"
                          @input="updateValue"
                        />
                      </div>
                    </a-form-model-item>
                    <a-row>
                      <a-col
                        :xs="20"
                        :offset="2"
                      >
                        底部菜单栏
                      </a-col>
                    </a-row>
                    <a-form-model-item
                      :label-col="labelCol1"
                      :wrapper-col="wrapperCol1"
                      label="背景颜色"
                      prop="tabbarBackgroundColor"
                    >
                      <a-input
                        id="tabbar-background-color"
                        v-model="params.tabbarBackgroundColor"
                        :style="{background:params.tabbarBackgroundColor }"
                        placeholder="示例：#ffffff"
                        :max-length="7"
                        @click="handleShowColor(3)"
                      />
                      <div
                        v-show="listColorShow[3].colorShow && selColorIndex == 3"
                        class="picker-color-choose"
                      >
                        <div
                          class="mask-cover"
                          @click="hidePicker(3)"
                        >
                          <a-icon
                            type="close"
                            class="mask-close"
                          />
                        </div>
                        <sketch-picker
                          v-model="params.tabbarBackgroundColor"
                          @input="updateValue"
                        />
                      </div>
                    </a-form-model-item>
                    <a-form-model-item
                      :label-col="labelCol1"
                      :wrapper-col="wrapperCol1"
                      label="文字点击前颜色"
                      prop="tabbarColor"
                    >
                      <a-input
                        id="tabbar-color"
                        v-model="params.tabbarColor"
                        :style="{background:params.tabbarColor }"
                        placeholder="示例：#333333"
                        :max-length="7"
                        @click="handleShowColor(4)"
                      />
                      <div
                        v-show="listColorShow[4].colorShow && selColorIndex == 4"
                        class="picker-color-choose"
                      >
                        <div
                          class="mask-cover"
                          @click="hidePicker(4)"
                        >
                          <a-icon
                            type="close"
                            class="mask-close"
                          />
                        </div>
                        <sketch-picker
                          v-model="params.tabbarColor"
                          @input="updateValue"
                        />
                      </div>
                    </a-form-model-item>
                    <a-form-model-item
                      :label-col="labelCol1"
                      :wrapper-col="wrapperCol1"
                      label="文字点击后颜色"
                      prop="tabbarSelectColor"
                    >
                      <a-input
                        id="tabbar-select-color"
                        v-model="params.tabbarSelectColor"
                        :style="{background:params.tabbarSelectColor }"
                        placeholder="示例：#333333"
                        :max-length="7"
                        @click="handleShowColor(5)"
                      />
                      <div
                        v-show="listColorShow[5].colorShow && selColorIndex == 5"
                        class="picker-color-choose"
                      >
                        <div
                          class="mask-cover"
                          @click="hidePicker(5)"
                        >
                          <a-icon
                            type="close"
                            class="mask-close"
                          />
                        </div>
                        <sketch-picker
                          v-model="params.tabbarSelectColor"
                          @input="updateValue"
                        />
                      </div>
                    </a-form-model-item>
                  </a-col>
                </a-row>
                <div>
                  <a-row
                    :gutter="24"
                    align="middle"
                    type="flex"
                  >
                    <a-col
                      v-for="(item, index) in params.platformThemeIconList"
                      :key="index"
                      :md="14"
                      :lg="8"
                      :sm="24"
                      :xs="24"
                      :span="4"
                      :xxl="6"
                      style="margin-bottom: 20px;"
                    >
                      <a-card
                        :title="`菜单` + (index+1)"
                        size="small"
                      >
                        <span
                          v-if="index"
                          slot="extra"
                          style="cursor: pointer;"
                          @click="remove(item)"
                        >
                          <a-icon type="close" />
                        </span>
                        <a-form-model-item
                          :label-col="labelCol2"
                          :prop="'platformThemeIconList.' + index + '.iconText'"
                          :rules="{
                            required : true,
                            message : '名称不能为空',
                            trigger : 'blur'
                          }"
                          :wrapper-col="wrapperCol2"
                          label="名称"
                        >
                          <a-input
                            v-model="item.iconText"
                            :class="`icon-text-`+index"
                            :max-length="4"
                            placeholder="请输入名称"
                          />
                        </a-form-model-item>
                        <a-form-model-item
                          :label-col="labelCol2"
                          :prop="'platformThemeIconList.' + index + '.linkName'"
                          :rules="{
                            required : true,
                            message : '链接不能为空',
                            trigger : 'blur'
                          }"
                          :wrapper-col="wrapperCol2"
                          label="链接"
                        >
                          <span v-if="index==0">首页</span>
                          <a-input
                            v-else
                            v-model="item.linkName"
                            :class="`link-name-`+index"
                            :disabled="true"
                            placeholder="链接"
                          />
                          <p
                            v-if="index!=0"
                            class="edit-link"
                            @click="showModal(index)"
                          >
                            修改
                          </p>
                        </a-form-model-item>
                        <a-form-model-item
                          :label-col="labelCol2"
                          :prop="'platformThemeIconList.' + index + '.selectedIconPath'"
                          :rules="{
                            required : true,
                            message : '图标不能为空',
                            trigger : 'blur'
                          }"
                          :wrapper-col="wrapperCol2"
                          label="图标"
                        >
                          <div class="icon-upload">
                            <div
                              class="hov-img"
                              @click="upImgDefault(index,'default')"
                            >
                              <a-upload
                                :before-upload="beforeUpload"
                                :show-upload-list="false"
                                :accept="acceptType"
                                :action="actionPath"
                                :data="upParams"
                                class="avatar-uploader"
                                :class="`icon-path-url-`+index"
                                list-type="picture-card"
                                @change="handleChange"
                              >
                                <img
                                  v-if="item.iconPath"
                                  :src="item.iconPathUrl"
                                  alt="avatar"
                                  height="40"
                                  width="40"
                                >
                                <img
                                  v-else
                                  height="40"
                                  src="../../assets/img/defaultPic.png"
                                  width="40"
                                >
                                <span
                                  v-if="item.loading"
                                  class="img-loading"
                                ><a-icon type="loading" /></span>
                                <p><a-icon type="plus" /></p>
                              </a-upload>
                              <span style=" line-height: 20px; text-align: center;">点击前</span>
                            </div>
                            <div
                              class="hov-img"
                              @click="upImgDefault(index,'selected')"
                            >
                              <a-upload
                                :before-upload="beforeUpload"
                                :show-upload-list="false"
                                :accept="acceptType"
                                :action="actionPath"
                                :data="upParams"
                                class="avatar-uploader"
                                :class="`selected-icon-path-url-`+index"
                                list-type="picture-card"
                                @change="handleChange"
                              >
                                <img
                                  v-if="item.selectedIconPath"
                                  :src="item.selectedIconPathUrl"
                                  alt="avatar"
                                  height="40"
                                  width="40"
                                >
                                <img
                                  v-else
                                  height="40"
                                  src="../../assets/img/defaultPic.png"
                                  width="40"
                                >
                                <span
                                  v-if="item.seloading"
                                  class="img-loading"
                                ><a-icon type="loading" /></span>
                                <p><a-icon type="plus" /></p>
                              </a-upload>
                              <span style=" line-height: 20px; text-align: center;">点击后</span>
                            </div>
                          </div>
                        </a-form-model-item>
                      </a-card>
                    </a-col>

                    <a-col
                      v-if="params.platformThemeIconList.length<5"
                      :span="4"
                    >
                      <a-button
                        id="add-link-menu"
                        @click="addLinkMenu"
                      >
                        添加菜单
                      </a-button>
                    </a-col>
                  </a-row>
                </div>
              </div>
            </div>
            <div
              class="hr"
              style="margin: 30px 0;"
            />
            <a-form-model-item
              label="应用时间"
              prop="endTime"
            >
              <a-range-picker
                id="start-end-date"
                :value="getDateRange(params.startTime,params.endTime)"
                :format="dateFormat"
                @change="onChangeDate"
              />
            </a-form-model-item>
            <div class="skin-opts-btns">
              <a-button
                id="back-url"
                style="margin-right: 40px;"
                @click="backUrl"
              >
                返回
              </a-button>
              <a-button
                id="submit"
                type="primary"
                @click="onSubmit"
              >
                确定
              </a-button>
            </div>
          </a-form-model>
        </a-card>
      </div>
    </div>
    <!-- modal -->
    <cropper-modal
      ref="cropperModal"
      @ok="handleCropperSuccess"
    />
    <a-modal
      v-model="visibleLink"
      centered
      title="菜单链接"
      @ok="handleOk"
    >
      <a-radio-group
        v-model="selpagePath"
        @change="onChange"
      >
        <a-radio
          v-for="(item,index) in tabbarLinkList"
          :key="index"
          :style="radioStyle"
          :value="item.pagePath"
        >
          {{ item.iconText }}
        </a-radio>
      </a-radio-group>
    </a-modal>
  </div>
</template>

<script>
import moment from 'moment'
import cropperModal from '@/components/cropperModal/cropperModal'
import { Sketch } from 'vue-color'
import { fn } from '@/utils/common'

export default {
  name: 'Demo',
  components: {
    'sketch-picker': Sketch,
    'cropper-modal': cropperModal
  },
  props: {
    // 图片裁切配置
    options: {
      type: Object,
      default: function() {
        return {
          autoCropWidth: 600,
          autoCropHeight: 390
        }
      }
    }
  },
  data() {
    return {
      actionPath: this.$Api.uploadFile,
      acceptType: 'image/*',
      upParams: {
        fileType: 'imageFile'
      },
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }

      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 }
      },
      labelCol1: {
        xs: { span: 24 },
        sm: { span: 24 },
        lg: { span: 7 }

      },
      wrapperCol1: {
        xs: { span: 24 },
        sm: { span: 24 },
        lg: { span: 7 }
      },
      labelCol2: {
        xs: { span: 24 },
        sm: { span: 24 },
        lg: { span: 8 }

      },
      wrapperCol2: {
        xs: { span: 24 },
        sm: { span: 24 },
        lg: { span: 16 }
      },
      hours: '',
      minutes: '',
      visibleLink: false,
      loading: false,
      dateFormat: 'YYYY-MM-DD',
      selpagePath: '',
      linkNameIndex: 0,
      radioStyle: {
        display: 'block',
        height: '30px',
        lineHeight: '30px'
      },
      // 颜色选择器
      listColorShow: [{
        colorShow: false
      },
      {
        colorShow: false
      },
      {
        colorShow: false
      },
      {
        colorShow: false
      },
      {
        colorShow: false
      },
      {
        colorShow: false
      }],
      themeTypeList: [],
      selColorIndex: 0,
      selIconBarIndex: 0, // 演示底部导航栏显示
      selIconBarText: '首页',
      curIconIndex: 0,
      curIconSelIndex: 0,
      upIconType: '',
      tabbarLinkList: [
        {
          'iconText': '首页',
          'pagePath': '/pages/tabbar/index/index'
        },
        {
          'iconText': '分类',
          'pagePath': '/pages/tabbar/category/category'
        },
        {
          'iconText': '购物车',
          'pagePath': '/pages/tabbar/cart/cart'
        },
        {
          'iconText': '我的',
          'pagePath': '/pages/tabbar/my/my'
        }

      ],
      tabbarLinkListIndex: 0,
      params: {
        id: '',
        navbarBackgroundColor: '',
        navbarColor: '',
        tabbarBackgroundColor: '',
        tabbarColor: '',
        tabbarSelectColor: '',
        viewPic: '', // 封面图
        viewPicUrl: '',
        themeName: '', // 皮肤名称,
        // themeType:'',//皮肤类型
        terminalType: '',
        appId: '',
        remark: '', // 皮肤描述
        startTime: '', // 应用开始时间
        endTime: '', // 应用结束时间
        defalutIcon: require('../../assets/img/defaultPic.png'),
        platformThemeIconList: [
          {
            'iconPath': '',
            'iconPathUrl': '',
            'selectedIconPath': '',
            'selectedIconPathUrl': '',
            'iconText': '首页',
            'linkName': '首页',
            'pagePath': '/pages/tabbar/index/index',
            'loading': false,
            'seloading': false
          },
          {
            'iconPath': '',
            'iconPathUrl': '',
            'selectedIconPath': '',
            'selectedIconPathUrl': '',
            'iconText': '分类',
            'linkName': '分类',
            'pagePath': '/pages/tabbar/category/category',
            'loading': false,
            'seloading': false
          },
          {
            'iconPath': '',
            'iconPathUrl': '',
            'selectedIconPath': '',
            'selectedIconPathUrl': '',
            'iconText': '购物车',
            'linkName': '购物车',
            'pagePath': '/pages/tabbar/cart/cart',
            'loading': false,
            'seloading': false
          },
          {
            'iconPath': '',
            'iconPathUrl': '',
            'selectedIconPath': '',
            'selectedIconPathUrl': '',
            'iconText': '我的',
            'linkName': '我的',
            'pagePath': '/pages/tabbar/my/my',
            'loading': false,
            'seloading': false
          }
        ]
      },
      rules: {
        viewPic: [
          { required: true, message: '请上传封面图', trigger: 'change' }
        ],
        themeName: [
          { required: true, message: '请填写皮肤名称', trigger: 'blur' }
        ],
        themeType: [
          { required: true, message: '请选择皮肤类型', trigger: 'blur' }
        ],
        navbarBackgroundColor: [
          { required: true, message: '请选择背景颜色', trigger: 'blur' }
        ],
        navbarColor: [
          { required: true, message: '请选择文字颜色', trigger: 'blur' }
        ],
        // backColor: [
        //     { required: true, message: '请选择返回按钮颜色', trigger: 'blur' }
        // ],
        tabbarBackgroundColor: [
          { required: true, message: '请选择背景颜色', trigger: 'blur' }
        ],
        tabbarColor: [
          { required: true, message: '请选择文字点击前颜色', trigger: 'blur' }
        ],
        tabbarSelectColor: [
          { required: true, message: '请选择文字点击后颜色', trigger: 'blur' }
        ],
        endTime: [
          { required: true, message: '请选择应用时间', trigger: 'blur' }
        ]

      }
    }
  },
  created() {
    this.getThemeType()
    this.params.appId = this.$route.query.appId
    if (this.$route.query.id) {
      this.getThemeDetail(this.$route.query.id)
    }
    this.hours = new Date().getHours()
    this.minutes = new Date().getMinutes()
    // console.log(process.env.VUE_APP_API_BASE_URL)
  },
  methods: {
    moment,
    // 获取主题类型
    getThemeType() {
      let params = {}
      this.$Http.postAction(this.$Api.getThemeType, params).then(res => {
        if (res.msgCode === this.$Common.sucCode) {
          this.themeTypeList = res.result
        }
      })
    },
    // 获取主题详情
    getThemeDetail(id) {
      let params = {
        id: id
      }
      this.$Http.postAction(this.$Api.getThemeDetail, params).then(res => {
        if (res.msgCode === this.$Common.sucCode) {
          Object.keys(res.result).forEach((key) => {
            if (res.result[key] == null) {
              res.result[key] = ''
            }
          })
          this.params = res.result
          let platformThemeIconList = res.result.platformThemeIconList
          if (platformThemeIconList.length) {
            for (let i in platformThemeIconList) {
              // platformThemeIconList[i].linkName = platformThemeIconList[i].iconText;
              for (let j in this.tabbarLinkList) {
                if (platformThemeIconList[i].pagePath == this.tabbarLinkList[j].pagePath) {
                  platformThemeIconList[i].linkName = this.tabbarLinkList[j].iconText
                }
              }
              platformThemeIconList[i].loading = false
              platformThemeIconList[i].seloading = false
            }
          }
          // this.params.backColor = '#FFFFFF';
          this.params.platformThemeIconList = platformThemeIconList
        }
      })
    },
    // 获取默认时间
    getDateRange(startDate, endDate) {
      return startDate && endDate ? [this.moment(startDate, 'YYYY-MM-DD'), this.moment(endDate, 'YYYY-MM-DD')] : null
    },

    // 封面图截取
    customRequest(info) {
      const { options } = this
      fn.getBase64(info.file, imageUrl => {
        let blogImg = window.URL.createObjectURL(this.$Common.dataURLtoBlob(imageUrl))
        // console.log(blogImg)
        this.loading = false
        const target = Object.assign({}, options, {
          // img: imageUrl
          img: blogImg
        })
        this.$refs['cropperModal'].edit(target)
      })
    },

    // 裁剪成功后的File对象
    handleCropperSuccess(data) {
      // 进行图片上传动作
      this.loading = true
      // 正式应用
      let params = {
        fileType: 'imageFile',
        fileStr: data
      }
      // uploadFileImg(params).then(res => {
      this.$Http.postAction(this.$Api.uploadFileImg, params).then(res => {
        if (res.msgCode === this.$Common.sucCode) {
          this.params.viewPic = res.result.id
          this.params.viewPicUrl = res.result.fileUrl
          this.$refs.ruleForm.clearValidate('viewPic')
          //  this.$message.success('上传成功')
          this.$emit('ok')
          this.loading = false
        }
      })
    },

    // 颜色选择器
    handleShowColor(index) {
      this.selColorIndex = index
      for (let i in this.listColorShow) {
        if (i != index) {
          this.listColorShow[i].colorShow = false
        }
      }
      this.listColorShow[this.selColorIndex].colorShow = !this.listColorShow[this.selColorIndex].colorShow
    },
    updateValue(val) {
      // console.log('颜色选择', val)
      if (this.selColorIndex == 0) {
        this.params.navbarBackgroundColor = val.hex
        this.$refs.ruleForm.clearValidate('navbarBackgroundColor')
      }
      if (this.selColorIndex == 1) {
        this.params.navbarColor = val.hex
        this.$refs.ruleForm.clearValidate('navbarColor')
      }
      // if( this.selColorIndex == 2) {
      //     this.params.backColor = val.hex;
      //     this.$refs.ruleForm.clearValidate('backColor');
      // }
      if (this.selColorIndex == 3) {
        this.params.tabbarBackgroundColor = val.hex
        this.$refs.ruleForm.clearValidate('tabbarBackgroundColor')
      }
      if (this.selColorIndex == 4) {
        this.params.tabbarColor = val.hex
        this.$refs.ruleForm.clearValidate('tabbarColor')
      }
      if (this.selColorIndex == 5) {
        this.params.tabbarSelectColor = val.hex
        this.$refs.ruleForm.clearValidate('tabbarSelectColor')
      }
      // this.listColorShow[this.selColorIndex].colorShow = !this.listColorShow[this.selColorIndex].colorShow
    },
    // 隐藏颜色
    hidePicker(index) {
      this.listColorShow[index].colorShow = !this.listColorShow[index].colorShow
    },
    // 底部导航菜单选中显示切换效果
    selIconBar(index) {
      this.selIconBarIndex = index
      this.selIconBarText = this.params.platformThemeIconList[index].iconText
    },
    // 显示弹框
    showModal(index) {
      this.linkNameIndex = index
      this.selpagePath = this.params.platformThemeIconList[index].pagePath
      this.tabbarLinkListIndex = this.tabbarLinkList.map(item => item.pagePath).indexOf(this.selpagePath)
      this.visibleLink = true
    },
    onChange(e) {
      this.selpagePath = e.target.value
      this.tabbarLinkListIndex = this.tabbarLinkList.map(item => item.pagePath).indexOf(this.selpagePath)
    },
    // 底部菜单地址修改
    handleOk() {
      this.params.platformThemeIconList[this.linkNameIndex].linkName = this.tabbarLinkList[this.tabbarLinkListIndex].iconText
      this.params.platformThemeIconList[this.linkNameIndex].pagePath = this.tabbarLinkList[this.tabbarLinkListIndex].pagePath
      this.visibleLink = false
    },
    onChangeDate(date, dateString) {
      this.params.startTime = dateString[0]
      this.params.endTime = dateString[1]
    },
    upImgDefault(index, type) {
      this.curIconIndex = index
      this.upIconType = type
    },
    beforeUpload(file) {
      // const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      // if (!isJpgOrPng) {
      //     this.$message.error('请选择正确的图片格式');
      //     return false;
      // }
      // const isLt2M = file.size / 1024 / 1024 < 0.1;
      // if (!isLt2M) {
      //     this.$message.error('请上传小于2M的图片');
      //     return false;
      // }
      // return isJpgOrPng && isLt2M;
      if (fn.beforeUpload(file, ['image/png', 'image/gif', 'image/jpeg', 'image/jpg'], 2)) {
        return true
      } else {
        return false
      }
    },
    // 图片上传
    handleChange(info) {
      if (info.file.status === 'uploading') {
        if (this.upIconType == 'default') {
          this.params.platformThemeIconList[this.curIconIndex].loading = true
        }
        if (this.upIconType == 'selected') {
          this.params.platformThemeIconList[this.curIconIndex].seloading = true
        }
        return
      }
      if (info.file.status === 'done') {
        if (this.upIconType == 'default') {
          // this.params.platformThemeIconList[this.curIconIndex].iconPath = imageUrl;
          if (info.file.response.msgCode == this.$Common.sucCode) {
            this.params.platformThemeIconList[this.curIconIndex].iconPath = info.file.response.result.id
            this.params.platformThemeIconList[this.curIconIndex].iconPathUrl = info.file.response.result.fileUrl
          }
          this.params.platformThemeIconList[this.curIconIndex].loading = false
        }
        if (this.upIconType == 'selected') {
          // this.params.platformThemeIconList[this.curIconIndex].selectedIconPath = imageUrl;
          if (info.file.response.msgCode == this.$Common.sucCode) {
            this.params.platformThemeIconList[this.curIconIndex].selectedIconPath = info.file.response.result.id
            this.params.platformThemeIconList[this.curIconIndex].selectedIconPathUrl = info.file.response.result.fileUrl
          }
          this.params.platformThemeIconList[this.curIconIndex].seloading = false
        }
      }
    },
    // 删除菜单
    remove(item) {
      const index = this.params.platformThemeIconList.indexOf(item)
      if (index !== -1) {
        this.params.platformThemeIconList.splice(index, 1)
      }
    },
    // 添加菜单
    addLinkMenu() {
      this.params.platformThemeIconList.push({
        'iconPath': '',
        'iconPathUrl': '',
        'selectedIconPath': '',
        'selectedIconPathUrl': '',
        'iconText': '',
        'linkName': '',
        'pagePath': '',
        'loading': false,
        'seloading': false
      })
    },
    // 提交主题 皮肤
    onSubmit(e) {
      e.preventDefault()
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          // console.log('params：',JSON.stringify(this.params));
          this.$Http.postAction(this.$Api.addTheme, this.params).then(res => {
            if (res.msgCode == this.$Common.sucCode) {
              // console.log(closeRoute,nextRoute)
              this.$message.success('保存成功')
              this.$closePage(this.$route.path, '/setting/skin')
              // this.$router.push('/setting/skin') ;
            }
          })
        } else {
          return false
        }
      })
    },
    // 返回
    backUrl() {
      // this.$router.push('/setting/skin') ;
      this.$closePage(this.$route.path, '/setting/skin')
    }
  }

}
</script>

<style lang="less" scoped>
    @import "index";

</style>
