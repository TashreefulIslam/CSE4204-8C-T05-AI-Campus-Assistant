import Sidebar from "./Sidebar";
import DashboardHeader from "./DashboardHeader";

const DashboardLayout = ({ title, subtitle, children }) => {
    return (
        <div className="min-h-screen bg-[#F8FAFC] flex">

            <Sidebar />

            <div className="ml-64 flex-1">

                <DashboardHeader
                    title={title}
                    subtitle={subtitle}
                />

                <main className="p-6">

                    {children}

                </main>

            </div>

        </div>
    );
};

export default DashboardLayout;