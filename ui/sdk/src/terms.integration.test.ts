import {Term, Terms} from './terms';
import {describe, expect, it} from '@jest/globals';

describe('autocomplete', () => {
  it('returns a maximum number of entries', async () => {
    const terms = new Terms();
    const autocompletedTerms = await terms.autocomplete({word: 'sch'});

    expect(autocompletedTerms.length).toBe(25);
  });

  it('autocompletes on prefLabel', async () => {
    const terms = new Terms();
    const autocompletedTerms = await terms.autocomplete({word: 'vaartuig'});

    expect(autocompletedTerms).toMatchObject([
      {
        id: 'https://data.cultureelerfgoed.nl/term/id/cht/ffab7ecd-8caa-4191-a63f-ac8ed9258b19',
        matchingLabel: 'vaartuigen',
        prefLabel: 'vaartuigen',
        altLabel: [
          'schepen',
          'schip',
          'vaartuig',
          'watervaartuig',
          'watervaartuigen',
        ],
      },
    ]);
  });

  it('autocompletes on altLabel', async () => {
    const terms = new Terms();
    const autocompletedTerms = await terms.autocomplete({word: 'schepen'});

    expect(autocompletedTerms).toMatchObject([
      {
        id: 'https://data.cultureelerfgoed.nl/term/id/cht/ffab7ecd-8caa-4191-a63f-ac8ed9258b19',
        matchingLabel: 'schepen',
        prefLabel: 'vaartuigen',
        altLabel: [
          'schepen',
          'schip',
          'vaartuig',
          'watervaartuig',
          'watervaartuigen',
        ],
      },
    ]);
  });

  it('sorts by matching label', async () => {
    const terms = new Terms();
    const autocompletedTerms = await terms.autocomplete({word: 'aard'});

    expect(autocompletedTerms).toMatchObject([
      {
        id: 'https://data.cultureelerfgoed.nl/term/id/cht/cbf58794-f8b6-4e8b-bbc1-f62dcd450b35',
        matchingLabel: 'aardoppervlak',
        prefLabel: 'aardbodem',
        altLabel: ['aardoppervlak'],
      },
      {
        id: 'https://data.cultureelerfgoed.nl/term/id/cht/68c313ff-2555-423b-b1ed-f61f49a6e517',
        matchingLabel: 'aardse kijkers',
        prefLabel: 'aardse kijkers',
        altLabel: ['aardse kijker', 'refractor', 'refractoren'],
      },
    ]);
  });
});

describe('getById', () => {
  it('returns undefined if no term is found', async () => {
    const terms = new Terms();
    const term = await terms.getById({
      id: 'https://data.cultureelerfgoed.nl/term/id/cht/unknown',
    });

    expect(term).toBeUndefined();
  });

  it('returns term with limited properties', async () => {
    const terms = new Terms();
    const term = await terms.getById({
      id: 'https://data.cultureelerfgoed.nl/term/id/cht/e2ed17ab-d7e8-4793-9bb2-c854c94911de',
    });

    expect(term).toBeInstanceOf(Term);
    expect(term).toMatchObject({
      id: 'https://data.cultureelerfgoed.nl/term/id/cht/e2ed17ab-d7e8-4793-9bb2-c854c94911de',
      prefLabel: 'babykleding',
      altLabel: [],
      scopeNote: ["Kleding ontworpen voor en gedragen door baby's. (AAT)"],
      broader: [
        {
          id: 'https://data.cultureelerfgoed.nl/term/id/cht/5dec9aa2-5ced-4f77-b929-c043b90b2a8f',
          prefLabel: 'kleding',
        },
      ],
      narrower: [],
    });
  });

  it('returns term with all properties', async () => {
    const terms = new Terms();
    const term = await terms.getById({
      id: 'https://data.cultureelerfgoed.nl/term/id/cht/4b64c746-06bc-4db7-a7eb-7bbe788599f5',
    });

    expect(term).toBeInstanceOf(Term);
    expect(term).toMatchObject({
      id: 'https://data.cultureelerfgoed.nl/term/id/cht/4b64c746-06bc-4db7-a7eb-7bbe788599f5',
      prefLabel: 'marineschepen',
      altLabel: [
        'marineschip',
        'oorlogsbodem',
        'oorlogsschepen',
        'oorlogsschip',
        'oorlogsvaartuig',
        'oorlogsvaartuigen',
      ],
      scopeNote: [
        'Een oorlogsschip, ook oorlogsbodem, wordt gebruikt voor de oorlogsvoering te water. (Wikipedia)',
      ],
      broader: [
        {
          id: 'https://data.cultureelerfgoed.nl/term/id/cht/ffab7ecd-8caa-4191-a63f-ac8ed9258b19',
          prefLabel: 'vaartuigen',
        },
      ],
      narrower: [
        {
          id: 'https://data.cultureelerfgoed.nl/term/id/cht/20f8ee87-d620-40a8-8100-32e83020b07e',
          prefLabel: 'branders',
        },
      ],
    });
  });
});
