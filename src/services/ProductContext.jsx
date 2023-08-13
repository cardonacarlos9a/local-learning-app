import { useState, createContext} from 'react'

export const ProductContext = createContext([])

export default function ProductContextProvider ({ children })  {
    const [ products, setProducts] = useState([])


const addProduct = (newProduct) => {
    setProducts([...products, newProduct]);
}

    return (
        <ProductContext.Provider value={{products,addProduct}}>
                 {typeof children === 'function' ? children() : children}
        </ProductContext.Provider>
    )
}