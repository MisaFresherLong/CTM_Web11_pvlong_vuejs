<template>
  <div class="m-table-paging">
    <div class="m-table-paging__total">Tổng số: <strong>4</strong> bản ghi</div>
    <div class="m-table-pagin__rightPanel">
      <!-- dropdownlist top start -->
      <div
        id="recordPerPageDropDown"
        class="m-dropdownlist --init-first --toplist"
      >
        <!-- textfield with icon start -->
        <div class="m-textfield">
          <div class="m-input-container">
            <input
              class="m-input-container__input"
              type="text"
              name="input"
              placeholder="Placeholder"
            />
            <button
              type="button"
              class="m-input-container__icon m-icon"
            ></button>
            <div class="m-dropdownlist-data">
              <div class="m-dropdownlist-data__item">
                10 bản ghi trên 1 trang
              </div>
              <div class="m-dropdownlist-data__item">
                20 bản ghi trên 1 trang
              </div>
              <div class="m-dropdownlist-data__item">
                30 bản ghi trên 1 trang
              </div>
              <div class="m-dropdownlist-data__item">
                50 bản ghi trên 1 trang
              </div>
              <div class="m-dropdownlist-data__item">
                100 bản ghi trên 1 trang
              </div>
            </div>
          </div>
        </div>
        <!-- textfield with icon end -->
      </div>
      <!-- dropdownlist top end -->
      <div class="m-table-paging__previousPage">Trước</div>
      <div class="m-table-paging__list-page">
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>...</li>
        <li>50</li>
      </div>
      <div class="m-table-paging__nextPage">Sau</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
