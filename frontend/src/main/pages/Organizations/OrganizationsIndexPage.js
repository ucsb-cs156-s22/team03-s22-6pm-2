import React from 'react'
import { useBackend } from 'main/utils/useBackend'; // use prefix indicates a React Hook

import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
//import OrganizatinsTable from 'main/components/Organizations/Organizations';
import { useCurrentUser } from 'main/utils/currentUser' // use prefix indicates a React Hook

export default function OrganizationsIndexPage() {

  const _currentUser = useCurrentUser();

  const { data: _organizations, error: _error, status: _status } =
    useBackend(
      // Stryker disable next-line all : don't test internal caching of React Query
      ["/api/organization/all"],
            // Stryker disable next-line StringLiteral,ObjectLiteral : since "GET" is default, "" is an equivalent mutation
            { method: "GET", url: "/api/organization/all" },
      []
    );

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>UCSB Organizations Placeholder</h1>
        {/*<DiningCommonsTable diningCommons={diningCommons} currentUser={currentUser} />*/}
      </div>
    </BasicLayout>
  )
}