import { useLoaderData, Outlet } from "react-router-dom";

import { fetchData } from "../helper";

import wave from "../assets/wave.svg";

export const mainLoader = () => {
  const userName = fetchData("userName");
  return { userName };
};

const Main = () => {
  const { userName } = useLoaderData();

  return (
    <div className=" layout">
      <h1>Nav</h1>
      <main>
        <Outlet />
      </main>
      <img src={wave} alt='' />
    </div>
  );
};

export default Main;
