import React, { Component } from 'react';
import "./Allcss.css";
import { Link } from 'react-router-dom';
import axios from 'axios'

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            formData:{
                firstname: "",
                lastname:"",
                email: "",
                password: "",
            },
            formErr:{
                firstnameerror: "",
                lastnameerror:"",
                emailerror: "",
                passworderror: ""
            },
            formValid:{
                firstnameValid:false,
                lastnameValid:false,
                emailValid: false,
                passwordValid: false
            },
            valid:false,
            loginSuccess:false,
            errorMessage:false,
            successmsg:''
        }
    }

    
    handelChange = (event) => {
        var {formData} = this.state
        var name= event.target.name
        var value = event.target.value
        this.fieldValidate(name,value)
        formData[name] = value
        this.setState({ formData })
    }

    fieldValidate = (name , value) => {
        var {formErr,formValid} = this.state
        switch (name) {
            case "firstname":
                if(value===""){
                    formErr.firstnameerror="please enter your firstname"
                    formValid.firstnameValid=false
                }else{
                    formErr.firstnameerror=""
                    formValid.firstnameValid=true
                }
                break;
            case "lastname":
                if(value===""){
                    formErr.lastnameerror="please enter your lastname"
                    formValid.lastnameValid=false
                }else{
                    formErr.lastnameerror=""
                    formValid.lastnameValid=true
                }
                break;
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
        var valid = formValid.emailValid && formValid.passwordValid && formValid.firstnameValid && formValid.lastnameValid;
        this.setState({formErr,formValid ,valid},()=>{
            console.log(this.state);
        })
    }
    handelSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:1500/user/register',this.state.formData).then((response)=>{
            console.log(response);
            if(response.data){
                this.setState({loginSuccess:true , errorMessage:false , successmsg:response.data.message})
                
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
            {!this.state.loginSuccess ?
                <div className="card background">
                    <div className="card-head text-center">
                        <h5><img src={('./blue_dropbox_logo-vfl2gAvQk.png')}style={{width:"300px", marginLeft:"9%"}} alt="logo" />  Create a Dropbox account</h5>
                    </div>
                    <form onSubmit = {this.handelSubmit}>
                        <div className="space">
                            <div>
                                <div className="form-group inputdiv">
                                    
                                    <input type="text" className="form-control input" name="firstname" id="firstname" placeholder="First Name"
                                    value={this.state.formData.firstname} onChange={this.handelChange}
                                />
                                    <span>{this.state.formErr.firstnameerror}</span>
                                </div>
                                <div className="form-group inputdiv">
                                
                                    <input type="text" className="form-control input" name="lastname" id="lastname" placeholder="Last Name"
                                    value={this.state.formData.lastname} onChange={this.handelChange}
                                    />
                                    <span>{this.state.formErr.lastnameerror}</span>
                                </div>
                                <div className="form-group inputdiv">
                                   
                                    <input type="email" className="form-control input" name="email" id="email" placeholder="Email"
                                    value={this.state.formData.email} onChange={this.handelChange}
                                    />
                                     <span>{this.state.formErr.emailerror}</span>
                                </div>
                                <div className="form-group inputdiv">
                                    
                                    <input type="password" className="form-control input" name="password" id="password" placeholder="Password"
                                    value={this.state.formData.password} onChange={this.handelChange}
                                    />
                                    <span>{this.state.formErr.passworderror}</span>
                                </div>
                            </div>
                            <p className="policy">This page is protected by reCAPTCHA, and subject to the Google 
                            <a href="https://www.google.com/policies/privacy/" rel="noreferrer" target="_blank"> Privacy Policy </a> 
                            and <a href="https://www.google.com/policies/terms/" rel="noreferrer" target="_blank"> Terms of Service</a>.</p>
                            
                            <div className="text-center">
                                <input name="tos_agree" type="checkbox" />
                                <span className="text-center"> I agree to the 
                                 <a href="https://www.dropbox.com/terms" rel="noreferrer" target="_blank"> Dropbox Terms</a></span>
                            </div>
                            
                        </div>
                        <button className="button btn btn-primary" disabled={!this.state.valid}>Create an account</button>
                        <p className="text-center"><Link to="/login">I already have an account</Link></p>
                    </form>
                </div>
                :
                    <div className="card col-md-6 offset-md-3 col-sm-12 successCard">
                            <div className="card-head">
                                <h4>Successfully Registered</h4>
                            </div>
                            <div className="card-body">
                                <h5>{this.state.successmsg}</h5>
                            </div>
                            <button className="btn btn-primary" onClick={()=>{this.props.history.push('login')}}>login</button>
                    </div>
                }
            </div>
        );
    }
}

export default Register;