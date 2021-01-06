<template>
  <div class="card-container">
    <a-tabs
      v-if="paneAppList.length"
      @change="callback"
    >
      <a-tab-pane
        v-for="(item,index) in paneAppList"
        :key="index"
        :tab="item.appTypeName"
      >
        <div
          v-if="item.appList.length"
          class="pane-cont"
        >
          <a-menu
            class="left-pane-cont"
            :default-selected-keys="[1]"
            mode="inline"
          >
            <a-menu-item
              v-for="(subItem,subIndex) in item.appList"
              :key="(subIndex + 1)"
            >
              <div
                :id="`app-name-`+subItem.id"
                @click="handleClick(item,subIndex)"
              >
                {{ subItem.appName }}
              </div>
            </a-menu-item>
          </a-menu>
          <div class="right-pane-cont">
            <slot name="rc" />
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
export default {
  name: 'Pane',
  props: {},
  data() {
    return {
      key: 0,
      curIndex: 1,
      paneAppList: [],
      appType: 0
    }
  },
  created() {
    // this.getAppList()
  },
  methods: {
    callback(key) {
      this.key = key
    },
    // 获取应用管理后台
    getAppList() {
      return new Promise((resolve) => {
        let params = {}
        this.$Http.postAction(this.$Api.getAppList, params).then(res => {
          // console.log(res)
          if (res.msgCode === this.$Common.sucCode) {
            if (res.result.length && res.result[0]) {
              this.paneAppList = res.result
              return resolve(res.result[0].appList[0])
            }
          }
        })
      })
    },
    // 点击切换应用菜单
    handleClick(item, subIndex) {
      // console.log('click ', item.appList[subIndex])
      this.curIndex = subIndex + 1
      this.$emit('change', item.appList[subIndex])
    }
  }
}
</script>

<style lang="less" scoped>
    @import "index";
</style>
