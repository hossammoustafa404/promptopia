"use client";

import { CustomForm } from "@components";
import { useEffect, useState } from "react";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import getSinglePrompt from "@lib/client/axios/getSinglePrompt";

const EditPrompt = ({ params }: { params: { promptId: string } }) => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn("google");
    }

    const getPrompt = async () => {
      const { prompt } = await getSinglePrompt(params.promptId);

      setFormValues({ content: prompt?.content, category: prompt?.category });
    };

    getPrompt();
  }, [status]);

  const [formValues, setFormValues] = useState<{
    content: string;
    category: string;
  }>({
    content: "",
    category: "",
  });

  const router = useRouter();
  const editPrompt = async (e: SubmitEvent) => {
    e.preventDefault();
    const { data } = await axios.patch(
      `/api/prompts/${params.promptId}`,
      formValues
    );
    router.push("/");
  };

  return (
    <section>
      <div className="container">
        <CustomForm
          type="edit"
          formValues={formValues}
          setFormValues={setFormValues}
          createPrompt={editPrompt}
        />
      </div>
    </section>
  );
};

export default EditPrompt;
