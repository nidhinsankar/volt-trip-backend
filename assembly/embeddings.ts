import { models } from "@hypermode/modus-sdk-as";
import { EmbeddingsModel } from "@hypermode/modus-sdk-as/models/experimental/embeddings";

const EMBEDDINGMODEL = "minilm";

export function embedText(content: string[]): f32[][] {
  const model = models.getModel<EmbeddingsModel>(EMBEDDINGMODEL);
  const input = model.createInput(content);
  const output = model.invoke(input);
  return output.predictions;
}

export const RESULT: string = `{
  "result": {
    "all_hotels": [
      {
        "name": "Hotel Pena de Mar",
        "price": 800,
        "address": "Bardez, Goa, India",
        "image": "https://www.hotelpenademar.com/wp-content/uploads/2017/05/Hotel-Pena-de-Mer-Goa.jpg",
        "type": "stay_hotels",
        "tags": ["resort", "hostel", "boutique", "sea-view", "free-wifi"],
        "cost_option": "cheap",
        "description": "A beautiful resort in the heart of Goa, with stunning views of the Arabian Sea."
      },
      {
        "name": "The Park Calangute Goa",
        "price": 2200,
        "address": "Sinq, Calangute, Bardez, Goa 403516, India",
        "image": "https://www.theparkhotels.in/goa/images/hero-image-2.jpg",
        "type": "stay_hotels",
        "tags": ["five-start", "sea-view", "free-wifi", "breakfast-included"],
        "cost_option": "moderate",
        "description": "A luxurious five-star hotel in Calangute, with comfortable rooms and excellent service."
      },
      {
        "name": "Taj Exotica Resort & Spa",
        "price": 5000,
        "address": "Varca, Benaulim, Salcette, Goa 403713, India",
        "image": "https://www.tajhotels.com/taj/taj-exotica-resort-and-spa-goa/images/hero-image.jpg",
        "type": "stay_hotels",
        "tags": ["five-start", "resort", "boutique", "sea-view", "fine-dining"],
        "cost_option": "high",
        "description": "A luxurious five-star resort in Varca, with stunning views of the Arabian Sea and excellent dining options."
      }
    ],
    "all_places": [
      {
        "name": "Fort Aguada",
        "price": "Free",
        "address": "Aguada, Bardez, Goa, India",
        "image": "https://en.wikipedia.org/wiki/Fort_Aguada#/media/File:Fort_Aguada.jpg",
        "type": "place",
        "tags": ["landmark", "heritage-site"],
        "cost_option": "cheap",
        "description": "A 17th-century Portuguese fort in Goa, with stunning views of the Arabian Sea."
      },
      {
        "name": "Dudhsagar Waterfalls",
        "price": "100",
        "address": "Mollem National Park, Goa, India",
        "image": "https://en.wikipedia.org/wiki/Dudhsagar_Falls#/media/File:Dudhsagar_Falls.jpg",
        "type": "place",
        "tags": ["waterfall", "nature"],
        "cost_option": "moderate",
        "description": "A stunning waterfall in the Western Ghats mountain range, with scenic hiking trails."
      },
      {
        "name": "Mangeshi Temple",
        "price": "50",
        "address": "Mangeshi, Ponda, Goa, India",
        "image": "https://www.goatourism.org/temples/mangeshi-temple/",
        "type": "place",
        "tags": ["cultural", "heritage-site"],
        "cost_option": "cheap",
        "description": "A 18th-century Hindu temple in Ponda, with beautiful architecture and peaceful surroundings."
      }
    ],
    "transportation": [
      {
        "name": "Goa International Airport",
        "price": 100,
        "address": "Vasco da Gama, Goa, India",
        "image": "https://www.goaindia.in/wp-content/uploads/2017/09/Goa-International-Airport.jpg",
        "type": "transportation",
        "tags": ["public", "airport"],
        "cost_option": "cheap",
        "description": "The primary international airport in Goa, serving domestic and international flights."
      },
      {
        "name": "Goa State Road Transport Corporation",
        "price": 20,
        "address": "Panaji, Goa, India",
        "image": "https://gsrtc.goa.gov.in/images/logo.jpg",
        "type": "transportation",
        "tags": ["public", "bus"],
        "cost_option": "cheap",
        "description": "A state-run bus service in Goa, connecting major towns and cities."
      },
      {
        "name": "Uber",
        "price": 500,
        "address": "Panaji, Goa, India",
        "image": "https://www.uber.com/countries/in/images/Uber-Logo-White-1.png",
        "type": "transportation",
        "tags": ["private", "Uber"],
        "cost_option": "moderate",
        "description": "A popular ride-hailing service in Goa, offering private transportation."
      }
    ]
  }
}`;
