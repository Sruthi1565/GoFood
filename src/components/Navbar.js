import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import {useCart} from './ContextReducer';
export default function Navbar() {
  const [cartView,setCartView]=useState(false);
  let data=useCart();
   const navigate=useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem("authToken");
    navigate("/login");
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor:"green"}}>
  <div className="container-fluid">
   <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav me-auto mb-2">
        <li className="nav-item">
         <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
        </li>
        {(localStorage.getItem("authToken"))?
            <li className="nav-item">
            <Link className="nav-link active fs-5" aria-current="page" to="/myOrder">My Orders</Link>
           </li>
      :""}
        
      </ul>
      {(!localStorage.getItem("authToken"))?
       <div className='d-flex'>
         <Link className="btn mx-1" to="/login" style={{backgroundColor:"white",color:"green"}}>Login</Link>
     
         <Link className="btn mx-1" to="/createuser" style={{backgroundColor:"white",color:"green"}}>SignUp</Link>
      </div>
      :<div>
      <div className='btn mx-2' style={{backgroundColor:"white",color:"green"}} onClick={()=>{setCartView(true)}}>
      My Cart{" "}
      <Badge pill bg="danger" style={{backgroundColor:"red"}}>{data.length}</Badge>
     </div>
     {cartView?<Modal onClose={()=>setCartView(false)}><Cart /></Modal>:null}
      <div className='btn mx-2' style={{backgroundColor:"white",color:"red"}} onClick={handleLogout}>
       Logout
      </div>
      </div>
      }
        
    </div>
  </div>
</nav>
    </div>
  )
}
