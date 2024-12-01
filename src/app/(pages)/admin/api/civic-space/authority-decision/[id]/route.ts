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

    const authorityDecision = await fetchAuthorityDecision(numId);
    return new Response(JSON.stringify(authorityDecision), {
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

    await deleteAuthorityDecision(numId);
    return new Response(
      JSON.stringify({
        message: `Authority Decision with ID ${id} deleted successfully`,
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

    const updatedAuthorityDecision = await updateAuthorityDecision(
      numId,
      updatedData
    );
    return new Response(JSON.stringify(updatedAuthorityDecision), {
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

// Function to fetch a single authority decision by ID
async function fetchAuthorityDecision(id: number) {
  try {
    const response = await fetch(
      `http://localhost:5000/authorityDecisions/${id}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data from the server");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching authority decision:", error);
    throw new Error("Failed to fetch authority decision");
  }
}

// Function to delete an authority decision by ID
async function deleteAuthorityDecision(id: number) {
  try {
    const response = await fetch(
      `http://localhost:5000/authorityDecisions/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete authority decision");
    }
  } catch (error) {
    console.error("Error deleting authority decision:", error);
    throw new Error("Failed to delete authority decision");
  }
}

// Function to update an authority decision by ID
async function updateAuthorityDecision(id: number, updatedData: any) {
  try {
    const response = await fetch(
      `http://localhost:5000/authorityDecisions/${id}`,
      {
        method: "PATCH", // Use PATCH or PUT depending on the situation
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update authority decision");
    }

    const updatedAuthorityDecision = await response.json();
    return updatedAuthorityDecision;
  } catch (error) {
    console.error("Error updating authority decision:", error);
    throw new Error("Failed to update authority decision");
  }
}
