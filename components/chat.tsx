'use client';

import { useState } from 'react';
import { MultimodalInput } from './multimodal-input';
import { Messages } from './messages';
import { handleAgentApiCall } from '@/utils/streaming';

export function Chat() {
  const [messages, setMessages] = useState<any>([]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);


  async function handleApiCall(message: string) {
    try {

      setMessages((prevMessages: any) => [
        ...prevMessages,
        { role: "assistant", content: "" }, // Empty content for now
      ]);
      const stream = await handleAgentApiCall(message, messages);
      let accumulatedMessage = "";

      for await (const chunk of stream) {
        accumulatedMessage += chunk;

        // Update the last message in the messages array
        setMessages((prevMessages: any) => {
          const updatedMessages = [...prevMessages];
          updatedMessages[updatedMessages.length - 1].content = accumulatedMessage;
          return updatedMessages;
        });
      }
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
      <div className="flex gap-2">
        <div className="flex flex-col w-1/2 h-dvh bg-background">
          <Messages
            isLoading={isLoading}
            messages={messages}
          />

          <form className="flex mx-auto px-4 bg-background pb-4 md:pb-6 gap-2 w-full md:max-w-3xl">
            <MultimodalInput
              input={input}
              setInput={setInput}
              isLoading={false}
              messages={messages}
              setMessages={setMessages}
              onSubmit={handleSubmit}
            />
          </form>
        </div>
        <div className="w-1/2 h-dvh bg-muted">
          <p>Hellooooooooo</p>
        </div>
      </div>


    </>
  );
}
