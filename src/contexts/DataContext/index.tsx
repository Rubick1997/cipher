import React, { useState } from "react";

interface DataInterface {
  reqList: {
    list: any[];
    setList: any;
  };
  selList: {
    selectedlist: any[];
    setSelectedlist: any;
  };
  snackBar: {
    open: boolean;
    setOpen: any;
    setMessage: any;
    message: string;
  };
  userLoading: {
    loading: boolean;
    setLoading: any;
  };
}
const defaultValues = {
  reqList: {
    list: [],
    setList: null,
  },
  selList: {
    selectedlist: [],
    setSelectedlist: null,
  },
  snackBar: {
    open: false,
    setOpen: null,
    setMessage: null,
    message: "",
  },
  userLoading: { loading: false, setLoading: null },
};

const DataContext = React.createContext<DataInterface>(defaultValues);

export const DataContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [list, setList] = useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedlist, setSelectedlist] = useState<any[]>([]);
  const [message, setMessage] = useState<any>("");
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <DataContext.Provider
      value={{
        reqList: { list, setList },
        snackBar: { open, setOpen, message, setMessage },
        selList: { selectedlist, setSelectedlist },
        userLoading: { loading, setLoading },
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useGrpcContext = () => {
  const context = React.useContext(DataContext);
  if (context === undefined) {
    throw new Error("useGrpcContext must be used within a DataContextProvider");
  }

  return context;
};

export default DataContext;
