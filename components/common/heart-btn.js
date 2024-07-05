import { redirect } from "next/dist/server/api-utils";
import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";

export default function HeartBtn({
  initFull = false,
  handler = () => {},
  color = "red",
}) {
  const [full, setFull] = useState(initFull);
  useEffect(() => {
    setFull(initFull);
  }, [initFull]);
  return (
    <span style={{ color: color, cursor: "pointer" }} onClick={handler}>
      {full ? <FaHeart /> : <FaRegHeart />}
    </span>
  );
}
