const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const calculateComplexity = async (req, res) => {
  const { algorithmName } = req.body;

  const prompt = `What is the worst case time and space complexity of the ${algorithmName} algorithm?`;

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 1000,
      temperature: 0,
    });

    const answer = response.data.choices[0].text;

    res.status(200).json({
      success: true,
      data: answer,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: "Error in calculating complexity",
    });
  }
};

module.exports = { calculateComplexity };
