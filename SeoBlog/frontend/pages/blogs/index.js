import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import {useState} from 'react';
import {listBlogsWithCategoriesAndTags} from '../../actions/blog';
import Card from '../../components/blog/Card';

const Blogs =({blogs})=>{
    const showAllBlogs =()=>{
        return blogs.map((blog, index)=>{
            return (
                <article key={index}>
                    <Card blog={blog}/>
                    <hr/>
                </article>
            )
            
        })    
    
    }

    return(
            <Layout>
                <main>
                    <div className="container-fluid">
                        <header>
                            <div className="col-md-12 pt-3">
                                <h1 className="display-4 font-weight-bold text-center">Programming Blogs and Tutor</h1>
                            </div>
                            <section>
                                <p>Show categories and tags</p>
                            </section>
                        </header>
                    </div>
                    
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12"> {showAllBlogs()}</div>
                        </div>
                    </div>  
                    
                
                </main>
            
            </Layout>
    )
};

Blogs.getInitialProps=()=>{
    let skip = 0;
    let limit = 2;
    return listBlogsWithCategoriesAndTags(skip, limit).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            return {
                blogs: data.blogs,
                categories: data.categories,
                tags: data.tags,
                size: data.size,
            };
        }
    });
}


export default Blogs; //get initial props