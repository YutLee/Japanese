import React, { useState, useEffect } from 'react'
import useService from '../hook/service'
import { addWord } from '../data'
import './add.css'

export default function Add() {
  const [state, setState] = useState({})
  const [addWordParams, setAddWordParams] = useState(null)
  const addWordsData = useService(addWord, addWordParams)

  const handleChange = (name, value) => {
    setState(prevState => {
      const newState = { ...prevState }
      newState[name] = value

      return newState
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setAddWordParams({ ...state, now: Date.now() })
  }

  useEffect(() => {
    const { code, msg } = addWordsData

    if (code !== undefined) {
      if (msg) {
        alert(msg)
      }
    }
  }, [addWordsData])

  const itemList = [{
    label: '单词',
    name: 'name'
  }, {
    label: '发音',
    name: 'pron',
  }, {
    label: '音调',
    name: 'accent'
  }, {
    label: '罗马字',
    name: 'romaji'
  }, {
    label: '拼写',
    name: 'spell'
  }, {
    label: '词性',
    name: 'category'
  }, {
    label: '标签',
    name: 'label'
  }, {
    label: '摘要',
    name: 'excerpt'
  }]

  return (
    <div className="add-page">
      <form onSubmit={handleSubmit}>
        {
          itemList.map(item => (
            <Item
              key={item.label}
              label={item.label}
              name={item.name}
              onChange={handleChange}
            />
          ))
        }
        <button type="submit">添加</button>
      </form>
    </div>
  )
}

function Item(props) {
  const {
    label,
    name,
    onChange
  } = props

  const handleChange = (name, event) => {
    onChange && onChange(name, (event.target.value || '').trim())
  }

  return (
    <div className="item">
      <span className="label">{label}</span>
      {
        label === '摘要' ?
          <textarea type="text" onChange={handleChange.bind(this, name)} /> :
          <input type="text" onChange={handleChange.bind(this, name)} />
      }
    </div>
  )
}
