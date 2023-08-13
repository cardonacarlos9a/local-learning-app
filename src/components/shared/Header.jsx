import Style from "../../styles/header/Header.module.css"
import { Link } from "react-router-dom";
import reactLogo from '../../assets/react.svg'

export default function Header(){
    return  <header className={Style.logobar}>
                <i><img src={reactLogo} alt="" /></i>
                
                <nav>
                    <ul className={Style.contenedor}>
                        <li><Link to="/"><button>Home</button></Link></li>
                        <li><Link to="/productos"><button>Productos</button></Link></li>
                        <li><Link to="/carro"><button>Carrito</button></Link></li>
                        <li><Link to="/crear-producto"><button>Crear Producto</button></Link></li>
                        <li><Link to="/login"><button>Login</button></Link></li>
                        <li><Link to="/dictado"><button>Dictado</button></Link></li>
                    </ul>
                </nav>
            </header>
}