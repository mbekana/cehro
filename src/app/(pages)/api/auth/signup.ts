// pages/api/auth/signup.js
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { email, password, username } = await req.json();
    const res = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, username }),
    });

    if (!res.ok) {
      throw new Error('Signup failed');
    }

    const data = await res.json();

    return NextResponse.json({
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
