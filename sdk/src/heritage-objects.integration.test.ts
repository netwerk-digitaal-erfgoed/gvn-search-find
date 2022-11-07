import {HeritageObjects} from './heritage-objects';
import {describe, expect, it} from '@jest/globals';

describe('searchByTerm', () => {
  it('searches', async () => {
    const heritageObjects = new HeritageObjects();
    const result = await heritageObjects.searchByTerm({
      term: 'https://data.cultureelerfgoed.nl/term/id/cht/00dce1a8-e44a-4472-8558-0a1da2f920fb',
    });

    expect(result).toStrictEqual({
      results: [
        {
          id: 'http://data.collectienederland.nl/resource/document/museum-rotterdam/http-museumrotterdam.nl-collectie-item-43764-H.1-2',
          name: 'Kartonnen gebruiksaanwijzing van een "Dampf-Inhalations-Apparat" (stoom-inhaleerapparaat)',
          publisher: 'https://museumrotterdam.nl/',
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
        },
      ],
    });
  });
});
