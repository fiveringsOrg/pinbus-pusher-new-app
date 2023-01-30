import React from "react";
import { useRoutes } from "react-router-dom";
import { Login } from "./pages/Login.page";
import { DeployCabinet } from "./pages/operate/DeployCabinet.page";
import { Operate } from "./pages/operate/Operate.page";
import { RecycleCabinet } from "./pages/operate/RecycleCabinet.page";
import { RecyclePowerbank } from "./pages/operate/RecyclePowerbank.page";
import { getToken } from "./utils/storage.util";

export default function Router() {
  const [isLogin, setIsLogin] = React.useState(false);

  React.useEffect(() => {
    const getCurrentToken = getToken();
    if (getCurrentToken) {
      setIsLogin(true);
    }
  }, []);
  let element = useRoutes([
    { path: "/", element: isLogin ? <Operate /> : <Login /> },
    { path: "/login", element: <Login /> },
    { path: "/operate", element: <Operate /> },
    { path: "/operate/deploy-cabinet", element: <DeployCabinet /> },
    { path: "/operate/recycle-cabinet", element: <RecycleCabinet /> },
    { path: "/operate/recycle-powerbank", element: <RecyclePowerbank /> },
    { path: "*", element: <Operate /> },
  ]);

  return element;
}
