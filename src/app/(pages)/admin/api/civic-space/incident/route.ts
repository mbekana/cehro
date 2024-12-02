export async function GET() {
  try {
    const incidents = await fetchAllIncidents();
    return new Response(JSON.stringify(incidents), { status: 200 });
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        details: error.message,
      }),
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const newIncident = await req.json();

    if (!newIncident || Object.keys(newIncident).length === 0) {
      return new Response(
        JSON.stringify({ error: "No data provided to create an incident" }),
        { status: 400 }
      );
    }

    const createdIncident = await createIncident(newIncident);
    return new Response(JSON.stringify(createdIncident), {
      status: 201,
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        details: error.message,
      }),
      { status: 500 }
    );
  }
}

// Helper functions
async function fetchAllIncidents() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const response = await fetch(`${apiUrl}/incidents`);
  if (!response.ok) {
    throw new Error("Failed to fetch data from the server");
  }
  return await response.json();
}

async function createIncident(newIncident: any) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const response = await fetch(`${apiUrl}/incidents`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newIncident),
  });
  if (!response.ok) {
    throw new Error("Failed to create incident");
  }
  return await response.json();
}
