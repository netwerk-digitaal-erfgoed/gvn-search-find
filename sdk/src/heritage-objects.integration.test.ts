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
      publisher: {
        id: 'https://museumrotterdam.nl/',
        name: 'Museum Rotterdam',
      },
      contentLocation: [
        {
          id: 'https://sws.geonames.org/2747891/',
          name: 'Rotterdam',
        },
      ],
      dateCreated: '1880',
      additionalType: [
        'https://data.cultureelerfgoed.nl/term/id/cht/00dce1a8-e44a-4472-8558-0a1da2f920fb',
      ],
      image: {
        contentUrl:
          'http://museumrotterdam.blob.core.windows.net/lowres/43764-H.1-2_1.jpg',
        encodingFormat: 'image/jpeg',
        license: {
          id: 'https://rightsstatements.org/page/InC/1.0/',
          name: 'In copyright',
        },
        thumbnail: {
          contentUrl:
            'http://museumrotterdam.blob.core.windows.net/lowres/43764-H.1-2_1.jpg',
          encodingFormat: 'image/jpeg',
          license: {
            id: 'https://rightsstatements.org/page/InC/1.0/',
            name: 'In copyright',
          },
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
      id: 'http://data.collectienederland.nl/resource/document/museum-rotterdam/http-museumrotterdam.nl-collectie-item-47240-A-N',
    });

    expect(heritageObject).toBeInstanceOf(HeritageObject);
    expect(heritageObject).toMatchObject({
      id: 'http://data.collectienederland.nl/resource/document/museum-rotterdam/http-museumrotterdam.nl-collectie-item-47240-A-N',
      name: 'Veertien in papier verpakte dubbele stukken Sunlight huishoudzeep, veelkleurig',
      publisher: {
        id: 'https://museumrotterdam.nl/',
        name: 'Museum Rotterdam',
      },
      description:
        'Per twee in papier verpakte, aan elkaar bevestigde, stukken huishoudzeep. Stukken zeep hebben verdiepte bovenkant en onderkant en zijn voorzien van tekst.',
      creator: ["fabrikant product: Lever's Zeepmaatschappij N.V."],
      contentLocation: [
        {
          id: 'https://sws.geonames.org/2747891/',
          name: 'Rotterdam',
        },
      ],
      dateCreated: '1925',
      additionalType: [
        'https://data.cultureelerfgoed.nl/term/id/cht/0a127f93-9c65-44bf-a850-52e7fd34f9b2',
        'https://data.cultureelerfgoed.nl/term/id/cht/96e58507-631f-4ccd-b0cc-694e3fe7a4a6',
        'https://data.cultureelerfgoed.nl/term/id/cht/a2a95064-a74d-4752-8765-22ed1c4d4110',
      ],
      image: {
        contentUrl:
          'http://museumrotterdam.blob.core.windows.net/lowres/47240-A-N_1.jpg',
        encodingFormat: 'image/jpeg',
        license: {
          id: 'https://rightsstatements.org/page/InC/1.0/',
          name: 'In copyright',
        },
        thumbnail: {
          contentUrl:
            'http://museumrotterdam.blob.core.windows.net/lowres/47240-A-N_1.jpg',
          encodingFormat: 'image/jpeg',
          license: {
            id: 'https://rightsstatements.org/page/InC/1.0/',
            name: 'In copyright',
          },
        },
      },
    });
  });
});
