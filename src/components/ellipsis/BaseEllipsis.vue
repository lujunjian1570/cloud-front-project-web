<template>
  <a-tooltip>
    <template slot="title">
      <span style="white-space: pre-line;">{{ value }}</span>
    </template>
    {{ value | ellipsis(length) }}
  </a-tooltip>
</template>

<script>
export default {
  name: 'BaseEllipsis',
  props: {
    value: {
      type: String,
      required: false
    },
    length: {
      type: Number,
      required: false,
      default: 25
    }
  }
}
</script>
