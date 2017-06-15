import React, { Component } from 'react';
import {Panel, FormGroup, Button, InputGroup, FormControl } from 'react-bootstrap';
import Nameday from './Nameday';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class AddConnection extends Component {
  constructor(){
    super();
    this.state = {
      newConnection: {
        id: '',
        name: '',
        phone: '',
        birthday: '',
        nameday: '',
      },
      date: '',
      nameday_date: '',
      controlId: null,
      validationState: null,
      nameChange: ''
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onNamedayChange = this.onNamedayChange.bind(this);
  }

  handleChange(selected) {
    this.setState({
      date: selected,
    })
   }

  handleNameChange(value) {
    this.setState({nameChange: this.name.value})
  }

  onNamedayChange(date){
    this.setState({nameday_date: date});
  }

  handleSubmit(e, id){
    const pattern_name = /^\s+$/;
    const pattern_phone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

    let newBirthday
    if(typeof this.state.date === 'object') {
      newBirthday = this.state.date.format().toString().slice(8,10)+'-'+this.state.date.format().toString().slice(5,7)+'-'+this.state.date.format().toString().slice(0,4)
    } else {
      newBirthday = this.state.date
    }

    if(pattern_name.test(this.name.value) || this.name.value === ''){
      alert('Name is required');
      if (!pattern_phone.test(this.phone.value) && this.phone.value!==""){
        this.setState({controlId: "formValidationError1", validationState: "error"})
      } else {
        this.setState({controlId: null, validationState: null})
      }
    } else if (!pattern_phone.test(this.phone.value) && this.phone.value!==""){
      this.setState({controlId: "formValidationError1", validationState: "error"})
    } else {

      if(this.props.parent.connections.length === 0) {
        this.setState({
          newConnection: {
            id: 1,
            name: this.name.value,
            phone: this.phone.value,
            birthday: newBirthday,
            nameday: this.state.nameday_date,
          },
        }, function(){
          let connections = [ ...this.props.parent.connections, this.state.newConnection];
          this.props.callbackParent(this.props.id, connections);
        });
        this.name.value = '';
        this.phone.value = '';

        this.setState({
          controlId: null,
          validationState: null,
          nameChange: ''
        });

      } else {
        this.setState({
          newConnection: {
            id: this.props.parent.connections[Object.keys(this.props.parent.connections).length - 1].id+1,
            name: this.name.value,
            phone: this.phone.value,
            birthday: newBirthday,
            nameday: this.state.nameday_date,
          },
        }, function(){
          let connections = [ ...this.props.parent.connections, this.state.newConnection];
          this.props.callbackParent(this.props.id, connections);
        });
        this.name.value = '';
        this.phone.value = '';

        this.setState({
          controlId: null,
          validationState: null,
          nameChange: ''
        });
      }
    }

    e.preventDefault();
  }

  render() {
    return (
      <div>
        <div className='font30'>
          Add {this.props.parent.firstName}'s Connection
        </div>
        <Panel>
          <form onSubmit={this.handleSubmit}>
            <FormGroup>
              <InputGroup>
                <InputGroup.Addon className='glyph-input'><img src="images/account.png" width='20px' role="presentation" /></InputGroup.Addon>
                <FormControl
                  type="text"
                  placeholder="Add Connection's Name"
                  inputRef={(ref) => {this.name = ref}}
                  onBlur={this.handleNameChange}
                />
              </InputGroup>
            </FormGroup>
            <FormGroup controlId={this.state.controlId} validationState={this.state.validationState}>
              <InputGroup>
                <InputGroup.Addon className='glyph-input'><img src="images/phone.png" width='20px' role="presentation"/></InputGroup.Addon>
                  <FormControl
                    type="text"
                    placeholder="Add Connection's Phone Number"
                    inputRef={(ref) => {this.phone = ref}}
                  />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup>
                <InputGroup.Addon className='glyph-input'><img src="images/cake-layered.png" width='20px' role="presentation"/></InputGroup.Addon>
                <DatePicker
                  selected={this.state.date}
                  onChange={this.handleChange}
                  dateFormat="DD/MM/YYYY"
                  className="form-control"
                  placeholderText="Add Connection's Birthday"
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup>
                <InputGroup.Addon className='glyph-input'><img src="images/calendar.png" width='20px' role="presentation"/></InputGroup.Addon>
                  <Nameday name={this.state.nameChange} callbackNameday={this.onNamedayChange}/>
              </InputGroup>
            </FormGroup>

            <Button className="custom" type="submit">Submit</Button>
          </form>
        </Panel>
      </div>
    );
  }
}

export default AddConnection;
