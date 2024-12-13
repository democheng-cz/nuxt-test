<template>
  <div class="hover-high-quality-item">
    <div>
      <img :src="quality?.roomImgUrl" alt="" />
    </div>
    <div>
      <div>
        <span>{{ quality?.roomTitle }}</span>
        <div>{{ quality?.roomTag }}</div>
      </div>
      <div>
        {{ quality?.roomIntro }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.hover-high-quality-item {
  position: absolute;
  width: 0px;
  height: 0px;
  z-index: 4;
  opacity: 0;
  background-color: $commonColor;
  overflow: hidden;
  transition: all 0.5s ease 0s;
  > div {
    &:nth-of-type(1) {
      width: 254px;
      height: 233px;
      display: flex;
      justify-content: center;
      overflow: hidden;
      > img {
        width: auto;
        height: 100%;
      }
    }
    &:nth-of-type(2) {
      box-sizing: border-box;
      padding: 16px 31px;
      box-sizing: border-box;
      width: 254px;
      height: 165px;
      display: flex;
      flex-direction: column;
      > div {
        &:nth-of-type(1) {
          display: flex;
          align-items: center;
          > span {
            font-size: 20px;
            font-family: PingFang SC-Medium, PingFang SC;
            font-weight: 500;
            color: #ffffff;
            line-height: 28px;
          }
          > div {
            text-align: center;
            width: 40px;
            height: 20px;
            background: #ffffff;
            border-radius: 4px 4px 4px 4px;
            font-size: 12px;
            font-family: PingFang SC-Regular, PingFang SC;
            font-weight: 400;
            color: $commonColor;
            line-height: 20px;
            margin-left: 8px;
          }
        }
        &:nth-of-type(2) {
          font-size: 12px;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.9);
          line-height: 20px;
          margin-top: 4px;
        }
      }
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
