import $ from "jquery";
import { Validator } from "./validator.js";
import { Dropdownlist } from "./dropdownlist.js";

window.addEventListener("DOMContentLoaded", async function (event) {
  try {
    await loadTable();
    await getDepartments();
    new Dropdownlist(recordPerPage, "#recordPerPageDropDown");
    new Dropdownlist(departments, "#departmentDropdown", {
      keyField: "DepartmentId",
      valField: "DepartmentName",
    });
    Validator("employee-form", {
      onsubmit: handleSubmitForm,
    });
  } catch (error) {
    console.log(error);
  }
});

/**
 * Xử lý tải dữ liệu ra bảng
 * @param {*} event
 * Author: PVLong (19/12/2022)
 */
async function loadTable(event) {
  await initTable();
  initEvent();
}

/**
 * Khởi tạo biến toàn cục
 */
const employeePage = $("#employee-page");
const employeeForm = $("#employee-form");
const employeeTable = $("#employee-page .m-table");

const loadingComponent = $("#loading");
const cancelConfirmDialog = $(".cancel-dialog");
const successNotify = $(".m-notify.--success");
const errorNotify = $(".m-notify.--warning");

const formTabIndexStart = $("#formTabIndexStart");
const formTabIndexEnd = $("#formTabIndexEnd");

let employees = [];
let departments = [];
const recordPerPage = [
  { key: 1, val: 10 },
  { key: 2, val: 20 },
  { key: 3, val: 30 },
  { key: 3, val: 50 },
  { key: 4, val: 100 },
];

const tableLoadingComponent = $("#table-loading");

// Các hàm định dạng dữ liệu table, giúp hiển thị ra phía người dùng
const tableFormatter = {
  default: (value) => value,
  date: (value) => {
    if (!value) return value;
    let dateInstance = new Date(value);
    let date = dateInstance.getDate();
    let month = dateInstance.getMonth() + 1;
    const year = dateInstance.getFullYear();
    if (date < 10) date = "0" + String(date);
    if (month < 10) month = "0" + String(month);
    return [date, month, year].join("/");
  },
};

// Các hàm định dạng dữ liệu form, giúp gán giá trị cho form
const formFormatter = {
  date: (value) => {
    if (!value) return value;
    let dateInstance = new Date(value);
    let date = dateInstance.getDate();
    let month = dateInstance.getMonth() + 1;
    const year = dateInstance.getFullYear();
    if (date < 10) date = "0" + String(date);
    if (month < 10) month = "0" + String(month);
    return [year, month, date].join("-");
  },
  gender: (value) => {
    if (value == null) return -1;
    return value;
  },
};

// Các api gọi trong ứng dụng
const apiList = {
  getDepartments: {
    url: "https://amis.manhnv.net/api/v1/Departments",
    method: "GET",
  },
  getEmployees: {
    url: "https://amis.manhnv.net/api/v1/Employees",
    method: "GET",
  },
  addEmployee: {
    url: "https://amis.manhnv.net/api/v1/Employees",
    method: "POST",
  },
  editEmployee: {
    url: "https://amis.manhnv.net/api/v1/Employees",
    method: "PUT",
  },
  deleteEmployee: {
    url: "https://amis.manhnv.net/api/v1/Employees",
    method: "DELETE",
  },
};

// Schema, bản thiết kế của bảng nhân viên
const tableDetail = [
  {
    name: "Mã nhân viên",
    title: "",
    headerClass: "w-100",
    bodyClass: "",
    format: tableFormatter.default,
    dataProperty: "EmployeeCode",
  },
  {
    name: "Tên nhân viên",
    title: "",
    headerClass: "",
    bodyClass: "",
    format: tableFormatter.default,
    dataProperty: "EmployeeName",
  },
  {
    name: "Giới tính",
    title: "",
    headerClass: "w-50",
    bodyClass: "",
    format: tableFormatter.default,
    dataProperty: "GenderName",
  },
  {
    name: "Ngày sinh",
    title: "",
    headerClass: "w-100 --text-center",
    bodyClass: "--text-center",
    format: tableFormatter.date,
    dataProperty: "DateOfBirth",
  },
  {
    name: "Số CMND",
    title: "Số chứng minh nhân dân",
    headerClass: "w-150",
    bodyClass: "",
    format: tableFormatter.default,
    dataProperty: "IdentityNumber",
  },
  {
    name: "Chức danh",
    title: "",
    headerClass: "",
    bodyClass: "",
    format: tableFormatter.default,
    dataProperty: "PositionName",
  },
  {
    name: "Đơn vị",
    title: "",
    headerClass: "",
    bodyClass: "",
    format: tableFormatter.default,
    dataProperty: "DepartmentName",
  },
  {
    name: "Mức lương",
    title: "",
    headerClass: "w-100 --text-right",
    bodyClass: "--text-right",
    format: tableFormatter.default,
    dataProperty: "Salary",
  },
];

/**
 * Khởi tạo sự kiện
 * Author: PVLong (19/12/2022)
 */
function initEvent() {
  // init header event
  $("#header__menu-icon").click(toggleSidebar);

  // init form event
  $("#addEmployeeBtn").click(showAddEmployeeForm);
  $("#formCloseBtn").click(hideEmployeeForm);
  $("#formCancelBtn").click(showCancelDialog);
  $("#dialogCloseBtn").click(hideCancelDialog);
  $("#dialogCancelBtn").click(hideCancelDialog);
  $("#dialogPrimaryBtn").click(hideEmployeeForm);
  $(".table-toolbar__refreshIcon").click(loadTable);
  $("#formTabIndexEnd").keydown(handleRepeatTabIndex);

  // init notify event
  $(successNotify).find(".primary-btn").click(hideSuccessNotify);
  $(errorNotify).find(".primary-btn").click(hideErrorNotify);

  // init checkbox event
  $("#employee-page thead .row-checkbox").dblclick(function (event) {
    event.stopPropagation();
  });
  $("#employee-page thead .row-checkbox").click(handleHeaderCheckbox);
  $("#employee-page thead .row-checkbox").click(changeDeleteBtnState);
  $("#employee-page tbody .row-checkbox").dblclick(function (event) {
    event.stopPropagation();
  });
  $("#employee-page tbody .row-checkbox").click(handleBodyCheckbox);
  $("#employee-page tbody .row-checkbox").change(changeDeleteBtnState);

  // init edit event
  $("#employee-page tbody tr").dblclick(showEditEmployeeForm);
  $("#employee-page tbody tr .editRowBtn").click(showEditEmployeeForm);

  // init delete event
  $("#employee-page tbody tr .deleteRowBtn").click(handleDeleteOne);
}

/**
 * Gọi api thông tin đơn vị - department xuống và lưu vào biến
 * @param {*} event
 * Author: PVLong (19/12/2022)
 */
async function getDepartments(event) {
  await $.ajax({
    url: apiList.getDepartments.url,
  })
    .done(function (res) {
      departments = res;
    })
    .fail(function (err) {
      console.log(err);
    });
}

/**
 * Gọi api, khởi tạo và hiển thị table
 * Author: PVLong (19/12/2022)
 */
async function initTable() {
  emptyTable();
  renderTableHeader();
  tableLoadingComponent.show();
  await $.ajax({
    url: apiList.getEmployees.url,
  })
    .done(function (res) {
      // employees = res.slice(0, 15);
      employees = res;
      renderTableBody(employees);
    })
    .fail(function (err) {
      console.log(err);
    })
    .then(function () {
      tableLoadingComponent.hide();
    });
}

/**
 * Xóa dữ liệu table
 * Author: PVLong (19/12/2022)
 */
function emptyTable() {
  $(employeeTable).find("thead").empty();
  $(employeeTable).find("tbody").empty();
}

/**
 * Hiển thị table ra giao diện người dùng
 * @param {object} employees
 * Author: PVLong (19/12/2022)
 */
function renderTable(employees) {
  renderTableHeader();
  renderTableBody(employees);
}

/**
 * Hiển thị table header ra giao diện người dùng
 * Author: PVLong (19/12/2022)
 */
function renderTableHeader() {
  $(employeeTable).find("thead").empty();
  let html = tableDetail.reduce((prevValue, col) => {
    return (
      prevValue +
      `<th class="${col.headerClass}" title="${col.title}">${col.name}</th>
      `
    );
  }, "");
  html = `
    <tr class="m-table__header">
      <th class="w-50 --text-center"><input class="row-checkbox m-radio-item__input" type="checkbox" name="" id=""></th>
      ${html}
      <th class="w-100">CHỨC NĂNG</th>
    </tr>`;
  $(employeeTable).find("thead").append(html);
}

/**
 * Hiển thị table body ra giao diện người dùng
 * @param {object[]} employees
 * Author: PVLong (19/12/2022)
 */
function renderTableBody(employees) {
  $(employeeTable).find("tbody").empty();
  let html = employees.reduce((prevValue, employee, index) => {
    return prevValue + renderTableBodyRow(employee, index);
  }, "");
  $(employeeTable).find("tbody").append(html);

  // Hiển thị context menu ở phía trên cho 2 dòng cuối cùng
  $(
    "#employee-page .m-table tbody tr:nth-last-child(2) .m-context-menu-btn"
  ).addClass("--context-on-top");
  $(
    "#employee-page .m-table tbody tr:nth-last-child(1) .m-context-menu-btn"
  ).addClass("--context-on-top");
}

/**
 * Hiển thị table body ra giao diện người dùng
 * @param {object} employee
 * @param {number} index
 * Author: PVLong (19/12/2022)
 */
function renderTableBodyRow(employee, index) {
  let html = tableDetail.reduce((prevValue, col) => {
    return (
      prevValue +
      `<td class="${col.bodyClass}">${
        employee[col.dataProperty] ? col.format(employee[col.dataProperty]) : ""
      }</td>
      `
    );
  }, "");
  html = `
    <tr data-key="${index}">
      <td><input class="row-checkbox m-radio-item__input" type="checkbox" name="" id=""></td>
      ${html}
      <td>
        <!-- context button start -->
        <div class="m-context-menu-btn">
          <button class="m-context-menu-btn__label editRowBtn" data-key="${index}">Sửa</button>
          <button class="m-context-menu-btn__icon">
            <div class="m-context-menu">
              <div class="m-context-menu-item">
                <div class="m-context-menu-item__text">Nhân bản</div>
              </div>
              <div class="m-context-menu-item deleteRowBtn" data-key="${index}">
                <div class="m-context-menu-item__text">Xóa</div>
              </div>
              <div class="m-context-menu-item">
                <div class="m-context-menu-item__text">Ngưng sử dụng</div>
              </div>
            </div>
          </button>
        </div>
        <!-- context button end -->
      </td>
    </tr>
    `;
  return html;
}

/**
 * Xử lý sự kiện đóng mở sidebar
 * @param {object} event
 * Author: PVLong (19/12/2022)
 */
function toggleSidebar(event) {
  employeePage.toggleClass("--sidebar-close");
}

/**
 * Hiển thị popup thêm mới
 * @param {object} event
 * Author: PVLong (19/12/2022)
 */
function showAddEmployeeForm(event) {
  $(employeeForm).find(".employee-form-body__title").text("Thêm mới nhân viên");
  $(employeeForm).data("mode", "addEmployee");
  loadingComponent.show();
  setTimeout(() => {
    loadingComponent.hide();
    employeeForm.show();
    formTabIndexStart.focus();
  }, 500);
}

/**
 * Hiển thị popup chỉnh sửa
 * @param {object} event
 * Author: PVLong (19/12/2022)
 */
function showEditEmployeeForm(event) {
  const index = $(this).data("key");
  const employee = employees[index];
  $(employeeForm).find(".employee-form-body__title").text("Sửa nhân viên");
  $(employeeForm).data("mode", "editEmployee");
  $(employeeForm).data("key", index);
  loadingComponent.show();
  setTimeout(() => {
    loadingComponent.hide();
    loadDataToEmployeeForm(employee);
    employeeForm.show();
    formTabIndexStart.focus();
  }, 500);
}

/**
 * Hiển thị dữ liệu vào form
 * @param {object} employee
 * Author: PVLong (19/12/2022)
 */
function loadDataToEmployeeForm(employee) {
  const dateKey = ["DateOfBirth", "IdentityDate"];
  const radioKey = ["Gender"];

  for (let key in employee) {
    let formattedValue = employee[key];
    if (dateKey.includes(key)) {
      formattedValue = formFormatter.date(employee[key]);
    }
    if (radioKey.includes(key)) {
      $(employeeForm)
        .find(
          `input[dataProperty="${key}"][value="${formFormatter.gender(
            employee[key]
          )}"]`
        )
        .prop("checked", true);
    } else
      $(employeeForm).find(`input[dataProperty="${key}"]`).val(formattedValue);
  }
}

/**
 *  Ẩn form thêm mới/ chỉnh sửa nhân viên
 * @param {object} event
 * Author: PVLong (19/12/2022)
 */
function hideEmployeeForm(event) {
  loadTable();
  loadingComponent.show();
  setTimeout(() => {
    loadingComponent.hide();
    handleResetForm();
    hideCancelDialog();
    employeeForm.hide();
  }, 500);
}

/**
 * Hiện xác nhận muốn đóng form thông tin nhân viên
 * @param {object} event
 * Author: PVLong (19/12/2022)
 */
function showCancelDialog(event) {
  cancelConfirmDialog.show();
  cancelConfirmDialog.find(".primary-btn").focus();
}

/**
 * Ẩn xác nhận muốn đóng form thông tin nhân viên
 * @param {object} event
 * Author: PVLong (19/12/2022)
 */
function hideCancelDialog(event) {
  cancelConfirmDialog.hide();
}

/**
 * Hiển thị thông báo thành công
 * @param {string} message
 */
function showSuccessNotify(message = "Thành công.") {
  $(successNotify).find(".m-notify-header__message").text(message);
  successNotify.show();
}

/**
 * Ẩn thông báo thành công
 */
function hideSuccessNotify() {
  successNotify.hide();
  hideEmployeeForm();
}

/**
 * Hiển thị thông báo lỗi
 * @param {string} message
 */
function showErrorNotify(message = "Thất bại.") {
  $(errorNotify).find(".m-notify-header__message").text(message);
  errorNotify.show();
}

/**
 * Ẩn thông báo lỗi
 */
function hideErrorNotify() {
  errorNotify.hide();
}

/**
 * Xử lý quay vòng tabindex
 * @param {object} event
 * Author: PVLong (19/12/2022)
 */
function handleRepeatTabIndex(event) {
  event.preventDefault();
  // formTabIndexStart.focus();
  switch (event.which) {
    case 13: {
      showCancelDialog();
      break;
    }
  }
}

/**
 * Xử lý checkbox check nhiều
 * @param {object} event
 * Author: PVLong (19/12/2022)
 */
function handleHeaderCheckbox(event) {
  $("#employee-page tbody .row-checkbox").each(function (index) {
    $(this).prop("checked", event.target.checked);
  });
}

/**
 * Xử lý checkbox nhỏ lẻ
 * @param {object} event
 * Author: PVLong (19/12/2022)
 */
function handleBodyCheckbox(event) {
  if (!event.target.checked) {
    $("#employee-page thead .row-checkbox").prop("checked", false);
    return;
  }
  let isAllChecked = true;
  $("#employee-page tbody .row-checkbox").each(function (index) {
    if (!$(this).prop("checked")) {
      isAllChecked = false;
      return;
    }
  });
  $("#employee-page thead .row-checkbox").prop("checked", isAllChecked);
}

/**
 * Thay đổi trạng thái nút xóa nhiều - toolbar
 * @param {object} event
 * Author: PVLong (19/12/2022)
 */
function changeDeleteBtnState(event) {
  let isAnyChecked = false;
  $("#employee-page tbody .row-checkbox").each(function (index) {
    if ($(this).prop("checked")) {
      isAnyChecked = true;
      return;
    }
  });
  $("#deleteManyBtn").prop("disabled", !isAnyChecked);
}

/**
 * Xử lý sự kiện submit form
 * @param {object} payload
 */
function handleSubmitForm(payload) {
  // api thêm mới employee
  let api = { ...apiList[$(employeeForm).data("mode")] };

  // api sửa employee
  if ($(employeeForm).data("mode") == "editEmployee") {
    const employee = employees[$(employeeForm).data("key")];
    api.url = `${api.url}/${employee["EmployeeId"]}`;
  }

  // gọi api
  $.ajax({
    url: api.url,
    type: api.method,
    data: JSON.stringify(payload),
    dataType: "json",
    contentType: "application/json",
  })
    .done(function (res) {
      showSuccessNotify();
    })
    .fail(function (err) {
      console.log(err);
      showErrorNotify(err.responseJSON.userMsg);
    });
}

/**
 * Xử lý sự kiện xóa dòng
 * @param {object} event
 */
function handleDeleteOne(event) {
  const employee = employees[$(this).data("key")];
  $.ajax({
    url: `${apiList.deleteEmployee.url}/${employee["EmployeeId"]}`,
    type: apiList.deleteEmployee.method,
    dataType: "json",
    contentType: "application/json",
  })
    .done((res) => console.log(res))
    .fail(function (err) {
      console.log(err);
      showErrorNotify(err.responseJSON.userMsg);
    })
    .always(function () {
      loadTable();
    });
}

/**
 * Xử lý reset dữ liệu form
 * @param {object} event
 */
function handleResetForm(event) {
  $(employeeForm)
    .find("input")
    .each(function () {
      $(this).val("");
    });

  $(employeeForm)
    .find(".--error")
    .each(function () {
      $(this).removeClass("--error");
    });
}
