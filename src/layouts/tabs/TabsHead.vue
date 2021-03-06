<template>
  <div :class="['tabs-head', layout, pageWidth]">
    <a-tabs
      type="editable-card"
      :class="['tabs-container', layout, pageWidth, {'affixed' : affixed, 'fixed-header' : fixedHeader, 'collapsed' : adminLayout.collapsed}]"
      :active-key="active"
      :hide-add="true"
    >
      <a-tooltip
        slot="tabBarExtraContent"
        placement="left"
        :title="lockTitle"
      >
        <a-icon
          theme="filled"
          class="header-lock"
          :type="fixedTabs ? 'lock' : 'unlock'"
          @click="onLockClick"
        />
      </a-tooltip>
      <a-tab-pane
        v-for="page in pageList"
        :key="page.fullPath"
      >
        <div
          slot="tab"
          class="tab"
          @contextmenu="e => onContextmenu(page.fullPath, e)"
        >
          <a-icon
            :class="['icon-sync', {'hide': page.fullPath !== active && !page.loading}]"
            :type="page.loading ? 'loading' : 'sync'"
            @click="onRefresh(page)"
          />
          <div
            class="title"
            @click="onTabClick(page.fullPath)"
          >
            {{ pageName(page) }}
          </div>
          <a-icon
            v-if="!page.unclose"
            class="icon-close"
            type="close"
            @click="onClose(page.fullPath)"
          />
        </div>
      </a-tab-pane>
    </a-tabs>
    <div
      v-if="affixed"
      class="virtual-tabs"
    />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { getI18nKey } from '@/utils/routerUtil'

export default {
  name: 'TabsHead',
  i18n: {
    messages: {
      CN: {
        lock: '点击锁定页签头',
        unlock: '点击解除锁定'
      },
      HK: {
        lock: '點擊鎖定頁簽頭',
        unlock: '點擊解除鎖定'
      },
      US: {
        lock: 'click to lock the tabs head',
        unlock: 'click to unlock'
      }
    }
  },
  props: {
    pageList: Array,
    active: String,
    fixed: Boolean
  },
  data() {
    return {
      affixed: false
    }
  },
  computed: {
    ...mapState('setting', ['layout', 'pageWidth', 'fixedHeader', 'fixedTabs', 'customTitles']),
    lockTitle() {
      return this.$t(this.fixedTabs ? 'unlock' : 'lock')
    }
  },
  inject: ['adminLayout'],
  created() {
    this.affixed = this.fixedTabs
  },
  methods: {
    ...mapMutations('setting', ['setFixedTabs']),
    onLockClick() {
      this.setFixedTabs(!this.fixedTabs)
      if (this.fixedTabs) {
        setTimeout(() => {
          this.affixed = true
        }, 200)
      } else {
        this.affixed = false
      }
    },
    onTabClick(key) {
      if (this.active !== key) {
        this.$emit('change', key)
      }
    },
    onClose(key) {
      this.$emit('close', key)
    },
    onRefresh(page) {
      this.$emit('refresh', page.fullPath, page)
    },
    onContextmenu(pageKey, e) {
      this.$emit('contextmenu', pageKey, e)
    },
    pageName(page) {
      const pagePath = page.fullPath.split('?')[0]
      const custom = this.customTitles.find(item => item.path === pagePath)
      return (custom && custom.title) || page.title || this.$t(getI18nKey(page.keyPath))
    }
  }
}
</script>

<style scoped lang="less">
  .tab{
    margin: 0 -16px;
    padding: 0 16px;
    font-size: 14px;
    transition: all .2s;
    user-select: none;
    .title{
      display: inline-block;
      height: 100%;
    }
    .icon-close{
      margin-right: -4px !important;
      margin-left: 6px;
      color: @text-color-second;
      font-size: 12px;
      &:hover{
        color: @text-color;
      }
    }
    .icon-sync{
      margin-left: -4px;
      color: @primary-4;
      font-size: 14px;
      transition: all .3s ease-in-out;
      &:hover{
        color: @primary-color;
      }
      &.hide{
        font-size: 0;
      }
    }
  }
  .tabs-head{
    margin: 0 auto;
    &.head.fixed{
      width: 1400px;
    }
  }
  .tabs-container{
    margin: -16px auto 8px;
    transition: top, left .2s;
    .header-lock{
      color: @primary-3;
      font-size: 18px;
      cursor: pointer;
      &:hover{
        color: @primary-color;
      }
    }
    &.affixed{
      position: fixed;
      top: 0;
      z-index: 1;
      height: 48px;
      margin: 0 auto;
      padding: 8px 24px 0;
      background-color: @layout-body-background;
      &.side,
      &.mix{
        right: 0;
        left: 256px;
        &.collapsed{
          left: 80px;
        }
      }
      &.head{
        width: inherit;
        padding: 8px 0 0;
        &.fluid{
          right: 0;
          left: 0;
          padding: 8px 24px 0;
        }
      }
      &.fixed-header{
        top: 64px;
      }
    }
  }
  .virtual-tabs{
    height: 48px;
  }
</style>
