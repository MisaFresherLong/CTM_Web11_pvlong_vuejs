<template>
  <the-header></the-header>
  <the-sidebar></the-sidebar>
  <div>Main</div>
</template>

<script>
import TheHeader from "./TheHeader.vue";
import TheSidebar from "./TheSidebar.vue";
export default {
  components: { TheHeader, TheSidebar },
  name: "TheMain",
};
</script>

<style></style>
