import { Component } from "react";

// {
// task: "Wyprowadź psa",
// done: false,
// },

class ToDoApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      newTask: "",
    };
  }

  handleInputChange = (event) => {
    this.setState({ newTask: event.target.value });
  };

  //HANDLE FORM SUBMIT
  handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted");
    if (this.state.newTask === "") {
      return;
    }
    this.setState({
      todos: [
        ...this.state.todos,
        {
          task: this.state.newTask,
          done: false,
        },
      ],
      newTask: "",
    });
  };

  // HANDLE TASK done
  handleDone = (index) => {
    console.log("TASK INDEX", index);
    const todos = [...this.state.todos];
    todos[index].done = !todos[index].done;
    this.setState({ todos });
  };

  // COMPONENT DID MOUNT
  componentDidMount() {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos) {
      this.setState({ todos });
    }
  }

  // COMPONENT DID UPDATE
  componentDidUpdate(prevProps, prevState) {
    // console.log("prevState: ", prevState);
    // console.log("ComponentDidUpdate, STATE: ", this.state);
    localStorage.setItem("todos", JSON.stringify(this.state.todos));
  }

  render() {
    return (
      <div>
        <h1>To do list</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Add to do:
            <input
              type="text"
              onChange={this.handleInputChange}
              value={this.state.newTask}
            />
          </label>
          <button>Add </button>
        </form>

        <ul>
          {this.state.todos.map((todo, index) => (
            <li key={index} className={todo.done ? "done" : ""}>
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => this.handleDone(index)}
              />
              {todo.task}
              <button>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ToDoApp;
