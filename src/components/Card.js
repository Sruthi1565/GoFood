import React, { useEffect, useState,useRef } from 'react'
import { useDispatchCart,useCart } from './ContextReducer';

export default function Card(props) {
   let dispatch=useDispatchCart();
   const priceRef=useRef();
   let data=useCart()
   let options=props.options;
   let priceOptions=Object.keys(options);
   const [qty,setQty]=useState(1)
   const [size,setSize]=useState("")
  
   const handleAddToCart = async () => {
    let food = []
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;

        break;
      }
    }
    if (food !== []) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })
        console.log("Size different so simply ADD one more to the list")
        return
      }
      return
    }

    await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })


  }
   let finalPrice=qty * parseInt(options[size]);
   useEffect(()=>{
    setSize(priceRef.current.value)
   },[])
  return (
    <div>
      <div>
        <div className="card mt-3" style={{"width": "18rem","maxHeight":"360px"}}>
  <img src={props.foodItem.img} className="card-img-top" alt="..." style={{height:"120px",objectFit:"fill"}}/>
  <div className="card-body">
    <h5 className="card-title">{props.foodItem.name}</h5>
    <div className='container w-100'>
        <select className='m-2 h-100 rounded' style={{"backgroundColor":"green"}}  onChange={(e)=>setQty(e.target.value)}>
            {Array.from(Array(6),(e,i)=>{
                return(
                    <option key={i+1} value={i+1}>{i+1}</option>
                )
            })}
        </select>
    <select className='m-2 h-100 rounded'  style={{"backgroundColor":"green"}} ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
       {priceOptions.map((data)=>{
        return <option key={data} value={data}>{data}</option>
       })}
    </select>
    <div className="d-inline h-100 fs-5">{finalPrice}/-</div>
    </div>
  </div>
  <hr></hr>
  <button className={`btn justify-center ms-2`} onClick={handleAddToCart} style={{backgroundColor:"green"}}>Add to Cart</button>
</div>
      </div>
    </div>
  )
}
