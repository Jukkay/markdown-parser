import type { NextPage } from 'next'
import Link from "next/link";
import { useState, ReactNode, useEffect, useContext, HTMLAttributes, CSSProperties, Key } from 'react';
import { EditorContext } from '../_app';


export const parseText = (text: string) => {
  const array = text.split('\n')
  const parsedArray = array.map((line: string, linenumber: number) => {
    const index = linenumber.toString()
    // Headings
    if (/^######/.test(line))
      return <h6 key={index} className="title is-6">{line.replace('######', '')}</h6>
    if (/^#####/.test(line))
      return <h5 key={index} className="title is-5">{line.replace('#####', '')}</h5>
    if (/^####/.test(line))
      return <h4 key={index} className="title is-4">{line.replace('####', '')}</h4>
    if (/^###/.test(line))
      return <h3 key={index} className="title is-3">{line.replace('###', '')}</h3>
    if (/^##/.test(line))
      return <h2 key={index} className="title is-2">{line.replace('##', '')}</h2>
    if (/^#/.test(line))
      return <h1 key={index} className="title is-1">{line.replace('#', '')}</h1>

    // List
    if (/^[-+]/.test(line))
      return <li key={index} >{line.replace(/^[-+]/, '')}</li>

    // Numbered list

    if (/^\d{1,2}./.test(line))
      return (<li key={index} >{line.replace(/^\d{1,2}./, '')}</li>)

    // Imagem

    if (/^(?:!\[)(.*)(?:\]\()(.*)(?:\))/.test(line)) {
      const arr = line.match(/^(?:!\[)(.*)(?:\]\()(.*)(?:\))/)
      if (arr)
        return <img key={index} src={arr[2]} alt={arr[1]} />
    }

    // Quote
    if (/^>/.test(line))
      return (<blockquote key={index}>{line.replace(/^>/, '')}</blockquote>)

    // Colors
    if (/^(?:\$color\[)(.*)(?:\])(.*)/.test(line)) {
      const arr = line.match(/^(?:\$color\[)(.*)(?:\])(.*)/)
      if (arr) {
        return <div key={index} style={{color: arr[1]}}>{arr[2]}</div>
      }
    }

    // Comment out

    // Bold text

    if (/(\*\*|__)(.*)(\*\*|__)/.test(line)) {
      // parse line separately
      return <span key={index} className="has-text-weight-bold">{line.replace(/(\*\*|__)/g, '')}</span>
    }
    return (<div key={index}>{line}<br /></div>)

  })

  return parsedArray
}
const Editor: NextPage = () => {

  const {setBgColor, text, setText, output, setOutput} = useContext(EditorContext)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)

  return (
    <div>

      <h1 className='title is-4 is-pulled-left'>Edit</h1>

      <textarea className="textarea mt-5" name='textarea' placeholder="Your text goes here" rows={20} onChange={handleChange}>{text}</textarea>
      <Link href='/viewer'>
      <button className='button is-large is-primary my-3 is-pulled-right'>Go to viewer</button>
      </Link>
    </div>
  )
}

export default Editor
