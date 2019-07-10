import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { GeoJSON } from 'react-leaflet';
import Regions from '../../../../Component/MapView/Leaflet/Regions/Regions';


configure({ adapter: new Adapter() });

let wrapper;
    
beforeEach(() => {
    wrapper = shallow(<Regions />);
});

test('Test if Regions component contains GeoJSON component', () => {
    expect(wrapper.find(GeoJSON).length).toBe(1);
});
