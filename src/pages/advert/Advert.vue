<template>
  <div class="common-page">
    <div>
      <base-pane @change="getCurIndex">
        <div slot="rc">
          <a-card :bordered="false">
            <!-- 查询区域 -->
            <div class="table-page-search-wrapper">
              <a-form
                layout="inline"
                class="table-page-search-wrapper"
              >
                <a-row :gutter="24">
                  <a-col :span="6">
                    <a-form-item label="广告名称">
                      <a-input placeholder="请输入广告名称" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="6">
                    <a-form-item label="广告位置">
                      <a-select
                        placeholder="请选择"
                        default-value="0"
                      >
                        <a-select-option value="0">
                          全部
                        </a-select-option>
                        <a-select-option value="1">
                          引导页
                        </a-select-option>
                        <a-select-option value="2">
                          信息流
                        </a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <a-col :span="6">
                    <a-form-item label="投放时间">
                      <a-date-picker
                        style="width: 100%;"
                        placeholder="请选择投放时间"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="6">
                    <span
                      style="float: left; overflow: hidden;"
                      class="table-page-search-submitButtons"
                    >
                      <a-button
                        type="primary"
                        icon="search"
                        @click="searchQuery"
                      >查询</a-button>
                      <a-button
                        icon="reload"
                        style="margin-left: 16px;"
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
                type="primary"
                icon="plus"
                @click="handleAdd"
              >
                新增
              </a-button>
            </div>

            <a-table
              bordered
              :data-source="dataSource"
              :columns="columns"
              row-key="id"
            >
              <template
                slot="position"
                slot-scope="text"
              >
                <span>{{ text == 0 ? '引导页' : '信息流' }}</span>
              </template>
              <template
                slot="img"
                slot-scope="text, record"
              >
                <img
                  :src="record.img"
                  alt
                  style="height: 100px;"
                >
              </template>
              <template
                slot="status"
                slot-scope="text"
              >
                <span>{{ text == 0 ? '上架中' : '已下架' }}</span>
              </template>
              <template
                slot="action"
                slot-scope="text, record"
              >
                <a @click="handleEdit(record)">编辑</a>
                <a-divider type="vertical" />
                <a-dropdown>
                  <a class="ant-dropdown-link">
                    更多
                    <a-icon type="down" />
                  </a>
                  <a-menu slot="overlay">
                    <a-menu-item>
                      <a @click="handleDetail(record)">详情</a>
                    </a-menu-item>
                    <a-menu-item>
                      <a @click="handleShelf(record)">上架</a>
                    </a-menu-item>
                    <a-menu-item>
                      <a-popconfirm
                        title="确定删除吗?"
                        @confirm="() => handleDelete(record.id)"
                      >
                        <a>删除</a>
                      </a-popconfirm>
                    </a-menu-item>
                  </a-menu>
                </a-dropdown>
              </template>
            </a-table>
          </a-card>
        </div>
      </base-pane>
    </div>
  </div>
</template>

<script>
import BasePane from '@/components/pane/BasePane'

export default {
  name: 'Advert',
  components: {
    BasePane
  },
  data() {
    return {
      queryParam: {},
      curIndex: 1,
      // 表头
      columns: [
        {
          title: '广告位置',
          align: 'center',
          dataIndex: 'position',
          scopedSlots: { customRender: 'position' }
        },
        {
          title: '广告名称',
          align: 'center',
          dataIndex: 'title'
        },
        {
          title: '图片',
          align: 'center',
          dataIndex: 'img',
          scopedSlots: { customRender: 'img' }
        },
        {
          title: '投放人',
          align: 'center',
          dataIndex: 'name'
        },
        {
          title: '投放开始时间',
          align: 'center',
          dataIndex: 'beginDate'
        },
        {
          title: '投放截止时间',
          align: 'center',
          dataIndex: 'endDate'
        },
        {
          title: '状态',
          align: 'center',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],
      dataSource: [
        {
          key: '1',
          position: 0,
          title: 'title',
          img:
            'https://t7.baidu.com/it/u=3616242789,1098670747&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1600861467&t=3672bb86c3c3afb106976ade4b344968',
          name: 'John Brown',
          beginDate: '2020-09-09',
          endDate: '2020-09-09',
          status: 0
        },
        {
          key: '2',
          position: 1,
          title: 'title2',
          img:
            'https://t7.baidu.com/it/u=3616242789,1098670747&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1600861467&t=3672bb86c3c3afb106976ade4b344968',
          name: 'John',
          beginDate: '2020-09-09',
          endDate: '2020-09-09',
          status: 1
        }
      ]
    }
  },
  mounted() {
    console.log(process.env.VUE_APP_API_BASE_URL)
  },
  methods: {
    getCurIndex(res) {
      console.log('res ', res)
      this.curIndex = res
    }
  }
}
</script>

<style scoped lang="less">
::v-deep .ant-row{
  margin-left: -6px;
}
</style>
