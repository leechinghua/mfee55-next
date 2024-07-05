import { createContext, useState, useContext, useEffect } from "react";
import { LOGIN_JWT_POST } from "@/config/api-path";

// ************ 登入的狀態管理
const ShinAuthContext = createContext();
// 1. 保有狀態, id, account, nickname, token
// 2. login 功能
// 3. logout 功能
// 4. getAuthHeader() 取得包含 token 的 Authorization 檔頭

const emptyAuth = {
  id: 0,
  account: "",
  nickname: "",
  token: "",
};
const storageKey = "shinder-auth";

export function ShinAuthContextProvider({ children }) {
  const [auth, setAuth] = useState({ ...emptyAuth });

  // 登入的函式
  const login = async (account = "", password = "") => {
    try {
      const r = await fetch(LOGIN_JWT_POST, {
        method: "POST",
        body: JSON.stringify({ account, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await r.json();

      console.log(result);
      if (result.success) {
        // 登入的狀態記錄到 localStorage
        localStorage.setItem(storageKey, JSON.stringify(result.data));
        setAuth(result.data); // 把成功登入的狀態設定到 state
      }
      return result.success;
    } catch (ex) {}
    return false;
  };

  // 登出的函式
  const logout = () => {
    localStorage.removeItem(storageKey);
    setAuth({ ...emptyAuth });
  };

  // 取得包含 token 的檔頭
  const getAuthHeader = () => {
    if (auth.token) {
      return { Authorization: "Bearer " + auth.token };
    }
    return {};
  };

  useEffect(() => {
    const str = localStorage.getItem(storageKey);
    if (str) {
      try {
        const data = JSON.parse(str);
        setAuth(data);
      } catch (ex) {}
    }
  }, []);

  return (
    <ShinAuthContext.Provider value={{ auth, login, logout, getAuthHeader }}>
      {children}
    </ShinAuthContext.Provider>
  );
}
export const useAuth = () => useContext(ShinAuthContext);
// 預設的匯出 context 本身
export default ShinAuthContext;
