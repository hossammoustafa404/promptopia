"use client";

// Start Imports
import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
// End Imports

// Start Component
const Navbar = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [openDropMenu, setOpenDropMenu] = useState(false);

  return (
    <nav className="sticky top-0 z-10 min-h-[4.5rem] flex items-center mb-12 bg-white drop-shadow-sm">
      <div className="container flex">
        <Link href="/" className="flex gap-2 items-center">
          <Image
            src="/assets/imgs/logo.svg"
            alt="Logo"
            width={35}
            height={20}
          />
          <h1 className="font-bold text-xl sm:text-2xl text-slate-800 hidden sm:block">
            Promptopia
          </h1>
        </Link>

        {status === "authenticated" ? (
          <>
            {/* Desktop Devices */}
            <div className="hidden sm:flex ml-auto gap-3.5">
              <button
                type="button"
                className="black-btn"
                onClick={() => {
                  router.push("/create-prompt");
                }}
              >
                Create Post
              </button>
              <button
                type="button"
                className="outlined-btn"
                onClick={async () => {
                  signOut({ callbackUrl: "/" });
                }}
              >
                Sign Out
              </button>
              <Link href={`/profiles/${session?.user?.id}`}>
                <img
                  src={session?.user?.image as string}
                  alt="Profile Picture"
                  className="w-8 h-8 rounded-full"
                />
              </Link>
            </div>

            {/* Mobile Devices */}
            <div className="sm:hidden ml-auto relative">
              <button
                type="button"
                className="flex items-center gap-x-2"
                onClick={() => setOpenDropMenu((prev) => !prev)}
              >
                <img
                  src={session?.user?.image as string}
                  alt="Profile Picture"
                  className="w-8 h-8 rounded-full ml-3.5"
                />
                <div
                  className={`w-0 h-0 border-[0.4rem] border-transparent border-t-slate-600 ${
                    openDropMenu && "mb-[0.5rem] rotate-180"
                  } duration-300`}
                />
              </button>

              {/* Drop Menu */}
              {openDropMenu && (
                <ul
                  className={`absolute top-[calc(100%+0.5rem)] right-0 w-[10rem] rounded-md bg-white drop-shadow-2xl p-4 flex flex-col gap-y-6 items-center
                    `}
                >
                  <li>
                    <Link
                      href={`/profiles/${session?.user?.id}`}
                      className="font-bold text-md text-slate-700 hover:text-slate-700/70 duration-300"
                      onClick={() => setOpenDropMenu(() => false)}
                    >
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="black-btn text-sm"
                      onClick={() => {
                        setOpenDropMenu(() => false);
                        signOut({ callbackUrl: "/" });
                      }}
                    >
                      Create Post
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="outlined-btn text-sm"
                      onClick={() => {
                        setOpenDropMenu(() => false);
                        signOut();
                        redirect("/");
                      }}
                    >
                      Sign Out
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </>
        ) : (
          <button
            type="button"
            className="black-btn ml-auto"
            onClick={() => signIn("google")}
          >
            Sign in
          </button>
        )}
      </div>
    </nav>
  );
};
// End Component

export default Navbar;
