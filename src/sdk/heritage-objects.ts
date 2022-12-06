import { request } from 'gaxios';

export class SearchResult {
  results: HeritageObject[] = [];
  // TBD: add 'totalCount' with number of matching objects?
}

export class License {
  id: string | undefined;
  name: string | undefined;
}

export class ImageObject {
  contentUrl: string | undefined;
  encodingFormat: string | undefined;
  license: License | undefined;
  thumbnail: ImageObject | undefined;
}

export class Publisher {
  id: string | undefined;
  name: string | undefined;
}

export class Location {
  id: string | undefined;
  name: string | undefined;
}

export class HeritageObject {
  id: string | undefined;
  name: string | undefined;
  mainEntityOfPage: string | undefined;
  additionalType: string[] | undefined;
  publisher: Publisher | undefined;
  description: string | undefined;
  creator: string[] | undefined;
  contentLocation: Location[] | undefined;
  dateCreated: string | undefined; // Not: 'Date'
  image: ImageObject | undefined;
}

type HeritageObjectDataFromEndpoint = {
  heritageObject: string;
  additionalType?: string;
  name: string;
  mainEntityOfPage: string;
  publisher: string;
  publisherName: string;
  description?: string;
  creator?: string;
  contentLocation?: string;
  contentLocationName?: string;
  dateCreated?: string;
  imageContentUrl: string;
  imageEncodingFormat?: string;
  imageLicense: string;
  imageLicenseName: string;
  thumbnailContentUrl: string;
  thumbnailEncodingFormat?: string;
  thumbnailLicense: string;
  thumbnailLicenseName: string;
};

export interface SearchByTermOptions {
  term: string;
  page?: number; // Experimental; may not work all the time (unit = triples, not objects)
  pageSize?: number; // Experimental; may not work all the time (unit = triples, not objects)
}

export interface GetByIdOptions {
  id: string;
}

export class HeritageObjects {
  async searchByTerm(options: SearchByTermOptions): Promise<SearchResult> {
    const endpointUrl =
      'https://api.data.netwerkdigitaalerfgoed.nl/queries/gvn-search-find/heritage-objects-search/run';

    const response = await request({
      url: endpointUrl,
      params: {
        term: options.term,
        page: options.page,
        pageSize: options.pageSize
      }
    });

    const rawHeritageObjects =
      response.data as HeritageObjectDataFromEndpoint[];

    const results = rawHeritageObjects.map(
      (rawHeritageObject: HeritageObjectDataFromEndpoint) => {
        const heritageObject = new HeritageObject();
        heritageObject.id = rawHeritageObject.heritageObject;
        heritageObject.name = rawHeritageObject.name;
        heritageObject.mainEntityOfPage = rawHeritageObject.mainEntityOfPage;

        heritageObject.publisher = new Publisher();
        heritageObject.publisher.id = rawHeritageObject.publisher;
        heritageObject.publisher.name = rawHeritageObject.publisherName;

        if (rawHeritageObject.description) {
          heritageObject.description = rawHeritageObject.description;
        }

        // FIXME: multiple types
        if (rawHeritageObject.additionalType) {
          heritageObject.additionalType = [rawHeritageObject.additionalType]; // Only one type remains after searching for a specific term
        }

        // FIXME: multiple content locations
        if (rawHeritageObject.contentLocation) {
          const location = new Location();
          location.id = rawHeritageObject.contentLocation;
          location.name = rawHeritageObject.contentLocationName;
          heritageObject.contentLocation = [location];
        }

        // FIXME: multiple creators
        if (rawHeritageObject.creator) {
          heritageObject.creator = [rawHeritageObject.creator];
        }

        if (rawHeritageObject.dateCreated) {
          heritageObject.dateCreated = rawHeritageObject.dateCreated;
        }

        heritageObject.image = new ImageObject();
        heritageObject.image.contentUrl = rawHeritageObject.imageContentUrl;
        heritageObject.image.encodingFormat =
          rawHeritageObject.imageEncodingFormat;
        heritageObject.image.license = new License();
        heritageObject.image.license.id = rawHeritageObject.imageLicense;
        heritageObject.image.license.name = rawHeritageObject.imageLicenseName;

        heritageObject.image.thumbnail = new ImageObject();
        heritageObject.image.thumbnail.contentUrl =
          rawHeritageObject.thumbnailContentUrl;
        heritageObject.image.thumbnail.encodingFormat =
          rawHeritageObject.thumbnailEncodingFormat;
        heritageObject.image.thumbnail.license = new License();
        heritageObject.image.thumbnail.license.id =
          rawHeritageObject.thumbnailLicense;
        heritageObject.image.thumbnail.license.name =
          rawHeritageObject.thumbnailLicenseName;

        return heritageObject;
      }
    );

    const searchResult = new SearchResult();
    searchResult.results = results;

    return searchResult;
  }

  async getById(options: GetByIdOptions): Promise<HeritageObject | undefined> {
    const endpointUrl =
      'https://api.data.netwerkdigitaalerfgoed.nl/queries/gvn-search-find/heritage-object-detail/run';

    const response = await request({
      url: endpointUrl,
      params: {
        heritageObject: options.id
      }
    });

    const results = response.data as HeritageObjectDataFromEndpoint[];

    if (results.length === 0) {
      return undefined; // Unknown object?
    }

    const heritageObject = new HeritageObject();
    const contentLocations = new Map<string, Location>();
    const additionalTypes = new Set<string>();
    const creators = new Set<string>();

    for (const rawHeritageObject of results) {
      heritageObject.id = rawHeritageObject.heritageObject;
      heritageObject.name = rawHeritageObject.name;
      heritageObject.mainEntityOfPage = rawHeritageObject.mainEntityOfPage;

      heritageObject.publisher = new Publisher();
      heritageObject.publisher.id = rawHeritageObject.publisher;
      heritageObject.publisher.name = rawHeritageObject.publisherName;

      if (rawHeritageObject.description) {
        heritageObject.description = rawHeritageObject.description;
      }

      if (rawHeritageObject.additionalType) {
        additionalTypes.add(rawHeritageObject.additionalType);
      }

      if (rawHeritageObject.contentLocation) {
        if (!contentLocations.has(rawHeritageObject.contentLocation)) {
          const location = new Location();
          location.id = rawHeritageObject.contentLocation;
          location.name = rawHeritageObject.contentLocationName;
          contentLocations.set(rawHeritageObject.contentLocation, location);
        }
      }

      if (rawHeritageObject.creator) {
        creators.add(rawHeritageObject.creator);
      }

      if (rawHeritageObject.dateCreated) {
        heritageObject.dateCreated = rawHeritageObject.dateCreated;
      }

      heritageObject.image = new ImageObject();
      heritageObject.image.contentUrl = rawHeritageObject.imageContentUrl;
      heritageObject.image.encodingFormat =
        rawHeritageObject.imageEncodingFormat;
      heritageObject.image.license = new License();
      heritageObject.image.license.id = rawHeritageObject.imageLicense;
      heritageObject.image.license.name = rawHeritageObject.imageLicenseName;

      heritageObject.image.thumbnail = new ImageObject();
      heritageObject.image.thumbnail.contentUrl =
        rawHeritageObject.thumbnailContentUrl;
      heritageObject.image.thumbnail.encodingFormat =
        rawHeritageObject.thumbnailEncodingFormat;
      heritageObject.image.thumbnail.license = new License();
      heritageObject.image.thumbnail.license.id =
        rawHeritageObject.thumbnailLicense;
      heritageObject.image.thumbnail.license.name =
        rawHeritageObject.thumbnailLicenseName;
    }

    heritageObject.additionalType = Array.from(additionalTypes);
    heritageObject.contentLocation = Array.from(contentLocations.values());
    heritageObject.creator = Array.from(creators);

    return heritageObject;
  }
}
