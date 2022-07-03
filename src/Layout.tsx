import {  Outlet } from "react-router-dom";
import { Wrapper } from "./styles";

export const Layout = () => {
    return (
      <Wrapper>
        <Outlet />
      </Wrapper>
    );
  };