import React, { useEffect, useState } from "react";
import { AB_LIST } from "@/config/api-path";
import Layout1 from "@/components/layouts/layout1";
import Link from "next/link";
import { useRouter } from "next/router";

export default function ABList() {
  const router = useRouter();
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
    const controller = new AbortController();
    const signal = controller.signal;

    fetch(`${AB_LIST}?${new URLSearchParams(router.query)}`, {
      signal,
    })
      .then((r) => r.json())
      .then((data) => {
        setListData(data);
      })
      .catch((ex) => console.log(ex));
    // if (router.query.keyword) {
    //   setKeyword(router.query.keyword);
    // }
    return () => {
      controller.abort(); // 取消未完成的 AJAX
    };
  }, [router]);

  return (
    <Layout1 title="通訊錄列表 | 小新的網站">
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
                <th>#</th>
                <th>姓名</th>
                <th>電郵</th>
                <th>手機</th>
                <th>生日</th>
                <th>地址</th>
              </tr>
            </thead>
            <tbody>
              {listData.rows.map((r) => {
                return (
                  <tr key={r.sid}>
                    <td>{r.sid}</td>
                    <td>{r.name}</td>
                    <td>{r.email}</td>
                    <td>{r.mobile}</td>
                    <td>{r.birthday}</td>
                    <td>{r.address}</td>
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
