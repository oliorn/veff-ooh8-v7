

const LETTERS = `AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ`;



function start() {
  do {
    const type = prompt('Hvort viltu kóða eða afkóða streng? Skrifaðu „kóða“ eða „afkóða“') || '';
    const typeLowered = type.toLocaleLowerCase();

    if (typeLowered !== 'kóða' && typeLowered !== 'afkóða') {
      alert(`Veit ekki hvaða aðgerð „${type}“ er. Reyndu aftur.` );
      continue;
    }




    const nInput = prompt(`Hversu mikið á að hliðra streng? Gefðu upp heiltölu á bilinu [1, ${LETTERS.length - 1}]` );
    const n = Number.parseInt(nInput, 10);

    if (!Number.isInteger(n) || n < 1 || n > LETTERS.length - 1) {
      alert(`${nInput} er ekki heiltala á bilinu [1, ${LETTERS.length - 1}]. Reyndu aftur.` );
      continue;
    }

    const str = prompt(`Gefðu upp strenginn sem á að ${typeLowered}  með hliðrun ${n}:` );

    if (!str || str.length === 0) {
      alert(`Þú gafst ekki upp streng. Reyndu aftur.`);
      continue;
    }

    const invalid = [];

    for (let i = 0; i < str.length; i++) {
      const letter = (str[i] || '').toLocaleUpperCase();
      if (LETTERS.indexOf(letter) < 0) {
        invalid.push(letter);
      }
    }



    if (invalid.length > 0) {
      alert(`Þú gafst upp stafi sem ekki er hægt að ${typeLowered}: ${invalid.join(', ')}. Reyndu aftur.` );
      continue;
    }

    let result = '';

    if (typeLowered === 'kóða') {
      result = encode(str, n);
    } else {
      result = decode(str, n);
    }


    alert(`Niðurstaða:\n${result}` );

  } while (confirm('Aftur?') );
}



start();


function encode(str, n) {

  const upper = str.toLocaleUpperCase();

  let result = '';
  for (let i = 0; i < str.length; i++) {
    result += LETTERS[(LETTERS.indexOf(upper[i]) + n) % LETTERS.length];
  }
  return result;
}


function decode(str, n) {

  return str
    .toLocaleUpperCase()
    .split('')
    .map(s => LETTERS.indexOf(s) - n) // hliðruð staðsetning stafs
    .map(i => i < 0 ? LETTERS.length + i : i) // ef i verður neikvætt, förum aftast í stafróf
    .map(i => LETTERS[i])
    .join('');
}
