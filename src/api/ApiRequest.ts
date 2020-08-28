import axios, { AxiosInstance } from "axios";
import { Auth } from "../services/Auth";

const host = "http://localhost:3001/";

export class ApiRequest {
  public axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: host,
    });

    if (Auth.isUserAuthenticated()) {
      this.axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${Auth.getToken()}`;
    }
  }
}
