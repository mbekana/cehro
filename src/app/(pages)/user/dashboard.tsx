import UserLayout from "@/app/components/layout/UserLayout";

const UserDashboard = () => {
  return (
    <UserLayout>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Welcome to Your Dashboard</h2>
        <p className="text-gray-dark">You can view your activity and manage your profile here.</p>
      </div>
    </UserLayout>
  );
};

export default UserDashboard;
