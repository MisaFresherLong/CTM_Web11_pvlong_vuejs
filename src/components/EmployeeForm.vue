<template>
  <form id="employee-form" ref="employeeForm">
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
                {{ formTitle }}
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
                      tabindex="10"
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
                      tabindex="20"
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
                @click="handleCancelForm"
              ></div>
            </div>
          </div>
          <!-- popup header end-->
          <!-- popup form start-->
          <div class="m-popup-body__form">
            <div class="grid">
              <div class="row">
                <div class="col c-12">
                  <div class="row gutter-24">
                    <div class="col c-6">
                      <div class="row">
                        <div class="col c-4">
                          <m-textfield
                            :schema="{
                              label: 'Mã',
                              type: 'text',
                              name: 'EmployeeCode',
                              placeholder: 'Mã nhân viên',
                              rules: 'required',
                              dataProperty: 'EmployeeCode',
                              tabindex: 30,
                            }"
                            ref="tabIndexStart"
                            @keydown.exact.shift.tab.prevent="
                              handlePreviousTabIndex
                            "
                            v-model="formData.EmployeeCode"
                          >
                          </m-textfield>
                        </div>
                        <div class="col c-8">
                          <m-textfield
                            :schema="{
                              label: 'Tên',
                              type: 'text',
                              name: 'EmployeeName',
                              placeholder: 'Họ và tên',
                              rules: 'required',
                              dataProperty: 'EmployeeName',
                              tabindex: 40,
                            }"
                            v-model="formData.EmployeeName"
                          ></m-textfield>
                        </div>
                        <div class="col c-12">
                          <!-- dropdownlist top start -->
                          <m-dropdown-list
                            :schema="{
                              label: 'Đơn vị',
                              type: 'text',
                              name: 'DepartmentId',
                              placeholder: 'Chọn đơn vị',
                              rules: 'required',
                              dataProperty: 'DepartmentId',
                              tabindex: 70,
                            }"
                            :data="getDepartmentsKeyValue"
                            v-model="formData.DepartmentId"
                          ></m-dropdown-list>
                          <!-- dropdownlist top end -->
                        </div>
                        <div class="col c-12">
                          <!-- normal textfield start -->
                          <m-textfield
                            :schema="{
                              label: 'Chức danh',
                              type: 'text',
                              name: 'employeePosition',
                              placeholder: 'Chức danh',
                              rules: '',
                              dataProperty: 'EmployeePosition',
                              tabindex: 100,
                            }"
                            v-model="formData.EmployeePosition"
                          ></m-textfield>
                          <!-- normal textfield end -->
                        </div>
                      </div>
                    </div>
                    <div class="col c-6">
                      <div class="row">
                        <div class="col c-5">
                          <m-textfield
                            :schema="{
                              label: 'Ngày sinh',
                              type: 'date',
                              name: 'dateOfBirth',
                              placeholder: 'Ngày sinh',
                              rules: '',
                              dataProperty: 'DateOfBirth',
                              tabindex: 50,
                            }"
                            :modelValue="
                              formFormatter.date(formData.DateOfBirth)
                            "
                          ></m-textfield>
                        </div>
                        <div class="col c-7">
                          <!-- horizontal radio start -->
                          <div class="m-textfield">
                            <label for="">Giới tính</label>
                            <div
                              class="m-radio-container m-radio-container--hor"
                            >
                              <div class="m-radio-item">
                                <input
                                  class="m-radio-item__input"
                                  type="radio"
                                  name="gender"
                                  dataProperty="Gender"
                                  value="1"
                                  id="m-radio-nam"
                                  checked
                                  v-model="formData.Gender"
                                  tabindex="60"
                                />
                                <label
                                  class="m-radio-item__label"
                                  for="m-radio-nam"
                                  >Nam</label
                                >
                              </div>
                              <div class="m-radio-item">
                                <input
                                  class="m-radio-item__input"
                                  type="radio"
                                  name="gender"
                                  dataProperty="Gender"
                                  value="0"
                                  id="m-radio-nu"
                                  v-model="formData.Gender"
                                  tabindex="60"
                                />
                                <label
                                  class="m-radio-item__label"
                                  for="m-radio-nu"
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
                                  v-model="formData.Gender"
                                  tabindex="60"
                                />
                                <label
                                  class="m-radio-item__label"
                                  for="m-radio-khac"
                                  >Khác</label
                                >
                              </div>
                            </div>
                            <!-- horizontal radio end -->
                          </div>
                        </div>
                        <div class="col c-7">
                          <!-- normal textfield start -->
                          <m-textfield
                            :schema="{
                              label: 'Số CMND',
                              title: 'Số chứng minh nhân dân',
                              type: 'text',
                              name: 'identityNumber',
                              placeholder: 'Số CMND',
                              rules: '',
                              dataProperty: 'IdentityNumber',
                              tabindex: 80,
                            }"
                            v-model="formData.IdentityNumber"
                          ></m-textfield>
                          <!-- normal textfield end -->
                        </div>
                        <div class="col c-5">
                          <!-- date textfield start-->
                          <m-textfield
                            :schema="{
                              label: 'Ngày cấp',
                              type: 'date',
                              name: 'identityDate',
                              placeholder: 'Ngày cấp CMND',
                              rules: '',
                              dataProperty: 'IdentityDate',
                              tabindex: 90,
                            }"
                            :modelValue="
                              formFormatter.date(formData.IdentityDate)
                            "
                          ></m-textfield>
                          <!-- date textfield end-->
                        </div>
                        <div class="col c-12">
                          <!-- normal textfield start -->
                          <m-textfield
                            :schema="{
                              label: 'Nơi cấp',
                              type: 'text',
                              name: 'identityPlace',
                              placeholder: 'Cơ quan cấp CMND',
                              rules: '',
                              dataProperty: 'IdentityPlace',
                              tabindex: 110,
                            }"
                            v-model="formData.IdentityPlace"
                          ></m-textfield>
                          <!-- normal textfield end -->
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col c-12">
                  <!-- normal textfield start -->
                  <m-textfield
                    :schema="{
                      label: 'Địa chỉ',
                      type: 'text',
                      name: 'address',
                      placeholder: 'Địa chỉ tạm trú',
                      rules: '',
                      dataProperty: 'Address',
                      tabindex: 120,
                    }"
                    v-model="formData.Address"
                  ></m-textfield>
                  <!-- normal textfield end -->
                </div>
                <div class="col c-3">
                  <!-- normal textfield start -->
                  <m-textfield
                    :schema="{
                      label: 'ĐT di động',
                      title: 'Điện thoại di động',
                      type: 'text',
                      name: 'phoneNumber',
                      placeholder: 'Số điện thoại di động',
                      rules: '',
                      dataProperty: 'PhoneNumber',
                      tabindex: 120,
                    }"
                    v-model="formData.PhoneNumber"
                  ></m-textfield>
                  <!-- normal textfield end -->
                </div>
                <div class="col c-3">
                  <!-- normal textfield start -->
                  <m-textfield
                    :schema="{
                      label: 'ĐT cố định',
                      title: 'Điện thoại cố định',
                      type: 'text',
                      name: 'telephoneNumber',
                      placeholder: 'Số điện thoại cố định',
                      rules: '',
                      dataProperty: 'TelephoneNumber',
                      tabindex: 120,
                    }"
                    v-model="formData.TelephoneNumber"
                  ></m-textfield>
                  <!-- normal textfield end -->
                </div>
                <div class="col c-3">
                  <!-- normal textfield start -->
                  <m-textfield
                    :schema="{
                      label: 'Email',
                      type: 'text',
                      name: 'email',
                      placeholder: 'Thư điện tử',
                      rules: '',
                      dataProperty: 'Email',
                      tabindex: 130,
                    }"
                    v-model="formData.Email"
                  ></m-textfield>
                  <!-- normal textfield end -->
                </div>
                <div class="col c-12">
                  <div class="row">
                    <div class="col c-3">
                      <!-- normal textfield start -->
                      <m-textfield
                        :schema="{
                          label: 'Tài khoản ngân hàng',
                          type: 'text',
                          name: 'bankAccountNumber',
                          placeholder: 'Số tài khoản ngân hàng',
                          rules: '',
                          dataProperty: 'BankAccountNumber',
                          tabindex: 140,
                        }"
                        v-model="formData.BankAccountNumber"
                      ></m-textfield>
                      <!-- normal textfield end -->
                    </div>
                    <div class="col c-3">
                      <!-- normal textfield start -->
                      <m-textfield
                        :schema="{
                          label: 'Tên ngân hàng',
                          type: 'text',
                          name: 'bankName',
                          placeholder: 'Tên ngân hàng',
                          rules: '',
                          dataProperty: 'BankName',
                          tabindex: 150,
                        }"
                        v-model="formData.BankName"
                      ></m-textfield>
                      <!-- normal textfield end -->
                    </div>
                    <div class="col c-3">
                      <!-- normal textfield start -->
                      <m-textfield
                        :schema="{
                          label: 'Chi nhánh',
                          type: 'text',
                          name: 'bankBranchName',
                          placeholder: 'Chi nhánh ngân hàng',
                          rules: '',
                          dataProperty: 'BankBranchName',
                          tabindex: 160,
                        }"
                        v-model="formData.BankBranchName"
                      ></m-textfield>
                      <!-- normal textfield end -->
                    </div>
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
              ref="primaryBtn"
              class="m-popup-footer__primary-btn m-btn primary-btn"
              type="button"
              tabindex="170"
              @click="handleSubmitAndReopen"
            >
              Cất và thêm
            </button>
            <button
              ref="secondaryBtn"
              class="m-popup-footer__secondary-btn m-btn secondary-btn"
              type="submit"
              tabindex="180"
            >
              Cất
            </button>
          </div>
          <div id="formTabIndexEnd" class="m-popup-footer__left-panel">
            <button
              id="formCancelBtn"
              ref="tabIndexEnd"
              type="button"
              tabindex="190"
              class="m-popup-footer__cancel-btn m-btn secondary-btn"
              @click="hideForm"
              @keydown.exact.tab.prevent="handleNextTabIndex"
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
import { mapState, mapMutations, mapActions } from "vuex";
import { Validator } from "../js/validator.js";

import MTextfield from "./base/MTextfield.vue";
import MDropdownList from "./base/MDropdownList.vue";
import { EmployeeService } from "@/js/service";
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
      formData: {},
      isReopenForm: false,
    };
  },
  computed: {
    ...mapState({
      formContent: (state) => state.uiModule.formContent,
      departments: (state) => state.departmentModule.departments,
    }),

    /**
     * Tính toán có phải là form thêm mới hay không
     * Author: PVLong (22/12/2022)
     */
    isCreateForm() {
      return this.formContent.mode == this.$enums.FormMode.CREATE;
    },

    /**
     * Tính toán iêu đề form
     * Author: PVLong (22/12/2022)
     */
    formTitle() {
      if (this.isCreateForm) return "Thêm mới nhân viên";
      else return "Sửa nhân viên";
    },

    /**
     * Hàm chuyển department sang dạng key-value, phục vụ dropdownlist
     * Author: PVLong (22/12/2022)
     */
    getDepartmentsKeyValue() {
      if (!this.departments) return [];
      return this.departments.map((department) => ({
        key: department.DepartmentId,
        value: department.DepartmentName,
      }));
    },
  },
  mounted() {
    // this.log("m-form mounted.....................");
    //
    this.getDepartments();
    if (this.isCreateForm) {
      this.getNewEmployeeCode();
    } else {
      this.getCurrentEmployee();
    }

    // focus trường mã
    this.$refs.tabIndexStart.focusInput();

    /**
     * Tích hợp thư viện validate
     */
    Validator("employee-form", {
      onsubmit: this.handleSubmitForm,
      onerror: this.showValidateError,
    });
  },
  methods: {
    ...mapMutations([
      "hideForm",
      "setDepartments",
      "showLoading",
      "hideLoading",
    ]),
    ...mapActions([
      "fetchDepartments",
      "showForm",
      "showDialog",
      "showNotify",
      "addToastMessage",
    ]),

    /**
     * Xử lý sự kiện submit form
     * @param {*} payload dữ liệu đã được thu thập
     * Author: PVLong (19/12/2022)
     */
    async handleSubmitForm(payload) {
      try {
        const employeeService = new EmployeeService();
        if (this.isCreateForm) {
          // Gọi api
          await employeeService.insert(payload);

          // Hiển thị toast-message thành công
          const content = {
            mode: this.$enums.ToastMessageMode.SUCCESS,
            message: "Thành công",
            body: "Thêm nhân viên thành công.",
          };
          this.addToastMessage(content);
        } else {
          // Gọi api
          await employeeService.update(payload, this.formContent.employeeId);

          // Hiển thị toast-message thành công
          const content = {
            mode: this.$enums.ToastMessageMode.SUCCESS,
            message: "Thành công",
            body: "Sửa nhân viên thành công.",
          };
          this.addToastMessage(content);
        }

        // Xử lý đóng form
        // Nếu cần mở lại form, lưu lại formContent -> đóng form -> mở form
        // Nếu không cần mở lại form, đóng form
        if (this.isReopenForm) {
          const currentFormContent = { ...this.formContent };
          setTimeout(() => {
            this.showForm(currentFormContent);
          }, 0);
          this.hideForm();
        } else this.hideForm();
      } catch (err) {
        this.showApiError(err);
      }
    },

    /**
     * Hàm submit và mở lại form
     * Author: PVLong (19/12/2022)
     */
    handleSubmitAndReopen() {
      this.isReopenForm = true;
      this.$refs.secondaryBtn.click();
    },

    /**
     * Hàm hiển thị validate messages
     * Author: PVLong (19/12/2022)
     */
    showValidateError(messages) {
      const notifyContent = {
        mode: this.$enums.NotifyMode.INFO_PINK,
        message: messages,
        primaryBtnTitle: "Đóng",
      };
      this.showNotify(notifyContent);
    },

    /**
     * Hàm lấy dữ liệu đơn vị
     * Author: PVLong (19/12/2022)
     */
    getDepartments() {
      if (this.departments) return;
      this.fetchDepartments();
    },

    /**
     * Hàm lấy mã nhân viên mới
     * Author: PVLong (19/12/2022)
     */
    async getNewEmployeeCode() {
      try {
        const employeeService = new EmployeeService();
        const res = await employeeService.getNewEmployeeCode();
        this.debug(res);
        this.formData.EmployeeCode = res;
      } catch (error) {
        this.error(error);
      }
    },

    /**
     * Hàm lấy dữ liệu nhân viên
     * Author: PVLong (19/12/2022)
     */
    async getCurrentEmployee() {
      this.showLoading();
      try {
        const employeeService = new EmployeeService();
        const params = {};
        const res = await employeeService.getByID(
          params,
          this.formContent.employeeId
        );
        this.formData = res;
      } catch (error) {
        this.error(error);
      } finally {
        this.hideLoading();
      }
    },

    /**
     * Xử lý đóng form
     * Author: PVLong (19/12/2022)
     */
    handleCancelForm() {
      const notifyContent = {
        mode: this.$enums.NotifyMode.QUESTION,
        message: "Dữ liệu đã bị thay đổi. Bạn có muốn cất không?",
        primaryBtnTitle: "Cất",
        isSecondaryBtnShow: true,
        isCancelBtnShow: true,
        primaryBtnCallback: () => {
          this.$refs.primaryBtn.click();
        },
        secondaryBtnCallback: () => {
          this.hideForm();
        },
      };
      this.showNotify(notifyContent);
    },

    /**
     * Xử lý lặp lại tabIndex
     * Author: PVLong (19/12/2022)
     */
    handleNextTabIndex() {
      this.$refs.tabIndexStart.focusInput();
    },

    /**
     * Xử lý lặp lại tabIndex
     * Author: PVLong (19/12/2022)
     */
    handlePreviousTabIndex() {
      this.$refs.tabIndexEnd.focus();
    },
  },
};
</script>

<style></style>
