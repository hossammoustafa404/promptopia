"use client";

import { CustomForm } from "@components";
import { useEffect, useState } from "react";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const CreatePrompt = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn("google");
    }
  }, [status]);

  const [formValues, setFormValues] = useState<{
    content: string;
    category: string;
  }>({
    content: "",
    category: "",
  });

  const router = useRouter();
  const createPrompt = async (e: SubmitEvent) => {
    e.preventDefault();
    const { data } = await axios.post("/api/prompts", {
      user: session?.user?.id,
      ...formValues,
    });
    router.push("/");
  };

  return (
    <section>
      <div className="container">
        <CustomForm
          type="create"
          formValues={formValues}
          setFormValues={setFormValues}
          createPrompt={createPrompt}
        />
      </div>
    </section>
  );
};

export default CreatePrompt;
