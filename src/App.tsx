import { createContext, useRef, useState } from 'react'
import './App.css'
import FirstComponent from './components/FirstComponent';

interface Product {
  id: number;
  name: string;
}

interface ProductContextType {
  products: Product[];
  setProducts: (products: Product[]) => void;
}

export const ProductContext = createContext<ProductContextType>({products: [], setProducts: () => {}});

function App() {
  const [products, setProducts] = useState([{id:1, name:'dell'}])
  const inputElement = useRef<HTMLInputElement>(null);

  const ProductProvider = ProductContext.Provider;

  const add = ()=>{
    const maxId = products.length>0 ? Math.max(...products.map(x=>x.id)):0;
    const newId = maxId +1;

    setProducts([...products, { id: newId, name: inputElement.current?.value || 'Unnamed Product' }])
  }

  return (
    <div>
      <input type='text' ref={inputElement}/>
      <button onClick={add}>Add</button>
      <ProductProvider value={{products, setProducts}}>

      <FirstComponent/>
      </ProductProvider>
    </div>
  )
}

export default App
