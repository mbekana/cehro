export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const numId = Number(id);

    // Validate if the ID is a number
    if (isNaN(numId)) {
      return new Response(JSON.stringify({ error: "Invalid ID parameter" }), {
        status: 400,
      });
    }

    const legalFramework = await fetchLegalFramework(numId);
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

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const numId = Number(id);

    // Validate if the ID is a number
    if (isNaN(numId)) {
      return new Response(JSON.stringify({ error: "Invalid ID parameter" }), {
        status: 400,
      });
    }

    await deleteLegalFramework(numId);
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

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const numId = Number(id);

    // Validate if the ID is a number
    if (isNaN(numId)) {
      return new Response(JSON.stringify({ error: "Invalid ID parameter" }), {
        status: 400,
      });
    }

    // Parse the body of the request for update data
    const updatedData = await req.json();

    // Ensure the data to be updated is valid
    if (!updatedData || Object.keys(updatedData).length === 0) {
      return new Response(
        JSON.stringify({ error: "No data provided to update" }),
        { status: 400 }
      );
    }

    const updatedLegalFramework = await updateLegalFramework(
      numId,
      updatedData
    );
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

// Function to fetch a single legal framework by ID
async function fetchLegalFramework(id: number) {
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

// Function to delete a legal framework by ID
async function deleteLegalFramework(id: number) {
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

// Function to update a legal framework by ID
async function updateLegalFramework(id: number, updatedData: any) {
  try {
    const response = await fetch(
      `http://localhost:5000/legalFrameworks/${id}`,
      {
        method: "PATCH", // Use PATCH or PUT depending on the situation
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
