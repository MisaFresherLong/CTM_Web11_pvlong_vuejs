<template>
  <form id="employee-form">
    <!-- popup component start -->
    <div class="m-popup">
      <!-- popup container start -->
      <div class="m-popup-container">
        <!-- popup body start -->
        <div class="m-popup-container__body">
          <!-- popup header start-->
          <div class="m-popup-body__header">
            <div class="m-popup-body__heading">
              <div class="m-popup-body__title employee-form-body__title">
                Thông tin nhân viên
              </div>
              <!-- horizontal checkbox start-->
              <div class="m-textfield">
                <div class="m-radio-container m-radio-container--hor">
                  <div class="m-radio-item">
                    <input
                      class="m-radio-item__input"
                      type="checkbox"
                      name="isCustomer"
                      placeholder=""
                      value="isCustomer"
                      id="m-radio-customer"
                    />
                    <label class="m-radio-item__label" for="m-radio-customer"
                      >Là khách hàng</label
                    >
                  </div>
                  <div class="m-radio-item">
                    <input
                      class="m-radio-item__input"
                      type="checkbox"
                      name="isSupplier"
                      placeholder=""
                      value="isSupplier"
                      id="m-radio-supplier"
                    />
                    <label class="m-radio-item__label" for="m-radio-supplier"
                      >Là nhà cung cấp</label
                    >
                  </div>
                </div>
              </div>
              <!-- horizontal checkbox end-->
            </div>
            <div class="m-button-container">
              <div
                class="m-popup-body__help-btn m-help-btn m-icon icon-24 icon-help m-icon"
              ></div>
              <div
                id="formCloseBtn"
                class="m-popup-body__close-btn m-close-btn m-icon icon-24 icon-close"
                @click="hideForm"
              ></div>
            </div>
          </div>
          <!-- popup header end-->
          <!-- popup form start-->
          <div class="m-popup-body__form">
            <div class="grid">
              <div class="row">
                <div class="col c-2">
                  <m-textfield
                    :schema="{
                      label: 'Mã',
                      type: 'text',
                      name: 'EmployeeCode',
                      placeholder: 'Mã nhân viên',
                      rules: 'required',
                      dataProperty: 'EmployeeCode',
                    }"
                    :value="formData.employeeCode"
                  ></m-textfield>
                </div>
                <div class="col c-4">
                  <m-textfield
                    :schema="{
                      label: 'Tên',
                      type: 'text',
                      name: 'EmployeeName',
                      placeholder: 'Họ và tên',
                      rules: 'required',
                      dataProperty: 'EmployeeName',
                    }"
                  ></m-textfield>
                </div>
                <div class="col c-2">
                  <m-textfield
                    :schema="{
                      label: 'Ngày sinh',
                      type: 'date',
                      name: 'dateOfBirth',
                      placeholder: 'Ngày sinh',
                      rules: '',
                      dataProperty: 'DateOfBirth',
                    }"
                  ></m-textfield>
                </div>
                <div class="col c-4">
                  <!-- horizontal radio start -->
                  <div class="m-textfield">
                    <label for="">Giới tính</label>
                    <div class="m-radio-container m-radio-container--hor">
                      <div class="m-radio-item">
                        <input
                          class="m-radio-item__input"
                          type="radio"
                          name="gender"
                          dataProperty="Gender"
                          value="0"
                          id="m-radio-nam"
                          checked
                        />
                        <label class="m-radio-item__label" for="m-radio-nam"
                          >Nam</label
                        >
                      </div>
                      <div class="m-radio-item">
                        <input
                          class="m-radio-item__input"
                          type="radio"
                          name="gender"
                          dataProperty="Gender"
                          value="1"
                          id="m-radio-nu"
                        />
                        <label class="m-radio-item__label" for="m-radio-nu"
                          >Nữ</label
                        >
                      </div>
                      <div class="m-radio-item">
                        <input
                          class="m-radio-item__input"
                          type="radio"
                          name="gender"
                          dataProperty="Gender"
                          value="2"
                          id="m-radio-khac"
                        />
                        <label class="m-radio-item__label" for="m-radio-khac"
                          >Khác</label
                        >
                      </div>
                    </div>
                    <!-- horizontal radio end -->
                  </div>
                </div>
                <div class="col c-6">
                  <!-- dropdownlist top start -->
                  <m-dropdown-list
                    :schema="{
                      label: 'Đơn vị',
                      type: 'text',
                      name: 'DepartmentID',
                      placeholder: 'Chọn đơn vị',
                      rules: 'required',
                      dataProperty: 'DepartmentID',
                    }"
                    :data="getDepartmentsKeyValue"
                  ></m-dropdown-list>
                  <!-- dropdownlist top end -->
                </div>
                <div class="col c-4">
                  <!-- normal textfield start -->
                  <div class="m-textfield">
                    <label for="" class="" title="Số chứng minh nhân dân">
                      Số CMND</label
                    >
                    <div class="m-input-container">
                      <input
                        class="m-input-container__input"
                        type="number"
                        name="identityNumber"
                        dataProperty="IdentityNumber"
                        placeholder="Số CMND"
                      />
                    </div>
                  </div>
                  <!-- normal textfield end -->
                </div>
                <div class="col c-2">
                  <!-- date textfield start-->
                  <div class="m-textfield">
                    <label for="">Ngày cấp</label>
                    <div class="m-date-container">
                      <input
                        class="m-date-container__input m-input-container__input"
                        type="date"
                        name="identityDate"
                        placeholder="Ngày cấp CMND"
                      />
                    </div>
                  </div>
                  <!-- date textfield end-->
                </div>
                <div class="col c-6">
                  <!-- normal textfield start -->
                  <div class="m-textfield">
                    <label for="" class=""> Chức danh</label>
                    <div class="m-input-container">
                      <input
                        class="m-input-container__input"
                        type="text"
                        name="positionName"
                        dataProperty="PositionName"
                        placeholder="Chức danh"
                      />
                    </div>
                  </div>
                  <!-- normal textfield end -->
                </div>
                <div class="col c-6">
                  <!-- normal textfield start -->
                  <div class="m-textfield">
                    <label for="" class=""> Nơi cấp</label>
                    <div class="m-input-container">
                      <input
                        class="m-input-container__input"
                        type="text"
                        name="identityPlace"
                        placeholder="Cơ quan cấp CMND"
                      />
                    </div>
                  </div>
                  <!-- normal textfield end -->
                </div>
                <div class="col c-12">
                  <!-- normal textfield start -->
                  <div class="m-textfield">
                    <label for="" class=""> Địa chỉ</label>
                    <div class="m-input-container">
                      <input
                        class="m-input-container__input"
                        type="text"
                        name="address"
                        placeholder="Địa chỉ tạm trú"
                      />
                    </div>
                  </div>
                  <!-- normal textfield end -->
                </div>
                <div class="col c-3">
                  <!-- normal textfield start -->
                  <div class="m-textfield">
                    <label for="" class="" title="Điện thoại di động">
                      ĐT di động</label
                    >
                    <div class="m-input-container">
                      <input
                        class="m-input-container__input"
                        type="number"
                        name="phoneNumber"
                        placeholder="Số điện thoại di động"
                      />
                      <p class="m-input-container__message"></p>
                      <button
                        type="button"
                        class="m-input-container__icon m-icon"
                        tabindex="-1"
                      ></button>
                    </div>
                  </div>
                  <!-- normal textfield end -->
                </div>
                <div class="col c-3">
                  <!-- normal textfield start -->
                  <div class="m-textfield">
                    <label for="" class="" title="Điện thoại cố định">
                      ĐT cố định</label
                    >
                    <div class="m-input-container">
                      <input
                        class="m-input-container__input"
                        type="number"
                        name="telephoneNumber"
                        placeholder="Số điện thoại cố định"
                      />
                      <p class="m-input-container__message"></p>
                      <button
                        type="button"
                        class="m-input-container__icon m-icon"
                        tabindex="-1"
                      ></button>
                    </div>
                  </div>
                  <!-- normal textfield end -->
                </div>
                <div class="col c-3">
                  <!-- normal textfield start -->
                  <div class="m-textfield">
                    <label for="" class=""> Email</label>
                    <div class="m-input-container">
                      <input
                        class="m-input-container__input"
                        type="text"
                        name="email"
                        dataProperty="Email"
                        placeholder="Thư điện tử"
                      />
                      <p class="m-input-container__message"></p>
                      <button
                        type="button"
                        class="m-input-container__icon m-icon"
                        tabindex="-1"
                      ></button>
                    </div>
                  </div>
                  <!-- normal textfield end -->
                </div>
                <div class="row">
                  <div class="col c-3">
                    <!-- normal textfield start -->
                    <div class="m-textfield">
                      <label for="" class=""> Tài khoản ngân hàng</label>
                      <div class="m-input-container">
                        <input
                          class="m-input-container__input"
                          type="number"
                          name="bankAccountNumber"
                          placeholder="Số tài khoản ngân hàng"
                        />
                        <p class="m-input-container__message"></p>
                        <button
                          type="button"
                          class="m-input-container__icon m-icon"
                          tabindex="-1"
                        ></button>
                      </div>
                    </div>
                    <!-- normal textfield end -->
                  </div>
                  <div class="col c-3">
                    <!-- normal textfield start -->
                    <div class="m-textfield">
                      <label for="" class=""> Tên ngân hàng</label>
                      <div class="m-input-container">
                        <input
                          class="m-input-container__input"
                          type="text"
                          name="bankName"
                          placeholder="Tên ngân hàng"
                        />
                        <p class="m-input-container__message">
                          nội dung message dài
                        </p>
                        <button
                          type="button"
                          class="m-input-container__icon m-icon"
                          tabindex="-1"
                        ></button>
                      </div>
                    </div>
                    <!-- normal textfield end -->
                  </div>
                  <div class="col c-3">
                    <!-- normal textfield start -->
                    <div class="m-textfield">
                      <label for="" class=""> Chi nhánh</label>
                      <div class="m-input-container">
                        <input
                          class="m-input-container__input"
                          type="text"
                          name="bankBranchName"
                          placeholder="Chi nhánh ngân hàng"
                        />
                        <p class="m-input-container__message">
                          nội dung message dài
                        </p>
                        <button
                          type="button"
                          class="m-input-container__icon m-icon"
                          tabindex="-1"
                        ></button>
                      </div>
                    </div>
                    <!-- normal textfield end -->
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- popup form end-->
        </div>
        <!-- popup body end -->
        <!-- popup footer start -->
        <div class="m-popup-container__footer m-button-container">
          <div class="m-popup-footer__right-panel m-button-container">
            <button
              class="m-popup-footer__primary-btn m-btn primary-btn"
              type="submit"
            >
              Cất và thêm
            </button>
            <button
              class="m-popup-footer__secondary-btn m-btn secondary-btn"
              type="submit"
            >
              Cất
            </button>
          </div>
          <div id="formTabIndexEnd" class="m-popup-footer__left-panel">
            <button
              id="formCancelBtn"
              type="button"
              class="m-popup-footer__cancel-btn m-btn secondary-btn"
            >
              Hủy
            </button>
          </div>
        </div>
        <!-- popup footer end -->
      </div>
      <!-- popup container end -->
    </div>
    <!-- popup end -->
  </form>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { Validator } from "../js/validator.js";

import MTextfield from "./base/MTextfield.vue";
import MDropdownList from "./base/MDropdownList.vue";
export default {
  name: "EmployeeFrom",
  components: { MTextfield, MDropdownList },
  data() {
    return {
      formFormatter: {
        date: (value) => this.dateFormatYMD(value, "-"),
        gender: (value) => {
          if (value == null) return 2;
          return value;
        },
      },
      formData: {
        employeeCode: "",
      },
    };
  },
  computed: {
    ...mapState({
      formMode: (state) => state.uiModule.formMode,
      departments: (state) => state.departmentModule.departments,
    }),
    getDepartmentsKeyValue() {
      if (!this.departments) return null;
      return this.departments.map((department) => ({
        key: department.DepartmentID,
        value: department.DepartmentName,
      }));
    },
  },
  mounted() {
    this.log("m-form mounted.....................");
    this.getDepartments();
    this.getNewEmployeeCode();
    Validator("employee-form", {
      onsubmit: this.handleSubmitForm,
    });
  },
  methods: {
    ...mapMutations(["hideForm", "setDepartments"]),
    /**
     * Xử lý sự kiện submit form
     * @param {*} payload dữ liệu đã được thu thập
     * Author: PVLong (19/12/2022)
     */
    handleSubmitForm(payload) {
      // const params = {};
      this.axios
        .post("/api/v1/Employees", payload)
        .then((res) => {
          this.debug(res.data);
        })
        .catch((err) => {
          this.log(err);
        });
    },
    /**
     * Hàm lấy dữ liệu đơn vị
     * Author: PVLong (19/12/2022)
     */
    getDepartments() {
      if (this.departments) return;
      const params = {};
      this.axios.get("/api/v1/Departments", { params }).then((res) => {
        this.debug(res.data);
        this.setDepartments(res.data);
      });
    },
    /**
     * Hàm lấy mã nhân viên mới
     * Author: PVLong (19/12/2022)
     */
    getNewEmployeeCode() {
      if (this.formMode != this.$enums.FormMode.CREATE) return;
      const params = {};
      this.axios
        .get("/api/v1/Employees/NewEmployeeCode", { params })
        .then((res) => {
          this.debug(res.data);
          this.formData.employeeCode = res.data;
        });
    },
  },
};
</script>

<style></style>
