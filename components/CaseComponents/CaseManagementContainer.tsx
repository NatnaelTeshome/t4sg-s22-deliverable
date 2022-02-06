import React from "react";
import Button from "react-bootstrap/Button";
import { Container } from "reactstrap";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import "../../styles/casemanagement.module.css";
import Footer from "./Footer";
import CaseCategory from "./CaseCategory";
import AddCaseModal from "./Modals/AddCaseModal";
import { useQuery } from "urql";
import AddCategoryModal from "./Modals/AddCategoryModal";
import DeleteCategoryModal from "./Modals/DeleteCategoryModal"
import EditCategoryModal from "./Modals/EditCategoryModal"
import { CenterFocusStrong } from "@material-ui/icons";

export const ManagementContainerQuery = `
  query QueryCatergory {
    category {
      id
      name
      description
      cases {
        description
        id
        name
        status
        category_id
      }
    }
  }
`;

export type ManagementCategory = {
  id: number;
  name: string;
};

const CaseManagementContainer: React.FC = (props) => {
  const [addCaseModalOpen, setAddCaseModalOpen] =
    React.useState<boolean>(false);
  const [addCategoryModalOpen, setAddCategoryModalOpen] =
    React.useState<boolean>(false);
  const [deleteCategoryModalOpen, setDeleteCategoryModalOpen] =
    React.useState<boolean>(false);
  const [editCategoryModalOpen, setEditCategoryModalOpen] =
    React.useState<boolean>(false);
  /* NOTE: This uses */
  const [{ data, fetching, error }, executeQuery] = useQuery({
    query: ManagementContainerQuery,
  });

  return (
    <>
      <h1 className="title" style={{
          color: "crimson",
          fontWeight: "bold",
          fontFamily: "fantasy",
          marginBottom: "2rem",
        }}>
      Home Page
      </h1>
      <Grid container spacing={3}>
        { data ? (data.category.map(caseCategory => <CaseCategory key={caseCategory.id} category_id={caseCategory.id } />)): fetching ? (
          "Loading"
        ) : null}
      </Grid>

      <AddCaseModal
        onClose={() => setAddCaseModalOpen(false)}
        open={addCaseModalOpen}
      />

      <AddCategoryModal
        onClose={() => setAddCategoryModalOpen(false)}
        open={addCategoryModalOpen}
      />

      <DeleteCategoryModal
        onClose={() => setDeleteCategoryModalOpen(false)}
        open={deleteCategoryModalOpen}
      />

      <EditCategoryModal
        onClose={() => setEditCategoryModalOpen(false)}
        open={editCategoryModalOpen}
      />


      <Container
        style={{
          borderStyle: "solid",
          padding: "0.75rem",
          marginTop: "1rem",
          display: "flex",
          justifyContent: "space-around",
          width: "100%",
          backgroundColor: "greenyellow"
        }}
      >
        <Button variant="secondary" onClick={() => setAddCategoryModalOpen(true)}>
          Add Category
        </Button>

        <Button variant="secondary" onClick={() => setAddCaseModalOpen(true)}>
          Add Case
        </Button>
        <Button variant="secondary" onClick={() => setDeleteCategoryModalOpen(true)}>
          Delete Category
        </Button>
        <Button variant="secondary" onClick={() => setEditCategoryModalOpen(true)}>
          Edit Category
        </Button>
      </Container>
    </>
  );
};
export default CaseManagementContainer;
