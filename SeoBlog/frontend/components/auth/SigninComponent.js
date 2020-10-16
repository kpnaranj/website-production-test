import {useState, useEffect} from 'react';
import {signin, authenticate, isAuth} from '../../actions/auth'
import Router from 'next/router';

const SigninComponent = () =>{
    const [values, setValues] = useState({
        email:'kpnarsh@uwaterloo.ca',
        password:'hhhhhhhhhhhh',
        error: '',
        loading: false, 
        message: '',
        showForm: true
    });
    //We want to have these values as types

    const { email, password, error, loading, message, showForm} = values;

    //It changes stages 
    useEffect(()=>{
        isAuth() && Router.push('/');
    },[])
    
    const handleSubmit = (e)=>{
        e.preventDefault();
        setValues({...values, loading:true, error:false});
        //We passed the objects in a variable to be used
        const user = {email, password, error, message};

        signin(user).
        then(data=>{

            if(data.error){
                setValues({...values, error:data.error, loading:false})
            }else{
                // save user token to cookie 
                // save user info to local storage
                // authenticate user
                authenticate(data, ()=>{
                    Router.push('/')
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
    
    const signinForm = ()=>{
        return(
            <form onSubmit={handleSubmit}>
                {/**This is the set for email change */}
                <div className="form-group">
                    <input value={email} onChange={handleChange('email')} type="email" className="form-control" placeholder="Type your email"/>
                </div>
                {/**This is for password */}
                <div className="form-group">
                    <input value={password} onChange={handleChange('password')} type="password" className="form-control" placeholder="Type your password"/>
                </div>

                <button className="btn btn-primary">Signin</button>
            </form>
        )

    }
    
    return (
        <React.Fragment>
            {showError()}
            {showLoading()}
            {showMesage()}
            {showForm && signinForm()}  
        </React.Fragment>
    )
};

export default SigninComponent;