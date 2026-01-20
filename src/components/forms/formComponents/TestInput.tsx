import React from "react";

function TestInput() {
  const ref = React.useRef('');
  return (
    <input
      onChange={(e) => (ref.current = e.target.value)}
      className="border p-2"
    />
  );
}
export default TestInput