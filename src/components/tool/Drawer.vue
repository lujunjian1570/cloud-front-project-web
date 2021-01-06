<template>
  <div>
    <div
      :class="['mask', visible ? 'open' : 'close']"
      @click="close"
    />
    <div :class="['drawer', placement, visible ? 'open' : 'close']">
      <div
        ref="drawer"
        class="content beauty-scroll"
      >
        <slot />
      </div>
      <div
        v-if="showHandler"
        ref="handler"
        :class="['handler-container', placement, visible ? 'open' : 'close']"
        @click="toggle"
      >
        <slot
          v-if="$slots.handler"
          name="handler"
        />
        <div
          v-else
          class="handler"
        >
          <a-icon :type="visible ? 'close' : 'bars'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Drawer',
  model: {
    prop: 'visible',
    event: 'change'
  },
  props: {
    visible: {
      type: Boolean,
      required: false,
      default: false
    },
    placement: {
      type: String,
      required: false,
      default: 'left'
    },
    showHandler: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data() {
    return {
    }
  },
  methods: {
    open() {
      this.$emit('change', true)
    },
    close() {
      this.$emit('change', false)
    },
    toggle() {
      this.$emit('change', !this.visible)
    }
  }
}
</script>

<style lang="less" scoped>
  .mask{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
    background-color: @shadow-color;
    transition: all .5s;
    &.open{
      display: inline-block;
    }
    &.close{
      display: none;
    }
  }
  .drawer{
    position: fixed;
    z-index: 100;
    height: 100vh;
    transition: all .5s;
    &.left{
      left: 0;
      &.open{
        .content{
          box-shadow: 2px 0 8px @shadow-color;
        }
      }
      &.close{
        transform: translateX(-100%);
      }
    }
    &.right{
      right: 0;
      .content{
        float: right;
      }
      &.open{
        .content{
          box-shadow: -2px 0 8px @shadow-color;
        }
      }
      &.close{
        transform: translateX(100%);
      }
    }
  }
  .content{
    display: inline-block;
    height: 100vh;
    overflow-y: auto;
  }
  .handler-container{
    position: absolute;
    top: 200px;
    z-index: 100;
    display: inline-block;
    text-align: center;
    cursor: pointer;
    transition: all .5s;
    .handler{
      width: 40px;
      height: 40px;
      font-size: 26px;
      line-height: 40px;
      background-color: @base-bg-color;
      box-shadow: 0 2px 8px @shadow-color;
    }
    &.left{
      right: -40px;
      .handler{
        border-radius: 0 5px 5px 0;
      }
    }
    &.right{
      left: -40px;
      .handler{
        border-radius: 5px 0 0 5px;
      }
    }
  }
</style>
