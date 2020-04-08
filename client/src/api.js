import HashQL from 'hashql'

export const { sql } = HashQL(['sql'], ({ tag, hash, input }) => {
  return fetch('http://localhost:1337/hql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ tag, hash, input }),
  }).then((r) => r.json())
})
