import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactDOM from 'react-dom';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import DataEnancer from '../../../../../Component/MapView/Leaflet/Cluster/DataEnancer/DataEnancer';


configure({ adapter: new Adapter() });

let wrapper;
    
beforeEach(() => {
  wrapper = shallow(<DataEnancer lands={[]} zoom={5} />);
});

test('Render without crash', () => {
    const div = document.createElement('div');
    ReactDOM.render(<DataEnancer lands={[]} zoom={5} />, div);
    ReactDOM.unmountComponentAtNode(div);
});

test('Test if DataEnancer not contains MarkerClusterGroup', () => {
    expect(wrapper.contains(<MarkerClusterGroup />)).toEqual(false);
});