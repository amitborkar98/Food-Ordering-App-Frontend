import React ,{Component} from 'react';
import Header from '../../common/header/Header';
import './Home.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

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
                    <Card className="restaurant-cards">
                        <CardContent>
                            <CardMedia>

                            </CardMedia>
                            <div className="card-content">
                                <Typography variant="h5" component="h1">
                                    <span> Restaurant name</span>
                                </Typography> 
                                <br/>
                                <Typography variant="body1" component="p">
                                    <span>Categories, 1,2,3,4,5</span>
                                </Typography>
                                <div className="details">
                                    <div>
                                        Ratings <i className="fa fa-star" aria-hidden="true"></i>
                                    </div>     
                                    <Typography variant="body1" component="p">
                                        <span>Rs,1500for 2</span>
                                    </Typography>      
                                </div>  
                           </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }
}
export default Home;