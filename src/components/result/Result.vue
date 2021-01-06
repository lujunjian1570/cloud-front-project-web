<template>
  <div class="result">
    <div>
      <a-icon
        :class="[isSuccess ? 'success' : 'error' ,'icon']"
        :type="isSuccess ? 'check-circle' : 'close-circle'"
      />
    </div>
    <div
      v-if="title"
      class="title"
    >
      {{ title }}
    </div>
    <div
      v-if="description"
      class="desc"
    >
      {{ description }}
    </div>
    <div class="content">
      <slot />
    </div>
    <div class="action">
      <slot name="action" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Result',
  props: ['isSuccess', 'title', 'description']
}
</script>

<style lang="less" scoped>
  .result{
    width: 72%;
    margin: 0 auto;
    text-align: center;
    .icon{
      margin-bottom: 24px;
      font-size: 72px;
      line-height: 72px;
    }
    .success{
      color: @success-color;
    }
    .error{
      color: @error-color;
    }
    .title{
      margin-bottom: 16px;
      color: @title-color;
      font-weight: 500;
      font-size: 24px;
      line-height: 32px;
    }
    .desc{
      margin-bottom: 24px;
      color: @text-color-second;
      font-size: 14px;
      line-height: 22px;
    }
    .content{
      padding: 24px 40px;
      text-align: left;
      background-color: @background-color-light;
      border-radius: 2px;
    }
    .action{
      margin-top: 32px;
    }
  }

</style>
