//when you pass a children don't forget
//to use the props
import Header from './Header';

const Layout = ({children}) =>{
    return (
        <React.Fragment>
            <Header/>
            {children}
        </React.Fragment>
    );
};

export default Layout;