import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Range } from 'rc-slider';
import YearSelector from '../../../Component/MapView/YearSelector/YearSelector';

configure({ adapter: new Adapter() });

let wrapper;
const mockCallBack = jest.fn();

beforeEach(() => {
    wrapper = shallow(<YearSelector onHandleYearChange={mockCallBack} minYear={2017} maxYear={2017} />);
});

test('Test if YearSelector component contains a div and Range component', () => {
    expect(wrapper.find('.yearSelectorBlock').length).toBe(1);
    expect(wrapper.find(Range).length).toBe(1);
});