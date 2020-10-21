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
            <div>
                <p>
                
                    What is Lorem Ipsum?
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    
                    Why do we use it?
                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                
                </p>
            
            </div>
        </Layout>
    )
}



export default Index;