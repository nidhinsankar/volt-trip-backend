import { JSON } from "json-as";
import { GraphSchema, injectNodeUid } from "./dgraph-utils";
import { TripItem } from "./classes";

const trip_schema: GraphSchema = new GraphSchema();

trip_schema.node_types.set("TripItem", {
  id_field: "TripItem.id",
  relationships: [],
});

export function buildTripMutationJson(
  connection: string,
  tripitem: TripItem,
): string {
  var payload = JSON.stringify(tripitem);

  payload = injectNodeUid(connection, payload, "TripItem", trip_schema);

  return payload;
}
