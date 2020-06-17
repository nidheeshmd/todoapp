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
    let options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    let d = new Date(dt[0]);
    let n = d.toLocaleDateString(["en-US"], options);
    return `${n} @${dt[1]}`;
  };

  render() {
    let { tasks, doneTasks, favTasks, renderTasks, modalTaskForm, modalTaskForm_Toggle, title, detail, time, navActive} = this.state;
    return (
      <div className="App">
        <div className="container" style={{ paddingTop: 60 }}>
          <div className="field has-addons">
            <p className="control">
              <a
                className="button is-link is-rounded" onClick={()=>this.modalTaskForm(!modalTaskForm)}
              >
                <span className="icon">
                  <i className="fa fa-plus"></i>
                </span>
                <span>New</span>
              </a>
            </p>
            <p className="control">
              <a className={`button is-link is-rounded ${navActive==='tasks'?'is-outlined':''}`}
               onClick={()=>{
                this.setState({
                    renderTasks:1,
                    navActive: 'tasks'
                });
            }}>
                <span className="icon">
                  <i className="fa fa-tasks"></i>
                </span>
                <span>Tasks ( {tasks.length} )</span>
              </a>
            </p>
            <p className="control">
              <a className={`button is-link is-rounded ${navActive==='done'?'is-outlined':''}`}
              onClick={()=>{
                this.setState({
                    renderTasks: 2,
                    navActive: 'done'
                });
            }}>
                <span className="icon">
                  <i className="fa fa-check"></i>
                </span>
                <span>Done ( {doneTasks.length} )</span>
              </a>
            </p>
            <p className="control">
              <a className={`button is-link is-rounded ${navActive==='fav'?'is-outlined':''}`}
              onClick={()=>{
                this.setState({
                    renderTasks: 3,
                    navActive: 'fav'
                });
            }}>
                <span className="icon">
                  <i className="fa fa-heart"></i>
                </span>
                <span>Done ( {favTasks.length} )</span>
              </a>
            </p>
          </div>

          <div style={{ paddingTop: 60 }}>

            {renderTasks === 1 &&
            tasks.map((data, i) =>
            <div className="columns" key={i}>
                <div className="column is-12">
                    <article className="media">
                        <div className="media-content">
                            <div className="content">
                            <p>
                                <strong>{data.tittle}</strong>
                                <br/>
                                <small>{this.viewDateTime(data.time)}</small>
                                <br/>
                                {data.detail}
                            </p>
                            </div>
                            <nav className="level is-mobile">
                                <div className="level-left">
                                    <a className="level-item"
                                        onClick={()=>this.taskDone(i)}
                                    >
                                        <span className="icon"><i className="fa fa-lg fa-check"></i></span>
                                    </a>
                                    <a className="level-item"
                                        onClick={()=>this.tasksToFav(i, data.id)}
                                    >
                                        <span className={`icon ${data.fav===true?'has-text-danger':''}`}><i className="fa fa-lg fa-heart"></i></span>
                                    </a>
                                    <a className="level-item"
                                        onClick={()=>this.Edit(i)}
                                    >
                                        <span className="icon"><i className="fa fa-lg fa-pencil-alt"></i></span>
                                    </a>
                                </div>
                            </nav>
                        </div>
                        <div className="media-right">
                            <button className="delete"
                                onClick={()=>this.Remove(i)}
                            ></button>
                        </div>
                    </article>
                </div>
            </div>)}


            {renderTasks === 2 && <span>List Tasks Done</span>}
            {renderTasks === 3 && <span>List Tasks Favour</span>}
          </div>
        </div>

        <div className={`modal ${modalTaskForm_Toggle}`}>
          <div className="modal-background" onClick={()=>this.modalTaskForm(!modalTaskForm)}></div>
          <div className="modal-content">
            <form ref="myForm" className='myForm'>
                <div className="field">
                    <label className="label" style={{color:'#fff'}}>Your Task</label>
                    <div className="control">
                        <input name='title' className="input" type="text" placeholder="Your task" value={title} onChange={(e) => this.inputChange(e)}/>
                    </div>
                </div>
                <div className="field">
                    <label className="label" style={{color:'#fff'}}>Task Details</label>
                    <div className="control">
                        <textarea name='detail' className="textarea" type="text" placeholder="Task Details" value={detail} onChange={(e) => this.inputChange(e)}/>
                    </div>
                </div>
                <div className="field">
                    <label className="label" style={{color:'#fff'}}>Date and Time</label>
                    <div className="control">
                        <input name='time' className="input" type="datetime-local" placeholder="Date and Time" value={detail} onChange={(e) => this.inputChange(e)}/>
                    </div>
                </div>
                <button className='button is-info' onClick={(e)=> this.submitTask(e)}>SAVE</button>
            </form>

          </div>
          <button className="modal-close is-large" aria-label="close" onClick={()=>this.modalTaskForm(!modalTaskForm)}></button>
        </div>
      </div>
    );
  }
}

export default App;
