import { Search, Bell } from "lucide-react";

const DashboardHeader = ({ title, subtitle }) => {

    const user = JSON.parse(localStorage.getItem("user"));

    return (

        <header className="bg-white border-b px-8 py-5 flex justify-between items-center">

            <div>

                <h1 className="text-2xl font-bold text-gray-800">
                    {title}
                </h1>

                <p className="text-gray-500 text-sm">
                    {subtitle}
                </p>

            </div>

            <div className="flex items-center gap-5">

                <div className="relative">

                    <Search
                        size={18}
                        className="absolute left-3 top-3 text-gray-400"
                    />

                    <input
                        type="text"
                        placeholder="Search..."
                        className="pl-10 pr-4 py-2 rounded-xl border border-gray-200 outline-none focus:border-blue-500"
                    />

                </div>

                <Bell className="text-gray-500" />

                <div className="text-right">

                    <p className="font-semibold">

                        {user?.name}

                    </p>

                    <p className="text-sm text-gray-500">

                        {user?.role}

                    </p>

                </div>

            </div>

        </header>

    );

};

export default DashboardHeader;