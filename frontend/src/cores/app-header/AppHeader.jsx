import { Avatar, Typography } from "@mui/material";
import "./app-header.css";

const AppHeader = () => {
  return (
    <div className="h-14 flex flex-row justify-between items-center  ">
      <div className="flex flex-row items-center gap-2">
      <Avatar
            style={{
              background: "#4BA561",
              fontSize: "12px",
              width: "40px",
              height: "40px",
              marginLeft:"20px"
            }}
          >
            EM
          </Avatar>
          <Typography  className="pt-0">
             E-Marketing
            </Typography>
      </div>

      <div className="">
        <div className="flex flex-row items-center">
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
