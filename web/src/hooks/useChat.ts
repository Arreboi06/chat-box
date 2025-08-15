import { useState, useCallback } from 'react';
import { useAppSelector } from './useAppSelector';
import { useAppDispatch } from './useAppDispatch';
import { store } from '../store';
import {
  addMessage,
  updateLastMessage,
  setStreaming,
  updateChatMessages,
  fetchChatList,
  createNewChat,
  setPendingChat,
} from '../store/chatSlice';
import { Message, ChatRequest } from '../types';
import { streamChat } from '../utils/api';

export const useChat = () => {
  const dispatch = useAppDispatch();
  const { modelConfig } = useAppSelector((state: any) => state.config);
  // 删除 pendingChat 相关内容，彻底还原为原始 useChat 逻辑
  const [error, setError] = useState<string | null>(null);
  const currentChat = useAppSelector((state) => state.chat.currentChat);
  const [abortController, setAbortController] =
    useState<AbortController | null>(null);

  const _sendMessage = async (content: string, useTools: string[] = []) => {
    console.log(
      'sendMessage called with content:',
      content,
      'and tools:',
      useTools
    );

    const conversationUuId = currentChat?.conversation?.uuid;
    if (!conversationUuId) {
      console.error('No current chat available');
      return;
    }

    // Get current message list
    const messageList = [...(currentChat?.messageList || [])];

    // Add user message to the chat
    const userMessage: Message = {
      role: 'user',
      content,
    };
    console.log('Adding user message:', userMessage);
    messageList.push(userMessage);
    console.log('current messageList:', messageList);
    dispatch(addMessage(userMessage));

    // Add empty assistant message that will be updated with streaming content
    const assistantMessage: Message = {
      role: 'assistant',
      content: '',
    };

    dispatch(addMessage(assistantMessage));
    dispatch(setStreaming(true));

    // 获取最新的消息列表
    console.log('All messages for request:', messageList);

    // Create chat request
    const chatRequest: ChatRequest = {
      conversationUuId,
      messageList,
      modelConfig, // 使用modelConfig，而不是currentModel
      toolList: useTools.length > 0 ? useTools : undefined,
    };

    console.log('Created chat request:', JSON.stringify(chatRequest, null, 2));
    console.log('Model config:', JSON.stringify(modelConfig, null, 2));

    // Start streaming
    console.log('Calling streamChat function');
    let assistantResponse = '';

    // 创建新的 AbortController
    const controller = new AbortController();
    setAbortController(controller);

    const cleanup = streamChat(
      chatRequest,
      controller.signal, // 传递 signal 用于停止
      (content) => {
        // 确保内容保持换行符
        console.log('Received streaming content:', content);
        // 更新最后一条消息的内容
        dispatch(updateLastMessage({ content }));
        // 将内容设置为助手回复的内容
        assistantResponse = content;
      },
      (error) => {
        console.error('Stream error received:', error);
        setError(error);
        dispatch(setStreaming(false));
        setAbortController(null);
      },
      // complete
      () => {
        console.log('Stream completed');
        dispatch(setStreaming(false));
        setAbortController(null);

        console.log('Final assistant response:', assistantResponse);
        messageList.push(assistantMessage);

        // Save the updated messages to backend
        const messagesToSave: Message[] = [];

        // 获取最新的用户消息（倒数第二条）
        const userMessageIndex = messageList.length - 2;
        const userMessage = messageList[userMessageIndex];

        // 添加用户消息
        messagesToSave.push({
          role: 'user',
          content: userMessage.content,
          conversationUuId,
        });

        // 添加助手消息
        messagesToSave.push({
          role: 'assistant',
          content: assistantResponse,
          conversationUuId,
        });

        console.log(
          'Saving updated messages to backend:',
          JSON.stringify(messagesToSave)
        );
        // 检查当前对话是否有模型参数，如果没有则使用全局设置中的默认值
        const currentModelParams = currentChat.conversation.modelParams;
        const globalSettings = store.getState().settings;

        // 如果是第一条消息且没有模型参数，使用全局设置中的默认值更新对话
        if (messageList.length === 2 && !currentModelParams) {
          dispatch(
            updateChatMessages({
              uuid: conversationUuId,
              title: currentChat.conversation.title,
              description: currentChat.conversation.description,
              systemMessage:
                currentChat.conversation.systemMessage ||
                globalSettings.systemMessage,
              temperature: globalSettings.temperature,
              maxTokens: globalSettings.maxTokens,
              contextWindow: globalSettings.contextWindow,
            })
          );
        }
        dispatch(fetchChatList());
      }
    );

    return cleanup;
  };

  const sendMessage = useCallback(
    (content: string, useTools: string[] = []) => {
      _sendMessage(content, useTools);
    },
    [modelConfig, dispatch, currentChat]
  );

  const stopGeneration = useCallback(() => {
    if (abortController) {
      console.log('Stopping generation...');
      abortController.abort();
      dispatch(setStreaming(false));
      setAbortController(null);
    }
  }, [abortController, dispatch]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    sendMessage,
    stopGeneration,
    error,
    clearError,
  };
};

export default useChat;
