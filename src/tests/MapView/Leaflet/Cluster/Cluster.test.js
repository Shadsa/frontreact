import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Cluster from '../../../../Component/MapView/Leaflet/Cluster/Cluster';

import DataEnancer from '../../../../Component/MapView/Leaflet/Cluster/DataEnancer/DataEnancer';

configure({ adapter: new Adapter() });

let wrapper;
    
beforeEach(() => {
  wrapper = shallow(<Cluster lands={[]} minYear={2017} maxYear={2017} zoom={5} />);
});

test('Test if Cluster contains DataEnancer', () => {
    expect(wrapper.contains(<DataEnancer lands={[]} zoom={5} />)).toEqual(true);
});