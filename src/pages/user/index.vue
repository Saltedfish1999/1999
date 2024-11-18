<template>
  <div class="container">
    <div class="user">
      <van-image class="img" width="100" height="100" :src="userInfo.avatar" />
      <div class="text">{{ userInfo.name }}</div>
    </div>
    <div class="order">
      <div class="top">
        <div class="text1">我的订单</div>
        <div class="text2">全部</div>
      </div>
      <div class="bottom">
        <div class="item" @click="goOrder(1)">
          <van-image width="50" height="50" src="/images/od_10.png" />
          <div>待支付</div>
        </div>
        <div class="item" @click="goOrder(2)">
          <van-image width="50" height="50" src="/images/od_20.png" />
          <div>待服务</div>
        </div>
        <div class="item" @click="goOrder(3)">
          <van-image width="50" height="50" src="/images/od_30.png" />
          <div>已完成</div>
        </div>
        <div class="item" @click="goOrder(4)">
          <van-image width="50" height="50" src="/images/od_40.png" />
          <div>已取消</div>
        </div>
      </div>
    </div>
    <div class="foot">
      <div class="foot1" v-for="item in footerInfo" :key="item.name">
        <div class="text1">
          <van-image :src="item.avatar" width="20" height="20"></van-image>
          {{ item.title }}
        </div>
        <div class="text2">
          <van-icon name="arrow" />
        </div>
      </div>
    </div>
    <van-button
      class="quit"
      type="danger"
      size="large"
      @click="showClose = true"
      >退出登录</van-button
    >
    <van-dialog
      v-model:show="showClose"
      title="是否登出"
      show-cancel-button
      @confirm="logout"
    />
  </div>
</template>
<script setup>
import { ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const userInfo = computed(() => {
  return JSON.parse(localStorage.getItem("h5_userInfo"));
});
const footerInfo = reactive([
  {
    title: "服务对象管理",
    avatar: "/images/ic_clients.png",
  },
  {
    title: "分享转发",
    avatar: "/images/ic_share.png",
  },
]);
const showClose = ref(false);
/**
 * 点击跳转
 */
const goOrder = (active) => {
  router.push(`/order?active=${active}`);
};
/**
 * 点击登出
 */
const logout = () => {
  localStorage.removeItem("h5_token");
  localStorage.removeItem("h5_userInfo");
  router.push("/login");
};
</script>

<style lang="less" scoped>
.container {
  background-color: #f0f0f0;
  height: 100vh;
  overflow: hidden;
  .user {
    width: 95%;
    height: 200px;
    background-color: #fff;
    text-align: center;
    border-radius: 10px;
    margin: 10px;
    .img {
      margin-top: 30px;
    }
    .text {
      line-height: 30px;
      font-weight: bold;
    }
  }
  .order {
    width: 90%;
    margin: 10px;
    border-radius: 5px;
    background-color: #fff;
    padding: 10px;
    .top {
      margin: 10px;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
      .text1 {
        color: #333;
      }
      .text2 {
        color: #999;
      }
      border-bottom: 0.5px solid #f5f5f5;
    }
    .bottom {
      padding: 10px;
      display: flex;
      justify-content: space-around;
      .item {
        font-size: 14px;
        color: #999;
      }
    }
  }
  .foot {
    margin: 0 10px;
    padding: 10px;
    line-height: 50px;
    background-color: #fff;
    .foot1,
    .foot2 {
      display: flex;
      justify-content: space-between;
      color: #555;
    }
    .foot1 {
      border-bottom: 0.5px solid #f5f5f5;
    }
  }
  .quit {
    width: 90%;
    margin: 20px;
  }
  .quit_text {
    margin: 20px 0;
    text-align: center;
  }
}
</style>
