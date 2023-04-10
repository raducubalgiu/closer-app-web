import {
  Container,
  Stack,
  Box,
  Typography,
  Button,
  Avatar,
  TextField,
  ListItemButton,
} from "@mui/material";
import React, { useState } from "react";
import { useGet, usePost } from "@/hooks/useHttp";
import { useAuth } from "../../../context/auth";

const Messages = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [message, setMessage] = useState("");

  const { data: chats } = useGet({
    model: "chats",
    uri: `/users/${user?.id}/chats`,
  });

  useGet({
    model: "messages",
    uri: `/users/${user?.id}/chats/${selectedChatId}/messages`,
    enabled: !!selectedChatId,
    onSuccess: (response) => setMessages(response.data.results),
  });

  const { mutate } = usePost({
    uri: `/users/${user?.id}/chats/${selectedChatId}/messages`,
    onSuccess: (response) => {
      setMessage((messages) => messages.concat(response.data.results));
    },
  });

  const handleSendMessage = () => {
    if (message?.length > 0) {
      mutate({ content: { text: message } });
    }
  };

  return (
    <Container>
      <Box sx={styles.box}>
        <Stack flexDirection="row">
          <Box sx={styles.chats}>
            {chats?.results?.map((chat: any, i: number) => {
              return (
                <ListItemButton
                  key={i}
                  selected={selectedChatId === chat.id}
                  onClick={() => setSelectedChatId(chat.id)}
                >
                  <Avatar />
                  <Stack sx={{ marginLeft: 1 }} alignItems="flex-start">
                    <Typography
                      sx={{
                        fontWeight: "600",
                        color: "black",
                        textTransform: "lowercase",
                      }}
                    >
                      {chat.name}
                    </Typography>
                    <p style={{ color: "black", textTransform: "lowercase" }}>
                      {chat.message}
                    </p>
                  </Stack>
                </ListItemButton>
              );
            })}
          </Box>
          <Stack
            sx={styles.messages}
            flexDirection="column"
            justifyContent="space-between"
          >
            <Box sx={{ padding: 2.5 }}>
              {messages?.map((message: any, i: number) => {
                return (
                  <Stack key={i} alignItems="flex-end">
                    <Box
                      sx={{
                        border: 1,
                        borderColor: "#eee",
                        padding: 1.5,
                        borderRadius: 5,
                        width: "50%",
                        marginBottom: 1.5,
                        backgroundColor: "#eee",
                      }}
                    >
                      <Typography>{message.content.text}</Typography>
                    </Box>
                  </Stack>
                );
              })}
            </Box>
            <Stack
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              sx={styles.inputContainer}
            >
              <TextField
                value={message}
                placeholder="Mesaj.."
                fullWidth
                sx={{ marginRight: 1.5, borderRadius: 5 }}
                size="small"
                onChange={(e: any) => setMessage(e.target.value)}
              />
              <Button
                variant="contained"
                sx={{ borderRadius: 5 }}
                onClick={handleSendMessage}
              >
                Submit
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
};

const styles = {
  box: {
    height: "95vh",
    marginTop: "2.5vh",
    border: 1.5,
    borderColor: "#eee",
    borderRadius: 1.5,
  },
  chats: {
    width: "30%",
    padding: 2.5,
    height: "95vh",
    borderRight: 1.5,
    borderColor: "#eee",
  },
  messages: {
    width: "70%",
    height: "95vh",
    flex: 1,
  },
  inputContainer: {
    borderTop: 1.5,
    borderColor: "#eee",
    padding: 2.5,
  },
};

export default Messages;
