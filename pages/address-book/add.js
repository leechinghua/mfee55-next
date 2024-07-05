import Layout1 from "@/components/layouts/layout1";
import { useState } from "react";
import { AB_ADD_POST } from "@/config/api-path";
import { z } from "zod";

const initErrors = {
  name: "",
  email: "",
  mobile: "",
};

export default function ABAdd() {
  const [myForm, setMyForm] = useState({
    name: "",
    email: "",
    mobile: "",
    birthday: "",
    address: "",
  });
  // 顯示錯誤訊息的狀態
  const [myErrors, setMyErrors] = useState({ ...initErrors });

  const onChange = (e) => {
    console.log(e.target.name, e.target.value);
    setMyForm({
      ...myForm,
      [e.target.name]: e.target.value,
    });
  };
  // 驗證表單的函式
  const checkForm = () => {
    const schema = z.object({
      name: z.string().min(2, { message: "姓名最少兩個字" }),
      email: z.string().email({ message: "請輸入正確的 Email 格式" }),
      mobile: z.string().regex(/^09\d{2}-?\d{3}-?\d{3}$/, {message:"請輸入正確的手機號碼"}),
    });
    const result = schema.safeParse(myForm);
    console.log(JSON.stringify(result, null, 4));

    let newErrors = { ...initErrors };
    if (!result.success) {
      for (let i of result.error.issues) {
        newErrors[i.path[0]] = i.message;
      }
      setMyErrors(newErrors);
    }

    return result.success;
  };
  const onSubmit = async (e) => {
    e.preventDefault(); // 不要讓表單以傳統的方式送出
    if(! checkForm()) return; // 表單沒通過驗證, 就不往下走

    try {
      const r = await fetch(AB_ADD_POST, {
        method: "POST",
        body: JSON.stringify(myForm),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await r.json();
      console.log({ result });
      if (result.success) {
        alert("新增成功");
        // 是否要跳到列表頁
      } else {
        alert("沒有新增成功!!!");
      }
    } catch (ex) {
      console.log("發生錯誤:", ex);
    }
  };
  console.log("render---");
  return (
    <Layout1 title="新增通訊錄 | 小新的網站" pageName="ab_add">
      <div className="row">
        <div className="col-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">新增資料</h5>
              <form name="form1" onSubmit={onSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    <span className="required">**</span> 姓名
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={myForm.name}
                    onChange={onChange}
                  />
                  <div className="form-text">{myErrors.name}</div>
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    <span className="required">**</span> email
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    name="email"
                    value={myForm.email}
                    onChange={onChange}
                  />
                  <div className="form-text">{myErrors.email}</div>
                </div>

                <div className="mb-3">
                  <label htmlFor="mobile" className="form-label">
                    mobile
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="mobile"
                    name="mobile"
                    value={myForm.mobile}
                    onChange={onChange}
                  />
                  <div className="form-text">{myErrors.mobile}</div>
                </div>

                <div className="mb-3">
                  <label htmlFor="birthday" className="form-label">
                    birthday
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="birthday"
                    name="birthday"
                    value={myForm.birthday}
                    onChange={onChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    address
                  </label>

                  <textarea
                    value={myForm.address}
                    onChange={onChange}
                    className="form-control"
                    id="address"
                    name="address"
                    rows="3"
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary">
                  新增
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout1>
  );
}
