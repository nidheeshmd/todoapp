import React, { Component } from 'react';
import 'bulma/css/bulma.css'

class App extends Component{

    constructor(){
        super();
        this.state={
            task:[],
            doneTasks:[],
            favTasks:[],

            modalTasksForm:false,
            modalTasksForm_Toggle: '',

            tittle: '',
            detail:'',
            time:'',
            fav:false,

            act:0,
            index:0,
            renderTasks:1,
            navActive:'tasks'

        };
    };


    render(){
        return(
            <div className="App">
                <a className="button is-primary">
                    <span className="icon">
                        <i className="fa fa-twitter"></i>
                    </span>
                </a>
            </div>
        );
    }
}

export default App;