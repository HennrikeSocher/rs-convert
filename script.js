// Cotação
const USD = 5.44
const EUR = 6.01
const GBP = 7.22

// Obtendo os elementos
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const currency = document.getElementById("currency")
const footer = document.querySelector("main footer")
const description = document.getElementById("description")
const result = document.getElementById("result")

// Manipulando o input para receber somente numeros
amount.addEventListener("input", () => {
  const hasCharactersRegex = /\D+/g
  amount.value = amount.value.replace(hasCharactersRegex, " ")
})

// Capturando o evento de submit do formulario
form.onsubmit = (event) => {
  event.preventDefault()

  switch (currency.value) {
    case "USD":
      convertCurrency(amount.value, USD, "US$")
      break
    case "EUR":
      convertCurrency(amount.value, EUR, "€")
      break
    case "GBP":
      convertCurrency(amount.value, GBP, "£")
      break
  }
}

//função para converter
function convertCurrency(amount, price, symbol) {
  try {
    // exibindo a cotação da moeda selecionada
    description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`

    // calculo total
    let total = amount * price

    if (isNaN(total)) {
      return alert("Por favor digite um valor corretamente.")
    }
    // Formata valor total
    total = formatCurrencyBRL(total).replace("R$", " ")

    // Exibe o resultado total
    result.textContent = `${total} Reais`

    // aplica a class que exibe o resultado
    footer.classList.add("show-result")
  } catch (error) {
    // remove a classe caso ocorra algum erro

    footer.classList.remove("show-result")
    console.log(error)
    alert("Não foi possivel converter, tente novamente mais tarde.")
  }
}
//Formata a moeda para real brasileiro
function formatCurrencyBRL(value) {
  // Converte a string para numero para após formatar no padrão brl
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })
}
