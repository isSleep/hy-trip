<template>
  <div class="detail">
    <van-nav-bar
      title="房屋详情"
      left-text="旅途"
      left-arrow
      @click-left="onClickLeft"
    />
  </div>
  <div class="main" v-if="mainPart">
    <detail-swipe :swipe-data="mainPart.topModule.housePicture.housePics"/>
    <detail-infos :top-infos="mainPart.topModule" />
    <detail-facility name="设施"  :house-facility="mainPart.dynamicModule.facilityModule.houseFacility"/>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute,useRouter } from 'vue-router';
import { getDetailInfos } from '@/services'
import DetailSwipe from "./cpns/detail_01-swipe.vue"
import DetailInfos from "./cpns/detail_02-infos.vue"
import DetailFacility from "./cpns/detail_03-facility.vue"
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


</script>

<style lang="less" scoped>

</style>