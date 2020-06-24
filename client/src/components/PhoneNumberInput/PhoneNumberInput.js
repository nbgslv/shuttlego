import React from 'react';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

// function PhoneTextField(props) {
//   return (
//     <TextField
//       {...props}
//       onChange={event => event.target.value}
//     />
//   );
// }

function PhoneNumberInput(props) {
  return (
    <React.Fragment>
      <PhoneInput
        {...props}
        // inputComponent={PhoneTextField}
        // selectComponent={Select}
      />
    </React.Fragment>
  );
}

export default PhoneNumberInput;
