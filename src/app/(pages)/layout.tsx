import AdminLayout from "../components/layout/AdminLayout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <main>{children}</main>
  );
}
