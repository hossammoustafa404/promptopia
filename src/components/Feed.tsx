"use client";

import { ChangeEvent, useEffect, useState } from "react";
import Waiting from "./Waiting";
import getAllPrompts from "@lib/client/axios/getAllPrompts";
import PromptsList from "./PromptsList";
import { FaSearch } from "react-icons/fa";
import deleteSinglePrompt from "@lib/client/axios/deleteSinglePrompt";

const Feed = () => {
  const [prompts, setPrompts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [promptSearch, setPromptSearch] = useState("");

  const [searchCategory, setSearchCategory] = useState("name");

  // const handlePromptSearch = async (e: ChangeEvent<HTMLInputElement>) => {
  //   setPromptSearch(() => e.target.value);

  //   const data = await getAllPrompts("/api/prompts", {
  //     [searchCategory]: e.target.value,
  //   });

  //   setPrompts(data);
  // };

  useEffect(() => {
    const getPrompts = async () => {
      setIsLoading(true);
      const data = await getAllPrompts("/api/prompts");
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
      {/* <form className="max-w-lg mx-auto mt-12 mb-28 h-9">
        <div className="pl-4 bg-white flex items-center border-2 border-slate-400 rounded-md overflow-hidden h-full">
          <FaSearch className="text-slate-400" />
          <input
            type="text"
            name="prompt-search"
            id="prompt-search"
            value={promptSearch}
            onChange={handlePromptSearch}
            className="w-full outline-none  px-3 py-1"
          />
          <select
            className="outline-none h-full bg-blue-500 text-white font-semibold pl-3 text-sm"
            name="select-search"
            id="select-search"
            value={searchCategory}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setSearchCategory(e.target.value)
            }
          >
            <option value="name" className="bg-white text-black">
              Name
            </option>
            <option value="email" className="bg-white text-black">
              Email
            </option>
            <option value="content" className="bg-white text-black">
              Content
            </option>
            <option value="category" className="bg-white text-black">
              Category
            </option>
          </select>
        </div>
      </form> */}
      <div className="container">{renderedContent}</div>
    </section>
  );
};

export default Feed;
