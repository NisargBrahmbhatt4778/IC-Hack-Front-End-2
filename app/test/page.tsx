import { Sandpack } from "@codesandbox/sandpack-react";

export default function TestPage() {
  return (
    <div className="bg-gray-900 text-white flex flex-col items-center justify-center">
      <div className="w-full h-full max-w-3xl mt-8 bg-white rounded-lg overflow-hidden">
        <Sandpack
          template="react"
          files={{
            "/App.js": `import React from 'react';

export default function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Hello Sandpack!</h1>
      <p>Start editing to see some magic happen!</p>
    </div>
  );
}`,
          }}
          options={{
            showLineNumbers: true,
            showInlineErrors: true,
            showNavigator: false,
            showTabs: false,
            layout: "preview",
          }}
        />
      </div>
    </div>
  );
}
