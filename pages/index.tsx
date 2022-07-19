import type { NextPage } from 'next'
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="container is-max-widescreen">
      <section className='section'>
        <div className='columns'>
          <div className='column is-half is-offset-one-quarter has-text-centered my-6 py-6'>
              <h1 className='title is-1 my-6 py-6'>Mark-up editor / viewer</h1>
              <Link href="/editor">
                <div className='button is-large is-primary mx-3'>Editor</div>
              </Link>
              <Link href="/viewer">
                <div className='button is-large is-primary mx-3'>Viewer</div>
              </Link>
    
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
