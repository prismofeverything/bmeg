import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import MobileStepper from 'material-ui/MobileStepper';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

import Plot from './Plot'


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing.unit * 4,
    marginBottom: 20,
    background: theme.palette.background.default,
  },
});

class CohortChooser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
    };
    //TODO - we shouldn't need to do these bindings
    // `() =>` syntax should remove the need for it
    // for some reason, this is a syntax error. is it a webpack config issue?
    this.handleNext = this.handleNext.bind(this)
    this.handleBack = this.handleBack.bind(this)

  }

  handleNext() {
    this.setState({
      activeStep: this.state.activeStep + 1,
    });
  };

  handleBack(){
    this.setState({
      activeStep: this.state.activeStep - 1,
    });
  };

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return 'Select another query... (//TODO)';
      case 1:
        return 'View plot below';
      case 2:
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  render() {
    const classes = this.props.classes;
    var plot
    if (this.state.activeStep==1) {
      plot = (<Plot open={true}/>)
    }
    return (
      <div className={classes.root}>
        <Paper square className={classes.header} style={{marginBottom:0}}>
          <div style={{width:'100%'}}>
            <Typography type="headline" gutterBottom align="center">
              Intersection
            </Typography>
            <Typography type="title" gutterBottom align="left">
              {this.getStepContent(this.state.activeStep)}
            </Typography>
          </div>
        </Paper>
        <MobileStepper
          style={{clear:'left'}}
          type="text"
          steps={2}
          position="static"
          activeStep={this.state.activeStep}
          className={classes.mobileStepper}
          onBack={this.handleBack}
          onNext={this.handleNext}
          disableBack={this.state.activeStep === 0}
          disableNext={this.state.activeStep === 1}
        />
        {plot}
      </div>
    );
  }
}

CohortChooser.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CohortChooser);
