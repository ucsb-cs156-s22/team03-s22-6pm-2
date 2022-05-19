import OurTable, { ButtonColumn } from "main/components/OurTable";
import { useBackendMutation } from "main/utils/useBackend";
import { onDeleteSuccess } from "main/utils/UCSBDateUtils"
//import { _useNavigate } from "react-router-dom";
import { hasRole } from "main/utils/currentUser";

export function cellToAxiosParamsDelete(cell) {
    return {
        url: "/api/ucsbdates",
        method: "DELETE",
        params: {
            orgCode: cell.row.values.orgCode
        }
    }
}

export default function UCSBOrganizationsTable({ organizations, currentUser }) {
    /*
    const navigate = useNavigate();

    const editCallback = (cell) => {
        navigate(`/ucsborganization/edit/${cell.row.values.id}`)
    }
    */
    // Stryker disable all : hard to test for query caching
    const deleteMutation = useBackendMutation(
        cellToAxiosParamsDelete,
        { onSuccess: onDeleteSuccess },
        ["/api/ucsborganization/all"]
    );
    // Stryker enable all 

    // Stryker disable next-line all : TODO try to make a good test for this
    const deleteCallback = async (cell) => { deleteMutation.mutate(cell); }

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
            Header: 'Inactive?',
            accessor: (row, _rowIndex) => String(row.inactive),
        }
    ];

    const columnsIfAdmin = [
        ...columns,
        //ButtonColumn("Edit", "primary", editCallback, "UCSBOrganizationsTable"),
        ButtonColumn("Delete", "danger", deleteCallback, "UCSBOrganizationsTable", "orgCode")
    ];

    const columnsToDisplay = hasRole(currentUser, "ROLE_ADMIN") ? columnsIfAdmin : columns;

    return <OurTable
        data={organizations}
        columns={columnsToDisplay}
        testid={"UCSBOrganizationsTable"}
    />;
};