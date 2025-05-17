import aiService from "../services/ai.service.js";

export const getReview = async (req, res) => {
  const code = req.body?.code;
  console.log("Incoming body:", req.body);
  console.log("code: ", code);
  if (!code) {
    return res.status(400).send("Prompt is required.");
  }
  try {
    const response = await aiService(code);
    return res.status(200).json({ result: response });
  } catch (error) {
    console.error("Error :", err);
    return res.status(500).send("Server Error! Something went wrong.");
  }
};
