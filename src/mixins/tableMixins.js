export const tableMixins = {
  data() {
    return {
      // 查询条件
      queryParam: {},
      // 数据源
      dataSource: [],
      // 分页参数
      ipagination: {
        current: 1,
        pageSize: 10,
        pageSizeOptions: ['10', '20', '30', '40', '50'],
        showTotal: (total, range) => {
          return range[0] + '-' + range[1] + ' 共' + total + '条'
        },
        showQuickJumper: true,
        showSizeChanger: true,
        total: 0
      },
      // 排序参数
      isorter: {
        // column: '',
        // order: '',
      },
      // 筛选参数
      filters: {},
      // table加载状态
      loading: false,
      // table选中keys
      selectedRowKeys: [],
      // table选中records
      selectionRows: []
    }
  },
  // created() {
  //   this.loadData()
  // },
  methods: {
    // 加载数据
    loadData(arg) {
      // 若传入参数1则加载第一页的内容
      if (arg === 1) {
        this.ipagination.current = 1
      }
      // 查询条件
      const params = this.getQueryParams()
      this.loading = true
      this.$Http.postAction(this.url.list, params).then((res) => {
        if (res.msgCode === this.$Common.sucCode) {
          this.dataSource = res.result.records
          this.ipagination.total = res.result.total
        }
        this.loading = false
      })
    },
    // 获取查询条件
    getQueryParams() {
      const param = Object.assign({}, this.queryParam, this.isorter, this.filters)
      param.pageNo = this.ipagination.current
      param.pageSize = this.ipagination.pageSize
      return this.$Common.filterObj(param)
    },
    // 查询数据
    searchQuery() {
      this.loadData(1)
    },
    // 重置
    searchReset() {
      this.queryParam = {}
      this.loadData(1)
    },
    // 分页变化时触发
    handleTableChange(pagination, filters, sorter) {
      // 分页、筛选、排序变化时触发
      // TODO 筛选
      if (Object.keys(sorter).length > 0) {
        this.isorter.column = sorter.field
        this.isorter.order = sorter.order == 'ascend' ? 'asc' : 'desc'
      }
      this.ipagination = pagination
      this.loadData()
    },

    // 除table外的特殊列表，点击分页获取信息
    handleChangeData(page, pageSize) {
      // console.log(page,':',pageSize)
      this.ipagination.current = page
      this.ipagination.pageSize = pageSize
      this.loadData()
    },
    // 除table外的特殊列表，获取页码条数更改
    handleChangeSize(current, size) {
      // console.log(current, '  : ',size)
      this.ipagination.current = current
      this.ipagination.pageSize = size
      this.loadData()
    },
    // 选中项发生变化时的回调
    onSelectChange(selectedRowKeys, selectionRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectionRows = selectionRows
    },
    // 清空选中
    onClearSelected() {
      this.selectedRowKeys = []
      this.selectionRows = []
    },
    // 删除
    handleDelete(id) {
      this.$Http.postAction(this.url.delete, { ids: id }).then((res) => {
        if (res.msgCode === this.$Common.sucCode) {
          this.$message.success('删除成功')
          this.loadData()
          this.onClearSelected()
        }
      })
    },
    // 批量删除
    batchDel() {
      if (this.selectedRowKeys.length <= 0) {
        this.$message.warning('请选择一条记录！')
        return
      } else {
        let ids = ''
        for (let a = 0; a < this.selectedRowKeys.length; a++) {
          ids += this.selectedRowKeys[a] + ','
        }
        const that = this
        this.$confirm({
          title: '确认删除',
          content: '是否删除选中数据?',
          centered: true,
          // okText: '确认',
          // cancelText: '取消',
          onOk: function() {
            that.loading = true
            that.$Http.postAction(that.url.delete, { ids: ids }).then((res) => {
              if (res.msgCode === this.$Common.sucCode) {
                that.$message.success('删除成功')
                that.loadData()
                that.onClearSelected()
              }
            }).finally(() => {
              that.loading = false
            })
          }
        })
      }
    }
  }

}
