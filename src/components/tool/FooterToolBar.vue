<template>
  <div class="toolbar">
    <div style="float: left;">
      <slot name="extra" />
    </div>
    <div style="float: right;">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterToolBar'
}
</script>

<style lang="less" scoped>
  .toolbar{
    position: fixed;
    right: 0;
    bottom: 0;
    z-index: 9;
    width: 100%;
    padding: 12px 24px;
    background: @base-bg-color;
    border-top: 1px solid @border-color-split;
    box-shadow: 0 -1px 2px @shadow-color;
  }
</style>
