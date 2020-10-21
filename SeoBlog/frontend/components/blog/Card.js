import React from 'react';
import Link from 'next/link';
import renderHTML from 'react-render-html';
import moment from 'moment';
import {API} from '../../config';

const Card = ({blog})=>{
    
    const ShowBlogCategories = blog=>
        blog.categories.map((cat, index)=>{
            return(
            <Link key={index} href={`/categories/${cat.slug}`}>
                <a className="btn btn-primary mr-1 ml-1 mt-3 mb-2">{cat.name}</a>
            </Link>
            )
        })
    
    
    const ShowBlogTags = blog=>
        blog.tags.map((t, index)=>{
            return(
            <Link key={index} href={`/tags/${t.slug}`}>
                <a className="btn btn-outline-primary mr-1 ml-1 mt-3 mb-2">{t.name}</a>
            </Link>
            )
        })
        
    return (
        <div className="lead pb-4">
        <header>
            <Link href={`/blogs/${blog.slug}`}>
                <a><h2 className="pt-3 pb-3 font-weight-bold">{blog.title}</h2></a>
            </Link>
        </header>
        
        <section>
            <p className="mark ml-1 pt-2 pb-2">
                Written by {blog.postedBy.name} | Published {moment(blog.updatedAt).fromNow()}
            </p>
        </section>
        
        <section>
           {ShowBlogCategories(blog)}
           {ShowBlogTags(blog)}
           {/**{JSON.stringify(blog.tags)}*/} 
           <hr/>
        </section>
        
        <div className="row">
            <div className="col-md-4">
                <section>
                    <img className="img img-fluid " style={{maxHeight: '200px', width:'auto'}} src={`${API}/blog/photo/${blog.slug}`} alt={ blog.title}/>
                </section>
            </div>
            <div className="col-md-8">
                <section>
                    <div className="pb-3">
                        {renderHTML(blog.excerpt)}
                    </div>
                   
                    <Link href={`/blogs/${blog.slug}`}>
                        <a className="btn btn-primary pt-2">Read more </a>
                    </Link>
                </section>
            </div>
        </div>
    
    </div>
    )                    
}

export default Card;
