import axios from "axios";

class ApiManager {
  static baseUrl = "http://127.0.0.1:3333/api/painting/";
  static endPoints = {
    getAll: "get-all",
    getById: "get-by/:id",
    createNew: "create-new"
  };

  getAll(params) {
    return axios({
      url: ApiManager.baseUrl + ApiManager.endPoints.signIn,
      method: "post",
      data: params,
      headers: { "Content-Type": "application/json" },
      timeout: 15000,
    });
  }

  getById() {
    return axios({
      url: ApiManager.baseUrl + ApiManager.endPoints.getById,
      method: "GET",
      timeout: 15000,
    });
  }

  createNew(params) {
    return axios({
      url: ApiManager.baseUrl + ApiManager.endPoints.createNew,
      method: "post",
      data: params,
      headers: { "Content-Type": "application/json" },
      timeout: 15000,
    });
  }
}

const ApiClient = new ApiManager();
export default ApiClient;