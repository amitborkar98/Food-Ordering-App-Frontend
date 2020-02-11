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
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

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

const TabContainer = function(props){
    return(
        <Typography component='div' style={{padding: 0 ,textAlign: 'center'}}>
            {props.children}    
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired
}

class Header extends Component{

    constructor(){
        super();
        this.state = {
            button:"Login",
            modalIsOpen: false,
            value: 0,
            firstnameRequired: "dispNone",
            firstname: "",
            lastname: "",
            email: "",
            emailRequired: "dispNone",
            password: "",
            passwordRequired: "dispNone",
            contact: "",
            contactRequired: "dispNone",
            login_contact: "",
            loginContactRequired: "dispNone",
            login_passowrd: "",
            loginPasswordRequired: "dispNone",
        }
    }

    openModalHandler = () => {
        this.setState({
            modalIsOpen: true,
            value: 0,
            firstnameRequired: "dispNone",
            firstname: "",
            lastname: "",
            email: "",
            emailRequired: "dispNone",
            password: "",
            passwordRequired: "dispNone",
            contact: "",
            contactRequired: "dispNone",
            login_contact: "",
            loginContactRequired: "dispNone",
            login_passowrd: "",
            loginPasswordRequired: "dispNone",
        });
    }

    closeModalHandler = () => {
        this.setState({ modalIsOpen: false });
    }
    
    tabChangeHandler = (event, value) =>{
        this.setState({value});
    }

    inputFirstNameChangeHandler = (e) => {
        this.setState({ firstname: e.target.value });
    }

    inputLastNameChangeHandler = (e) => {
        this.setState({ lastname: e.target.value });
    }

    inputEmailChangeHandler = (e) => {
        this.setState({ email: e.target.value });
    }

    inputPasswordChangeHandler = (e) => {
        this.setState({ password: e.target.value });
    }

    inputContactChangeHandler = (e) => {
        this.setState({ contact: e.target.value });
    }

    inputLoginContactChangeHandler = (e) => {
        this.setState({ login_contact: e.target.value });
    }

    inputLoginPasswordChangeHandler = (e) => {
        this.setState({ login_passowrd: e.target.value });
    }

    loginClickHandler = () => {
        this.state.login_contact === "" ? this.setState({ loginContactRequired: "dispBlock" }) : this.setState({ loginContactRequired: "dispNone" });
        this.state.login_passowrd === "" ? this.setState({ loginPasswordRequired: "dispBlock" }) : this.setState({ loginPasswordRequired: "dispNone" });
    }

    signupClickHandler = () => {
        this.state.firstname === "" ? this.setState({ firstnameRequired: "dispBlock" }) : this.setState({ firstnameRequired: "dispNone" });
        this.state.email === "" ? this.setState({ emailRequired: "dispBlock" }) : this.setState({ emailRequired: "dispNone" });
        this.state.registerPassword === "" ? this.setState({ passwordRequired: "dispBlock" }) : this.setState({ passwordRequired: "dispNone" });
        this.state.contact === "" ? this.setState({ contactRequired: "dispBlock" }) : this.setState({ contactRequired: "dispNone" });
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
                        <Tab label="SIGNUP" />
                    </Tabs>
                    {this.state.value === 0 &&
                        <TabContainer>
                            <br />
                            <FormControl required>
                                <InputLabel htmlFor="loginContact">Contact No.</InputLabel>
                                <Input id="loginContact" type="text" login_contact={this.state.login_contact} onChange={this.inputLoginContactChangeHandler} />
                                <FormHelperText className={this.state.loginContactRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="loginPassword">Password</InputLabel>
                                <Input id="loginPassword" type="password" login_password={this.state.login_password} onChange={this.inputLoginPasswordChangeHandler} />
                                <FormHelperText className={this.state.loginPasswordRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <Button variant="contained" color="primary" onClick={this.loginClickHandler}>LOGIN</Button>
                        </TabContainer>
                    }
                    {this.state.value === 1 &&
                        <TabContainer>
                            <br />
                            <FormControl required>
                                <InputLabel htmlFor="firstname">First Name</InputLabel>
                                <Input id="firstname" type="text" firstname={this.state.firstname} onChange={this.inputFirstNameChangeHandler} />
                                <FormHelperText className={this.state.firstnameRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl >
                                <InputLabel htmlFor="lastname">Last Name</InputLabel>
                                <Input id="lastname" type="text" lastname={this.state.lastname} onChange={this.inputLastnameChangeHandler} />
                            </FormControl>
                            <br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <Input id="email" type="text" email={this.state.email} onChange={this.inputEmailChangeHandler} />
                                <FormHelperText className={this.state.emailRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input id="password" type="password" password={this.state.password} onChange={this.inputPasswordChangeHandler} />
                                <FormHelperText className={this.state.passwordRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="contact_no">Contact No.</InputLabel>
                                <Input id="contact" type="text" contact={this.state.contact} onChange={this.inputContactChangeHandler} />
                                <FormHelperText className={this.state.contactRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <Button variant="contained" color="primary" onClick={this.signupClickHandler}>SIGNUP</Button>
                        </TabContainer>
                    }
                </Modal>
            </div>
        );
    }
}

export default withStyles(styles)(Header);