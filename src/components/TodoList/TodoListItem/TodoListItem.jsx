
import { useState } from 'react';
import './TodoListItem.css';


const TodoListItem=(props)=>{
    const {item,onDelete,onEdit}=props;
    const {title,priority,id}=item;
    const [isChecked,setChecked]=useState(false);
    
    return(
    <div>
        <div className={`item-card ${priority}`}>
            {isChecked?(<span class="material-symbols-outlined pointer" onClick={()=>setChecked(false)}>check_box</span>):
            (<span className='checkbox pointer' onClick={()=>setChecked(true)}/>

            )}
          

           <div className={`card-title ${isChecked && 'strike'}`}>{title}</div>

<div className="badge">
    {priority}
</div>
<span class="material-symbols-outlined edit" onClick={()=>onEdit(item)}>
edit
</span>

<span className="material-symbols-outlined delete" onClick={()=>onDelete(id)}>
delete
</span>

        </div>
   </div>     
    )
}

export default TodoListItem;