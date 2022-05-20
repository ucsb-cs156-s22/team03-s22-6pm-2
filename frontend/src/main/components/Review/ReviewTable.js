import OurTable, { _ButtonColumn} from "main/components/OurTable";
// import { useBackendMutation } from "main/utils/useBackend";
// import {  onDeleteSuccess } from "main/utils/UCSBDateUtils"
// import { useNavigate } from "react-router-dom";
// import { hasRole } from "main/utils/currentUser";


export default function ReviewTable({ review, _currentUser }) {
import OurTable, { ButtonColumn} from "main/components/OurTable";
import { useBackendMutation } from "main/utils/useBackend";
import { onDeleteSuccess } from "main/utils/UCSBDateUtils"
// import { useNavigate } from "react-router-dom";
import { hasRole } from "main/utils/currentUser";


export function cellToAxiosParamsDelete(cell) {
    return {
        url: "/api/MenuItemReview",
        method: "DELETE",
        params: {
            id: cell.row.values.id
        }
    }
}

export default function ReviewTable({ review, currentUser }) {

    // const navigate = useNavigate();

    // const editCallback = (cell) => {
    //     navigate(`/ucsbdates/edit/${cell.row.values.id}`)
    // }


    // Stryker disable next-line all : TODO try to make a good test for this
    const deleteMutation = useBackendMutation(
        cellToAxiosParamsDelete,
        { onSuccess: onDeleteSuccess },
        ["/api/MenuItemReview/all"]
    );
    // Stryker enable all 

    // Stryker disable next-line all : TODO try to make a good test for this
    const deleteCallback = async (cell) => { deleteMutation.mutate(cell); }

    const columns = [
        {
            Header: 'id',
            accessor: 'id', 
        },
        {
            Header: 'itemID',
            accessor: 'itemId', 
        },
        {
            Header: 'reviewerEmail',
            accessor: 'reviewerEmail',
        },
        {
            Header: 'stars',
            accessor: 'stars', // needed for tests
        },
        {
            Header: 'date reviewed',
            accessor: 'dateReviewed', // needed for tests

        },
        {
            Header: 'comments?',
            accessor: 'comments', // needed for tests
        },
    ];


    const testid = "ReviewTable";

    const columnsIfAdmin = [
        ...columns,
        // ButtonColumn("Edit", "primary", editCallback, testid),
        ButtonColumn("Delete", "danger", deleteCallback, testid)
    ];

    const columnsToDisplay = hasRole(currentUser, "ROLE_ADMIN") ? columnsIfAdmin : columns;

    return <OurTable
        data={review}
        columns={columnsToDisplay}
        testid={"ReviewTable"}
    />;
};