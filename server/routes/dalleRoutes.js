import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

const router = express.Router();

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
});

console.log({ OPENAI_API_KEY });

const openai = new OpenAIApi(configuration);

router.route("/").get((req, res) => {
    res.send("Hello from DALL-E!");
});

router.route("/").post(async (req, res) => {
    try {
        const { prompt } = req.body;

        const aiResponse = await openai.createImage({
            prompt: "a stained glass window depicting a hamburger and french fries",
            n: 1,
            size: "1024x1024",
            response_format: "b64_json",
        });

        const image = aiResponse.data.data[0].b64_json;
        res.status(200).json({ image });
    } catch (error) {
        console.error(error);
        res.status(500).send(
            error?.response.data.error.message || "Something went wrong"
        );
    }
});

export default router;
