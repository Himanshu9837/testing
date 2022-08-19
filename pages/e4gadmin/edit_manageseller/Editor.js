import React, { useRef } from "react";
const JoditEditor = React.lazy(() => {
  return import("jodit-react");
});

// const JoditEditor = dynamic(
//   () => import('jodit-react').then(mod => mod.Editor),
//   { ssr: false }
// )



const Editor = ({ config, value, onChange }) => {
  const isSSR = typeof window === "undefined";
  const editor = useRef(null);
  const contentChange = (content) => {
    onChange(content);
  };
  
  return (
    <>
      {!isSSR && (
        <React.Suspense fallback={<div>Loading...</div>}>
          <JoditEditor
            ref={editor}
            value={value || ""}
            config={config}
            tabIndex={1} // tabIndex of textarea
            onChange={contentChange}
          />
        </React.Suspense>
      )}
    </>
  );
};
export default Editor;
