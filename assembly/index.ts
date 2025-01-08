import { JSON } from "json-as";
import { embedText } from "./embeddings";
import { buildTripMutationJson } from "./trip-helpers";
import {
  addEmbeddingToJson,
  deleteNodePredicates,
  getAllContents,
  getEntityById,
  ListOf,
  searchBySimilarity,
  searchByTags,
} from "./dgraph-utils";
import { dgraph } from "@hypermode/modus-sdk-as";
import { TripItem } from "./classes";

export * from "./generateText";
export * from "./generateTripPlan";

const DGRAPH_CONNECTION = "dgraph-grpc";

export function addContent(content: TripItem): Map<string, string> | null {
  var payload = buildTripMutationJson(DGRAPH_CONNECTION, content);

  const embedding = embedText([content.name])[0];
  payload = addEmbeddingToJson(payload, "TripItem.embedding", embedding);

  const mutations: dgraph.Mutation[] = [new dgraph.Mutation(payload)];
  const uids = dgraph.execute(
    DGRAPH_CONNECTION,
    new dgraph.Request(null, mutations),
  ).Uids;

  return uids;
}

export function getTrip(id: string): TripItem | null {
  const body = `
    TripItem.id
    TripItem.name
    TripItem.price
    TripItem.type
    TripItem.address
    TripItem.image
    TripItem.tags
    TripItem.cost_option
    TripItem.description`;
  return getEntityById<TripItem>(DGRAPH_CONNECTION, "TripItem.id", id, body);
}

export function deleteTrip(id: string): void {
  deleteNodePredicates(DGRAPH_CONNECTION, `eq(TripItem.id, "${id}")`, [
    "TripItem.id",
    "TripItem.name",
    "TripItem.price",
    "TripItem.type",
    "TripItem.address",
    "TripItem.image",
    "TripItem.tags",
    "TripItem.cost_option",
    "TripItem.description",
  ]);
}

export function searchTrip(
  query: string,
  contentType: string = "",
): TripItem[] {
  const embedding = embedText([query])[0];
  const topK = 10;

  let typeFilter = "";
  if (contentType != "") {
    typeFilter = ` @filter(eq(TripItem.type, "${contentType}"))`;
  }

  const body = `
    TripItem.id
    TripItem.name
    TripItem.type
    TripItem.address
    TripItem.tags
    TripItem.cost_option
  `;
  return searchBySimilarity<TripItem>(
    DGRAPH_CONNECTION,
    embedding,
    "TripItem.embedding",
    body,
    topK,
  );
}

export function getTripByType(type: string): TripItem[] {
  const query = new dgraph.Query(`{
    list(func: eq(TripItem.type, "${type}")) {
      TripItem.id
      TripItem.name
      TripItem.price
      TripItem.type
      TripItem.price
      TripItem.address
      TripItem.image
      TripItem.tags
      TripItem.cost_option
    }
  }`);

  const response = dgraph.execute(DGRAPH_CONNECTION, new dgraph.Request(query));
  const data = JSON.parse<ListOf<TripItem>>(response.Json);
  return data.list;
}

export function getAllTrip(): TripItem[] {
  const body = `
    TripItem.id
      TripItem.name
      TripItem.price
      TripItem.type
      TripItem.address
      TripItem.image
      TripItem.tags
      TripItem.cost_option`;
  return getAllContents<TripItem>(DGRAPH_CONNECTION, body);
}

export function getAllTags(): string[] {
  const query = new dgraph.Query(`{
    list(func: type(TripItem)) @filter(has(TripItem.tags)) {
      TripItem.tags
    }
  }`);

  const response = dgraph.execute(DGRAPH_CONNECTION, new dgraph.Request(query));
  const data = JSON.parse<ListOf<TripItem>>(response.Json);

  // Create a unique set of tags
  const uniqueTags = new Set<string>();
  for (let i = 0; i < data.list.length; i++) {
    const content = data.list[i];
    if (content.tags) {
      for (let j = 0; j < content.tags.length; j++) {
        uniqueTags.add(content.tags[j]);
      }
    }
  }

  // Convert set to array
  const tags: string[] = [];
  const values = uniqueTags.values();
  for (let i = 0; i < uniqueTags.size; i++) {
    tags.push(values[i]);
  }
  return tags;
}

export function getTripByTags(tags: string[]): TripItem[] {
  const body = `
      TripItem.id
      TripItem.name
      TripItem.price
      TripItem.type
      TripItem.price
      TripItem.address
      TripItem.image
      TripItem.tags
      TripItem.cost_option
      `;
  return searchByTags<TripItem>(DGRAPH_CONNECTION, tags, body);
}

export function getTripByTag(tag: string): TripItem[] {
  const query = new dgraph.Query(`{
    list(func: type(TripItem)) @filter(has(TripItem.tags) AND anyofterms(TripItem.tags, "${tag}")) {
      TripItem.id
      TripItem.name
      TripItem.price
      TripItem.type
      TripItem.price
      TripItem.address
      TripItem.image
      TripItem.tags
      TripItem.cost_option
    }
  }`);

  const response = dgraph.execute(DGRAPH_CONNECTION, new dgraph.Request(query));
  const data = JSON.parse<ListOf<TripItem>>(response.Json);
  return data.list;
}
