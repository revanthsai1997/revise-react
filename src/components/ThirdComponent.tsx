import { useContext } from "react";
import { ProductContext } from "../App";

function ThridComponent() {

    const productContext = useContext(ProductContext);
  return (
    <div>
      <h1>Third Component</h1>
      <p>This is the third component.</p>

        <h2>Products:</h2>
        {productContext.products.map((product) => (
          <div key={product.id}>
            <p>{product.name}</p>
        </div>
        
        ))}
    </div>
  );
}

export default ThridComponent;