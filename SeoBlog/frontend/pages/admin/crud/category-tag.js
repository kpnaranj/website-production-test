import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin';
import Category from '../../../components/crud/Category';
import Link from 'next/link';


const CategoryTag =()=> {
    
    return (
        <Layout>
            <Admin>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 pt-5 pb-5"> <h2>Manage Categories and tags</h2> </div>
                        <div className="col-md-4">
                            <Category/>
                        </div>
                        <div className="col-md-8">tag</div>
                    </div>
                </div>
                
             
            </Admin>
        </Layout>
    )
}



export default CategoryTag;