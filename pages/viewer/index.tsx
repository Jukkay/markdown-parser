import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useContext } from 'react'
import styles from '../styles/Home.module.css'
import { EditorContext } from '../_app'

const Viewer: NextPage = () => {
  const { bgColor, setBgColor } = useContext(EditorContext)
  return (
    <div>

      <h1 className='title is-4 is-pulled-left'>Viewer</h1>
      <div className={bgColor}>testtest</div>
    </div>
  )
}

export default Viewer
