import React from 'react';
import ValidationService from "./services/ValidationService";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      email: '',
      password: '',
      formErrors: {}
    }
  }

  changeHandler = evt => {
    this.setState({
      [evt.target.name] : evt.target.value
    });
}

submit = (evt) => {
     
  evt.preventDefault();

  var response = ValidationService.validate({
      email: {
          value: this.state.email, 
          rules: {'required': true, 'validEmail': true } 
      },
      password: { 
          value: this.state.password, 
          rules: {'required': true, 'minLength': 5 } 
      }
  });

  this.setState({
    formErrors: (response)? response : {}
  });


  if(!response) {
    alert('It works!'); 
  }    
}

  render(){
    return (
      <div className="container">   
          <br />
          <div className="col-md-6 m-auto">
            <h3 className="mb-5">Login</h3> 
            <form onSubmit={this.submit} method="post">
                <div class="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <input class="form-control" type="text" name="email" onKeyUp={this.changeHandler} placeholder="Enter email" />
                  <small className="text-danger">{(this.state.formErrors.hasOwnProperty('email'))? this.state.formErrors.email[0] : ''}</small>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input type="password" name="password" class="form-control" onKeyUp={this.changeHandler} placeholder="Password" />
                  <small className="text-danger">{(this.state.formErrors.hasOwnProperty('password'))? this.state.formErrors.password[0] : ''}</small>
                </div>
                 
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
          </div>
      </div>
        );
  }
}

export default App;
