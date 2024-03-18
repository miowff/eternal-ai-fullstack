"use client";
import { useEffect, useLayoutEffect, useState } from "react";
import { IndividualMessage } from "../IndividualMessage/IndividualMessage";
import { UserMessage } from "../UserMessage/UserMessage";
import "./MessagesList.css";
import Spinner from "../../../../public/ButtonSpinner.svg";
import Image from "next/image";
import { ChatMessage, Message } from "@/models/message";
import { useInView } from "react-intersection-observer";
import { BASE_URL } from "@/constants/api";
import { useSession } from "next-auth/react";
import { Toaster, toast } from "sonner";
import { useEnterKeyHandler } from "@/utils/handleEnterKey";
const limit = 10;
interface Props {
  individual: string;
  individualPortrait: string;
}
export const MessagesList = ({ individual, individualPortrait }: Props) => {
  let { data: session } = useSession({ required: false });
  const [messages, setMessages] = useState<Message[]>([]);
  let [page, setPage] = useState(1);
  const [question, setQuestion] = useState("");
  const [isMoreMessages, setIsMoreMessages] = useState(true);
  const [isDataSending, setDataSending] = useState(false);
  const [isMessagesLoading, setIsMessagesLoading] = useState(true);
  const { ref, inView } = useInView();
  const getAnswer = async () => {
    setDataSending(true);
    setQuestion("");
    messages.unshift({ text: question, fromUser: true });
    messages.unshift({
      text: null,
      fromUser: false,
    });
    const res = await fetch(`${BASE_URL}/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.token}`,
      },
      body: JSON.stringify({ message: question, famousPersonName: individual }),
    });
    const response = await res.json();
    if (!res.ok) {
      toast(response.message, {
        style: {
          background: "#F82D98",
          border: "none",
          fontSize: "18px",
          color: "white",
          fontFamily: "Avenir",
          justifyContent: "center",
        },
      });
      messages.pop();
    }
    messages[0].text = response.answer;
    setMessages(messages);
    setPage(page + 1);
    setDataSending(false);
  };
  useEnterKeyHandler(() => {
    if (question.length !== 0) {
      getAnswer();
    }
  });
  const fetchMessages = async () => {
    const res = await fetch(
      `${BASE_URL}/messages-by-famous-person?page=${page}&limit=${limit}&famous-person-name=${individual}`,
      {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
        method: "GET",
      }
    );
    const chatLog = (await res.json()) as ChatMessage[];
    return chatLog.map((message) => {
      return { text: message.content, fromUser: message.fromUser };
    });
  };
  useLayoutEffect(() => {
    const getChatLog = async () => {
      const chatLog = await fetchMessages();
      setMessages(chatLog);
      setPage(page + 1);
      setIsMessagesLoading(false);
    };
    getChatLog();
    const preparedQuestion = sessionStorage.getItem("QUESTION");
    if (preparedQuestion) {
      setQuestion(preparedQuestion);
      sessionStorage.removeItem("QUESTION");
    }
  }, []);
  useEffect(() => {
    const getChatLog = async () => {
      const chatLog = await fetchMessages();
      if (chatLog.length < limit) {
        setIsMoreMessages(false);
      }
      setMessages(messages.concat(chatLog));
      setPage(page + 1);
    };
    if (inView) {
      if (isMoreMessages) {
        getChatLog();
      }
    }
  }, [inView]);
  return (
    <div className="messages-list">
      <Toaster position="top-center" />
      <div className="messages-list-messages">
        <>
          {isMessagesLoading ? (
            <div className="messages-loader-container">
              <Image className="messages-spinner" src={Spinner} alt="loading" />
            </div>
          ) : (
            <>
              {messages.map((message, i) => {
                const { fromUser, text } = message;
                return (
                  <div
                    className="messages-container"
                    key={i}
                    ref={i === messages.length - 1 ? ref : undefined}
                  >
                    {fromUser ? (
                      <UserMessage message={text as string} />
                    ) : (
                      <IndividualMessage
                        message={text}
                        individualPortraitPath={individualPortrait}
                      />
                    )}
                  </div>
                );
              })}
            </>
          )}
        </>
      </div>
      <div className="messages-list-send-message gradient-border">
        <input
          className="messages-list-send-message-input"
          placeholder="Enter your message..."
          value={question}
          onChange={(e) => {
            setQuestion(e.target.value);
          }}
        ></input>
        <button
          className="messages-list-send-message-button gradient-button"
          disabled={question.length === 0}
          onClick={() => {
            getAnswer();
          }}
        >
          {isDataSending ? (
            <Image className="button-spinner" src={Spinner} alt="loading" />
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </div>
  );
};
