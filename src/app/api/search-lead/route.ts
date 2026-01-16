import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { phone } = await req.json();

    if (!phone) {
      return NextResponse.json(
        { error: "Phone is required" },
        { status: 400 }
      );
    }

    const accessKey = process.env.LSQ_ACCESS_KEY;
    const secretKey = process.env.LSQ_SECRET_KEY;

    const url =
      "https://api-in21.leadsquared.com/v2/LeadManagement.svc/RetrieveLeadByPhoneNumber";

    const params = new URLSearchParams({
      accessKey: accessKey!,
      secretKey: secretKey!,
      phone,
    });

    const response = await fetch(`${url}?${params.toString()}`, {
      method: "GET",
      cache: "no-store",
    });

    const raw = await response.text();

    console.log(raw)

    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      return NextResponse.json(
        { error: "Invalid response from LeadSquared" },
        { status: 502 }
      );
    }

    // LeadSquared returns array
    if (!Array.isArray(data) || data.length === 0) {
      return NextResponse.json(
        { error: "Mobile number not registered" },
        { status: 404 }
      );
    }

    const lead = data[0];

    // ✅ Return ONLY required fields
    return NextResponse.json({
      EmailAddress: lead.EmailAddress || "",
      Phone: lead.Phone || phone,
    });

  } catch (error) {
    console.error("SEARCH LEAD ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
