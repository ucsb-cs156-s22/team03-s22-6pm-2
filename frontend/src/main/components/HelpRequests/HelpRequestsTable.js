import OurTable, { ButtonColumn} from "main/components/OurTable";
import { useBackendMutation } from "main/utils/useBackend";
import {  onDeleteSuccess } from "main/utils/UCSBDateUtils"
// import { useNavigate } from "react-router-dom";
import { hasRole } from "main/utils/currentUser";


export function cellToAxiosParamsDelete(cell) {
    return {
        url: "/api/HelpRequest",
        method: "DELETE",
        params: {
            id: cell.row.values.id
        }
    }
}

export default function HelpRequestsTable({ helpRequests, currentUser }) {

    // const navigate = useNavigate();

    // const editCallback = (cell) => {
    //     navigate(`/ucsbdates/edit/${cell.row.values.id}`)
    // }

    // Stryker disable all : hard to test for query caching
    
    const deleteMutation = useBackendMutation(
        cellToAxiosParamsDelete,
        { onSuccess: onDeleteSuccess },
        ["/api/HelpRequest/all"]
    );
    
    // Stryker enable all 

    // Stryker disable next-line all : TODO try to make a good test for this
    const deleteCallback = async (cell) => { deleteMutation.mutate(cell); }

    const columns = [
        {
            Header: 'Explanation',
            accessor: 'explanation'
        },
        {
            Header: 'ID',
            accessor: 'id'
        },
        {
            Header: 'RequestTime',
            accessor: 'requestTime'
        },
        {
            Header: 'Solved',
            id: 'solved',
            accessor: (row, _rowIndex) => String(row.solved) // hack needed for boolean values to show up
        },
        {
            Header: 'TableOrBreakoutRoom',
            accessor: 'tableOrBreakoutRoom'
        },
        {
            Header: 'TeamID',
            accessor: 'teamId'
        },
    ];

    const testid = "HelpRequestsTable";

    const columnsIfAdmin = [
        ...columns,
        // ButtonColumn("Edit", "primary", editCallback, testid),
        ButtonColumn("Delete", "danger", deleteCallback, testid)
    ];

    const columnsToDisplay = hasRole(currentUser, "ROLE_ADMIN") ? columnsIfAdmin : columns;

    return <OurTable
        data={helpRequests}
        columns={columnsToDisplay}
        testid={testid}
    />;
};