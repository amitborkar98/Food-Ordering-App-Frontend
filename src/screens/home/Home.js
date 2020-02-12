import React ,{Component} from 'react';
import Header from '../../common/header/Header';
import './Home.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
//import FontAwesome from 'react-fontawesome';
import 'font-awesome/css/font-awesome.min.css';

class Home extends Component{

    constructor(){
        super();
        this.state = {
            restaurants: [],
        }
    }

    UNSAFE_componentWillMount(){
        let data1 = null;
        let xhr1 = new XMLHttpRequest();
        let that = this;
        xhr1.addEventListener("readystatechange", function () {
            if(this.readyState === 4){     
                that.setState({
                    restaurants: JSON.parse(this.responseText).restaurants,
                });      

                console.log(JSON.parse(this.responseText).restaurants)
            }
        });
        xhr1.open("GET", "http://localhost:8080/api/restaurant");
        xhr1.send(data1);
    }

    render(){
        return(
            <div>
                <Header search="true"/>
                <div className="container">    
                   
                    {this.state.restaurants.map(res => (
                    <Card className="restaurant-cards" key={"res" + res.id}>
                        <CardContent>
                            <CardMedia image={res.photo_URL} style={{height:"200px"}} />
                            <br/>
                            <div className="card-content">
                                <Typography variant="h5" component="h1">
                                    <span>{res.restaurant_name}</span>
                                </Typography> 
                                <br/>
                                <Typography variant="body1" component="p">
                                    <span>{res.categories}</span>
                                </Typography>
                                <br/>
                                <div className="details">
                                    <div className="ratings">
                                    <i style={{color:"white"}} className="fa fa-star" aria-hidden="true"></i>
                                        <span style={{marginRight:"5px",color:"white" }}>{res.customer_rating}</span>
                                        <span style={{color:"white"}}>({res.number_customers_rated})</span>
                                    </div>     
                                    <Typography variant="body1" component="p">
                                         <i className="fa fa-inr" aria-hidden="true"></i>
                                        <span>{res.average_price} for two</span>
                                    </Typography>      
                                </div>  
                            </div>
                        </CardContent>
                    </Card>
                    ))}
                
                </div>
            </div>
        );
    }
}
export default Home;