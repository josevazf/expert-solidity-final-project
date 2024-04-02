"use client";

import type { NextPage } from "next";
import { AddStartupOwner } from "~~/components/AddStartupOwner";
import { CreateStartup } from "~~/components/CreateStartup";
import { GetContractCount } from "~~/components/GetContractCount";
import { GetStartupAddresses } from "~~/components/GetStartupAddresses";

const Home: NextPage = () => {
  //const { address: connectedAddress } = useAccount();

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-20">
        <GetContractCount></GetContractCount>
        <GetStartupAddresses></GetStartupAddresses>
        <p></p>
        <AddStartupOwner></AddStartupOwner>
        <p></p>
        <CreateStartup></CreateStartup>
      </div>
    </>
  );
};

export default Home;
