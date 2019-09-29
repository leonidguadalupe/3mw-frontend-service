import React from 'reactn';
import PropTypes from 'prop-types';

import DatapointComponent from '../datapoint-container.js';
import { shallow, mount } from 'enzyme';

function setup() {
  export const useGlobal = jest.fn()
  useGlobal.mockImplementationOnce([plant, setPlants])

  return mount(<DatapointComponent />, {context: {plants}, 
    childContextTypes: {plants: PropTypes.array}}
  );
}
describe('Datapoint Test Case', () => {
  it('renders without crashing', () => {
    const component = mount(<DatapointComponent />);
    // expect(component).toMatchSnapshot();
    component.unmount();
  });
  
  const mockFunction = jest.fn();
  
  it('call generate datapoint function on click', () => {
    const component = shallow(
      <DatapointComponent generateDataPoints={mockFunction} />
    );
    component.find('#generate-button').simulate('click');
    expect(mockFunction).toHaveBeenCalled();
    component.unmount();
  });
  
});