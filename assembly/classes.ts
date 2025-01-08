
@json
export class TripItem {

  @alias("TripItem.id")
  id!: string;


  @alias("TripItem.name")
  name!: string;


  @alias("TripItem.type")
  type!: string;


  @alias("TripItem.price")
  price!: string;


  @alias("TripItem.address")
  address!: string;


  @alias("TripItem.image")
  image!: string;


  @alias("TripItem.tags")
  tags: string[] = [];


  @alias("TripItem.cost_option")
  cost_option!: string;


  @alias("TripItem.description")
  description!: string;
}


@json
export class TripDataResult {

  @alias("TripDataResult.all_hotels")
  all_hotels!: TripItem[];


  @alias("TripDataResult.all_places")
  all_places!: TripItem[];


  @alias("TripDataResult.transportation")
  all_transportation!: TripItem[];
}


@json
export class TripData {

  @alias("TripData.result")
  result!: TripDataResult;
}


@json
export class ProcessingResults {

  @alias("ProcessingResults.hotels")
  hotels: string[] = [];


  @alias("ProcessingResults.places")
  places: string[] = [];


  @alias("ProcessingResults.transportation")
  transportation: string[] = [];
}

// @json
// export class TripPlanResponse {

//   @alias("TripPlanResponse.success")
//   success?: boolean;

//   @alias("TripPlanResponse.data")
//   data?: ProcessingResults;

//   @alias("TripPlanResponse.error")
//   error?: string;
// }

export class UidResult {

  @alias("UidResult.hotels")
  hotels: Map<string, string>[] = [];


  @alias("UidResult.places")
  places: Map<string, string>[] = [];


  @alias("UidResult.transportation")
  transportation: Map<string, string>[] = [];
}
