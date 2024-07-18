<!-- 
  1. 给tab-control绑定属性和点击方法
      :titles="names"
      @tabItemClick="tabClick"
  2. 给其他组件绑定属性name和动态绑定ref(绑定一个函数)
    :ref="getSectionRef" name="描述"
  3. 定义属性和方法
    const sectionEls = ref({})
    const names = computed(() => {
      return Object.keys(sectionEls.value)
    })
    const getSectionRef = (value) => {
      const name = value.$el.getAttribute("name")
      sectionEls.value[name] = value.$el
    }
    const tabClick = (index) => {
      const key = Object.keys(sectionEls.value)[index]
      const el = sectionEls.value[key]
      let instance = el.offsetTop
      if (index !== 0) {
        instance = instance - 44
      }

      detailRef.value.scrollTo({
        top: instance,
        behavior: "smooth"
      })
    }
-->
<template>
  <div class="detail top-page" ref="detailRef">
    <tab-control
      v-if="showTabControl"
      class="tabs"
      :titles="names"
      @tabItemClick="tabClick"
    />
    <van-nav-bar 
      title="房屋详情" 
      left-text="旅途" 
      left-arrow 
      @click-left="onClickLeft" 
    />

    <!-- 绑定v-memo="[mainPart]"实现只监听某个属性的变化 -->
    <div class="main" v-if="mainPart" v-memo="[mainPart]">
      <detail-swipe :swipe-data="mainPart.topModule.housePicture.housePics" />
      <detail-infos :ref="getSectionRef" name="描述" :top-infos="mainPart.topModule" />
      <detail-facility :ref="getSectionRef" name="设施" :house-facility="mainPart.dynamicModule.facilityModule.houseFacility" />
      <detail-landlord  :ref="getSectionRef" name="房东" :landlord="mainPart.dynamicModule.landlordModule" />
      <detail-comment :ref="getSectionRef" name="评论" :comment="mainPart.dynamicModule.commentModule" />
      <detail-notice :ref="getSectionRef" name="须知" :order-rules="mainPart.dynamicModule.rulesModule.orderRules" />
      <detail-map :ref="getSectionRef" name="周边" :position="mainPart.dynamicModule.positionModule" />
      <detail-intro :price-intro="mainPart.introductionModule" />
    </div>
    <div class="footer">
      <img src="@/assets/img/detail/icon_ensure.png" alt="">
      <div class="text">弘源旅途, 永无止境!</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { getDetailInfos } from '@/services'

import TabControl from "@/components/tab-control/tab-control.vue"
import DetailSwipe from "./cpns/detail_01-swipe.vue"
import DetailInfos from "./cpns/detail_02-infos.vue"
import DetailFacility from "./cpns/detail_03-facility.vue"
import DetailLandlord from "./cpns/detail_04-landlord.vue"
import DetailComment from "./cpns/detail_05-comment.vue"
import DetailNotice from "./cpns/detail_06-notice.vue"
import DetailMap from "./cpns/detail_07-map.vue"
import DetailIntro from "./cpns/detail_08-intro.vue"
import useScroll from '@/hooks/useScroll'

const router = useRouter()
const route = useRoute()
const houseId = route.params.id

// 发送网络请求
const detailInfos = ref({})
const mainPart = computed(() => detailInfos.value.mainPart)
getDetailInfos(houseId).then(res => {
  detailInfos.value = res.data
})

// 监听返回按钮的点击
const onClickLeft = () => {
  router.back()
}

// tabControl相关的操作
const detailRef = ref()
const { scrollTop } = useScroll(detailRef)
const showTabControl = computed(() => {
  return scrollTop.value >= 300
})

//实现点击对应顶部导航栏跳转到相应高度位置
// const landlordRef = ref()
// const sectionEls = []
// const getSectionRef = (value) => {
//   sectionEls.push(value.$el)
// }
const sectionEls = ref({})
const names = computed(() => {
  return Object.keys(sectionEls.value)
})
const getSectionRef = (value) => {
  // .$el获取根元素
  if(!value) return
  const name = value.$el.getAttribute("name")
  sectionEls.value[name] = value.$el
}
const tabClick = (index) => {
  const key = Object.keys(sectionEls.value)[index]
  const el = sectionEls.value[key]
  let instance = el.offsetTop
  if (index !== 0) {
    instance = instance - 44
  }

  detailRef.value.scrollTo({
    top: instance,
    behavior: "smooth"
  })
}
</script>

<style lang="less" scoped>
.tabs {
  position: fixed;
  z-index: 9;
  left: 0;
  right: 0;
  top: 0;
}
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;

  img {
    width: 123px;
  }

  .text {
    margin-top: 12px;
    font-size: 12px;
    color: #7688a7;
  }
}</style>