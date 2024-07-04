import React from "react";
import Link from "next/link";
import styles from "@/styles/address-book.module.css";

export default function Navbar({ pageName = "" }) {
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" href="/">
            Navbar
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className={"nav-item ${pageName}"}>
                <Link
                  className={`nav-link ${
                    pageName === "ab_list" ? styles["NavbarItemActive"] : null
                  }`}
                  href="/address-book/list"
                >
                  通訊錄列表
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    pageName === "ab_add" ? styles.NavbarItemActive : null
                  }`}
                  href="/address-book/add"
                >
                  新增通訊錄
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
