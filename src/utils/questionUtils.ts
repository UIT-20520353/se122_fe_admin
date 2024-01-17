const getQuestion = (content: string): string => {
  return content.replace(/\{\{__blank__\}\}/g, "______");
};

export { getQuestion };
