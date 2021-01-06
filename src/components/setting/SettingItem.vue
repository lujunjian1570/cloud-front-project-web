<template>
  <div class="setting-item">
    <h3
      v-if="title"
      class="title"
    >
      {{ title }}
    </h3>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'SettingItem',
  props: ['title']
}
</script>

<style lang="less" scoped>
  .setting-item{
    margin-bottom: 24px;
    .title{
      margin-bottom: 12px;
      color: @title-color;
      font-size: 14px;
      line-height: 22px;
    }
  }
</style>
