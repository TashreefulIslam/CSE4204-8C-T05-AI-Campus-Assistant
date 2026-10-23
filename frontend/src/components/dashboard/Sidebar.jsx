import { NavLink } from "react-router-dom";
import Logo from "../layout/Logo";
import adminSidebar from "../../data/adminSidebar";

const Sidebar = () => {

    return (

        <aside className="w-64 bg-white shadow-lg h-screen fixed left-0 top-0">

            <div className="p-6 border-b">

                <Logo />

            </div>

            <nav className="mt-6">

                {adminSidebar.map((item) => {

                    const Icon = item.icon;

                    return (

                        <NavLink
                            key={item.title}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-6 py-3 transition

                                ${
                                    isActive
                                        ? "bg-blue-600 text-white"
                                        : "text-gray-600 hover:bg-blue-50"
                                }`
                            }
                        >

                            <Icon size={20} />

                            {item.title}

                        </NavLink>

                    );

                })}

            </nav>

        </aside>

    );

};

export default Sidebar;