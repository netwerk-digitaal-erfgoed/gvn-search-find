<template>
  <div class="text-container">
    <h1>NDE Prototype</h1>
    <h2>Doel</h2>
    <p>
      Dit prototype is één van drie experimenten die zijn ontwikkeld in het
      NDE-project 'Koppelvlak Zichtbaar-Bruikbaar'. Het doel van de experimenten
      is het vergaren van kennis over de wijze waarop de NDE infrastructuur -
      die in het domein-gebied 'Bruikbaar' is ontwikkeld - door
      gebruikersapplicaties geïmplementeerd wordt.
    </p>
    <h2>Prototypes</h2>
    <ul>
      <li>
        Het prototype
        <a
          href="https://heritageflix.demo.netwerkdigitaalerfgoed.nl"
          target="_blank"
          >HeritageFlix</a
        >
        heeft een applicatie getest die is gericht op het grote publiek.
      </li>
      <li>
        Het prototype
        <a href="https://gvn.demo.netwerkdigitaalerfgoed.nl"
          >Geheugen van Nederland</a
        >
        heeft een applicatie getest die is gericht op specialisten werkzaam in
        de cultuur-sector.
      </li>
      <li>
        Het prototype
        <a
          href="https://modemuze.demo.netwerkdigitaalerfgoed.nl"
          target="_blank"
          >Modemuze</a
        >
        heeft een applicatie getest die is gericht op academisch onderzoekers
        die zijn verbonden aan erfgoedinstellingen of universiteiten.
      </li>
    </ul>
    <h2>Scope</h2>
    <p>
      De scope van de prototypes is bewust zeer beperkt gehouden. De
      ontwikkelaars hebben tijdens de bouw vooral gekozen om de interactie
      tussen webapplicatie en infrastructuur te testen. Dit betekent dat in de
      prototypes basale gebruikersfunctionaliteit kan ontbreken.
    </p>
    <h2>Prototype Geheugen van Nederland</h2>
    <p>
      Dit prototype onderzoekt de mogelijkheden om op uniforme wijze te zoeken
      in gestructureerde gegevens van digitale erfgoedcollecties. Een
      eindgebruiker zoekt naar erfgoedobjecten met behulp van een
      zoekfunctionaliteit op basis van termen.
    </p>
    <p>
      In de huidige versie van dit prototype zoekt de eindgebruiker aan de hand
      van één termenlijst, de cultuurhistorische thesaurus van de Rijksdienst
      voor het Cultureel Erfgoed. De lijst van termen in de zoekfunctionaliteit
      bestaat enkel uit termen waaraan objecten gekoppeld zijn. Dat betekent dat
      ogenschijnlijk vanzelfsprekende termen als “koffie” niet voorkomen. De
      eindgebruiker vindt resultaten uit één collectie, die gebaseerd is op die
      van Museum Rotterdam.
    </p>
    <p>
      De snelheid van het zoeken en tonen van resultaten is in deze versie nog
      niet geoptimaliseerd. Dat betekent dat de eindgebruiker soms moet wachten
      na een zoekvraag. Bij algemene termen, zoals “meubilair” kan het voorkomen
      dat zoeken een foutmelding geeft.
    </p>
    <h2>Vervolg</h2>
    <p>
      De resultaten van de experimenten worden in het eerste kwartaal 2023
      vastgelegd, en zullen niet alleen gevolgen hebben voor de
      architectuurkeuzes van NDE, maar ook hun weerslag vinden in de DERA.
    </p>
    <p>
      NDE heeft niet de intentie om in de huidige vorm zelf met de prototypes
      verder te gaan. Het netwerk zal wel een actieve rol spelen bij de
      ondersteuning van partijen die zelfstandig de prototypes willen
      doorontwikkelen op basis van de NDE infrastructuur.
    </p>
    <h2>Meer informatie</h2>
    <p>
      Neem voor meer informatie over deze prototypes contact op met
      <a href="mailto:enno.meijers@KB.nl?subject=NDE prototypes"
        >Enno Meijers</a
      >
      (CTO NDE).
    </p>
    <router-link to="/" class="button white small">
      Naar homepagina
    </router-link>
  </div>
</template>
