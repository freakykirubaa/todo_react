
import { useEffect, useState } from 'react';
import './NewItem.css';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();
const NewItem=(props)=>{
   const {addItem,editState,editItem}=props;
    const [title,setTitle]=useState('');
    const[priority,setPriority]=useState('low');
    const isEdit=Boolean(editState.id);


useEffect(()=>{
    if(editState.id)
    {
        setTitle(editState.title)
        setPriority(editState.priority);
    }
},[editState])

    const handleInputChange=(e)=>{
            setTitle(e.target.value)
    }
  
    const handleSave=()=>{
        if(!title)
        {
            return;
        }
        const obj={
            title,
            priority
        }
        if(isEdit)
        {
            obj.id=editState.id
            editItem(obj)
        }
        else{
            addItem(obj)
            toast('Success');
        }
        
        setTitle('')
        setPriority('low')
    
    }

    const handleClear=()=>{
        setTitle('');
        setPriority('');
    }
    const PRIORITY = ['low','medium','high']
    return(
    
        <div className="new-item-card">
            <div className="checkbox"></div>
                <div className='form-container'>
                    <input type="text"  placeholder='New Item' value={title} onChange={handleInputChange} />
                            {title&&(<div>
                                <div className="badge-container">
                            {PRIORITY.map((p) =><div key={p}className={`p-badge ${p} ${p==priority && 'selected'}`} onClick={()=>setPriority(p)}>{p}</div>)}
                                </div>
                                <div className="btn-container">
                                    <button className='primary' onClick={handleSave}>Save</button>
                                    <button className='secondary' onClick={handleClear}>Clear</button>
                                </div>
                            </div>)}
                    
                </div>
         
        </div>
        
      
        
    )
}

export default NewItem;






