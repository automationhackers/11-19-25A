/**
 * Workflow Configuration
 *
 * This file defines the available n8n workflows that users can send files to.
 * The actual webhook URLs and bearer tokens are stored securely in .env.local
 *
 * To add a new workflow:
 * 1. Add the webhook URL and bearer token to .env.local:
 *    WORKFLOW_1_WEBHOOK_URL=https://your-n8n-instance.com/webhook/...
 *    WORKFLOW_1_BEARER_TOKEN=your_secret_token_here
 *
 * 2. Add the workflow configuration below with a user-friendly name
 */

export interface WorkflowConfig {
  id: string;
  name: string;
  description: string;
  webhookUrl: string;
  bearerToken: string;
}

/**
 * Get all configured workflows
 * Automatically reads from environment variables
 */
export function getWorkflows(): WorkflowConfig[] {
  const workflows: WorkflowConfig[] = [];

  // Workflow 1 - Example: Receipt Processing
  if (process.env.NEXT_PUBLIC_WORKFLOW_1_NAME) {
    workflows.push({
      id: "workflow_1",
      name: process.env.NEXT_PUBLIC_WORKFLOW_1_NAME,
      description: process.env.NEXT_PUBLIC_WORKFLOW_1_DESCRIPTION || "",
      webhookUrl: process.env.WORKFLOW_1_WEBHOOK_URL || "",
      bearerToken: process.env.WORKFLOW_1_BEARER_TOKEN || "",
    });
  }

  // Workflow 2 - Add more workflows by following the same pattern
  if (process.env.NEXT_PUBLIC_WORKFLOW_2_NAME) {
    workflows.push({
      id: "workflow_2",
      name: process.env.NEXT_PUBLIC_WORKFLOW_2_NAME,
      description: process.env.NEXT_PUBLIC_WORKFLOW_2_DESCRIPTION || "",
      webhookUrl: process.env.WORKFLOW_2_WEBHOOK_URL || "",
      bearerToken: process.env.WORKFLOW_2_BEARER_TOKEN || "",
    });
  }

  // Workflow 3
  if (process.env.NEXT_PUBLIC_WORKFLOW_3_NAME) {
    workflows.push({
      id: "workflow_3",
      name: process.env.NEXT_PUBLIC_WORKFLOW_3_NAME,
      description: process.env.NEXT_PUBLIC_WORKFLOW_3_DESCRIPTION || "",
      webhookUrl: process.env.WORKFLOW_3_WEBHOOK_URL || "",
      bearerToken: process.env.WORKFLOW_3_BEARER_TOKEN || "",
    });
  }

  // Workflow 4
  if (process.env.NEXT_PUBLIC_WORKFLOW_4_NAME) {
    workflows.push({
      id: "workflow_4",
      name: process.env.NEXT_PUBLIC_WORKFLOW_4_NAME,
      description: process.env.NEXT_PUBLIC_WORKFLOW_4_DESCRIPTION || "",
      webhookUrl: process.env.WORKFLOW_4_WEBHOOK_URL || "",
      bearerToken: process.env.WORKFLOW_4_BEARER_TOKEN || "",
    });
  }

  // Workflow 5
  if (process.env.NEXT_PUBLIC_WORKFLOW_5_NAME) {
    workflows.push({
      id: "workflow_5",
      name: process.env.NEXT_PUBLIC_WORKFLOW_5_NAME,
      description: process.env.NEXT_PUBLIC_WORKFLOW_5_DESCRIPTION || "",
      webhookUrl: process.env.WORKFLOW_5_WEBHOOK_URL || "",
      bearerToken: process.env.WORKFLOW_5_BEARER_TOKEN || "",
    });
  }

  return workflows;
}

/**
 * Get a specific workflow by ID
 */
export function getWorkflowById(id: string): WorkflowConfig | undefined {
  return getWorkflows().find((workflow) => workflow.id === id);
}
