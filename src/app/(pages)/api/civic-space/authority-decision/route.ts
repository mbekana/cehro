export async function GET() {
  try {
    const authorityDecisions = await fetchAllAuthorityDecisions();
    return new Response(JSON.stringify(authorityDecisions), { status: 200 });
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
    const newAuthorityDecision = await req.json();

    if (
      !newAuthorityDecision ||
      Object.keys(newAuthorityDecision).length === 0
    ) {
      return new Response(
        JSON.stringify({
          error: "No data provided to create an authority decision",
        }),
        { status: 400 }
      );
    }

    const createdAuthorityDecision = await createAuthorityDecision(
      newAuthorityDecision
    );
    return new Response(JSON.stringify(createdAuthorityDecision), {
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

async function fetchAllAuthorityDecisions() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const response = await fetch(`${apiUrl}/authorityDecisions`);
    if (!response.ok) {
      throw new Error("Failed to fetch data from the server");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching authority decisions:", error);
    throw new Error("Failed to fetch authority decisions");
  }
}

async function createAuthorityDecision(newAuthorityDecision: any) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const response = await fetch(`${apiUrl}/authorityDecisions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAuthorityDecision),
    });

    if (!response.ok) {
      throw new Error("Failed to create authority decision");
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating authority decision:", error);
    throw new Error("Failed to create authority decision");
  }
}
