<template>
  <div v-if="isLoginPage == 'home'">
    <div style="height: 58px"></div>
    <!-- 头部 -->
    <div class="header-box">
      <div class="header">
        <div class="logo-box">
          <img src="~/static/img/web-logo.png" alt="" />
          <span>顺风耳设计 SFE</span>
        </div>
        <div class="flex flex-cross--center">
          <ul class="nav-list" style="margin-right: 68px">
            <li
              v-for="item in coreAdvantageList"
              @click="handleScrollTo(item)"
              :class="{ active: selectedTab.to === item.to }"
            >
              {{ item.text }}
            </li>
          </ul>
          <div
            class="cursor-pointer mr20 flex flex-cross--center"
            @click="handleBackSfe"
          >
            <div>返回顺风耳</div>
            <img
              src="@/static/img/return.png"
              style="height: 16px; width: 16px"
              class="ml10"
            />
          </div>
          <div v-if="userPhone" class="cursor-pointer flex flex-cross--center">
            <div @click="handleLoginNavigate">
              {{ userPhone }}
            </div>
            <img
              class="ml10"
              style="height: 16px; width: 16px"
              src="~static/img/login/logout.png"
              @click="handleLogout"
            />
          </div>
          <div
            v-else
            class="br4 cursor-pointer pv7"
            style="background: #52a2ff; padding-left: 22px; padding-right: 22px"
            @click="handleLogin"
          >
            登录使用
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="background-top">
        <!-- 轮播图 -->
        <Swiper @onLoginNavigate="handleLoginNavigate" />

        <!-- 核心优势 -->
        <div class="common-title">核心优势</div>
        <CoreAdvantage />

        <!-- 视频 -->
        <div class="video-box">
          <div class="dot-box">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <video
            autoplay
            muted
            loop
            src="~/static/video/小渲风剪辑4.mp4"
          ></video>
        </div>
      </div>

      <!-- 高品质效果 -->
      <div class="common-title">高品质效果</div>
      <div class="high-quality-effect-box">
        <div
          class="quality-position"
          v-for="item in highQualityList.slice(0, 2)"
          :key="item.id"
          @click="handleSelectCard(item)"
          @mouseover="handleMouseOver(item)"
        >
          <div class="hover-open">
            <HighQuality :quality="item" />
            <HoverHighQuality
              :quality="item"
              class="hover-come-one"
              :class="{ enlargehover: hoverCard === item.id }"
            />
          </div>
        </div>
        <div
          class="quality-position"
          v-for="item in highQualityList.slice(2, 4)"
          :key="item.id"
          @click="handleSelectCard(item)"
          @mouseover="handleMouseOver(item)"
        >
          <div class="hover-open">
            <HighQuality :quality="item" />
            <HoverHighQuality
              :quality="item"
              class="hover-come-two"
              :class="{ enlargehover: hoverCard === item.id }"
            />
          </div>
        </div>
        <div
          class="quality-position"
          v-for="item in highQualityList.slice(4, 6)"
          :key="item.id"
          @click="handleSelectCard(item)"
          @mouseover="handleMouseOver(item)"
        >
          <div class="hover-open">
            <HighQuality :quality="item" />
            <HoverHighQuality
              :quality="item"
              class="hover-come-three"
              :class="{ enlargehover: hoverCard === item.id }"
            />
          </div>
        </div>
        <div
          class="quality-position"
          v-for="item in highQualityList.slice(6, 8)"
          :key="item.id"
          @click="handleSelectCard(item)"
          @mouseover="handleMouseOver(item)"
        >
          <div class="hover-open">
            <HighQuality :quality="item" />
            <HoverHighQuality
              :quality="item"
              class="hover-come-four"
              :class="{ enlargehover: hoverCard === item.id }"
            />
          </div>
        </div>
      </div>

      <div class="cross-line"></div>

      <!-- 解决方案 -->
      <div class="common-title">解决方案</div>
      <Solution />
      <Number />

      <!-- 渲染价格 -->
      <div class="common-title">产品价格</div>
      <Price @handleScrollTo="handleScrollTo" />

      <!-- 免费试用 -->
      <div class="free-trial-box">
        <div
          class="br4 cursor-pointer pv20 align-center fs20"
          :style="{
            background:
              'linear-gradient(90deg, #FFE7BE -5.54%, #FFF9E9 142.72%)',
            color: '#89430B',
            width: '460px',
            lineHeight: '24px',
          }"
          @click="handleDownloadExe"
        >
          电脑端下载
        </div>
        <div>
          或拨打
          <span>&nbsp;<a href="tel://400-1567-080">400-1567-080</a>&nbsp; </span
          >获取免费试用资格
        </div>
        <div class="apply-input">
          <FreeTryBottom />
        </div>
      </div>

      <!-- 底部 -->
      <Bottom />

      <!-- 悬浮窗 -->
      <!-- <Consult /> -->

      <HighQualityDialog
        :visible="dialogVisible"
        :onClose="handleCloseDialog"
        :cardList="highQualityList"
        :card="selectedCard"
      />
    </div>

    <div
      class="down-load"
      @mouseenter="handleMouseenter"
      @mouseleave="handleMouseover"
      :style="{ display: isMoveApp ? 'block' : 'none' }"
    >
      <Download />
    </div>
  </div>

  <div v-else>
    <Login :priceToLogin="priceToLogin" @handleBack="handleBack" />
  </div>
</template>

<script lang="ts">
import Bottom from './bottom.vue'
import Consult from './consult.vue'
import Number from './number.vue'
import Price from './price.vue'
import Vue from 'vue'
import CoreAdvantage from '~/components/CoreAdvantage.vue'
import HighQuality from '~/components/HighQuality.vue'
import HighQualityDialog from '~/components/HighQualityDialog.vue'
import HoverHighQuality from '~/components/HoverHighQuality.vue'
import Solution from '~/components/Solution.vue'
import FreeTryBottom from '~/components/freeTryBottom.vue'
import Download from '~/pages/download.vue'
import Login from '~/pages/login.vue'
import RenderPrice from '~/pages/price.vue'
import SlideShow from '~/pages/swiper.vue'
import Swiper from '~/pages/swiper.vue'
import { guiguiBaseUrl, sfeUrl } from '~/util/config'

export type HighQualityType = {
  id: string
  roomImgUrl: string
  roomTitle: string
  roomTag: string
  roomIntro: string
}

export default Vue.extend({
  name: 'IndexPage',
  components: {
    SlideShow,
    CoreAdvantage,
    HighQuality,
    RenderPrice,
    Solution,
    Number,
    Consult,
    Bottom,
    HoverHighQuality,
    FreeTryBottom,
    Swiper,
    Price,
    HighQualityDialog,
    Login,
    Download,
  },
  mounted() {
    // if (!location?.href?.includes('sfe.eggrj.com')) {
    //   let mode = guiguiBaseUrl.indexOf('test') != -1 ? 'test-' : ''
    //   location.href = `https://${mode}sfe.eggrj.com/engr`
    // }
    window.addEventListener('scroll', this.handleScroll)
    this.getStatus()
  },

  data() {
    return {
      timer: null as any,
      isMoveApp: false,
      top: '',
      highQualityList: [
        {
          id: 'HQ001',
          roomImgUrl: require('~/static/img/high-quality/现代书房.jpg'),
          roomTitle: '现代书房',
          roomTag: '书房',
          roomIntro:
            '色彩变化与材质转换，增强视觉感染力，使简单的空间变得更饱满。',
        },
        {
          id: 'HQ002',
          roomImgUrl: require('~/static/img/high-quality/简欧客厅.jpg'),
          roomTitle: '简欧客厅',
          roomTag: '客厅',
          roomIntro: '家的生命力于细节处蔓延，蔓延的生命力让艺术气息充盈其间。',
        },
        {
          id: 'HQ003',
          roomImgUrl: require('~/static/img/high-quality/现代男孩房.jpg'),
          roomTitle: '现代男孩房',
          roomTag: '儿童房',
          roomIntro: '儿童房整体以暖色调为主，呈现出的是，简约又不失格调的美。',
        },
        {
          id: 'HQ004',
          roomImgUrl: require('~/static/img/high-quality/法式女孩房.jpg'),
          roomTitle: '法式女孩房',
          roomTag: '儿童房',
          roomIntro: '孩子的房间，采用淡雅色调为主，搭配粉红色。',
        },
        {
          id: 'HQ005',
          roomImgUrl: require('~/static/img/high-quality/现代卧室.jpg'),
          roomTitle: '现代卧室',
          roomTag: '卧室',
          roomIntro: '卧室以奶油色调为主，加入木色融入温润质感。',
        },
        {
          id: 'HQ006',
          roomImgUrl: require('~/static/img/high-quality/撞色衣帽间.jpg'),
          roomTitle: '撞色衣帽间',
          roomTag: '衣帽间',
          roomIntro: '开放式的布局，让室内充满了光线，明亮、平静。',
        },
        {
          id: 'HQ007',
          roomImgUrl: require('~/static/img/high-quality/现代客厅.jpg'),
          roomTitle: '现代客厅',
          roomTag: '客厅',
          roomIntro: '色彩点缀、挂画和木材，使室内焕然一新。',
        },
        {
          id: 'HQ008',
          roomImgUrl: require('~/static/img/high-quality/现代厨房.jpg'),
          roomTitle: '现代厨房',
          roomTag: '厨房',
          roomIntro: '开放式的厨房与餐厅相连，可以共享聚会烹饪的趣味时光。',
        },
      ],
      activityCardList: [
        {
          id: 'AC001',
          roomImgUrl: require('~/static/img/activity/activity1.png'),
        },
        {
          id: 'AC002',
          roomImgUrl: require('~/static/img/activity/activity2.png'),
        },
        {
          id: 'AC003',
          roomImgUrl: require('~/static/img/activity/activity3.png'),
        },
        {
          id: 'AC004',
          roomImgUrl: require('~/static/img/activity/activity4.png'),
        },
        {
          id: 'AC005',
          roomImgUrl: require('~/static/img/activity/activity5.png'),
        },
        {
          id: 'AC006',
          roomImgUrl: require('~/static/img/activity/activity6.png'),
        },
      ],
      coreAdvantageList: [
        { text: '核心优势', to: 420 },
        { text: '解决方案', to: 2163 },
        { text: '产品价格', to: 2984 },
        { text: '软件下载', to: 3922 },
        { text: '视频教程', to: 0 },
        {
          text: '效果图外包',
          to: 0,
        },
      ],
      dialogVisible: false,
      selectedCard: {} as HighQualityType,
      selectedTab: {} as { text: string; to: number },
      hoverCard: 'HQ001',
      isLoginPage: 'home',
      priceToLogin: 0,
      userPhone: null,
    }
  },
  methods: {
    handleMouseenter() {
      clearTimeout(this.timer)
    },
    handleMouseover() {
      this.isMoveApp = false
    },
    getStatus() {
      if (localStorage.getItem('userInfo')) {
        this.isLoginPage = 'home'
        this.userPhone = JSON.parse(
          localStorage.getItem('userInfo') as string
        ).phone
      }
    },
    handleBack() {
      this.isLoginPage = 'home'
      this.getStatus()
    },
    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      if (scrollTop >= 3400) {
        this.selectedTab = this.coreAdvantageList[3]
      } else if (scrollTop >= 2984) {
        this.selectedTab = this.coreAdvantageList[2]
      } else if (scrollTop >= 2164) {
        this.selectedTab = this.coreAdvantageList[1]
      } else {
        this.selectedTab = this.coreAdvantageList[0]
      }
    },
    //点击实现跳转
    handleScrollTo(tab: { text: string; to: number }) {
      if (tab.text == '登录使用') {
        this.isLoginPage = 'login'
        this.priceToLogin = tab.to
        return
      } else if (tab.text == '退出') {
        localStorage.removeItem('userInfo')
        return
      } else if (tab.text == '视频教程') {
        let mode = guiguiBaseUrl.indexOf('test') != -1 ? 'test-web' : 'www'
        window.open(`https://${mode}.eggrj.com/#/videocourse?type=xxf`)
      } else if (tab.text == '效果图外包') {
        if (!this.userPhone) {
          this.isLoginPage = 'login'
          return
        }
        let baseUrl = sfeUrl
        let router = '/guiguiChat/extendEntry/commune/index'
        let paramsStr = `?type=commune&communeId=-24&phone=${this.userPhone}`
        window.open(`${baseUrl}${router}${paramsStr}`)
      } else if (tab.text != '登录使用' && !tab.to) {
        let userInfo = JSON.parse(localStorage.getItem('userInfo') || '[]')
        let mode = guiguiBaseUrl.indexOf('test') != -1 ? '-dev' : ''
        window.open(
          `https://webcg${mode}.thinkerx.com/auth?id=${userInfo.id}&token=${userInfo.token}`
        )
        return
      }
      window.scrollTo({
        top: tab.to,
        behavior: 'smooth',
      })
    },
    handleSelectCard(card: HighQualityType) {
      this.selectedCard = card
      this.dialogVisible = true
    },
    handleCloseDialog() {
      this.dialogVisible = false
    },
    handleMouseOver(item: HighQualityType) {
      this.hoverCard = item.id
    },
    handleLogin() {
      this.isLoginPage = 'login'
    },
    handleLogout() {
      localStorage.removeItem('userInfo')
      this.userPhone = null
    },
    handleLoginNavigate() {
      if (localStorage.getItem('userInfo')) {
        let userInfo = JSON.parse(localStorage.getItem('userInfo') || '[]')
        let mode = guiguiBaseUrl.indexOf('test') != -1 ? '-dev' : ''
        window.open(
          `https://webcg${mode}.thinkerx.com/auth?id=${userInfo.id}&token=${userInfo.token}`
        )
      } else {
        this.isLoginPage = 'login'
      }
    },
    handleDownloadExe() {
      let url =
        'https://webcg-obs.obs.cn-east-3.myhuaweicloud.com/models/soft/xxf_latest.exe'

      const a = document.createElement('a')
      a.href = url
      a.download = 'xxf_latest.exe'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    },
    handleBackSfe() {
      if (this.$route.query?.platfrom === 'sfe') {
        window.parent.postMessage(
          {
            action: 'returnSfe',
          },
          '*'
        )
      } else {
        let mode = guiguiBaseUrl.indexOf('test') != -1 ? 'test-' : ''
        location.href = `https://${mode}sfe.eggrj.com/`
      }
    },
  },
  beforeDestroy() {
    // 移除监听事件
    window.removeEventListener('scroll', this.handleScroll)
  },
})
</script>

<style lang="scss" scoped>
.down-load {
  position: fixed;
  bottom: 75px;
  width: 258px;
  height: 238px;
  right: 150px;
  z-index: 4;
  border-radius: 3px 3px 3px 3px;
  background: #f3f5ff;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.12),
    0px 4px 5px 0px rgba(0, 0, 0, 0.08), 0px 1px 10px 0px rgba(0, 0, 0, 0.05);
}
.enlargehover {
  width: 254px !important;
  height: 338px !important;
  opacity: 1 !important;
  cursor: pointer;
}
.active {
  color: $commonColor;
}
.background-top {
  height: 1500px;
  background: linear-gradient(180deg, #ffffff 0%, #f7f9fc 100%);
}
// 头部
.header-box {
  position: fixed;
  top: 0;
  z-index: 8;
  width: 100%;
  height: 58px;
  background: #3b426b;
  color: rgba(255, 255, 255, 0.9);
  .header {
    width: 1060px;
    height: 58px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .logo-box {
      width: 200px;
      display: flex;
      align-items: center;
      > img {
        width: 40px;
        height: 40px;
        background: #f1c72f;
        border-radius: 9px 9px 9px 9px;
        opacity: 1;
      }
      > span {
        font-size: 16px;
        font-family: PingFang SC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.9);
        line-height: 24px;
        margin-left: 12px;
      }
    }
    .nav-list {
      width: 550px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      > li {
        height: 22px;
        font-size: 14px;
        font-family: PingFang SC-Medium, PingFang SC;
        font-weight: 500;
        line-height: 22px;
        cursor: pointer;
        &:hover {
          color: $commonColor;
        }
      }
    }
    .phone-box {
      > img {
        width: 12px;
        height: 12px;
      }
      > span {
        height: 24px;
        font-size: 16px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.9);
        line-height: 24px;
        margin-left: 6px;
      }
    }
  }
}

//共同标题
.common-title {
  width: 1040px;
  height: 224px;
  font-size: 36px;
  font-family: PingFang SC-Regular, PingFang SC;
  font-weight: 400;
  color: #3b426b;
  line-height: 160px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

// 视频
.video-box {
  width: 1049px;
  height: 591px;
  background: #555470;
  margin: 0 auto;
  border-radius: 8px 8px 0px 0px;
  overflow: hidden;
  margin-top: 52px;
  .dot-box {
    height: 30px;
    display: flex;
    align-items: center;
    margin-left: 16px;
    > div {
      width: 11px;
      height: 11px;
      border-radius: 50%;
      background: #d9d9d9;
      margin-left: 5px;
    }
  }
  > video {
    width: 1036px;
    height: 584px;
    border-radius: 5px;
    display: block;
    margin: 0 auto;
  }
}

// 高品质效果
.high-quality-effect-box {
  width: 1040px;
  height: 338px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  justify-content: space-between;
  .quality-position {
    position: relative;

    .hover-come-one {
      top: 0;
      left: 0;
    }
    .hover-come-two {
      top: 0;
      right: 0;
    }
    .hover-come-three {
      bottom: 0;
      left: 0;
    }
    .hover-come-four {
      bottom: 0;
      right: 0;
    }
  }
}

//分割线
.cross-line {
  width: 100%;
  height: 1px;
  background: #e7e7e7;
  margin-top: 100px;
}

// 免费试用
.free-trial-box {
  width: 100%;
  height: 338px;
  background: #0c1d4a;
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  > div {
    &:nth-of-type(2) {
      height: 28px;
      font-size: 20px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.55);
      line-height: 28px;
      margin-top: 28px;
      > span {
        font-size: 20px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #5f98ff;
        line-height: 28px;
      }
    }
  }
  .apply-input {
    width: 1030px;
    height: 50px;
    margin-top: 32px;
  }
}
</style>
