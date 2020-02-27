import React ,{Component} from 'react';
import Header from '../../common/header/Header';
import './Checkout.css';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Typography from '@material-ui/core/Typography';

class Checkout extends Component{

    constructor(){
        super();
        this.state = {
            activeStep: 0,
            deliveryActive: true,
            deliveryCompleted: false,


        }
    }

    render(){
        return(
            <div>
                <Header/>
                <div className="checkout-main-conatiner">
                    <Stepper activeStep={this.state.activeStep} orientation="vertical">
                        <Step active={this.state.deliveryActive} completed={this.state.deliveryCompleted}>
                            <StepLabel> 
                                <Typography variant="body1" component="h1">
                                    Delivery
                                </Typography>
                            </StepLabel>
                            <StepContent>
                           
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
            </div>
        );
    }
} 

export default Checkout;