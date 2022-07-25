import '../styles/globals.sass'
import type { AppProps } from 'next/app'
import Link from 'next/link'
import { createContext, ReactNode, useEffect, useState } from 'react'
import { parseText } from './editor/index'

// Context
export const EditorContext = createContext<any>({})

function MyApp({ Component, pageProps }: AppProps) {

  // Global state declarations
  const [text, setText] = useState('')
  const [bgColor, setBgColor] = useState('')
  const [output, setOutput] = useState<ReactNode>()
  const [headingColor, setHeadingColor] = useState("has-text-black");

  // Look for saved text in local storage
  useEffect(() => {
    const savedText = localStorage.getItem("savedText");
    if (savedText) {
      setText(savedText);
      const savedOutput = parseText(savedText)
      setOutput(savedOutput);
    }
  }, []);

  // Parses and saves input text
  const handleViewerClick = (text: string) => {
    if (text) {
      setOutput(parseText(text));
      localStorage.setItem(
        "savedText",
        text
      );
    }
  }
  return (
    <div className="container is-fluid">
      <section className='section'>
        <div className='columns is-centered'>
          <div className='column is-10'>

            {/* Context provider */}
            <EditorContext.Provider value={{ text, setText, bgColor, setBgColor, output, setOutput, headingColor, setHeadingColor }}>

              {/* Nav buttons */}
              <div className='mb-6'>
                <Link href="/editor">
                  <div className='button is-large is-primary mr-3'>Editor</div>
                </Link>
                <Link href="/viewer">
                  <div className='button is-large is-primary mr-3' onClick={() => handleViewerClick(text)}>Viewer</div>
                </Link>
              </div>

              {/* Page component */}
              <Component {...pageProps} />

            </EditorContext.Provider>
          </div>
        </div>
      </section>
    </div>

  )
}

export default MyApp
