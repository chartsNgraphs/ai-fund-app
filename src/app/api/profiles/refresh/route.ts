import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        console.log("Refreshing profiles...");
        // ...your refresh logic here...
        return NextResponse.json({ success: true, message: "Profiles refreshed successfully." }, { status: 200 });
    } catch (error) {
        console.error("Error refreshing profiles:", error);
        return NextResponse.json({ success: false, message: "Failed to refresh profiles." }, { status: 500 });
    }
}