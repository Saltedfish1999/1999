<template>
  <div class="container">
    <div class="header">
      <van-icon
        name="arrow-left"
        class="header-left"
        size="30"
        @click="goBack()"
      />
      订单详情
    </div>
    <statusBar :item="colorMap[detailData.trade_state]" />
    <div class="tips">
      <div class="dzf" v-if="detailData.trade_state === '待支付'">
        <div class="text1">订单待支付</div>
        <div class="text3">
          <van-button @click="showPay = true" type="success"
            >立即支付</van-button
          >
        </div>
      </div>
      <div class="dzf" v-if="detailData.trade_state === '待服务'">
        <div class="text1">正在为你安排员工</div>
        <div class="text3">员工稍后会联系你</div>
      </div>
      <div class="dzf" v-if="detailData.trade_state === '已完成'">
        <div class="text1">已完成</div>
        <div class="text3">谢谢你的信任</div>
      </div>
      <div class="dzf" v-if="detailData.trade_state === '已取消'">
        <div class="text1">订单已取消</div>
        <div class="text3">请挑选其他服务</div>
      </div>
    </div>
    <van-cell-group class="card">
      <div class="header-text">预约信息</div>
      <van-cell
        v-for="(item, key) in makeInfo"
        key="key"
        :title="item"
        :value="formatData(key)"
      />
    </van-cell-group>
    <van-cell-group class="card">
      <div class="header-text">订单信息</div>
      <van-cell
        v-for="(item, key) in orderInfo"
        key="key"
        :title="item"
        :value="formatData(key)"
      />
    </van-cell-group>
    <van-dialog v-model:show="showPay" :showConfirmButton="false">
      <van-icon name="close" @click="closePay" style="float: right" />
      <van-image :src="imageUrl" width="150" height="150" />
    </van-dialog>
  </div>
</template>
<script setup>
import { useRouter, useRoute } from "vue-router";
import { reactive, getCurrentInstance, onMounted, ref, computed } from "vue";
import statusBar from "../../components/statusBar.vue";
import QRCode from "qrcode";

const { proxy } = getCurrentInstance();

const router = useRouter();
const route = useRoute();
//详情页数据
const detailData = reactive({});

const colorMap = {
  待支付: 10,
  待服务: 20,
  已支付: 30,
  已取消: 40,
};
//订单详情
const makeInfo = {
  service_name: "预约服务",
  hospital_name: "就诊医院",
  starttime: "期望就诊时间",
  "client.name": "就诊人",
  "client.mobile": "就诊人电话",
  receiveAddress: "接送地址",
  demand: "其他要求",
};
const orderInfo = {
  tel: "就诊人电话",
  order_start_time: "下单时间",
  price: "应付金额",
  out_trade_no: "订单编号",
};
//支付弹窗
const showPay = ref(false);
const imageUrl = ref("");

onMounted(async () => {
  const { data } = await proxy.$api.orderDetail({ oid: route.query.oid });
  Object.assign(detailData, data.data);
  QRCode.toDataURL(data.data.code_url).then((url) => {
    console.log(url);
    imageUrl.value = url;
  });
  console.log(detailData);
});
/**
 * 返回上一级
 */
const goBack = () => {
  router.go(-1);
};
/**
 * 关闭支付弹窗
 */
const closePay = () => {
  showPay.value = false;
  // router.push("/order");
};

const formatData = (key) => {
  if (key.indexOf(".") === -1) {
    if (key === "order_start_time") {
      return formatTimestamp(detailData[key]);
    }
    return detailData[key];
  }
  let arr = key.split(".").reduce((o, p) => {
    return (o || {})[p];
  }, detailData);
  return arr;
};
function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 月份是从0开始的，所以需要+1
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
</script>
<style lang="less" scoped>
.container {
  background-color: #f0f0f0;
  height: 100vh;
}
.header {
  background-color: #fff;
  line-height: 40px;
  text-align: center;
  .header-left {
    float: left;
  }
}
.card {
  margin: 15px 0;
  padding: 10px;
  .header-text {
    padding-left: 5px;
    line-height: 30px;
    font-size: 16px;
    font-weight: bold;
    border-left: 4px solid red;
  }
}
.dzf {
  padding: 20px;
  .text1 {
    font-size: 20px;
    font-weight: bold;
    line-height: 30px;
    color: #666;
  }
  .text2 {
    font-size: 14px;
    color: #666;
  }
  .text3 {
    text-align: center;
    .van-button {
      margin-top: 10px;
      margin-left: 10px;
      width: 80%;
      font-weight: bold;
    }
  }
}
::v-deep(.van-dialog__content) {
  text-align: center;
  padding: 20px;
  .close {
    position: absolute;
    left: 20px;
  }
}
</style>
