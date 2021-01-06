<template>
  <div class="mini-progress">
    <a-tooltip :title="'目标值：' + target + '%'">
      <div
        class="target"
        :style="{left: target + '%'}"
      >
        <span :style="{backgroundColor: color}" />
        <span :style="{backgroundColor: color}" />
      </div>
    </a-tooltip>
    <div class="wrap">
      <div
        class="progress"
        :style="{backgroundColor: color, width: percent + '%', height: height}"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'MiniProgress',
  props: ['target', 'color', 'percent', 'height']
}
</script>

<style lang="less"  scoped>
  .mini-progress{
    position: relative;
    width: 100%;
    padding: 5px 0;
    .wrap{
      position: relative;
      background-color: @layout-bg-color;
    }
    .progress{
      width: 0;
      height: 100%;
      background-color: #13c2c2;
      border-radius: 1px 0 0 1px;
      transition: all .4s cubic-bezier(.08, .82, .17, 1) 0s;
    }
    .target{
      position: absolute;
      top: 0;
      bottom: 0;
      span{
        position: absolute;
        top: 0;
        left: 0;
        width: 2px;
        height: 4px;
        border-radius: 100px;
      }
      span:last-child{
        top: auto;
        bottom: 0;
      }
    }
  }
</style>
