import React ,{Component} from 'react';
import Header from '../../common/header/Header';
import './Details.css';
import Typography from '@material-ui/core/Typography';
import 'font-awesome/css/font-awesome.min.css';
import Divider from '@material-ui/core/Divider';
import AddIcon from '@material-ui/icons/Add';
import Snackbar from '@material-ui/core/Snackbar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import RemoveIcon from '@material-ui/icons/Remove';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = {
    root: {
        cursor:"pointer",
        color:"grey",
        padding: "4px",
        '&:hover':{
            backgroundColor: "lightgrey",
            borderRadius: "25px"
        }
      },
      add:{
          cursor:"pointer",
        '&:hover':{
            backgroundColor: "yellow",
            borderRadius: "25px",
        }
      },  
      minus:{
        '&:hover':{
            backgroundColor: "yellow",
            borderRadius: "25px",
         }
    }
  };

class Details extends Component{
 
    constructor(){
        super();
        this.state = {
            restaurant: [],
            locality: "",
            category_names:[],
            categories: [],
            setOpenAdd: false,
            setOpenCheckout: false,
            setOpenLogin: false,
            setOpenItemQuantity: false,
            setOpenDecreaseItemQuantity: false,
            total_amount: 0,
            cart_item_qauntity: 0,
            cart_items: [],
        }
    }

    UNSAFE_componentWillMount(){
        let data1 = null;
        let xhr1 = new XMLHttpRequest();
        let that = this;
        let categories_list = [];
        let quantity_list=[]
        xhr1.addEventListener("readystatechange", function () {
            if(this.readyState === 4){         
                quantity_list = JSON.parse(this.responseText).categories;
                for(let i in quantity_list){
                   let new_list = quantity_list[i]
                   for(let j in new_list){
                       let new_list2 = new_list[j]
                       if(typeof(new_list2) === "object"){
                          for(let k in new_list2){
                              new_list2[k].quantity = 0;
                          }
                       }
                   }
                }
                let categories_new= JSON.parse(this.responseText).categories
                for(let i in categories_new){
                    let category = categories_new[i].category_name;
                    categories_list.push(category);
                }
                that.setState({
                    category_names: categories_list,
                    categories : quantity_list,
                    restaurant: JSON.parse(this.responseText),
                    locality : JSON.parse(this.responseText).address.locality,
                });
            }
        });
        xhr1.open("GET", "http://localhost:8080/api/api/restaurant/"+ this.props.match.params.id);
        xhr1.send(data1);    
    }
 
    addClickHandler = (itemId, categoryId) => {
        let categoriesList = this.state.categories;
        categoriesList.forEach(function(cat){
            if(cat.id === categoryId){
                cat.item_list.forEach(function(item){
                    if(item.id === itemId)
                        if(this.state.cart_items.includes(item)){
                            item.quantity = item.quantity + 1;
                            let total_list = this.state.cart_items;
                            let total_price = 0;
                            for(let i in total_list){
                                total_price = total_price + (total_list[i].price * total_list[i].quantity);
                            }
                            this.setState({ 
                                setOpenItemQuantity: true,
                                setOpenAdd: false,
                                setOpenCheckout: false,
                                setOpenDecreaseItemQuantity: false,
                                setOpenLogin: false,
                                cart_item_qauntity: this.state.cart_item_qauntity + 1,
                                total_amount: total_price,
                            });
                        }
                        else{
                            item.quantity = item.quantity + 1;
                            this.state.cart_items.push(item);
                            let total_list = this.state.cart_items;
                            let total_price = 0;
                            for(let i in total_list){
                                total_price = total_price + (total_list[i].price * total_list[i].quantity);
                            }
                            this.setState({ 
                                setOpenItemQuantity: false,
                                setOpenAdd: true,
                                setOpenCheckout: false,
                                setOpenDecreaseItemQuantity: false,
                                setOpenLogin: false,
                                cart_item_qauntity: this.state.cart_item_qauntity + 1,
                                total_amount: total_price,
                            });
                        }
                }, this);
            }
        }, this);
    }
 
    increaseHandler = (itemId) => {
        let item_list = this.state.cart_items;
        item_list.forEach(function(item){
            if(item.id === itemId){
                item.quantity = item.quantity + 1;
            }
            let total_list = this.state.cart_items;
            let total_price = 0;
            for(let i in total_list){
                total_price = total_price + (total_list[i].price * total_list[i].quantity);
            }
           this.setState({
                cart_items: item_list,
                total_amount: total_price,
                cart_item_qauntity: this.state.cart_item_qauntity + 1,
                setOpenItemQuantity: true,
                setOpenAdd: false,
                setOpenCheckout: false,
                setOpenDecreaseItemQuantity: false,
                setOpenLogin: false,
           })
        },this)
    }

    decreaseHandler = (itemId) => {
        let item_list = this.state.cart_items;
        item_list.forEach(function(item){
            if(item.id === itemId){
                if(item.quantity === 1){
                    item.quantity = item.quantity - 1;
                    let index = this.state.cart_items.indexOf(item);
                    this.state.cart_items.splice(index, 1);
                }else{
                    item.quantity = item.quantity - 1;
                }
           }
            let total_list = this.state.cart_items;
            let total_price = 0;
            for(let i in total_list){
                total_price = total_price + (total_list[i].price * total_list[i].quantity);
            }
           this.setState({
                cart_items: item_list,
                total_amount: total_price,
                cart_item_qauntity: this.state.cart_item_qauntity - 1,
                setOpenItemQuantity: false,
                setOpenAdd: false,
                setOpenCheckout: false,
                setOpenDecreaseItemQuantity: true,
                setOpenLogin: false,
           })
        },this)
        if(this.state.cart_items.length === 0){
            this.setState({ cart_item_qauntity : 0})
        }
    }

    snanckCloseHandler = () =>{
        this.setState({
            setOpenItemQuantity: false,
            setOpenAdd: false,
            setOpenCheckout: false,
            setOpenDecreaseItemQuantity: false,
            setOpenLogin: false,
       })
    }

    checkoutHandler = () => {
        if(this.state.cart_items.length === 0){
            this.setState({
                setOpenCheckout: true,
                setOpenAdd: false,
                setOpenItemQuantity: false,
                setOpenDecreaseItemQuantity: false,
                setOpenLogin: false
            });
        }
        else if(sessionStorage.getItem("access-token") === null && this.state.cart_items.length !== 0){
            this.setState({
                setOpenLogin: true,
                setOpenAdd: false,
                setOpenItemQuantity: false,
                setOpenDecreaseItemQuantity: false,
                setOpenCheckout: false,
            });
        }
        else{
            this.props.history.push({
                pathname: '/checkout',
                summary: this.state
            })
        }
    }

    render(){
        const { classes } = this.props;
        return(
            <div>
                <Header history={this.props.history}/>
                <div className="details-header">
                    <img src={this.state.restaurant.photo_URL} height="200px" width="300px" alt="name"/>  
                    <div className="header-contents">
                        <Typography variant="h4" component="h1" style={{marginBottom: "10px"}}>
                            <span style={{fontWeight:"bold"}}>{this.state.restaurant.restaurant_name}</span>
                        </Typography>
                        <Typography variant="h6" component="h1" style={{marginBottom: "10px"}}>
                            <span>{this.state.locality.toUpperCase()}</span>
                        </Typography>
                        <Typography variant="body1" component="p" style={{marginBottom: "10px"}}>
                            {this.state.category_names.join(', ')}
                        </Typography>
                        <div className="footers">
                            <div className="average-ratings">
                                <div>
                                    <i style={{marginRight:"5px"}} className="fa fa-star" aria-hidden="true"></i>
                                    {this.state.restaurant.customer_rating}
                                </div>
                                <span style={{color:"darkgrey", fontSize:"small"}}>AVERAGE RATINGS BY</span>
                                <div>
                                    <span style={{color:"darkgrey", fontSize:"small", fontWeight:"bolder"}}>{this.state.restaurant.number_customers_rated}</span>
                                    <span style={{color:"darkgrey", fontSize:"small", marginLeft: "5px"}}>CUSTOMERS</span>
                                </div>
                            </div>
                            <div className="average-cost">
                                <div>
                                    <i style={{marginRight:"5px"}} className="fa fa-inr" aria-hidden="true"></i>
                                    {this.state.restaurant.average_price}
                                </div>
                                <span style={{color:"darkgrey", fontSize:"small"}}>AVERAGE COST FOR</span>
                                <span style={{color:"darkgrey", fontSize:"small"}}>TWO PEOPLE</span>
                            </div>
                        </div>
                    </div>                  
                </div>

                <div className="main-content">
                    <div className="item-container">
                        {this.state.categories.map(cat => (
                        <div className="items" key={"cats" + cat.id}>
                            <Typography variant="h6" component="h1">
                                <span style={{color: "darkgrey"}}>{cat.category_name}</span>
                            </Typography>
                            <Divider variant="fullWidth" />
                            {cat.item_list.map(itm => (
                            <div className="menu-item" key={"menu-item" + itm.id}>
                                {itm.item_type === "VEG" ? 
                                <i style={{color:"green", margin:"4px", width:"5%"}} className="fa fa-circle" aria-hidden="true"></i>
                                :
                                <i style={{color:"red", margin:"4px", width:"5%"}} className="fa fa-circle" aria-hidden="true"></i>
                                }
                                <Typography variant="body1" component="p" style={{width:"70%"}}>
                                    <span>{itm.item_name}</span>
                                </Typography>
                                <div style={{width:"20%"}}>
                                    <i style={{margin:"4px"}} className="fa fa-inr" aria-hidden="true"></i>
                                    <span>{itm.price}.00</span>
                                </div>
                                <AddIcon className={classes.root} onClick={() => this.addClickHandler(itm.id, cat.id)}/>
                            </div>
                            ))}
                        </div>
                        ))}
                    </div>

                    <Card className="checkout">
                        <CardContent>
                            <div className="cart-container">
                                <div className="cart-header">
                                    <Badge badgeContent={this.state.cart_item_qauntity} color="primary" showZero ={true} overlap="circle">
                                        <ShoppingCartIcon style={{marginTop:"5px"}}/>
                                    </Badge>
                                    <Typography variant="h6" component="h1">
                                        <span style={{marginLeft:"30px", fontWeight:"bold"}}>My Cart</span>
                                    </Typography>
                                </div>
                                <br/>
                                <div className="cart-items-container">
                                {this.state.cart_items.map(itm => (
                                    <div className="cart-items" key={"cart-item" + itm.id}>
                                        {itm.item_type === "VEG" ? 
                                        <i style={{color:"green", margin:"4px", width:"8%"}} className="fa fa-stop-circle-o" aria-hidden="true"></i>
                                        :
                                        <i style={{color:"red", margin:"4px",  width:"8%"}} className="fa fa-stop-circle-o" aria-hidden="true"></i>
                                        }
                                        <Typography variant="body1" component="p" style={{width:"60%", marginBottom:"5px"}}>
                                            <span style={{color:"darkgrey"}}>{itm.item_name}</span>
                                        </Typography>
                                        <div style={{width:"25%", display:"flex", flexDirection:"row"}}>
                                            <RemoveIcon className={classes.minus} fontSize="small" style={{marginRight:"8px", cursor:"pointer"}} onClick={()=>this.decreaseHandler(itm.id)} />
                                            <span style={{marginRight:"8px"}}>{itm.quantity}</span>
                                            <AddIcon fontSize="small" className={classes.add} onClick={()=>this.increaseHandler(itm.id)} />
                                        </div>    
                                        <div style={{width:"15%"}}>
                                            <i style={{margin:"4px", color:"darkgrey"}} className="fa fa-inr" aria-hidden="true"></i>
                                            <span style={{color:"darkgrey"}}>{itm.price * itm.quantity}.00</span>
                                        </div>
                                    </div>
                                ))}
                                </div>
                                <br/>
                                <div className="cart-total-amount">
                                    <Typography variant="body1" component="p" style={{width:"87%"}}>
                                        <span style={{fontWeight:"bold"}}>TOTAL AMOUNT</span>
                                    </Typography>
                                    <div>
                                        <span><i style={{margin:"4px"}} className="fa fa-inr" aria-hidden="true"></i></span>
                                        <span style={{fontWeight:"bold"}}>{this.state.total_amount}.00</span>
                                    </div>
                                </div>
                                <br/>
                                <Button variant="contained" color="primary" onClick={this.checkoutHandler}>
                                    CHECKOUT
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                
                </div>

                <Snackbar
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                    }}
                    open={this.state.setOpenAdd}
                    autoHideDuration={1}
                    message="Item added to cart!"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            onClick={this.snanckCloseHandler}
                        >
                        <CloseIcon />
                        </IconButton>
                      }
                />
                 <Snackbar
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                    }}
                    open={this.state.setOpenCheckout}
                    autoHideDuration={1}
                    message="Please add an item to your cart!"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            onClick={this.snanckCloseHandler}
                        >
                        <CloseIcon />
                        </IconButton>
                      }
                />
                <Snackbar
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                    }}
                    open={this.state.setOpenLogin}
                    autoHideDuration={1}
                    message="Please login first!"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            onClick={this.snanckCloseHandler}
                        >
                        <CloseIcon />
                        </IconButton>
                      }
                />
                <Snackbar
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                    }}
                    open={this.state.setOpenItemQuantity}
                    autoHideDuration={1}
                    message="Item quantity increased by 1!"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            onClick={this.snanckCloseHandler}
                        >
                        <CloseIcon />
                        </IconButton>
                      }
                />
                <Snackbar
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                    }}
                    open={this.state.setOpenDecreaseItemQuantity}
                    autoHideDuration={1}
                    message="Item decreased by 1!"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            onClick={this.snanckCloseHandler}
                        >
                        <CloseIcon />
                        </IconButton>
                      }
                />
            </div>
        );
    }
}
export default withStyles(styles)(Details);