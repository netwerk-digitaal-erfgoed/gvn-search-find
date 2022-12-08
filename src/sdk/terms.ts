import { request } from 'gaxios';

export class BasicTerm {
  id: string | undefined;
  prefLabel: string | undefined;
}

export class AutocompletedTerm extends BasicTerm {
  matchingLabel: string | undefined;
  altLabel: string[] = [];
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
  altLabel: string;
  label: string;
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
  async autocomplete(
    options: AutocompleteOptions
  ): Promise<AutocompletedTerm[]> {
    const endpointUrl =
      'https://api.data.netwerkdigitaalerfgoed.nl/queries/gvn-search-find/terms-autocomplete-v2/run';

    const normalizedWord = options.word.trim().toLocaleLowerCase();
    const response = await request({
      url: endpointUrl,
      params: {
        word: normalizedWord
      }
    });

    const results = response.data as AutocompletedTermFromEndpoint[];
    const autocompletedTerms = new Map<string, AutocompletedTerm>();

    for (const rawTerm of results) {
      let matchingTerm = autocompletedTerms.get(rawTerm.term);
      if (matchingTerm === undefined) {
        matchingTerm = new AutocompletedTerm();
      }

      matchingTerm.matchingLabel = rawTerm.label;
      matchingTerm.id = rawTerm.term;
      matchingTerm.prefLabel = rawTerm.prefLabel;
      if (rawTerm.altLabel) {
        matchingTerm.altLabel.push(rawTerm.altLabel);
      }

      autocompletedTerms.set(rawTerm.term, matchingTerm);
    }

    autocompletedTerms.forEach((term) => {
      const altLabels = [...new Set(term.altLabel)]; // Keep unique labels
      altLabels.sort((a: string, b: string) => a.localeCompare(b));
      term.altLabel = altLabels;
    });

    let autocompletedTermsAsArray = Array.from(autocompletedTerms.values());
    autocompletedTermsAsArray = autocompletedTermsAsArray.slice(0, 25);

    return autocompletedTermsAsArray;
  }

  async getById(options: GetByIdOptions): Promise<Term | undefined> {
    const endpointUrl =
      'https://api.data.netwerkdigitaalerfgoed.nl/queries/gvn-search-find/term-details/run';

    const response = await request({
      url: endpointUrl,
      params: {
        term: options.id
      }
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

    for (const rawTerm of results) {
      term.id = rawTerm.term;
      term.prefLabel = rawTerm.prefLabel;

      if (rawTerm.altLabel !== null) {
        altLabels.add(rawTerm.altLabel);
      }

      if (rawTerm.scopeNote !== null) {
        scopeNotes.add(rawTerm.scopeNote);
      }

      if (rawTerm.broaderTerm !== null) {
        broaderTerms.set(rawTerm.broaderTerm, {
          id: rawTerm.broaderTerm,
          prefLabel: rawTerm.broaderTerm_prefLabel
        });
      }

      if (rawTerm.narrowerTerm !== null) {
        narrowerTerms.set(rawTerm.narrowerTerm, {
          id: rawTerm.narrowerTerm,
          prefLabel: rawTerm.narrowerTerm_prefLabel
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
