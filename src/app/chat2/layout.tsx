import MainNavbar from "@/components/mainNavbar";
import { cn } from "@/lib/utils";


export default function ChatLayout({children}: {children: React.ReactNode}) {
    return (
        <div className={cn("min-h-screen bg-background font-sans antialiased")}>
            <MainNavbar/>
        <div className="relative max-w-screen-2xl flex min-h-screen  flex-col bg-background">
            {children}
        </div>
        </div>
    )
}