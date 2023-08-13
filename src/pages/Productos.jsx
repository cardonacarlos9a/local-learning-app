import Header from "../components/shared/Header";
import TodoList from "../components/todo-list";
import { useContext } from 'react'
import {ProductContext} from '../services/ProductContext.jsx'

export default function ProductosLista(){
    const { products } = useContext(ProductContext)

    return <>
            <Header></Header>
            <h1>Listado de productos</h1>
            <TodoList/>
            <div>
                {products.map((product, index) => (
                    <div key={index}>
                    <p>{product.name}</p>
                    <p>{product.description}</p>
                    <p>{product.price}</p>
                    </div>
                ))}
            </div>
    </>
}