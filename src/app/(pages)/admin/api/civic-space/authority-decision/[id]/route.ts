export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    const authorityDecision = await fetchAuthorityDecision(id);
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

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    await deleteAuthorityDecision(id);
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

    const updatedAuthorityDecision = await updateAuthorityDecision(
      id,
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

async function fetchAuthorityDecision(id: string) {
  try {
    const response = await fetch(
      `https://cehro-backend.onrender.com/authorityDecisions/${id}`
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

async function deleteAuthorityDecision(id: string) {
  try {
    const response = await fetch(
      `https://cehro-backend.onrender.com/authorityDecisions/${id}`,
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

async function updateAuthorityDecision(id: string, updatedData: any) {
  try {
    const response = await fetch(
      `https://cehro-backend.onrender.com/authorityDecisions/${id}`,
      {
        method: "PATCH",
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
