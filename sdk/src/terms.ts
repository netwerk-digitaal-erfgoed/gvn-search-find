import {request} from 'gaxios';

export class BasicTerm {
  id: string | undefined = undefined;
  prefLabel: string | undefined = undefined;
}

export class Term extends BasicTerm {
  altLabel: string[] = [];
  scopeNote: string[] = [];
  broader: BasicTerm[] = [];
  narrower: BasicTerm[] = [];
}

export interface AutocompleteOptions {
  word: string;
}

type AutocompletedTermFromEndpoint = {
  term: string;
  prefLabel: string;
};

export interface GetByIdOptions {
  id: string;
}

type TermDataFromEndpoint = {
  term: string;
  prefLabel: string;
  altLabel: string;
  scopeNote: string;
  broaderTerm: string;
  broaderTerm_prefLabel: string;
  narrowerTerm: string;
  narrowerTerm_prefLabel: string;
};

const sortByPrefLabel = (a: BasicTerm, b: BasicTerm) => {
  const prefLabelA = a.prefLabel ?? '';
  const prefLabelB = b.prefLabel ?? '';
  return prefLabelA.localeCompare(prefLabelB);
};

export class Terms {
  async autocomplete(options: AutocompleteOptions): Promise<BasicTerm[]> {
    const endpointUrl =
      'https://api.data.netwerkdigitaalerfgoed.nl/queries/gvn-search-find/terms-autocomplete/run';

    const response = await request({
      url: endpointUrl,
      params: {
        word: options.word,
      },
    });

    const terms = response.data as AutocompletedTermFromEndpoint[];

    return terms.map((term: AutocompletedTermFromEndpoint) => {
      return {
        id: term.term,
        prefLabel: term.prefLabel,
      };
    });
  }

  async getById(options: GetByIdOptions): Promise<Term | undefined> {
    const endpointUrl =
      'https://api.data.netwerkdigitaalerfgoed.nl/queries/gvn-search-find/term-details/run';

    const response = await request({
      url: endpointUrl,
      params: {
        term: options.id,
      },
    });

    const results = response.data as TermDataFromEndpoint[];

    if (results.length === 0) {
      return undefined; // Unknown term?
    }

    const term = new Term();
    const altLabels = new Set<string>();
    const scopeNotes = new Set<string>();
    const broaderTerms = new Map<string, BasicTerm>();
    const narrowerTerms = new Map<string, BasicTerm>();

    for (const result of results) {
      term.id = result.term;
      term.prefLabel = result.prefLabel;

      if (result.altLabel !== null) {
        altLabels.add(result.altLabel);
      }

      if (result.scopeNote !== null) {
        scopeNotes.add(result.scopeNote);
      }

      if (result.broaderTerm !== null) {
        broaderTerms.set(result.broaderTerm, {
          id: result.broaderTerm,
          prefLabel: result.broaderTerm_prefLabel,
        });
      }

      if (result.narrowerTerm !== null) {
        narrowerTerms.set(result.narrowerTerm, {
          id: result.narrowerTerm,
          prefLabel: result.narrowerTerm_prefLabel,
        });
      }
    }

    term.altLabel = Array.from(altLabels).sort((a: string, b: string) =>
      a.localeCompare(b)
    );
    term.scopeNote = Array.from(scopeNotes);
    term.broader = Array.from(broaderTerms.values()).sort(sortByPrefLabel);
    term.narrower = Array.from(narrowerTerms.values()).sort(sortByPrefLabel);

    return term;
  }
}
