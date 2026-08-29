import AdminGuard from "@/components/admin/AdminGuard";
import AdminHeader from "@/components/admin/AdminHeader/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar/AdminSidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (

        <AdminGuard>
            <div
                className="
                    min-h-screen
                    bg-muted/30
                "
            >

                <AdminSidebar />

                <div
                    className="
                        lg:pl-64
                    "
                >

                    <AdminHeader />

                    <main
                        className="
                            min-h-[calc(100vh-5rem)]
                            p-4
                            sm:p-6
                            lg:p-8
                        "
                    >

                        {children}

                    </main>

                </div>

            </div>
        </AdminGuard>
    );
}