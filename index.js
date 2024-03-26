const functions = require("@google-cloud/functions-framework");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();
const processOrder = async (input) => {
  try {
    // const result = await axios({
    //   method: "POST",
    //   url: process.env.ROBOQUILL_API,
    //   headers: {
    //     "X-Auth-Key": process.env.API_KEY,
    //     "Content-Type": "application/json",
    //   },
    //   data: {
    //     ...input,
    //   },
    // });
    console.log({
      method: "POST",
      url: process.env.ROBOQUILL_API,
      headers: {
        "X-Auth-Key": process.env.API_KEY,
        "Content-Type": "application/json",
      },
      data: {
        ...input,
      },
    });
    return null;
  } catch (error) {
    console.log(error);
  }
};
functions.http("wakeflow-template-func", async (req, res) => {
  if (req.method === "POST") {
    try {
      const input = req.body;
      const result = await processOrder(input);
      res.send({
        status: 200,
        data: result,
      });
    } catch (error) {
      res.send({ status: 500, error: error });
    }
  } else {
    res.send("Not Authorized");
  }
});
