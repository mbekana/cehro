export async function GET() {
  try {
    const categories = await fetchAllCategories();
    return new Response(JSON.stringify(categories), { status: 200 });
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
    const newCategory = await req.json();

    if (!newCategory || Object.keys(newCategory).length === 0) {
      return new Response(
        JSON.stringify({
          error: "No data provided to create a category",
        }),
        { status: 400 }
      );
    }

    const createdCategory = await createCategory(newCategory);
    return new Response(JSON.stringify(createdCategory), {
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

// Function to fetch all categories
async function fetchAllCategories() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const response = await fetch(`${apiUrl}/categories`);
    if (!response.ok) {
      throw new Error("Failed to fetch data from the server");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch categories");
  }
}

// Function to create a new category
async function createCategory(newCategory: any) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const response = await fetch(`${apiUrl}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCategory),
    });

    if (!response.ok) {
      throw new Error("Failed to create category");
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating category:", error);
    throw new Error("Failed to create category");
  }
}
