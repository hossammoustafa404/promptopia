"use client";

import Link from "next/link";
import { FaCopy, FaEdit, FaTrash } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useState } from "react";
import ConfirmModal from "./ConfirmModal";

interface props {
  _id: string;
  content: string;
  category: string;
  user: any;
  copiedPromptId: string;
  setCopiedPromptId: any;
  deletePrompt: any;
}

const PromptCard = ({
  _id: promptId,
  content,
  category,
  user,
  copiedPromptId,
  setCopiedPromptId,
  deletePrompt,
}: props) => {
  const { data: session } = useSession();
  const [readMore, setReadMore] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const handleCopy = () => {
    window.navigator.clipboard.writeText(content);
    setCopiedPromptId(promptId);
  };

  const confirmDelete = async () => {
    await deletePrompt(promptId);
    setOpenConfirmModal(() => false);
  };

  return (
    <>
      <article className="p-6 bg-white max-w-md drop-shadow-md rounded-md min-h-[25rem] flex flex-col">
        <header className="flex items-center mb-5">
          <Link
            href={`/profiles/${user._id}`}
            className="flex items-center gap-4"
          >
            <img
              src={user.image}
              alt="Profile Image"
              className="w-9 h-9 rounded-full"
            />
            <div>
              <p className="font-semibold text-md">{user.name}</p>
              <p className="text-gray-500 text-sm">{user.email}</p>
            </div>
          </Link>
          {promptId === copiedPromptId ? (
            <span className="ml-auto text-gray-400 text-sm font-semibold">
              Copied
            </span>
          ) : (
            <button type="button" className="ml-auto" onClick={handleCopy}>
              <FaCopy className="text-green-700" />
            </button>
          )}
        </header>

        <div className="mb-5">
          <p className="break-words inline">
            {content.length > 400
              ? readMore
                ? content
                : content.slice(0, 400) + "..."
              : content}
          </p>
          {content.length > 400 && (
            <button
              type="button"
              onClick={() => {
                setReadMore((prev) => !prev);
              }}
              className="text-blue-500 text-sm ml-2"
            >
              {readMore ? "Read Less" : "Read More"}
            </button>
          )}
        </div>

        <footer className="flex mt-auto">
          <Link href={`/categories/${category}`} className="text-blue-600">
            #{category}
          </Link>

          {session?.user?.id === user._id && (
            <div className="ml-auto flex gap-4 items-center">
              <button onClick={() => setOpenConfirmModal(() => true)}>
                <FaTrash className="text-sm  text-red-600" />
              </button>
              <Link href={`edit-prompt/${promptId}`}>
                <FaEdit className="text-sm  text-green-600" />
              </Link>
            </div>
          )}
        </footer>
      </article>
      {openConfirmModal && (
        <ConfirmModal
          text="Are you sure you want to delete this prompt?"
          setOpenConfirmModal={setOpenConfirmModal}
          confirmDelete={confirmDelete}
        />
      )}
    </>
  );
};

export default PromptCard;
