import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { MenuItem } from 'material-ui/Menu';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { withStyles } from 'material-ui/styles';
import { connect } from "react-redux";

// const suggestions = [
//   { label: 'Afghanistan' },
//   { label: 'Aland Islands' },
//   { label: 'Albania' },
//   { label: 'Algeria' },
//   { label: 'American Samoa' },
//   { label: 'Andorra' },
//   { label: 'Angola' },
//   { label: 'Anguilla' },
//   { label: 'Antarctica' },
//   { label: 'Antigua and Barbuda' },
//   { label: 'Argentina' },
//   { label: 'Armenia' },
//   { label: 'Aruba' },
//   { label: 'Australia' },
//   { label: 'Austria' },
//   { label: 'Azerbaijan' },
//   { label: 'Bahamas' },
//   { label: 'Bahrain' },
//   { label: 'Bangladesh' },
//   { label: 'Barbados' },
//   { label: 'Belarus' },
//   { label: 'Belgium' },
//   { label: 'Belize' },
//   { label: 'Benin' },
//   { label: 'Bermuda' },
//   { label: 'Bhutan' },
//   { label: 'Bolivia, Plurinational State of' },
//   { label: 'Bonaire, Sint Eustatius and Saba' },
//   { label: 'Bosnia and Herzegovina' },
//   { label: 'Botswana' },
//   { label: 'Bouvet Island' },
//   { label: 'Brazil' },
//   { label: 'British Indian Ocean Territory' },
//   { label: 'Brunei Darussalam' },
// ];

function renderInput(inputProps) {
  const { classes, home, value, ref, ...other } = inputProps;

  return (
    <TextField
      autoFocus={home}
      className={classes.textField}
      value={value}
      inputRef={ref}
      InputProps={{
        classes: {
          input: classes.input,
        },
        ...other,
      }}
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.key, query);
  const parts = parse(suggestion.key, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) => {
          return part.highlight ? (
            <span key={index} style={{ fontWeight: 300 }}>
              {part.text}
            </span>
          ) : (
            <strong key={index} style={{ fontWeight: 500 }}>
              {part.text}
            </strong>
          );
        })}
      </div>
    </MenuItem>
  );
}

function renderSuggestionsContainer(options) {
  const { containerProps, children } = options;

  return (
    <Paper {...containerProps} square>
      {children}
    </Paper>
  );
}

function getSuggestionValue(suggestion) {
  return suggestion.key ; // label;
}

// function getSuggestions(value) {
//   const inputValue = value.trim().toLowerCase();
//   const inputLength = inputValue.length;
//   let count = 0;
//
//   return inputLength === 0
//     ? []
//     : suggestions.filter(suggestion => {
//         const keep =
//           count < 5 && suggestion.label.toLowerCase().slice(0, inputLength) === inputValue;
//
//         if (keep) {
//           count += 1;
//         }
//
//         return keep;
//       });
// }

const styles = theme => ({
  container: {
    flexGrow: 1,
    position: 'relative',
    height: 200,
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 3,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  textField: {
    width: '100%',
  },
});

class FacetAutosuggest extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.handleSuggestionsFetchRequested.bind(this);
    this.handleSuggestionsClearRequested.bind(this);
    this.handleChange.bind(this);
  }




  handleSuggestionsFetchRequested({value}) {
    const {dispatch} = this.props;
    const _self = this;
    this.setState({loading:true})
    return new Promise((resolve, reject) => {
      dispatch({
        type: 'AUTOCOMPLETE',
        label: _self.props.property,
        value: value,
        callbackError: (error) => {
          reject({_error: error});
        },
        callbackSuccess: () => {
          resolve();
        }
      });
    });
  };

  handleSuggestionsClearRequested() {
    this.setState({
      suggestions: [],
    });
  };

  handleChange(event,{newValue, method}) {
    this.setState({
      value: newValue,
    });
    if (method !== 'type') {
      this.props.onSelect(newValue)      
    }
  };

  render() {
    const { classes } = this.props;
    const status = (this.props.loading ? 'Loading...' : '' );
    const placeholder = `Search ${this.props.property}`
    return (
      <div>
        {status}
        <Autosuggest
          theme={{
            container: classes.container,
            suggestionsContainerOpen: classes.suggestionsContainerOpen,
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion,
          }}
          renderInputComponent={renderInput}
          suggestions={this.props.suggestions}
          onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested.bind(this)}
          onSuggestionsClearRequested={this.handleSuggestionsClearRequested.bind(this)}
          renderSuggestionsContainer={renderSuggestionsContainer}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={{
            autoFocus: true,
            classes,
            placeholder: placeholder,
            value: this.state.value,
            onChange: this.handleChange.bind(this),
          }}
        />
      </div>
    );
  }
}

FacetAutosuggest.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state, own) {
  var suggestions = []
  var loading =  false
  if (state.autocomplete && state.autocomplete[own.property]) {
    suggestions =  state.autocomplete[own.property].buckets || []
    loading = state.autocomplete[own.property].loading || false
  }
  return {
    suggestions: suggestions,
    loading: loading,
  }
}

export default connect(mapStateToProps) (withStyles(styles) (FacetAutosuggest));
