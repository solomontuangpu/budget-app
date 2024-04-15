import { fetchData } from "../helper";
import { useLoaderData } from 'react-router-dom';

export const dashboardLoader = () => {
     const userName = fetchData("userName");
     return { userName };
}

const Dashboard = () => {
    const { userName } = useLoaderData();
  return (
    <div>
      <h1>{userName}</h1>
    </div>
  )
}

export default Dashboard
