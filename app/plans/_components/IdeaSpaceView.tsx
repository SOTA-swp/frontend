"use client";
import AddButton from "./AddButton";
import ViewWrapper from "./ViewWrapper";

function IdeaSpaceViewAddButton() {
  return <AddButton />;
}

function IdeaSpaceView() {
  return (
    <ViewWrapper outerElement={<IdeaSpaceViewAddButton />} paper>
      Idea Space
    </ViewWrapper>
  );
}

export default IdeaSpaceView;
