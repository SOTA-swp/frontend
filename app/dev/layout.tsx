import { ReactNode } from "react";
import PlanStoreProvider from "../plans/_store/PlanStoreProvider";

function DevLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <PlanStoreProvider>{children}</PlanStoreProvider>
    </>
  );
}

export default DevLayout;
