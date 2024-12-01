export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const occupation = await fetchOccupation(id);
    return new Response(JSON.stringify(occupation), {
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

    await deleteOccupation(id);
    return new Response(
      JSON.stringify({
        message: `Occupation with ID ${id} deleted successfully`,
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

    const updatedOccupation = await updateOccupation(id, updatedData);
    return new Response(JSON.stringify(updatedOccupation), {
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

async function fetchOccupation(id: string) {
  try {
    const response = await fetch(`http://localhost:5000/occupations/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch data from the server");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching occupation:", error);
    throw new Error("Failed to fetch occupation");
  }
}

async function deleteOccupation(id: string) {
  try {
    const response = await fetch(`http://localhost:5000/occupations/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete occupation");
    }
  } catch (error) {
    console.error("Error deleting occupation:", error);
    throw new Error("Failed to delete occupation");
  }
}

async function updateOccupation(id: string, updatedData: any) {
  try {
    const response = await fetch(`http://localhost:5000/occupations/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error("Failed to update occupation");
    }

    const updatedOccupation = await response.json();
    return updatedOccupation;
  } catch (error) {
    console.error("Error updating occupation:", error);
    throw new Error("Failed to update occupation");
  }
}
