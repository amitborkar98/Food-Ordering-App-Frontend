import React ,{Component} from 'react';
import Header from '../../common/header/Header';
import './Details.css';
import Typography from '@material-ui/core/Typography';
import 'font-awesome/css/font-awesome.min.css';

class Details extends Component{
 
    constructor(){
        super();
        this.state = {
            restaurant: [],
            locality: "",
            category_names:[],
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
                });      
                let categories= JSON.parse(this.responseText).categories
                for(let i in categories){
                    let category = categories[i].category_name;
                    categories_list.push(category);
                }
                that.setState({category_names: categories_list});
            }
            console.log(that.state.restaurant);
        });
        xhr1.open("GET", "http://localhost:8080/api/api/restaurant/246165d2-a238-11e8-9077-720006ceb890");
        xhr1.send(data1);    
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


            </div>
        );
    }
}

export default Details;