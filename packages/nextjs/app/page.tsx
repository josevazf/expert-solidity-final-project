"use client";

// import Link from "next/link";
import { useState } from "react";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
// import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const [activeTab, setActiveTab] = useState("tab1");

  const showTab1 = () => setActiveTab("tab1");
  const showTab2 = () => setActiveTab("tab2");
  const showTab3 = () => setActiveTab("tab3");

  const [BuySell, setBuySell] = useState("buy");

  const showBuy = () => setBuySell("buy");
  const showSell = () => setBuySell("sell");

  return (
    <>
      <div className="flex justify-center items-center space-x-2">
        <p className="my-2 font-medium">Connected Address:</p>
        <Address address={connectedAddress} />
      </div>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div>
          <div className="text-black">
            <div className="bg-white rounded-xl p-6 w-[580px]">
              <div className="flex flex-row justify-around text-xs">
                <nav className="flex-1 text-center border-b-2 border-primary" onClick={showTab1}>
                  Create Startup
                </nav>
                <nav className="flex-1 text-center" onClick={showTab2}>
                  Swap
                </nav>
                <nav className="flex-1 text-center" onClick={showTab3}>
                  Confirmation
                </nav>
              </div>
              {activeTab === "tab1" && <div>This is Tab 1</div>}
              {activeTab === "tab2" && (
                <>
                  <div>
                    <h1 className="text-2xl">Swap Shares</h1>
                    <p className="">Number of shares</p>
                  </div>
                  <div className="flex flex-row justify-around w-full pb-1 flex-wrap">
                    <button
                      className="btn btn-secondary font-light bg-white text-black rounded flex-1"
                      onClick={showBuy}
                    >
                      Buy
                    </button>
                    <button
                      className="btn btn-secondary font-light bg-white text-black rounded flex-1"
                      onClick={showSell}
                    >
                      Sell
                    </button>
                  </div>
                  {BuySell === "buy" && (
                    <>
                      <input type="number" placeholder="0" className="w-full bg-white rounded border-black" />
                      <p className="">Payment</p>
                      <div className="flex flex-row justify-between">
                        <div className="">1000</div>
                        <select name="payment" id="payment" className=" bg-white rounded border-black">
                          <option value="eth">ETH</option>
                          <option value="usdc">USDC</option>
                        </select>
                      </div>
                      <div className="flex flex-row justify-between">
                        <div className="">You are buying 1′000 DAKS for 13′230.8 XCHF.</div>
                        <button className="btn btn-sm btn-secondary font-light bg-white text-black rounded">
                          Details
                        </button>
                      </div>
                      <button className="btn btn-primary font-light text-white rounded w-full">Start Buying</button>
                    </>
                  )}
                  {BuySell === "sell" && <div>This is the Sell section</div>}
                </>
              )}
              {activeTab === "tab3" && <div>This is Tab 3</div>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
