<template>
  <a-checkable-tag
    v-model="checked"
    class="tag-default"
    @change="$emit('click')"
  >
    <slot />
  </a-checkable-tag>
</template>

<script>
export default {
  name: 'TagSelectOption',
  props: {
    size: {
      type: String,
      required: false,
      default: 'default'
    }
  },
  data() {
    return {
      checked: false,
      isTagSelectOption: true
    }
  }
}
</script>

<style lang="less" scoped>
  .tag-default{
    height: auto;
    margin-right: 24px;
    padding: 0 8px;
    font-size: 14px;
  }
</style>
