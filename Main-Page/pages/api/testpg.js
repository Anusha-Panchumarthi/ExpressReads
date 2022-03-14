const OpenAI = require('openai-api');
const openai = new OpenAI(process.env.OPENAI_API_KEY);


var paperContent ="Union Minister for Ayush Shri Sarbananda Sonobal today inaugurated the 25th Convocation of Rashtriya Ayurveda Vidyapeeth (RAV), an autonomous organisation under the Ministry of Ayush, where he urged the young Vaidyas to prepare themselves to bring the traditional medicine and knowledge on the world map and take India to a new height and help the mankind. The Minister was speaking at the convocation of RAV held at New Delhi, which was presided over by the Secretary, Ministry of Ayush Vaidya Rajesh Kotecha and Vaidya Devinder Triguna. While addressing the event, Shri Sonowal urged the young Vaidyas to prepare themselves to bring the traditional medicine and knowledge on the world map and take India to new heights and help mankind. The Minister appreciated RAV for its work in promoting Ayurveda. Appreciating the Prime Minister Shri Narendra Modi for dedicatedly working and putting India as a global leader in Ayurveda, Shri Sonowalji said, “It is a matter of pride and honour for us the World Health Organisation (WHO) has decided to set up a Global Centre for Traditional Medicine in India. MoS Ayush Dr. Mahendra Munjapara also addressed the convocation through video conferencing and said that the students should involve themselves in new innovations in the Ayurveda sector. Shri Sonowal honoured Vaidya Subhash Ranade and Vaidya Tarachand Sharma with the Lifetime Achievement Award 2021-22 for their outstanding contribution to the promotion of Ayurveda. He also honoured 12 Vaidyas with Fellow of RAV (FRAV). Speaking on the Occasion Secretary Ayush said that RAV had carried out several projects which were never done in the past. He urged that those in the practice domain should voluntarily come into the teaching line as a great number of students pass out from Ayurvedic colleges every year. This will help in finding a solution to the shortage of doctors, medicines and supply chain. Many dignitaries including Advisor Ayurveda Vaidya Manoj Nesari, Chairman NCISM Vaidya Jayant Deo Pujari and RAV Director Vaidya Anupam Srivastava, Dr Shakti Kumar Gupta Director AIIMS, Jammu also participated in the event."

paperContent =  paperContent.concat("\n tl;dr:")
export default async (req, res) => {
  let prompt = paperContent;
  const gptResponse = await openai.complete({
    engine: 'davinci',
    prompt: prompt,
    maxTokens: 140,
    temperature: 0.3,
    topP: 1,
    presencePenalty: 0,
    frequencyPenalty: 0,
    bestOf: 1,
    n: 1
});
res.status(200).json({text: `${gptResponse.data.choices[0].text}`})
  console.log("hello")

  
}



