import React, { useEffect, useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import "./Main_home.css";
import busd from "../Assets/busd.png";
import Runx from "../Assets/Runx.png";
import { AiOutlineArrowDown } from "react-icons/ai";
import { palmareContractAddress, palmareContractAbi, palmareTokenAddress, palmareTokenAbi } from '../../utilies/Bsc_contract';
import { loadWeb3 } from '../../apis/api';
import Web3, { fromWei } from 'web3'
import { ToastContainer, toast } from 'react-toastify';
import { CopyToClipboard, onCopy } from 'react-copy-to-clipboard';

function Main_home() {
  let [accadress, setaccadress] = useState('')
  let [refralmetamask, setrefralmetamask] = useState('')

  let [withdrawableamount, setwithdrawableamount] = useState('')
  let [rewardtime, setrewardtime] = useState('')
  let [withdrawupcoming, setwithdrawupcoming] = useState('')
  let [days, setDays_here] = useState('')

  let [hours, setHours_here] = useState('')

  let [minutes, setMunits_here] = useState('')

  let [seconds, setSeconds] = useState('')

  let [minimumbuytoken, setminimumbuytoken] = useState(null)
  let [maxbuytoken, setmaximumbuytoken] = useState(null)

  let [pricepertoken, setpricepertoken] = useState(null)
  let [inputvalue, setinputvalue] = useState('')
  let [refreallinks, setrefreallink] = useState("")
  let [owneradress, setowneradress] = useState("")
  let [initiallink, setinitiallink] = useState("https://runxnew.netlify.app/?referrallink=")
  // http://localhost:3000

  let [inputvaluerunx, setinputvaluerunx] = useState('')

  let [valueinbnb, setbnbvalue] = useState('')
  let [valueinrunx, setrunxvalue] = useState('')

  let [currentbalance, setcurrentbalance] = useState('')
  let [userbalance, setuserbalance] = useState('')
  let [display, setdisplay] = useState(true)
  let [copied, setcopied] = useState(false)
  let [owneralreadyexist, setowneralreadyexist] = useState()




  const myfun = async () => {

    let acc = await loadWeb3();

    if (acc == "No Wallet") {
      toast.error("No Wallet Connected")
    }
    else if (acc == "Wrong Network") {
      toast.error("Wrong Newtwork please connect to BSC MainNet ")
    } else {
      try {
        setaccadress(acc)

        const web3 = window.web3;
        let palmareContractOf = new web3.eth.Contract(palmareContractAbi, palmareContractAddress);
        let owneradress = await palmareContractOf.methods._owner().call();
        setowneradress(owneradress)

        let owneralreadyexist = await palmareContractOf.methods._chakUpline(acc, owneradress).call();
        setowneralreadyexist(owneralreadyexist)

        let minimumbuytoken = await palmareContractOf.methods.MinimumBuyTokn().call();
        minimumbuytoken = window.web3.utils.fromWei(minimumbuytoken, "ether")
        setminimumbuytoken(minimumbuytoken)



        let maximumbuytoken = await palmareContractOf.methods.vestingAmount(acc).call();
        // minimumbuytoken = window.web3.utils.fromWei(minimumbuytoken, "ether")

        // set withdrawableamount is dummy  its update later
        setmaximumbuytoken(minimumbuytoken)

        let pricePrToken = await palmareContractOf.methods.pricePrToken().call();
        pricePrToken = window.web3.utils.fromWei(pricePrToken, "ether")

        setpricepertoken(pricePrToken)

        let userbalance = await web3.eth.getBalance(acc)
        userbalance = window.web3.utils.fromWei(userbalance, "ether")
        setuserbalance(userbalance)

        let currrentbalance = await palmareContractOf.methods.balanceOf(acc).call();
        currrentbalance = window.web3.utils.fromWei(currrentbalance, "ether")

        setcurrentbalance(currrentbalance)

        let withdrawableamount = await palmareContractOf.methods.vestingAmount(acc).call();
        withdrawableamount = window.web3.utils.fromWei(withdrawableamount, "ether")

        setwithdrawableamount(withdrawableamount)

        let users = await palmareContractOf.methods.users(acc).call();
        users = window.web3.utils.fromWei(users.upcomingreward, "ether")

        setwithdrawupcoming(users)
      } catch (e) {
        toast.error(e.messasge)
      }

    }
  }

  const rewardTime = async () => {
    const web3 = window.web3;
    let palmareContractOf = new web3.eth.Contract(palmareContractAbi, palmareContractAddress);
    let user = await palmareContractOf.methods.users(accadress).call();

    let timer_get = user.time;

    if (timer_get <= 0) {
      setDays_here(0)
      setHours_here(0)
      setMunits_here(0)
      setSeconds(0)
    }
    else {
      var currentDateTime = new Date();
      let resultInSeconds = currentDateTime.getTime() / 1000;
      let Time_here = (timer_get) - resultInSeconds
      let TimeFinal = parseInt(Time_here)
      if (TimeFinal > 0) {
        let days = parseInt(TimeFinal / 86400)

        setDays_here(days)
        TimeFinal = TimeFinal % (86400)
        let hours = parseInt(TimeFinal / 3600)
        setHours_here(hours)
        TimeFinal %= 3600
        let munites = parseInt(TimeFinal / 60)
        setMunits_here(munites)
        TimeFinal %= 60
        let second_here = parseInt(TimeFinal)
        console.log('what is result in seconds', second_here)
        setSeconds(second_here)
      }
      else {
        setDays_here(0)
        setHours_here(0)
        setMunits_here(0)
        setSeconds(0)
      }
    }
  }
  const ownerAlreadyexist = async () => {
    try {
      let acc = await loadWeb3();


      const web3 = window.web3;
      let palmareContractOf = new web3.eth.Contract(palmareContractAbi, palmareContractAddress);
      let owneradress = await palmareContractOf.methods._owner().call();

      let owneralreadyexist = await palmareContractOf.methods._chakUpline(owneradress, acc).call();
      // owneralreadyexist = true;
      setowneralreadyexist(owneralreadyexist)
      console.log("Addresschange", owneralreadyexist);

    } catch (e) {
      console.log("Erroe whil cal chang_address functio", e);
    }
  }

  const check = () => {
    let url = window.location.href
    if (url.includes("referrallink")) {
      var position = url.indexOf('=')
      position = position + 1

      let metamaskadress = url.slice(position);
      setrefralmetamask(metamaskadress)
      setrefreallink(accadress)

    }
    else {

      setrefreallink(accadress)
      setrefralmetamask(owneradress)

      // else {
      //   setrefreallink(owneradress)
      // }
    }
  }
  useEffect(() => {
    myfun()
    check()
    ownerAlreadyexist()
    setInterval(() => {
      rewardTime()
    }, 1000);

  }, [refreallinks, owneradress, seconds]);
  const withdrawamount = async () => {
    try {
      const web3 = window.web3;
      let palmareContractOf = new web3.eth.Contract(palmareContractAbi, palmareContractAddress);
      let withdrawremeningAmount = await palmareContractOf.methods.withdrawremeningAmount().send({ from: accadress });
    }
    catch (e) {
      toast.error(e.messasge)
    }
  }

  const bnbtorunx = async (value) => {

    try {

      const web3 = window.web3;
      let palmareContractOf = new web3.eth.Contract(palmareContractAbi, palmareContractAddress);


      console.log("what is enter value", value);
      const myvalue = web3.utils.toWei(value)
      console.log("after converting ", myvalue);

      let check_bnbValue = await palmareContractOf.methods.check_tokenValue(myvalue).call();
      let value_after = web3.utils.fromWei(check_bnbValue)

      setbnbvalue(value_after)

    } catch (e) {
      console.log(e);
      // setinputdatahere(" ")
      // toast.error("User Is Not Exists")
      // setButtonOne("Mint With BNB")

    }


  }
  const convertbnbtorunx = async (e) => {
    setinputvalue(e.target.value)
    bnbtorunx(e.target.value)
  }

  const buyToken = async () => {


    try {

      const web3 = window.web3;
      let palmareContractOf = new web3.eth.Contract(palmareContractAbi, palmareContractAddress);


      console.log("what is enter value", inputvalue);
      let val = web3.utils.toWei(inputvalue);

      let check_bnbValue = await palmareContractOf.methods.BuyToken(refralmetamask).send({ from: accadress, value: val });
      setrefreallink(accadress)

      console.log("check token ", check_bnbValue);



    } catch (e) {
      console.log(e);

      toast.error(e.messasge)

    }

  }
  const convertrunxtobnb = (e) => {
    setinputvaluerunx(e.target.value)
    runxtobnb(e.target.value)

  }
  const runxtobnb = async (value) => {

    try {

      const web3 = window.web3;
      let palmareContractOf = new web3.eth.Contract(palmareContractAbi, palmareContractAddress);

      console.log("what is enter value", value);


      let myvalue = web3.utils.toWei(value.toString())
      myvalue = myvalue.toString()
      console.log("after converting ", myvalue);

      let check_bnbValue = await palmareContractOf.methods.check_bnbValue((myvalue).toString()).call();
      // let value_afcheck_bnbValueter = web3.utils.fromWei()
      let value_after = web3.utils.fromWei(check_bnbValue)
      console.log("check_bnbValue sadasd latest", check_bnbValue);
      // console.log("check_bnbValue runx latest", value_after);
      setrunxvalue(value_after)



    } catch (e) {
      console.log(e);
      toast.error(e.messasge)
    }


  }
  const buyRunx = async () => {


    try {



      const web3 = window.web3;
      let palmareContractOf = new web3.eth.Contract(palmareContractAbi, palmareContractAddress);
      let palmareTokenof = new web3.eth.Contract(palmareTokenAbi, palmareTokenAddress);
      console.log('what is input value', inputvaluerunx)
      let val = web3.utils.toWei(inputvaluerunx);
      console.log('what is input value after towi', val)

      let check_runxvalue = await palmareTokenof.methods.approve(palmareContractAddress, val).send({ from: accadress });
      console.log("what is enter runx token value from approve", check_runxvalue);

      // console.log("what is enter runx token value", inputvaluerunx);
      // let myvalue = web3.utils.toWei(inputvalue)
      // let val = web3.utils.toWei(inputvaluerunx);
      // console.log('what is the value  towei', val)

      // let myvalue = parseInt(inputvalue)
      // console.log("zzz ", web3.utils.toWei(myvalue).toString());

      let check_bnbValue = await palmareContractOf.methods.SaleToken(val).send({ from: accadress });
      // let value_after = web3.utils.fromWei(check_bnbValue)
      // value_after = web3.utils.fromWei(value_after)
      console.log("check runx ", check_bnbValue);


      // let pricePrToken = await nftContractOf.methods.pricePrToken().call();
      // pricePrToken = window.web3.utils.fromWei(pricePrToken, "ether")
      // console.log("pricePrToken", pricePrToken);
      // setpricepertoken(pricePrToken)


    } catch (e) {
      console.log(e);

      toast.error(e.messasge)
    }

  }
  onCopy = () => {
    setcopied(true);
  };
  const clickme = () => {
    setdisplay(!display)
  }
  let swap;
  if (display) {
    swap =
      <div className="col-lg-6 sm ">
        <div className="card py-3">
          <div className="card-title"><b>BNB TO RUNX</b></div>

          <div className="card-body">
            <div className="grey_div">
              <div className="d-flex justify-content-between">
                <p>From</p>
                <p>Balance: {userbalance} </p>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <input
                    type="text"
                    value={inputvalue}
                    placeholder="0.0"
                    className="input_card"
                    onChange={convertbnbtorunx}
                  />
                </div>
                <div className="col-lg-6">
                  <button className="btn input_btn ">Max</button>
                  <img src={busd} alt="" />
                </div>
              </div>
            </div>
            <AiOutlineArrowDown className="fs-4 fw-bold my-2" onClick={clickme}></AiOutlineArrowDown>
            <div className="grey_div">
              <div className="d-flex justify-content-between">
                <p>To</p>
                <p>Balance: {currentbalance} </p>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <input
                    type="text"
                    value={valueinbnb}
                    placeholder="0.0"
                    className="input_card"
                  />
                </div>
                <div className="col-lg-6">
                  <button className="btn input_btn ">Max</button>
                  <img src={Runx} alt="" style={{ width: "32px", height: "32px" }} />
                </div>
              </div>
              {/* <div className="d-flex justify-content-between mt-2">
                <p>Rate</p>
                <p>0.0155 BUSD = 1 PAL</p>
              </div> */}
              <button className="btn btn-dark rounded-5 w-100 mt-2" onClick={buyToken}>Buy</button>
            </div>
          </div>
        </div>
      </div>
  }
  else {
    swap = <div className="col-lg-6 sm ">
      <div className="card py-3">
        <div className="card-title"><b>RUNX TO BNB</b> </div>
        <div className="card-body">
          <div className="grey_div">
            <div className="d-flex justify-content-between">
              <p>From</p>
              <p>Balance: {currentbalance} </p>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <input
                  type="text"
                  onChange={convertrunxtobnb}
                  value={inputvaluerunx}
                  placeholder="0.0"
                  className="input_card"
                />
              </div>
              <div className="col-lg-6">
                <button className="btn input_btn ">Max</button>
                <img src={Runx} alt="" style={{ width: "32px", height: "32px" }} />
              </div>
            </div>
            {/* <div className="d-flex justify-content-between mt-2">
              <p>Rate</p>
              <p>0.0155 BUSD = 1 PAL</p>
            </div> */}
          </div>
          <AiOutlineArrowDown className="fs-4 fw-bold my-2" onClick={clickme}></AiOutlineArrowDown>

          <div className="grey_div">
            <div className="d-flex justify-content-between">
              <p>To</p>
              <p>Balance: {userbalance} </p>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <input
                  type="text"
                  value={valueinrunx}

                  placeholder="0.0"
                  className="input_card"

                />
              </div>
              <div className="col-lg-6">
                <button className="btn input_btn ">Max</button>
                <img src={busd} alt="" />
              </div>

            </div>
            <button className="btn btn-dark rounded-5 w-100 mt-2" onClick={buyRunx}>Sale</button>

          </div>

        </div>
      </div>
    </div>
  }
  return (
    <div className="Main_bg">
      <div className="container Main_inner">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="row ">
              <div className="col-lg-6 ">
                <div className="card ">
                  <div className="card-body">
                    <h3 className="box_h">Runx Phase </h3>
                    <div className="d-flex justify-content-start">
                      <button className="btn btn_card">Live</button>
                      <span>Phase is Live</span>
                    </div>
                    <div className="line"></div>
                    <div className="row justify-content-between mt-3">
                      <div className="col-lg-6">
                        <p className="card_para">Min Purchase</p>
                        <p className="cardd_h">{minimumbuytoken} BNB</p>
                      </div>
                      <div className="col-lg-6">
                        <p className="card_para ">Price per token</p>
                        <p className="cardd_h">{pricepertoken} BNB</p>
                      </div>
                    </div>
                    <div className="row justify-content-between mt-3">
                      <div className="col-lg-6">
                        <p className="card_para">Referral Reward</p>
                        <p className="cardd_h">{maxbuytoken} BNB</p>
                      </div>
                      <div className="col-lg-6">
                        <p className="card_para">Reward Time</p>
                        <p className="cardd_h">{days}:{hours}:{minutes}:{seconds}</p>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-lg-6">
                        <p className="card_para">withdrawable Amount</p>
                        <p className="cardd_h">{withdrawableamount} Token</p>

                        <button className="btn btn-dark rounded-5 d-flex justify-content-lg-start ms-3" onClick={withdrawamount}>Withdraw</button>

                      </div>
                      <div className="col-lg-6">
                        <p className="card_para">Remaning Amount</p>
                        <p className="cardd_h">{withdrawupcoming} BNB</p>

                      </div>
                    </div>
                    {/* <p className="card_para mb-2">swap progress</p>
                    <ProgressBar variant="success" now={60} />;
                    <div className="d-flex justify-content-between">
                      <p className="card_para  ">57.60%</p>
                      <p className="card_para ">8175483.0/14193548.0 PAL</p>
                    </div> */}
                  </div>
                </div>
              </div>
              {swap}
              <div className="col-md-10 mt-5 ">
                <input
                  value={`${initiallink}${refreallinks}`}

                  placeholder="refreal link "
                  className="  rounded-5 py-2 bg-transparent form-control"
                />

              </div>
              <div className="col-md-2 mt-5">
                <CopyToClipboard onCopy={onCopy} text={initiallink + refreallinks}>
                  <button className="btn btn-dark rounded-5 ">Copy Link</button>
                </CopyToClipboard>
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
}

export default Main_home;
