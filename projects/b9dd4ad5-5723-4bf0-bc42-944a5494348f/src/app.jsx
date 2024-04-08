import React from "react"

let App = () => {
  const items = ["first", "second", "third"]
  return (
    <div>
      <h1 style={{ color: "blue" }}>this is a simple title</h1>
      <button>This is a button</button>
      <ul>
        <li>Onee</li>
        <li>Two - four</li>
        <li>Tsddfsdfdswhrwee</li>
      </ul>
      {items.map((item) => (
        <div key={item}>{item}</div>
      ))}
      <h1>This is a next thing</h1>
    </div>
  )
}

export default App
