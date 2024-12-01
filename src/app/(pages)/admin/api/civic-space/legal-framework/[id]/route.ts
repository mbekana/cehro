export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    const legalFramework = await fetchLegalFramework(id);
    return new Response(JSON.stringify(legalFramework), {
      status: 200,
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

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    await deleteLegalFramework(id);
    return new Response(
      JSON.stringify({
        message: `Legal Framework with ID ${id} deleted successfully`,
      }),
      { status: 200 }
    );
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

export async function PATCH(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    const updatedData = await req.json();

    if (!updatedData || Object.keys(updatedData).length === 0) {
      return new Response(
        JSON.stringify({ error: "No data provided to update" }),
        { status: 400 }
      );
    }

    const updatedLegalFramework = await updateLegalFramework(id, updatedData);
    return new Response(JSON.stringify(updatedLegalFramework), {
      status: 200,
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

async function fetchLegalFramework(id: string) {
  try {
    const response = await fetch(`http://localhost:5000/legalFrameworks/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch data from the server");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching legal framework:", error);
    throw new Error("Failed to fetch legal framework");
  }
}

async function deleteLegalFramework(id: string) {
  try {
    const response = await fetch(
      `http://localhost:5000/legalFrameworks/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete legal framework");
    }
  } catch (error) {
    console.error("Error deleting legal framework:", error);
    throw new Error("Failed to delete legal framework");
  }
}

async function updateLegalFramework(id: string, updatedData: any) {
  try {
    const response = await fetch(
      `http://localhost:5000/legalFrameworks/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update legal framework");
    }

    const updatedLegalFramework = await response.json();
    return updatedLegalFramework;
  } catch (error) {
    console.error("Error updating legal framework:", error);
    throw new Error("Failed to update legal framework");
  }
}
