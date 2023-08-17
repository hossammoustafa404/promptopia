"use client";

import { Feed, PromptsList } from "@components";
import Waiting from "@components/Waiting";
import deleteSinglePrompt from "@lib/client/axios/deleteSinglePrompt";
import getAllPrompts from "@lib/client/axios/getAllPrompts";
import { useEffect, useState } from "react";

interface props {
  params: {
    category: string;
  };
}

const Category = ({ params }: props) => {
  const [prompts, setPrompts] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPrompts = async () => {
      setIsLoading(true);
      const data = await getAllPrompts("/api/prompts", {
        category: params.category,
      });
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

  return (
    <section>
      <div className="container">
        <h2 className="head-gradient mb-14">#{params.category}</h2>
        {isLoading ? (
          <Waiting />
        ) : prompts.length ? (
          <PromptsList
            prompts={prompts}
            deletePrompt={deletePrompt}
            className="grid justify-center gap-y-6 md:grid-cols-2 md:gap-6 lg:grid-cols-3"
          />
        ) : (
          <p className="mt-12 text-center">No prompts yet</p>
        )}
      </div>
    </section>
  );
};

export default Category;
