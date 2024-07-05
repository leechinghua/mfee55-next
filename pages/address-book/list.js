import React, { useEffect, useState } from "react";
import { AB_LIST, AB_REMOVE_ONE_DELETE, AB_LIKES } from "@/config/api-path";
import Layout1 from "@/components/layouts/layout1";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  FaRegTrashCan,
  FaRegPenToSquare,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa6";
import HeartBtn from "@/components/common/heart-btn";
import { useAuth } from "@/contexts/shin-auth-context";

export default function ABList() {
  const router = useRouter();
  const { auth, getAuthHeader } = useAuth();
  // 狀態初始值設定要符合進來的資料格式
  const [listData, setListData] = useState({
    success: false,
    totalRows: 0,
    totalPages: 0,
    page: 0,
    perPage: 0,
    rows: [],
  });
  const [keyword, setKeyword] = useState("");
  console.log("ABList render----", Date.now(), router.query);
  useEffect(() => {
    if (!router.isReady) return; // router 還沒準備好, 就什麼都不做
    // 從 query string 的 keyword 值去填入搜尋欄
    if (router.query.keyword) {
      setKeyword(router.query.keyword);
    }
    const controller = new AbortController();
    const signal = controller.signal;

    fetch(`${AB_LIST}?${new URLSearchParams(router.query)}`, {
      signal,
      // credentials: "include",
    })
      .then((r) => r.json())
      .then((data) => {
        setListData(data);
      })
      .catch((ex) => console.log(ex));
    return () => {
      controller.abort(); // 取消未完成的 AJAX
    };
  }, [router]);

  const deleteOne = (pk) => {
    fetch(`${AB_REMOVE_ONE_DELETE}/${pk}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((r) => r.json())
      .then((result) => {
        if (result.success) {
          router.push(location.search);
        } else {
        }
      })
      .catch((ex) => console.log(ex));
  };

  // 加入或取消最愛
  const heartHandler = (ab_sid) => {
    fetch(`${AB_LIKES}/${ab_sid}`, {
      headers: { ...getAuthHeader() },
    })
      .then((r) => r.json())
      .then((result) => {
        console.log(result);
        if (result.success) {
          const data = structuredClone(listData); // 深層複製
          const item = data.rows.find((i) => i.sid === ab_sid);
          if (item) {
            if (result.action === "add") {
              item.like = true;
            } else {
              item.like = false;
            }
            setListData(data);
          }
        }
      });
  };

  return (
    <Layout1 title="通訊錄列表 | 小新的網站" pageName="ab_list">
      <div className="row">
        <div className="col-6">
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              {Array(11)
                .fill(1)
                .map((v, i) => {
                  const p = listData.page - 5 + i;
                  if (p < 1 || p > listData.totalPages) return null;
                  const qs = { ...router.query };
                  qs.page = p;
                  return (
                    <li
                      className={`page-item ${
                        p === listData.page ? "active" : ""
                      }`}
                      key={p}
                    >
                      <Link
                        className="page-link"
                        href={`?${new URLSearchParams(qs)}`}
                      >
                        {p}
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </nav>
        </div>
        <div className="col-6">
          <form
            className="d-flex"
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              router.push(`?keyword=${keyword}`); // 變更 qs 參數, 觸發 router 的變更
            }}
          >
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              name="keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>
                  <FaRegTrashCan />
                </th>
                <th>#</th>
                <th>heart</th>
                <th>姓名</th>
                <th>電郵</th>
                <th>手機</th>
                <th>生日</th>
                <th>地址</th>
                <th>
                  <FaRegPenToSquare />
                </th>
              </tr>
            </thead>
            <tbody>
              {listData.rows.map((r) => {
                return (
                  <tr key={r.sid}>
                    <td>
                      <a
                        href="#/"
                        onClick={(e) => {
                          e.preventDefault();
                          deleteOne(r.sid);
                        }}
                      >
                        <FaRegTrashCan />
                      </a>
                    </td>
                    <td>{r.sid}</td>
                    <td>
                      <HeartBtn
                        initFull={r.like}
                        handler={() => {
                          heartHandler(r.sid);
                        }}
                      />
                    </td>
                    <td>{r.name}</td>
                    <td>{r.email}</td>
                    <td>{r.mobile}</td>
                    <td>{r.birthday}</td>
                    <td>{r.address}</td>
                    <td>
                      <Link href={`/address-book/${r.sid}`}>
                        <FaRegPenToSquare />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Layout1>
  );
}
