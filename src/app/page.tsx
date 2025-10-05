import { AddSnippetForm } from "@/feature/snippet/components/add-snippet-form";
import SnippetList from "@/feature/snippet/components/snippet-list";

export default async function Home() {
  return (
    <>
      <h1 className="text-4xl font-bold mb-8 text-center">Code Snippets</h1>
      <AddSnippetForm />
      <SnippetList />
    </>
  );
}
