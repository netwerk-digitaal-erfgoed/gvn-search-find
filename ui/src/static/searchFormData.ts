export default {
  form: {
    where: {
      label: 'Alle plaatsen',
      options: {
        label: 'Nederland',
        sub: [
          {
            label: 'Zuid-Holland',
            sub: [ 'Den Haag', 'Rotterdam', 'Schiedam' ]
          },
          {
            label: 'Noord-Holland',
            sub: [ 'Alkmaar', 'Den Helder', 'Haarlem', 'Amsterdam' ]
          },
          {
            label: 'Drenthe',
            sub: [ 'Assen', 'Emmen', 'Veenhuizen' ]
          }
        ]
      }
    },
    what: {
      label: 'Alle onderwerpen',
      options: {
        label: 'Alle onderwerpen',
        sub: [
          {
            label: 'Mode',
            sub: [ 'Schoen', 'Tas', 'Jurk' ]
          },
          {
            label: 'Flora',
            sub: [ 'Roos', 'Passiebloem', 'Margriet', 'Eik' ]
          },
          {
            label: 'Architectuur',
            sub: [ 'Gotiek', 'Amsterdamse school' ]
          }
        ]
      }
    }
  }
};
