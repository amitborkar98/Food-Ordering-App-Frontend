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
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import 'font-awesome/css/font-awesome.min.css';
import Snackbar from '@material-ui/core/Snackbar';

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
            paymentCompleted: false,
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
            addressSavedMessage: "dispNone",
            paymentList: [],
            paymentId: "",
            display: "grey",
            summaryText: "dispNone",
            orderId: "",
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
        
        let data3 = null;
        let xhr3 = new XMLHttpRequest();
        xhr3.addEventListener("readystatechange", function () {
            if(this.readyState === 4){
                that.setState({
                   paymentList: JSON.parse(this.responseText).paymentMethods,
                });
            }
        });
        xhr3.open("GET", "http://localhost:8080/api/payment");
        xhr3.send(data3); 
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

    paymentHandler = (e) =>{
        this.setState({ 
            paymentId: e.target.value,
            display: "blue" 
        });
    }

    finishHandler = () =>{
        if(this.state.paymentId !== ""){
            this.setState({
                paymentCompleted: true,
                paymentActive: false,
                summaryText: "dispBlock"
            });
        }
    }

    detailsChangeHandler = () =>{
        this.setState({ 
            deliveryActive: true,
            summaryText: "dispNone",
        })
    }

    placeOrderHandler = () =>{
        if(this.state.addressId === "" || this.state.paymentId === ""){
            this.setState({ setOpenOrderError: true })
        }
        else{

            let item_quantities = [];
            let item = {};
            for(let i in this.props.location.summary.cart_items){
                item.item_id = this.props.location.summary.cart_items[i].id;
                item.price = this.props.location.summary.cart_items[i].price;
                item.quantity = this.props.location.summary.cart_items[i].quantity;
                item_quantities.push(item);
            } 
            let dataSave = JSON.stringify({
                "address_id": this.state.addressId,
                "bill": Math.random() * 10,
                "coupon_id": "2ddf6284-ecd0-11e8-8eb2-f2801f1b9fd1",
                "discount": 0,
                "item_quantities": item_quantities,
                "payment_id": this.state.paymentId,
                "restaurant_id": this.props.location.summary.restaurant.id
            })
            let xhrSave = new XMLHttpRequest();
            let that = this;
            xhrSave.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    if(JSON.parse(this.responseText).status === "ORDER SUCCESSFULLY PLACED"){
                        that.setState({
                            orderId: JSON.parse(this.responseText).id,
                            setOpenOrderPlaced: true
                        });
                    }
                    else{
                        that.setState({ setOpenOrderError: true })
                    }
                }
            });
            xhrSave.open("POST", "http://localhost:8080/api/order");
            xhrSave.setRequestHeader("Authorization", "Bearer "+ sessionStorage.getItem('access-token'));
            xhrSave.setRequestHeader("Content-Type", "application/json");
            xhrSave.setRequestHeader("Cache-Control", "no-cache");
            xhrSave.send(dataSave);
        }
    }

    snanckCloseHandler = () =>{
        this.setState({
            setOpenOrderError: false,
            setOpenOrderPlaced: false,
       })
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
                           
                            <Step active={this.state.paymentActive} completed={this.state.paymentCompleted}>
                                <StepLabel> 
                                    <Typography variant="body1" component="h1">
                                        Payment
                                    </Typography>
                                </StepLabel>
                                <StepContent style={{padding: "20px"}}>
                                    <Typography className={this.state.display} variant="h6" component="h1">
                                        Select Mode of Payment
                                    </Typography>
                                    <FormControl component="fieldset">
                                        <RadioGroup aria-label="payment" name="payment" value={this.state.paymentId} onChange={this.paymentHandler}>
                                        {this.state.paymentList.map(pay => (
                                        <FormControlLabel key={"pay"+pay.id} value={pay.id} control={<Radio />} label={pay.payment_name} />
                                        ))}
                                        </RadioGroup>
                                    </FormControl>
                                    <br/> <br/> <br/>
                                    <Button style={{marginRight:"10px", color:"grey"}}>BACK</Button>
                                    <Button variant="contained" color="primary" onClick={this.finishHandler}>FINISH</Button>
                                </StepContent>
                            </Step>
                        </Stepper>
                        <div style={{marginTop:"30px", marginLeft:"30px"}} className={this.state.summaryText}>
                            <Typography variant="h6" component="h1">
                                View the summary and place your order now!
                            </Typography>
                            <br/>
                            <Button style={{marginLeft:"20px"}} onClick={this.detailsChangeHandler}> CHANGE </Button>
                        </div>
                    </div>
                    
                    <div className="summary-card-container">
                    <Card className="summary-checkout">
                        <CardContent>
                            <Typography variant="h4" component="h1">
                                Summary
                            </Typography>
                            <br/><br/>
                            <Typography style={{color:"grey"}} variant="h5" component="h1">
                                {this.props.location.summary.restaurant.restaurant_name}
                            </Typography>  
                            <br/>
                            <div className="summary-items-container">
                            {this.props.location.summary.cart_items.map(itm => (
                                <div className="summary-cart-items" key={"cart-item" + itm.id}>
                                    {itm.item_type === "VEG" ? 
                                    <i style={{color:"green", margin:"4px", width:"5%"}} className="fa fa-stop-circle-o" aria-hidden="true"></i>
                                    :
                                    <i style={{color:"red", margin:"4px",  width:"5%"}} className="fa fa-stop-circle-o" aria-hidden="true"></i>
                                    }
                                    <Typography variant="body1" component="p" style={{width:"50%", marginBottom:"5px"}}>
                                        <span>{itm.item_name}</span>
                                    </Typography>
                                    <div style={{width:"25%"}}>
                                        <span>{itm.quantity}</span>
                                    </div>    
                                    <div style={{width:"15%", display:"flex"}}>
                                        <i style={{margin:"4px"}} className="fa fa-inr" aria-hidden="true"></i>
                                        <span>{itm.price * itm.quantity}.00</span>                                        
                                    </div>
                                </div>
                                ))}
                            </div>
                            <Divider variant="fullWidth" /> 
                            <div className="summary-net-amount">
                                <Typography variant="h6" component="h1">
                                    Net Amount
                                </Typography> 
                                <div style={{marginTop:"4px"}}>
                                    <span><i style={{margin:"4px",color:"darkgrey"}} className="fa fa-inr" aria-hidden="true"></i></span>
                                    <span style={{fontWeight:"bold"}}>{this.props.location.summary.total_amount}.00</span>
                                </div> 
                            </div>
                            <Button style={{width:"100%"}} variant="contained" color="primary" onClick={this.placeOrderHandler}>
                                PLACE ORDER
                            </Button>
                        </CardContent>
                    </Card>
                    </div>
                </div>
                <Snackbar
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                    }}
                    open={this.state.setOpenOrderPlaced}
                    autoHideDuration={1}
                    message={"Order placed successfully! Your order ID is " + this.state.orderId}
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
                    open={this.state.setOpenOrderError}
                    autoHideDuration={1}
                    message="‘Unable to place your order! Please try again!"
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

export default Checkout;