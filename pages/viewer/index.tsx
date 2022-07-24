import type { NextPage } from "next";
import { ReactNode, useContext, useEffect, useState } from "react";
import { parseText } from "../editor";
import { EditorContext } from "../_app";
import { FiDownload } from 'react-icons/fi'
import { jsPDF } from "jspdf";

// PDF export
const exportToPDF = (source: HTMLElement, width: number, height: number ) => {
    if (!source)
        return
    const doc = new jsPDF({
      orientation: 'p',
      unit: 'px',
      format: 'a4',
      hotfixes: ['px_scaling']
      })
    doc.html(source, {
        callback: (doc) => {
            doc.save()
        },
        autoPaging: 'text',
    })
}

const Viewer: NextPage = () => {

  // Context import
  const { bgColor, setBgColor, output, setOutput, text, setText, headingColor, setHeadingColor } =
    useContext(EditorContext);

  // Local state declarations
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [textColor, setTextColor] = useState("has-text-black");
  const [textSize, setTextSize] = useState(14);
  const [classNames, setClassNames] = useState("");

  // Look for saved text in local storage
  useEffect(() => {
    const savedText = localStorage.getItem("savedText");
    if (savedText) {
      setText(savedText);
      const savedOutput = parseText(savedText, headingColor)
      setOutput(savedOutput);
    }
  }, []);

  // Parses and saves input text on change
  useEffect(() => {
    if (text) {
      setOutput(parseText(text, setHeadingColor));
      localStorage.setItem(
        "savedText",
        text
      );
    }
  }, [text]);

  // Calculates width and height in A4 ratio for output div
  useEffect(() => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth * 0.7
      const height = width * 1.4142
      setHeight(height);
      setWidth(width);
    }
  });

  // Sets new classnames string when settings change
  useEffect(() => {
    const string = `is-flex-grow-0 p-6 outputdiv ${bgColor} ${textColor}`;
    setClassNames(string);
  }, [bgColor, textColor]);

  // Updates heading color css variable
  useEffect(() => {
    document.documentElement.style.setProperty('--heading-color', headingColor)
  }, [headingColor]);

  // Click handler for export button
  const handleExportClick = () => {
    const output = document.getElementById('output')
    if (output)
      exportToPDF(output, width, height)
  }

  return output ? (
    <div className="has-text-left">
      <h1 className="title is-4 my-6">Viewer</h1>
      <div className="is-flex is-flex-wrap-wrap is-align-items-end">

        {/* Background color selector */}
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

        {/* Text color selector */}
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

        {/* Heading color selector */}
        <div className="mb-3 mr-6">
          <p className="mb-3 has-text-weight-semibold">Heading color:</p>
          <div className="buttons has-addons">
            <div
              className="button has-background-white is-clickable"
              onClick={() => setHeadingColor("white")}
            ></div>
            <div
              className="button has-background-dark is-clickable"
              onClick={() => setHeadingColor("hsl(0, 0%, 21%)")}
            ></div>
            <div
              className="button has-background-light is-clickable"
              onClick={() => setHeadingColor("hsl(0, 0%, 96%)")}
            ></div>
            <div
              className="button has-background-primary is-clickable"
              onClick={() => setHeadingColor("hsl(171, 100%, 41%)")}
            ></div>
            <div
              className="button has-background-info is-clickable"
              onClick={() => setHeadingColor("hsl(204, 86%, 53%)")}
            ></div>
          </div>
        </div>

        {/* Text size selector */}
        <div className="mb-3 mr-6">
          <p className="mb-3 has-text-weight-semibold">Text size:</p>
          <div className="buttons has-addons">
            <div
              className="button has-background-light is-clickable"
              onClick={() => setTextSize(11)}
            >
              11
            </div>
            <div
              className="button has-background-light is-clickable"
              onClick={() => setTextSize(12)}
            >
              12
            </div>
            <div
              className="button has-background-light is-clickable"
              onClick={() => setTextSize(13)}
            >
              13
            </div>
            <div
              className="button has-background-light is-clickable"
              onClick={() => setTextSize(14)}
            >
              14
            </div>
            <div
              className="button has-background-light is-clickable"
              onClick={() => setTextSize(16)}
            >
              16
            </div>
          </div>
        </div>

        {/* Download button */}
        <div className="">
          <button className="button is-medium is-primary my-3 is-pulled-right" onClick={() => handleExportClick()}>
            <span className="icon is-small mr-1">
              <FiDownload />
            </span>
            Download as PDF
          </button>
        </div>
      </div>

      {/* Output section */}
      <div className={classNames} id='output' style={{ width: width, height: height, fontSize: textSize}}>
        {output?.map((line: ReactNode, index: number) => (
          <div key={index.toString()}>{line}</div>
        ))}
      </div>
    </div>
  ) : (
    // Output when there's nothing to output
    <div className="title is-4 mt-6 pt-6">Add markup to editor first.</div>
  );
};

export default Viewer;