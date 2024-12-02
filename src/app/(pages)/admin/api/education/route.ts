export async function GET() {
  try {
    const educationList = await fetchAllEducation();
    return new Response(JSON.stringify(educationList), { status: 200 });
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
    const newEducation = await req.json();

    if (!newEducation || Object.keys(newEducation).length === 0) {
      return new Response(
        JSON.stringify({
          error: "No data provided to create education",
        }),
        { status: 400 }
      );
    }

    const createdEducation = await createEducation(newEducation);
    return new Response(JSON.stringify(createdEducation), {
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

async function fetchAllEducation() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const response = await fetch(`${apiUrl}/educations`);
    if (!response.ok) {
      throw new Error("Failed to fetch data from the server");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching education:", error);
    throw new Error("Failed to fetch education");
  }
}

async function createEducation(newEducation: any) {
  try {
    const response = await fetch("http://localhost:5000/educations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEducation),
    });

    if (!response.ok) {
      throw new Error("Failed to create education");
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating education:", error);
    throw new Error("Failed to create education");
  }
}
