import {request} from 'gaxios';

export type SearchResult = {
  results: HeritageObject[];
};

export type ImageObject = {
  contentUrl: string;
  encodingFormat?: string;
  license: string;
  thumbnail?: ImageObject;
};

export type HeritageObject = {
  id: string;
  name: string;
  additionalType: string[];
  publisher: string;
  image: ImageObject;
};

export interface SearchByTermOptions {
  term: string;
}

type HeritageObjectFromEndpoint = {
  heritageObject: string;
  additionalType: string;
  name: string;
  publisher: string;
  imageContentUrl: string;
  imageEncodingFormat?: string;
  imageLicense: string;
  thumbnailContentUrl: string;
  thumbnailEncodingFormat?: string;
  thumbnailLicense: string;
};

export class HeritageObjects {
  async searchByTerm(options: SearchByTermOptions): Promise<SearchResult> {
    const endpointUrl =
      'https://api.data.netwerkdigitaalerfgoed.nl/queries/gvn-search-find/heritage-objects-search/run';

    const response = await request({
      url: endpointUrl,
      params: {
        term: options.term,
      },
    });

    const heritageObjects = response.data as HeritageObjectFromEndpoint[];

    const results = heritageObjects.map(
      (heritageObject: HeritageObjectFromEndpoint) => {
        return {
          id: heritageObject.heritageObject,
          name: heritageObject.name,
          additionalType: [heritageObject.additionalType],
          publisher: heritageObject.publisher,
          image: {
            contentUrl: heritageObject.imageContentUrl,
            encodingFormat: heritageObject.imageEncodingFormat,
            license: heritageObject.imageLicense,
            thumbnail: {
              contentUrl: heritageObject.thumbnailContentUrl,
              encodingFormat: heritageObject.thumbnailEncodingFormat,
              license: heritageObject.thumbnailLicense,
            },
          },
        };
      }
    );

    return {
      results,
    };
  }
}
