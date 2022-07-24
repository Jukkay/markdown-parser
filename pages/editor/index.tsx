import type { NextPage } from "next";
import Link from "next/link";
import {
  useEffect,
  useContext,
} from "react";
import { EditorContext } from "../_app";
import ReactHtmlParser from 'react-html-parser';

// Parses markdown row by row
export const parseText = (text: string, headingColor: string) => {
  const array = text.split("\n");
  const parsedArray = array.map((line: string, linenumber: number) => {
    const index = linenumber.toString();

    // Headings
    if (/^######/.test(line))
      return (
        <h6 key={index} className="title is-6 heading-color header-spacing">
          {line.replace("######", "")}
        </h6>
      );
    if (/^#####/.test(line))
      return (
        <h5 key={index} className="title is-5 heading-color header-spacing">
          {line.replace("#####", "")}
        </h5>
      );
    if (/^####/.test(line))
      return (
        <h4 key={index} className="title is-4 heading-color header-spacing">
          {line.replace("####", "")}
        </h4>
      );
    if (/^###/.test(line))
      return (
        <h3 key={index} className="title is-3 heading-color header-spacing">
          {line.replace("###", "")}
        </h3>
      );
    if (/^##/.test(line))
      return (
        <h2 key={index} className="title is-2 heading-color header-spacing">
          {line.replace("##", "")}
        </h2>
      );
    if (/^#/.test(line))
      return (
        <h1 key={index} className="title is-1 heading-color header-spacing">
          {line.replace("#", "")}
        </h1>
      );

    // Unordered lists
    if (/^[-+]/.test(line)) {
      return (<li key={index} className='ml-4'>{line.replace(/^[-+]/, "")}</li>);
    }

    // Numbered lists
    if (/^\d{1,2}./.test(line)) {
      return <li key={index} className='ml-4'>{line.replace(/^\d{1,2}./, "")}</li>;
    }

    // Images
    if (/^(?:!\[)(.*)(?:\]\()(.*)(?:\))/.test(line)) {
      const arr = line.match(/^(?:!\[)(.*)(?:\]\()(.*)(?:\))/);
      if (arr) return <img key={index} className='ml-4' src={arr[2]} alt={arr[1]} />;
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
          <a key={index} href={arr[2]} className='ml-4'>
            {arr[1]}
          </a>
        );
    }

    // Bold text
    if (/(\*\*|__)/.test(line)) {
      const arr = line.split(/(\*\*|__)/).filter(element => element !== '')
      let asteriskOpen = false
      let lodashOpen = false
      const newArray = arr.map((chunk, index) => {
        if (chunk !== '**' && chunk !== '__')
          return (`<span>${chunk}</span>`)
        if (lodashOpen && chunk !== '__') {
          return (`<span>${chunk}</span>`)
        }
        if (asteriskOpen && chunk !== '**') {
          return (`<span>${chunk}</span>`)
        }
        if (chunk == '**' && !asteriskOpen && !lodashOpen) {
          asteriskOpen = true
          return ('<strong>')
        }
        if (chunk == '**' && asteriskOpen) {
          asteriskOpen = false
          return ('</strong>')
        }
        if (chunk == '__' && !lodashOpen && !asteriskOpen) {
          lodashOpen = true
          return ('<strong>')
        }
        if (chunk == '__' && lodashOpen) {
          lodashOpen = false
          return ('</strong>')
        }
      })

      // Replace last open em element with original value
      if (asteriskOpen) {
        const lastStrong = newArray.lastIndexOf('<strong>')
        if (lastStrong > -1)
          newArray[lastStrong] = '**'
      }
      if (lodashOpen) {
        const lastStrong = newArray.lastIndexOf('<strong>')
        if (lastStrong > -1)
          newArray[lastStrong] = '__'
      }
      const html = newArray.join('')
      return <div key={index}>{ReactHtmlParser(html)}</div>;
    }

    // Italic text
    if (/(\*|_)/.test(line)) {
      const arr = line.split(/(\*|_)/).filter(element => element !== '')
      let asteriskOpen = false
      let lodashOpen = false
      const newArray = arr.map((chunk, index) => {
        if (chunk !== '*' && chunk !== '_')
          return (`<span>${chunk}</span>`)
        if (lodashOpen && chunk !== '_') {
          return (`<span>${chunk}</span>`)
        }
        if (asteriskOpen && chunk !== '*') {
          return (`<span>${chunk}</span>`)
        }
        if (chunk == '*' && !asteriskOpen && !lodashOpen) {
          asteriskOpen = true
          return ('<em>')
        }
        if (chunk == '*' && asteriskOpen) {
          asteriskOpen = false
          return ('</em>')
        }
        if (chunk == '_' && !lodashOpen && !asteriskOpen) {
          lodashOpen = true
          return ('<em>')
        }
        if (chunk == '_' && lodashOpen) {
          lodashOpen = false
          return ('</em>')
        }
      })

      // Replace last open em element with original value
      if (asteriskOpen) {
        const lastStrong = newArray.lastIndexOf('<em>')
        if (lastStrong > -1)
          newArray[lastStrong] = '*'
      }
      if (lodashOpen) {
        const lastStrong = newArray.lastIndexOf('<em>')
        if (lastStrong > -1)
          newArray[lastStrong] = '_'
      }
      const html = newArray.join('')
      return <div key={index}>{ReactHtmlParser(html)}</div>;
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
