import Intro from "../components/Intro";
import AddBudgetForm from "../components/AddBudgetForm"
import { createBudget, fetchData } from "../helper";
import { useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';

export const dashboardLoader = () => {
     const userName = fetchData("userName");
     const budget = fetchData("budget");

     return { userName, budget };
}

export const dashboardAction = async ({request}) => {
    const data = await request.formData();

    const { _action, ...values } = Object.fromEntries(data);

    if(_action === "createAccount"){
       try {
           localStorage.setItem("userName", JSON.stringify(values.userName));
           return toast.success(`Welcome, ${values.userName}`);
       } catch (error) {
          throw new Error("There was a problem creating your account!");
       }
    }

    if(_action === "createBudget"){
      try {
        createBudget({
          name : values.newBudget,
          amount: values.newBudgetAmount
        })
        return toast.success("New Budget has been created successfully!");
      } catch (error) {
          throw new Error("There was a problem creating your Budget!");
      }
    }
}

const Dashboard = () => {
    const { userName } = useLoaderData();
  return (
    <>
      {
        userName ? (
          <div className="dashboard">
            <h1>Welcome back, <span className="accent">{ userName }</span></h1>
            <div className="grid-sm">
              <div className="grid-lg">
                <div className="flex-lg">
                  <AddBudgetForm />
                </div>
              </div>
            </div>
          </div>
        ) :
        <Intro />
      }
    </>
  )
}

export default Dashboard
