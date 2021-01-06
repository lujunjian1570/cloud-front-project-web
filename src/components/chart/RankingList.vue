<template>
  <div class="rank">
    <h4 class="title">
      {{ title }}
    </h4>
    <ul class="list">
      <li
        v-for="(item, index) in list"
        :key="index"
      >
        <span :class="index < 3 ? 'active' : null">{{ index + 1 }}</span>
        <span>{{ item.name }}</span>
        <span>{{ item.total }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'RankingList',
  props: ['title', 'list']
}
</script>

<style lang="less" scoped>
  .rank{
    padding: 0 32px 32px 72px;
    .list{
      margin: 25px 0 0;
      padding: 0;
      list-style: none;
      li{
        margin-top: 16px;
        span{
          color: @text-color-second;
          font-size: 14px;
          line-height: 22px;
        }
        span:first-child{
          display: inline-block;
          width: 20px;
          height: 20px;
          margin-right: 24px;
          font-weight: 600;
          font-size: 12px;
          line-height: 20px;
          text-align: center;
          background-color: @layout-bg-color;
          border-radius: 20px;
        }
        span.active{
          color: @text-color-inverse !important;
          background-color: #314659 !important;
        }
        span:last-child{
          float: right;
        }
      }
    }
  }
</style>
