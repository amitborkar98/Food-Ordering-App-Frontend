import React ,{Component} from 'react';
import './Header.css';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

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
                        <Button variant="contained" color="default" >
                            <AccountCircleIcon style={{marginRight:"10px"}} /> Login
                        </Button> 
                    </div>
               </header>
            </div>
        );
    }
}
export default withStyles(styles)(Header);