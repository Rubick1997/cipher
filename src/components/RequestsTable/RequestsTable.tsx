import RequestsActions from "components/RequestsActions";
import DataContext from "contexts/DataContext";
import GrpcContext from "contexts/GrpcContext";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  SelectTypes,
  useRowSelect,
} from "@table-library/react-table-library/select";
import MaterialCheckbox from "@mui/material/Checkbox";
import TableRow from "./TableRow";
import {
  ArrowSmallUpIcon,
  ArrowSmallDownIcon,
} from "@heroicons/react/24/solid";
import requestHelpers from "helpers/requestHelpers";

const RequestsTable = () => {
  const {
    reqList: { list, setList },
    selList: { setSelectedlist },
    snackBar: { setOpen },
    userLoading: { loading },
  } = useContext(DataContext);
  const { client, ListRequestsRequest, GetUserInfoRequest, GetRequestRequest } =
    useContext(GrpcContext);
  const [sortDirection, setSortSDirection] = useState("");
  const [sortBy, setSortBy] = useState("name");

  const handleChangeSort = useCallback(
    (name: string) => {
      if (sortBy === name) {
        setSortSDirection((prev) => (prev === "ASC" ? "DESC" : "ASC"));
      } else {
        setSortSDirection("ASC");
      }
      setSortBy(name);
    },
    [sortBy]
  );
  const getItems = () => {
    const req = new ListRequestsRequest();
    client.listRequests(req, {}, (err: any, res: any) => {
      if (err) {
        console.log(err);
        setOpen(true);
        return;
      }
      res.getIdList().map((item: any, id: any) => {
        const mainReq = new GetRequestRequest();
        const userReq = new GetUserInfoRequest();
        mainReq.setId(item);
        client.getRequest(mainReq, {}, (err: any, res: any) => {
          if (err) {
            console.log(err);
            setOpen(true);
            return;
          }
          const request = res.toObject().request;
          userReq.setId(request.requestorId);
          client.getUserInfo(userReq, {}, (err: any, res: any) => {
            if (err) {
              console.log(err);
              setOpen(true);
              return;
            }
            const userInfo = res.toObject();
            const result = {
              ...userInfo,
              username: userInfo.name,
              id,
              requestId: item,
              ...request,
            };
            setList((prevState: any) => [...prevState, result]);
          });
        });
      });
    });
  };

  useEffect(() => {
    setList([]);
    getItems();
    console.log(loading);
  }, [loading]);

  useEffect(() => {
    handleSorting(sortBy, sortDirection);
  }, [sortBy, sortDirection]);

  function onSelectChange(_: any, state: any) {
    const selectedListItems = requestHelpers.generateRequestsForApproval(
      state.ids,
      list
    );
    setSelectedlist(selectedListItems);
  }
  const handleSorting = (sortField?: string, sortOrder?: string) => {
    if (sortField) {
      const sorted = [...list].sort((a, b) => {
        return (
          a[sortField].toString().localeCompare(b[sortField].toString(), {
            numeric: true,
          }) * (sortOrder === "ASC" ? 1 : -1)
        );
      });
      setList(sorted);
    }
  };
  const data = { nodes: list };
  const select = useRowSelect(
    data,
    {
      onChange: onSelectChange,
    },
    {
      rowSelect: SelectTypes.SingleSelect,
      buttonSelect: SelectTypes.SingleSelect,
    }
  );

  const currentIcon = (field: string, direction: string) => {
    if (field === sortBy) {
      if (direction === "DESC") {
        return <ArrowSmallUpIcon className="h-5 w-5" />;
      }
      if (direction === "ASC") {
        return <ArrowSmallDownIcon className="h-5 w-5" />;
      }
      return;
    }
    return;
  };

  return (
    <div className="flex flex-col gap-4">
      <RequestsActions />
      <table className="text-sm border-collapse h-60">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="w-56">
              <div className="flex items-center ">
                <MaterialCheckbox
                  size="small"
                  checked={select.state.all}
                  indeterminate={!select.state.all && !select.state.none}
                  onChange={select.fns.onRemoveAll}
                  style={{
                    color: "black",
                  }}
                />
                <div
                  onClick={() => handleChangeSort("name")}
                  className="cursor-pointer flex items-center"
                >
                  NAME
                  {currentIcon("name", sortDirection)}
                </div>
              </div>
            </th>
            <th>INPUTS</th>
            <th>COMMENTS</th>
            <th
              onClick={() => handleChangeSort("results")}
              className="cursor-pointer"
            >
              <div className="flex items-center">
                RESULTS {currentIcon("results", sortDirection)}
              </div>
            </th>
            <th
              onClick={() => handleChangeSort("status")}
              className="cursor-pointer"
            >
              <div className="flex items-center">
                STATUS {currentIcon("status", sortDirection)}
              </div>
            </th>
            <th
              onClick={() => handleChangeSort("username")}
              className="cursor-pointer"
            >
              <div className="flex items-center">
                REQUESTOR {currentIcon("username", sortDirection)}
              </div>
            </th>
            <th
              onClick={() => handleChangeSort("submittedTimestampUs")}
              className="cursor-pointer"
            >
              <div className="flex items-center">
                SUBMITTED
                {currentIcon("submittedTimestampUs", sortDirection)}
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {list.map((item, index) => (
            <>
              <TableRow key={index} row={item} select={select} />
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestsTable;
