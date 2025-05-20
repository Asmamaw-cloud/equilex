import axios from "axios";

export async function addFaq(question: string, answer: string) {
  try {
    const response = await axios.post("/api/faq", { question, answer });
    if (response.status < 200 || response.status >= 300) {
      throw new Error(`Error: ${response.statusText}`);
    }

    console.log("response from add faq: ", response);
  } catch (error) {
    console.error("couldn't add faw ", error);
  }
}

export async function getFaq() {
  try {
    const response = await axios.get(`/api/faq`);
    if (response.status < 200 || response.status >= 300) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return response.data.faqs;
  } catch (error) {
    console.error("Couldn't get faqs ", error);
  }
}
