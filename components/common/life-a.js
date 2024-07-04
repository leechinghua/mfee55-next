import  { useEffect, useRef } from "react";

export default function LifeA() {
  const [val, setVal] = useState(0);

  const refA = useRef();
  useEffect(() => {
    console.log("LifeA已經掛載---");
    let n = 0;
    // 設定計時器, 同時取得計時器的編號
    const interval_id = setInterval(() => {
      n++;
      // console.log({ n });
      refA.current.innerHTML = n;
    }, 500);
    return () => {
      console.log("LifeA即將卸載===");
      clearInterval(interval_id); // 取消計時器的功能
    };
  }, []);
  useEffect(()=>{
    console.log("LifeA 已經更新 ...");
    return ()=>{
      console.log("LifeA 即將更新 !!!")
    }
  }, [val]);
  return (
    <div>
      <h2>Life A</h2>
      <h5 ref={refA}>begin</h5>
      <div>
      <button onClick={()=> setVal(val + 1)}>val++</button>{val}</div>
    </div>
  );
}
