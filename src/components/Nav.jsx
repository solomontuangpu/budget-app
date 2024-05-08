// rrd
import { Form, NavLink } from "react-router-dom";

// icons
import { TrashIcon } from "@heroicons/react/24/solid";


import logo from "../assets/logomark.svg";

const Nav = ({ userName }) => {

    const handleSubmit = (e) => {
        if(!confirm("Are you sure?")){
            e.preventDefault();
        }
    }

  return (
    <header>
      <nav>
        <NavLink to={"/"} aria-label='Go to home'>
          <img src={logo} alt='logo' />
          <span>HomeBudget</span>
        </NavLink>
        {userName && (
          <Form method='post' action='logout' onSubmit={handleSubmit}>
            <button type='submit' className='btn btn--warning'>
              <span>Delete User</span>
              <TrashIcon width={20} />
            </button>
          </Form>
        )}
      </nav>
    </header>
  );
};

export default Nav;
