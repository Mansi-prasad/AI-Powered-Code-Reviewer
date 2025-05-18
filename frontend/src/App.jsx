import { useEffect, useState } from "react";
import "./App.css";
import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs"; // for syntax highlighting
import axios from "axios";
import Editor from "react-simple-code-editor"; // provide code editor component
import Markdown from "react-markdown"; //takes Markdown text (like # Hello **world**) and renders it as React elements.
import rehypeHighlight from "rehype-highlight"; // plugin that automatically adds syntax highlighting to code blocks in Markdown.
function App() {
  const [code, setCode] = useState(``);
  const [review, setReview] = useState("");
  const BACKEND_URL = "http://localhost:3000";
  async function handleReview() {
    try {
      setReview("");
      const res = await axios.post(`${BACKEND_URL}/ai/get-review`, { code });
      console.log("Response from backend:", res.data);
      setReview(res.data?.result || "No result returned");
    } catch (error) {
      console.error("Error fetching review: ", error.response?.data);
      setReview("Error to getting the review....");
    }
  }
  useEffect(() => {
    prism.highlightAll();
  });
  return (
    <>
      <main>
        <div className="left-box">
          <p>Type your code here....</p>
          <div className="code-part">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, "javascript")
              }
              padding={10}
              style={{
                fontFamily: '"arial","san-serif"',
                fontSize: 16,
                backgroundColor: "rgb(48, 47, 47)",
                border: "1px solid black",
                borderRadius: "10px",
                height: "100%",
                width: "100%",
              }}
            />
          </div>
          <div className="review-btn">
            <button onClick={handleReview}>Review</button>
          </div>
        </div>
        <div className="right-box">
          <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
        </div>
      </main>
    </>
  );
}
export default App;
