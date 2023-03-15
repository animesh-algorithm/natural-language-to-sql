import React, { useState, useEffect, useRef } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vs, dracula } from "react-syntax-highlighter/dist/cjs/styles/hljs";

interface Props {
  query: {
    humanQuery: string;
    sqlQuery: string;
  };
}

const Query: React.FC<Props> = ({ query }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const intervalIdRef = useRef<number | null>(null);

  useEffect(() => {
    // Clear the interval if it exists when the component is unmounted or when the SQL query changes.
    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
    };
  }, [query.sqlQuery]);

  useEffect(() => {
    if (currentWordIndex < query.sqlQuery.split(" ").length) {
      // Set up the interval if it doesn't exist yet.
      if (!intervalIdRef.current) {
        intervalIdRef.current = window.setInterval(() => {
          setCurrentWordIndex((currentWordIndex) => currentWordIndex + 1);
        }, 100);
      }
    } else {
      // Clear the interval when we reach the end of the SQL query.
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
  }, [currentWordIndex, query.sqlQuery]);

  const words = query.sqlQuery.split(" ");
  const currentWords = words.slice(0, currentWordIndex);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full pt-5 lg:p-5">
      <div
        className="
        text-left
        bg-black
        rounded-lg
        shadow-lg
        w-full
        sm:w-3/4 md:w-3/4 lg:w-3/4
        p-5
        text-gray-200
        "
      >
        <SyntaxHighlighter
          language="sql"
          style={dracula}
          wrapLines={true}
          customStyle={{
            maxHeight: "none",
            height: "auto",
            overflow: "visible",
            wordWrap: "break-word",
            color: "inherit",
            backgroundColor: "black",
          }}
          lineProps={{ style: { whiteSpace: "pre-wrap" } }}
        >
          {currentWords.join(" ")}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default Query;
