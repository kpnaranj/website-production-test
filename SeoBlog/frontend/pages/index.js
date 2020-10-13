//when we create a new index it is easier 
//to create the index directly

//The layout is the folder that all the users 
//see in the website you build

//Layout is our default settings
import Layout from '../components/Layout';
import Link from 'next/link';


const Index =()=> {
    
    return (
        //when we set up layout like this it goes 
        //the content as children 
        <Layout>
            <h2>Home page</h2>
            <Link href="/signup">
                <a>Signup</a>
            </Link>
        </Layout>
    )
}



export default Index;