import React, { FC, useContext, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { XMarkIcon } from "@heroicons/react/24/solid";
import DataContext from "contexts/DataContext";
import RequestDetails from "./RequestDetails";
import "./scroll.css";
import GrpcContext from "contexts/GrpcContext";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "20px",
  border: "2px solid #000",
  boxShadow: 24,
  minWidth: "420px",
  maxHeight: "500px",
  p: 2,
};

const BasicModal: FC<{
  button: any;
  title: string;
  actionButtonTitle: string;
  text?: string;
  name?: string;
}> = ({ button, title, text, name, actionButtonTitle }) => {
  const {
    selList: { selectedlist },
    snackBar: { setOpen, setMessage },
    userLoading: { setLoading },
  } = useContext(DataContext);
  const { client, UpdateRequestRequest, DataRequest, DeleteRequestRequest } =
    useContext(GrpcContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [input, setInput] = useState("");

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const handleSendClick = (reqStatus?: number, comment?: string) => {
    if (reqStatus === 0 && comment && comment.length === 0) {
      console.log("runs");
      setOpen(true);
      setMessage("Please add comment");
      return;
    }
    const req = new UpdateRequestRequest();
    const {
      inputsList,
      results,
      requestorId,
      submittedTimestampUs,
      commentList,
      status,
      name,
    } = selectedlist[0];
    req.setId(selectedlist[0].requestId);
    const newData = new DataRequest();
    const oldData = new DataRequest();

    oldData.setInputsList(inputsList);
    oldData.setResults(results);
    oldData.setRequestorId(requestorId);
    oldData.setSubmittedTimestampUs(submittedTimestampUs);
    oldData.setCommentList(commentList);
    oldData.setStatus(status);
    oldData.setName(name);

    newData.setInputsList(inputsList);
    newData.setResults(results);
    newData.setRequestorId(requestorId);
    newData.setSubmittedTimestampUs(submittedTimestampUs);
    if (comment && comment.length > 0) {
      newData.addComment(comment);
    } else {
      newData.setCommentList(commentList);
    }
    newData.setStatus(reqStatus);
    newData.setName(name);
    req.setOriginalRequest(oldData);
    req.setNewRequest(newData);
    console.log(oldData, newData);
    client.updateRequest(req, {}, (err: any, res: any) => {
      console.log(err, res);
      if (err) {
        setOpen(true);
        setMessage(err.message);
        return;
      }
      setLoading((prevState: boolean) => !prevState);
      handleClose();
    });
  };
  const handleDeleteClick = () => {
    const req = new DeleteRequestRequest();
    req.setId(selectedlist[0].requestId);
    console.log("delete triggered");
    client.deleteRequest(req, {}, (err: any, res: any) => {
      console.log(err, res);
      if (err) {
        setOpen(true);
        setMessage(err.message);
        return;
      }
      setLoading((prevState: boolean) => !prevState);
      handleClose();
    });
  };

  const currrentFunction = (name: string) => {
    switch (name) {
      case "delete":
        return () => handleDeleteClick();
      case "message":
        return () => handleSendClick(0, input);
      case "approve":
        return () => handleSendClick(1);
      case "deny":
        return () => handleSendClick(2, input);
      default:
        return;
    }
  };

  return (
    <div>
      <button
        onClick={handleOpen}
        className={`flex gap-1 items-center justify-center ${
          selectedlist.length === 0
            ? "cursor-not-allowed text-gray-400"
            : "cursor-pointer text-black "
        }`}
        disabled={selectedlist.length === 0}
      >
        {button}
      </button>
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div className="font-bold text-lg">{title}</div>
            <XMarkIcon
              className="h-5 w-5 cursor-pointer"
              onClick={handleClose}
            />
          </div>
          {text ? <div className="font-semibold">{text}</div> : null}
          {title.includes("Approve") && (
            <div className="flex flex-col gap-3 overflow-y-scroll divide-y-2 divide-black scroll-not-show">
              {selectedlist.map((item) => (
                <RequestDetails item={item} />
              ))}
            </div>
          )}
          {(name === "message" || name === "deny") && (
            <textarea
              className="rounded-xl border-black  border-solid border-2 p-2 focus:outline-none "
              rows={4}
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
          )}
          <div className="ml-auto flex gap-2">
            <div
              className="bg-inherit border-black  border-solid border-2 flex items-center content-center rounded p-1 pr-2 pl-2 w-fit cursor-pointer hover:bg-black hover:text-white font-semibold"
              onClick={handleClose}
            >
              Cancel
            </div>
            <div
              onClick={currrentFunction(name as string)}
              className="bg-black text-white border-black  border-solid border-2 flex items-center content-center rounded p-1 pr-2 pl-2 w-fit cursor-pointer  font-semibold hover:bg-white hover:text-black"
            >
              {actionButtonTitle}
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default BasicModal;
