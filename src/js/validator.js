import $ from "jquery";
/* eslint-disable */
export function Validator(formId, options = {}) {
  const formRules = {};

  /**
   * Định nghĩa các validate rule
   * Nếu không có lỗi thì trả về undefined
   * Nếu có lỗi thì trả về message lỗi
   */
  const validatorRules = {
    required: function (value, label = "Trường này") {
      return value ? undefined : `${label} không được bỏ trống`;
    },
    email: function (value, label = "Trường này") {
      const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      return regex.test(value) ? undefined : `${label} phải là email`;
    },
    min: function (min) {
      return function (value, label = "Trường này") {
        return String(value).length >= min
          ? undefined
          : `${label} phải có ít nhất ${min} ký tự`;
      };
    },
    max: function (max) {
      return function (value, label = "Trường này") {
        return String(value).length <= max
          ? undefined
          : `${label} phải có ít hơn ${max} ký tự`;
      };
    },
  };

  function getParentContainer(element) {
    while (element.parentElement) {
      if (element.parentElement.matches(".m-textfield"))
        return element.parentElement;
      element = element.parentElement;
    }
  }

  /**
   * Thu thập dữ liệu trong form
   * @param {*} formElement
   * @returns dữ liệu của form đã được thu thập dưới dạng name-value
   */
  function collectPayload(formElement) {
    const inputs = formElement.querySelectorAll("[name]");
    let payload = {};
    for (let input of inputs) {
      switch (input.type) {
        case "text": {
          payload[input.name] = input.value ? input.value : null;
          let datasetKey = $(input).data("item-key");
          if (datasetKey) payload[input.name] = datasetKey;
          break;
        }
        case "number": {
          payload[input.name] = input.value ? input.value : null;
          break;
        }
        case "date": {
          payload[input.name] = input.value ? input.value : null;
          break;
        }
        case "radio": {
          let checkedInput = formElement.querySelector(
            `[name=${input.name}]:checked`
          );
          let checkedValue = checkedInput?.value;

          // Nếu checked value là số, chuyển thành số
          if (!isNaN(checkedValue)) {
            checkedValue = parseInt(checkedValue);
          }
          payload[input.name] = checkedValue;
          break;
        }
        case "checkbox": {
          if (input.checked) {
            if (payload[input.name]) payload[input.name].push(input.value);
            else payload[input.name] = input.value;
          }
          break;
        }
        default: {
          payload[input.name] = input.value ? input.value : null;
          break;
        }
      }
    }
    return payload;
  }

  /**
   * Xử lý validate chỉ khi có formId
   */
  const formElement = document.getElementById(formId);
  if (formElement) {
    const inputs = formElement.querySelectorAll(
      "[name][rules]:not([rules=''])"
    );

    for (let input of inputs) {
      const rules = input.getAttribute("rules").split("|");

      for (let rule of rules) {
        let ruleInfo = [];
        let ruleFunction = "";

        // Xử lý rule kèm value
        if (rule.includes(":")) {
          ruleInfo = rule.split(":");
          ruleFunction = validatorRules[ruleInfo[0]](ruleInfo[1]);
        } else {
          ruleFunction = validatorRules[rule];
        }
        // console.log(ruleFunction);

        // Thêm ruleFunction vào formRules
        if (formRules[input.name]) {
          formRules[input.name].push(ruleFunction);
        } else {
          formRules[input.name] = [ruleFunction];
        }
      }

      // Gán sự kiện kích hoạt/ hủy kích hoạt validate
      // input.onblur = handleValidate;
      input.oninput = handleClearValidate;
    }

    function handleValidate(event) {
      const parentContainer = getParentContainer(event.target);
      const messageElement = parentContainer.querySelector(
        ".m-input-container__message"
      );
      const inputElement = parentContainer.querySelectorAll(
        ".m-input-container__input"
      )[0];
      const labelElement = parentContainer.querySelector("label");

      // Kiểm tra có lỗi hay không
      let errorMessage = "";
      formRules[event.target.name].some((rule) => {
        errorMessage = rule(event.target.value, labelElement.textContent);
        return errorMessage;
      });

      // Xóa trạng thái validate trước khi hiển thị lại
      handleClearValidate(event);
      // Nếu có lỗi => hiển thị lỗi ra UI
      // Nếu không có lỗi => đánh dấu validated
      if (errorMessage) {
        parentContainer.classList.add("--error");
        messageElement.textContent = errorMessage;
        inputElement.setAttribute("title", errorMessage);
      } else {
        // parentContainer.classList.add("--validated");
        messageElement.textContent = "";
        inputElement.setAttribute("title", "");
      }
      return errorMessage;
    }

    function handleClearValidate(event) {
      const parentContainer = getParentContainer(event.target);
      const messageElement = parentContainer.querySelectorAll(
        ".m-input-container__message"
      )[0];
      const inputElement = parentContainer.querySelectorAll(
        ".m-input-container__input"
      )[0];

      if (parentContainer.matches(".--error")) {
        parentContainer.classList.remove("--error");
      } else if (parentContainer.matches(".--validated")) {
        parentContainer.classList.remove("--validated");
      }
      messageElement.textContent = "";
      inputElement.setAttribute("title", "");
    }

    // handle form submit event
    formElement.onsubmit = function (event) {
      let isValid = true;
      let listError = [];
      let payload = {};

      // Kiểm tra có lỗi hay không
      for (let input of inputs) {
        let errorMessage = handleValidate({ target: input });
        if (errorMessage) {
          isValid = false;
          listError.push(errorMessage);
        }
      }

      // Nếu có lỗi => không submit form + gọi callback onerror
      // Nếu không có lỗi và có onsubmit callback => không submit form, gọi onsubmit()
      // Nếu không có lỗi và không có onsubmit callback => submit form
      if (!isValid) {
        event.preventDefault();
        if (options.onerror) {
          options.onerror(listError);
        }
      } else if (options.onsubmit) {
        event.preventDefault();
        payload = collectPayload(formElement);
        options.onsubmit(payload);
      }
    };
  }
  // console.log(formRules);
}
