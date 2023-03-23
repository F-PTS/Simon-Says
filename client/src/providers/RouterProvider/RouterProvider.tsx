import { BrowserRouter } from "react-router-dom";
import { Routes } from "../../Routes";

export const RouterProvider = () => {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
};
