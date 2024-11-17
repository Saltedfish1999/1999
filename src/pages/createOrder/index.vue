<template>
  <div class="container">
    <div class="header">
      <van-icon
        name="arrow-left"
        class="header-left"
        size="30"
        @click="goBack()"
      />
      填写服务订单
    </div>
    <statusBar item="0" />
    <van-cell class="cell">
      <template #title>
        <van-image
          width="25"
          height="25"
          :src="createInfo.service.serviceImg"
        />
        <span style="margin-left: 10px">{{
          createInfo.service.serviceName
        }}</span>
      </template>
      <template #default>
        <div>服务内容</div>
      </template>
    </van-cell>
    <van-cell-group class="cell">
      <van-cell>
        <template #title>就诊医院 </template>
        <template #default>
          <div class="cell-text" @click="showHopitals = true">
            {{ form.hospital_name || "选择医院" }}
            <van-icon name="arrow" />
          </div>
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group class="cell">
      <van-cell>
        <template #title>就诊时间 </template>
        <template #default>
          <div class="cell-text" @click="showDatePicker = true">
            {{ current || "请选择就诊时间" }}
            <van-icon name="arrow" />
          </div>
        </template>
      </van-cell>
    </van-cell-group>
    <van-popup
      v-model:show="showHopitals"
      position="bottom"
      :style="{ height: '30%' }"
    >
      <van-picker
        :columns="showHospColumns"
        @confirm="hospConfirm"
        @cancel="showHopitals = false"
      />
    </van-popup>
    <van-popup
      v-model:show="showDatePicker"
      position="bottom"
      :style="{ height: '30%' }"
    >
      <van-date-picker
        title="选择日期"
        :min-date="minDate"
        @cancel="showDatePicker = false"
        @confirm="timeConfirm"
      />
    </van-popup>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import { reactive, getCurrentInstance, onMounted, ref, computed } from "vue";
import statusBar from "../../components/statusBar.vue";

const router = useRouter();
//获取当前vue实例
const { proxy } = getCurrentInstance();

// 选择医院
const showHopitals = ref(false);
//选择就诊时间
const showDatePicker = ref(false);
const minDate = ref(new Date());
const current = ref();

const createInfo = reactive({
  companion: [],
  hospitals: [],
  service: [],
});

const form = reactive({
  hospital_id: "",
  hospital_name: "",
  demand: "",
  companion_id: 0,
  receiveAddress: "",
  tel: "",
  starttime: "",
});

onMounted(async () => {
  const { data } = await proxy.$api.h5Companion();
  Object.assign(createInfo, data.data);
  console.log(createInfo);
});
/**
 * 监听选择滑动菜单的变化
 */
const showHospColumns = computed(() => {
  return createInfo.hospitals.map((item) => {
    return { text: item.name, value: item.id };
  });
});
/**
 * 提交选择开始时间的点击事件
 */
const timeConfirm = (item) => {
  console.log(item);
  const dateStr = item.selectedValues.join("-");
  current.value = dateStr;
  form.starttime = new Date(dateStr).getTime();
  showDatePicker.value = false;
};
/**
 * 提交选择医院点击事件
 */
const hospConfirm = (item) => {
  console.log(item);
  form.hospital_id = item.selectedOptions[0].value;
  form.hospital_name = item.selectedOptions[0].text;
  showHopitals.value = false;
};
/**
 * 返回上一级
 */
const goBack = () => {
  router.go(-1);
};
</script>

<style lang="less" scoped>
.container {
  height: 100vh;
  background-color: #f0f0f0;
}
.header {
  text-align: center;
  line-height: 30px;
  padding: 10px 0;
  font-size: 15px;
  .header-left {
    float: left;
  }
}
.cell {
  width: 95%;
  margin: 5px auto;
  background-color: #fff;
  ::v-deep(.van-field__control) {
    color: var(--van-cell-value-color);
  }
  ::v-deep(.van-cell__title) {
    display: flex;
    align-items: center;
  }
  .server-name {
    margin-left: 10px;
  }
}
</style>
