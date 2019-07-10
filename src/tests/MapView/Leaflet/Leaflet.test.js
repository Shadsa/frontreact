import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { TileLayer, Map } from 'react-leaflet';
import Leaflet from '../../../Component/MapView/Leaflet/Leaflet';

import Cluster from '../../../Component/MapView/Leaflet/Cluster/Cluster';
import Legend from '../../../Component/MapView/Leaflet/Legend/Legend';
import Regions from '../../../Component/MapView/Leaflet/Regions/Regions';

configure({ adapter: new Adapter() });

let wrapper;
    
beforeEach(() => {
  wrapper = shallow(<Leaflet lands={[]} minYear={2017} maxYear={2017} />);
});

test('Test if Leaflet contains all required components', () => {
  expect(wrapper.find('.container').length).toBe(1);
  expect(wrapper.find(Map).length).toBe(1);
  expect(wrapper.contains(
    <TileLayer attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors" url={'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'} />
  )).toEqual(true);
  expect(wrapper.contains(<Cluster lands={[]} minYear={2017} maxYear={2017} zoom={5} />)).toEqual(true);
  expect(wrapper.contains(<Legend landGroup={{city:false, agriculture:false, forest:false, water:false}} zoom={5} />)).toEqual(true);
  expect(wrapper.contains(<Regions />)).toEqual(true);
});