<template>
  <div class="form-row">
    <div class="label">
      <span>{{ label }}</span>
    </div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormRow',
  props: ['label']
}
</script>

<style lang="less" scoped>
  .form-row{
    display: flex;
    margin-bottom: 16px;
    border-bottom: 1px dashed @border-color-base;
    .label{
      flex: 0 0 auto;
      margin-right: 24px;
      color: @title-color;
      font-size: 14px;
      text-align: right;
      & > span{
        display: inline-block;
        height: 39px;
        line-height: 39px;
        &::after{
          content: "：";
        }
      }
    }
    .content{
      flex: 1 1 0;
      :global{
        .ant-form-item:last-child{
          margin-right: 0;
        }
        .ant-form-item{
          margin-bottom: 0;
        }
      }
    }
  }
</style>
