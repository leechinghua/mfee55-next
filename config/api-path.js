// 老師的機器
// export const API_SERVER = "http://192.168.5.21:3001";
export const API_SERVER = "http://localhost:3001";

// 列表
export const AB_LIST = `${API_SERVER}/address-book/api`;

// 新增資料 method: POST, body 表單資料
export const AB_ADD_POST = `${API_SERVER}/address-book/add`;

// 刪除一筆 `${API_SERVER}/address-book/:pk` method: DELETE
export const AB_REMOVE_ONE_DELETE = `${API_SERVER}/address-book`;

// 取得一筆 `${API_SERVER}/address-book/:pk` method: GET
export const AB_GET_ONE = `${API_SERVER}/address-book`;

// 修改一筆 `${API_SERVER}/address-book/edit/:pk` method: PUT
export const AB_UPDATE_PUT = `${API_SERVER}/address-book/edit`;

// 登入的路徑 method: POST, 兩個欄位: account, password
export const LOGIN_JWT_POST = `${API_SERVER}/login-jwt`;

// 加到最愛的 toggle `${API_SERVER}/address-book/fav/:ab_sid`, method: GET
export const AB_LIKES = `${API_SERVER}/address-book/fav`;
