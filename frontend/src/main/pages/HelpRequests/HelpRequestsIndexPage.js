import React from 'react'
import { useBackend } from 'main/utils/useBackend'; // use prefix indicates a React Hook

import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import HelpRequestsTable from 'main/components/HelpRequests/HelpRequestsTable';
import { useCurrentUser } from 'main/utils/currentUser' // use prefix indicates a React Hook

export default function HelpRequestsIndexPage() {

  const currentUser = useCurrentUser();

  const { data: helpRequests, error: _error, status: _status } =
    useBackend(
      // Stryker disable next-line all : don't test internal caching of React Query
      ["/api/HelpRequest/all"],
            // Stryker disable next-line StringLiteral,ObjectLiteral : since "GET" is default, "" is an equivalent mutation
            { method: "GET", url: "/api/HelpRequest/all" },
      []
    );

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Help Requests</h1>
        <HelpRequestsTable helpRequests={helpRequests} currentUser={currentUser} />
      </div>
    </BasicLayout>
  )
}