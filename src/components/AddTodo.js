import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class AddTodo extends Component {
    state = {
        title: ''
    }

    // e.target.name varies according with the name of the input, it has to be equal to the state name.
    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    // On submit
    onSubmit = (e) => {
        e.preventDefault();
        this.props.AddTodo(this.state.title);
        this.setState({ title: '' });
    }

    render() {
        return (
            <form onSubmit={this.onSubmit} style={{ display: 'flex' }}>
                <input 
                  type='text'
                  name='title'
                  style={{ flex: '10', padding: '5px' }}
                  placeholder='Add Todo...'
                  value={this.setState.title}
                  onChange={this.onChange}
                  autoComplete='off' /> 
                <input type='submit'
                  value='Submit'
                  className='btn'
                  style={{flex: '1'}} />
            </form>
        )
    }
}

//PropTypes (good practice)
AddTodo.propTypes = {
    AddTodo: PropTypes.func.isRequired,
}

export default AddTodo
