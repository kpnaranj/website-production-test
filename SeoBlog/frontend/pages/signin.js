import Layout from '../components/Layout';
import Link from 'next/link';
import SigninComponent from '../components/auth/SigninComponent';


const Signin =()=> {
    
    return (
        //when we set up layout like this it goes 
        //the content as children 
        <Layout>
            <h2 className="text-center pt-4 pb-4">Signin</h2>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <SigninComponent/>
                </div>
            </div>
        </Layout>
    )
}



export default Signin;