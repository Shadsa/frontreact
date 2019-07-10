import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Button } from 'reactstrap';
import Legend from '../../../../Component/MapView/Leaflet/Legend/Legend';

configure({ adapter: new Adapter() });

let wrapper;
    
beforeEach(() => {
  wrapper = shallow(<Legend landGroup={{city:false, agriculture:false, forest:false, water:false}} zoom={5} />);
});

test('Test if Legend component contains all of this', () => {
    expect(wrapper.state('collapse')).toEqual(false);
    const mockCallBack = jest.fn();
    const button = shallow((<Button onClick={mockCallBack} className="control-button">{"<"}</Button>));
    button.find('button').simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(1);
    expect(wrapper.find('.control-legend').length).toBe(1);
});