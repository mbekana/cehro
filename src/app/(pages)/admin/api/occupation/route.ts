export async function GET() {
  try {
    const occupationList = await fetchAllOccupations();
    return new Response(JSON.stringify(occupationList), { status: 200 });
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
    const newOccupation = await req.json();

    if (!newOccupation || Object.keys(newOccupation).length === 0) {
      return new Response(
        JSON.stringify({
          error: "No data provided to create occupation",
        }),
        { status: 400 }
      );
    }

    const createdOccupation = await createOccupation(newOccupation);
    return new Response(JSON.stringify(createdOccupation), {
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

async function fetchAllOccupations() {
  try {
    const response = await fetch("http://localhost:5000/occupations");
    if (!response.ok) {
      throw new Error("Failed to fetch data from the server");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching occupations:", error);
    throw new Error("Failed to fetch occupations");
  }
}

async function createOccupation(newOccupation: any) {
  try {
    const response = await fetch("http://localhost:5000/occupations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newOccupation),
    });

    if (!response.ok) {
      throw new Error("Failed to create occupation");
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating occupation:", error);
    throw new Error("Failed to create occupation");
  }
}
