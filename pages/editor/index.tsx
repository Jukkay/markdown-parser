import type { NextPage } from "next";
import Link from "next/link";
import {
  useEffect,
  useContext,
} from "react";
import { EditorContext } from "../_app";

// Parses markdown row by row
export const parseText = (text: string, headingColor: string ) => {
  const array = text.split("\n");
  const parsedArray = array.map((line: string, linenumber: number) => {
    const index = linenumber.toString();

    // Headings
    if (/^######/.test(line))
      return (
        <h6 key={index} className="title is-6 heading-color">
          {line.replace("######", "")}
        </h6>
      );
    if (/^#####/.test(line))
      return (
        <h5 key={index} className="title is-5 heading-color">
          {line.replace("#####", "")}
        </h5>
      );
    if (/^####/.test(line))
      return (
        <h4 key={index} className="title is-4 heading-color">
          {line.replace("####", "")}
        </h4>
      );
    if (/^###/.test(line))
      return (
        <h3 key={index} className="title is-3 heading-color">
          {line.replace("###", "")}
        </h3>
      );
    if (/^##/.test(line))
      return (
        <h2 key={index} className="title is-2 heading-color">
          {line.replace("##", "")}
        </h2>
      );
    if (/^#/.test(line))
      return (
        <h1 key={index} className="title is-1 heading-color">
          {line.replace("#", "")}
        </h1>
      );

    // Unordered lists
    if (/^[-+]/.test(line))
      return <li key={index}>{line.replace(/^[-+]/, "")}</li>;

    // Numbered lists
    if (/^\d{1,2}./.test(line))
      return <li key={index}>{line.replace(/^\d{1,2}./, "")}</li>;

    // Images
    if (/^(?:!\[)(.*)(?:\]\()(.*)(?:\))/.test(line)) {
      const arr = line.match(/^(?:!\[)(.*)(?:\]\()(.*)(?:\))/);
      if (arr) return <img key={index} src={arr[2]} alt={arr[1]} />;
    }

    // Quotes
    if (/^>/.test(line))
      return <blockquote key={index}>{line.replace(/^>/, "")}</blockquote>;

    // Colors
    if (/^(?:\$color\[)(.*)(?:\])(.*)/.test(line)) {
      const arr = line.match(/^(?:\$color\[)(.*)(?:\])(.*)/);
      if (arr) {
        return (
          <div key={index} style={{ color: arr[1] }}>
            {arr[2]}
          </div>
        );
      }
    }

    // URLs
    if (/^(?:\[)(.*)(?:\]\()(.*)(?:\))/.test(line)) {
      const arr = line.match(/^(?:\[)(.*)(?:\]\()(.*)(?:\))/);
      if (arr)
        return (
          <a key={index} href={arr[2]}>
            {arr[1]}
          </a>
        );
    }

    // Bold text
    if (/(\*\*|__)(.*)(\*\*|__)/.test(line)) {
      return <strong key={index}>{line.replace(/(\*\*|__)/g, "")}</strong>;
    }

    // Italic text
    if (/(\*|_)(.*)(\*|_)/.test(line)) {
      return (
        <span key={index} className="is-italic">
          {line.replace(/(\*|_)/g, "")}
        </span>
      );
    }
    // Return for unrecognized patterns
    return (
      <div key={index}>
        {line}
        <br />
      </div>
    );
  });
  return parsedArray;
};

const Editor: NextPage = () => {
  // Context import
  const { setBgColor, text, setText, output, setOutput, headingColor, setHeadingColor } =
    useContext(EditorContext);

  // Text area input control
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setText(e.target.value);

  // Look for saved text in local storage
  useEffect(() => {
    const savedText = localStorage.getItem("savedText");
    if (savedText) {
      setText(savedText);
      const savedOutput = parseText(savedText, headingColor)
      setOutput(savedOutput);
    }
  }, []);

  return (
    <div>
      <h1 className="title is-4 is-pulled-left">Edit</h1>
      
      {/* Text area input */}
      <textarea
        className="textarea mt-5"
        name="textarea"
        placeholder="Your text goes here"
        value={text}
        rows={20}
        onChange={handleChange}
      >
      </textarea>
      
      {/* Button link to viewer page */}
      <Link href="/viewer">
        <button className="button is-large is-primary my-3 is-pulled-right">
          Go to viewer
        </button>
      </Link>
    </div>
  );
};

export default Editor;
