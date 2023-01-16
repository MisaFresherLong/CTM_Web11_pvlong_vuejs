import BaseService from "./baseService";

class DepartmentService extends BaseService {
  constructor(apiUrl = "", controller = "") {
    controller = controller ? controller : "api/v1/Departments";
    super(apiUrl, controller);
  }
}

export default DepartmentService;
