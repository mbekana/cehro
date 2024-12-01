import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    const category = await fetchCategory(id);
    return NextResponse.json(category, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    if (!id || id.trim() === "") {
      return NextResponse.json(
        { error: "Invalid ID parameter" },
        {
          status: 400,
        }
      );
    }

    await deleteCategory(id);
    return NextResponse.json(
      {
        message: `Category with ID ${id} deleted successfully`,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request, context: { params: { id: string } }) {
  try {
    const { id } = context.params;

    if (!id || id.trim() === "") {
      return NextResponse.json(
        { error: "Invalid ID parameter" },
        {
          status: 400,
        }
      );
    }

    const updatedData = await req.json();

    if (!updatedData || Object.keys(updatedData).length === 0) {
      return NextResponse.json(
        { error: "No data provided to update" },
        { status: 400 }
      );
    }

    const updatedCategory = await updateCategory(id, updatedData);
    return NextResponse.json(updatedCategory, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}

async function fetchCategory(id: string) {
  try {
    const response = await fetch(`http://localhost:5000/categories/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch data from the server");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching category:", error);
    throw new Error("Failed to fetch category");
  }
}

async function deleteCategory(id: string) {
  try {
    const response = await fetch(`http://localhost:5000/categories/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete category");
    }
  } catch (error) {
    console.error("Error deleting category:", error);
    throw new Error("Failed to delete category");
  }
}

async function updateCategory(id: string, updatedData: any) {
  try {
    const response = await fetch(`http://localhost:5000/categories/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error("Failed to update category");
    }

    return response.json();
  } catch (error) {
    console.error("Error updating category:", error);
    throw new Error("Failed to update category");
  }
}
