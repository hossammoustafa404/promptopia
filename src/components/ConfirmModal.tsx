import React from "react";

interface props {
  text: string;
  setOpenConfirmModal: any;
  confirmDelete: any;
}

const ConfirmModal = ({ text, setOpenConfirmModal, confirmDelete }: props) => {
  return (
    <section className="fixed z-20 top-0 left-0 w-screen h-screen">
      <div
        className="h-full bg-gray-600/60"
        onClick={() => setOpenConfirmModal(() => false)}
      />
      <article className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white drop-shadow-md p-8 rounded-md">
        <p className="">{text}</p>
        <footer className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setOpenConfirmModal(() => false)}
            className="text-gray-500 font-semibold"
          >
            No
          </button>
          <button
            type="button"
            onClick={() => confirmDelete()}
            className="text-red-600 font-semibold"
          >
            Yes
          </button>
        </footer>
      </article>
    </section>
  );
};

export default ConfirmModal;
