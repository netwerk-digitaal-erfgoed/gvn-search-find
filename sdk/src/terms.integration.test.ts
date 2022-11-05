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
          id: 'https://data.cultureelerfgoed.nl/term/id/cht/18eec4f3-9029-42bb-87e4-93205a307ac7',
          prefLabel: 'admiraalsschepen',
        },
        {
          id: 'https://data.cultureelerfgoed.nl/term/id/cht/99e2e88d-b951-4e24-82a8-c6239e460727',
          prefLabel: 'baardsen',
        },
        {
          id: 'https://data.cultureelerfgoed.nl/term/id/cht/675a3608-a6bb-4af1-819b-f8fc5b7ac19c',
          prefLabel: 'barkelonge',
        },
        {
          id: 'https://data.cultureelerfgoed.nl/term/id/cht/a9010496-24fd-4954-973b-c0144e5d566f',
          prefLabel: 'blokschepen',
        },
        {
          id: 'https://data.cultureelerfgoed.nl/term/id/cht/20f8ee87-d620-40a8-8100-32e83020b07e',
          prefLabel: 'branders',
        },
        {
          id: 'https://data.cultureelerfgoed.nl/term/id/cht/cf506ff2-3954-458a-ab63-30aaf43f3081',
          prefLabel: 'depotschepen',
        },
        {
          id: 'https://data.cultureelerfgoed.nl/term/id/cht/c5365de3-4d0d-49a5-96f7-c2f0905f3799',
          prefLabel: 'escortevaartuigen',
        },
        {
          id: 'https://data.cultureelerfgoed.nl/term/id/cht/822a0433-9a69-4b9e-b3d2-d1a33bd5cc09',
          prefLabel: 'fregatten',
        },
        {
          id: 'https://data.cultureelerfgoed.nl/term/id/cht/1bd4eec4-590e-497f-b183-86786611ccaf',
          prefLabel: 'gaffelkannoneerboten',
        },
        {
          id: 'https://data.cultureelerfgoed.nl/term/id/cht/1dabe904-f0fb-4892-a78c-a0368aa7fb6d',
          prefLabel: 'gouvernementsvaartuigen',
        },
        {
          id: 'https://data.cultureelerfgoed.nl/term/id/cht/001e5a82-1f45-4241-a94f-d449bc600a1d',
          prefLabel: 'kanonneerboten',
        },
        {
          id: 'https://data.cultureelerfgoed.nl/term/id/cht/00e1eba8-3d73-41f1-94bb-0901faaa6b49',
          prefLabel: 'korvetten',
        },
        {
          id: 'https://data.cultureelerfgoed.nl/term/id/cht/aff86def-cd59-4481-bd34-2b79cbccfdcc',
          prefLabel: 'kruiser (oorlogsschip)',
        },
        {
          id: 'https://data.cultureelerfgoed.nl/term/id/cht/186a42a2-1321-429d-ba1d-b71f183efff9',
          prefLabel: 'landingsvaartuigen',
        },
        {
          id: 'https://data.cultureelerfgoed.nl/term/id/cht/a4817a3f-bd65-45b0-80a0-ce6bbf411dac',
          prefLabel: 'linieschepen',
        },
        {
          id: 'https://data.cultureelerfgoed.nl/term/id/cht/372eb739-18ee-4d07-b04e-c63f2a8f6129',
          prefLabel: 'mijnenjagers',
        },
        {
          id: 'https://data.cultureelerfgoed.nl/term/id/cht/6bcfd463-fc3f-4a52-bbde-5cc5eceee10e',
          prefLabel: 'mijnenleggers',
        },
        {
          id: 'https://data.cultureelerfgoed.nl/term/id/cht/21ae878b-0e22-4d94-9c49-5601a3a50276',
          prefLabel: 'mijnenvegers',
        },
        {
          id: 'https://data.cultureelerfgoed.nl/term/id/cht/e7ed697e-9c0d-424b-8a32-a394f4c04a8d',
          prefLabel: 'monitors (oorlogsschip)',
        },
        {
          id: 'https://data.cultureelerfgoed.nl/term/id/cht/26de38be-f388-4017-8c3e-d8eb621ecdd3',
          prefLabel: 'onderzeebootjagers',
        },
        {
          id: 'https://data.cultureelerfgoed.nl/term/id/cht/5cf55d1c-a555-44c3-a52c-95871c95da67',
          prefLabel: 'onderzeeboten',
        },
        {
          id: 'https://data.cultureelerfgoed.nl/term/id/cht/7d68a9e2-20b9-40d5-bc76-6dd56eef7d69',
          prefLabel: 'pantserdekschepen',
        },
        {
          id: 'https://data.cultureelerfgoed.nl/term/id/cht/974ff052-4033-40f1-9369-a3b3286af95c',
          prefLabel: 'pantserschepen',
        },
        {
          id: 'https://data.cultureelerfgoed.nl/term/id/cht/9158edca-692c-4f4e-940e-a2c73da24423',
          prefLabel: 'patrouilleboten',
        },
        {
          id: 'https://data.cultureelerfgoed.nl/term/id/cht/9585d6a7-a0d6-4e96-bceb-03f13ab2e9f5',
          prefLabel: 'ramtorenschepen',
        },
        {
          id: 'https://data.cultureelerfgoed.nl/term/id/cht/652a877d-d890-4df6-8247-fa73886a3a2a',
          prefLabel: 'reddingschepen',
        },
        {
          id: 'https://data.cultureelerfgoed.nl/term/id/cht/64204057-e0f3-4312-ab14-6b7b3e0339eb',
          prefLabel: 'schnellboten',
        },
        {
          id: 'https://data.cultureelerfgoed.nl/term/id/cht/f9160f73-fed2-4d0e-bb28-ed7faf49a3d3',
          prefLabel: 'slagschip',
        },
        {
          id: 'https://data.cultureelerfgoed.nl/term/id/cht/3e660acc-501f-4a92-9539-06c2b4058463',
          prefLabel: 'sperrbrechers',
        },
        {
          id: 'https://data.cultureelerfgoed.nl/term/id/cht/3b57b85e-bed4-42cd-8cb3-28e8942ab6e0',
          prefLabel: 'statenjachten',
        },
        {
          id: 'https://data.cultureelerfgoed.nl/term/id/cht/f893d176-c881-4804-9aeb-4e9a27fdac68',
          prefLabel: 'torpedobootjagers',
        },
        {
          id: 'https://data.cultureelerfgoed.nl/term/id/cht/09cbaad0-bf9f-4dc8-995e-f522baa5d61b',
          prefLabel: 'torpedoboten',
        },
        {
          id: 'https://data.cultureelerfgoed.nl/term/id/cht/468135b2-2efe-42d1-9339-f3191098f383',
          prefLabel: 'vaartuig bewakings/onderzoeksdienst',
        },
        {
          id: 'https://data.cultureelerfgoed.nl/term/id/cht/fdebdd34-73c8-4b5a-9991-2275a2ef3685',
          prefLabel: "vedette's",
        },
        {
          id: 'https://data.cultureelerfgoed.nl/term/id/cht/95dd55e2-5c65-47b4-8626-029f7fe4ccd6',
          prefLabel: 'vlieboten',
        },
        {
          id: 'https://data.cultureelerfgoed.nl/term/id/cht/88782746-63a1-4e48-b4ad-93080ebf6a7e',
          prefLabel: 'vliegdekschepen',
        },
        {
          id: 'https://data.cultureelerfgoed.nl/term/id/cht/d47c7601-82a9-495d-96cf-05ce15d11ad2',
          prefLabel: 'vloot tankers',
        },
        {
          id: 'https://data.cultureelerfgoed.nl/term/id/cht/b9f1c542-99a7-4a8e-9e2c-f31034706758',
          prefLabel: 'vorpostenboten',
        },
        {
          id: 'https://data.cultureelerfgoed.nl/term/id/cht/91530fd0-8496-4c57-9727-b582e296bfc6',
          prefLabel: 'whalers',
        },
        {
          id: 'https://data.cultureelerfgoed.nl/term/id/cht/4f10b658-33cd-45c0-98b1-3f0e64657778',
          prefLabel: 'zwaarbewapende koopvaardijschepen',
        },
      ],
    });
  });
});
