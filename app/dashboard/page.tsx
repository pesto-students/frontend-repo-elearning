import Dashboard from "@/components/Dashboard/Dashboard";
import { NextRequest } from "next/server";

export default function Page(request: NextRequest) {
    // const token = request?.cookies?.get('token');
    // if (!token) {
    //     redirect('/');
    // }
    return <Dashboard />;
}