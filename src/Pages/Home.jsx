import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  AlignStartVertical,
  ImagePlus,
  Loader2,
  Mic,
  PlusSquareIcon,
  SendHorizontal,
} from "lucide-react";
import DynamicTextarea from "../components/DynamicTextarea";
import User_PAI_Message from "../components/User_PAI_Message";
import { ChatStore } from "../Stores/ChatStore";
import Sidebar from "../components/Sidebar";
import LoadingSpinner from "../components/LoadingSpinner";

const Home = () => {
  const {
    AskFriendlyPAI,
    isLoading,
    isChatLoading,
    GetRecentChats,
    GetLatestChat,
    CreateNewChat,
    DeleteChat,
    GetAllChats,
    UploadImage
  } = ChatStore();
  const [conversation, setConversation] = useState([]);
  const [question, setQuestion] = useState("");
  const [image, setImage] = useState(null);
  const [imgPath, setImgPath] = useState('')
  const [showPrev, setShowPrev] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [chatId, setChatId] = useState("");
  const [recentChats, setRecentChats] = useState([]);
  const ConversationRef = useRef();
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if( !SpeechRecognition ) return console.error("Speech Recognition API not supported in this browser")
      
    const recognition = new SpeechRecognition();
    
    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      const currentTranscript = event.results[0][0].transcript;
      if( currentTranscript ){
        handleAskFriendlyPAI(currentTranscript, chatId)
      }
    };

    if (isListening) {
      recognition.start();
    }

    return () => {
      recognition.stop();
    };
  }, [isListening]);
  

  useEffect(() => {
    document.title =
      "Friendly PAI | The Friendlies Companion Personalized Artificial";
    getLatestChat();
    getRecentChats();
  }, []);

  useEffect(() => {
    ConversationRef.current.scrollTo({
      top: ConversationRef.current.scrollHeight,
      behavior: "smooth",
    });
    getRecentChats();
  }, [conversation]);

  const getRecentChats = async () => {
    const recentChats = await GetRecentChats();
    setRecentChats(recentChats?.reverse());
  };

  const getLatestChat = async () => {
    const latestChat = await GetLatestChat();
    setConversation(latestChat?.chatsHistory);
    setChatId(latestChat?.chatId);
  };

  const handleGetAllChats = async (ChatId) => {
    const allChats = await GetAllChats(ChatId);
    setChatId(ChatId);
    setConversation(allChats);
  };

  const handleCreateNewChat = async () => {
    const chat = await CreateNewChat();
    setChatId(chat.chatId);
    setConversation([]);
    getRecentChats();
  };

  const handleDeleteChat = async (deleteChatId) => {
    await DeleteChat(deleteChatId);
    await getRecentChats();
    if (deleteChatId === chatId) {
      const recentChatId = recentChats[recentChats.length - 1]._id;
      const recentChatHistory =
        recentChats[recentChats.length - 1].chatsHistory;
      if (recentChats.length <= 1) {
        setChatId("");
        return setConversation([]);
      }
      setChatId(recentChatId || "");
      return setConversation(recentChatHistory || []);
    }
  };

const handleImgchange = async (e) => {
  const file = e.target.files[0] 
  setImage(URL.createObjectURL(file))

  const formData = new FormData();
  formData.append("image", file);

  const uploadImg = await UploadImage(formData);

  const SERVER = import.meta.env.VITE_SERVER;

  setShowPrev(uploadImg?.success);
  setImgPath(`${SERVER}${uploadImg?.path}`);
  e.target.value = '';
}

  const handleAskFriendlyPAI = async (ques, chatID) => {
    setQuestion("");
    const prompt = image ? [ ques , imgPath ] : ques;
    const answer = await AskFriendlyPAI(prompt, chatID);
    setConversation((preConversation) => [
      ...preConversation,
      {
        User: prompt,
        Model: answer,
      },
    ]);
    setImage(null);
  }

  const handleAskQuery = async (e) => {
    e.preventDefault();
    if(question) return handleAskFriendlyPAI(question, chatId);
    // toast.error("Prompt cant be empty")
  };

  return (
    <>
      <div className=" min-w-screen text-white min-h-screen bg-black flex relative">
        {isLoading && <LoadingSpinner />}

        {/* SIDE BAR STARTS HERE */}
        {showSidebar && window.innerWidth < 640 && (
          <div
            className={`w-full h-full absolute sm:static bg-black bg-opacity-50 z-10`}
            onClick={() => {
              setShowSidebar(!showSidebar);
            }}
          ></div>
        )}

        <Sidebar
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          recentChats={recentChats}
          handleDeleteChat={handleDeleteChat}
          handleGetAllChats={handleGetAllChats}
        />
        {/*  SIDE BAR ENDS HERE  */}

        <div className="w-full h-screen relative text-xl px-3 flex flex-col justify-between">
          <div className="flex w-full justify-between items-center bg-black p-1 pt-2 gap-1 font-semibold">
            <div className="flex gap-1 items-center">
              <button disabled={isChatLoading || isLoading}>
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    setShowSidebar(!showSidebar);
                  }}
                  className="p-1 rounded-md sm:hidden "
                >
                  <AlignStartVertical className="size-7 -ms-2 mt-1" />
                </motion.div>
              </button>
              <h1 title="Friendly PAI">Friendly PAI</h1>
            </div>
            <div title="New Chat" onClick={handleCreateNewChat}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-fit h-fit mt-1"
              >
                <button disabled={isChatLoading || isLoading}>
                  <PlusSquareIcon className="size-7" />
                </button>
              </motion.div>
            </div>
          </div>
          <div className="bg-slate-4 00 w-full h-[79%] sm:h-[80%] bg-blac bg-black relative flex justify-center">
            {/* CONVERSATION SECTION STARTS HERE */}
            <div
              ref={ConversationRef}
              className="w-full h-full text-lg overflow-y-auto pt-8 pb-24 flex flex-col gap-7 px-4"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#1e40af black ",
              }}
            >
              {conversation?.length > 0 ? (
                conversation.map((chat, id) => (
                  <User_PAI_Message
                    key={id}
                    USER={chat.User}
                    PAI={chat.Model}
                  />
                ))
              ) : (
                <div className="w-full text-center">
                  {recentChats?.length <= 0 ? (
                    <h1>Create new Chat to start.</h1>
                  ) : (
                    <h1>There is no conversation to show</h1>
                  )}
                </div>
              )}
            </div>
            <div className="w-full h-6 rounded-t-3xl bg-gradient-to-t from-black to-transparent absolute -bottom-1"></div>
            {/* CONVERSATION SECTION ENDS HERE */}
          </div>

          {/* PROMPT BAR START HERE */}
          <div className=" w-full h-[15%] bg-black">
            <form
              onSubmit={handleAskQuery}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey && question.trim() !== "")
                  !isLoading && handleAskQuery(e);
              }}
              className=" w-full h-full relative px-5 flex items-center"
            >
              {isChatLoading && (
                <div className="absolute left-1/2 -translate-x-1/2 bottom-36 flex gap-3 z-20">
                  <div className="w-5 h-5 bg-white rounded-full delay- animate-bounce"></div>
                  <div className="w-5 h-5 bg-white rounded-full animate-bounce"></div>
                </div>
              )}
              <DynamicTextarea
                disabled={!recentChats?.length || false}
                question={question}
                setQuestion={setQuestion}
                placeholder="Ask me Anything..."
                className={`w-[98%] ps-6 p-5 absolute bottom-4 -translate-x-1/2 left-1/2 rounded-xl bg-slate-900 resize-none  shadow-blue-500  pe-[70px]  ${ !isListening ? "shadow" : "animate-pulse shadow-lg"}`}
              />
              <button
                type="submit"
                className={`absolute -right-1 py-2 px-3 me-3 bottom-6 rounded-xl flex items-center justify-between ${
                  isLoading && "animate-pulse"
                } ${ question.length < 1 && "text-slate-500"} `}
                disabled={!recentChats?.length || isChatLoading || isLoading}
              >
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.7 }}
                  className="transition-all"
                >
                  <SendHorizontal className="inline-block size-8" />
                </motion.div>
              </button>
              <button
                className={`absolute -right-1 py-2 px-3 me-3 bottom-[66px] rounded-xl flex items-center justify-between ${
                  isLoading && "animate-pulse"
                } `}
                disabled={!recentChats?.length || isChatLoading || isLoading}
                onClick={() => setIsListening(!isListening)}
                >
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.7 }}
                  className="transition-all"
                >
                  <Mic className={`inline-block ${isListening ? "size-8 animate-pulse" : "size-6"} `} />
                </motion.div>
              </button>
              <button
                className={`absolute py-2 px-3 me-3 bottom-[67px] right-7 rounded-xl flex items-center justify-between ${
                  isLoading && "animate-pulse"
                } `}
                disabled={!recentChats?.length || isChatLoading || isLoading}
                >
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.7 }}
                  className="transition-all"
                >
                  <input type="file" accept="image/*" onChange={handleImgchange} className="size-5 absolute mt-2 opacity-0 " />
                  <ImagePlus className={`inline-block size-[22px] `} />
                </motion.div>
              </button>
              { image &&
              <div className="z-10 w-16 absolute bottom-28 right-2 flex justify-center items-center" >
                { showPrev ? <img src={image} alt="img" className="bg-slate-800 p-1 rounded-md" onClick={() => { setImage(null);}} />
                :
                <Loader2 className="mb-3 animate-spin" />
                }
                </div> }
            </form>
          </div>
          {/* PROMPT BAR ENDS HERE */}
        </div>
      </div>
    </>
  );
};

export default Home;
