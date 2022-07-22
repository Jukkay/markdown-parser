import type { NextPage } from "next";
import Link from "next/link";
import { ReactNode, useContext, useEffect, useState } from "react";
import { parseText } from "../editor";
import { EditorContext } from "../_app";
import { FiDownload } from 'react-icons/fi'

const Viewer: NextPage = () => {
  const { bgColor, setBgColor, output, setOutput, text, setText } =
    useContext(EditorContext);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [textColor, setTextColor] = useState("has-text-black");
  const [textSize, setTextSize] = useState("is-size-6");
  const [classNames, setClassNames] = useState("");

  // Look for saved text in local storage
  useEffect(() => {
    const savedText = localStorage.getItem("savedText");
    if (savedText) {
      setText(savedText);
      const savedOutput = parseText(savedText)
      setOutput(savedOutput);
    }
  }, []);

  useEffect(() => {
    if (text) {
      setOutput(parseText(text));
      localStorage.setItem(
        "savedText",
        text
      );
    }
  }, [text]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth * 0.7
      const height = width * 1.4142
      setHeight(height);
      setWidth(width);
    }
  });

  useEffect(() => {
    const string = `is-flex-grow-0 p-6 ${bgColor} ${textColor} ${textSize}`;
    setClassNames(string);
  }, [bgColor, textColor, textSize]);

  return output ? (
    <div className="has-text-left">
      <h1 className="title is-4 my-6">Viewer</h1>
      <div className="is-flex is-flex-wrap-wrap is-align-items-end">
        <div className="mb-3 mr-6">
          <p className="mb-3 has-text-weight-semibold">Background color:</p>
          <div className="buttons has-addons">
            <div
              className="button has-background-white is-clickable"
              onClick={() => setBgColor("has-background-white")}
            ></div>
            <div
              className="button has-background-dark is-clickable"
              onClick={() => setBgColor("has-background-dark")}
            ></div>
            <div
              className="button has-background-light is-clickable"
              onClick={() => setBgColor("has-background-light")}
            ></div>
            <div
              className="button has-background-primary is-clickable"
              onClick={() => setBgColor("has-background-primary")}
            ></div>
            <div
              className="button has-background-info is-clickable"
              onClick={() => setBgColor("has-background-info")}
            ></div>
          </div>
        </div>
        <div className="mb-3 mr-6">
          <p className="mb-3 has-text-weight-semibold">Text color:</p>
          <div className="buttons has-addons">
            <div
              className="button has-background-white is-clickable"
              onClick={() => setTextColor("has-text-white")}
            ></div>
            <div
              className="button has-background-dark is-clickable"
              onClick={() => setTextColor("has-text-dark")}
            ></div>
            <div
              className="button has-background-light is-clickable"
              onClick={() => setTextColor("has-text-light")}
            ></div>
            <div
              className="button has-background-primary is-clickable"
              onClick={() => setTextColor("has-text-primary	")}
            ></div>
            <div
              className="button has-background-info is-clickable"
              onClick={() => setTextColor("has-text-info")}
            ></div>
          </div>
        </div>
        <div className="mb-3 mr-6">
          <p className="mb-3 has-text-weight-semibold">Text size:</p>
          <div className="buttons has-addons">
            <div
              className="button has-background-light is-clickable"
              onClick={() => setTextSize("is-size-7")}
            >
              S
            </div>
            <div
              className="button has-background-light is-clickable"
              onClick={() => setTextSize("is-size-6")}
            >
              M
            </div>
            <div
              className="button has-background-light is-clickable"
              onClick={() => setTextSize("is-size-4")}
            >
              L
            </div>
            <div
              className="button has-background-light is-clickable"
              onClick={() => setTextSize("is-size-3")}
            >
              XL
            </div>
          </div>
        </div>
        <div className="">
          <button className="button is-medium is-primary my-3 is-pulled-right">
            <span className="icon is-small mr-1">
            <FiDownload />
            </span>
            Download as PDF
          </button>
        </div>
      </div>
      <div className={classNames} style={{ width: width, height: height }}>
        {output?.map((line: ReactNode, index: number) => (
          <div key={index.toString()}>{line}</div>
        ))}
      </div>
    </div>
  ) : (
    <div className="title is-4 mt-6 pt-6">Add markup to editor first.</div>
  );
};

export default Viewer;