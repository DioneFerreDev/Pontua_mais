const weights = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function dotProduct(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    console.error(arr1, arr2);
    throw Error("Ambos arrays devem ter as mesmas dimensões");
  }

  let intern = 0;
  for (let i = 0; i < arr1.length; i++) {
    intern += arr1[i] * arr2[i];
  }
  return intern;
}

export function calculateCPFDigits(cpfValue) {
  const cpf = Array.from(cpfValue).map((char) => Number(char));

  // Produto interno entre o vetor de pesos e os números do CPF.
  const firstIntern = dotProduct(weights, cpf);

  // O primeiro dígito verificador é o resto da divisão do produto interno por 11.
  const firstRemainder = firstIntern % 11;

  // Se o resto da divisão for igual a 10, o primeiro dígito será 0.
  const firstDigit = firstRemainder === 10 ? 0 : firstRemainder;

  // Acrescento o primeiro dígito encontrado no fim do vetor CPF e 0 ao início do vetor de pesos.
  const cpfWithDigit = [...cpf, firstDigit];
  const weightsWithZero = [0, ...weights];

  // Produto interno entre o vetor de pesos modificado e os números do CPF com o primeiro dígito verificador.
  const secondIntern = dotProduct(weightsWithZero, cpfWithDigit);

  // O segundo dígito verificador é o resto da divisão do segundo produto interno por 11.
  const secondRemainder = secondIntern % 11;

  // Se o resto da divisão for igual a 10, o segundo dígito será 0.
  const secondDigit = secondRemainder === 10 ? 0 : secondRemainder;

  return [firstDigit, secondDigit];
}

export function formatCPFWithDigits(cpf, [firstDigit, secondDigit]) {
  const withoutDigits = Array.from(cpf).reduce(
    (acc, element, index, original) => {
      if (index % 3 === 0 && index !== 0 && index !== original.length - 1) {
        acc += ".";
      }
      acc += element;
      return acc;
    },
    ""
  );

  return `${withoutDigits}-${firstDigit}${secondDigit}`;
}
