import React ,{Component} from 'react';
import './Header.css';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Modal from 'react-modal';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

const styles = theme => ({
    search: {
      position: 'relative',
      borderRadius: '4px',
      width: '300px',
      float: 'left',
      marginTop: '13px',
      marginRight: '300px',
    },
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
    },
    inputRoot: {
      color: 'white',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      width:'250px'
    },
});


class Header extends Component{

    constructor(){
        super();
        this.state = {
            button:"Login",
            modalIsOpen: false,
            value: 0,
        }
    }

    openModalHandler = () => {
        this.setState({
            modalIsOpen: true,
         });
    }

    closeModalHandler = () => {
        this.setState({ modalIsOpen: false });
    }
    
    tabChangeHandler = (event, value) =>{
        this.setState({value});
    }
    
    render(){
        const { classes } = this.props;
        return(
            <div>
               <header className="app-header">
                    <div className="logo">
                        <FastfoodIcon fontSize="large" htmlColor="white"/> 
                    </div>
                    <div className="search-box">
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <Input disableUnderline={false}
                                placeholder="Search by Restaurant Name"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={this.inputChangeHandler}
                            />
                        </div>
                    </div>
                    <div className="login-button">
                        <Button variant="contained" color="default" onClick={this.openModalHandler}>
                            <AccountCircleIcon style={{marginRight:"10px"}} /> {this.state.button}
                        </Button> 
                    </div>
               </header>
               <Modal 
                    ariaHideApp={false} 
                    isOpen={this.state.modalIsOpen} 
                    contentLabel="Login" 
                    onRequestClose={this.closeModalHandler}
                    style={customStyles} >
                    <Tabs className="tabs" value={this.state.value} onChange={this.tabChangeHandler}>
                        <Tab label="LOGIN" />
                        <Tab label="SIGNUP"/>
                    </Tabs>
                </Modal>
            </div>
        );
    }
}

export default withStyles(styles)(Header);