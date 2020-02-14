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

class Details extends Component{
 
    constructor(){
        super();
        this.state = {
            restaurant: [],
            locality: "",
            category_names:[],
            categories: [],
            setOpen: false,
            total_amount: 0.00,
        }
    }

    UNSAFE_componentWillMount(){
        let data1 = null;
        let xhr1 = new XMLHttpRequest();
        let that = this;
        let categories_list = [];
        xhr1.addEventListener("readystatechange", function () {
            if(this.readyState === 4){     
                that.setState({
                    restaurant: JSON.parse(this.responseText),
                    locality : JSON.parse(this.responseText).address.locality,
                    categories: JSON.parse(this.responseText).categories
                });      
                let categories_new= JSON.parse(this.responseText).categories
                for(let i in categories_new){
                    let category = categories_new[i].category_name;
                    categories_list.push(category);
                }
                that.setState({category_names: categories_list});
            }
        });
        xhr1.open("GET", "http://localhost:8080/api/api/restaurant/"+ this.props.match.params.id);
        xhr1.send(data1);    
    }
 
    addClickHandler = () => {
        this.setState({ setOpen: true});
    }
    
    render(){
        return(
            <div>
                <Header/>
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
                        <div className="items" key={"cat" + cat.id}>
                            <Typography variant="h6" component="h1">
                                <span style={{color: "darkgrey"}}>{cat.category_name}</span>
                            </Typography>
                            <Divider variant="fullWidth" />
                            {cat.item_list.map(itm => (
                            <div className="menu-item" key={"items" + itm.id}>
                                {itm.item_type === "VEG" ? 
                                <i style={{color:"green", margin:"4px", width:"5%"}} className="fa fa-circle" aria-hidden="true"></i>
                                :
                                <i style={{color:"red", margin:"4px",  width:"5%"}} className="fa fa-circle" aria-hidden="true"></i>
                                }
                                <Typography variant="body1" component="p" style={{width:"70%"}}>
                                    <span>{itm.item_name}</span>
                                </Typography>
                                <div style={{width:"20%"}}>
                                    <i style={{margin:"4px"}} className="fa fa-inr" aria-hidden="true"></i>
                                    <span>{itm.price}.00</span>
                                </div>
                                <AddIcon style={{cursor:"pointer"}} onClick={this.addClickHandler}/>
                            </div>
                            ))}
                        </div>
                        ))}
                    </div>

                    <Card className="checkout">
                        <CardContent>
                            <div className="cart-container">
                                <div className="cart-header">
                                    <Badge badgeContent={2} color="primary">
                                        <ShoppingCartIcon style={{marginTop:"5px"}}/>
                                    </Badge>
                                    <Typography variant="h6" component="h1">
                                        <span style={{marginLeft:"30px", fontWeight:"bold"}}>My Cart</span>
                                    </Typography>
                                </div>
                                <br/>
                                <div className="cart-items-container">

                                </div>
                                <br/>
                                <div className="cart-total-amount">
                                    <Typography variant="body1" component="p" style={{width:"95%"}}>
                                        <span style={{fontWeight:"bold"}}>TOTAL AMOUNT</span>
                                    </Typography>
                                    <span><i style={{margin:"4px"}} className="fa fa-inr" aria-hidden="true"></i></span>
                                    <span style={{fontWeight:"bold"}}>{this.state.total_amount}</span>
                                </div>
                                <br/>
                                <Button variant="contained" color="primary">
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
                    open={this.state.setOpen}
                    autoHideDuration={1}
                    message="Item added to cart!"
                />
            </div>
        );
    }
}

export default Details;