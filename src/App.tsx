import { useRef, useState } from 'react'
import './App.css'

function App() {
  const [products, setProducts] = useState([{id:1, name:'dell'}])
  const inputElement = useRef<HTMLInputElement>(null);

  const add = ()=>{
    const maxId = products.length>0 ? Math.max(...products.map(x=>x.id)):0;
    const newId = maxId +1;

    setProducts([...products, { id: newId, name: inputElement.current?.value || 'Unnamed Product' }])
  }

  return (
    <div>
      <input type='text' ref={inputElement}/>
      <button onClick={add}>Add</button>
      <ul>
        {products.map(x=><li key={x.id}>{x.name}</li>)}
      </ul>
    </div>
  )
}

export default App
