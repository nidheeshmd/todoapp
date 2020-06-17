import React, { Component } from "react";
import "bulma/css/bulma.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
      doneTasks: [],
      favTasks: [],

      modalTaskForm: false,
      modalTaskForm_Toggle: "",

      title: "",
      detail: "",
      time: "",
      fav: false,

      act: 0,
      index: 0,
      renderTasks: 1,
      navActive: "tasks",
    };
  }

  componentDidMount() {}

  uniqueId = () => {
    return "id-" + Math.random().toString(36).substr(2, 16);
  };

  modalTaskForm = (modal) => {
    if (modal) {
      this.setState({
        modalTaskForm_Toggle: "is-active",
        modalTaskForm: modal,
      });
    } else {
      this.setState({ modalTaskForm_Toggle: "", modalTaskForm: modal });
    }
  };

  submitTask = (e) => {
    e.preventDefault();
    console.log("Submit");
    let { tasks, title, detail, time, fav, act, index } = this.state;

    if (act === 0) {
      let task = {
        title,
        detail,
        time,
        fav,
        id: this.uniqueId(),
      };
      tasks.push(task);
    } else {
      tasks[index].title = title;
      tasks[index].detail = detail;
      tasks[index].time = time;
    }
    this.setState({
      tasks,
      modalTaskForm: false,
      modalTaskForm_Toggle: "",
      title: "",
      detail: "",
      time: "",
      fav: false,
      act: 0,
    });
  };

  inputChange = (e) => {
    let { name, value } = e.target;
  };

  remove = (i) => {
    let { tasks } = this.state;
    tasks.splice(i, 1);
    this.setState({
      tasks,
      title: "",
      time: "",
      fav: false,
      act: 0,
    });
  };

  edit = (i) => {
    let task = this.state.tasks[i];

    this.setState({
      title: task.title,
      detail: task.detail,
      time: task.time,
      modalTaskForm: true,
      modalTaskForm_Toggle: "is-active",
      act: 1,
      index: i,
    });
  };

  viewDateTime = (dt) => {
    dt = dt.split("T");
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let d = new Date(dt[0]);
    let n = d.tiLocalDateString(["en-US"], options);
    return `${n} @${dt[1]}`;
  };

  render() {

    let {tasks, doneTasks,favTasks} = this.state;
    return (
      <div className="App">
        <div className="container" style={{paddingTop:60}}>
          <div className="field has-addons">
            <p className="control">
              <button className="button is-link is-rounded">
                  
                <span className="icon">
                  <i className="fa fa-plus"></i>
                </span>
                <span></span>
              </button>
            </p>
            <p className="control">
              <button className="button is-link is-rounded">
                <span className="icon">
                  <i className="fa fa-tasks"></i>
                </span>
                <span>Tasks ( {tasks.length} )</span>
              </button>
            </p>
            <p className="control">
              <button className="button is-link is-rounded">
                <span className="icon">
                  <i className="fa fa-check"></i>
                </span>
                <span>Done ( {doneTasks.length} )</span>
              </button>
            </p>
            <p className="control">
              <button className="button is-link is-rounded">
                <span className="icon">
                  <i className="fa fa-heart"></i>
                </span>
                <span>Done ( {favTasks.length} )</span>
              </button>
            </p>
          </div>

<div style={{paddingTop:60}}>
    <span>List task</span>
</div>

        </div>
      </div>
    );
  }
}

export default App;
