import { config } from "../../../config/config";
import { formatEqpdqData } from "./format-epdq-data";

export const barclaysCheckoutForm = async (totalPrice, userDetails, orderNo) => {
  const epdqFormat = formatEqpdqData(totalPrice, userDetails, orderNo);
  let epdqData;

  try {
    const fetchEpdqData = await fetch("/api/epdq", {
      method: "POST",
      body: JSON.stringify(epdqFormat),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const fetchedData = await fetchEpdqData.json();
    epdqData = fetchedData;
  } catch (error) {
    console.error(error, orderNo);
  }

  const form = document.createElement("form");
  form.setAttribute("method", "post");
  form.setAttribute("action", config.epdqURL);

  const ACCEPTURL = document.createElement("input");
  ACCEPTURL.setAttribute("name", "ACCEPTURL");
  ACCEPTURL.setAttribute("value", epdqData.ACCEPTURL);
  ACCEPTURL.setAttribute("type", "hidden");

  const AMOUNT = document.createElement("input");
  AMOUNT.setAttribute("name", "AMOUNT");
  AMOUNT.setAttribute("value", epdqData.AMOUNT);
  AMOUNT.setAttribute("type", "hidden");

  const BACKURL = document.createElement("input");
  BACKURL.setAttribute("name", "BACKURL");
  BACKURL.setAttribute("value", epdqData.BACKURL);
  BACKURL.setAttribute("type", "hidden");

  const CANCELURL = document.createElement("input");
  CANCELURL.setAttribute("name", "CANCELURL");
  CANCELURL.setAttribute("value", epdqData.CANCELURL);
  CANCELURL.setAttribute("type", "hidden");

  const CATALOGURL = document.createElement("input");
  CATALOGURL.setAttribute("name", "CATALOGURL");
  CATALOGURL.setAttribute("value", epdqData.CATALOGURL);
  CATALOGURL.setAttribute("type", "hidden");

  const CN = document.createElement("input");
  CN.setAttribute("name", "CN");
  CN.setAttribute("value", epdqData.CN);
  CN.setAttribute("type", "hidden");

  const COM = document.createElement("input");
  COM.setAttribute("name", "COM");
  COM.setAttribute("value", epdqData.COM);
  COM.setAttribute("type", "hidden");

  const COMPLUS = document.createElement("input");
  COMPLUS.setAttribute("name", "COMPLUS");
  COMPLUS.setAttribute("value", epdqData.COMPLUS);
  COMPLUS.setAttribute("type", "hidden");

  const CURRENCY = document.createElement("input");
  CURRENCY.setAttribute("name", "CURRENCY");
  CURRENCY.setAttribute("value", epdqData.CURRENCY);
  CURRENCY.setAttribute("type", "hidden");

  const DECLINEURL = document.createElement("input");
  DECLINEURL.setAttribute("name", "DECLINEURL");
  DECLINEURL.setAttribute("value", epdqData.DECLINEURL);
  DECLINEURL.setAttribute("type", "hidden");

  const EMAIL = document.createElement("input");
  EMAIL.setAttribute("name", "EMAIL");
  EMAIL.setAttribute("value", epdqData.EMAIL);
  EMAIL.setAttribute("type", "hidden");

  const EXCEPTIONURL = document.createElement("input");
  EXCEPTIONURL.setAttribute("name", "EXCEPTIONURL");
  EXCEPTIONURL.setAttribute("value", epdqData.EXCEPTIONURL);
  EXCEPTIONURL.setAttribute("type", "hidden");

  const HOMEURL = document.createElement("input");
  HOMEURL.setAttribute("name", "HOMEURL");
  HOMEURL.setAttribute("value", epdqData.HOMEURL);
  HOMEURL.setAttribute("type", "hidden");

  const LANGUAGE = document.createElement("input");
  LANGUAGE.setAttribute("name", "LANGUAGE");
  LANGUAGE.setAttribute("value", epdqData.LANGUAGE);
  LANGUAGE.setAttribute("type", "hidden");

  const ORDERID = document.createElement("input");
  ORDERID.setAttribute("name", "ORDERID");
  ORDERID.setAttribute("value", epdqData.ORDERID);
  ORDERID.setAttribute("type", "hidden");

  const OWNERADDRESS = document.createElement("input");
  OWNERADDRESS.setAttribute("name", "OWNERADDRESS");
  OWNERADDRESS.setAttribute("value", epdqData.OWNERADDRESS);
  OWNERADDRESS.setAttribute("type", "hidden");

  const OWNERTOWN = document.createElement("input");
  OWNERTOWN.setAttribute("name", "OWNERTOWN");
  OWNERTOWN.setAttribute("value", epdqData.OWNERTOWN);
  OWNERTOWN.setAttribute("type", "hidden");

  const OWNERZIP = document.createElement("input");
  OWNERZIP.setAttribute("name", "OWNERZIP");
  OWNERZIP.setAttribute("value", epdqData.OWNERZIP);
  OWNERZIP.setAttribute("type", "hidden");

  const PARAMVAR = document.createElement("input");
  PARAMVAR.setAttribute("name", "PARAMVAR");
  PARAMVAR.setAttribute("value", epdqData.PARAMVAR);
  PARAMVAR.setAttribute("type", "hidden");

  const PSPID = document.createElement("input");
  PSPID.setAttribute("name", "PSPID");
  PSPID.setAttribute("value", epdqData.PSPID);
  PSPID.setAttribute("type", "hidden");

  const SHASIGN = document.createElement("input");
  SHASIGN.setAttribute("name", "SHASIGN");
  SHASIGN.setAttribute("value", epdqData.SHASIGN);
  SHASIGN.setAttribute("type", "hidden");

  const TITLE = document.createElement("input");
  TITLE.setAttribute("name", "TITLE");
  TITLE.setAttribute("value", epdqData.TITLE);
  TITLE.setAttribute("type", "hidden");

  const TP = document.createElement("input");
  TP.setAttribute("name", "TP");
  TP.setAttribute("value", "shootingsupplies_payment_template.html");
  TP.setAttribute("type", "hidden");

  form.appendChild(ACCEPTURL);
  form.appendChild(AMOUNT);
  form.appendChild(BACKURL);
  form.appendChild(CANCELURL);
  form.appendChild(CATALOGURL);
  form.appendChild(CN);
  form.appendChild(COM);
  form.appendChild(COMPLUS);
  form.appendChild(CURRENCY);
  form.appendChild(DECLINEURL);
  form.appendChild(EMAIL);
  form.appendChild(EXCEPTIONURL);
  form.appendChild(HOMEURL);
  form.appendChild(LANGUAGE);
  form.appendChild(ORDERID);
  form.appendChild(OWNERADDRESS);
  // form.appendChild(OWNERTELNO);
  form.appendChild(OWNERTOWN);
  form.appendChild(OWNERZIP);
  form.appendChild(PSPID);
  form.appendChild(SHASIGN);
  form.appendChild(TITLE);
  form.appendChild(TP);

  document.body.appendChild(form);
  form.submit();
};
