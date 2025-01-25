export async function GET() {
  try {
    const socialMediaPosts = await fetchAllSocialMediaPosts();
    return new Response(JSON.stringify(socialMediaPosts), { status: 200 });
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

export async function POST(req: Request) {
  try {
    const newSocialMediaPost = await req.json();

    if (!newSocialMediaPost || Object.keys(newSocialMediaPost).length === 0) {
      return new Response(
        JSON.stringify({
          error: "No data provided to create a social media post",
        }),
        { status: 400 }
      );
    }

    const createdSocialMediaPost = await createSocialMediaPost(
      newSocialMediaPost
    );
    return new Response(JSON.stringify(createdSocialMediaPost), {
      status: 201,
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

// Helper functions
async function fetchAllSocialMediaPosts() {
  const response = await fetch("http://localhost:5000/socialMediaPosts");
  if (!response.ok) {
    throw new Error("Failed to fetch data from the server");
  }
  return await response.json();
}

async function createSocialMediaPost(newSocialMediaPost: any) {
  const response = await fetch("http://localhost:5000/socialMediaPosts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newSocialMediaPost),
  });
  if (!response.ok) {
    throw new Error("Failed to create social media post");
  }
  return await response.json();
}
