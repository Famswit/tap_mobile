import * as React from "react";

import { Modal } from "components/Modal";
import SummaryRole from "./SummaryRole";
import ChangeRole from "./ChangeRole";

const Views = {
  SUMMARY_ROLE: "summary-role",
  CHANGE_ROLE: "change-role",
};

export const SummaryDetails = ({ teamMate, open, handleClose }) => {
  const [currentView, setCurrentView] = React.useState(Views.SUMMARY_ROLE);
  console.log({ teamMate });

  return (
    <Modal
      open={open}
      handleClose={() => {
        if (currentView === Views.CHANGE_ROLE) {
          setCurrentView(Views.SUMMARY_ROLE);
        } else {
          handleClose();
        }
      }}
    >
      {currentView === Views.SUMMARY_ROLE && (
        <SummaryRole
          teamMate={teamMate}
          handleOpenSummaryDetails={() => {
            setCurrentView(Views.CHANGE_ROLE);
          }}
        />
      )}
      {currentView === Views.CHANGE_ROLE && <ChangeRole teamMate={teamMate} />}
    </Modal>
  );
};
