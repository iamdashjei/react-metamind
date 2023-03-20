import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";

export const SidebarDetails = [
    {
        title: "Users",
        path: "/users",
        icon: <AiIcons.AiFillHome />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
     
        subNav: [
          {
            title: "List Users",
            path: "/users",
            icon: <IoIcons.IoIosPaper />,
          },
          {
            title: "Create User",
            path: "/create-user",
            icon: <IoIcons.IoIosPaper />,
          }
        ],
    },
];