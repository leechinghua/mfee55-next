import Layout1 from "@/components/layouts/layout1";
import { useEffect, useState } from "react";
import { AB_GET_ONE, AB_UPDATE_POST } from "@/config/api-path";
import { z } from "zod";
import { useRouter } from "next/router";

const initErrors = {
  name: "",
  email: "",
  mobile: "",
};

export default function ABEdit() {
  const router = useRouter();
  const [myForm, setMyForm] = useState({
    name: "",
    email: "",
    mobile: "",
    birthday: "",
    address: "",
  });
  // 顯示錯誤的狀態
  const [myErrors, setMyErrors] = useState({
    ...initErrors,
  });
  const onChange = (e) => {
    console.log(e.target.name, e.target.value);
    setMyForm({ ...myForm, [e.target.name]: e.target.value });
  };
  // 驗證表單的函式
  const checkForm = () => {
    const schema = z.object({
      name: z.string().min(2, { message: "姓名最少兩個字" }),
      email: z.string().email({ message: "請輸入正確的Email格式" }),
      mobile: z
        .string()
        .regex(/^09\d{2}-?\d{3}-?\d{3}$/, { message: "請輸入正確的手機號碼" }),
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
    e.preventDefault();
    if (!checkForm()) return;

    try {
      const r = await fetch(`${AB_UPDATE_POST}/${router.query.edit_id}`, {
        method: "PUT",
        body: JSON.stringify(myForm),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await r.json();
      console.log({ result });
      if (result.success) {
        if (confirm("修改成功, 是否要回列表頁?")) {
          router.back(); // 回上一頁
        }
      } else {
        alert("沒有修改!!!");
      }
    } catch (ex) {
      console.log("發生錯誤:", ex);
    }
    console.log(e);
  };
  useEffect(() => {
    if (!router.isReady) return;
    fetch(`${AB_GET_ONE}/ ${router.query.edit_id}`)
      .then((r) => r.json())
      .then((result) => {
        if (result.success) {
          // const { name, email, mobile, birthday, address } = result.data;
          const data = { ...result.data };
          delete data.photos;
          delete data.created_at;
          setMyForm(result.data);
        } else {
          router.push("/address-book/list");
        }
      })
      .catch((ex) => {
        router.push("/address-book/list");
      });
  }, [router]);
  return (
    <Layout1 title="修改通訊錄 | 小新的網站" pageName="ab_add">
      <div className="row">
        <div className="col-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">修改資料</h5>
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
                  <div className="form-text"></div>
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
                  <div className="form-text"></div>
                </div>

                <button type="submit" className="btn btn-primary">
                  修改
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout1>
  );
}
