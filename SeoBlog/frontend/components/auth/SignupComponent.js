import {useState} from 'react';

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


    const handleSubmit = (e)=>{
        e.preventDefault();
        console.table({name, email, password, error, loading, message, showForm});
    }

    const handleChange = name=>(e)=>{
        setValues({...values, error:false, [name]:e.target.value})

    }
    
    
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
            {signupForm()}  
        </React.Fragment>
      
    )
};

export default SignupComponent;