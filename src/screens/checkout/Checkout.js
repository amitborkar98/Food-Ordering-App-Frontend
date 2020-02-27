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
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

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
            paymentActive: false,
            flat_no: "",
            locality: "",
            city: "",
            pincode: "",
            state: "",
            flatNoRequired: "dispNone",
            cityRequired: "dispNone",
            localityRequired: "dispNone",
            pincodeRequired: "dispNone",
            stateRequired: "dispNone",
            stateList: [],
            pincodeError: "dispNone",
            addressSavedMessage: "dispNone"
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
            }
        });
        xhr1.open("GET", "http://localhost:8080/api/address/customer");
        xhr1.setRequestHeader("Authorization", "Bearer "+ sessionStorage.getItem('access-token'));
        xhr1.send(data1);   
        
        let data2 = null;
        let xhr2 = new XMLHttpRequest();
        xhr2.addEventListener("readystatechange", function () {
            if(this.readyState === 4){
                that.setState({
                   stateList: JSON.parse(this.responseText).states,
                });
            }
        });
        xhr2.open("GET", "http://localhost:8080/api/states");
        xhr2.send(data2);   
    }

    inputCityChangeHandler = (e) => {
        this.setState({ city: e.target.value });
    }

    inputFlatNoChangeHandler = (e) => {
        this.setState({ flat_no: e.target.value });
    }

    inputLocalityChangeHandler = (e) => {
        this.setState({ locality: e.target.value });
    }

    inputPincodeChangeHandler = (e) => {
        this.setState({ pincode: e.target.value });
    }

    stateChangeHandler = (e) => {
        this.setState({ state: e.target.value });
    }

    tabChangeHandler = (event, value) =>{
        this.setState({value});
        let data1 = null;
        let that = this;
        let xhr1 = new XMLHttpRequest();
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
            }
        });
        xhr1.open("GET", "http://localhost:8080/api/address/customer");
        xhr1.setRequestHeader("Authorization", "Bearer "+ sessionStorage.getItem('access-token'));
        xhr1.send(data1);   
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

    addressNextHandler = () =>{
        if(this.state.addressId !== ""){
            this.setState({ 
                deliveryCompleted: true,
                deliveryActive: false,
                paymentActive: true,
            })
        }  
    }

    saveAddressHandler = () =>{
        this.state.flat_no === "" ? this.setState({ flatNoRequired: "dispBlock" }) : this.setState({ flatNoRequired: "dispNone" });
        this.state.pincode === "" ? this.setState({ pincodeRequired: "dispBlock" }) : this.setState({ pincodeRequired: "dispNone" });
        this.state.city === "" ? this.setState({ cityRequired: "dispBlock" }) : this.setState({ cityRequired: "dispNone" });
        this.state.locality === "" ? this.setState({ localityRequired: "dispBlock" }) : this.setState({ localityRequired: "dispNone" });
        this.state.state === "" ? this.setState({ stateRequired: "dispBlock" }) : this.setState({ stateRequired: "dispNone" });

        if(this.state.flat_no !== "" && this.state.city !== "" && this.state.locality !== "" && this.state.state !== "" && this.state.pincode !== ""){
            let dataSave = JSON.stringify({
                "city": this.state.city,
                "flat_building_name": this.state.flat_no,
                "locality": this.state.locality,
                "pincode": this.state.pincode,
                "state_uuid": this.state.state
            })
            let xhrSave = new XMLHttpRequest();
            let that = this;
            xhrSave.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    let code = JSON.parse(this.responseText).code;
                    if(code === "SAR-002"){
                        that.setState({ pincodeError: "dispBlock"});
                    }
                    if(JSON.parse(this.responseText).status === "ADDRESS SUCCESSFULLY REGISTERED"){
                        that.setState({
                             addressSavedMessage: "dispBlock",
                        });
                    }
                }
            });
            xhrSave.open("POST", "http://localhost:8080/api/address");
            xhrSave.setRequestHeader("Authorization", "Bearer "+ sessionStorage.getItem('access-token'));
            xhrSave.setRequestHeader("Content-Type", "application/json");
            xhrSave.setRequestHeader("Cache-Control", "no-cache");
            xhrSave.send(dataSave);
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
                                <div>
                                    {this.state.address.length !== 0 ?
                                    <div className="existing-address-container">
                                        <GridList cols={3} cellHeight={250} style={{flexWrap: "nowrap"}}>
                                        {this.state.address.map(add => (
                                            <GridListTile key={"add"+ add.id} className={add.selectAddress} style={{marginBottom:"60px"}}>
                                            <div style={{margin:" 20px"}}>
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
                                                </div>
                                            </GridListTile>
                                        ))}
                                        </GridList>
                                    </div>
                                    :   <Typography style={{color: "grey", margin:"50px 0px 200px 0px"}}>
                                            There are no saved addresses! You can save an address using the 'New Address' tab or using your ‘Profile’ menu option. 
                                        </Typography>
                                    }
                                    <Button style={{marginRight:"10px", color:"grey"}}>BACK</Button>
                                    <Button variant="contained" color="primary" onClick={this.addressNextHandler}>NEXT</Button>
                                </div>
                                }  
                                {this.state.value === 1 &&
                                <div className="new-address-container">
                                     <FormControl style={{width: "25%"}} required>
                                        <InputLabel htmlFor="flatno">Flat / Building No.</InputLabel>
                                        <Input id="flat_no" type="text" flat_no={this.state.flat_no} onChange={this.inputFlatNoChangeHandler} />
                                        <FormHelperText className={this.state.flatNoRequired}>
                                            <span className="red">required</span>
                                        </FormHelperText>
                                    </FormControl>
                                    <br/> <br/>
                                    <FormControl style={{width: "25%"}} required>
                                        <InputLabel htmlFor="locality">Locality</InputLabel>
                                        <Input id="locality" type="text" locality={this.state.locality} onChange={this.inputLocalityChangeHandler} />
                                        <FormHelperText className={this.state.localityRequired}>
                                            <span className="red">required</span>
                                        </FormHelperText>
                                    </FormControl>
                                    <br/> <br/>
                                    <FormControl style={{width: "25%"}} required>
                                        <InputLabel htmlFor="city">City</InputLabel>
                                        <Input id="city" type="text" city={this.state.city} onChange={this.inputCityChangeHandler} />
                                        <FormHelperText className={this.state.cityRequired}>
                                            <span className="red">required</span>
                                        </FormHelperText>
                                    </FormControl>
                                    <br/> <br/>
                                    <FormControl style={{width: "50%"}} required>
                                        <InputLabel style={{width: "50%"}} htmlFor="state">State</InputLabel>
                                        <Select style={{width: "50%"}}
                                            id="demo-simple-select"
                                            value={this.state.state}
                                            onChange={this.stateChangeHandler}
                                            >
                                            {this.state.stateList.map(name => (
                                                <MenuItem key={"name"+name.id} value={name.id} >
                                                    {name.state_name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        <FormHelperText className={this.state.stateRequired}>
                                            <span className="red">required</span>
                                        </FormHelperText>
                                    </FormControl>
                                    <br/> <br/>
                                    <FormControl style={{width: "25%"}} required>
                                        <InputLabel htmlFor="pincode">Pincode</InputLabel>
                                        <Input id="pincode" type="text" pincode={this.state.pincode} onChange={this.inputPincodeChangeHandler} />
                                        <FormHelperText className={this.state.pincodeRequired}>
                                            <span className="red">required</span>
                                        </FormHelperText>
                                    </FormControl>
                                    <FormHelperText className={this.state.pincodeError}>
                                        <span className="red">Pincode must contain only numbers and must be 6 digits long</span>
                                    </FormHelperText>
                                    <FormHelperText className={this.state.addressSavedMessage}>
                                        <span className="red">ADDRESS SUCCESSFULLY REGISTERED</span>
                                    </FormHelperText>
                                    <br/> <br/> <br/>
                                    <Button variant="contained" color="secondary" onClick={this.saveAddressHandler}>SAVE ADDRESS</Button>
                                    <br/> <br/> <br/>
                                    <Button style={{marginRight:"10px", color:"grey"}}>BACK</Button>
                                    <Button variant="contained" color="primary">NEXT</Button>
                                </div>
                                }       
                                </StepContent>
                            </Step>
                           
                            <Step active={this.state.paymentActive}>
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