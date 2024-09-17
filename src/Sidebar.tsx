import { Avatar, Chip, Stack, Typography } from "@mui/joy";
import Input from "@mui/joy/Input";
import Sheet from "@mui/joy/Sheet";
import { useContext, useState } from "react";
import { Comment, User } from './MessagesPane.tsx';
import { IssueContext } from './issueContext.jsx';

export default function Sidebar() {
  const { state, updateIssuePrompt, updateFilteredUsers } = useContext<any>(IssueContext);
  const [issuePrompt, setIssuePrompt] = useState<string>("facebook/react/issues/7901");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  
  const { comments } = state;
  const users: User[] = comments?.data.filter((comment:Comment) => comment.user.login != '');

  console.log('comments',comments?.data);
  console.log('users',users);

  const messagesPerUser = comments.reduce((acc, comment: Comment) => {
    acc[comment.user.login] = (acc[comment.user.login] || 0) + 1;
    return acc;
  }, {});

  const handleIssueChange = (issueNumber: string) => {
    setIssuePrompt(issueNumber);
    updateIssuePrompt(issueNumber);
  };

  const handleUserFilter = (filteredUser:User) => {
    if (filteredUsers.some((user: User) => user.login === filteredUser.login)) {
      updateFilteredUsers(filteredUsers.filter((user:User) => user.login !== filteredUser.login));
    } else {
      updateFilteredUsers([...filteredUsers, filteredUser]);
    }
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
          <Typography level="body-sm">
            {user.login}
            <input type="checkbox" checked={filteredUsers.some((filteredUser: User) => filteredUser.login === user.login)} onChange={() => handleUserFilter(user)}/>
          </Typography>
          <Chip variant="outlined" size="sm" color="neutral">
            {messagesPerUser[user.login] || 0} messages
          </Chip>
        </Stack>
      ))}
    </Sheet>
  );
}