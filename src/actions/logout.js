import { redirect } from "react-router-dom";
import { toast } from "react-toastify";


import { deleteItem } from "../helper";

export const logoutAction = async () => {
     deleteItem("userName");
     deleteItem("budgets");
     deleteItem("expenses");
     toast.success("You've deleted your account successfully!");
    return redirect("/");
}