import { models } from "@hypermode/modus-sdk-as";
import {
  OpenAIChatModel,
  SystemMessage,
  UserMessage,
} from "@hypermode/modus-sdk-as/models/openai/chat";

export function generateText(instruction: string, prompt: string): string {
  const modelName = "text-generator";
  const model = models.getModel<OpenAIChatModel>(modelName);
  const input = model.createInput([
    new SystemMessage(instruction),
    new UserMessage(prompt),
  ]);
  input.temperature = 0.7;
  const output = model.invoke(input);
  return output.choices[0].message.content.trim();
}
