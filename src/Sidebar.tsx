import Input from "@mui/joy/Input";
import Sheet from "@mui/joy/Sheet";
import { useContext, useState } from "react";
import { IssueContext } from './issueContext.jsx';

export default function Sidebar() {
  const [issuePrompt, setIssuePrompt] = useState<string>("facebook/react/issues/7901");
  const { dispatch } = useContext<any>(IssueContext);

  const handleIssueChange = (issueNumber:string) => {
    setIssuePrompt(issueNumber);
    dispatch({ type: 'SET_ISSUE_NUMBER', payload: issuePrompt });
  };

  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: "sticky",
        transition: "transform 0.4s, width 0.4s",
        height: "100dvh",
        top: 0,
        p: 2,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRight: "1px solid",
        borderColor: "divider",
      }}
    >
      <Input value={issuePrompt} onChange={(e) => handleIssueChange(e.target.value)} />
    </Sheet>
  );
}
