import {useState, useEffect} from 'react';
import {signup, isAuth} from '../../actions/auth';
import Router from 'next/router';


const SignupComponent = () =>{
    const [values, setValues] = useState({
        name: 'Kevin Narsh',
        email:'kpnarsh@uwaterloo.ca',
        password:'hhhhhhhhhhhh',
        error: '',
        loading: false, 
        message: '',
        showForm: true
    });
    //We want to have these values as types

    const {name, email, password, error, loading, message, showForm} = values;
    
    //It changes stages 
    useEffect(()=>{
        isAuth() && Router.push('/');
    },[])
    
    const handleSubmit = (e)=>{
        e.preventDefault();
        setValues({...values, loading:true, error:false});
        //We passed the objects in a variable to be used
        const user = {name, email, password, error, message};

        signup(user).
        then(data=>{

            if(data.error){
                setValues({...values, error:data.error, loading:false})
            }else{
                 setValues({
                    ...values,  
                    name: '',
                    email:'',
                    password:'',
                    error: '',
                    loading: false, 
                    message: data.message,
                    showForm: false
                })
            }
        })
    }

    const handleChange = name=>(e)=>{
        setValues({...values, error:false, [name]:e.target.value})
    };

    const showLoading = ()=>loading ?<div className="alert alert-info">Loading...</div> :'';
    const showError = ()=>error ?<div className="alert alert-danger">{error}</div> :'';
    const showMesage = ()=>message ?<div className="alert alert-info">{message}</div> :'';
    
    const signupForm = ()=>{
        return(
            <form onSubmit={handleSubmit}>
                {/**This is the set for email */}
                <div className="form-group">
                    <input value={name} onChange={handleChange('name')} type="text" className="form-control" placeholder="Type your name"/>
                </div>
                {/**This is the set for email change */}
                <div className="form-group">
                    <input value={email} onChange={handleChange('email')} type="email" className="form-control" placeholder="Type your email"/>
                </div>
                {/**This is for password */}
                <div className="form-group">
                    <input value={password} onChange={handleChange('password')} type="password" className="form-control" placeholder="Type your password"/>
                </div>

                <button className="btn btn-primary">Signup</button>
            </form>
        )

    }
    
    return (
        <React.Fragment>
            {showError()}
            {showLoading()}
            {showMesage()}
            {showForm && signupForm()}  
        </React.Fragment>
    )
};

export default SignupComponent;