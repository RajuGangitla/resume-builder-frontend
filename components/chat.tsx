'use client';

import { SetStateAction, useState } from 'react';
import { MultimodalInput } from './multimodal-input';
import { Messages } from './messages';
import { handleAgentApiCall } from '@/utils/streaming';
import ResumeForm from './resume-section';
import { Resume } from '@/types/resume';
import { v4 as uuidv4 } from 'uuid';
import { motion, AnimatePresence } from "framer-motion"
import { Button } from './ui/button';
import ResumePreview from './resume-preview';


export function Chat() {
  const [messages, setMessages] = useState<any>([]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [uuid, setUuid] = useState(uuidv4())
  const [showResume, setShowResume] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [resume, setResume] = useState<Resume>({
    personal_section: {
      name: "",
      email: "",
      phone: "",
      github: "",
      linkedin: "",
    },
    experience_section: [],
    education_section: null,
    projects_section: [],
    skills_section: {
      languages: [],
      frameworks: [],
      developer_tools: [],
      libraries: [],
    },
  });

  // async function handleApiCall(message: string) {
  //   try {
  //     setMessages((prevMessages: any) => [
  //       ...prevMessages,
  //       { role: "assistant", content: "" }, // Empty content for now
  //     ]);
  //     const stream = await handleAgentApiCall(message, messages);
  //     let accumulatedMessage = "";

  //     for await (const chunk of stream) {
  //       accumulatedMessage += chunk;

  //       // Update the last message in the messages array
  //       setMessages((prevMessages: any) => {
  //         const updatedMessages = [...prevMessages];
  //         updatedMessages[updatedMessages.length - 1].content = accumulatedMessage;
  //         return updatedMessages;
  //       });
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //     setMessages((prevMessages: any) => [
  //       ...prevMessages,
  //       { role: 'assistant', content: 'Sorry, there was an error processing your request.' },
  //     ]);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  async function handleApiCall(message: string) {
    try {
      setMessages((prevMessages: any) => [
        ...prevMessages,
        { role: "assistant", content: "" }, // Empty content for now
      ]);
      const stream = await handleAgentApiCall(message, uuid);
      setResume(stream?.resume_data)
      console.log(stream?.resume_data, "stream?.resume_data")
      setMessages((prevMessages: any) => {
        const updatedMessages = [...prevMessages];
        updatedMessages[updatedMessages.length - 1].content = stream?.content
        return updatedMessages;
      });
      const hasContent = Object.values(stream?.resume_data || {}).some((section) => {
        if (Array.isArray(section)) {
          return section.length > 0; // ✅ Ensures arrays are not empty
        } else if (typeof section === "object" && section !== null) {
          return Object.keys(section).length > 0 && Object.values(section).some((value) => {
            if (Array.isArray(value)) return value.length > 0; // ✅ Handles nested arrays like skills
            return value !== "" && value !== null; // ✅ Ensures non-empty strings
          });
        }
        return section !== ""; // ✅ Ensures non-empty strings at root level
      });
      console.log(hasContent, "hasContent")
      setShowResume(hasContent)
    } catch (error) {
      console.error('Error:', error);
      setMessages((prevMessages: any) => [
        ...prevMessages,
        { role: 'assistant', content: 'Sorry, there was an error processing your request.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  console.log(resume, "serus")

  const handleSubmit = async (message: string) => {
    setIsLoading(true);
    setMessages((prevMessages: any) => [
      ...prevMessages,
      { role: 'user', content: message }
    ]);
    setInput("");
    handleApiCall(message)
  };


  return (
    <>
      <div className="flex h-dvh">
        <motion.div
          className="flex flex-col bg-background"
          initial={{ width: "100%" }}
          animate={{ width: showResume ? "50%" : "100%" }}
          transition={{ duration: 0.5 }}
        >
          <Messages isLoading={isLoading} messages={messages} />
          <form className="flex mx-auto px-4 bg-background pb-4 md:pb-6 gap-2 w-full md:max-w-3xl">
            <MultimodalInput
              input={input}
              setInput={setInput}
              isLoading={isLoading}
              messages={messages}
              setMessages={setMessages}
              onSubmit={handleSubmit}
            />
          </form>
        </motion.div>
        <AnimatePresence>
          <ResumePreview showResume={showResume} showPreview={showPreview} setShowPreview={setShowPreview} resume={resume} setResume={setResume} />
        </AnimatePresence>
      </div>
    </>
  );
}
