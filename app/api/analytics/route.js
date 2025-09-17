import { NextResponse } from "next/server";

export async function GET() {
  try {
    const projectId = process.env.VERCEL_PROJECT_ID;
    const token = process.env.VERCEL_API_TOKEN;

    const res = await fetch(
      `https://api.vercel.com/v2/insights/${projectId}/web-analytics`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
    }

    const data = await res.json();

    return NextResponse.json({
      visitors: data.uniques.value, // unique visitors
      pageViews: data.pageviews.value, // total views
      returning: data.uniques.value - data.newVisitors.value, // derived
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}