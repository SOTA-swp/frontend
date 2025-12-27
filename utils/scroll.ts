export const scrollToBottom = (elementId: string) => {
  setTimeout(() => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollTo({
        top: element.scrollHeight,
        behavior: "smooth",
      });
    }
  }, 0);
};
