import './App.css'

function App() {
  const listOfItems = ["car", "bike", "cycle"];

  return (
    <div>
      <ul>{listOfItems.map(x=><li key={x}>{x}</li>)}</ul>
    </div>
  )
}

export default App
