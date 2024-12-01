export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const education = await fetchEducation(id);
    return new Response(JSON.stringify(education), {
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

    await deleteEducation(id);
    return new Response(
      JSON.stringify({
        message: `Education with ID ${id} deleted successfully`,
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

    const updatedEducation = await updateEducation(id, updatedData);
    return new Response(JSON.stringify(updatedEducation), {
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

async function fetchEducation(id: string) {
  try {
    const response = await fetch(`http://localhost:5000/educations/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch data from the server");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching education:", error);
    throw new Error("Failed to fetch education");
  }
}

async function deleteEducation(id: string) {
  try {
    const response = await fetch(`http://localhost:5000/educations/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete education");
    }
  } catch (error) {
    console.error("Error deleting education:", error);
    throw new Error("Failed to delete education");
  }
}

async function updateEducation(id: string, updatedData: any) {
  try {
    const response = await fetch(`http://localhost:5000/educations/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error("Failed to update education");
    }

    const updatedEducation = await response.json();
    return updatedEducation;
  } catch (error) {
    console.error("Error updating education:", error);
    throw new Error("Failed to update education");
  }
}
