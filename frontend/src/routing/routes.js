import { SignIn, SignUp } from "../cores";
import FlowPageWithAuth from "../pages/drapdrp/FlowPageWithAuth";
import { homePath, signInPath, signUpPath } from "./route.constant";

const routes = [
  {
    path: homePath,
    component: FlowPageWithAuth, // Use the wrapped component
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

