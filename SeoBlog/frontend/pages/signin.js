import Layout from '../components/Layout';
import Link from 'next/link';

const Signin =()=> {
    
    return (
        //when we set up layout like this it goes 
        //the content as children 
        <Layout>
            <h2>Signin</h2>
            <Link href="/">
                <a>Home</a>
            </Link>
        </Layout>
    )
}



export default Signin;