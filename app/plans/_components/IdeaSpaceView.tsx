"use client";
import AddButton from "./AddButton";
import ViewWrapper from "./ViewWrapper";

function IdeaSpaceViewAddButton() {
  return <AddButton />;
}

function IdeaSpaceView() {
  return (
    <ViewWrapper outerElement={<IdeaSpaceViewAddButton />}>
      Idea Space
    </ViewWrapper>
  );
}

export default IdeaSpaceView;
