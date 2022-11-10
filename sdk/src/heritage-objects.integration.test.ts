import {HeritageObject, HeritageObjects} from './heritage-objects';
import {describe, expect, it} from '@jest/globals';

describe('searchByTerm', () => {
  it('searches', async () => {
    const heritageObjects = new HeritageObjects();
    const result = await heritageObjects.searchByTerm({
      term: 'https://data.cultureelerfgoed.nl/term/id/cht/00dce1a8-e44a-4472-8558-0a1da2f920fb',
    });

    expect(result.results.length).toBe(1);
    expect(result.results[0]).toBeInstanceOf(HeritageObject);
    expect(result.results[0]).toMatchObject({
      id: 'http://data.collectienederland.nl/resource/document/museum-rotterdam/http-museumrotterdam.nl-collectie-item-43764-H.1-2',
      name: 'Kartonnen gebruiksaanwijzing van een "Dampf-Inhalations-Apparat" (stoom-inhaleerapparaat)',
      publisher: 'https://museumrotterdam.nl/',
      contentLocation: ['https://sws.geonames.org/2747891/'],
      dateCreated: '1880',
      additionalType: [
        'https://data.cultureelerfgoed.nl/term/id/cht/00dce1a8-e44a-4472-8558-0a1da2f920fb',
      ],
      image: {
        contentUrl:
          'http://museumrotterdam.blob.core.windows.net/lowres/43764-H.1-2_1.jpg',
        encodingFormat: 'image/jpeg',
        license: 'https://rightsstatements.org/page/InC/1.0/',
        thumbnail: {
          contentUrl:
            'http://museumrotterdam.blob.core.windows.net/lowres/43764-H.1-2_1.jpg',
          encodingFormat: 'image/jpeg',
          license: 'https://rightsstatements.org/page/InC/1.0/',
        },
      },
    });
  });

  it('returns n results', async () => {
    const heritageObjects = new HeritageObjects();
    const result = await heritageObjects.searchByTerm({
      term: 'https://data.cultureelerfgoed.nl/term/id/cht/3469cfa5-98e8-438e-99c9-d0965b27e2ec',
      pageSize: 2,
    });

    expect(result.results.length).toBe(2);
  });

  it('returns n results from a given page', async () => {
    const heritageObjects = new HeritageObjects();
    const result = await heritageObjects.searchByTerm({
      term: 'https://data.cultureelerfgoed.nl/term/id/cht/3469cfa5-98e8-438e-99c9-d0965b27e2ec',
      page: 11,
      pageSize: 1,
    });

    expect(result.results.length).toBe(1);
  });
});

describe('getById', () => {
  it('returns undefined if no heritage object is found', async () => {
    const heritageObjects = new HeritageObjects();
    const heritageObject = await heritageObjects.getById({
      id: 'https://unknown.com',
    });

    expect(heritageObject).toBeUndefined();
  });

  it('returns heritage object', async () => {
    const heritageObjects = new HeritageObjects();
    const heritageObject = await heritageObjects.getById({
      id: 'http://data.collectienederland.nl/resource/document/museum-rotterdam/http-museumrotterdam.nl-collectie-item-31516',
    });

    expect(heritageObject).toBeInstanceOf(HeritageObject);
    expect(heritageObject).toMatchObject({
      id: 'http://data.collectienederland.nl/resource/document/museum-rotterdam/http-museumrotterdam.nl-collectie-item-31516',
      name: '"A.B.C.-Boek, zijnde de eerste tafels van de eerste oefeningen in het lezen", in blauwe omslag',
      publisher: 'https://museumrotterdam.nl/',
      creator: ['De Erven Loosjes'],
      contentLocation: ['https://sws.geonames.org/2747891/'],
      dateCreated: '1878',
      additionalType: [
        'https://data.cultureelerfgoed.nl/term/id/cht/b2619bd2-0cdc-4fb1-9998-a69d9ab08421',
        'https://data.cultureelerfgoed.nl/term/id/cht/9b6df02d-ad77-4274-84be-0f83841a2838',
      ],
      image: {
        contentUrl:
          'http://museumrotterdam.blob.core.windows.net/lowres/31516_2.jpg',
        encodingFormat: 'image/jpeg',
        license: 'https://rightsstatements.org/page/InC/1.0/',
        thumbnail: {
          contentUrl:
            'http://museumrotterdam.blob.core.windows.net/lowres/31516_2.jpg',
          encodingFormat: 'image/jpeg',
          license: 'https://rightsstatements.org/page/InC/1.0/',
        },
      },
    });
  });
});
