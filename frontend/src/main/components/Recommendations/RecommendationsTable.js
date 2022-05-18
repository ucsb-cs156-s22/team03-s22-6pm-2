import OurTable, { ButtonColumn} from "main/components/OurTable";
import { useBackendMutation } from "main/utils/useBackend";
import {  onDeleteSuccess } from "main/utils/UCSBDateUtils"
// import { useNavigate } from "react-router-dom";
import { hasRole } from "main/utils/currentUser";


export function cellToAxiosParamsDelete(cell) {
    return {
        url: "/api/Recommendation",
        method: "DELETE",
        params: {
            id: cell.row.values.id
        }
    }
}

export default function RecommendationsTable({ recommendations, currentUser }) {

    // const navigate = useNavigate();

    // const editCallback = (cell) => {
    //     navigate(`/ucsbdates/edit/${cell.row.values.id}`)
    // }

    // Stryker disable all : hard to test for query caching
    const deleteMutation = useBackendMutation(
        cellToAxiosParamsDelete,
        { onSuccess: onDeleteSuccess },
        ["/api/Recommendation/all"]
    );
    // Stryker enable all 

    // Stryker disable next-line all : TODO try to make a good test for this
    const deleteCallback = async (cell) => { deleteMutation.mutate(cell); }

    const columns = [
        {
            Header: 'Id',
            accessor: 'id', 
        },
        {
            Header: 'Date Needed',
            accessor: 'dateNeeded',
        },
        {
            Header: 'Date Requested',
            accessor: 'dateRequested',
        },
        {
            Header: 'Done',
            id: 'done',
            accessor: (row, _rowIndex) => String(row.done)
        },
        {
            Header: 'Explanation',
            accessor: 'explanation',
        },
        {
            Header: 'Professor Email',
            accessor: 'professorEmail',
        },
        {
            Header: 'Requester Email',
            accessor: 'requesterEmail',
        }
    ];

    const testid = "RecommendationsTable";

    const columnsIfAdmin = [
        ...columns,
        // ButtonColumn("Edit", "primary", editCallback, testid),
        ButtonColumn("Delete", "danger", deleteCallback, testid)
    ];

    const columnsToDisplay = hasRole(currentUser, "ROLE_ADMIN") ? columnsIfAdmin : columns;

    return <OurTable
        data={recommendations}
        columns={columnsToDisplay}
        testid={testid}
    />;
};