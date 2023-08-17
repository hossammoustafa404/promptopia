"use client";

import { Feed } from "@components";
import { ChangeEvent, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

const Home = () => {
  return (
    <>
      <section className="mb-14">
        <div className="container">
          <article className="max-w-lg mx-auto text-center">
            <h2 className="mb-2 text-3xl font-bold md:text-5xl">
              Discover & Share
              <span className="block head-gradient"> AI-Powered Prompts</span>
            </h2>
            <p className="desc">
              Promptopuia is an open source AI prompting tool for modern world
              to discover and share creative prompts
            </p>
          </article>
        </div>
      </section>
      <Feed />
    </>
  );
};

export default Home;
