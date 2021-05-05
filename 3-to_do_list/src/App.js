import React, { useState, useEffect } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'

function App() {
  const [currentItem,setcurrentItem]=useState("");
  const [listItems,setlistItems]=useState([]);
  const [isEdit,setisEdit]=useState(false);
  const [editId,seteditId]=useState();
  const [alertType,setalertType]=useState("");
  const [alertClass,setalertClass]=useState("");

  const handleSubmit = (e) =>{
    e.preventDefault();
    if(currentItem)
    {
      if(isEdit===false)
      {
        let currentObj={id:new Date().getTime().toString(),content:currentItem};
        setalertType("To do added.");
        setlistItems([...listItems,currentObj]);
      }
      else
      {
        listItems.map((listItem) =>{
          if(listItem.id==editId)
          {
            listItem.content=currentItem;
          }
        })
        setisEdit(false);
        seteditId();
        setalertType("To do edited.");
      }
      setcurrentItem("");
      setalertClass("alert alert-success");
    }
    else
    {
      setalertClass("alert alert-danger");
      setalertType("Please enter something."); 
    }
  }
  const removeItem = (id) =>{
    const newlistItems=listItems.filter((listItem) => listItem.id!==id);
    setlistItems([...newlistItems]);
    setalertClass("alert alert-danger");
    setalertType("To do deleted.");
  }
  useEffect(() => {
    const timer=setTimeout(() => {
      setalertType("")
    }, 3000);
    return (()=>clearTimeout(timer));
  },[alertType])
  return(
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit}>
        {alertType!=="" && <p className={alertClass}>{alertType}</p>}
        <h3>To do List:</h3>
        <div className='form-control'>
          <input type='text' className='grocery' value={currentItem} onChange={(e) => setcurrentItem(e.target.value)} placeholder='e.g. Do math homework'/>
          <button type='submit' className='submit-btn'>
            {isEdit===false && 'Submit'}
            {isEdit===true && 'Edit'}
          </button>
        </div>
      </form>
        <div className='grocery-container'>
          {listItems.map((listItem) => {
              const {id,content}=listItem;
              return(
                <article className='grocery-item'>
                <p className='title'>{content}</p>
                <div className='btn-container'>
                  <button type='button' className='edit-btn' onClick={() => { setisEdit(true); seteditId(id) ;setcurrentItem(content)} }>
                    <FaEdit />
                  </button>
                  <button type='button' className='delete-btn'onClick={() => removeItem(id)}>
                    <FaTrash />
                  </button>
                </div>
              </article>
                  )
              })}
        </div>
        {listItems.length!==0 && <button className='clear-btn' onClick={() => {setalertClass("alert alert-danger"); setlistItems([]); setalertType("To do list cleared.");}}>
          Clear Items
        </button>}
    </section>
  )
}
export default App
