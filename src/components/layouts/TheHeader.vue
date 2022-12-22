<template>
  <div class="header">
    <div class="header-left-panel">
      <div
        id="header__menu-icon"
        class="header__menu-icon m-icon icon-24 icon-menu"
      ></div>
      <div class="header__company">
        CÔNG TY TNHH SẢN XUẤT - THƯƠNG MẠI - DỊCH VỤ QUI PHÚC
      </div>
      <div class="header__drop-icon m-icon icon-20 icon-angle-down"></div>
    </div>
    <div class="header-right-panel">
      <div class="header__notification-icon icon-24 icon-notifycation"></div>
      <div class="header-user">
        <div class="header-user__thumbnail icon-32 icon-user-thumbnail"></div>
        <div class="header-user__name">Nguyễn Văn Mạnh</div>
        <div
          class="header-user__drop-icon m-icon icon-20 icon-angle-down"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "TheHeader",
  mounted() {
    this.initEvent();
  },
  methods: {
    /**
     * Khởi tạo sự kiện
     * Author: PVLong (19/12/2022)
     */
    initEvent() {
      // Xử lý sự kiện đóng mở sidebar
      $("#header__menu-icon").click(this.toggleSidebar);
    },

    /**
     * Xử lý sự kiện đóng mở sidebar
     * Author: PVLong (19/12/2022)
     */
    toggleSidebar() {
      $("#employee-page").toggleClass("--sidebar-close");
    },
  },
};
</script>

<style></style>
