"use client";

import { ProfilePrompts } from "@components";
import getSingleUser from "@lib/client/axios/getSingleUser";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Profile = ({ params: { userId } }: { params: { userId: string } }) => {
  const { data: session } = useSession();
  const [profileName, setProfileName] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const user = await getSingleUser(userId);
      setProfileName(user.name);
    };

    if (session?.user?.id === userId) {
      setProfileName("me");
    } else {
      getUser();
    }
  }, [session]);

  return (
    <>
      <section>
        <div className="container">
          <article className="mb-14">
            <h2 className="head-gradient">
              {profileName === "me" ? "My" : profileName} Profile
            </h2>
            <p className="desc max-w-[40rem]">
              Welcome to {profileName === "me" ? "your" : profileName}{" "}
              personalized profile page. Share your exceptional prompts and
              inspire others with the power of your imagination
            </p>
          </article>
        </div>
      </section>
      <ProfilePrompts userId={userId} />;
    </>
  );
};

export default Profile;
