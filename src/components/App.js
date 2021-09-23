import React, { useState, useEffect } from "react"
import { messagesRef, pushMessage } from "../firebase"

const App = () => {
  const [name, setName] = useState("default")
  const [text, setText] = useState("text")
  const [messages, setMessages] = useState([])

  useEffect(() => {
    messagesRef
      .orderByKey()
      .limitToLast(10)
      .on("value", (snapshot) => {
        const messages = snapshot.val()
        if (messages === null) return
        const entries = Object.entries(messages)
        const newMessages = entries.map((data) => {
          const [key, message] = data
          return { key, ...message }
        })
        setMessages(newMessages)
      })
  }, [])

  return (
    <div>
      <h1>スーパーチャット</h1>
      {messages.map((message) => (
        <div key={message.key}>
          {message.name}:{message.text}
        </div>
      ))}
      <input
        type="text"
        value={name}
        onChange={(e) => setName((name) => (name = e.target.value))}
      />
      <input
        type="text"
        value={text}
        onChange={(e) => setText((text) => (text = e.target.value))}
      />
      <button onClick={() => pushMessage({ name: name, text: text })}>
        {" "}
        push{" "}
      </button>
    </div>
  )
}

export default App
