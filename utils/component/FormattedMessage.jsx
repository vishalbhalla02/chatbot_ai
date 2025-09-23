import React from "react";

export default function FormattedMessage({ text }) {
  if (!text) return null;

  const formatText = (text) => {
    // Split by numbered lists and paragraphs
    const parts = text.split(/(\d+\.\s.*?)(?=\d+\.|$)/);

    return parts
      .map((part, index) => {
        // Check if it's a numbered list item
        if (/^\d+\.\s/.test(part.trim())) {
          // Extract number and content
          const match = part.match(/^(\d+)\.\s(.*)/);
          if (match) {
            const [, number, content] = match;

            // Check if content has **bold** text
            const boldFormatted = content.replace(
              /\*\*(.*?)\*\*/g,
              "<strong>$1</strong>"
            );

            return (
              <div key={index} className="flex mb-3 pl-2">
                <span className="text-blue-400 font-bold mr-3 flex-shrink-0">
                  {number}.
                </span>
                <div
                  className="text-gray-100"
                  dangerouslySetInnerHTML={{ __html: boldFormatted }}
                />
              </div>
            );
          }
        }

        // Regular text paragraph
        if (part.trim()) {
          const boldFormatted = part.replace(
            /\*\*(.*?)\*\*/g,
            '<strong class="text-white font-semibold">$1</strong>'
          );
          return (
            <div
              key={index}
              className="mb-3 text-gray-100 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: boldFormatted }}
            />
          );
        }

        return null;
      })
      .filter(Boolean);
  };

  return <div className="space-y-2">{formatText(text)}</div>;
}
