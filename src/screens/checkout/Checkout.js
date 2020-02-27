import React ,{Component} from 'react';
import Header from '../../common/header/Header';
import './Checkout.css';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Button from '@material-ui/core/Button';

class Checkout extends Component{

    constructor(){
        super();
        this.state = {
            activeStep: 0,
            deliveryActive: true,
            deliveryCompleted: false,
            value: 0,
            address: [],
            addressId: "",
        }
    }
    
    UNSAFE_componentWillMount(){
        let data1 = null;
        let xhr1 = new XMLHttpRequest();
        let that = this;
        let addressList = [];
        xhr1.addEventListener("readystatechange", function () {
            if(this.readyState === 4){
                addressList = JSON.parse(this.responseText).addresses;
                for(let i in addressList){
                   addressList[i].selectIcon = "";
                   addressList[i].selectAddress = "";
                }
                that.setState({
                   address: addressList,
                });
                console.log(that.state.address)
            }
        });
        xhr1.open("GET", "http://localhost:8080/api/address/customer");
        xhr1.setRequestHeader("Authorization", "Bearer "+ sessionStorage.getItem('access-token'));
        xhr1.send(data1);    
    }

    tabChangeHandler = (event, value) =>{
        this.setState({value});
    }

    selectHandler = (addressId) =>{
        let addressList = this.state.address;
        for(let i in addressList){
            addressList[i].selectIcon = "";
            addressList[i].selectAddress = "";
            if(addressList[i].id === addressId){
               addressList[i].selectIcon = "green";
               addressList[i].selectAddress = "select"
                this.setState({
                    address: addressList,
                    addressId: addressId,
                })
            }
        }
    }

    render(){
        return(
            <div>
                <Header/>
                <div className="checkout-main-conatiner">
                    <div className="steps">
                        <Stepper activeStep={this.state.activeStep} orientation="vertical">
                            <Step active={this.state.deliveryActive} completed={this.state.deliveryCompleted}>
                                <StepLabel> 
                                    <Typography variant="body1" component="h1">
                                        Delivery
                                    </Typography>
                                </StepLabel>
                                <StepContent>
                                <Tabs className="checkoutTabs" value={this.state.value} onChange={this.tabChangeHandler}>
                                    <Tab style={{color:"white"}} label="EXISTING ADDRESS" />
                                    <Tab style={{color:"white"}} label="NEW ADDRESS" />
                                </Tabs>
                                
                                {this.state.value === 0 &&
                                <div className="existing-address-container">
                                    <GridList cols={3} cellHeight={200}>
                                    {this.state.address.map(add => (
                                        <GridListTile key={"add"+ add.id} className={add.selectAddress} style={{marginRight:"20px", marginBottom:"60px"}}>
                                            <Typography> {add.flat_building_name} </Typography>
                                            <Typography style={{marginTop:"5px"}}> {add.locality} </Typography>
                                            <Typography style={{marginTop:"5px"}}> {add.city} </Typography>
                                            <Typography style={{marginTop:"5px"}}> {add.state.state_name} </Typography>
                                            <Typography style={{marginTop:"5px"}}> {add.pincode} </Typography>
                                            <div className="icon">
                                                <IconButton onClick={()=>this.selectHandler(add.id)}>
                                                    <CheckCircleIcon className={add.selectIcon}/>
                                                </IconButton>
                                            </div>
                                        </GridListTile>
                                    ))}
                                    </GridList>
                                    <Button style={{marginRight:"10px", color:"grey"}}>BACK</Button>
                                    <Button variant="contained" color="primary">NEXT</Button>
                                </div>
                                }  

                                {this.state.value === 1 &&
                                <div>
                                    
                                </div>
                                }       
                                </StepContent>
                            </Step>
                           
                            <Step>
                                <StepLabel> 
                                    <Typography variant="body1" component="h1">
                                        Payment
                                    </Typography>
                                </StepLabel>
                                <StepContent>
                            
                                </StepContent>
                            </Step>
                        </Stepper>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        );
    }
} 

export default Checkout;