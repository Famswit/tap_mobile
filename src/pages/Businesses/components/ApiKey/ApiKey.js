import * as React from "react";

import { ResetApiKey } from "./components/ResetApiKey";
import { CopyApiKey } from "./components/CopyApiKey";
import { Modal } from "components/Modal";

const Views = {
  RESET_API: "reset-api",
  COPY_API: "copy-api",
};

export const ApiKey = ({ open, business, handleClose }) => {
  const [currentView, setCurrentView] = React.useState(Views.COPY_API);

  React.useEffect(() => {
    if (!open) {
      setCurrentView(Views.COPY_API);
    }
  }, [open]);

  return (
    <Modal
      open={open}
      handleClose={() => {
        if (currentView === Views.RESET_API) {
          setCurrentView(Views.COPY_API);
        } else {
          handleClose();
        }
      }}
    >
      {currentView === Views.COPY_API && (
        <CopyApiKey
          business={business}
          handleOpenResetApiKey={() => {
            setCurrentView(Views.RESET_API);
          }}
        />
      )}
      {currentView === Views.RESET_API && <ResetApiKey business={business} />}
    </Modal>
  );
};
