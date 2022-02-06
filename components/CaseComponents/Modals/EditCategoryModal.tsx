import React, { useState } from "react";
import StyledModal from "./StyledModal";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { useMutation, useQuery } from "urql";
import {
  ManagementCategory,
  ManagementContainerQuery,
} from "../CaseManagementContainer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: "25ch",
    },
  })
);

type EditCategoryModalProps = {
  open: boolean;
  onClose: () => void;
};


const EditCategoryMutation = `
  mutation EditCategoryMutation ($id: bigint!, $description: String, $name: String) {
    update_category_by_pk(pk_columns: {id: $id}, _set: {description: $description, name: $name}) {
      id
      description
      name
    }
  }
`;

const EditCategoryModal: React.FC<EditCategoryModalProps> = (props) => {
  const classes = useStyles();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<number | null>(null);
  const [{ data, fetching, error }, executeQuery] = useQuery({
    query: ManagementContainerQuery,
  });

  const [result, executeMutation] = useMutation(EditCategoryMutation);

  return (
    <StyledModal open={props.open} onClose={props.onClose}>
      <Typography variant="h4" align="center">
        Edit Category
      </Typography>
      <Box>
      {data ? (
          <FormControl fullWidth>
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              labelId="category-select-label"
              fullWidth
              value={category}
              onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                setCategory(event.target.value as number);
              }}
            >
              {data.category.map((categoryList:any) => (
                <MenuItem key={categoryList.id} value={categoryList.id} >
                  {categoryList.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : fetching ? (
          "Loading Categories"
        ) : null}
        <TextField
          id="standard-full-width"
          label="Name"
          placeholder={(data && category) ? data.category.filter((categoryEdit:any) => categoryEdit.id === category)[0].name : 'Edit Name'}
          fullWidth
          margin="normal"
          value={name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setName(event.target.value);
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="standard-full-width"
          label="Description"
          placeholder={(data && category) ? data.category.filter((categoryEdit:any) => categoryEdit.id === category)[0].description : 'Edit Description'}
          fullWidth
          margin="normal"
          value={description}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setDescription(event.target.value);
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Box>
      <Box mt="10px" display="flex" justifyContent="center">
        <Button
          variant="outlined"
          onClick={() => {
            executeMutation({
              id: category,
              description,
              name,
            });
            setDescription("")
            setName("")
            setCategory(null)
            props.onClose();
          }}
        >
          Submit
        </Button>
      </Box>
    </StyledModal>
  );
};
export default EditCategoryModal;
