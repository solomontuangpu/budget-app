import { redirect } from "react-router-dom";
import { toast } from "react-toastify";


import { deleteItem } from "../helper";

export const logoutAction = async () => {
     deleteItem({key: "userName"});
     deleteItem({ key: "budgets" });
     deleteItem({ key: "expenses" });
     toast.success("You've deleted your account successfully!");
    return redirect("/");
}