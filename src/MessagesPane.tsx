import Chip from "@mui/joy/Chip";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { useContext, useEffect } from "react";
import ChatBubble from "./ChatBubble";
import { IssueContext } from './issueContext.jsx';
import useFetch from "./useFetch";


export type User = {
  login: string;
  avatar_url: string;
};

type Issue = {
  id: number;
  created_at: string;
  user: User;

  number: number;
  title: string;
  body: string;
  comments_url: string;
};

export type Comment = {
  id: number;
  created_at: string;
  user: User;

  body: string;
};

export default function MessagesPane() {
  const { state, updateComments, filteredComments } = useContext(IssueContext);
  const { issuePrompt } = state;
  const issue = useFetch<Issue>({ url: `https://api.github.com/repos/${issuePrompt}` });
  const comments = useFetch<Comment[]>({ url: issue.data?.comments_url }, { enabled: issue.isFetched });
  
  useEffect(() => {
    updateComments(filteredComments?.length > 0 ? filteredComments : comments);
  }, [comments, filteredComments]);

  return (
    <Sheet
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "background.level1",
      }}
    >
      {issue.data && (
        <Stack
          direction="column"
          justifyContent="space-between"
          sx={{
            borderBottom: "1px solid",
            borderColor: "divider",
            backgroundColor: "background.body",
          }}
          py={{ xs: 2, md: 2 }}
          px={{ xs: 1, md: 2 }}
        >
          <Typography
            fontWeight="lg"
            fontSize="lg"
            component="h2"
            noWrap
            endDecorator={
              <Chip
                variant="outlined"
                size="sm"
                color="neutral"
                sx={{
                  borderRadius: "sm",
                }}
              >
                #{issue.data?.number}
              </Chip>
            }
          >
            {issue.data.title}
          </Typography>
          <Typography level="body-sm">{issue.data.user.login}</Typography>
        </Stack>
      )}
      {comments.data && (
        <Stack spacing={2} justifyContent="flex-end" px={2} py={3}>
          <ChatBubble variant="solid" {...issue.data!} />
          {comments.data.map((comment) => (
            <ChatBubble
              key={comment.id}
              variant={comment.user.login === issue.data!.user.login ? "solid" : "outlined"}
              {...comment}
            />
          ))}
        </Stack>
      )}
    </Sheet>
  );
}
