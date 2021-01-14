<!--
 * @Author: your name
 * @Date: 2020-08-18 10:27:04
 * @LastEditTime: 2021-01-14 17:25:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /duoyevue/src/pages/newbornzone/newbornzone.vue
-->
<style lang="scss" scoped>
@import "./style/newbornzone.scss";
</style>
<template>
  <div class="wrapper" id="wrapper" v-cloak>
      page body
  </div>
</template>
<script>
// import { InfiniteScroll } from 'mint-ui';
import Request from '@/utils/https';
import {
  exac_domain,
} from "@/utils/tool";

export default {
  // directives: { InfiniteScroll },
  data() {
    return {
      
    };
  },
  mounted() {
    const _this = this;
    // _this.getList(_this.page);
    // this.listenScroll();
  },
  beforeDestroy() {
    // $(window).unbind("scroll");
  },
  methods: {
    
    
  },
};
</script>
