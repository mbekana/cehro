import UserLayout from "@/app/components/layout/UserLayout";

const UserProfile = () => {
  return (
    <UserLayout>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Your Profile</h2>
        <p className="text-gray-dark">Update your information here.</p>
      </div>
    </UserLayout>
  );
};

export default UserProfile;
