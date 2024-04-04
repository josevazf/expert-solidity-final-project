"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { AddStartupOwner } from "~~/components/AddStartupOwner";
import { BalanceOf } from "~~/components/BalanceOf";
import { BuyShares } from "~~/components/BuyShares";
import { CreateStartup } from "~~/components/CreateStartup";
import { GetNativeTokenPrice } from "~~/components/GetNativeTokenPrice";
import { GetSharePrice } from "~~/components/GetSharePrice";
import { GetSharesBalance } from "~~/components/GetSharesBalance";
import { GetStartupAddress } from "~~/components/GetStartupAddresses";
import { GetSymbol } from "~~/components/GetSymbol";
import { SellShares } from "~~/components/SellShares";

const Home: NextPage = () => {
  //const { address: connectedAddress } = useAccount();
  const [selectedAddress, setSelectedAddress] = useState("");

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-20">
        <GetStartupAddress setSelectedAddress={setSelectedAddress} />
        <GetNativeTokenPrice selectedAddress={selectedAddress}></GetNativeTokenPrice>
        <p></p>
        <GetSharePrice selectedAddress={selectedAddress}></GetSharePrice>
        <AddStartupOwner></AddStartupOwner>
        <p></p>
        <CreateStartup></CreateStartup>
        <p></p>
        <h2 className="font-bold m-2">Buy Shares</h2>
        <BalanceOf selectedAddress={selectedAddress}></BalanceOf> /
        <GetSharesBalance selectedAddress={selectedAddress}></GetSharesBalance>
        &nbsp;<GetSymbol selectedAddress={selectedAddress}></GetSymbol>
        {/* <GetStartupAddress setSelectedAddress={setSelectedAddress} /> */}
        <BuyShares selectedAddress={selectedAddress}></BuyShares>
        <p></p>
        <h2 className="font-bold m-2">Sell Shares</h2>
        <BalanceOf selectedAddress={selectedAddress}></BalanceOf>{" "}
        <GetSymbol selectedAddress={selectedAddress}></GetSymbol>
        {/* <GetStartupAddress setSelectedAddress={setSelectedAddress} /> */}
        <SellShares selectedAddress={selectedAddress}></SellShares>
      </div>
    </>
  );
};

export default Home;
