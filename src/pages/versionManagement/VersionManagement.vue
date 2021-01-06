<template>
  <div class="common-page">
    <div class="version-management">
      <base-pane
        ref="basePane"
        @change="getCurIndex"
      >
        <div slot="rc">
          <a-card :bordered="false">
            <!-- 查询区域 -->
            <div class="table-page-search-wrapper">
              <a-form
                layout="inline"
                class="table-page-search-wrapper"
              >
                <a-row :gutter="24">
                  <a-col
                    :xxl="6"
                    :lg="8"
                    :md="12"
                    :sm="24"
                  >
                    <a-form-item label="版本号">
                      <a-input
                        id="version-id"
                        v-model="queryParam.version"
                        placeholder="请输入版本号"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col
                    :xxl="6"
                    :lg="8"
                    :md="12"
                    :sm="24"
                  >
                    <a-form-item label="平台类型">
                      <a-select
                        id="version-type"
                        v-model="queryParam.terminalType"
                        placeholder="请选择"
                        default-value="02"
                      >
                        <a-select-option value="">
                          请选择
                        </a-select-option>
                        <a-select-option value="02">
                          android
                        </a-select-option>
                        <a-select-option value="01">
                          ios
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
                    <span
                      style="float: left; overflow: hidden;"
                      class="table-page-search-submitButtons"
                    >
                      <a-button
                        id="search-query"
                        type="primary"
                        icon="search"
                        @click="searchQuery"
                      >查询</a-button>
                      <a-button
                        id="search-reset"
                        icon="reload"
                        style="margin-left: 8px;"
                        @click="searchReset"
                      >重置</a-button>
                    </span>
                  </a-col>
                </a-row>
              </a-form>
            </div>
            <!-- 操作按钮区域 -->
            <div class="table-operator">
              <a-button
                id="add"
                type="primary"
                icon="plus"
                @click="handleAdd"
              >
                新增
              </a-button>
              <a-button
                v-if="selectedRowKeys.length > 0"
                id="delete-batch"
                ghost
                type="primary"
                icon="delete"
                @click="batchDel"
              >
                批量删除
              </a-button>
            </div>
            <!--<a-radio-group v-model="queryParam.terminalType" @change="aRadioGroupOnChange">
              <a-radio-button value="">
                全部
              </a-radio-button>
              <a-radio-button value="Android">
                Android
              </a-radio-button>
              <a-radio-button value="IOS">
                IOS
              </a-radio-button>
            </a-radio-group>-->
            <a-table
              id="a-table"
              bordered
              size="middle"
              :row-class-name="(record)=>{return 'tr-' + record.id}"
              :data-source="dataSource"
              :columns="columns"
              :row-key="(record)=>{return 'tr-' + record.id}"
              :pagination="ipagination"
              :loading="loading"
              :row-selection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
              @change="handleTableChange"
            >
              <!--<div slot="expandedRowRender" slot-scope="record" class="div-url">
                <p>审核服务器地址：{{ record.testServer }}</p>
                <p>生产服务器地址：{{ record.prodServer }}</p>
                <p>APP下载地址：{{ record.downloadUrl }}</p>
              </div>-->

              <template
                slot="remark"
                slot-scope="text"
              >
                <base-ellipsis
                  :value="text"
                  :length="20"
                />
              </template>
              <span
                slot="onlineTimeOver"
                slot-scope="text"
                class="status-active"
                :class="{'status-default' : text}"
              >
                {{ text ? '已上线' : '未上线' }}
              </span>
              <template
                slot="action"
                slot-scope="text, record"
              >
                <a
                  :id="`edit-`+record.id"
                  @click="handleEdit(record)"
                >编辑</a>
                <a-divider type="vertical" />
                <a-popconfirm
                  title="确定删除吗?"
                  @confirm="() => handleDelete(record.id)"
                >
                  <span
                    :id="`popconfirm-cancel-${record.id}`"
                    slot="cancelText"
                  >取消</span>
                  <span
                    :id="`popconfirm-ok-${record.id}`"
                    slot="okText"
                  >确定</span>
                  <a :id="`del-`+record.id">删除</a>
                </a-popconfirm>
                <!--<a-dropdown>
                  <a class="ant-dropdown-link">
                    更多
                    <a-icon type="down" />
                  </a>
                  <a-menu slot="overlay">
                    <a-menu-item>
                      <a @click="handleDetail(record)">详情</a>
                    </a-menu-item>
                    <a-menu-item>
                      <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                        <a>删除</a>
                      </a-popconfirm>
                    </a-menu-item>
                  </a-menu>
                </a-dropdown>-->
              </template>
            </a-table>
          </a-card>
        </div>
      </base-pane>
    </div>
    <a-modal
      v-if="modalVisible"
      v-model="modalVisible"
      :title="modalTitle"
      :width="800"
      centered
      :ok-button-props="{ props: { disabled: isOperate } }"
      @ok="handleOk"
    >
      <span
        id="modal-cancel"
        slot="cancelText"
      >取消</span>
      <span
        id="modal-ok"
        slot="okText"
      >确定</span>
      <a-form-model
        ref="ruleForm"
        :model="params"
        :rules="rules"
      >
        <a-row style="width: 100%;">
          <a-col :span="24/2">
            <a-form-model-item
              label="平台类型"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
              prop="terminalType"
              required
            >
              <a-radio-group
                id="terminalType"
                v-model="params.terminalType"
                :disabled="isDisabled"
              >
                <a-radio value="02">
                  Android
                </a-radio>
                <a-radio value="01">
                  IOS
                </a-radio>
              </a-radio-group>
            </a-form-model-item>
          </a-col>
          <a-col :span="24/2">
            <a-form-model-item
              label="版本号"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
              prop="version"
            >
              <a-input
                id="version"
                v-model="params.version"
                placeholder="请输入版本号"
              />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row style="width: 100%;">
          <a-col :span="24">
            <a-form-model-item
              label="审核服务器地址"
              :label-col="labelColX1"
              :wrapper-col="wrapperColX1"
              prop="testServer"
            >
              <a-input
                id="testServer"
                v-model="params.testServer"
                placeholder="请输入审核服务器地址"
              />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row style="width: 100%;">
          <a-col :span="24">
            <a-form-model-item
              label="生产服务器地址"
              :label-col="labelColX1"
              :wrapper-col="wrapperColX1"
              prop="prodServer"
            >
              <a-input
                id="prodServer"
                v-model="params.prodServer"
                placeholder="请输入生产服务器地址"
              />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row style="width: 100%;">
          <a-col :span="24">
            <a-form-model-item
              label="版本说明"
              :label-col="labelColX1"
              :wrapper-col="wrapperColX1"
              prop="remark"
            >
              <a-textarea
                id="remark"
                v-model="params.remark"
                :rows="5"
                placeholder="请输入版本说明"
              />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row style="width: 100%;">
          <a-col :span="24/2">
            <a-form-model-item
              label="更新方式"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
              required
            >
              <a-radio-group
                id="upgradeType"
                v-model="params.upgradeType"
                :disabled="isDisabled"
                @change="radioOnChange"
              >
                <a-radio :value="1">
                  整包更新
                </a-radio>
                <a-radio :value="2">
                  热更新
                </a-radio>
              </a-radio-group>
            </a-form-model-item>
          </a-col>
          <a-col :span="24/2">
            <a-form-model-item
              label="是否强制更新"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
              required
            >
              <a-radio-group
                id="hasForceUpdate"
                v-model="params.hasForceUpdate"
              >
                <a-radio :value="true">
                  是
                </a-radio>
                <a-radio :value="false">
                  否
                </a-radio>
              </a-radio-group>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row style="width: 100%;">
          <a-col :span="24">
            <a-form-model-item
              :label="textInfo"
              :label-col="labelColX1"
              :wrapper-col="wrapperColX1"
              prop="downloadUrl"
            >
              <a-input
                id="downloadUrl"
                v-model="params.downloadUrl"
                :placeholder="'请输入'+textInfo"
              />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row style="width: 100%;">
          <a-col :span="24/2">
            <a-form-model-item
              v-if="isShowUpload"
              label="上传更新包"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
            >
              <a-upload
                name="file"
                :data="{fileType:'zipFile'}"
                :file-list="fileList"
                :accept="acceptType"
                :action="actionUrl"
                :before-upload="beforeUpload"
                @change="handleChange"
              >
                <a-button
                  id="uploadFile"
                  type="primary"
                >
                  <a-icon type="upload" />上传文件
                </a-button>
              </a-upload>
            </a-form-model-item>
          </a-col>
          <a-col :span="24/2">
            <a-form-model-item
              label="上线时间"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
              prop="onlineTime"
            >
              <a-date-picker
                id="onlineTime"
                v-model="params.onlineTime"
                style="width: 100%;"
                placeholder="请选择上线时间"
                show-time
              />
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import { tableMixins } from '@/mixins/tableMixins'
import BasePane from '@/components/pane/BasePane'
import moment from 'moment'
import BaseEllipsis from '@/components/ellipsis/BaseEllipsis'

export default {
  name: 'VersionManagement',
  components: {
    BasePane,
    BaseEllipsis
  },
  mixins: [tableMixins],
  data() {
    const validatorUrl = (rule, value, callback) => {
      if (/^(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]$/.test(value)) {
        callback()
      } else {
        if (rule.field === 'downloadUrl' && !value) {
          return callback(new Error(`请输入${this.textInfo}`))
        }
        return callback(new Error('请输入正确的URL地址'))
      }
    }
    return {
      actionUrl: this.$Api.uploadFile,
      url: {
        list: this.$Api.getAppUpdateList,
        delete: this.$Api.deleteAppUpdate
      },
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      labelColX1: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperColX1: {
        xs: { span: 24 },
        sm: { span: 20 }
      },
      modalVisible: false,
      modalTitle: '',
      queryParam: {
        version: '',
        terminalType: ''
      },
      // 表头
      columns: [
        /* {
          title: "创建时间",
          align: "center",
          dataIndex: "createTime",
        },*/
        /* {
          title: '#',
          dataIndex: '',
          key: 'rowIndex',
          width: 60,
          align: "center",
          customRender: function (t, r, index) {
            return parseInt(index) + 1;
          }
        },*/
        {
          title: '平台类型',
          align: 'center',
          dataIndex: 'terminalType',
          customRender: function(text) {
            // 01:ios;02:android;03:pad;04:web
            if (text === '01') {
              return 'IOS'
            } else if (text === '02') {
              return 'Android'
            } else if (text === '03') {
              return 'Pad'
            } else if (text === '04') {
              return 'Web'
            } else {
              return '其他'
            }
          }
        },
        {
          title: '版本号',
          align: 'center',
          dataIndex: 'version'
          // sorter: true,
        },
        {
          title: '更新方式',
          align: 'center',
          dataIndex: 'upgradeType',
          customRender: function(text) {
            return text === 1 ? '整包更新' : '热更新'
          }
        },
        {
          title: '是否强制更新',
          align: 'center',
          dataIndex: 'hasForceUpdate',
          customRender: function(text) {
            return text ? '是' : '否'
          }
        },
        {
          title: '版本说明',
          dataIndex: 'remark',
          scopedSlots: { customRender: 'remark' }
        },
        /* {
                        title: '审核服务器地址',
                        align: "center",
                        dataIndex: 'testServer'
                    },
                    {
                        title: '生产服务器地址',
                        align: "center",
                        dataIndex: 'prodServer'
                    },
                    {
                        title: 'APP下载地址',
                        align: "center",
                        dataIndex: 'downloadUrl'
                    },*/
        {
          title: '上线时间',
          align: 'center',
          dataIndex: 'onlineTime'
          // sorter: true,
        },
        {
          title: '是否上线',
          align: 'center',
          dataIndex: 'onlineTimeOver',
          scopedSlots: { customRender: 'onlineTimeOver' }
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          width: 100,
          scopedSlots: { customRender: 'action' }
        }
      ],
      params: {
        appId: '',
        id: '',
        terminalType: '02',
        version: '',
        upgradeType: 1,
        hasForceUpdate: true,
        remark: '',
        testServer: '',
        prodServer: '',
        downloadUrl: '',
        fileId: '',
        onlineTime: null
      },
      rules: {
        version: [
          /* 验证版本号的正则表达式，
          要求，必须是三位，x.x.x的形式，
          每位x的范围分别为1-99,0-99,0-99。
          不允许的情况0.x.x；01.x.x; x.0x.x; x.00.x； x.x.00; x.x.0x*/
          { required: true, message: '请输入版本号' },
          {
            pattern: /^([1-9]\d|[1-9])(\.([1-9]\d|\d)){2}$/,
            message: '请输入正确的版本号'
          }
        ],
        remark: [
          { required: true, message: '请输入版本说明' }
        ],
        testServer: [
          { required: true, message: '请输入审核服务器地址' },
          {
            validator: validatorUrl
          }
        ],
        prodServer: [
          { required: true, message: '请输入生产服务器地址' },
          {
            validator: validatorUrl
          }
        ],
        downloadUrl: [
          {
            required: true,
            validator: validatorUrl
          }
        ],
        onlineTime: [
          { required: true, message: '请选择上线时间' }
        ]
      },
      fileList: [],
      isOperate: false
    }
  },
  computed: {
    isShowUpload() {
      return this.params.terminalType === '02' || this.params.upgradeType === 2
    },
    textInfo() {
      if (this.params.upgradeType === 2) { // 热更新
        return '热更新下载地址'
      } else {
        return this.params.terminalType === '02' ? 'APP下载地址' : 'ios下载地址'
      }
    },
    acceptType() {
      if (this.params.upgradeType === 2) { // 热更新
        return '.zip,.wgt'
      } else {
        return '.apk'
      }
    },
    isDisabled() {
      return this.modalTitle === '编辑'
    }
  },
  mounted() {
    // console.log()
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
    // 更新方式切换事件
    radioOnChange() {
      this.$refs['ruleForm'].clearValidate('downloadUrl')
    },
    // 新增
    handleAdd() {
      this.modalTitle = '新增'
      this.modalVisible = true
      this.isOperate = false
      this.params = {
        appId: this.queryParam.appId,
        id: '',
        terminalType: '02',
        version: '',
        upgradeType: 1,
        hasForceUpdate: true,
        remark: '',
        testServer: '',
        prodServer: '',
        downloadUrl: '',
        onlineTime: null
      }
      this.fileList = []
    },
    // 编辑
    handleEdit(d) {
      this.modalTitle = '编辑'
      this.modalVisible = true
      this.isOperate = false
      this.params = Object.assign({}, d, {
        onlineTime: moment(d.onlineTime, 'YYYY-MM-DD HH:mm:ss')
      })
      this.fileList = [{
        uid: '-1',
        name: this.$Common.getLastStr(d.downloadUrl),
        status: 'done',
        url: d.downloadUrl
      }]
    },
    // 查看详情
    handleDetail(d) {
      this.modalTitle = '详情'
      this.modalVisible = true
      this.isOperate = true
      this.params = Object.assign({}, d, {
        onlineTime: moment(d.onlineTime, 'YYYY-MM-DD HH:mm:ss')
      })
      this.fileList = [{
        uid: '-1',
        name: this.$Common.getLastStr(d.downloadUrl),
        status: 'done',
        url: d.downloadUrl
      }]
    },
    // 保存
    handleOk() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          const data = Object.assign({}, this.params, {
            onlineTime: moment(this.params.onlineTime).format('YYYY-MM-DD HH:mm:ss')
          })
          this.$Http.postAction(this.$Api.saveAppUpdate, data).then((res) => {
            if (res.msgCode === this.$Common.sucCode) {
              this.$message.success('保存成功')
              this.modalVisible = false
              this.loadData()
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    beforeUpload(file) {
      return new Promise((resolve, reject) => {
        const fileSuffix = file.name.substring(file.name.lastIndexOf('.') + 1)

        const isApk = ['apk'].indexOf(fileSuffix) === -1
        if (this.params.terminalType === '02' && this.params.upgradeType === 1 && isApk) {
          this.$message.error('只能上传apk文件')
          return reject(false)
        }

        const isZip = ['zip', 'wgt'].indexOf(fileSuffix) === -1
        if (this.params.upgradeType === 2 && isZip) {
          this.$message.error('只能上传zip或wgt文件')
          return reject(false)
        }

        return resolve(true)
      })
    },
    handleChange(info) {
      console.log(info)
      const file = info.file
      let fileList = [...info.fileList]
      if (file.status === 'error') {
        this.$message.error('上传失败，请重试')
        this.fileList = []
        return false
      }
      if (file.status === 'done' && file.response && file.response.msgCode !== this.$Common.sucCode) {
        this.$message.error(fileList[0].response.msgInfo)
        this.fileList = []
        return false
      }
      fileList = fileList.slice(-1)
      fileList = fileList.map(file => {
        if (file.response) {
          file.url = file.response.result.fileUrl
          file.fileId = file.response.result.id
        }
        return file
      })
      this.fileList = fileList
      if (fileList.length > 0) {
        this.params = Object.assign({}, this.params, {
          downloadUrl: fileList[0].url,
          fileId: fileList[0].fileId
        })
        this.$refs['ruleForm'].clearValidate('downloadUrl')
      } else {
        this.params = Object.assign({}, this.params, {
          downloadUrl: '',
          fileId: ''
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
::v-deep .version-management{
  .ant-tabs-bar{
    display: none;
  }
}
</style>
