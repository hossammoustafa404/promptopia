"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent } from "react";

interface props {
  type: "create" | "edit";
  formValues: { content: string; category: string };
  setFormValues: any;
  createPrompt: any;
}

const CustomForm = ({
  type,
  formValues,
  setFormValues,
  createPrompt,
}: props) => {
  const router = useRouter();

  return (
    <section className="max-w-[45rem]">
      <article>
        <h2 className="capitalize head-gradient">{type} Prompt</h2>
        <p className="desc">
          <span className="capitalize">{type}</span> and share amazing prompts
          with the world, and let your imagination run wild with any AI-powered
          platform
        </p>
      </article>

      <form
        className="mt-12 bg-slate-200 p-4 rounded-md"
        onSubmit={createPrompt}
      >
        <div>
          <label htmlFor="content" className="font-semibold">
            Your AI Prompt
          </label>
          <textarea
            id="content"
            name="content"
            value={formValues.content}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setFormValues({ ...formValues, content: e.target.value })
            }
            className="mt-1.5 block resize-none outline-none w-full h-60 overflow-y-auto px-3 py-1"
          />
        </div>

        <div className="mt-4">
          <label htmlFor="category" className="font-semibold">
            Category (product, web_development, idea, etc.)
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={formValues.category}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFormValues({ ...formValues, category: e.target.value })
            }
            className="mt-1.5 outline-none block w-full px-3 py-1"
          />
        </div>

        <div className="mt-8 text-end">
          <button
            type="button"
            className="capitalize text-slate-500 mr-4"
            onClick={() => router.push("/")}
          >
            cancel
          </button>
          <button type="submit" className="capitalize black-btn ">
            {type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CustomForm;
