// ELEMENTOS DOM
const barraVida = document.querySelector(".barraV")
const barraEnergia = document.querySelector(".barraE")
const explorar = document.querySelector("#explorar")
const descansar = document.querySelector("#descansar")
const inventario = document.querySelector("#inventario")
const vidaScore = document.querySelector(".scoreV")
const energiaScore = document.querySelector(".scoreE")
const barra = document.querySelector(".display")
const caixaInventario = document.querySelector(".canto-inventario")
const caixa = document.querySelector(".bolsa")

//JOGO
let jogador = {
    vida: 80,
    energia: 80,
    ataque:20,
    defesa: 15,
    velocidaade: 30,
    equipametoCapacete: null,
    equipametoArmadura: null,
    equipametoBotas: null,
    equipametoEscudo: null,
    equipametoArma: null
}

// CRIAÇÃO DE ITEM CONSUMIVEL
class itensConsumiveis {
    constructor(nome, efeito, magia, mana, quantidade, imgSrc){
        this.nome = nome,
        this.efeito = efeito,
        this.magia = magia,
        this.mana = mana,
        this.imgSrc = imgSrc,
        this.quantidade = quantidade
    }
    usar(alvo){
        if(this.quantidade === 0){
            console.log("não a nada aqui!")
            return false
        }
        if(this.efeito === 'vida'){
            alvo.vida = alvo.vida + this.magia
            console.log(`você tomou uma ${this.nome}`)
        } else if(this.efeito === 'energia'){
            alvo.energia = alvo.energia + this.magia
            console.log(`você tomou uma ${this.nome}`)
        } else if(this.efeito === 'ataque'){
            alvo.ataque = alvo.ataque + this.magia
            console.log(`você tomou uma ${this.nome}`)
        } else if(this.defesa === 'defesa'){
            alvo.defesa = alvo.defesa + this.magia
            console.log(`você tomou uma ${this.nome}`)
        } else if(this.efeito === 'velocidade'){
            alvo.velocidade = alvo.velocidade + this.magia
            console.log(`você tomou uma ${this.nome}`)
        }
        this.quantidade--
        return true
    }
}

let bolsa  = [
    new itensConsumiveis( "Poção de vida","vida", 10,10, 5,'img-do-jogo/pocao-de-vida.png' ),
    new itensConsumiveis("Poção de energia","energia", 20,20, 5, 'img-do-jogo/pocao-energia.png' ),
    new itensConsumiveis("carne",'energia', 4, 5, 5, 'img-do-jogo/carne.png' )   //NÃO ENTEN FOI NADA
]

function explorarDoJogador(){
    jogador.energia -=10
    if(jogador.energia === 0){
        jogador.energia = 0
        alert("O jogdor esta cansado")
    }
}

function descancarJogador(){
    jogador.energia +=10
    if(jogador.energia >= 100){
        jogador.energia = 100
        alert("O jogdor esta descansado")
    }
}

//ATUALIZAR TELA
function renderizaTela(){
    vidaScore.textContent = jogador.vida
    energiaScore.textContent = jogador.energia
    barraVida.style.width = jogador.vida + "%"
    barraVida.style.transition = "0.5s"
    barraEnergia.style.transition = "0.5s"
    barraEnergia.style.width = jogador.energia + "%"
}

function usarItem(slot){
    slot = ""
    bolsa.forEach((item,index) =>{
        if(item.quantidade === 0 ){
            slot += `<button data-index="${index}" class="slot"></button>`
        } else {
            slot += `<button data-index="${index}" class="slot"><p>${item.quantidade}</p><img class="omagem" src="${item.imgSrc}" alt=""></button>`
        }
        console.log(item)
    })
    renderizaTela()
    return slot
}

explorar.addEventListener("click", () => {
    explorarDoJogador()
    renderizaTela()
})
descansar.addEventListener("click", () => {
    descancarJogador()
    renderizaTela()
})
inventario.addEventListener("click", () => {
    caixa.innerHTML = usarItem()
    if(caixaInventario.classList.toggle('ativo')){
        inventario.textContent = "sair"
    } else {
        inventario.textContent = "inventario"
    }
    renderizaTela()
})
caixa.addEventListener('click', (e) => {
    const el = e.target.closest(".slot")
    if(!el){
        return
    }
    const index = Number(el.dataset.index)
    bolsa[index].usar(jogador)
    usarItem()
    renderizaTela()
})