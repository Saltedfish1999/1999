<template>
  <van-tabbar v-model="active">
    <van-tabbar-item
      v-for="item in router.options.routes[0].children"
      :icon="item.meta.icon"
      key="item.path"
      :url="`#/${item.path}`"
      >{{ item.meta.name }}
    </van-tabbar-item>
  </van-tabbar>
  <RouterView />
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
const active = ref(0); // 创建active的双向绑定
const router = useRouter(); // 创建router实例
const route = useRoute();
onMounted(() => {
  console.log(router);
  const data = router.options.routes[0];
  console.log(data);

  active.value = data.children.findIndex(
    (item) => "/" + item.path === route.path
  );
});
</script>
