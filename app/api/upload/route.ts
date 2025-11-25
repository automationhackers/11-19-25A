import { NextRequest, NextResponse } from "next/server";
import { getWorkflowById } from "@/lib/workflows.config";

/**
 * API Route: /api/upload
 *
 * Handles file uploads and forwards them to n8n webhooks with authentication.
 * This avoids CORS issues and keeps bearer tokens server-side only.
 */
export async function POST(request: NextRequest) {
  try {
    // Get the workflow ID from query params
    const searchParams = request.nextUrl.searchParams;
    const workflowId = searchParams.get("workflowId");

    if (!workflowId) {
      return NextResponse.json(
        { error: "Workflow ID is required" },
        { status: 400 }
      );
    }

    // Look up the workflow configuration
    const workflow = getWorkflowById(workflowId);

    if (!workflow) {
      return NextResponse.json(
        { error: "Workflow not found" },
        { status: 404 }
      );
    }

    if (!workflow.webhookUrl || !workflow.bearerToken) {
      return NextResponse.json(
        { error: "Workflow is not properly configured" },
        { status: 500 }
      );
    }

    // Get the form data from the request
    const formData = await request.formData();

    // Forward the request to n8n webhook with bearer token
    console.log("=== Upload Debug ===");
    console.log("Webhook URL:", workflow.webhookUrl);
    console.log("Bearer Token:", workflow.bearerToken);
    console.log("Full Auth Header:", `Bearer ${workflow.bearerToken}`);
    console.log("==================");

    const response = await fetch(workflow.webhookUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${workflow.bearerToken}`,
      },
      body: formData,
    });

    // Check if the request was successful
    if (!response.ok) {
      const errorText = await response.text();
      console.error("n8n webhook error:", errorText);
      return NextResponse.json(
        {
          error: `Webhook request failed: ${response.statusText}`,
          details: errorText,
        },
        { status: response.status }
      );
    }

    // Get the response from n8n
    const result = await response.json().catch(() => ({}));

    // Return success response
    return NextResponse.json({
      success: true,
      message: `Successfully uploaded to ${workflow.name}`,
      data: result,
    });
  } catch (error) {
    console.error("Upload API error:", error);
    return NextResponse.json(
      {
        error: "Upload failed",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

