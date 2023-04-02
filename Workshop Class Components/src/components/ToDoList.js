import { Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import ToDoItem from './TodoItem.js';

export default class ToDoList extends Component {
    render() {
        // console.log(this.props.todos); // very strange that props are accessible from this.props just because we added props in App.js
        return (
            <ListGroup>
                {this.props.todos.map(todo =>
                    <ToDoItem
                        key={todo.id}
                        onClick={this.props.onTodoClick}
                        onDelete={this.props.onTodoDelete}
                        {...todo}
                    />
                )}
            </ListGroup>
        );
    }
} 