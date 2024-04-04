"use client";

// import Link from "next/link";
import { useState } from "react";
import type { NextPage } from "next";
import { BuyShares } from "~~/components/BuyShares";
// import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { CreateStartup } from "~~/components/CreateStartup";

const Home: NextPage = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  const showTab1 = () => setActiveTab("tab1");
  const showTab2 = () => setActiveTab("tab2");
  const showTab3 = () => setActiveTab("tab3");

  const [BuySell, setBuySell] = useState("buy");
  const [selectedAddress] = useState("");

  const showBuy = () => setBuySell("buy");
  const showSell = () => setBuySell("sell");

  return (
    <>
      <div className="flex justify-center items-center space-x-2"></div>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div>
          <div className="text-black">
            <div className="bg-white rounded-xl p-6 w-[580px]">
              <div className="flex flex-row justify-around text-xs">
                <nav
                  className={`flex-1 text-center py-2 hover:cursor-pointer transition-opacity duration-500 ease-in-out ${
                    activeTab === "tab1"
                      ? "border-b-2 border-primary opacity-100"
                      : "border-b-2 border-transparent opacity-50"
                  }`}
                  onClick={showTab1}
                >
                  Create Startup
                </nav>
                <nav
                  className={`flex-1 text-center py-2 hover:cursor-pointer transition-opacity duration-500 ease-in-out ${
                    activeTab === "tab2"
                      ? "border-b-2 border-primary opacity-100"
                      : "border-b-2 border-transparent opacity-50"
                  }`}
                  onClick={showTab2}
                >
                  Swap
                </nav>
                <nav
                  className={`flex-1 text-center py-2 hover:cursor-pointer transition-opacity duration-500 ease-in-out ${
                    activeTab === "tab3"
                      ? "border-b-2 border-primary opacity-100"
                      : "border-b-2 border-transparent opacity-50"
                  }`}
                  onClick={showTab3}
                >
                  Confirmation
                </nav>
              </div>
              {activeTab === "tab1" && (
                <>
                  <CreateStartup></CreateStartup>
                </>
              )}
              {activeTab === "tab2" && (
                <>
                  <div>
                    <h1 className="text-2xl font-bold py-5">Swap Shares</h1>
                    <p className="">Number of shares</p>
                  </div>
                  <div className="flex flex-row justify-around w-full pb-1 flex-wrap">
                    <button
                      className={`btn font-light rounded flex-1 ${
                        BuySell === "buy" ? "bg-white hover:bg-white border-primary text-primary" : "bg-neutral"
                      }`}
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
                  {BuySell === "buy" && <BuyShares selectedAddress={selectedAddress}></BuyShares>}
                  {BuySell === "sell" && (
                    <>
                      {/* <input type="number" placeholder="0" className="w-full bg-white rounded border-black" /> */}
                      <div className="flex flex-row justify-between relative">
                        <input type="number" placeholder="1000" className="w-full bg-white border-primary" />
                        <select
                          name="sell"
                          id="sell"
                          className=" bg-white rounded border-black m-2 p-1 absolute right-0 top-1"
                        >
                          <option value="eth">DAKS</option>
                          <option value="usdc">USDC</option>
                        </select>
                      </div>
                      <p className="">Amount to be received</p>
                      <div className="flex flex-row justify-between relative">
                        <input type="number" placeholder="1000" className="w-full" />
                        <select
                          name="received"
                          id="received"
                          className=" bg-white rounded border-black m-2 p-1 absolute right-0 top-1"
                        >
                          <option value="eth">ETH</option>
                          <option value="usdc">USDC</option>
                        </select>
                      </div>
                      <div className="flex flex-row justify-between relative">
                        <input
                          className="w-full"
                          type="text"
                          placeholder="You are selling 1′000 DAKS for 13′230.8 XCHF."
                          disabled
                        />
                        <button className="btn btn-sm btn-secondary font-light bg-white text-black rounded m-2 absolute right-0">
                          Details
                        </button>
                      </div>
                      <button className="btn btn-primary font-light text-white rounded w-full mt-4">
                        Start Selling
                      </button>
                    </>
                  )}
                </>
              )}
              {activeTab === "tab3" && <div>This is the confirmation page</div>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
