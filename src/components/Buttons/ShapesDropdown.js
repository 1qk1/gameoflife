import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class ShapesDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {
    return (
      <Dropdown size='sm' isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          Shapes
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header disabled>Click on the Grid to place shape</DropdownItem>
          <DropdownItem onClick={() => this.props.clicked('acorn')}>Acorn</DropdownItem>
          <DropdownItem onClick={() => this.props.clicked('diehard')}>Diehard</DropdownItem>
          <DropdownItem onClick={() => this.props.clicked('rPentomino')}>The R-pentomino</DropdownItem>
          <DropdownItem onClick={() => this.props.clicked('glider')}>Glider</DropdownItem>
          <DropdownItem onClick={() => this.props.clicked('lwss')}>Lightweight Spaceship</DropdownItem>
          <DropdownItem onClick={() => this.props.clicked('pentadecathlon')}>Pentadecathlon</DropdownItem>
          <DropdownItem onClick={() => this.props.clicked('pulsar')}>Pulsar</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}
