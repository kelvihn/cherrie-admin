
import "./App.css";


import { Route, Switch } from "react-router-dom";
// component

// css
import "./assets/css/bootstrap.min.css";
import "./assets/css/plugins.css";
import "./assets/css/structure.css";
import "./assets/css/scrollspyNav.css";

// js

// import "./assets/js/perfect-scrollbar.min.js";
import "./assets/js/bootstrap/js/bootstrap.min.js";
import "./assets/js/bootstrap/js/popper.min";
import "./assets/js/app.js";
// import "./assets/js/custom";
// import "./assets/js/scrollspyNav.js";


import { Suspense, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { LOGIN_ADMIN } from "./store/Admin/admin.type";
import setToken from "./utils/setToken";

const Login = lazy(() => import("./Pages/Login"));
const Admin = lazy(() => import("./Pages/Admin"));
const AuthRoute = lazy(() => import("./utils/AuthRoute"));
const PrivateRouter = lazy(() => import("./utils/PrivateRoute"));

function App() {
  const isAuth = useSelector((state) => state.admin.isAuth);

  const dispatch = useDispatch();
  const key = sessionStorage.getItem("key");
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (!token && !key) return;
    dispatch({ type: LOGIN_ADMIN, payload: token });
  }, [setToken, key]);
  
  return (
    <>
      <Suspense fallback={""}>
        <Switch>
          {isAuth && <Route path="/admin" component={Admin} />}
          <AuthRoute exact path="/" component={Login} />
          <AuthRoute exact path="/login" component={Login} />
          <PrivateRouter path="/admin" component={Admin} />
        </Switch>
      </Suspense>
    </>
  );
}

export default App;
