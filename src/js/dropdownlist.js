export class Dropdownlist {
  /**
   * Hàm khởi tạo dropdown gồm:
   * 1. Kiểm tra dropdown selector có đúng hay không
   * 2. Gán option vào scope property
   *    + valField: dữ liệu hiển thị phía người dùng, vd: Phòng nhân sự
   *    + keyField: dữ liệu ẩn với người dùng, phục vụ gọi api, vd: 142cb08f-7c31-21fa-8e90-67245e8b283e
   *    + datasetKey: gán key của phần tử đang được chọn vào dataset bằng datasetKey
   * 3. Render UI, gán sự kiện cho các thành phần
   * @param {object[]} data dữ liệu đầu vào phục vụ render dropdown items
   * @param {string} dropdownSelector selector của dropdown
   * @param {object} options các config khác, tùy chọn
   */
  constructor(data, dropdownSelector, options = {}) {
    this.data = [...data];

    // Tìm và gán element
    const dropdownElement = $(`${dropdownSelector}`);
    if (dropdownElement.length == 0)
      throw `Không tìm thấy element: ${dropdownSelector}`;
    this.dropdownElement = dropdownElement;
    this.mainInput = $(this.dropdownElement).find(".m-input-container__input");

    // Gán option vào scope property
    const defaultOption = {
      keyField: "key",
      valField: "val",
      datasetKey: "item-key",
    };
    this.options = { ...defaultOption, ...options };

    // Khởi tạo UI
    this.renderItems();
    this.initFirst();

    // Gán sự kiện
    this.handleItemClick();
  }

  /**
   * Render dropdown item giao diện
   */
  renderItems() {
    let html = this.data.reduce((prevResult, currentItem) => {
      return (
        prevResult +
        `<div class="m-dropdownlist-data__item" data-item-key="${
          currentItem[this.options.keyField]
        }">${currentItem[this.options.valField]}</div>
      `
      );
    }, "");

    // render UI
    $(this.dropdownElement).find(".m-dropdownlist-data").empty();
    $(this.dropdownElement).find(".m-dropdownlist-data").append(html);
  }

  /**
   * Xử lý sự kiện chọn một mục dropdown item gồm:
   * 1. Gán value cho input
   * 2. Gán dataset cho input
   */
  handleItemClick() {
    const me = this;
    $(this.dropdownElement)
      .find(".m-dropdownlist-data__item")
      .each(function (index, element) {
        $(this).click(function (event) {
          me.mainInput.val($(this).text());
          me.mainInput.data(
            me.options.datasetKey,
            $(this).data(me.options.datasetKey)
          );
          me.mainInput.trigger("input");
        });
      });
  }

  /**
   * Khởi tạo giá trị nếu có modifier --init-first
   * Giá trị khởi tạo mặc định là giá trị đầu tiên
   */
  initFirst() {
    if ($(this.dropdownElement).hasClass("--init-first")) {
      const firstItem = $(this.dropdownElement).find(
        ".m-dropdownlist-data__item:first-child"
      );
      this.mainInput.val(firstItem.text());
      this.mainInput.data(
        this.options.datasetKey,
        firstItem.data(this.options.datasetKey)
      );
    }
  }
}
