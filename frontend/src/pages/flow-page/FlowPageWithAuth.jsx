import { useNavigate } from "react-router-dom";
import FlowPage from "./FlowPage";
import { useEffect } from "react";

const withAuth = (Component) => {
  return (props) => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
      if (!token) {
        navigate("/signin");
      }
    }, []); // Empty dependency array to run only on initial render

    return token ? <Component {...props} /> : null;
  };
};


const FlowPageWithAuth = withAuth(FlowPage);

export default FlowPageWithAuth;
