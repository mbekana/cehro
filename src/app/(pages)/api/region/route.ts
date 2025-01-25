export async function GET() {
  try {
    const regionList = await fetchAllRegions();
    return new Response(JSON.stringify(regionList), { status: 200 });
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
    const newRegion = await req.json();

    if (!newRegion || Object.keys(newRegion).length === 0) {
      return new Response(
        JSON.stringify({
          error: "No data provided to create region",
        }),
        { status: 400 }
      );
    }

    const createdRegion = await createRegion(newRegion);
    return new Response(JSON.stringify(createdRegion), {
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

async function fetchAllRegions() {
  try {
    const response = await fetch("http://localhost:5000/regions");
    if (!response.ok) {
      throw new Error("Failed to fetch data from the server");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching regions:", error);
    throw new Error("Failed to fetch regions");
  }
}

async function createRegion(newRegion: any) {
  try {
    const response = await fetch("http://localhost:5000/regions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRegion),
    });

    if (!response.ok) {
      throw new Error("Failed to create region");
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating region:", error);
    throw new Error("Failed to create region");
  }
}
