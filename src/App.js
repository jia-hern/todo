import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    // list: ["one", "two"],
    list: [
      // to save info in this format
      // { text: "one", editing: false, edited: false },
      // { text: "two", editing: false, edited: false },
      ["one", false, false],
      ["two", false, false],
    ],
    textbox: "",
    editbox: "",
  };
  handleChange = (event) => {
    this.setState({ textbox: event.target.value });
  };
  handleEditBox = (event) => {
    this.setState({ editbox: event.target.value });
  };
  handleSubmit = (event) => {
    // to test that basic submit works
    // alert("A new todo is to be added:" + this.state.textbox);
    // prevents the page from being refreshed on button submission, which is the default button behavior
    event.preventDefault();
    let temp = { ...this.state };
    temp.list.push([this.state.textbox, false, false]);
    this.setState(temp);
  };
  handleEdit = (id) => {
    /* to do something like that: <button onClick={() 
      => (this.setState({list[i][1] = true}))}>Edit</button> */
    let templist = [...this.state.list];
    //to display the form & hide original edit button
    templist[id][1] = true;
    // to "reset any other todos that have the forms open"
    for (let index = 0; index < templist.length; index++) {
      if (index !== id) {
        templist[index][1] = false;
        templist[index][2] = false;
      }
    }
    //dk why the next 2 lines dont work
    // let text = templist[id][0];
    // templist = templist.splice(id, 1, [text, true, true]);
    this.setState({ list: templist });
    //to show the confirm edit button
    templist[id][2] = true;
  };
  // use the editing in state as a switch to display the edit form
  submitEdit = (id) => {
    //https://stackoverflow.com/questions/55149022/how-to-create-an-edit-button-in-react
    let templist = [...this.state.list];
    //to hide the form
    templist[id][1] = false;
    //to hide the confirm edit button
    templist[id][2] = false;
    templist[id][0] = this.state.editbox;
    this.setState({ list: templist });

    // at position id, remove 1 item and put whats in editbox in its place
    // templist = templist.splice(id, 1, this.state.editbox);
    this.setState({ list: templist });
  };

  handleDelete = (id) => {
    let templist = [...this.state.list];
    templist.splice(id, 1);
    this.setState({ list: templist });
  };
  render() {
    console.log(this.state.list);
    return (
      <React.Fragment>
        <h1>Todo list</h1>
        {/* this sections displays all todos in the list  */}
        {this.state.list.map((item, i) => (
          <div key={i}>
            {item[1] ? (
              <input
                type="text"
                value={this.state.editbox}
                onChange={this.handleEditBox}
              />
            ) : (
              item[0]
            )}
            {/* hide delete button when editting to prevent accidental deletion during editing  */}
            {!item[1] && (
              <button onClick={() => this.handleDelete(i)}>Delete</button>
            )}
            {/* to hide the edit button when editting  */}
            {!item[1] && (
              <button onClick={() => this.handleEdit(i)}>Edit</button>
            )}
            {/* to show the confirm edit button after clicking edit*/}
            {item[2] && (
              <button onClick={() => this.submitEdit(i)}>Confirm edit</button>
            )}
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
