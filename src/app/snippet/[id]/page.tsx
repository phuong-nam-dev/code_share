import SnippetCard from "@/components/SnippetCard";
import { getDetailSnippet } from "@/feature/snippet/actions/actions";
import React from "react";

const page = async (props: PageProps<"/snippet/[id]">) => {
  const { id } = await props.params;

  const detailSnippet = await getDetailSnippet(id);

  return <SnippetCard snippet={detailSnippet} />;
};

export default page;
