export default {
  form: {
    what: {
      label: 'Alle onderwerpen',
      sentence: '',
      options: {
        label: 'Alle onderwerpen',
        sub: [
          {
            label: 'Mode',
            sub: ['Schoen', 'Tas', 'Jurk']
          },
          {
            label: 'Flora',
            sub: [
              'Roos',
              'Passiebloem',
              'Margriet',
              'Eik',
              'Boerenwormkruid',
              'Guldenroede',
              'Leverkruid ',
              'Koninginnekruid',
              'Duizendblad',
              'Kattenstaart',
              'Watermunt',
              'Hulst'
            ]
          },
          {
            label: 'Architectuur',
            sub: ['Gotiek', 'Amsterdamse school']
          }
        ]
      }
    },
    who: {
      label: 'Alle personen en instellingen',
      sentence: 'en',
      options: {
        label: 'Alle personen en instellingen',
        sub: [
          {
            label: 'Alleen personen',
            sub: ['Vincent van Gogh', 'Alfred Nobel', 'Anne Frank']
          },
          {
            label: 'Alleen instellingen',
            sub: ['Koninklijke Schouwburg', 'Gemeente Amsterdam']
          }
        ]
      }
    },
    where: {
      label: 'Alle plaatsen',
      sentence: 'in',
      options: {
        label: 'Nederland',
        sub: [
          {
            label: 'Zuid-Holland',
            sub: ['Den Haag', 'Rotterdam', 'Schiedam']
          },
          {
            label: 'Noord-Holland',
            sub: ['Alkmaar', 'Den Helder', 'Haarlem', 'Amsterdam']
          },
          {
            label: 'Drenthe',
            sub: ['Assen', 'Emmen', 'Veenhuizen']
          }
        ]
      }
    },

    when: {
      label: 'Alle periodes',
      sentence: 'in de periode',
      options: {
        label: 'Alle periodes',
        sub: [
          {
            label: '18e eeuw',
            sub: ['1800 - 1810', '1815', '5 november 1821']
          },
          {
            label: '19e eeuw',
            sub: [
              '1911 - 1920',
              '1921 - 1930',
              '1941',
              '25 mei 1942',
              '5 oktober 1962'
            ]
          },
          {
            label: '20e eeuw',
            sub: ['2001', '9 november 2002']
          }
        ]
      }
    }
  }
};
