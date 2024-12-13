<template>
  <div
    :style="{
      background: `url(${bgImage}) no-repeat center/cover`,
    }"
  >
    <el-carousel arrow="never" class="slideshow-box">
      <el-carousel-item
        class="swiper-item"
        v-for="item in slideShowList"
        :key="item.id"
      >
        <div class="swiper-left">
          <div>{{ item.title }}</div>
          <div>
            {{ item.intro }}
          </div>
          <div class="immediate" @click="show">
            <span>立即体验</span>
            <img src="~/static/img/swap-right.png" alt="" />
            <!-- 免费试用弹窗 -->
            <FreeTry
              :freeTryVisible="freeTryVisible"
              @changeShow="showFreeTry"
              ref="addOrUpdateRef"
            />
          </div>
        </div>
        <div class="swiper-right">
          <img :src="item.imgUrl" alt="" />
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style lang="scss" scoped>
// 轮播图
.slideshow-box {
  width: 1060px;
  height: 423px;
  margin: 0 auto;
  &::v-deep .el-carousel__button {
    background-color: $commonColor;
  }

  .slideshow-item {
    height: 423px;
  }
}

.swiper-item {
  display: flex;
  height: 423px;
  .swiper-left {
    flex: 1;

    > div {
      &:nth-of-type(1) {
        font-size: 36px;
        font-family: PingFang SC-Semibold, PingFang SC;
        font-weight: 600;
        color: #3b426b;
        line-height: 44px;
        margin-top: 114px;
      }
      &:nth-of-type(2) {
        width: 600px;
        height: 24px;
        font-size: 16px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #3b426b;
        line-height: 24px;
        margin-top: 30px;
      }
    }
    .immediate {
      width: 200px;
      height: 46px;
      background: linear-gradient(180deg, #88b2ff 0%, #5f98ff 100%);
      border-radius: 4px 4px 4px 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 30px;
      cursor: pointer;

      > span {
        width: 64px;
        height: 24px;
        font-size: 16px;
        font-family: PingFang SC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.9);
        line-height: 24px;
        margin-right: 8px;
      }
      > img {
        width: 16px;
        height: 16px;
      }
    }
  }
  .swiper-right {
    width: 450px;
    height: 300px;
    margin-top: 80px;
  }
}
</style>

<script>
import BgImage from '@/static/img/swiper/bg-image.png'

export default {
  data() {
    return {
      // 控制免费试用弹窗的显示与隐藏
      freeTryVisible: false,
      slideShowList: [
        {
          id: 'SS001',
          imgUrl: require('~/static/img/swiper/swiper1.png'),
          title: '设计要好看，沟通要方便！',
          intro: '真实还原现场，提升谈单成功率！手机也能渲染',
        },
      ],
      bgImage: BgImage,
    }
  },
  methods: {
    handleTop() {
      scrollTo(0, 0)
    },
    show() {
      // this.freeTryVisible = true
      this.$emit('onLoginNavigate')
    },
    // 监听 子组件弹窗关闭后触发，有子组件调用true
    showFreeTry(data) {
      if (data === 'false') {
        this.freeTryVisible = false
      } else {
        this.freeTryVisible = true
      }
    },
  },
}
</script>
