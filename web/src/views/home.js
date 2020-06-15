import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useService from '../hook/service'
import { getWordsByKeyword } from '../data'
import './home.css'

export default function Home() {
  const [keyword, setKeyword] = useState('')
  const [keywordParams, setKeywordParams] = useState(null)
  // const [words, setWords] = useState([])
  const { words } = useService(getWordsByKeyword, keywordParams)

  const handleChange = (event) => {
    setKeyword((event.target.value || '').trim())
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setKeywordParams({ keyword, now: Date.now() })
  }

  // useEffect(() => {
  //   const { words, code, msg } = wordsData

  //   if (code !== undefined) {
  //     if (code === 200) {
  //       setWords(prevState => {
  //         return prevState.concat([{name: word}])
  //       })
  //     } else {
  //       alert(msg)
  //     }
  //   }
  // }, [wordsData])

  return (
    <div className="home-page">
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} />
        <button type="submit">搜索</button>
      </form>
      <ul>
        {
          (words || []).map((item, idx) => (
            <li key={idx}>{item.name}&ensp;|&ensp;{item.excerpt}</li>
          ))
        }
      </ul>
      <Link to="/add" className="add">+</Link>
    </div>
  )
}
