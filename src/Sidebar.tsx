import { Avatar, Chip, Stack, Typography } from "@mui/joy";
import Input from "@mui/joy/Input";
import Sheet from "@mui/joy/Sheet";
import { useContext, useState } from "react";
import { User } from './MessagesPane.tsx';
import { IssueContext } from './issueContext.jsx';

export default function Sidebar() {
  const { state,updateIssuePrompt } = useContext<any>(IssueContext);
  const [issuePrompt, setIssuePrompt] = useState<string>("facebook/react/issues/7901");
  const users: User[] = [];
  
  const { comments } = state;

  console.log('comments',comments?.data);

  // Calculate the number of messages per user
  const messagesPerUser = comments.reduce((acc, comment) => {
    acc[comment.user.login] = (acc[comment.user.login] || 0) + 1;
    return acc;
  }, {});

  const handleIssueChange = (issueNumber: string) => {
    setIssuePrompt(issueNumber);
    updateIssuePrompt(issueNumber);
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
      <hr/>
      {users?.map((user: User) => (
        <Stack direction="row" alignItems="center" spacing={1}>
          <Avatar size="sm" variant="solid" src={user.avatar_url} />
          <Typography level="body-sm">{user.login}</Typography>
          <Chip variant="outlined" size="sm" color="neutral">
            {messagesPerUser[user.login] || 0} messages
          </Chip>
        </Stack>
      ))}
    </Sheet>
  );
}