import React, { FC, useContext } from "react";
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
  const [modalOpen, setModalOpen] = React.useState(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  //   {
  //     "name": "Total fun activities",
  //     "profilePic": "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",
  //     "username": "Felicia Hardy",
  //     "id": 1,
  //     "requestId": "-1",
  //     "inputsList": [
  //         "Fun activities in Europe",
  //         "Fun activities in the US"
  //     ],
  //     "results": "Plaintext",
  //     "requestorId": "01",
  //     "submittedTimestampUs": 1665432183000000,
  //     "commentList": [
  //         "Processing request..."
  //     ],
  //     "status": 0
  // }

  const handleSendClick = () => {
    const req = new UpdateRequestRequest();
    console.log(selectedlist[0]);
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
    const data = new DataRequest();
    const data2 = new DataRequest();

    // data.setInputsList(inputsList);
    // data.setRequestorId("15");
    data2.setInputsList(inputsList);
    data2.setResults(results);
    data2.setRequestorId(requestorId);
    data2.setSubmittedTimestampUs(submittedTimestampUs);
    data2.setCommentList(commentList);
    data2.setStatus(status);
    data2.setName(name);

    data.setInputsList(inputsList);
    data.setResults(results);
    data.setRequestorId(requestorId);
    data.setSubmittedTimestampUs(submittedTimestampUs);
    data.setCommentList(commentList);
    data.setStatus(1);
    data.setName(name);

    req.setOriginalRequest(data2);
    req.setNewRequest(data);
    console.log(req.toObject());
    console.log(req);
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
    client.deleteRequest(req, {}, (err: any, res: any) => {
      console.log(err, res);
      if (err) {
        setOpen(true);
        setMessage(err.message);
        return;
      }
    });
  };

  const currrentFunction = (name: string) => {
    switch (name) {
      case "delete":
        return handleDeleteClick;
      case "message":
        return handleSendClick;
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
              onClick={handleSendClick}
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
