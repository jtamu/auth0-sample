import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';

export const GET = withApiAuthRequired(async function shows(req) {
  try {
    const res = new NextResponse();
    const { idToken } = await getSession(req, res);
    const apiPort = process.env.API_PORT || 8000;
    const apiHost = process.env.API_HOST;
    const response = await fetch(`${apiHost}:${apiPort}/auth0/microposts`, {
      headers: {
        Authorization: `Bearer ${idToken}`
      }
    });
    const shows = await response.json();

    return NextResponse.json(shows, res);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: error.status || 500 });
  }
});
