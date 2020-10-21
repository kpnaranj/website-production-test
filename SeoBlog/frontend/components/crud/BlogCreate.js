import {useState, useEffect} from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic'; //React will run on client 
//We want to import it dinamically 
import {withRouter} from 'next/router';
import {getCookie, isAuth} from '../../actions/auth';
import {getCategories} from '../../actions/category';
import {getTags} from '../../actions/tag';
import {CreateBlog} from '../../actions/blog';
const ReactQuill = dynamic(()=>import('react-quill'),{ssr: false});
import '../../node_modules/react-quill/dist/quill.snow.css';
//the router automatically updates the url 
//from the server and gives it to 
//support 

const BlogCreate = ({router}) =>{
    const blogFromLS = () =>{
        if(typeof window ==='undefined'){
            return false;
        }
        if(localStorage.getItem('blog')){
            return JSON.parse(localStorage.getItem('blog'));
        }
        else{
            return false;
        }
    }
    
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [checked, setChecked] = useState([]);//only for categories
    const [checkedTag, setCheckedTag] = useState([]); //for tags
    
    const [body, setBody] = useState(blogFromLS());
    const [values, setValues] = useState({
        error: '',
        sizeError: '',
        sucess: '',
        formData: '',
        title:'',
        hidePublishButton: false
    })
    
    const {error, sizeError, sucess, formData, title, hidePublishButton} = values;
    const token = getCookie('token');
    
    useEffect(()=>{
        setValues({...values, formData: new FormData()});
        initCategories();
        initTags();
    },[router])
    
    const initCategories =()=>{
        getCategories().then(data=>{
            if(data.error){
                setValues({...values, error: data.error})
            }
            
            else{
                setCategories(data);
            }
        })
    }
    
    const initTags =()=>{
        getTags().then(data=>{
            if(data.error){
                setValues({...values, error: data.error})
            }
            
            else{
                setTags(data);
            }
        })
        
    }
    
    const publishBlog =(e)=>{
        e.preventDefault();
        
        CreateBlog(formData, token).then(data=>{
            if(data.error){
                setValues({...values, error: data.error});
            }
            else{
                setValues({...values, title:'', error:'', success: `A new blog titled ${data.title} was created`});
                setBody('');
                setCategories([]);
                setTags([])
            }
        })
    }
    
    const handleChange =name=>(e)=>{
        const value = name ==='photo' ? e.target.files[0] :e.target.value;
        formData.set(name, value);
        setValues({...values, [name]:value, formData, error:''})
    }
    
    const handleBody =(e)=>{
        setBody(e);
        formData.set('body', e);
        if(typeof window !== 'undefined'){
            localStorage.setItem('blog', JSON.stringify(e))
        }
    }
    
    const handleToggle =(category)=>()=>{
        setValues({...values, error:''});
        
        // return the first index or -1
        const clickedCategory = checked.indexOf(category)
        const all = [...checked]; 
        
        if(clickedCategory===-1){
            all.push(category);
        }
        else{
            all.splice(clickedCategory, 1);
        }
        console.log(all);
        setChecked(all);
        formData.set('tags', all);
    }
    
    const handleTagToggle=(tag)=>()=>{
        setValues({...values, error:''});
        
        // return the first index or -1
        const clickedTag = checkedTag.indexOf(tag)
        const all = [...checkedTag]; 
        
        if(clickedTag===-1){
            all.push(tag);
        }
        else{
            all.splice(clickedTag, 1);
        }
        console.log(all);
        setCheckedTag(all);
        formData.set('categories', all);
    }
    
    
    
    const showCategories = () =>{
        return (
            categories && categories.map((category, index)=>(
                <li key={index} className="list-unstyled">
                    <input onChange={handleToggle(category._id)} type="checkbox" className="mr-2"/>
                    <label className="form-check-label">{category.name}</label>
                </li>
            ))
        )
    }
    
     
    const showTags = () =>{
        return (
            tags && tags.map((tag, index)=>(
                <li key={index} className="list-unstyled">
                    <input onChange={handleTagToggle(tag._id)}  type="checkbox" className="mr-2"/>
                    <label className="form-check-label">{tag.name}</label>
                </li>
            ))
        )
    }
    
    const createBlogForm =() =>{
        return (
        <form onSubmit={publishBlog}>
            <div className="form-group">
                <label className="text-muted"> Title </label>
                <input type="text" className="form-control" value={title} onChange={handleChange('title')}/>
            </div>
            
            <div className="form-group">
                <ReactQuill modules={CreateBlog.modules} formats={CreateBlog.formats} value={body} placeholder="Write something amazing....." onChange={handleBody}/>
            </div>
            
            <div>
                <button type="submit" className="btn btn-primary">Publish Online</button>
            </div>
            
        </form>
        )
        
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-8">
                    {createBlogForm()}
                    <hr/>
                    {JSON.stringify(title)}
                    <hr/>
                    {JSON.stringify(body)}
                    <hr/>
                    {JSON.stringify(categories)}
                    <hr/>
                    {JSON.stringify(tags)}
                </div>
                
                <div className="col-md-4">
                    <div>
                        <div className="form-group pb-2">
                            <h5>Feature image</h5>
                            <hr/>
                            
                            <small className="text-muted">Max size: 1mb</small>
                            <label className="btn btn-outline-info">
                                Upload feature image
                                <input onChange={handleChange('photo')} type="file" accept="image/*" hidden />
                            </label>
                            
                        </div>
                    </div>
                    <div>
                        <h5>Categories</h5>
                        <hr/>
                        <ul style={{maxHeight: '200px', overflowYL: 'scroll'}}>
                            {showCategories()}
                        </ul>
                        
                    </div>
                    <div>
                        <h5>Tags</h5>
                        <hr/>
                        <ul style={{maxHeight: '200px', overflowYL: 'scroll'}}>
                           {showTags()} 
                        </ul>
                        
                    </div>
                </div>
            </div>
        </div>
        
    )  
}

CreateBlog.modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image', 'video'],
        ['clean'],
        ['code-block']
    ]
};
 
CreateBlog.formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'video',
    'code-block'
];

export default withRouter(BlogCreate) ;