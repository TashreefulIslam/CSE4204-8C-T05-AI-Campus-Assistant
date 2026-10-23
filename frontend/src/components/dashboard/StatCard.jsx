const StatCard = ({
    title,
    value,
    change,
    icon: Icon,
    iconBg = "bg-blue-100",
    iconColor = "text-blue-600",
}) => {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">

            <div className="flex justify-between items-start">

                <div>

                    <p className="text-gray-500 text-sm">
                        {title}
                    </p>

                    <h2 className="text-3xl font-bold mt-2">
                        {value}
                    </h2>

                    <p className="text-green-600 text-sm mt-2">
                        {change}
                    </p>

                </div>

                <div className={`${iconBg} p-3 rounded-xl`}>

                    <Icon className={iconColor} size={22} />

                </div>

            </div>

        </div>
    );
};

export default StatCard;