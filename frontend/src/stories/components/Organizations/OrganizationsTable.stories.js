import React from 'react';

import OrganizationsTable from "main/components/Organizations/OrganizationsTable";
import { OrganizationsFixtures } from 'fixtures/organizationsFixtures';

export default {
    title: 'components/Organizations/OrganizationsTable',
    component: OrganizationsTable
};

const Template = (args) => {
    return (
        <OrganizationsTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    organizations: []
};

export const ThreeOrganizations = Template.bind({});

ThreeOrganizations.args = {
    organizations: OrganizationsFixtures.threeOrganizations
};
