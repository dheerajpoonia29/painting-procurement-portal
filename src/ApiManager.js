import axios from "axios";

class ApiManager {
  static baseUrl = "http://127.0.0.1:3333/api/painting/";
  static endPoints = {
    getAll: "get-all",
    getById: "get-by/:id",
    createNew: "create-new"
  };

  getAll = async () => {
    let url = ApiManager.baseUrl + ApiManager.endPoints.getAll
    console.log("url = ", url)
    return axios({
      url: ApiManager.baseUrl + ApiManager.endPoints.getAll,
      method: "GET",
      headers: { "Content-Type": "application/json" },
      timeout: 15000,
    });
  }

  getById(id) {
    return axios({
      url: ApiManager.baseUrl + ApiManager.endPoints.getById,
      method: "GET",
      params: { id: id },
      timeout: 15000,
    });
  }

  createNew(params) {
    return axios({
      url: ApiManager.baseUrl + ApiManager.endPoints.createNew,
      method: "POST",
      data: params,
      headers: { "Content-Type": "application/json" },
      timeout: 15000,
    });
  }
}

const ApiClient = new ApiManager();
export default ApiClient;