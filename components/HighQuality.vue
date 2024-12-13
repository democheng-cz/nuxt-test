<template>
  <div class="core-advantage-item">
    <div>
      <span>{{ quality?.roomTitle }}</span>
      <div>{{ quality?.roomTag }}</div>
    </div>
    <div>{{ quality?.roomIntro }}</div>
  </div>
</template>

<style lang="scss" scoped>
.core-advantage-item {
  box-sizing: border-box;
  width: 254px;
  height: 165px;
  display: flex;
  flex-direction: column;
  background: #f7f8fa;
  border-radius: 3px 3px 3px 3px;
  padding: 42px 31px;
  position: relative;
  > div {
    &:nth-of-type(1) {
      display: flex;
      align-items: center;
      > span {
        font-size: 20px;
        font-family: PingFang SC-Medium, PingFang SC;
        font-weight: 500;
        color: #3b426b;
        line-height: 28px;
      }
      > div {
        text-align: center;
        width: 40px;
        height: 20px;
        background: #5f98ff;
        border-radius: 4px 4px 4px 4px;
        font-size: 12px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.9);
        line-height: 20px;
        margin-left: 8px;
      }
    }
    &:nth-of-type(2) {
      font-size: 12px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #3b426b;
      line-height: 20px;
      margin-top: 12px;
    }
  }
}
</style>

<script lang="ts">
import { PropType } from 'vue'
import { HighQualityType } from '~/pages/index.vue'

export default {
  props: {
    quality: {
      default: () => {},
      type: Object as PropType<HighQualityType>,
      required: false,
    },
  },
}
</script>
