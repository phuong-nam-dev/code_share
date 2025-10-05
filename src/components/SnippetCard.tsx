import React from "react";

const SnippetCard = ({ snippet }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-2">{snippet.title}</h2>
      <p className="text-gray-700 mb-4">{snippet.description}</p>
      <div className="bg-gray-100 p-4 rounded-md">
        <pre>
          <code>{snippet.code}</code>
        </pre>
      </div>
      {/* <div className="mt-4">
        {snippet.tags.map((tag) => (
          <span
            key={tag}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >
            #{tag}
          </span>
        ))}
      </div> */}
    </div>
  );
};

export default SnippetCard;
