import React from 'react';
import { connect } from 'react-redux';
import {
  Form,
  Control, actions,
} from 'react-redux-form';
import validator from 'validator';
import {
  withStyles,
  Typography,
  Grid,
  Box,
  FormControlLabel,
  TextField,
  Checkbox,
} from '@material-ui/core';
import { ReactComponent as LargeBag } from '../../../../assets/icons/LargeBag.svg';
import { ReactComponent as MediumBag } from '../../../../assets/icons/MediumBag.svg';
import { ReactComponent as SmallBag } from '../../../../assets/icons/SmallBag.svg';
import ErrorMessage from '../../../../components/ErrorMessage/ErrorMessage';

const useStyles = theme => ({
  paper: {
    textAlign: 'center',
  },
  form: {
    marginTop: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    alignItems: 'center',
  },
  input: {
    maxWidth: '33.33%',
  },
  icon: {
    width: '48px',
    height: 'auto',
  },
  alignCenter: {
    textAlign: 'center',
  },
});

const mapStateToProps = state => ({
  smallBagsValidation: state.forms.forms.thirdStep.smallBags.valid,
  smallBagsPristine: state.forms.forms.thirdStep.smallBags.pristine,
  mediumBagsValidation: state.forms.forms.thirdStep.mediumBags.valid,
  mediumBagsPristine: state.forms.forms.thirdStep.mediumBags.pristine,
  largeBagsValidation: state.forms.forms.thirdStep.largeBags.valid,
  largeBagsPristine: state.forms.forms.thirdStep.largeBags.pristine,
  specialBags: state.forms.thirdStep.specialBags,
  specialBagsDesc: state.forms.thirdStep.specialBagsDesc,
  specialBagsDescValidation: state.forms.forms.thirdStep.specialBagsDesc.valid,
  specialBagsDescPristine: state.forms.forms.thirdStep.specialBagsDesc.pristine,
});

class ThirdStep extends React.Component {
  constructor(props) {
    super(props);
    this.handleBagChange = this.handleBagChange.bind(this);
    this.handlespecialBagCheckChange = this.handlespecialBagCheckChange.bind(this);
    this.handlespecialBagDescpChange = this.handlespecialBagDescpChange.bind(this);
    this.state = {
      chars: 0,
    };
    this.data = {
      step: 3,
      smallBag: 0,
      mediumBag: 0,
      LargeBag: 0,
      specialBag: 0,
      specialBagDesc: '',
    };
  }

  componentDidMount() {
    const { specialBagsDesc } = this.props;
    if (specialBagsDesc !== null) {
      this.setState({
        chars: specialBagsDesc.length,
      });
    }
  }

  handleBagChange(event) {
    const { name, value } = event.target;
    this.data[name] = value;
    this.props.handleStepResponse(this.data);
    this.setState({
      [name]: value,
    });
  }

  handlespecialBagCheckChange() {
    const { specialBag } = this.state;
    this.data.specialBag = !specialBag;
    this.props.handleStepResponse(this.data);
    this.setState(prev => ({
      specialBag: !prev.specialBag,
    }));
  }

  handlespecialBagDescpChange(event) {
    this.setState({
      chars: event.target.value.length,
    });
  }

  render() {
    const {
      classes,
      smallBagsValidation,
      smallBagsPristine,
      mediumBagsValidation,
      mediumBagsPristine,
      largeBagsValidation,
      largeBagsPristine,
      specialBags,
      specialBagsDescValidation,
      specialBagsDescPristine,
      dispatch,
    } = this.props;
    const { chars } = this.state;

    return (
      <div>
        <Form model="forms.thirdStep">
          <Box textAlign="center">
            <Typography className={classes.instructions}>
              Please enter your baggage
            </Typography>
          </Box>
          <Grid container spacing={1}>
            <Grid item xs={4} md={4} className={classes.alignCenter}>
              <Control.text
                component={TextField}
                model=".largeBags"
                validators={{
                  isInt: val => (val || val.length > 0 ? validator.isInt(val) : true),
                }}
                error={!largeBagsValidation && !largeBagsPristine}
                controlProps={{
                  className: 'classes.input',
                  helperText: (
                    <ErrorMessage
                      modelName="forms.thirdStep.largeBags"
                      messages={{
                        isInt: 'Must be a number',
                      }}
                    />
                  ),
                  placeholder: 'Large',
                  margin: 'dense',
                  color: 'primary',
                  id: 'largeBag',
                  name: 'largeBag',
                }}
              />
            </Grid>
            <Grid item xs={4} md={4} className={classes.alignCenter}>
              <Control.text
                component={TextField}
                model=".mediumBags"
                validators={{
                  isInt: val => (val || val.length > 0 ? validator.isInt(val) : true),
                }}
                error={!mediumBagsValidation && !mediumBagsPristine}
                controlProps={{
                  className: 'classes.input',
                  helperText: (
                    <ErrorMessage
                      modelName="forms.thirdStep.mediumBags"
                      messages={{
                        isInt: 'Must be a number',
                      }}
                    />
                  ),
                  placeholder: 'Medium',
                  margin: 'dense',
                  color: 'primary',
                  id: 'mediumBag',
                  name: 'mediumBag',
                }}
              />
            </Grid>
            <Grid item xs={4} md={4} className={classes.alignCenter}>
              <Control.text
                component={TextField}
                model=".smallBags"
                validators={{
                  isInt: val => (val || val.length > 0 ? validator.isInt(val) : true),
                }}
                error={!smallBagsValidation && !smallBagsPristine}
                controlProps={{
                  className: 'classes.input',
                  helperText: (
                    <ErrorMessage
                      modelName="forms.thirdStep.smallBags"
                      messages={{
                        isInt: 'Must be a number',
                      }}
                    />
                  ),
                  placeholder: 'Small',
                  margin: 'dense',
                  color: 'primary',
                  id: 'smallBag',
                  name: 'smallBag',
                }}
              />
            </Grid>
            <Grid item xs={4} md={4} className={classes.alignCenter}>
              <LargeBag className={classes.icon} />
            </Grid>
            <Grid item xs={4} md={4} className={classes.alignCenter}>
              <MediumBag className={classes.icon} />
            </Grid>
            <Grid item xs={4} md={4} className={classes.alignCenter}>
              <SmallBag className={classes.icon} />
            </Grid>
            <Grid item xs={4} md={4} className={classes.alignCenter}>
              <FormControlLabel
                control={(
                  <Control.checkbox
                    model=".specialBags"
                    component={Checkbox}
                    onClick={() => dispatch(actions.reset('forms.thirdStep.specialBagsDesc'))}
                  />
                )}
                label="I have special sized luggage"
              />
            </Grid>
            {specialBags ? (
              <Grid item xs={8} md={8} className={classes.alignCenter}>
                <Control.text
                  model=".specialBagsDesc"
                  validators={{
                    required: val => (specialBags ? val && val.length > 0 : true),
                  }}
                  error={!specialBagsDescValidation && !specialBagsDescPristine}
                  component={TextField}
                  controlProps={{
                    helperText: (
                      <span>
                        <ErrorMessage
                          modelName="forms.thirdStep.specialBagsDesc"
                          messages={{
                            required: 'Required',
                          }}
                        />
                        <span style={{
                          flex: 'right',
                        }}
                        >
                          {chars}/255
                        </span>
                      </span>
                    ),
                    style: { padding: '5px 0 5px 0' },
                    placeholder: 'Please describe your special luggage',
                    margin: 'dense',
                    fullWidth: true,
                    color: 'primary',
                    id: 'specialBagDesc',
                    name: 'specialBagDesc',
                    onChange: e => this.handlespecialBagDescpChange(e),
                    inputProps: {
                      maxlength: 255,
                    },
                  }}
                />
              </Grid>
            ) : ('')}
          </Grid>
        </Form>
      </div>
    );
  }
}

export default connect(mapStateToProps)(withStyles(useStyles)(ThirdStep));
