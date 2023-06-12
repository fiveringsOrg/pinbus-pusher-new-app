import React from "react";
import { useLocation, useRoutes } from "react-router-dom";
import { Login } from "./pages/Login.page";
import { DeployCabinet } from "./pages/operate/DeployCabinet.page";
import { Operate } from "./pages/operate/Operate.page";
import { RecycleCabinet } from "./pages/operate/RecycleCabinet.page";
import { RecyclePowerbank } from "./pages/operate/RecyclePowerbank.page";
import { getToken } from "./utils/storage.util";
export default function Router() {
  const location = useLocation();
  const [isLogin, setIsLogin] = React.useState(false);

  React.useEffect(() => {
    const getCurrentToken = getToken();
    if (getCurrentToken) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [location.pathname]);

  let element = useRoutes([
    { path: "/", element: isLogin ? <Operate /> : <Login /> },
    { path: "/login", element: <Login /> },
    { path: "/operate", element: isLogin ? <Operate /> : <Login /> },
    {
      path: "/operate/deploy-cabinet",
      element: isLogin ? <DeployCabinet /> : <Login />,
    },
    {
      path: "/operate/recycle-cabinet",
      element: isLogin ? <RecycleCabinet /> : <Login />,
    },
    {
      path: "/operate/recycle-powerbank",
      element: isLogin ? <RecyclePowerbank /> : <Login />,
    },
    { path: "*", element: <Operate /> },
  ]);

  return element;
}
