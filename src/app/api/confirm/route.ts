import { NextResponse } from 'next/server'

/**
 * Fetch with timeout
 */
async function fetchWithTimeout(
  input: RequestInfo,
  init: RequestInit = {},
  timeoutMs = 10000
) {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeoutMs)
  try {
    return await fetch(input, { ...init, signal: controller.signal })
  } finally {
    clearTimeout(id)
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null)
    if (!body) {
      return NextResponse.json({ message: 'Invalid JSON' }, { status: 400 })
    }

    const {
      Phone,
      EmailAddress,
      formOne,
      formTwo,
      formThree,
      isSubmitted,
      ackNum
    } = body as {
      Phone?: string
      EmailAddress?: string
      formOne?: boolean
      formTwo?: boolean
      formThree?: boolean
      isSubmitted?: boolean
      ackNum:string
    }

    // 🔒 Basic validation
    if (!Phone || !EmailAddress) {
      return NextResponse.json(
        { message: 'Missing Phone or EmailAddress' },
        { status: 400 }
      )
    }

    // Build values to forward to Google Sheets
    const values: Record<string, string> = {
      timestamp: new Date().toISOString(),
      Phone: String(Phone).trim(),
      EmailAddress: String(EmailAddress).trim(),
      formOne: String(Boolean(formOne)),
      formTwo: String(Boolean(formTwo)),
      formThree: String(Boolean(formThree)),
      isSubmitted: String(Boolean(isSubmitted)),
      ackNum:String(ackNum).trim()
    }

    // Google Apps Script Web App URL
    const SHEETS_URL = process.env.NEXT_PUBLIC_SHEETS_KEY
    if (!SHEETS_URL) {
      return NextResponse.json(
        { message: 'SHEETS_URL not configured on server' },
        { status: 500 }
      )
    }

    // Convert to x-www-form-urlencoded
    const sheetParams = new URLSearchParams()
    for (const [key, value] of Object.entries(values)) {
      sheetParams.append(key, value)
    }

    // Forward to Google Sheets
    const sheetResp = await fetchWithTimeout(
      SHEETS_URL,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: sheetParams.toString(),
      },
      10000
    )

    if (!sheetResp.ok) {
      const txt = await sheetResp.text().catch(() => null)
      console.error('Sheets forward failed:', sheetResp.status, txt)
      return NextResponse.json(
        { message: 'Failed to forward to sheets', details: txt },
        { status: 502 }
      )
    }

    const respText = await sheetResp.text().catch(() => null)

    return NextResponse.json(
      { message: 'Success', details: respText ?? null },
      { status: 200 }
    )
  } catch (err: any) {
    console.error('submitConfirm error:', err)
    return NextResponse.json(
      {
        message: 'Internal server error',
        details: String(err?.message ?? err),
      },
      { status: 500 }
    )
  }
}
