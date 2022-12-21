<template>
  <div id="employee-page">
    <the-header></the-header>
    <the-sidebar></the-sidebar>
    <the-main></the-main>
  </div>

  <employee-form v-if="$store.state.uiModule.isFormShow"></employee-form>

  <m-dialog></m-dialog>
  <m-notify></m-notify>
  <m-loading></m-loading>
</template>

<script>
import TheHeader from "./components/layouts/TheHeader.vue";
import TheSidebar from "./components/layouts/TheSidebar.vue";
import TheMain from "./components/layouts/TheMain.vue";
import EmployeeForm from "./components/EmployeeForm.vue";
import MNotify from "./components/base/MNotify.vue";
import MDialog from "./components/base/MDialog.vue";
import MLoading from "./components/base/MLoading.vue";
export default {
  name: "App",
  components: {
    TheHeader,
    TheSidebar,
    TheMain,
    EmployeeForm,
    MNotify,
    MDialog,
    MLoading,
  },
  mounted() {
    // this.debug(this.$constants);
    // this.debug(this.$enums);
  },
  methods: {},
};
</script>

<style>
@import url("./css/common.css");
@import url("./css/main.css");
</style>
