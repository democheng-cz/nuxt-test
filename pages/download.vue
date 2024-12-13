<template>
  <div>
    <div class="download-detail">
      <p class="title">移动端下载</p>
      <p class="subtitle">同时支持手机、平板端</p>
      <div class="tabs-box">
        <div class="tabs">
          <span
            :class="['tabs-item', index == mobileActive ? 'tabs-active' : '']"
            v-for="(item, index) in mobileTabs"
            :key="index"
            @click="moblieClick(index)"
          >
            {{ item }}
          </span>
        </div>
      </div>
      <div class="details">
        <div id="code">
          <div ref="qrcode1" v-show="mobileActive == 0"></div>
          <div ref="qrcode3" v-show="mobileActive == 1"></div>
          <p class="code-name">
            安卓{{ mobileActive == 0 ? '平板' : '手机' }}版本
          </p>
        </div>
        <div id="code">
          <div ref="qrcode2" v-show="mobileActive == 0"></div>
          <div ref="qrcode4" v-show="mobileActive == 1"></div>
          <p class="code-name">
            苹果{{ mobileActive == 0 ? '平板' : '手机' }}版本
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Message } from 'element-ui'
import QRCode from 'qrcodejs2-fix'
import { onMounted, ref } from 'vue'
import { request } from '~/util/config'

let mobileActive = ref(0)
const mobileTabs = ['平板电脑', '手机']
const moblieClick = (index: number) => {
  mobileActive.value = index
}
let qrcode1 = ref(null)
let qrcode2 = ref(null)
let qrcode3 = ref(null)
let qrcode4 = ref(null)

function getQrcode3() {
  request
    .GET('/py/admin/client/version', {
      release_type: 2,
    })
    .then((res: any) => {
      if (res.status === 1) {
        let softwareList = res.data.version_list
        let phoneAD = new Array()
        softwareList.forEach((v: any) => {
          if (v.is_display === 1) {
            // 手机安卓
            phoneAD.push(v)
          }
        })
        let phoneADUrl =
          'https://eggrj.com/downloadTips.html?url=' +
          (phoneAD.length !== 0 ? phoneAD[0].download_url : '')
        new QRCode(qrcode3.value, {
          text: phoneADUrl,
          width: 75,
          height: 75,
          correctLevel: QRCode.CorrectLevel.H,
        })
      } else {
        Message({
          message: '获取手机安卓列表出错',
          type: 'error',
        })
      }
    })
  request
    .GET('/py/admin/client/version', {
      release_type: 3,
    })
    .then((res: any) => {
      if (res.status === 1) {
        let softwareList = res.data.version_list
        let ipadAD = new Array()
        softwareList.forEach((v: any) => {
          if (v.is_display === 1) {
            // 平板安卓
            ipadAD.push(v)
          }
        })
        let ipadAndroidUrl =
          'https://eggrj.com/downloadTips.html?url=' +
          (ipadAD.length !== 0 ? ipadAD[0].download_url : '')
        new QRCode(qrcode1.value, {
          text: ipadAndroidUrl,
          width: 75,
          height: 75,
          correctLevel: QRCode.CorrectLevel.H,
        })
      } else {
        Message({
          message: '获取平板安卓列表出错',
          type: 'error',
        })
      }
    })
}
onMounted(() => {
  getQrcode3()
  new QRCode(qrcode2.value, {
    text: 'https://eggrj.com/mobile/index.html',
    width: 75,
    height: 75,
    correctLevel: QRCode.CorrectLevel.H,
  })
  new QRCode(qrcode4.value, {
    text: 'https://eggrj.com/mobile/index.html',
    width: 75,
    height: 75,
    correctLevel: QRCode.CorrectLevel.H,
  })
})
</script>

<style lang="scss" scoped>
.download-detail {
  width: 258px;
  height: 258px;
  margin: 15px;
  cursor: pointer;
  font-family: PingFangSC-Medium, 'PingFang SC';
  .title {
    font-weight: 500;
    font-size: 16px;
  }
  .subtitle {
    margin: 8px 0 10px;
    color: #999;
    font-size: 14px;
  }
  .details {
    display: flex;
    flex-wrap: wrap;
    width: 258px;
    margin-top: 15px;
    color: #5f98ff;
    font-weight: 400;
    font-size: 16px;

    > .code-name {
      width: 157px;
      height: 40px;
      margin-right: 32px;
      margin-bottom: 24px;
      color: #5f98ff;
      line-height: 40px;
      text-align: center;
      border: 1px solid #5f98ff;
      border-radius: 24px;
    }

    #code {
      width: 75px;
      height: 75px;
      margin-right: 38px;
      display: flex;
      flex-direction: column;

      align-items: center;
      .code-name {
        width: 100px;
        margin-top: 10px;
        color: #000;
        font-weight: 300;
        font-size: 14px;
        text-align: center;
      }
    }
  }
  .tabs-box {
    width: 223px;
    margin-right: 82px;
    border-bottom: 1px solid #e5e5e5;

    .tabs {
      display: flex;
      gap: 50px;
      .tabs-item {
        padding-bottom: 8px;
        font-size: 14px;
      }

      .tabs-item {
        &:hover {
          color: #5f98ff;
          border-bottom: 1px solid #5f98ff;
        }
      }

      .tabs-active {
        color: #5f98ff;
        border-bottom: 1px solid #5f98ff;
      }
    }
  }
}
</style>
