import React, { useState } from "react";

interface Props {
  query: {
    humanQuery: string;
    sqlQuery: string;
  };
  setQuery: (query: { humanQuery: string; sqlQuery: string }) => void;
}

const Prompt: React.FC<Props> = ({ query, setQuery }) => {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  React.useEffect(() => {
    if (textareaRef.current) textareaRef.current.focus();
  }, []);
  const handleSubmit = async () => {
    setQuery({
      humanQuery: query.humanQuery,
      sqlQuery: "Generating Query...",
    });
    const response = await fetch("/api/sql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: query.humanQuery }),
    });
    const res = await response.json();
    setQuery({
      humanQuery: query.humanQuery,
      sqlQuery: res.data,
    });
  };
  return (
    <div className="flex flex-col items-center justify-center w-full h-full pt-5 lg:p-5">
      {/* Responsive textarea */}
      <textarea
        ref={textareaRef}
        className="w-full p-2 h-40 text-xl text-gray-300 dark:text-gray-50 border rounded-lg focus:outline-none focus:ring-2 
        focus:ring-gray-600
        dark:focus:ring-gray-100
        focus:border-transparent
        sm:w-3/4 md:w-3/4 lg:w-3/4 m-4
        bg-black cursor-auto
        "
        placeholder=" Enter your query here"
        value={query?.humanQuery}
        onChange={(e) =>
          setQuery({
            humanQuery: e.target.value,
            sqlQuery: query?.sqlQuery,
          })
        }
        autoFocus
      ></textarea>
      {/* Two Button in a same row */}
      <div
        className="flex flex-row items-center justify-center w-full h-full
        sm:w-3/4 md:w-3/4 lg:w-3/4
        space-x-2
      "
      >
        <button
          className="w-1/2 p-2 text-xl text-gray-300 dark:text-gray-50 border rounded-lg focus:outline-none focus:ring-2
                focus:ring-gray-600
                dark:focus:ring-gray-100
                focus:border-transparent
                bg-black
                "
          onClick={handleSubmit}
        >
          Translate to SQL
        </button>
        <button
          className="w-1/2 p-2 text-xl text-gray-300 dark:text-gray-50 border rounded-lg focus:outline-none focus:ring-2
                focus:ring-gray-600
                dark:focus:ring-gray-100
                focus:border-transparent
                bg-black
                "
          onClick={() =>
            setQuery({
              humanQuery: "",
              sqlQuery: "",
            })
          }
        >
          Clear Prompt
        </button>
      </div>
    </div>
  );
};

export default Prompt;
