import type { NextPage } from 'next'
import Link from "next/link";
import { useState, ReactNode } from 'react';

const Editor: NextPage = () => {

  const [textArea, setTextArea] = useState('')
  const [output, setOutput] = useState<ReactNode[]>()

  const handleChange  = (e: React.ChangeEvent<HTMLTextAreaElement>) => setTextArea(e.target.value)

  const parseText = () => {
    const array = textArea.split('\n')
    const parsedArray = array.map((line) => {
      // Headings
      if (/^######/.test(line))
        return <h6 className="title is-6">{line.replace('######', '')}</h6>
      if (/^#####/.test(line))
        return <h5 className="title is-5">{line.replace('#####', '')}</h5>
      if (/^####/.test(line))
        return <h4 className="title is-4">{line.replace('####', '')}</h4>
      if (/^###/.test(line))
        return <h3 className="title is-3">{line.replace('###', '')}</h3>
      if (/^##/.test(line))
        return <h2 className="title is-2">{line.replace('##', '')}</h2>
      if (/^#/.test(line))
        return <h1 className="title is-1">{line.replace('#', '')}</h1>
      
      // Paragraps
      // List

      // Numbered list
      // Image
      // Quote
      // Colors
      // Comment out

      // Bold text

      if (/(\*\*|__)(.*)(\*\*|__)/.test(line)) {
        // parse line separately
        return <span className="has-text-weight-bold">{line.replace(/(\*\*|__)/g, '')}</span>
      }
      
      else
        return <span>{line}</span>
      
    })
    
    setOutput(parsedArray)

  }
  
  return (
    <div className="container is-max-widescreen">
    <section className='section'>
      <div className='columns'>
        <div className='column is-11 is-offset-1'>
            <h1 className='title is-3'>Edit</h1>
            <Link href="/">
              <button className='button is-large is-primary mx-3'>Home</button>
            </Link>
            <Link href="/viewer">
              <button className='button is-large is-primary mx-3'>Viewer</button>
            </Link>
            <textarea className="textarea mt-5" name='textarea' placeholder="Your text goes here" rows={50} onChange={handleChange}></textarea>
            <button className='button is-large is-primary my-3 is-pulled-right' onClick={() => parseText()}>Parse text</button>

            <div>{output?.map((line) => <>{line}</> )}</div>
    
        </div>
      </div>
    </section>
  </div>
  )
}

export default Editor
