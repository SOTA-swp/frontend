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

export const scrollToId = (elementId: string, targetId: string) => {
  setTimeout(() => {
    const element = document.getElementById(elementId);
    const targetElement = document.getElementById(targetId);
    if (element && targetElement) {
      const offsetTop =
        targetElement.getBoundingClientRect().top -
        element.getBoundingClientRect().top +
        element.scrollTop;
      element.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  }, 0);
};
