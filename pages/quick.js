import Layout1 from "@/components/layouts/layout1";
import { useAuth } from "@/contexts/shin-auth-context";

export default function QuickLogin() {
  const { auth, login } = useAuth();

  return (
    <Layout1 title="快速登入 | 小新的網站" pageName="quick">
      <h2>目前登入: {auth.nickname}</h2>
      <hr />
      <button
        onClick={() => login("shin@gg.com", "1234567")}
        className="btn btn-warning"
      >
        登入 shin@gg.com
      </button>
      <hr />
      <button
        onClick={() => login("ming@gg.com", "1234567")}
        className="btn btn-secondary"
      >
        登入 ming@gg.com
      </button>
      <hr />
    </Layout1>
  );
}

