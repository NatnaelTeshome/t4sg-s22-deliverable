import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardTitle,
  CardSubtitle,
  CardText,
} from "reactstrap";
import { useQuery, useMutation } from "urql";
import { Box } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

type CaseCardProps = {
  data: CaseData;
};

export type TagData = {
  name: string;
  id?: number;
};

export type CaseData = {
  name: string;
  status: string;
  description: string;
  id: number;
  cases_tags?: [TagData];
};

const DeleteCaseMutation = `
  mutation DeleteCase ($id: bigint!) {
    delete_cases_by_pk(id: $id){
      id
    }
  }
`;

const CaseCard: React.FC<CaseCardProps> = (props) => {
  const caseData = props.data;

  const [result, executeMutation] = useMutation(DeleteCaseMutation);

  return (
    <Container>
      <div style={{ width: "100%", padding: "5px" }}>
        <Card body style={{ backgroundColor: "#e4ebf5" }}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
          >
            <CardTitle tag="h2">{caseData.name}</CardTitle>
            <CloseIcon 
            onClick={() => {
              executeMutation({
                id: caseData.id
              });
            }}/>
          </Box>

          <CardSubtitle tag="h4" className="mb-2 text-muted">
            {caseData.status}
          </CardSubtitle>
          <CardText>{caseData.description}</CardText>
          {/*
            ALTERNATE FEATURE 1 TODO:
            Use the data on tags found in props to render out all
            of the tags associated with every case.
          */}

          {/* END TODO */}
        </Card>
      </div>
    </Container>
  );
};
export default CaseCard;
