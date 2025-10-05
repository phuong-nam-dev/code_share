import React from "react";
import SnippetCard from "./snippet-card";
import { getListSnippetList } from "../actions/actions";

const SnippetList = async () => {
  const snippets = await getListSnippetList();

  return snippets.map((item) => <SnippetCard key={item.id} snippet={item} />);
};

export default SnippetList;
