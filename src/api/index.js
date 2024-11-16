import request from "../utils/request";

export default {
  /**
   * 登录接口
   */
  login(data) {
    return request.post("/login", data);
  },
  /**
   * 首页数据
   */
  index() {
    return request.get("/Index/index");
  },
};
