import AdminLayout from "@/app/components/layout/AdminLayout";

const AdminSettings = () => {
  return (
    <AdminLayout>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Settings</h2>
        <p className="text-gray-dark">Here you can adjust the app settings.</p>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
