"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import CodeMirror from "@uiw/react-codemirror";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { addSnippetAction } from "../actions/actions";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import { authClient } from "@/lib/auth/auth-client";

export function AddSnippetForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("// Write your code here\n");
  const { data: session, isPending } = authClient.useSession();

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    try {
      const result = await addSnippetAction(formData);
      if (result) {
        toast.error(result);
      } else {
        toast.success("Snippet added");
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Failed to add Snippet:", error);
      toast.error("Failed to add Snippet. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isPending || !session?.user?.id) return null;

  if (!isOpen) {
    return (
      <Button onClick={() => setIsOpen(true)} className="mb-6 cursor-pointer">
        <Plus className="w-4 h-4 mr-2" />
        Add New Snippet
      </Button>
    );
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Add New Snippet</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Title *
            </label>
            <Input
              id="title"
              name="title"
              placeholder="Enter snippet title"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium mb-1"
            >
              Description
            </label>
            <Textarea
              id="description"
              name="description"
              placeholder="Enter snippet description (optional)"
              disabled={isLoading}
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Language</label>
            <select
              name="language"
              className="w-full border rounded px-3 py-2 text-sm mb-2"
              defaultValue="javascript"
              disabled={isLoading}
            >
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="python">Python</option>
              <option value="json">JSON</option>
              <option value="text">Plain Text</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Code</label>

            <input type="hidden" name="code" value={code} />

            <div className="border rounded overflow-hidden">
              <CodeMirror
                value={code}
                height="240px"
                extensions={[javascript({ jsx: true }), oneDark]}
                onChange={(value) => setCode(value)}
                theme={oneDark}
              />
            </div>

            <div className="mt-2 flex gap-2">
              <Button
                onClick={() => navigator.clipboard.writeText(code)}
                type="button"
                variant="ghost"
              >
                Copy
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setCode("// New snippet\n")}
              >
                Reset
              </Button>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Snippet"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
