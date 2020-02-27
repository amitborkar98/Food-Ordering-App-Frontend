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

class Checkout extends Component{

    constructor(){
        super();
        this.state = {
            activeStep: 0,
            deliveryActive: true,
            deliveryCompleted: false,
            value: 0,

        }
    }
    
    tabChangeHandler = (event, value) =>{
        this.setState({value});
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
                                <Tabs className="tabs" value={this.state.value} onChange={this.tabChangeHandler}>
                                    <Tab style={{color:"white"}} label="EXISTING ADDRESS" />
                                    <Tab style={{color:"white"}} label="NEW ADDRESS" />
                                </Tabs>
                                {this.state.value === 0 &&
                                <div>

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