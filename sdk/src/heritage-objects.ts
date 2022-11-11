import {request} from 'gaxios';

export class SearchResult {
  results: HeritageObject[] = [];
  // TBD: add 'totalCount' with number of matching objects?
}

export class ImageObject {
  contentUrl: string | undefined;
  encodingFormat: string | undefined;
  license: string | undefined;
  thumbnail: ImageObject | undefined;
}

export class HeritageObject {
  id: string | undefined;
  name: string | undefined;
  additionalType: string[] | undefined;
  publisher: string | undefined;
  description: string | undefined;
  creator: string[] | undefined;
  contentLocation: string[] | undefined;
  dateCreated: string | undefined; // Not: 'Date'
  image: ImageObject | undefined;
}

type HeritageObjectDataFromEndpoint = {
  heritageObject: string;
  additionalType?: string;
  name: string;
  publisher: string;
  description?: string;
  creator?: string;
  contentLocation?: string;
  dateCreated?: string;
  imageContentUrl: string;
  imageEncodingFormat?: string;
  imageLicense: string;
  thumbnailContentUrl: string;
  thumbnailEncodingFormat?: string;
  thumbnailLicense: string;
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
        pageSize: options.pageSize,
      },
    });

    const rawHeritageObjects =
      response.data as HeritageObjectDataFromEndpoint[];

    const results = rawHeritageObjects.map(
      (rawHeritageObject: HeritageObjectDataFromEndpoint) => {
        const heritageObject = new HeritageObject();
        heritageObject.id = rawHeritageObject.heritageObject;
        heritageObject.name = rawHeritageObject.name;
        heritageObject.publisher = rawHeritageObject.publisher;

        if (rawHeritageObject.description) {
          heritageObject.description = rawHeritageObject.description;
        }

        // FIXME: multiple types
        if (rawHeritageObject.additionalType) {
          heritageObject.additionalType = [rawHeritageObject.additionalType]; // Only one type remains after searching for a specific term
        }

        // FIXME: multiple content locations
        if (rawHeritageObject.contentLocation) {
          heritageObject.contentLocation = [rawHeritageObject.contentLocation];
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
        heritageObject.image.license = rawHeritageObject.imageLicense;

        heritageObject.image.thumbnail = new ImageObject();
        heritageObject.image.thumbnail.contentUrl =
          rawHeritageObject.thumbnailContentUrl;
        heritageObject.image.thumbnail.encodingFormat =
          rawHeritageObject.thumbnailEncodingFormat;
        heritageObject.image.thumbnail.license =
          rawHeritageObject.thumbnailLicense;

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
        heritageObject: options.id,
      },
    });

    const results = response.data as HeritageObjectDataFromEndpoint[];

    if (results.length === 0) {
      return undefined; // Unknown object?
    }

    const heritageObject = new HeritageObject();
    const contentLocations = new Set<string>();
    const additionalTypes = new Set<string>();
    const creators = new Set<string>();

    for (const rawHeritageObject of results) {
      heritageObject.id = rawHeritageObject.heritageObject;
      heritageObject.name = rawHeritageObject.name;
      heritageObject.publisher = rawHeritageObject.publisher;

      if (rawHeritageObject.description) {
        heritageObject.description = rawHeritageObject.description;
      }

      if (rawHeritageObject.additionalType) {
        additionalTypes.add(rawHeritageObject.additionalType);
      }

      if (rawHeritageObject.contentLocation) {
        contentLocations.add(rawHeritageObject.contentLocation);
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
      heritageObject.image.license = rawHeritageObject.imageLicense;

      heritageObject.image.thumbnail = new ImageObject();
      heritageObject.image.thumbnail.contentUrl =
        rawHeritageObject.thumbnailContentUrl;
      heritageObject.image.thumbnail.encodingFormat =
        rawHeritageObject.thumbnailEncodingFormat;
      heritageObject.image.thumbnail.license =
        rawHeritageObject.thumbnailLicense;
    }

    heritageObject.additionalType = Array.from(additionalTypes);
    heritageObject.contentLocation = Array.from(contentLocations);
    heritageObject.creator = Array.from(creators);

    return heritageObject;
  }
}
