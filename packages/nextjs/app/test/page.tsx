"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { AddStartupOwner } from "~~/components/AddStartupOwner";
import { BalanceOf } from "~~/components/BalanceOf";
import { BuyShares } from "~~/components/BuyShares";
import { CreateStartup } from "~~/components/CreateStartup";
import { GetStartupAddress } from "~~/components/GetStartupAddresses";
import { SellShares } from "~~/components/SellShares";

const Home: NextPage = () => {
  //const { address: connectedAddress } = useAccount();
  const [selectedAddress, setSelectedAddress] = useState("");

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-20">
        <AddStartupOwner></AddStartupOwner>
        <p></p>
        <CreateStartup></CreateStartup>
        <p></p>
        <h2 className="font-bold m-2">Buy Shares</h2>
        <BalanceOf selectedAddress={selectedAddress}></BalanceOf>
        <GetStartupAddress setSelectedAddress={setSelectedAddress} />
        <BuyShares selectedAddress={selectedAddress}></BuyShares>
        <p></p>
        <h2 className="font-bold m-2">Sell Shares</h2>
        <BalanceOf selectedAddress={selectedAddress}></BalanceOf>
        <GetStartupAddress setSelectedAddress={setSelectedAddress} />
        <SellShares selectedAddress={selectedAddress}></SellShares>
      </div>
    </>
  );
};

export default Home;
