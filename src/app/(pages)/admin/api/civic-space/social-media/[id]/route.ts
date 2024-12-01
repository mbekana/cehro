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

    const socialMediaPost = await fetchSocialMediaPost(numId);
    return new Response(JSON.stringify(socialMediaPost), {
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

    await deleteSocialMediaPost(numId);
    return new Response(
      JSON.stringify({
        message: `Social Media Post with ID ${id} deleted successfully`,
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

    const updatedSocialMediaPost = await updateSocialMediaPost(
      numId,
      updatedData
    );
    return new Response(JSON.stringify(updatedSocialMediaPost), {
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

// Function to fetch a single social media post by ID
async function fetchSocialMediaPost(id: number) {
  try {
    const response = await fetch(
      `http://localhost:5000/socialMediaPosts/${id}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data from the server");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching social media post:", error);
    throw new Error("Failed to fetch social media post");
  }
}

// Function to delete a social media post by ID
async function deleteSocialMediaPost(id: number) {
  try {
    const response = await fetch(
      `http://localhost:5000/socialMediaPosts/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete social media post");
    }
  } catch (error) {
    console.error("Error deleting social media post:", error);
    throw new Error("Failed to delete social media post");
  }
}

// Function to update a social media post by ID
async function updateSocialMediaPost(id: number, updatedData: any) {
  try {
    const response = await fetch(
      `http://localhost:5000/socialMediaPosts/${id}`,
      {
        method: "PATCH", // Use PATCH or PUT depending on the situation
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update social media post");
    }

    const updatedSocialMediaPost = await response.json();
    return updatedSocialMediaPost;
  } catch (error) {
    console.error("Error updating social media post:", error);
    throw new Error("Failed to update social media post");
  }
}
