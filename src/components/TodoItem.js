import React, { Component } from 'react'
import PropTypes from 'prop-types';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

export class TodoItem extends Component {
    
    //Style into the component but separated from the div
    // to use the ternary operator and simplify things
    getStyle = () => {
        return {
            background: '#f4f4f4',
            padding: '10px',
            borderBottom: '1px #ccc dotted',
            textDecoration: this.props.todo.completed ? 'line-through' : 'none',
            color: this.props.todo.completed ? '#808080' : '#000000' 
        }
    }

    checkboxValue = () => {
        return this.props.todo.completed ? true : false;    
    }

    render() {
        //destructuring: to pull of the variables from props and use just the single variable
        const { id, title } = this.props.todo;

        return (
            <div style={this.getStyle()}>
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'space-between' }}>
                    <div onClick={this.props.markComplete.bind(this, id)} style={{ cursor: 'pointer' }}>
                        { title }                       
                    </div>
                    <div>
                        <DeleteForeverIcon onClick={this.props.delTodo.bind(this, id)} style={btnStyle}>X</DeleteForeverIcon>
                    </div>
                </div> 
            </div>
        )
    }
}

//PropTypes (Good Practice)
TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    markComplete: PropTypes.func.isRequired,
    delTodo: PropTypes.func.isRequired
}

const btnStyle = {
    color: 'red',
    cursor: 'pointer',
    float: 'right'
}


export default TodoItem
