<template>
  <div class="exception-page">
    <div class="img">
      <img :src="config[type].img">
    </div>
    <div class="content">
      <h1>{{ config[type].title }}</h1>
      <div class="desc">
        {{ config[type].desc }}
      </div>
      <div class="action">
        <a-button
          type="primary"
          @click="backHome"
        >
          返回首页
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
import Config from './typeConfig'

export default {
  name: 'ExceptionPage',
  props: ['type', 'homeRoute'],
  data() {
    return {
      config: Config
    }
  },
  methods: {
    backHome() {
      if (this.homeRoute) {
        this.$router.push(this.homeRoute)
      }
      this.$emit('backHome', this.type)
    }
  }
}
</script>

<style lang="less" scoped>
  .exception-page{
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: @base-bg-color;
    border-radius: 4px;
    .img{
      padding-right: 52px;
      zoom: 1;
      img{
        max-width: 430px;
      }
    }
    .content{
      h1{
        margin-bottom: 24px;
        color: #434e59;
        font-weight: 600;
        font-size: 72px;
        line-height: 72px;
      }
      .desc{
        margin-bottom: 16px;
        color: @text-color-second;
        font-size: 20px;
        line-height: 28px;
      }
    }
  }

</style>
