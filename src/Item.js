import React from 'react';

const Item = ({ items, onAddTask }) => {
	const onInputChange = (e, id) => {
		onAddTask( e.target, e.target.attributes['data-id'].value )
	}
	const toggleCheckMark = (e) => {
		e.target.classList.toggle('fa-check-square-o');
		e.target.classList.toggle('fa-square-o');
		onAddTask( e.target, e.target.attributes['data-id'].value )
	}
	const deleteItem = (e) => {
		onAddTask( e.target, e.target.attributes['data-id'].value )
	}
	const itemNodes = items.map((item) => {
		return (
			<div key={item.id} data-done={item.done}>
				<i 
					className={item.done ? 'fa fa-check-square-o' : "fa fa-square-o"}
					id="check" 
					data-type="checkbox"
					data-id={item.id} 
					onClick={ toggleCheckMark.bind(this) }>
				</i>
				<input 
					type="text" 
					value={item.text} 
					data-id={item.id} 
					data-type="text"
					onChange={ onInputChange.bind(this) } 
					className={item.done ? 'done' : null}
				/>
				<i 
					className="fa fa-times" 
					data-type="delete"
					data-id={item.id} 
					onClick={ deleteItem.bind(this) }>
				</i>
			</div>
		)
	})
    return (<div>{itemNodes}</div>)
};

export default Item;
