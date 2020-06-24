import React from 'react';
import Select from 'react-select';

const customStyles = {
  container: (base, state) => ({
    ...base,
    width: '100%',
  }),
  control: (base, state) => ({
    ...base,
    width: '100%',
  }),
};

class SelectSearch extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    let customEvent;
    if (event === null) {
      customEvent = {
        target: {
          name: this.props.name,
          value: '',
          type: 'select',
        },
      };
    } else {
      customEvent = {
        target: {
          name: this.props.name,
          value: event,
          type: 'select',
        },
      };
    }
    this.props.onChangeFunctionName(customEvent);
  }

  render() {
    if (!Object.keys(this.props).includes('isClearable')) {
      this.props.isClearable = 1;
    }
    return (
      <Select
        {...this.props}
        className="MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-formControl MuiInput-formControl"
        styles={customStyles}
        isClearable={this.props.isClearable}
        // onChange={this.onChange}
      />
    );
  }
}

export default SelectSearch;
