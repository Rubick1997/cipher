import React, { FC } from "react";
import MaterialCheckbox from "@mui/material/Checkbox";
import moment from "moment";
import {
  CheckIcon,
  QuestionMarkCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const TableRow: FC<{ row: any; select: any }> = ({ row, select }) => {
  const handleStatus = (status: 0 | 1 | 2) => {
    switch (status) {
      case 0:
        return <QuestionMarkCircleIcon className="h-8 w-8 text-blue-300" />;
      case 1:
        return <CheckIcon className="h-8 w-8 text-green-300" />;
      case 2:
        return <XMarkIcon className="h-8 w-8 text-red-300" />;
    }
  };

  return (
    <tr className="border-b">
      <td>
        <MaterialCheckbox
          style={{
            color: "black",
          }}
          size="small"
          checked={select.state.ids.includes(row.id)}
          onChange={(e) => {
            if (select.state.ids.length > 0) {
              select.fns.onToggleAll();
            }
            select.fns.onToggleById(row.id);
          }}
        />
        {row?.name}
      </td>
      <td className="flex flex-col gap-2">
        {row?.inputsList.map((input: string) => (
          <div>{input}</div>
        ))}
      </td>
      <td>
        {row?.commentList.map((input: string) => (
          <div>{input}</div>
        ))}
      </td>
      <td>{row?.results}</td>
      <td>{handleStatus(row?.status)}</td>
      <td>
        <div className="flex items-center gap-2 p-2">
          <img
            src={`data:image/jpg;base64, ${row?.profilePic}`}
            alt={`${row?.username} picture`}
            className="cursor-pointer inline-block h-6 w-6 rounded-full ring-black"
          />
          {row?.username}
        </div>
      </td>
      <td>
        {moment(row?.submittedTimestampUs / 1000).format("h:mm a MM/DD")}
      </td>
    </tr>
  );
};

export default TableRow;
