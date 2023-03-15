import Head from "next/head";
import Image from "next/image";
import { Nunito } from "next/font/google";
import Link from "next/link";
import Prompt from "@/components/Prompt";
import Query from "@/components/Query";
import { useState } from "react";

const nunito = Nunito({
  subsets: ["latin"],
});

export default function Home() {
  const [query, setQuery] = useState({
    humanQuery: "",
    sqlQuery: "",
  });
  return (
    <>
      <Head>
        <title>IntelliSQL - Natural Language to SQL</title>
        <meta
          name="description"
          content="IntelliSQL is a tool that converts natural language to SQL"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={`
          ${nunito.className}
          flex
          flex-col
          items-center
          justify-center
          py-2
          px-4
          text-center
        `}
      >
        <h1 className="text-6xl font-bold">IntelliSQL</h1>
        <p className="mt-3 text-2xl">
          A simple tool that converts natural language to SQL
        </p>
        <Prompt query={query} setQuery={setQuery} />
        {query.sqlQuery && <Query query={query} />}
      </main>
    </>
  );
}
