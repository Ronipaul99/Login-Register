import React, { Component } from 'react';
import "./Allcss.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
 class Login extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            formData:{
                email: "",
                password: "",
            },
            formErr:{
                emailerror: "",
                passworderror: ""
            },
            formValid:{
                emailValid: false,
                passwordValid: false
            },
            valid:false,
            loginSuccess:false,
            errorMessage:false,
        }
    }

    
    handelChange = (event) => {
        var {formData} = this.state
        var name= event.target.name
        var value = event.target.value
        this.fieldValidate(name,value)
        formData[name] = value
        this.setState({ formData },()=>{
            console.log(this.state.formData);
        })
    }

    fieldValidate = (name , value) => {
        var {formErr,formValid} = this.state
        switch (name) {
            case "email":
                if(value===""){
                    formErr.emailerror="please enter your email"
                    formValid.emailValid=false
                }else{
                    formErr.emailerror=""
                    formValid.emailValid=true
                }
                break;
            case "password":
                if(value===""){
                    formErr.passworderror="please enter your password"
                    formValid.passwordValid=false
                }else{
                    formErr.passworderror=""
                    formValid.passwordValid=true
                }
                break;
            default:
                break;
        }
        var valid = formValid.emailValid && formValid.passwordValid
        this.setState({formErr,formValid ,valid})
    }

    handelSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:1500/user/login',this.state.formData).then((response)=>{
            if(response.data){
                this.setState({loginSuccess:true , errorMessage:false})
                this.props.history.push('/')
            }else{
                this.setState({loginSuccess:false , errorMessage:true})
            }
        }).catch((err)=>{
            this.setState({loginSuccess:false , errorMessage:true})
            console.log(err);
        })
    }

    render() {
        return (
            <div>
                <div className="card background">
                    <div className="card-head text-center">
                        <h5><img src={('./blue_dropbox_logo-vfl2gAvQk.png')} alt="logo" style={{width:"300px", marginLeft:"9%"}}/>  Sign in to Dropbox</h5>
                    </div>
                    
                    <button className="button1 btn">Sign in with Google</button>
                    <button className="button2 btn">Sign in with Apple</button>

                    <h6>or</h6>
                    
                    <form onSubmit = {this.handelSubmit}>
                        <div className="space">
                            <div>
                            
                                <div className="form-group ">{/* inputdiv */}
                                    <input type="email" className="form-control input" name="email" id="email" placeholder="Email"
                                    value={this.state.formData.email} onChange={this.handelChange}/>
                                    <span className="text-danger">{this.state.formErr.emailerror}</span>
                                </div>
                                <div className="form-group inputdiv">
                                    <input type="password" className="form-control input" name="password" id="password" placeholder="Password"
                                    value={this.state.formData.password} onChange={this.handelChange}/>
                                    <span className="text-danger">{this.state.formErr.passworderror}</span>
                                </div>
                            </div>
                            
                            <p className="policy">This page is protected by reCAPTCHA, and subject to the Google 
                            <a href="https://www.google.com/policies/privacy/" rel="noreferrer" target="_blank"> Privacy Policy </a> 
                            and <a href="https://www.google.com/policies/terms/" rel="noreferrer" target="_blank"> Terms of Service</a>.</p>
                            
                            <div>
                                <input name="tos_agree" type="checkbox" checked="checked" />
                                <span> Remember me</span>
                            </div>

                        </div>
                        <button className="button btn btn-primary" disabled={!this.state.valid}>Sign in</button>
                        <p className="forgot">Forgot your password?</p>
                        <p className="text-center">(or <Link to="/Register">create an account</Link>)</p>
                        <div>{this.state.errorMessage && <span className="text-danger">please Enter correct credential</span>}</div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;