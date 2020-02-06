import React, {Component} from 'react';
import {Button, message} from 'antd';


class App extends Component {
    success = () => {
        message.success('This is a success message');
    };
      
    error = () => {
        message.error('This is an error message');
    };
      
    warning = () => {
        message.warning('This is a warning message');
    };

    render(){
        return(
            <div>
            <Button type="primary" onClick={this.success}>Success</Button>
            <Button onClick={this.error}>Error</Button>
            <Button onClick={this.warning}>Warning</Button>
            </div>
        )
    }
}

export default App;