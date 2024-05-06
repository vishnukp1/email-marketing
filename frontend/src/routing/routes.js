


import { SignIn, SignUp } from "../cores";
import DnDFlow from "../pages/drapdrp/DnDFlow";
import { homePath, signInPath,signUpPath} from "./route.constant";

const routes = [
  {
    path: homePath,
    component: DnDFlow,
    exact: true,
  },

  {
    path:signInPath,
    component:SignIn,
    exact: true,
  },
  {
    path:signUpPath,
    component:SignUp,
    exact: true,
  },
];

export default routes;
