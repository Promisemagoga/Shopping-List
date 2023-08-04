import React from 'react'
import logo from '../Assets/logo.png'
import cart from '../Assets/myCart.png'
import { useNavigate } from 'react-router-dom';

function NavBar() {
    const navigate = useNavigate()
  function shopList(){
    navigate("/ItemList")
    console.log("45 items");
  }
    return (
        <div className='navBar'>
            <div className='logoSide'>
                <img src={logo} alt="" width={80} />
                <h3>Shopping_List</h3>
            </div>
           <button onClick={shopList}><img src={cart} alt="" width={40} /></button>

        </div>
    )
}

export default NavBar