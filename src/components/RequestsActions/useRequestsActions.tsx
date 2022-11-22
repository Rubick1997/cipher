import {
  ArchiveBoxXMarkIcon,
  CheckIcon,
  InformationCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import DataContext from "contexts/DataContext";
import React, { useContext } from "react";

const useRequestsActions = () => {
  const {
    selList: { selectedlist },
  } = useContext(DataContext);

  const requestsActions = [
    {
      title: "Approve request",
      actionButtonTitle: "Approve",
      button: (
        <>
          <CheckIcon className="h-5 w-5" />
          <p className="font-bold">APPROVE REQUEST</p>
        </>
      ),
      text: `You are about to approve the following request${
        selectedlist.length > 1 ? "s" : ""
      }:`,
      name: "approve",
    },
    {
      title: "Message Requestor",
      actionButtonTitle: "Send message",
      button: (
        <>
          <InformationCircleIcon className="h-5 w-5" />
          <p className="font-bold">MORE INFO NEEDED</p>
        </>
      ),
      name: "message",
    },
    {
      title: "Deny request",
      actionButtonTitle: "Confirm",
      button: (
        <>
          <XMarkIcon className="h-5 w-5" />
          <p className="font-bold">DENY REQUEST</p>
        </>
      ),
      text: "REASON(OPTIONAL)",
      name: "deny",
    },
    {
      title: "Delete request",
      actionButtonTitle: "Submit",
      text: "Are you sure you want to delete the selected request ? This action can't be undone",
      button: (
        <>
          <ArchiveBoxXMarkIcon className="h-5 w-5" />
          <p className=" font-bold">DELETE</p>
        </>
      ),
      name: "delete",
    },
  ];

  return { requestsActions };
};

export default useRequestsActions;
