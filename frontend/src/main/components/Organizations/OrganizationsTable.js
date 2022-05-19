import OurTable, { _ButtonColumn } from "main/components/OurTable";
import { _useBackendMutation } from "main/utils/useBackend";
import { _cellToAxiosParamsDelete, _onDeleteSuccess } from "main/utils/UCSBDateUtils"
import { _useNavigate } from "react-router-dom";
import { hasRole } from "main/utils/currentUser";

export default function OrganizationsTable({ organizations, currentUser }) {
    /*
    const navigate = useNavigate();

    const editCallback = (cell) => {
        navigate(`/ucsborganization/edit/${cell.row.values.id}`)
    }
    */
    // Stryker disable all : hard to test for query caching
    /*
    const deleteMutation = useBackendMutation(
        cellToAxiosParamsDelete,
        { onSuccess: onDeleteSuccess },
        ["/api/ucsborganization/all"]
    );*/
    // Stryker enable all 

    // Stryker disable next-line all : TODO try to make a good test for this
    //const _deleteCallback = async (cell) => { deleteMutation.mutate(cell); }

    const columns = [
        {
            Header: 'Org Code',
            accessor: 'orgCode', // accessor is the "key" in the data
        },
        {
            Header: 'Org Translation Short',
            accessor: 'orgTranslationShort',
        },
        {
            Header: 'Org Translation',
            accessor: 'orgTranslation',
        },
        {
            Header: 'Inactive',
            accessor: 'inactive'//(row, _rowIndex) => String(row.inactive),
        }
    ];

    const columnsIfAdmin = [
        ...columns,
        //ButtonColumn("Edit", "primary", editCallback, "UCSBDatesTable"),
        //ButtonColumn("Delete", "danger", deleteCallback, "UCSBDatesTable")
    ];

    const columnsToDisplay = hasRole(currentUser, "ROLE_ADMIN") ? columnsIfAdmin : columns;

    return <OurTable
        data={organizations}
        columns={columnsToDisplay}
        testid={"OrganizationsTable"}
    />;
};