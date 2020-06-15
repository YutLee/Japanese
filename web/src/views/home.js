import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useService from '../hook/service'
import { getWords, addWord } from '../data'
import './home.css'

export default function Home() {
  const [word, setWord] = useState('')
  const [words, setWords] = useState([])
  const [addWordParams, setAddWordParams] = useState(null)
  // const wordsData = useService(getWords)
  const addWordsData = useService(addWord, addWordParams)

  const handleChange = (event) => {
    setWord((event.target.value || '').trim())
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setAddWordParams({ name: word, now: Date.now() })
  }

  // useEffect(() => {
  //   const { code, words } = wordsData

  //   if (code !== undefined) {
  //     if (code === 200) {
  //       setWords(words)
  //     }
  //   }
  // }, [wordsData])

  useEffect(() => {
    const { code, msg } = addWordsData

    if (code !== undefined) {
      if (code === 200) {
        setWords(prevState => {
          return prevState.concat([{name: word}])
        })
      } else {
        alert(msg)
      }
    }
  }, [addWordsData])

  return (
    <div className="home-page">
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} />
        <button type="submit">搜索</button>
      </form>
      {/* <ul>
        {
          (words || []).map((item, idx) => (
            <li key={idx}>{item.name}</li>
          ))
        }
      </ul> */}
      <Link to="/add" className="add">+</Link>
    </div>
  )
}
