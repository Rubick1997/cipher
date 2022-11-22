import moment from "moment";
import React, { FC } from "react";

const RequestDetails: FC<{
  item: {
    name: string;
    username: string;
    submittedTimestampUs: number;
    inputsList: string[];
    profilePic: string;
  };
}> = ({ item }) => {
  const { username, name, inputsList, submittedTimestampUs, profilePic } = item;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col">
        <h1 className="font-bold">REQUESTOR</h1>
        <div className="flex items-center gap-2 p-2">
          <img
            src={`data:image/jpg;base64, ${profilePic}`}
            alt={`${username} picture`}
            className="cursor-pointer inline-block h-6 w-6 rounded-full ring-black"
          />
          {username}
        </div>
      </div>
      <div className="flex flex-col">
        <h1 className="font-bold">NAME</h1>
        <div>{name}</div>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="font-bold">INPUTS</h1>
        {inputsList.map((input: string) => (
          <div>{input}</div>
        ))}
      </div>
      <div className="flex flex-col">
        <h1 className="font-bold">Submitted Date</h1>
        {moment(submittedTimestampUs / 1000).format("h:mm a MM/DD")}
      </div>
    </div>
  );
};

export default RequestDetails;
