// rrd
import { useLoaderData, Outlet } from "react-router-dom";

// helper
import { fetchData } from "../helper";

// images
import wave from "../assets/wave.svg";

// components
import Nav from "../components/Nav";

export const mainLoader = () => {
  const userName = fetchData("userName");
  return { userName };
};

const Main = () => {
  const { userName } = useLoaderData();

  return (
    <div className=" layout">
        <Nav userName={userName} />
      <main>
        <Outlet />
      </main>
      <img src={wave} alt='' />
    </div>
  );
};

export default Main;
