import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from 'react';
import Header from './components/Header.js';
import ToDoList from './components/ToDoList.js';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            name: 'Ivan V',
        }; // we can only have one state (not like useState)
        // презаписваме контекста

        // with bind we say: искаме метода, който е в нашия клас и се казва onTodoClick, да го
        // байднем с текущия this, което ще продължи да работи правилно без значение колко надълбоко
        // слиза метода по дървото
        this.onTodoClick = this.onTodoClick.bind(this);
    }

    componentDidMount() {
        fetch('http://localhost:3001/data.json')
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                // setting state:
                this.setState({
                    todos: data.todos
                }); // in comparison to functional comp class components merges automatically the data (no need to spread)
                // arrow functions do not have personal context, they reuse their parent's context
                // so now we are in the context of the method componentDidMount(), whose context is the class context

            });
    }
    // This is not a func, it is a method
    onTodoClick(todoId) {
        // тук контекста на хендлъра на event-a е всъщност event object-a, следователно не се намираме в настоящата инстанция на компонента
        this.setState({
            todos: this.state.todos.map(todo =>
                todo.id === todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo
            )
        });
    }
    onTodoDelete(todoId) {
        this.setState({
            todos: this.state.todos.filter(todo => todo.id !== todoId)
        });
    }
    render() {
        return (
            <>
                <Header />
                <h2>{this.state.name}</h2>
                <ToDoList
                    todos={this.state.todos}
                    onTodoClick={this.onTodoClick}
                    onTodoDelete={this.onTodoDelete.bind(this)}
                />
                {/* because onTodoClick is a method we are sending it with "this" */}
            </>
        );
    }
}

export default App;
