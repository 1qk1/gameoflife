import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class GridDropdown extends React.Component {
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
          Grid Size
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => this.props.clicked([25,25])}>25x25</DropdownItem>
          <DropdownItem onClick={() => this.props.clicked([50,50])}>50x50</DropdownItem>
          <DropdownItem onClick={() => this.props.clicked([50,100])}>100x50</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}
