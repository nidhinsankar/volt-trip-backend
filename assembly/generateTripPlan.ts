import { generateText } from "./generateText";
import { RESULT } from "./embeddings";
import { JSON } from "json-as";
import { TripData, TripItem, UidResult } from "./classes";
import { addContent } from ".";
const INSTRUCTION = `{
  "result": {
    "all_hotels":  [
        {
          "name": "string",
          "price": "number",
          "address": "string",
          "image": "string (URL)",
          "type":"stay_hotels"|"eatery_hotels"|"place"|"transportation",
          "tags": ["resort", "hostel","boutique","five-start","bed-and-breakfast","vegan-options","sea-view","free-wifi","breakfast-included","rooftop-dining","fine-dining"],
          "cost_option": "cheap | moderate | costly",
          "description": "string"
        }
      ],
    "all_places": [
      {
        "name": "string",
        "price": "string (price in number)",
        "address": "string",
        "image": "string (URL)",
        "type":"stay_hotels"|"eatery_hotels"|"place"|"transportation",
        "tags": ["landmark", "museum","nature","cultural","national-park","mountain","beach","waterfall","heritage-site","wildlife],
        "cost_option": "cheap | moderate | costly",
        "description": "string"
      }
    ],
    "all_transportation": [
      {
        "name": "string",
        "price": "number",
        "address": "string",
        "image": "string (URL)",
        "type":"stay_hotels"|"eatery_hotels"|"place"|"transportation",
        "tags": ["public", "private","express","luxury","budget","non-stop","shared","air-conditioned","on-demand"],
        "cost_option": "cheap | moderate | costly",
        "description": "string"
      }
    ]
  }
}
`;

export function generateTripPlan(
  location: string,
  days: string,
  people: string,
): string {
  const instruction = `Generate a JSON response containing travel-related data. Do not include any text, explanation, or formatting like \"\`\`\`json". Only return the JSON object The structure must follow this exact format
  IMPORTANT INSTRUCTION:
    don't change the key names of the json format.use the same format given below
    ${INSTRUCTION}
  `;
  const prompt = `You are going to ${location} for ${days} days with ${people} people!.give the information about the 3 with cheap,moderate,high price values so that user can have options to select the hotel hotels ,important places to visit, and the cost of the transportation charge and also give additional information like ->images.give the data as like this result:{all_hotels:[...all-hotels],all_places:[...all-places],transportation:[...all_transporatation]}`;
  const result = generateText(instruction, prompt);
  // const res =
  return result;
}

// export function addAllContents(data: string): void {
//   const result: TripData = JSON.parse(data); // Use type casting
//   const results: Map<string, string>[] = []; // Initialize results

//   for (let i = 0; i < result.result.all_hotels.length; i++) {
//     const hotelUid = addContent(result.result.all_hotels[i]);
//     if (hotelUid !== null) {
//       results.push(hotelUid);
//     }
//   }

//   for (let i = 0; i < result.result.all_places.length; i++) {
//     const placeUid = addContent(result.result.all_places[i]);
//     if (placeUid !== null) {
//       results.push(placeUid);
//     }
//   }

//   for (let i = 0; i < result.result.all_transportation.length; i++) {
//     const transportUid = addContent(result.result.all_transportation[i]);
//     if (transportUid !== null) {
//       results.push(transportUid);
//     }
//   }
// }
