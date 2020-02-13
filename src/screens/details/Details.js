import React ,{Component} from 'react';
import Header from '../../common/header/Header';


class Details extends Component{
 
    constructor(){
        super();
        this.state = {
            restaurant: [],
        }
    }

    UNSAFE_componentWillMount(){
        let data1 = null;
        let xhr1 = new XMLHttpRequest();
        let that = this;
        xhr1.addEventListener("readystatechange", function () {
            if(this.readyState === 4){     
                that.setState({
                    restaurant: JSON.parse(this.responseText),
                });      
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
                Details
            </div>
        );
    }
}

export default Details;