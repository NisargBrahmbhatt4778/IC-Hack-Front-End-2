import { Sandpack } from "@codesandbox/sandpack-react";
import { useEffect, useState } from "react";

interface InteractivePaneProps {
  reactCode?: string;
}

export default function InteractivePane({ reactCode }: InteractivePaneProps) {
  const [code, setCode] = useState<string | null>(null);

  useEffect(() => {
    // If reactCode prop is provided, use it; otherwise use a default empty React component
    const codeToUse =
      reactCode ||
      `
import React from 'react';

export default function App() {
  return (
    <div>
      <h1>Loading code...</h1>
    </div>
  );
}`;

    setCode(codeToUse);
  }, [reactCode]);

  useEffect(() => {
    const hideEditor = () => {
      const wrapper = document.querySelector(".sp-wrapper > div:first-child");
      if (wrapper) {
        const editor = wrapper.firstElementChild as HTMLElement;
        if (editor) {
          editor.style.display = "none";
        }
      }
    };

    const observer = new MutationObserver(hideEditor);
    observer.observe(document.body, { childList: true, subtree: true });
    hideEditor();

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-orange-100 text-white flex flex-col items-center justify-center">
      <div className="w-full h-full max-w-3xl mt-8 bg-white rounded-lg overflow-hidden">
        {code && (
          <Sandpack
            template="react"
            files={{ "/App.js": code }}
            options={{
              editorHeight: "100vh",
              showLineNumbers: true,
              showInlineErrors: true,
              showNavigator: false,
              showTabs: false,
              layout: "preview",
            }}
          />
        )}
      </div>
    </div>
  );
}
