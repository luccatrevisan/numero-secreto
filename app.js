/*
GIT COMMANDS
    git init
    git add . -> escrever exatamente assim (com ponto) adiciona todos os arquivos da pasta
    git commit -m "first commit"
    git branch -M main -> "main" é o apelido que escolho para o codigo principal
    git remote add origin git@github.com:luccatrevisan/numero-secreto.git -> "origin" é o apelido que escolho para o repositório
    git push -u origin main
    git revert #id -> reverter um commit feito, como excluir uma imagem do html e colocar ela de volta. conta como 2 commits
    git reset --hard #id -> é o jeito pra excluir um commit do log. o id precisa ser o commit anterior ao que eu quero excluir. 
            OBS.: o comando funciona como se você estivesse pedindo pra resetar o log até o id de sua escolha.
                OBS2.: reset exige parâmetros como --hard no exemplo acima
*/

let listaDeNumerosSorteados = []; //tem que estar antes da chamada de gerarNumeroAleatorio() porque o JS executa em ordem
let numeroLimite = 50;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;

    //codigo givado pra acessibilidade (dita o que é exibido na tela)
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do Número Secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 50');
}

exibirMensagemInicial();

function verificarChute(){
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto){
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativas = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativas}`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto){
            exibirTextoNaTela('p', 'O número é menor');
            limparCampo();
        } else{
            exibirTextoNaTela('p', 'O número secreto é maior');
            limparCampo();
        }
        tentativas = tentativas + 1;
    }
}

function gerarNumeroAleatorio(){ 
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if(quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados = []; //se a lista tiver o tamanho total, a lista reseta
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio(); //se o numero já tiver sido escolhido antes, retorne para o começo da função
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido; //se o número não tiver sido escolhido, coloque ele na lista de escolhidos e retorne ele
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    tentativas = 1;
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
   
}