
const RecentUsers = ({ users }) => {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">

            <h2 className="text-lg font-semibold mb-6">

                Recent Users

            </h2>

            <table className="w-full">

                <thead>

                    <tr className="text-left text-gray-500 border-b">

                        <th className="pb-3">Name</th>

                        <th className="pb-3">Role</th>

                        <th className="pb-3">Department</th>

                    </tr>

                </thead>

                <tbody>

                    {users.map((user, index) => (

                        <tr key={index} className="border-b">

                            <td className="py-4">

                                {user.name}

                            </td>

                            <td>

                                {user.role}

                            </td>

                            <td>

                                {user.department}

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
};

export default RecentUsers;