import Layout from '../components/Layout';
import Link from 'next/link';

const Signup =()=> {
    
    return (
        //when we set up layout like this it goes 
        //the content as children 
        <Layout>
            <h2>Signup</h2>
            <Link href="/signin">
                <a>Signin</a>
            </Link>
            
        </Layout>
    )
}



export default Signup;