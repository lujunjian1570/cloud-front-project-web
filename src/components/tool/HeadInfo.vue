<template>
  <div class="head-info">
    <span>{{ title }}</span>
    <p>{{ content }}</p>
  </div>
</template>

<script>
export default {
  name: 'HeadInfo',
  props: ['title', 'content', 'bordered']
}
</script>

<style lang="less" scoped>
  .head-info{
    flex-grow: 1;
    flex-shrink: 0;
    align-self: center;
    padding: 0 24px;
    text-align: center;
    span{
      display: inline-block;
      margin-bottom: 4px;
      color: @text-color-second;
      font-size: 14px;
    }
    p{
      margin: 0;
      color: @text-color;
      font-size: 24px;
    }
  }
</style>
