import React from 'react';

import MenuItemTable from 'main/components/Menu/MenuItemTable';
import { menuItemFixtures } from 'fixtures/menuItemFixtures';

export default {
    title: 'components/Menu/MenuItemTable',
    component: MenuItemTable
};

const Template = (args) => {
    return (
        <MenuItemTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    menuItem: []
};

export const ThreeDates = Template.bind({});

ThreeDates.args = {
    menuItem: menuItemFixtures.threeMenuItems
};


