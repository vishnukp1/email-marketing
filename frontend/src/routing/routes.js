import { SignIn, SignUp } from "../cores";
import FlowPageWithAuth from "../pages/flow-page/FlowPageWithAuth";
import { homePath, signInPath, signUpPath } from "./route.constant";

const routes = [
  {
    path: homePath,
    component: FlowPageWithAuth, 
    exact: true,
  },
  {
    path: signInPath,
    component: SignIn,
    exact: true,
  },
  {
    path: signUpPath,
    component: SignUp,
    exact: true,
  },
];

export default routes;

