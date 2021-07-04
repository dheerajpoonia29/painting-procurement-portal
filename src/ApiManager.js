import axios from "axios";

class ApiManager {
  static baseUrl = "http://127.0.0.1:3333/api/";

  static paintingEndPoints = {
    getAll: "painting/get-all",
    getById: "painting/get-by/:id",
    createNew: "painting/create-new"
  };
  static painterEndPoints = {
    getAll: "painter/get-all",
    getById: "painter/get-by/:address",
    createNew: "painter/create-new"
  };
  static biddingEndPoints = {
    getAll: "bidding/get-all",
    getById: "bidding/get-by/:address",
    postBid: "bidding/post-bid",
    closeBid: "bidding/close-bid"
  };

  paintingGetAll = async () => {
    return axios({
      url: ApiManager.baseUrl + ApiManager.paintingEndPoints.getAll,
      method: "GET",
      headers: { "Content-Type": "application/json" },
      timeout: 15000,
    });
  }

  paintingGetById(id) {
    return axios({
      url: ApiManager.baseUrl + `painting/get-by/${id}`,
      method: "GET",
      params: { id: id },
      timeout: 15000,
    });
  }

  paintingCreateNew(params) {
    return axios({
      url: ApiManager.baseUrl + ApiManager.paintingEndPoints.createNew,
      method: "POST",
      data: params,
      headers: { "Content-Type": "application/json" },
      timeout: 15000,
    });
  }

  painterGetAll = async () => {
    return axios({
      url: ApiManager.baseUrl + ApiManager.painterEndPoints.getAll,
      method: "GET",
      headers: { "Content-Type": "application/json" },
      timeout: 15000,
    });
  }

  painterGetByAddress(address) {
    return axios({
      url: ApiManager.baseUrl + `painter/get-by/${address}`,
      method: "GET",
      timeout: 15000,
    });
  }

  painterCreateNew(params) {
    return axios({
      url: ApiManager.baseUrl + ApiManager.painterEndPoints.createNew,
      method: "POST",
      data: params,
      headers: { "Content-Type": "application/json" },
      timeout: 15000,
    });
  }

  biddingGetAll = async () => {
    return axios({
      url: ApiManager.baseUrl + ApiManager.biddingEndPoints.getAll,
      method: "GET",
      headers: { "Content-Type": "application/json" },
      timeout: 15000,
    });
  }

  biddingGetByAddress(address) {
    return axios({
      url: ApiManager.baseUrl + `painter/get-by/${address}`,
      method: "GET",
      timeout: 15000,
    });
  }

  biddingPostBid(params) {
    return axios({
      url: ApiManager.baseUrl + ApiManager.biddingEndPoints.postBid,
      method: "POST",
      data: params,
      headers: { "Content-Type": "application/json" },
      timeout: 15000,
    });
  }  

  biddingCloseBid(params) {
    return axios({
      url: ApiManager.baseUrl + ApiManager.biddingEndPoints.closeBid,
      method: "POST",
      data: params,
      headers: { "Content-Type": "application/json" },
      timeout: 15000,
    });
  }  
}

const ApiClient = new ApiManager();
export default ApiClient;