import React from "react";

import {
  XCircleIcon,
  ArchiveBoxIcon,
  BriefcaseIcon,
  UserGroupIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/solid";

const SideBar = () => {
  return (
    <div className="border-gray-900 p-5 text-xs text-gray-400 bg-black h-screen scrollbar-hide pb-3 w-80 flex flex-col">
      <XCircleIcon className="h-12 w-12 cursor-pointer" />
      <div className="mt-20 flex flex-col gap-8">
        <div className="flex gap-3 items-center">
          <ArchiveBoxIcon className="h-7 w-7 cursor-pointer" />
          <p className="cursor-pointer font-medium">NODES</p>
        </div>
        <div className="flex gap-3">
          <BriefcaseIcon className="h-7 w-7 cursor-pointer" />
          <div className="flex flex-col gap-4 mt-2">
            <p className="cursor-pointer font-medium">NODES</p>
            <p className="cursor-pointer font-medium text-white">
              PENDING REQUESTS
            </p>
            <p className="cursor-pointer font-medium">IN PROGRESS</p>
            <p className="cursor-pointer font-medium">PREFERENCES</p>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <UserGroupIcon className="h-7 w-7 cursor-pointer" />
          <p className="cursor-pointer font-medium">USERS & ORGS</p>
        </div>
        <div className="flex gap-3 items-center">
          <AdjustmentsHorizontalIcon className="h-7 w-7 cursor-pointer" />
          <p className="cursor-pointer font-medium">PREFERENCES</p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
