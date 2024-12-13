<template>
  <div class="g-region fs14 no-select relative">
    <div
      class="flex-cross--center flex-main--center flex cursor-pointer"
      :class="['selected', isShow ? 'active' : '']"
      @click="handleSelect"
    >
      <div>{{ areaCode }}</div>
      <!-- <img
        width="6"
        height="3"
        src="@/assets/img/my_icon_downarrow.png"
        alt=""
        class="arrow ml4"
      /> -->
    </div>
    <!-- 选择国家部分 -->
    <div class="selector br2 absolute bg-white" v-show="isShow">
      <input
        @input="onInput"
        class="w100 pv8 ph16"
        type="number"
        v-model="searchVal"
        placeholder="请输入"
      />
      <div
        class="flex-dir--top ph16 pv9 container flex"
        v-for="(item, index) in filterList"
        :key="index"
        @click="handlePick(index)"
      >
        <div class="option flex-main--justify flex">
          <div>{{ item.country }}</div>
          <div>{{ item.area_code }}</div>
        </div>
      </div>
    </div>
    <div
      class="close-all t0 b0 r0 l0 fixed"
      v-show="isShow"
      @click="handleCloseModel"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { request } from '~/util/config'

const props = defineProps({
  areaCode: {
    type: String,
    default: '+86',
  },
})

const emits = defineEmits(['changeareaCode'])

const searchVal = ref('')
const isShow = ref(false)
const areaCodeList = ref([])
const filterList = ref([])

const currentIndex = computed(() => {
  return areaCodeList.value.findIndex(
    (item) => item.area_code === props.areaCode
  )
})

onMounted(() => {
  getList()
})

const getList = () => {
  request.GET('/py/get_area_phone_code', '').then((res) => {
    areaCodeList.value = res.data
    filterList.value = res.data
  })
}

const onInput = (event) => {
  if (searchVal.value) {
    filterList.value = areaCodeList.value.filter((item) =>
      item.area_code.includes(searchVal.value)
    )
  } else {
    filterList.value = areaCodeList.value
  }
}

const handleCloseModel = () => {
  isShow.value = false
  searchVal.value = ''
  filterList.value = areaCodeList.value
}

const handleSelect = () => {
  isShow.value = !isShow.value
}

const handlePick = (index) => {
  const selectedAreaCode = areaCodeList.value[index].area_code
  emits('changeareaCode', selectedAreaCode)
  isShow.value = false
}
</script>

<style scoped lang="scss">
::v-deep input::-webkit-inner-spin-button {
  appearance: none !important;
}
.g-region {
  font-weight: 400;
  color: #545556;
  .selected {
    .arrow {
      background: #545556;
    }
  }
  // 动态转向箭头
  .active img {
    transform: rotateZ(180deg);
  }
  .selector {
    z-index: 10;
    top: 26px;
    left: -17px;
    width: 218px;
    max-height: 400px;
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15);
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 4px;
      background: #fff;
    }
    &::-webkit-scrollbar-thumb {
      width: 4px;
      height: 2px;
      border-radius: 10px;
      background: #cecece;
    }
    &::-webkit-scrollbar-track {
      border-radius: 0;
      height: 2px;
      background: #fff;
    }
    .container {
      gap: 16px;

      &:hover {
        background: #cecece;
      }
    }
  }
  // 关闭选择页面
  .close-all {
    z-index: 5;
  }
}

</style>
