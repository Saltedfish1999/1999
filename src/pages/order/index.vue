<template>
  <div class="container">
    <div class="header">订单</div>
    <van-tabs v-model:active="active" @click-tab="onClickTab">
      <van-tab title="全部" name="" />
      <van-tab title="待支付" name="1" />
      <van-tab title="待服务" name="2" />
      <van-tab title="已完成" name="3" />
      <van-tab title="已取消" name="4" />
    </van-tabs>
    <van-row
      @click="goDetaile(item)"
      justify="space-around"
      class="yy-list"
      v-for="(item, index) in order"
      :key="item.out_trade_no"
    >
      <van-col span="5">
        <van-image :src="item.serviceImg" width="50" height="50" radius="5" />
      </van-col>
      <van-col class="yy" span="16">
        <div class="text1">{{ item.service_name }}</div>
        <div class="text2">{{ item.hospital_name }}</div>
        <div class="text2">{{ "预约时间" + item.starttime }}</div>
      </van-col>
      <van-col
        spa="5"
        class="text2"
        :style="{ color: colorMap[item.trade_state] }"
      >
        {{ item.trade_state }}
      </van-col>
    </van-row>
    <div class="bottom-text">没有更多了</div>
  </div>
</template>
<script setup>
import { ref, reactive, getCurrentInstance, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const colorMap = {
  待支付: "#ffa200",
  待服务: "#1da6fd",
  已支付: "#21c521",
};
//获取当前vue实例
const { proxy } = getCurrentInstance();
const active = ref("");
const order = ref([]);
onMounted(() => {
  getOrderList();
});
/**
 * 获取订单列表
 */
const getOrderList = async (state) => {
  const { data } = await proxy.$api.orderList({ state });
  order.value = data.data;
  console.log(data);
};
/**
 * 点击跳转按钮
 */
const onClickTab = (item) => {
  getOrderList(item.name);
};
/**
 * 进入订单详情
 */
const goDetaile = (item) => {
  router.push(`/detail?oid=${item.out_trade_no}`);
};
</script>
<style lang="less" scoped>
.container {
  height: 100vh;
  background-color: #f0f0f0;
}
.header {
  text-align: center;
  background-color: #fff;
  line-height: 40px;
}
.van-row {
  background-color: #fff;
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
  .text1 {
    font-size: 16px;
    line-height: 25px;
    font-weight: bold;
  }
  .text2 {
    font-size: 14px;
    line-height: 20px;
    color: #999999;
  }
}
.bottom-text {
  line-height: 50px;
  text-align: center;
  color: #999999;
}
</style>
