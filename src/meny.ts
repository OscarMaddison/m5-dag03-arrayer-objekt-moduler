// Dag 3, del 2: Funktioner som arbetar med menyn. Gör alla tester gröna på tests.html.
// Använd filter, map, find, reduce och sort där det passar.
// Typerna (Ratt, OrderRad) finns i typer.ts. Röda understrykningar tills du skrivit return är normalt.
import { formateraPris } from "./pris";
import type { Ratt, OrderRad } from "./typer";

// 1. Alla vegetariska rätter (filter). Returnerar en ny array.
export function vegetariskaRatter(meny: Ratt[]): Ratt[] { //Jag tror att filter() är rätt metod
  return meny.filter(ratt => ratt.vegetarisk === true);
}

// 2. Bara namnen, som en array av text (map). ["Kardemummabulle", ...]
export function rattNamn(meny: Ratt[]): string[] {  //Jag tror att map() är rätt metod
  return meny.map(ratt => ratt.namn);
}

// 3. En prislista som text: "Kardemummabulle – 35 kr" (map + formateraPris)
export function prislista(meny: Ratt[]): string[] { //Jag tror att map() är rätt metod
  return meny.map(ratt => `${ratt.namn} – ${formateraPris(ratt.pris)}`);
}

// 4. Hitta en rätt via id (find). Returnerar objektet, eller undefined om det saknas.
export function hittaRatt(meny: Ratt[], id: number): Ratt | undefined { //Jag tror att find() är rätt metod
  return meny.find(ratt => ratt.id === id);
}

// 5. Den billigaste rätten (reduce). Returnerar objektet. Tom lista ger undefined.
export function billigast(meny: Ratt[]): Ratt | undefined { //Jag tror att reduce() är rätt metod
  return meny.reduce((lagst: Ratt | undefined, ratt: Ratt) => {
    if (lagst === undefined || ratt.pris < lagst.pris) {
      return ratt;
    } else {
      return lagst;
    }
  }, undefined);
}

// 6. Sortera efter pris, billigast först. Returnerar en NY array.
//    Den ursprungliga listan får INTE ändras (sort ändrar originalet, så kopiera först).
export function sorteraEfterPris(meny: Ratt[]): Ratt[] {  //Jag tror att sort() är rätt metod
  const menySort: Ratt[] = [...meny].sort((ratt1, ratt2) => ratt1.pris - ratt2.pris);
  return menySort;
}

// 7. Totalpris för en order. order = [{ id: 1, antal: 2 }, { id: 5, antal: 1 }]
//    Slå upp priset för varje id i menyn. Okända id räknas som 0 kr.
export function totalPris(order: OrderRad[], meny: Ratt[]): number {  //Jag tror att find() och reduce() är rätt metoder
  return order.reduce((pris: number, orderRad: OrderRad) => {
    if (meny.find(ratt => ratt.id === orderRad.id) != undefined) {
      return (orderRad.antal * meny.find(ratt => ratt.id === orderRad.id).pris) + pris;
    } else {
      return pris;
    }
  }, 0);
}

// 8. Antal rätter per kategori som ett objekt: { bakverk: 3, dryck: 2, lunch: 3 } (reduce)
export function perKategori(meny: Ratt[]): Record<string, number> { //Jag tror att reduce() och map() är rätt metoder
  return {
    "bakverk": meny.reduce((antal: number, ratt: Ratt) => {
      if (ratt.kategori === "bakverk") {
        return antal + 1;
      } else {
        return antal;
      }
    }, 0),
    "dryck": meny.reduce((antal: number, ratt: Ratt) => {
      if (ratt.kategori === "dryck") {
        return antal + 1;
      } else {
        return antal;
      }
    }, 0),
    "lunch": meny.reduce((antal: number, ratt: Ratt) => {
      if (ratt.kategori === "lunch") {
        return antal + 1;
      } else {
        return antal;
      }
    }, 0)
    };
}

// 9. En kopia av rätten med nytt pris. Originalet får INTE ändras (spread: { ...ratt }).
export function medNyttPris(ratt: Ratt, nyttPris: number): Ratt {
  return {
    id: ratt.id,
    namn: ratt.namn,
    pris: nyttPris,
    kategori: ratt.kategori,
    vegetarisk: ratt.vegetarisk,
    bild: ratt.bild,
    beskrivning: ratt.beskrivning,
  };
}
