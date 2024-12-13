<template>
  <div
    class="render-price-box flex flex-dir--top flex-main--center flex-cross--center"
  >
    <div
      class="render-tabs color-o-6 flex flex-main--center flex-cross--center fs16 br8"
    >
      <span
        class="render-tabs-info align-center cursor-pointer"
        v-for="(item, index) in tab"
        @click="handleChangeTab(index)"
        :class="index == tabIndex ? 'render-tabs-active br8 color-f' : ''"
        :key="index"
        >{{ item }}</span
      >
    </div>
    <div
      class="render-disposable w100 br8 fs20 flex flex-main--justify"
      v-if="tabIndex == 0"
    >
      <div
        v-for="item in priceList"
        :key="item.title"
        :style="{
          backgroundColor: '#f7f8fa',
          width: '24%',
          padding: '0 10px',
          boxSizing: 'border-box',
          position: 'relative',
        }"
      >
        <img class="icon-img" v-if="item.icon" :src="item.icon" />
        <div
          style="background-color: #5f98ff"
          v-else
          class="custom-icon fs20 color-f br5 align-center"
        >
          +
        </div>
        <div style="top: -7px" class="absolute r10">
          <img style="width: 85px; height: 70px" :src="item.priceIcon" />
          <div class="absolute t6 l5 w100" style="color: #ffffff8c">
            <p class="fs12 align-center">
              ¥ <span class="fs20 color-f">{{ item.price }}</span>
            </p>
            <p class="fs15 align-center">{{ item.priceUnit }}</p>
          </div>
        </div>
        <div style="margin-top: 80px">{{ item.title }}</div>
        <div style="color: #3b426b" class="pv20 fs15">
          <img
            style="width: 20px; height: 20px"
            src="~/static/img/price/host.png"
          />
          {{ item.hostTitle }}
        </div>
        <div style="color: #3b426b" class="fs15">
          <img
            style="width: 20px; height: 20px"
            src="~/static/img/price/childAcount.png"
          />
          {{ item.childAcountTitle }}
        </div>
        <div
          class="disposable-buyer-button cursor-pointer br4 color-f align-center fs16"
          @click="handleBuyer(item.priceId)"
        >
          立即购买
        </div>
      </div>
    </div>
    <div class="mt20 fs20 flex flex-wrap--wrap flex-main--justify" v-else>
      <div
        class="render-number-item br4 flex flex-main--center flex-dir--top"
        v-for="(item, index) in pagesRendering"
        :key="index"
        :style="{
          'background-image': `url(${require(`@/static/img/price/${item.definition}k.png`)})`,
        }"
      >
        <div>{{ item.title }}</div>
        <div class="mv16">
          <span
            >¥<span class="number-buyer-price mh5">{{ item.price }}</span
            >/张</span
          >
        </div>
        <div
          class="number-button cursor-pointer"
          @click="handleBuyer(65)"
        ></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.render-price-box {
  width: 1038px;
  margin: 0 auto;
  font-family: PingFang SC, PingFang SC;
  .render-tabs {
    border: 1px solid #dcdcdc;
    width: 428px;
    height: 52px;
    .render-tabs-info {
      width: 205px;
      height: 40px;
      line-height: 40px;
    }
    .render-tabs-active {
      background: #5f98ff;
    }
  }
  .render-disposable {
    height: 276px;
    margin-top: 50px;
    box-sizing: border-box;
    padding: 0 50px 0 50px;
    .icon-img,
    .custom-icon {
      width: 30px;
      height: 30px;
      position: absolute;
      top: 20px;
      left: 10px;
    }

    .disposable-buyer-button {
      width: 100%;
      height: 40px;
      line-height: 40px;
      margin-top: 25px;
      background: #5f98ff;
    }
  }
  .render-number-item {
    margin-top: 30px;
    background: #f7f8fa;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width: 328px;
    height: 218px;
    padding-left: 30px;
    box-sizing: border-box;
    color: #3b426b;
  }
  .number-buyer-price {
    font-size: 48px;
    color: #5f98ff;
  }
  .number-button {
    width: 116px;
    height: 40px;
  }
}
</style>

<script>
import labelImg from '@/static/img/price/label.png'
import v1Img from '@/static/img/price/v1.png'
import v2Img from '@/static/img/price/v2.png'
import v3Img from '@/static/img/price/v3.png'
import { guiguiBaseUrl } from '~/util/config'

export default {
  data() {
    return {
      tab: ['按版本购买', '按渲染张数购买'],
      tabIndex: 0,
      pagesRendering: [
        {
          title: '普通图1k标清',
          price: '0.2',
          definition: 1,
        },
        {
          title: '普通图2k高清',
          price: '0.2',
          definition: 2,
        },
        {
          title: '普通图4k超清',
          price: '0.2',
          definition: 4,
        },
        {
          title: '全景图2k标清',
          price: '0.5',
          definition: 2,
        },
        {
          title: '全景图4k高清',
          price: '0.5',
          definition: 4,
        },
        {
          title: '全景图6k超清',
          price: '0.5',
          definition: 6,
        },
      ],
      priceList: [
        {
          title: '顺风耳设计3.0渲染V1',
          hostTitle: '主机数量 * 1',
          childAcountTitle: '子账号数量 * 0',
          icon: v1Img,
          priceIcon: labelImg,
          priceId: 116,
          price: 1280,
          priceUnit: '',
        },
        {
          title: '顺风耳设计3.0渲染V2',
          hostTitle: '主机数量 * 1',
          childAcountTitle: '子账号数量 * 5',
          icon: v2Img,
          priceIcon: labelImg,
          priceId: 113,
          price: 2980,
          priceUnit: '',
        },
        {
          title: '顺风耳设计3.0渲染V3',
          hostTitle: '主机数量 * 1',
          childAcountTitle: '子账号数量 * 20',
          icon: v3Img,
          priceIcon: labelImg,
          priceId: 114,
          price: 4980,
          priceUnit: '',
        },
        {
          title: '加购子账号数量',
          hostTitle: '需要先购买一台主机',
          childAcountTitle: '可选择购买数量',
          icon: '',
          priceIcon: labelImg,
          priceId: 115,
          price: 500,
          priceUnit: '个',
        },
      ],
    }
  },
  methods: {
    handleChangeTab(index) {
      this.tabIndex = index
    },
    handleBuyer(e) {
      if (localStorage.getItem('userInfo')) {
        let uid = JSON.parse(localStorage.getItem('userInfo') || '[]').id
        let name = JSON.parse(localStorage.getItem('userInfo') || '[]').name
        let baseUrl =
          guiguiBaseUrl.indexOf('test') != -1
            ? 'https://test-web.eggrj.com'
            : 'https://www.eggrj.com'
        window.open(`${baseUrl}/#/order?id=${e}&uid=${uid}&name=${name}`)
      } else {
        this.$emit('handleScrollTo', { text: '登录使用', to: e })
      }
    },
  },
}
</script>
