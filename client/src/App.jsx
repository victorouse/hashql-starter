import React, { createRef, useState } from 'react'
import { sql } from './api'

export const App = () => {
  const [data, setData] = useState({})
  const myFirstInput = createRef()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const results = await sql`
        select ${myFirstInput.current.value} as result
      `
      setData(results)
    } catch (e) {
      console.log({ e })
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" ref={myFirstInput} />
        <button type="submit">Submit</button>
      </form>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
