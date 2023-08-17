"use client";

import { useState } from "react";
import PromptCard from "./PromptCard";
import deleteSinglePrompt from "@lib/client/axios/deleteSinglePrompt";

interface props {
  prompts: any;
  deletePrompt: any;
  className?: string;
}

const PromptsList = ({ prompts, deletePrompt, className }: props) => {
  const [copiedPromptId, setCopiedPromptId] = useState("");

  return (
    <section className={className}>
      {prompts.map((prompt: any) => (
        <PromptCard
          key={prompt._id}
          {...prompt}
          copiedPromptId={copiedPromptId}
          setCopiedPromptId={setCopiedPromptId}
          deletePrompt={deletePrompt}
        />
      ))}
    </section>
  );
};

export default PromptsList;
