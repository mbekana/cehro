export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    if (!id || typeof id !== "string" || id.trim() === "") {
      return new Response(JSON.stringify({ error: "Invalid ID parameter" }), {
        status: 400,
      });
    }

    const incident = await fetchIncident(id);
    return new Response(JSON.stringify(incident), {
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

    if (!id || typeof id !== "string" || id.trim() === "") {
      return new Response(JSON.stringify({ error: "Invalid ID parameter" }), {
        status: 400,
      });
    }

    await deleteIncident(id);
    return new Response(
      JSON.stringify({
        message: `Incident with ID ${id} deleted successfully`,
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

    if (!id || typeof id !== "string" || id.trim() === "") {
      return new Response(JSON.stringify({ error: "Invalid ID parameter" }), {
        status: 400,
      });
    }

    const updatedData = await req.json();

    if (!updatedData || Object.keys(updatedData).length === 0) {
      return new Response(
        JSON.stringify({ error: "No data provided to update" }),
        { status: 400 }
      );
    }

    const updatedIncident = await updateIncident(id, updatedData);
    return new Response(JSON.stringify(updatedIncident), {
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

async function fetchIncident(id: string) {
  try {
    const response = await fetch(`http://localhost:5000/incidents/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch data from the server");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching incident:", error);
    throw new Error("Failed to fetch incident");
  }
}

async function deleteIncident(id: string) {
  try {
    const response = await fetch(`http://localhost:5000/incidents/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete incident");
    }
  } catch (error) {
    console.error("Error deleting incident:", error);
    throw new Error("Failed to delete incident");
  }
}

async function updateIncident(id: string, updatedData: any) {
  try {
    const response = await fetch(`http://localhost:5000/incidents/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error("Failed to update incident");
    }

    const updatedIncident = await response.json();
    return updatedIncident;
  } catch (error) {
    console.error("Error updating incident:", error);
    throw new Error("Failed to update incident");
  }
}
