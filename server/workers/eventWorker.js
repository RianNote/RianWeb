import axios from "axios";
import tApiConfig from "../../config/tApiConfig";
import querystring from "querystring";

const { TDCProjectKey } = tApiConfig;
const config = {
	host: "apis.sktelecom.com",
	Referer: "",
	headers: {
		TDCProjectKey,
		"Content-Length": "320",
		"Content-Type": "application/json",
		Accept: "application/json"
	}
};

axios
	.get(
		"https://apis.sktelecom.com/v1/eventday/days",
		querystring.stringify({ type: "h", year: "2017" }),
		config
	)
	.then(response => console.log("RESPONSE", response))
	.catch(err => console.log(err));
