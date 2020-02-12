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
import Snackbar from '@material-ui/core/Snackbar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';

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

const StyledMenu = withStyles({
    paper: {
      border: '4px',
      backgroundColor:'white',
    },
  })(props => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      {...props}
    />
  ));

  const StyledMenuItem = withStyles(theme => ({
    root: {
        width:'100px'
    },
  }))(MenuItem);

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
            button: "Login",
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
            setOpen: false,
            emailError: "dispNone",
            contactError: "dispNone",
            passwordError: "dispNone",
            signupError: "dispNone",
            loginContactError: "dispNone",
            loginPasswordError: "dispNone",
            loginError: "dispNone",
            loginSetOpen: false,
            type: null,
        }
    }

    componentDidMount(){
        if(sessionStorage.getItem('name') !== null){
            this.setState({button: sessionStorage.getItem('name') });
        }
    }

    openModalHandler = () => {
        if(this.state.button === "Login"){
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
                emailError: "dispNone",
                contactError: "dispNone",
                passwordError: "dispNone",
                signupError: "dispNone",
                loginContactError: "dispNone",
                loginPasswordError: "dispNone",
                loginError: "dispNone",
            });
        }
    }

    closeModalHandler = () => {
        this.setState({
            modalIsOpen: false,
            setOpen: false
         });
    }

    openMenuHandler = (e) => {
        if(this.state.button !== "Login"){
            this.setState({ type: e.currentTarget });
        }
    }

    logoutHandler = () => {
        sessionStorage.clear();
        this.setState({ 
            button: "Login",
            type: null,
        });
    }

    profileHandler = () => {
        this.props.history.push('/profile');
    }

    closeMenuHandler = () => {
        this.setState({ type: null });
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
    
        this.setState({ loginError: "dispNone", loginContactError: "dispNone", loginPasswordError: "dispNone" })
        if(this.state.login_contact !== "" && this.state.login_passowrd !== ""){
            let dataLogin = null;
            let xhrLogin = new XMLHttpRequest();
            let that = this;
            xhrLogin.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    let code = JSON.parse(this.responseText).code;
                    if(!that.state.login_contact.match(/^[0-9]+$/) || that.state.login_contact.length !== 10){
                        that.setState({ loginContactError: "dispBlock"});
                    }
                    else if(code === "ATH-002"){
                        that.setState({ loginPasswordError: "dispBlock"})
                    }
                    else if(code === "ATH-001"){
                        that.setState({ loginError: "dispBlock"})
                    }
                    else{
                        sessionStorage.setItem("name", JSON.parse(this.responseText).first_name);
                        sessionStorage.setItem("access-token", xhrLogin.getResponseHeader("access-token"));
                        that.setState({
                            modalIsOpen: false,
                            loginSetOpen: true,
                            button: JSON.parse(this.responseText).first_name,
                        });    
                    }
                }
            });
            xhrLogin.open("POST", "http://localhost:8080/api/customer/login");
            xhrLogin.setRequestHeader("Authorization", "Basic " + window.btoa(this.state.login_contact + ":" + this.state.login_passowrd));
            xhrLogin.setRequestHeader("Content-Type", "application/json");
            xhrLogin.setRequestHeader("Cache-Control", "no-cache");
            xhrLogin.send(dataLogin);
        }
    }

    signupClickHandler = () => {
        this.state.firstname === "" ? this.setState({ firstnameRequired: "dispBlock" }) : this.setState({ firstnameRequired: "dispNone" });
        this.state.email === "" ? this.setState({ emailRequired: "dispBlock" }) : this.setState({ emailRequired: "dispNone" });
        this.state.password === "" ? this.setState({ passwordRequired: "dispBlock" }) : this.setState({ passwordRequired: "dispNone" });
        this.state.contact === "" ? this.setState({ contactRequired: "dispBlock" }) : this.setState({ contactRequired: "dispNone" });
        this.setState({ emailError: "dispNone" , passwordError: "dispNone", contactError: "dispNone", signupError: "dispNone"});
       
        if(this.state.firstname !== "" && this.state.email !== "" && this.state.contact !== "" && this.state.password !== ""){
            let dataSignup = JSON.stringify({
                "contact_number": this.state.contact,
                "email_address": this.state.email,
                "first_name": this.state.firstname,
                "last_name": this.state.lastname,
                "password": this.state.password
            })
            let xhrSignup = new XMLHttpRequest();
            let that = this;
            xhrSignup.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    let code = JSON.parse(this.responseText).code;
                    if(code === "SGR-002"){
                        that.setState({ emailError: "dispBlock"});
                    }
                    if(code === "SGR-004"){
                        that.setState({ passwordError: "dispBlock"});
                    }
                    if(code === "SGR-003"){
                        that.setState({ contactError: "dispBlock"});
                    }
                    if(code === "SGR-001"){
                        that.setState({ signupError: "dispBlock"});
                    }
                    if(JSON.parse(this.responseText).status === "CUSTOMER SUCCESSFULLY REGISTERED"){
                        that.setState({
                            setOpen: true,
                            value: 0
                        });
                    }
                }
            });
            xhrSignup.open("POST", "http://localhost:8080/api/customer/signup");
            xhrSignup.setRequestHeader("Content-Type", "application/json");
            xhrSignup.setRequestHeader("Cache-Control", "no-cache");
            xhrSignup.send(dataSignup);
        }
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
                            <AccountCircleIcon style={{marginRight:"5px"}} onClick={this.openMenuHandler}/> {this.state.button}
                        </Button> 
                    </div>
                    <StyledMenu
                        id="customized-menu"
                        anchorEl={this.state.type}
                        keepMounted
                        open={Boolean(this.state.type)}
                        onClose={this.closeMenuHandler}
                        >
                        <StyledMenuItem>
                            <ListItemText primary="My Profile" onClick={this.profileHandler}/> 
                        </StyledMenuItem>
                        <StyledMenuItem>
                            <ListItemText primary="Logout" onClick={this.logoutHandler} />
                        </StyledMenuItem>
                    </StyledMenu>
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
                            <div className="login-tab">
                            <br />
                            <FormControl required>
                                <InputLabel htmlFor="loginContact">Contact No.</InputLabel>
                                <Input id="loginContact" type="text" login_contact={this.state.login_contact} onChange={this.inputLoginContactChangeHandler} />
                                <FormHelperText className={this.state.loginContactRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                                <FormHelperText className={this.state.loginContactError}>
                                    <span className="red">Invalid Contact</span>
                                </FormHelperText>
                            </FormControl>
                            <br />
                            <FormControl required>
                                <InputLabel htmlFor="loginPassword">Password</InputLabel>
                                <Input id="loginPassword" type="password" login_password={this.state.login_password} onChange={this.inputLoginPasswordChangeHandler} />
                                <FormHelperText className={this.state.loginPasswordRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br/>
                            <FormHelperText className={this.state.loginError}>
                                    <span className="red">This contact number has not been registered! </span>
                            </FormHelperText>
                            <FormHelperText className={this.state.loginPasswordError}>
                                    <span className="red">Invalid Credentials</span>
                            </FormHelperText>
                            </div>
                            <br />
                            <Button variant="contained" color="primary" onClick={this.loginClickHandler}>LOGIN</Button>
                        </TabContainer>
                    }
                    {this.state.value === 1 &&
                        <TabContainer>
                            <div className="signup-tab">
                            <br />
                            <FormControl required>
                                <InputLabel htmlFor="firstname">First Name</InputLabel>
                                <Input id="firstname" type="text" firstname={this.state.firstname} onChange={this.inputFirstNameChangeHandler} />
                                <FormHelperText className={this.state.firstnameRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br />
                            <FormControl >
                                <InputLabel htmlFor="lastname">Last Name</InputLabel>
                                <Input id="lastname" type="text" lastname={this.state.lastname} onChange={this.inputLastNameChangeHandler} />
                            </FormControl>
                            <br />
                            <FormControl required>
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <Input id="email" type="text" email={this.state.email} onChange={this.inputEmailChangeHandler} />
                                <FormHelperText className={this.state.emailRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                                <FormHelperText className={this.state.emailError}>
                                    <span className="red">Invalid Email</span>
                                </FormHelperText>
                            </FormControl>
                            <br />
                            <FormControl required>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input id="password" type="password" password={this.state.password} onChange={this.inputPasswordChangeHandler} />
                                <FormHelperText className={this.state.passwordRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                                <FormHelperText className={this.state.passwordError}>
                                    <span className="red">Password must contain at least one capital letter, one small letter, one number, and one special character</span>
                                </FormHelperText>
                            </FormControl>
                            <br />
                            <FormControl required>
                                <InputLabel htmlFor="contact_no">Contact No.</InputLabel>
                                <Input id="contact" type="text" contact={this.state.contact} onChange={this.inputContactChangeHandler} />
                                <FormHelperText className={this.state.contactRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                                <FormHelperText className={this.state.contactError}>
                                    <span className="red">Contact No. must contain only numbers and must be 10 digits long</span>
                                </FormHelperText>
                            </FormControl>
                            <br/>
                            <FormHelperText className={this.state.signupError}>
                                <span className="red">This contact number is already registered! Try other contact number.</span>
                            </FormHelperText>
                            </div>
                            <br /><br />
                            <Button variant="contained" color="primary" onClick={this.signupClickHandler}>SIGNUP</Button>
                        </TabContainer>
                    }
                </Modal>
                <Snackbar
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                    }}
                    open={this.state.setOpen}
                    autoHideDuration={6000}
                    message="Registered successfully! Please login now!"
                />
                <Snackbar
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                    }}
                    open={this.state.loginSetOpen}
                    autoHideDuration={1}
                    message="Logged in successfully!"
                />
            </div>
        );
    }
}

export default withStyles(styles)(Header);