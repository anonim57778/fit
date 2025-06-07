import Sidebar from "./sidebar";


export default function DashboardLayout({
    children,
} : Readonly<{ children: React.ReactNode }>) {

    return (
        <main className="flex lg:gap-6 bg-muted h-screen p-6">
            <Sidebar/>
            <div className="grow overflow-auto">
                {children}
            </div>
        </main>
    )
}