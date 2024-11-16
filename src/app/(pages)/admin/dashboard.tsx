import AdminLayout from "@/app/components/layout/AdminLayout";

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Welcome to the Admin Dashboard</h2>
        <p className="text-gray-dark">Here you can manage users, settings, and more.</p>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
