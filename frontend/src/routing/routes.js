import { SignIn, SignUp } from "../cores";
import { FlowPage } from "../pages";

import { homePath, signInPath, signUpPath } from "./route.constant";

const routes = [
  {
    path: homePath,
    component: FlowPage, 
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

