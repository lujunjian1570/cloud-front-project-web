<template>
  <div style="padding: 20px; text-align: center;">
    <div style="padding-bottom: 20px;">
      {{ desc }}
    </div>
    <base-tinymce
      :tinymce-html.sync="tinymceHtml"
    />
    <div style="padding: 20px;">
      <a-button
        type="primary"
        style="margin-right: 20px;"
        @click="saveHtml"
      >
        新增
      </a-button>
      <a-button
        type="primary"
        @click="updateCertificate"
      >
        保存修改
      </a-button>
    </div>
    <div
      style="padding: 20px;"
      v-html="tinymceHtml"
    />
    <div>
      <a-table
        :columns="columns"
        :data-source="tabData"
        :custom-row="tableClick"
        expand-row-by-click
        :row-selection="{selectedRowKeys: selectedRowKeys, onSelectAll: onSelectAll, onSelect: onSelect}"
      />
    </div>
    <!--<div
      style="padding: 20px;"
      v-html="tinymceHtml"
    />-->
    <!--    <div class="color_con" :style="{background:color, width:'20px', height:'20px' }" @click="handleShowColor"></div>-->
    <!--    <div v-show="colorShow">-->
    <!--      <photoshop-picker v-model="color" @input="updateValue" ></photoshop-picker>-->
    <!--    </div>-->

    <!--    <div style="margin:20px">-->
    <!--      <div class="clearfix">-->
    <!--        <a-upload-->
    <!--                action="adminApi/ftpFile/uploadFile.do"-->
    <!--                list-type="picture-card"-->
    <!--                :withCredentials=true-->
    <!--                :data = upParams-->
    <!--                :file-list="fileList"-->
    <!--                @preview="handlePreview"-->
    <!--                @change="handleChange"-->
    <!--        >-->
    <!--          <div v-if="fileList.length < 8">-->
    <!--            <a-icon type="plus" />-->
    <!--            <div class="ant-upload-text">-->
    <!--              Upload-->
    <!--            </div>-->
    <!--          </div>-->
    <!--        </a-upload>-->
    <!--        <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">-->
    <!--          <img alt="example" style="width: 100%" :src="previewImage" />-->
    <!--        </a-modal>-->
    <!--      </div>-->
    <!--    </div>-->

    <!--    <div style="margin:20px">-->
    <!--&lt;!&ndash;      <a-upload&ndash;&gt;-->

    <!--&lt;!&ndash;              list-type="picture-card"&ndash;&gt;-->
    <!--&lt;!&ndash;              class="avatar-uploader"&ndash;&gt;-->
    <!--&lt;!&ndash;              :show-upload-list="false"&ndash;&gt;-->
    <!--&lt;!&ndash;              action="adminApi/ftpFile/uploadFile.do"&ndash;&gt;-->
    <!--&lt;!&ndash;              :data = upParams&ndash;&gt;-->
    <!--&lt;!&ndash;              :before-upload="beforeUpload"&ndash;&gt;-->
    <!--&lt;!&ndash;              @change="handleChangeFile"&ndash;&gt;-->
    <!--&lt;!&ndash;      >&ndash;&gt;-->
    <!--&lt;!&ndash;        <img v-if="imageUrl" :src="imageUrl" alt="avatar" />&ndash;&gt;-->
    <!--&lt;!&ndash;        <div v-else>&ndash;&gt;-->
    <!--&lt;!&ndash;          <a-icon :type="loading ? 'loading' : 'plus'" />&ndash;&gt;-->
    <!--&lt;!&ndash;          <div class="ant-upload-text">&ndash;&gt;-->
    <!--&lt;!&ndash;            Upload&ndash;&gt;-->
    <!--&lt;!&ndash;          </div>&ndash;&gt;-->
    <!--&lt;!&ndash;        </div>&ndash;&gt;-->
    <!--&lt;!&ndash;      </a-upload>&ndash;&gt;-->

    <!--      <a-upload-->

    <!--              list-type="picture-card"-->
    <!--              class="avatar-uploader"-->
    <!--              :show-upload-list="false"-->
    <!--              :before-upload="beforeUpload"-->
    <!--              :customRequest="customRequest"-->
    <!--              @change="handleChangeFile"-->
    <!--      >-->
    <!--        <img v-if="imageUrl" :src="imageUrl" alt="avatar" />-->
    <!--        <div v-else>-->
    <!--          <a-icon :type="loading ? 'loading' : 'plus'" />-->
    <!--          <div class="ant-upload-text">-->
    <!--            Upload-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </a-upload>-->
    <!--      &lt;!&ndash; modal &ndash;&gt;-->
    <!--      <cropper-modal ref="cropperModal" @ok="handleCropperSuccess"></cropper-modal>-->

    <!--    </div>-->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BaseTinymce from '@/components/tinymce/BaseTinymce'
// import {uploadFileImg} from '@/services/user'
// import {Photoshop } from 'vue-color'
// import cropperModal from "../../components/cropperModal/cropperModal"

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}
function fileToBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
export default {
  name: 'Demo',
  components: {
    BaseTinymce
    // 'photoshop-picker': Photoshop ,
    // cropperModal
  },
  i18n: require('./i18n'),
  props: {
    // 图片裁切配置
    options: {
      type: Object,
      default: function() {
        return {
          autoCropWidth: 200,
          autoCropHeight: 200
        }
      }
    }
  },

  data() {
    return {
      tinymceHtml:'',
      id:'',
      color: '#df1234',
      selectedRowKeys:[],
      columns: [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
          width: '12%',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          width: '30%',
          key: 'address',
        },
      ],

      tabData: [
        {
          key: 1,
          name: 'John Brown sr.',
          age: 60,
          address: 'New York No. 1 Lake Park',
          children: [
            {
              key: 11,
              name: 'John Brown',
              age: 42,
              address: 'New York No. 2 Lake Park',
            },
            {
              key: 12,
              name: 'John Brown jr.',
              age: 30,
              address: 'New York No. 3 Lake Park',
              children: [
                {
                  key: 121,
                  name: 'Jimmy Brown',
                  age: 16,
                  address: 'New York No. 3 Lake Park',
                },
              ],
            },
            {
              key: 13,
              name: 'Jim Green sr.',
              age: 72,
              address: 'London No. 1 Lake Park',
              children: [
                {
                  key: 131,
                  name: 'Jim Green',
                  age: 42,
                  address: 'London No. 2 Lake Park',
                  children: [
                    {
                      key: 1311,
                      name: 'Jim Green jr.',
                      age: 25,
                      address: 'London No. 3 Lake Park',
                    },
                    {
                      key: 1312,
                      name: 'Jimmy Green sr.',
                      age: 18,
                      address: 'London No. 4 Lake Park',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          key: 2,
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
        },
      ],
      expandRowByClick:false,
      // 颜色选择器
      colorShow: false,
      // actionUrl: '/adminApi/ftpFile/uploadFile.do',
      colors: {},
      upParams: {
        fileType: 'imageFile'
      },
      loading: false,
      imageUrl: '',
      previewVisible: false,
      previewImage: '',
      fileList: [
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        },
        {
          uid: '-2',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        },
        {
          uid: '-3',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        },
        {
          uid: '-4',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        },
        {
          uid: '-5',
          name: 'image.png',
          status: 'error'
        }
      ]
    }
  },
  computed: {
    ...mapState('setting', ['pageMinHeight']),
    desc() {
      return this.$t('description')
    }
  },
  created() {
    this.getCertificateList()
    console.log(process.env.VUE_APP_API_BASE_URL)
    // this.actionUrl ='adminApi/ftpFile/uploadFile.do'
  },
  methods: {
    // 获取富文本列表
    getCertificateList() {
      let params = {
        'pageNo': 1,
        'pageSize': 10
      }
      this.$Http.postAction(this.$Api.getCertificateList, params).then((res) => {
        console.log(res)
        if(res.result.records.length) {
          this.id = res.result.records[2].id
          this.getCertificateDetail()
        }
      })
    },
    // 获取富文本详情
    getCertificateDetail() {
      let params = {
        'id': this.id
      }
      this.$Http.postAction(this.$Api.getCertificateDetail, params).then((res) => {
        console.log(res)
        this.tinymceHtml = res.result.certificateName
      })
    },
    // 保存富文本信息
    saveHtml() {
      let params = {
        'certificateName': this.tinymceHtml
      }
      this.$Http.postAction(this.$Api.saveCertificate, params).then((res) => {
        console.log(res)
      })
    },
    // 修改富文本信息
    updateCertificate() {
      let params = {
        'certificateName': this.tinymceHtml,
        'id': this.id
      }
      this.$Http.postAction(this.$Api.updateCertificate, params).then((res) => {
        console.log(res)
      })
    },
    onSelectAll(selected) {
      if (selected) {
        const tabData = this.tabData
        const arr = []
        setVal(tabData, arr)
        this.selectedRowKeys = arr
      } else {
        this.selectedRowKeys = []
      }
      function setVal(list, arr) {
        list.forEach(v => {
          arr.push(v.key)
          if (v.children) {
            setVal(v.children, arr)
          }
        })
      }
    },

    onSelect(record, selected) {
      const _self = this
      const set = new Set(this.selectedRowKeys)
      const tabData = this.tabData
      const key = record.key
      if (selected) {
        set.add(key)
        record.children && setChildCheck(record.children)
        setParentCheck(key)
      } else {
        set.delete(key)
        record.children && setChildUncheck(record.children)
        setParentUncheck(key)
      }

      this.selectedRowKeys = Array.from(set)
      // 设置父级选择
      function setParentCheck(key) {
        let parent = getParent(key)
        if (parent) {
          // 判断子级全选，父级也选中
          let childlist = parent.children
          if(_self.$Common.isContained(Array.from(set),childlist.map((item) => {return item.key}))) {
            set.add(parent.key)
            setParentCheck(parent.key)
          }
        }
      }
      // 设置父级取消，如果父级的子集有选择，则不取消
      function setParentUncheck(key) {
        let childHasCheck = false,
          parent = getParent(key)
        if (parent) {
          // 子级取消选择，父级也跟着取消
          set.delete(parent.key)
          setParentUncheck(parent.key)
          let childlist = parent.children
          childlist.forEach(function(v) {
            if (set.has(v.key)) {
              childHasCheck = true
            }
          })
          if (!childHasCheck) {
            set.delete(parent.key)
            setParentUncheck(parent.key)
          }
        }
      }
      // 获取当前对象的父级
      function getParent(key) {
        for (let i = 0; i < tabData.length; i++) {
          if (tabData[i].key === key) {
            return null
          }
        }
        return _getParent(tabData)
        function _getParent(list) {
          let childlist,
            isExist = false
          for (let i = 0; i < list.length; i++) {
            if ((childlist = list[i].children)) {
              childlist.forEach(function(v) {
                if (v.key === key) {
                  isExist = true
                }
              })
              if (isExist) {
                return list[i]
              }
              if (_getParent(childlist)) {
                return _getParent(childlist)
              }
            }
          }
        }
      }
      // 设置child全选
      function setChildCheck(list) {
        list.forEach(function(v) {
          set.add(v.key)
          v.children && setChildCheck(v.children)
        })
      }
      // 设置child取消
      function setChildUncheck(list) {
        list.forEach(function(v) {
          set.delete(v.key)
          v.children && setChildUncheck(v.children)
        })
      }
    },

    /** 点击a-table中的行后，展开或关闭其子行 */
    tableClick(record, index) {
      return {
        style:{
          cursor:'pointer',
        },
        on: {
          click: () => {
            console.log(record,index)
            this.expandRowByClick = !this.expandRowByClick
          }
        }
      }
    },
    // 颜色选择器
    handleShowColor() {
      this.colorShow = !this.colorShow
    },
    updateValue(val) {
      console.log('颜色选择', val)
      this.color = val.hex
      //  this.colorShow = !this.colorShow
    },
    handleCancel() {
      this.previewVisible = false
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      this.previewImage = file.url || file.preview
      this.previewVisible = true
    },
    handleChange({ fileList }) {
      this.fileList = fileList
    },
    handleChangeFile(info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        // getBase64(info.file.originFileObj, imageUrl => {
        //   this.imageUrl = imageUrl;
        //   this.loading = false;
        // });
        console.log(info.file)
        if (info.file.response.msgCode == '10000') {
          this.imageUrl = info.file.response.result.filePath
        }

        // console.log(info.file.originFileOb)
      }
    },
    customRequest(info) {
      const { options } = this
      console.log('info:', info)
      fileToBase64(info.file, imageUrl => {
        // this.imageUrl = imageUrl;
        // console.log('this.imageUrl：',this.imageUrl)
        this.loading = false
        const target = Object.assign({}, options, {
          img: imageUrl
        })
        this.$refs['cropperModal'].edit(target)
      })
    },

    // 裁剪成功后的File对象
    // handleCropperSuccess(data){
    //   console.log('File:',data);
    //   //进行图片上传动作
    //   this.loading = true
    //   var parms = {
    //     fileType : 'imageFile',
    //     fileStr : data
    //   }
    //   uploadFileImg(parms).then(res => {
    //     console.log(res)
    //     this.imageUrl = res.data.result.fileUrl
    //   //  this.$message.success('上传成功')
    //     this.$emit('ok')
    //     this.loading= false;
    //   }).catch(() => {
    //     // Do something
    //   }).finally(() => {
    //     this.loading = false
    //   })
    //
    // },

    beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        this.$message.error('You can only upload JPG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!')
      }
      return isJpgOrPng && isLt2M
    }
  }
}
</script>

<style scoped lang="less">
@import "index";
.avatar-uploader > .ant-upload{
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i{
  color: #999;
  font-size: 32px;
}
.ant-upload-select-picture-card .ant-upload-text{
  margin-top: 8px;
  color: #666;
}
</style>
