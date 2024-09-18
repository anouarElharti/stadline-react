import { Avatar, Chip, Stack, Typography } from "@mui/joy";
import Input from "@mui/joy/Input";
import Sheet from "@mui/joy/Sheet";
import { useEffect, useState } from "react";
import { Comment, User } from './MessagesPane.tsx';
import { useIssueContext } from './issueContext.jsx';

export default function Sidebar() {
  const { state, updateIssuePrompt, updateFilteredUsers } = useIssueContext();
  const [issuePrompt, setIssuePrompt] = useState<string>("facebook/react/issues/7901");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [userList, setUserList] = useState<User[]>([]);
  const [messagePerUser, setCountMessagePerUser] = useState<{ [key: string]: number }>({});
  
  const { comments } = state;

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
  
  useEffect(() => {
    const users = Array.isArray(comments) ? comments.reduce((acc, comment) => {
      if (comment.user) {
        acc.push(comment.user);
      }
      return acc;
    }, []) : [];
    setUserList(users);
  }, [comments]);

  useEffect(() => {
    const messagesPerUser = Array.isArray(comments)
    ? comments.reduce((acc, comment: Comment) => {
        acc[comment.user.login] = (acc[comment.user.login] || 0) + 1;
        return acc;
      }, {})
      : {};
    setCountMessagePerUser(messagesPerUser);
  }, [comments]);

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
      {userList?.map((user: User) => (
        <Stack direction="row" alignItems="center" spacing={1}>
          <Avatar size="sm" variant="solid" src={user.avatar_url} />
          <Typography level="body-sm">
            {user.login}
            <input type="checkbox" checked={filteredUsers.some((filteredUser: User) => filteredUser.login === user.login)} onChange={() => handleUserFilter(user)}/>
          </Typography>
          <Chip variant="outlined" size="sm" color="neutral">
            {messagePerUser[user.login] || 0} messages
          </Chip>
        </Stack>
      ))}
    </Sheet>
  );
}