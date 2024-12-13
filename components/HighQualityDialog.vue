<template>
  <el-dialog
    title="高品质效果图"
    :visible.sync="$props.visible"
    :before-close="$props.onClose"
  >
    <div class="card-dialog">
      <div class="left">
        <div
          v-for="card in $props.cardList"
          :key="card.id"
          class="card"
          :class="{ active: selectedCard?.id === card.id }"
          @mouseover="handleSelectCard(card)"
        >
          <img :src="card.roomImgUrl" class="card-pre-img" alt="" />
          <div class="title">{{ card.roomTitle }}</div>
        </div>
      </div>
      <div class="right">
        <div class="right-img-box">
          <img :src="selectedCard.roomImgUrl" alt="" />
          <div class="room-title">{{ selectedCard.roomTitle }}</div>
        </div>

        <el-divider></el-divider>
        <div class="right-footer">
          <div class="btn-left" @click="handlePresious">
            <div v-if="leftBtn">
              <img src="~/static/img/chevron/chevron-left-circle.png" alt="" />
              <div>上一个</div>
            </div>
            <div v-else>
              <img
                src="~/static/img/chevron/chevron-left-circle-gray.png"
                alt=""
              />
              <div class="btn-gray">上一个</div>
            </div>
          </div>
          <div class="btn-right" @click="handleNext">
            <div v-if="rightBtn">
              <img src="~/static/img/chevron/chevron-right-circle.png" alt="" />
              <div>下一个</div>
            </div>
            <div v-else>
              <img
                src="~/static/img/chevron/chevron-right-circle-gray.png"
                alt=""
              />
              <div class="btn-gray">下一个</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

// import { HighQualityType } from '~/pages/index.vue'
interface HighQualityType {
  id: string
  roomImgUrl: string
  roomTitle: string
  roomTag: string
  roomIntro: string
}
export default Vue.extend({
  name: 'HighQualityDialog',
  data() {
    return {
      leftBtn: true,
      rightBtn: true,
      selectedCard: {
        id: '',
        roomImgUrl: '',
        roomTitle: '',
        roomTag: '',
        roomIntro: '',
      },
    }
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    title: {
      default: '标题',
      type: String,
      required: false,
    },
    onClose: {
      default: () => {},
      type: Function,
      required: false,
    },
    cardList: {
      default: () => [],
      type: Array as PropType<HighQualityType[]>,
    },
    card: {
      default: () => {},
      type: Object as PropType<HighQualityType>,
    },
  },
  methods: {
    handleSelectCard(c: HighQualityType) {
      this.selectedCard = c
      this.handleTop()
      this.handleBottom()
    },
    handlePresious() {
      let currentIndex = this.$props.cardList.indexOf(this.selectedCard)
      if (currentIndex - 1 >= 0) {
        this.selectedCard = this.$props.cardList[currentIndex - 1]
      }
      // else {
      //   this.selectedCard =
      //     this.$props.cardList[this.$props.cardList.length - 1]
      // }
      this.handleTop()
      this.handleBottom()
    },
    handleNext() {
      let currentIndex = this.$props.cardList.indexOf(this.selectedCard)
      if (currentIndex + 1 < this.$props.cardList.length) {
        this.selectedCard = this.$props.cardList[currentIndex + 1]
      }
      // else {
      // this.selectedCard = this.$props.cardList[0]
      // }
      this.handleTop()
      this.handleBottom()
    },
    // 判断是否首图
    handleTop() {
      let currentIndex = this.$props.cardList.indexOf(this.selectedCard)
      this.leftBtn = currentIndex == 0 ? false : true
    },
    // 判断是否尾图
    handleBottom() {
      let currentIndex = this.$props.cardList.indexOf(this.selectedCard)
      this.rightBtn = currentIndex == 7 ? false : true
    },
  },
  watch: {
    card: {
      handler(c) {
        this.selectedCard = c
        this.leftBtn = this.selectedCard.id == 'HQ001' ? false : true
        this.rightBtn = this.selectedCard.id == 'HQ008' ? false : true
      },
      immediate: true,
    },
  },
})
</script>

<style lang="scss" scoped>
::v-deep .el-dialog {
  border-radius: 0;
  width: 1040px;
  .el-dialog__header {
    .el-dialog__title {
      font-size: 16px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.9);
    }
  }
  .el-dialog__body {
    box-sizing: border-box;
    padding: 0;
    .card-dialog {
      width: 100%;
      display: flex;
      justify-content: space-between;

      .left {
        padding: 24px;
        width: 240px;
        height: 432px;
        border-top: 1px solid #e7e7e7;
        display: flex;
        flex-wrap: wrap;
        align-content: space-between;
        justify-content: space-between;
        .card {
          width: 112px;
          height: 96px;
          cursor: pointer;
          text-align: center;
          line-height: 30px;
          display: flex;
          flex-direction: column;
          margin-bottom: 20px;
          background: #eeeeee;
          .title {
            height: 32px;
            font-size: 14px;
            font-family: PingFang SC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(0, 0, 0, 0.9);
            line-height: 32px;
          }
        }
        .active {
          outline: 1px solid #ed7b2f;
        }
      }
      .right {
        box-sizing: border-box;
        flex: 1;
        border-top: 1px solid #e7e7e7;
        border-left: 1px solid #e7e7e7;
        .right-img-box {
          padding: 24px 24px 0px 24px;
          height: 542px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 702px;
          > img {
            width: 100%;
            height: 100%;
          }
          > .room-title {
            height: 76px;
            background: #ffffff;
            font-size: 20px;
            font-family: PingFang SC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(0, 0, 0, 0.9);
            line-height: 76px;
          }
        }
        .right-footer {
          height: 116px;
          display: flex;
          align-items: center;
          justify-content: center;
          .btn-left,
          .btn-right {
            cursor: pointer;
            &:nth-of-type(1) {
              margin-right: 100px;
            }
            > div {
              display: flex;
              flex-direction: column;
              align-items: center;
              > img {
                width: 24px;
                height: 24px;
              }
              > div {
                font-family: PingFang SC-Regular, PingFang SC;
                font-weight: 400;
                line-height: 22px;
                margin-top: 8px;
              }
              .btn-gray {
                color: rgba(0, 0, 0, 0.4);
              }
            }
          }
        }
      }
    }
  }
}
</style>
