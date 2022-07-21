import '../styles/globals.sass'
import type { AppProps } from 'next/app'
import Link from 'next/link'
import { createContext, useState } from 'react'

export const EditorContext = createContext<any>({})

function MyApp({ Component, pageProps }: AppProps) {
  const [text, editText] = useState('')
  const [bgColor, setBgColor] = useState('')
  return (
    <div className="container is-max-widescreen">
      <section className='section'>
        <div className='columns'>
          <div className='column is-11 is-offset-1 has-text-centered'>
            <EditorContext.Provider value={{ text, editText, bgColor, setBgColor }}>
              <Link href="/editor">
                <div className='button is-large is-primary mx-3'>Editor</div>
              </Link>
              <Link href="/viewer">
                <div className='button is-large is-primary mx-3'>Viewer</div>
              </Link>
              <Component {...pageProps} />
            </EditorContext.Provider>
          </div>
        </div>
      </section>
    </div>

  )
}

export default MyApp
