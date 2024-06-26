"use client";

// import Link from "next/link";
import { useState } from "react";
import type { NextPage } from "next";
import { BuyShares } from "~~/components/BuyShares";
// import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { CreateStartup } from "~~/components/CreateStartup";
import { SellShares } from "~~/components/SellShares";

const Home: NextPage = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  const showTab1 = () => setActiveTab("tab1");
  const showTab2 = () => setActiveTab("tab2");
  const showTab3 = () => setActiveTab("tab3");

  const [BuySell, setBuySell] = useState("buy");
  const [selectedAddress] = useState("");

  const showBuy = () => setBuySell("buy");
  const showSell = () => setBuySell("sell");

  // const [activeDetails, setActiveDetails] = useState(false);

  // const handleActiveDetails = () => setActiveDetails(!activeDetails);

  return (
    <>
      <div className="flex justify-center items-center space-x-2"></div>
      <div className="flex items-center flex-col flex-grow pt-10 bg-white">
        <div className="">
          <div className="text-black ">
            <div className="bg-white rounded-xl p-6 w-[580px] border-black border-2">
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
                {/* <nav
                  className={`flex-1 text-center py-2 hover:cursor-pointer transition-opacity duration-500 ease-in-out ${
                    activeTab === "tab3"
                      ? "border-b-2 border-primary opacity-100"
                      : "border-b-2 border-transparent opacity-50"
                  }`}
                  onClick={showTab3}
                >
                  Confirmation
                </nav> */}
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
                  {BuySell === "sell" && <SellShares selectedAddress={selectedAddress}></SellShares>}
                </>
              )}
              {activeTab === "tab3" && <div>This is the confirmation page</div>}
            </div>
          </div>
        </div>
      </div>
      {/* {true && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white rounded-xl p-6 w-[580px] h-full">
            <div className="flex flex-row justify-between">
              <h1 className="text-2xl font-bold text-black">Details</h1>
              <p onClick={handleActiveDetails}>X</p>
            </div>
            <div className="bg-gray-200 my-4 p-4">
              <span className="flex justify-between">
                <p className="text-black">Trade Type</p>
                <p className="text-black">BUY</p>
              </span>
              <span className="flex justify-between">
                <p className="text-black">Amount of Shares</p>
                <p className="text-black">1000</p>
              </span>
              <span className="flex justify-between">
                <p className="text-black">Price per Share</p>
                <p className="text-black">1 ETH</p>
              </span>
              <span className="flex justify-between">
                <p className="text-black">Total Share Price</p>
                <p className="text-black">1000 ETH</p>
              </span>
            </div>
            <div className="bg-gray-200 my-4 p-4">
              <span className="flex justify-between">
                <p className="text-black">Brokerbot Contract</p>
                <p className="text-black">0x...</p>
              </span>
              <span className="flex justify-between">
                <p className="text-black">DAKS Contract</p>
                <p className="text-black">0x...</p>
              </span>
              <span className="flex justify-between">
                <p className="text-black">XCHF Contract</p>
                <p className="text-black">0x...</p>
              </span>
              <span className="flex justify-between">
                <p className="text-black">Payment Hub Contract</p>
                <p className="text-black">0x...</p>
              </span>
            </div>
          </div>
        </div>
      )} */}
    </>
  );
};

export default Home;
