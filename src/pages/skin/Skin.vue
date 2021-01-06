<template>
  <div class="common-page">
    <div>
      <base-pane
        ref="basePane"
        @change="getCurIndex"
      >
        <div slot="rc">
          <div class="inner-cont">
            <div class="table-page-search-wrapper">
              <a-form layout="inline">
                <a-row :gutter="48">
                  <a-col
                    :xxl="6"
                    :lg="8"
                    :md="12"
                    :sm="24"
                  >
                    <a-form-item label="皮肤名称">
                      <a-input
                        id="theme-name"
                        v-model="queryParam.themeName"
                        placeholder=""
                      />
                    </a-form-item>
                  </a-col>
                  <a-col
                    :xxl="6"
                    :lg="8"
                    :md="12"
                    :sm="24"
                  >
                    <a-form-item label="皮肤类型">
                      <a-select
                        id="theme-type"
                        v-model="queryParam.themeType"
                        placeholder="请选择"
                        default-value=""
                      >
                        <a-select-option value="">
                          全部
                        </a-select-option>
                        <a-select-option
                          v-for="(item,index) in themeTypeList"
                          :key="index"
                          :value="item.code"
                        >
                          {{ item.name }}
                        </a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <a-col
                    :xxl="6"
                    :lg="8"
                    :md="12"
                    :sm="24"
                  >
                    <a-button
                      id="search-query"
                      type="primary"
                      icon="search"
                      @click="searchQuery"
                    >
                      查询
                    </a-button>
                    <a-button
                      id="search-reset"
                      style="margin-left: 8px;"
                      @click="searchReset"
                    >
                      重置
                    </a-button>
                  </a-col>
                </a-row>
              </a-form>
            </div>
            <div class="opts">
              <a-button
                id="add"
                type="primary"
                icon="plus"
                @click="addSkin"
              >
                新增
              </a-button>
            </div>
            <div class="card-list">
              <a-list
                :grid="{gutter: 24, xxl:4, xl:3, md: 2, sm: 1}"
                :data-source="dataSource"
              >
                <a-list-item
                  slot="renderItem"
                  slot-scope="item"
                >
                  <div
                    v-if="item.useStatus ==1"
                    class="skin-list"
                  >
                    <div class="tags-use">
                      <img
                        src="../../assets/img/using.png"
                        width="70px"
                      >
                    </div>
                    <div class="skin-tit">
                      <p>{{ !item.hasDefault? item.themeName : '默认皮肤' }}</p>
                    </div>
                    <div style="position: relative;">
                      <img
                        :key="item.viewPic"
                        v-lazy="item.viewPicUrl"
                        width="100%"
                      >
                      <div
                        v-if="!item.hasDefault"
                        class="tags-date"
                      >
                        <p>应用时间：</p>
                        <p>{{ item.startTime }} ~ {{ item.endTime }}</p>
                      </div>
                    </div>
                    <div class="opts-btn">
                      <a-button
                        :id="`pre-view-` + item.id"
                        type="primary"
                        @click="toView(item)"
                      >
                        预览
                      </a-button>
                      <div>
                        <a-button
                          v-if="!item.hasDefault"
                          :id="`to-Default-` + item.id"
                          type="primary"
                          ghost
                          @click="toDefault(item)"
                        >
                          立即失效
                        </a-button>
                      </div>
                    </div>
                  </div>

                  <div
                    v-if="item.useStatus ==2"
                    class="skin-list"
                  >
                    <div class="skin-tit">
                      <p>{{ !item.hasDefault? item.themeName : '默认皮肤' }}</p>
                      <div
                        v-if="!item.hasDefault"
                        style="position: absolute; top: 0; right: 20px;"
                      >
                        <a-dropdown placement="bottomCenter">
                          <span style="cursor: pointer;">
                            <a-icon type="dash" />
                          </span>
                          <a-menu slot="overlay">
                            <a-menu-item>
                              <a
                                :id="`edit-` + item.id"
                                href="javascript:;"
                                @click="editSkin(item.id)"
                              >编辑</a>
                            </a-menu-item>
                            <a-menu-item @click="del(item)">
                              <a
                                :id="`del -` + item.id"
                                href="javascript:;"
                              >删除</a>
                            </a-menu-item>
                          </a-menu>
                        </a-dropdown>
                      </div>
                    </div>
                    <div style="position: relative;">
                      <img
                        :key="item.viewPic"
                        v-lazy="item.viewPicUrl"
                        width="100%"
                      >
                      <div
                        v-if="!item.hasDefault"
                        class="tags-date"
                      >
                        <p>应用时间：</p>
                        <p>{{ item.startTime }} ~ {{ item.endTime }}</p>
                      </div>
                    </div>
                    <div class="opts-btn">
                      <a-button
                        :id="`pre-view-` + item.id"
                        type="primary"
                        @click="toView(item)"
                      >
                        预览
                      </a-button>
                      <div>
                        <a-button
                          :id="`to-used-` + item.id"
                          type="primary"
                          ghost
                          @click="toUsed(item)"
                        >
                          立即使用
                        </a-button>
                      </div>
                    </div>
                  </div>

                  <div
                    v-if="item.useStatus ==3"
                    class="skin-list"
                  >
                    <div class="tags-use">
                      <img
                        src="../../assets/img/timeout.png"
                        width="70px"
                      >
                    </div>
                    <div class="skin-tit">
                      <p>{{ item.themeName }}</p>
                      <div style="position: absolute; top: 0; right: 20px;">
                        <a-dropdown placement="bottomCenter">
                          <span style="cursor: pointer;">
                            <a-icon type="dash" />
                          </span>
                          <a-menu slot="overlay">
                            <a-menu-item>
                              <a
                                href="javascript:;"
                                @click="editSkin(item.id)"
                              >
                                编辑
                              </a>
                            </a-menu-item>
                            <a-menu-item
                              v-if="!item.isOpen"
                              @click="del(item)"
                            >
                              <a href="javascript:;">
                                删除
                              </a>
                            </a-menu-item>
                          </a-menu>
                        </a-dropdown>
                      </div>
                    </div>
                    <div style="position: relative;">
                      <img
                        :key="item.viewPic"
                        v-lazy="item.viewPicUrl"
                        width="100%"
                      >
                      <div
                        v-if="!item.hasDefault"
                        class="tags-date"
                      >
                        <p>应用时间：</p>
                        <p>{{ item.startTime }} ~ {{ item.endTime }}</p>
                      </div>
                    </div>
                    <div class="opts-btn">
                      <a-button
                        :id="`pre-view-` + item.id"
                        type="primary"
                        @click="toView(item)"
                      >
                        预览
                      </a-button>
                    </div>
                  </div>
                </a-list-item>
              </a-list>
            </div>
            <div style=" padding: 20px 0; text-align: right;">
              <a-pagination
                :current="ipagination.current"
                :page-size="ipagination.pageSize"
                :page-size-options="ipagination.pageSizeOptions"
                :show-total="ipagination.showTotal"
                :show-quick-jumper="ipagination.showQuickJumper"
                :show-size-changer="ipagination.showSizeChanger"
                :total="ipagination.total"
                size="small"
                @change="handleChangeData"
                @showSizeChange="handleChangeSize"
              />
            </div>
          </div>
        </div>
      </base-pane>
    </div>
    <div class="spe-model">
      <a-modal
        v-model="visible"
        centered
        title=""
        :footer="null"
        width="400px"
      >
        <div
          class="phone"
          style="width: 300px;"
        >
          <div
            class="top-phone"
            :style="{ background: params.navbarBackgroundColor }"
          >
            <div class="fix-phone">
              <div>
                {{ hours > 9 ? hours : `0`+ hours }}:{{ minutes > 9 ? minutes : `0`+ minutes }}
              </div>
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
          <div class="center-phone">
            <div class="mask-full" />
            <img
              src="../../assets/img/skinBg.png"
              width="100%"
            >
          </div>
          <div
            class="bot-phone"
            :style="{ background: params.tabbarBackgroundColor , color: params.tabbarColor }"
          >
            <div
              v-for="(item,index) in params.platformThemeIconList"
              :key="index"
              class="item-bot-icon"
              @click="selIconBar(index)"
            >
              <span>
                <img
                  :src="selIconBarIndex == index ? item.selectedIconPathUrl : item.iconPathUrl"
                  width="20"
                  height="20"
                >
              </span>
              <span
                v-if="selIconBarIndex == index"
                :style="{ color: params.tabbarSelectColor }"
              >
                {{ item.iconText }}
              </span>
              <span v-else>
                {{ item.iconText }}
              </span>
            </div>
          </div>
        </div>
      </a-modal>
    </div>
  </div>
</template>

<script>
import BasePane from '@/components/pane/BasePane'
import { tableMixins } from '@/mixins/tableMixins'
export default {
  name: 'Demo',
  components: {
    BasePane
  },
  mixins: [tableMixins],
  i18n: require('./i18n'),
  data() {
    return {
      url: {
        list: this.$Api.getThemeList
      },
      queryParam: {
        themeType: '',
        appId: ''
      },
      ipagination: {
        pageSize: 12,
        pageSizeOptions: ['12', '24', '36', '48', '60']
      },
      hours: '',
      minutes: '',
      curIndex: 1,
      delVisible: false, // 确认删除弹框
      skinList: [],
      themeTypeList: [],
      flagView: true, // 预览多次点击按钮处理
      curSkinIndex: 0,
      curSkinType: '',
      visible: false,
      selIconBarIndex: 0,
      selIconBarText: '首页',
      skinInfo: {},
      params: {}
    }
  },
  mounted() {
    // json签名模式
    this.$Http.postAction(this.$Api.signVerify, {
      'bannerName': '轮播图图片',
      'imgPath': '/data/img/banner/big/1.jpg',
      'downloadUrl': 'http://www.ygzy.com/download/132.jpg'
    }).then((res) => {
      console.log(res)
    }).catch(e => {
      console.log(e)
    })

    // formData签名模式
    this.$Http.postFormData(this.$Api.formSignVerify, {
      'bb': '22',
      'aa': '11',
      'cc': '333'
    }).then((res) => {
      console.log(res)
    }).catch(e => {
      console.log(e)
    })

    this.hours = new Date().getHours()
    this.minutes = new Date().getMinutes()
    this.getThemeType()
    this.testSecRequire() // 测试参数加密请求
    this.$refs.basePane.getAppList().then(res => {
      this.queryParam.appId = res.id
      this.loadData()
    })
  },
  methods: {
    getCurIndex(res) {
      this.queryParam.appId = res.id
      this.loadData()
    },
    // 测试参数加密请求
    testSecRequire() {
      const param = {
        appId : 2
      }
      this.$Http.postSecAction(this.$Api.encryptTest, param).then((res) => {
        console.log(res)
      }).catch(e => {
        console.log(e)
      })
    },
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
        // console.log(res)
        if (res.msgCode === this.$Common.sucCode) {
          this.params = res.result
          this.visible = true
        }
        this.$nextTick(() => {
          this.flagView = true
        })
      })
    },

    // 新增
    addSkin() {
      this.$router.push('/setting/editSkin?appId=' + this.queryParam.appId)
    },
    // 编辑
    editSkin(id) {
      this.$router.push('/setting/editSkin?id=' + id + '&appId=' + this.queryParam.appId)
    },
    // 预览
    toView(item) {
      this.selIconBarIndex = 0
      this.selIconBarText = '首页'
      // console.log(item)
      if (this.flagView) {
        this.flagView = false
        this.getThemeDetail(item.id)
      }
    },
    // 关闭预览
    toClose() {
      this.visible = false
    },
    // 删除此主题
    del(item) {
      this.$confirm({
        title: '确认删除',
        content: '确认要删除此皮肤?',
        centered: true,
        onOk: () => {
          let params = {
            id: item.id
          }
          this.$Http.postAction(this.$Api.delTheme, params).then(res => {
            if (res.msgCode === this.$Common.sucCode) {
              this.loadData()
              this.delVisible = false
            }
          })
        }
      })
    },
    // 立即使用此主题
    toUsed(item) {
      this.$confirm({
        title: '立即使用',
        content: '确认立即使用此皮肤?',
        centered: true,
        onOk: () => {
          let params = {
            id: item.id
          }
          this.$Http.postAction(this.$Api.setThemeIsUsed, params).then(res => {
            if (res.msgCode === this.$Common.sucCode) {
              this.loadData()
              this.delVisible = false
            }
          })
        }
      })
    },
    // 恢复默认主题
    toDefault(item) {
      this.$confirm({
        title: '立即失效',
        content: '确认立即失效此皮肤?',
        centered: true,
        onOk: () => {
          let params = {
            id: item.id
          }
          this.$Http.postAction(this.$Api.useDefaultTheme, params).then(res => {
            if (res.msgCode === this.$Common.sucCode) {
              this.loadData()
              this.delVisible = false
            }
          })
        }
      })
    },

    // 底部导航菜单选中显示切换效果
    selIconBar(index) {
      this.selIconBarIndex = index
      this.selIconBarText = this.params.platformThemeIconList[index].iconText
    }
  }
}
</script>

<style scoped lang="less">
    @import "index";
</style>
