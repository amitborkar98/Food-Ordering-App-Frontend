import React ,{Component} from 'react';
import './Header.css';
import FastfoodIcon from '@material-ui/icons/Fastfood';

class Header extends Component{
    render(){
        return(
            <div>
               <header className="app-header">
                   <div className="logo">
                        <FastfoodIcon fontSize="large" htmlColor="white"/> 
                    </div>
               </header>
            </div>
        );
    }
}
export default Header;