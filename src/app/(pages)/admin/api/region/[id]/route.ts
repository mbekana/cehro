export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const region = await fetchRegion(id);
    return new Response(JSON.stringify(region), {
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

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    if (!id || id.trim() === "") {
      return new Response(JSON.stringify({ error: "Invalid ID parameter" }), {
        status: 400,
      });
    }

    await deleteRegion(id);
    return new Response(
      JSON.stringify({
        message: `Region with ID ${id} deleted successfully`,
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

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    if (!id || id.trim() === "") {
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

    const updatedRegion = await updateRegion(id, updatedData);
    return new Response(JSON.stringify(updatedRegion), {
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

async function fetchRegion(id: string) {
  try {
    const response = await fetch(`http://localhost:5000/regions/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch data from the server");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching region:", error);
    throw new Error("Failed to fetch region");
  }
}

async function deleteRegion(id: string) {
  try {
    const response = await fetch(`http://localhost:5000/regions/${id}`, {
      // Change endpoint to /regions
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete region");
    }
  } catch (error) {
    console.error("Error deleting region:", error);
    throw new Error("Failed to delete region");
  }
}

async function updateRegion(id: string, updatedData: any) {
  try {
    const response = await fetch(`http://localhost:5000/regions/${id}`, {
      // Change endpoint to /regions
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error("Failed to update region");
    }

    const updatedRegion = await response.json();
    return updatedRegion;
  } catch (error) {
    console.error("Error updating region:", error);
    throw new Error("Failed to update region");
  }
}
