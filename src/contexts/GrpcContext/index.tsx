import React from "react";

const {
  ListRequestsRequest,
  GetRequestRequest,
  UpdateRequestRequest,
  UpdateRequestResponse,
  DeleteRequestRequest,
  GetUserInfoRequest,
  DataRequest,
} = require("../../server/backend_pb");
const { BackendClient } = require("../../server/backend_grpc_web_pb");

const CLIENT = new BackendClient(
  "http://mock.ciphermode.com:50051",
  null,
  null
);

interface IGrpcContext {
  client: any;
  ListRequestsRequest: any;
  GetRequestRequest: any;
  UpdateRequestRequest: any;
  DeleteRequestRequest: any;
  GetUserInfoRequest: any;
  UpdateRequestResponse: any;
  DataRequest: any;
}

const defaultValue: IGrpcContext = {
  client: CLIENT,
  ListRequestsRequest,
  GetRequestRequest,
  UpdateRequestRequest,
  DeleteRequestRequest,
  GetUserInfoRequest,
  DataRequest,
  UpdateRequestResponse,
};

const GrpcContext = React.createContext<IGrpcContext>(defaultValue);

export const GrpcContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <GrpcContext.Provider value={defaultValue}>{children}</GrpcContext.Provider>
  );
};

export const useGrpcContext = () => {
  const context = React.useContext(GrpcContext);
  if (context === undefined) {
    throw new Error("useGrpcContext must be used within a GrpcContextProvider");
  }

  return context;
};

export default GrpcContext;
