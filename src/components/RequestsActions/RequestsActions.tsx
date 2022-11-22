import BasicModal from "components/BasicModal";
import DataContext from "contexts/DataContext";
import { useContext } from "react";
import useRequestsActions from "./useRequestsActions";

const RequestsActions = () => {
  const { requestsActions } = useRequestsActions();

  return (
    <div className="flex gap-7 ml-auto text-black">
      {requestsActions.map(
        ({ title, actionButtonTitle, name, text, button }) => (
          <button className="flex gap-3 items-center cursor-pointer">
            <BasicModal
              title={title}
              actionButtonTitle={actionButtonTitle}
              button={button}
              text={text}
              name={name}
            />
          </button>
        )
      )}
    </div>
  );
};

export default RequestsActions;
