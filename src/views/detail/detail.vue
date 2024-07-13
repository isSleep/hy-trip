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
    <detail-landlord name="房东"  :landlord="mainPart.dynamicModule.landlordModule"/>
      <detail-comment name="评论"  :comment="mainPart.dynamicModule.commentModule"/>
      <detail-notice name="须知"  :order-rules="mainPart.dynamicModule.rulesModule.orderRules"/>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute,useRouter } from 'vue-router';
import { getDetailInfos } from '@/services'
import DetailSwipe from "./cpns/detail_01-swipe.vue"
import DetailInfos from "./cpns/detail_02-infos.vue"
import DetailFacility from "./cpns/detail_03-facility.vue"
import DetailLandlord from "./cpns/detail_04-landlord.vue"
import DetailComment from "./cpns/detail_05-comment.vue"
import DetailNotice from "./cpns/detail_06-notice.vue"
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