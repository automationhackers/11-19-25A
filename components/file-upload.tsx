"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, File, X, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { getWorkflows, type WorkflowConfig } from "@/lib/workflows.config"

export function FileUpload() {
  const [files, setFiles] = useState<File[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [selectedWorkflow, setSelectedWorkflow] = useState<string>("")
  const [workflows, setWorkflows] = useState<WorkflowConfig[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Load workflows on component mount
  useEffect(() => {
    const availableWorkflows = getWorkflows()
    setWorkflows(availableWorkflows)
    // Don't auto-select - user must consciously choose workflow
  }, [])

  const MAX_UPLOAD_SIZE = 4.5 * 1000 * 1000; // 4.5 MB (decimal) in bytes, to match Vercel's limit

  const getTotalFilesSize = (fileList: File[]): number => {
    return fileList.reduce((acc, file) => acc + file.size, 0);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    setUploadStatus(null); // Clear previous status on new file selection

    const droppedFiles = Array.from(e.dataTransfer.files)
    const currentTotalSize = getTotalFilesSize(files);
    const newFilesTotalSize = getTotalFilesSize(droppedFiles);

    if (currentTotalSize + newFilesTotalSize > MAX_UPLOAD_SIZE) {
      setUploadStatus(
        `Total file size exceeds the 4.5 MB limit. Current: ${(
          currentTotalSize /
          (1000 * 1000)
        ).toFixed(2)} MB, Adding: ${(
          newFilesTotalSize /
          (1000 * 1000)
        ).toFixed(2)} MB.`
      );
      return;
    }

    setFiles(prev => [...prev, ...droppedFiles])
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadStatus(null); // Clear previous status on new file selection
      const selectedFiles = Array.from(e.target.files)
      const currentTotalSize = getTotalFilesSize(files);
      const newFilesTotalSize = getTotalFilesSize(selectedFiles);

      if (currentTotalSize + newFilesTotalSize > MAX_UPLOAD_SIZE) {
        setUploadStatus(
                  `Total file size exceeds the 4.5 MB limit. Current: ${(
                    currentTotalSize /
                    (1000 * 1000)
                  ).toFixed(2)} MB, Adding: ${(
                    newFilesTotalSize /
                    (1000 * 1000)
                  ).toFixed(2)} MB.`        );
        // Clear the input to allow re-selection
        if (fileInputRef.current) {
          e.target.value = "";
        }
        return;
      }

      setFiles(prev => [...prev, ...selectedFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleUpload = async () => {
    // --- All validation happens first ---
    if (files.length === 0) {
      setUploadStatus("Please select at least one file");
      return;
    }

    if (!selectedWorkflow) {
      setUploadStatus("Please select a workflow");
      return;
    }

    const workflow = workflows.find((w) => w.id === selectedWorkflow);
    if (!workflow) {
      setUploadStatus("Selected workflow not found");
      return;
    }

    const totalCurrentUploadSize = getTotalFilesSize(files);
    if (totalCurrentUploadSize > MAX_UPLOAD_SIZE) {
      setUploadStatus(
        `Upload cancelled: Total file size (${(
          totalCurrentUploadSize /
          (1000 * 1000)
        ).toFixed(2)} MB) exceeds the 4.5 MB limit.`
      );
      return;
    }

    // --- If validation passes, proceed with upload ---
    setUploading(true);
    setUploadStatus(null);

    try {
      // Create FormData to send files
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append(`file${index}`, file);
      });

      // Send to our API route which forwards to n8n
      // This avoids CORS issues and keeps bearer tokens server-side
      const response = await fetch(`/api/upload?workflowId=${selectedWorkflow}`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || `Upload failed: ${response.statusText}`);
      }

      setUploadStatus(`Successfully uploaded ${files.length} file(s) to ${workflow.name}!`);
      setFiles([]); // Clear files after successful upload
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus(
        error instanceof Error ? error.message : "Upload failed. Please try again."
      );
    } finally {
      setUploading(false);
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-8">
        {/* Workflow Selector */}
        {workflows.length > 0 ? (
          <div className="mb-6">
            <label
              htmlFor="workflow"
              className="block text-sm font-semibold mb-3"
            >
              Select Workflow
            </label>
            <select
              id="workflow"
              value={selectedWorkflow}
              onChange={(e) => setSelectedWorkflow(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-muted-foreground/25 bg-background focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Select a workflow...</option>
              {workflows.map((workflow) => (
                <option key={workflow.id} value={workflow.id}>
                  {workflow.name}
                  {workflow.description && ` - ${workflow.description}`}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              No workflows configured. Please add workflow configuration to your
              environment variables.
            </p>
          </div>
        )}

        {/* Upload Status */}
        {uploadStatus && (
          <div
            className={cn(
              "mb-6 p-4 rounded-lg border text-sm",
              uploadStatus.includes("Success")
                ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200"
                : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200"
            )}
          >
            {uploadStatus}
          </div>
        )}

        {/* Upload Area */}
        <div
          onDragOver={!selectedWorkflow ? undefined : handleDragOver}
          onDragLeave={!selectedWorkflow ? undefined : handleDragLeave}
          onDrop={!selectedWorkflow ? undefined : handleDrop}
          className={cn(
            "border-2 border-dashed rounded-lg p-12 text-center transition-all",
            !selectedWorkflow
              ? "border-muted-foreground/10 bg-muted/20 cursor-not-allowed opacity-50"
              : isDragging
              ? "border-purple-500 bg-purple-50 dark:bg-purple-950/20 cursor-pointer"
              : "border-muted-foreground/25 hover:border-purple-500/50 hover:bg-muted/50 cursor-pointer"
          )}
          onClick={() => selectedWorkflow && fileInputRef.current?.click()}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Upload className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-lg font-semibold mb-1">
                {selectedWorkflow
                  ? "Drop files here or click to browse"
                  : "Select a workflow first"}
              </p>
              <p className="text-sm text-muted-foreground">
                {selectedWorkflow
                  ? "Support for any file type"
                  : "Choose a workflow from the dropdown above to upload files"}
              </p>
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileSelect}
            disabled={!selectedWorkflow}
            className="hidden"
          />
        </div>

        {/* Selected Files */}
        {files.length > 0 && (
          <div className="mt-6 space-y-3">
            <h3 className="font-semibold text-lg">Selected Files</h3>
            <div className="space-y-2">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-lg group hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-gradient-to-br from-purple-500/10 to-pink-500/10 flex items-center justify-center">
                      <File className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Upload Button */}
            <Button
              onClick={handleUpload}
              disabled={uploading || workflows.length === 0}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  Upload {files.length} {files.length === 1 ? "File" : "Files"}
                </>
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
