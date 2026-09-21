const realFighters = [{"name": "Kristoffer", "fights": 13, "belts": 3, "quote": "13 batalhas. 3 cinturões. Uma história que continua sendo escrita.", "description": "Kristoffer representa a Real Muay Thai com 13 lutas registradas em sua trajetória. Com 3 cinturões conquistados, seu nome faz parte das conquistas da equipe.", "image": "/assets/competidores/01.webp"}, {"name": "Samuel", "fights": 18, "belts": 1, "quote": "A experiência entra no ringue. A próxima conquista começa no treino.", "description": "Samuel representa a Real Muay Thai com 18 lutas registradas em sua trajetória. Com 1 cinturão conquistado, seu nome faz parte das conquistas da equipe.", "image": "/assets/competidores/02.webp"}, {"name": "TH", "fights": 13, "belts": null, "quote": "Cada round deixa uma lição. Cada treino abre um caminho.", "description": "TH representa a Real Muay Thai com 13 lutas registradas em sua trajetória. Uma história que faz parte da nossa equipe, um encontro de cada vez.", "image": "/assets/competidores/03.webp"}, {"name": "Izabela", "fights": 4, "belts": null, "quote": "O começo de uma história também merece fazer barulho.", "description": "Izabela representa a Real Muay Thai com 4 lutas registradas em sua trajetória. Uma história que faz parte da nossa equipe, um encontro de cada vez.", "image": "/assets/competidores/04.webp"}, {"name": "Wendel", "fights": 4, "belts": null, "quote": "O próximo desafio começa antes do primeiro gongo.", "description": "Wendel representa a Real Muay Thai com 4 lutas registradas em sua trajetória. Uma história que faz parte da nossa equipe, um encontro de cada vez.", "image": "/assets/competidores/05.webp"}, {"name": "João Filho", "fights": 7, "belts": 1, "quote": "Um cinturão na trajetória. Novos capítulos pela frente.", "description": "João Filho representa a Real Muay Thai com 7 lutas registradas em sua trajetória. Com 1 cinturão conquistado, seu nome faz parte das conquistas da equipe.", "image": "/assets/competidores/06.webp"}, {"name": "Joshua", "fights": 2, "belts": null, "quote": "Toda grande trajetória começa com o primeiro passo no ringue.", "description": "Joshua representa a Real Muay Thai com 2 lutas registradas em sua trajetória. Uma história que faz parte da nossa equipe, um encontro de cada vez.", "image": "/assets/competidores/07.webp"}, {"name": "Antonio", "fights": 1, "belts": null, "quote": "A primeira luta é só o início da história.", "description": "Antonio representa a Real Muay Thai com 1 luta registrada em sua trajetória. Uma história que faz parte da nossa equipe, um encontro de cada vez.", "image": "/assets/competidores/08.webp"}, {"name": "Iago", "fights": 10, "belts": null, "quote": "Dez lutas na caminhada. O horizonte continua aberto.", "description": "Iago representa a Real Muay Thai com 10 lutas registradas em sua trajetória. Uma história que faz parte da nossa equipe, um encontro de cada vez.", "image": "/assets/competidores/09.webp"}, {"name": "Narão", "fights": 2, "belts": null, "quote": "O ringue é o começo. A evolução é o caminho.", "description": "Narão representa a Real Muay Thai com 2 lutas registradas em sua trajetória. Uma história que faz parte da nossa equipe, um encontro de cada vez.", "image": "/assets/competidores/10.webp"}, {"name": "Thiago", "fights": 2, "belts": null, "quote": "Cada novo round é uma oportunidade de escrever mais.", "description": "Thiago representa a Real Muay Thai com 2 lutas registradas em sua trajetória. Uma história que faz parte da nossa equipe, um encontro de cada vez.", "image": "/assets/competidores/11.webp"}];

(() => {
const section = document.querySelector('#competidores');
const buttons = [...section.querySelectorAll('[data-fighter]')];
function select(index) {
 const f = realFighters[index];
 const set = (id,value) => section.querySelector('#'+id).textContent = value;
 const img=section.querySelector('#fighter-photo'); img.src=f.image; img.alt=f.name;
 set('fighter-name',f.name); set('fighter-fights',f.fights); set('fighter-fights-label',f.fights===1?'LUTA':'LUTAS');
 section.querySelector('#fighter-belts-stat').hidden = f.belts===null;
 set('fighter-belts',f.belts ?? ''); set('fighter-belts-label',f.belts===1?'CINTURÃO':'CINTURÕES');
 set('fighter-description',f.description); set('fighter-quote',f.quote); set('fighter-index',String(index+1).padStart(2,'0')+' / 11');
 buttons.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===index)));
}
buttons.forEach((button,index)=> {
 button.addEventListener('click',()=>{ select(index); if(matchMedia('(max-width:600px)').matches) section.querySelector('.fighter-stage').scrollIntoView({behavior:'instant',block:'start'}); });
 button.addEventListener('keydown',event=> {
 let target=index;
 if(event.key==='ArrowRight') target=(index+1)%buttons.length;
 else if(event.key==='ArrowLeft') target=(index+buttons.length-1)%buttons.length;
 else if(event.key==='Home') target=0;
 else if(event.key==='End') target=buttons.length-1;
 else return;
 event.preventDefault(); select(target); buttons[target].focus();
 });
});
})();
