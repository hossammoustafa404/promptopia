"use client";

import getAllPrompts from "@lib/client/axios/getAllPrompts";
import { useEffect, useState } from "react";
import Waiting from "./Waiting";
import PromptsList from "./PromptsList";
import deleteSinglePrompt from "@lib/client/axios/deleteSinglePrompt";

const ProfilePrompts = ({ userId }: { userId: string }) => {
  const [prompts, setPrompts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPrompts = async () => {
      setIsLoading(true);
      const data = await getAllPrompts(`/api/users/${userId}/prompts`);
      setPrompts(data);
      setIsLoading(false);
    };

    getPrompts();
  }, []);

  const deletePrompt = async (promptId: string) => {
    await deleteSinglePrompt(promptId);
    const filteredPrompts = prompts.filter(
      (item: any) => promptId !== item._id
    );
    setPrompts(filteredPrompts);
  };

  let renderedContent = <Waiting className="mx-auto mt-12" />;

  if (!isLoading) {
    if (prompts.length === 0) {
      renderedContent = <p className="mt-12 text-center">No Prompts Yet</p>;
    } else {
      renderedContent = (
        <PromptsList
          prompts={prompts}
          deletePrompt={deletePrompt}
          className="grid justify-center gap-y-6 md:grid-cols-2 md:gap-6 lg:grid-cols-3"
        />
      );
    }
  }

  return (
    <section>
      <div className="container">{renderedContent}</div>
    </section>
  );
};

export default ProfilePrompts;
