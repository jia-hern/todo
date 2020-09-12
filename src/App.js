import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    list: ["one", "two"],
    textbox: "",
    editing: false,
  };
  handleChange = (event) => {
    this.setState({ textbox: event.target.value });
  };
  handleSubmit = (event) => {
    // alert("A new todo is to be added:" + this.state.textbox);
    // prevents the page from being refreshed on button submission, which is the default button behavior
    event.preventDefault();
    let temp = { ...this.state };
    temp.list.push(this.state.textbox);
    this.setState(temp);
  };
  // use the editing in state as a switch to display the edit form
  handleEdit = (toEdit, id) => {
    //https://stackoverflow.com/questions/55149022/how-to-create-an-edit-button-in-react
    this.setState({ editing: true });
  };
  handleDelete = (toDelete, id) => {
    let templist = [...this.state.list];
    templist = templist.filter((item) => item[id] !== toDelete[id]);
    this.setState({ list: templist });
  };
  //an easier method using splice but need to change buton onclick:
  // this.handleDelete(item, i) -> this.handleDelete(i)
  //   handleDelete = (id) => {
  // 	  let templist = [...this.state.list];
  // 	  templist.splice(id,1);
  // 	  this.setState({list: templist})
  //   }
  render() {
    return (
      <React.Fragment>
        <h1>Todo list</h1>
        {/* this sections displays all todos in the list  */}
        {this.state.list.map((item, i) => (
          <div id={i}>
            {item}
            <button onClick={() => this.handleDelete(item, i)}>Delete</button>
          </div>
        ))}

        {/* this section allows addition of a new todo  */}
        <h3>Add a new todo</h3>
        <form onSubmit={this.handleSubmit}>
          <label>
            Write a new todo...
            <input
              type="text"
              value={this.state.textbox}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </React.Fragment>
    );
  }
}

export default App;
