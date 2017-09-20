import React from 'react';

const Item = ({ items, onAddTask }) => {
	const onInputChange = (e, todo_id) => {
		onAddTask( e.target, e.target.attributes['data-todo_id'].value )
	}
	const toggleCheckMark = (e) => {
		e.target.classList.toggle('fa-check-square-o');
		e.target.classList.toggle('fa-square-o');
		onAddTask( e.target, e.target.attributes['data-todo_id'].value )
	}
	const deleteItem = (e) => {
		onAddTask( e.target, e.target.attributes['data-todo_id'].value )
	}
	const itemNodes = items.map((item) => {
		return (
			<div key={item.todo_id} data-done={item.done}>
				<i 
					className={item.done ? 'fa fa-check-square-o' : "fa fa-square-o"}
					id="check" 
					data-type="checkbox"
					data-todo_id={item.todo_id} 
					onClick={ toggleCheckMark.bind(this) }>
				</i>
				<input 
					type="text" 
					value={item.text} 
					data-todo_id={item.todo_id} 
					data-type="text"
					onChange={ onInputChange.bind(this) } 
					className={item.done ? 'done' : null}
				/>
				<i 
					className="fa fa-times" 
					data-type="delete"
					data-todo_id={item.todo_id} 
					onClick={ deleteItem.bind(this) }>
				</i>
			</div>
		)
	})
    return (<div>{itemNodes}</div>)
};

export default Item;
