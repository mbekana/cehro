export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    const socialMediaPost = await fetchSocialMediaPost(id);
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

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    await deleteSocialMediaPost(id);
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

    const updatedSocialMediaPost = await updateSocialMediaPost(id, updatedData);
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

async function fetchSocialMediaPost(id: string) {
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

async function deleteSocialMediaPost(id: string) {
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

async function updateSocialMediaPost(id: string, updatedData: any) {
  try {
    const response = await fetch(
      `http://localhost:5000/socialMediaPosts/${id}`,
      {
        method: "PATCH",
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
