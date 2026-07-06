import DashboardLayout from "../../components/dashboard/DashboardLayout";
import StatCard from "../../components/dashboard/StatCard";
import AnalyticsChart from "../../components/dashboard/AnalyticsChart";
import RecentUsers from "../../components/dashboard/RecentUsers";
import {
    Users,
    GraduationCap,
    BookOpen,
    UserCheck,
} from "lucide-react";


const Dashboard = () => {

    return (

        <DashboardLayout
            title="Admin Dashboard"
            subtitle="System Administration & Platform Analytics"
        >

           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

    <StatCard
        title="Total Users"
        value="1,245"
        change="+12% this month"
        icon={Users}
    />

    <StatCard
        title="Students"
        value="920"
        change="+20 new"
        icon={GraduationCap}
        iconBg="bg-green-100"
        iconColor="text-green-600"
    />

    <StatCard
        title="Teachers"
        value="84"
        change="+3 this month"
        icon={UserCheck}
        iconBg="bg-orange-100"
        iconColor="text-orange-600"
    />

    <StatCard
        title="Courses"
        value="56"
        change="+5 added"
        icon={BookOpen}
        iconBg="bg-purple-100"
        iconColor="text-purple-600"
    />

</div>

<div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">

    <div className="xl:col-span-2">

        <AnalyticsChart />

    </div>

    <RecentUsers />

</div>

        </DashboardLayout>

    );

};

export default Dashboard;
