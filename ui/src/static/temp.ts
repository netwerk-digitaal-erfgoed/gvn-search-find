export default {
  form: {
    what: {
      label: 'Alle onderwerpen',
      type: 'dropdown',
      options: [
        {
          value: 'Vinex'
        },
        {
          value: 'Interieur'
        },
        {
          value: 'Architectuur'
        },
        {
          value: 'Bouwen'
        },
        {
          value: 'Nieuwbouw'
        },
        {
          value: 'Kraken'
        },
        {
          value: 'Woningnood'
        }
      ]
    },
    who: {
      label: 'Alle personen/organisaties',
      type: 'dropdown',
      options: [
        {
          value: 'Commissie voor Krotopruiming en sanering'
        },
        {
          value: 'Woningbouwcorporatie X'
        },
        {
          value: 'Gemeente Amsterdam'
        },
        {
          value: 'Pastoe'
        }
      ]
    },
    where: {
      label: 'Alle plaatsen',
      type: 'dropdown',
      options: [
        {
          value: 'Nijmegen'
        },
        {
          value: 'Amsterdam'
        },
        {
          value: 'Rotterdam'
        },
        {
          value: 'Utrecht'
        },
        {
          value: 'Zuid-Holland'
        },
        {
          value: 'Flevoland'
        },
        {
          value: 'Nederland'
        }
      ]
    },
    when: {
      label: 'Alle periodes',
      type: 'daterange',
      options: [
        {
          value: 'Van'
        },
        {
          value: 'Tot'
        }
      ]
    }
  }
};
