import '../styles/globals.sass'
import type { AppProps } from 'next/app'
import Link from 'next/link'
import { createContext, ReactNode, useState } from 'react'

// Context
export const EditorContext = createContext<any>({})

function MyApp({ Component, pageProps }: AppProps) {

  // State declarations
  const [text, setText] = useState('')
  const [bgColor, setBgColor] = useState('')
  const [output, setOutput] = useState<ReactNode[]>()
  const [headingColor, setHeadingColor] = useState("has-text-black");

  return (
    <div className="container is-fluid">
      <section className='section'>
        <div className='columns'>
          <div className='column is-11 is-offset-1'>

            {/* Context provider */}
            <EditorContext.Provider value={{ text, setText, bgColor, setBgColor, output, setOutput, headingColor, setHeadingColor }}>

              {/* Nav buttons */}
              <div className='mb-6'>
                <Link href="/editor">
                  <div className='button is-large is-primary mr-3'>Editor</div>
                </Link>
                <Link href="/viewer">
                  <div className='button is-large is-primary mr-3'>Viewer</div>
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
