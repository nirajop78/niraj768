// ------------------ AI Content Generator ------------------
async function generateContent(){
  const topic = document.getElementById('topic').value.trim();
  const output = document.getElementById('generatedContent');
  if(!topic){ output.innerText="Enter a topic"; return; }
  output.innerText = "Generating content...";
  const simulated = `<h3>${topic} Summary</h3><p>${topic} is an important subject. Key points include explanation, examples, and relevance in daily life.</p>`;
  setTimeout(()=>output.innerHTML=simulated, 500);
}

// ------------------ AI Quiz Generator ------------------
async function generateQuiz(){
  const text = document.getElementById('quizContent').value.trim();
  const output = document.getElementById('quizOutput');
  if(!text){ output.innerText="Enter content first"; return; }
  output.innerText="Generating quiz...";
  const q1 = `Q1: What is the main topic?\nA. Example  B. ${text.split(" ")[0]}  C. Unknown  D. Test`;
  setTimeout(()=>output.innerHTML="<pre>"+q1+"</pre>",500);
}

// ------------------ Memory Game ------------------
(function(){
  const canvas=document.getElementById("memoryGame");
  const ctx=canvas.getContext("2d");
  const grid=4, size=canvas.width/grid;
  let tiles=[], selected=[], matched=[];
  for(let i=0;i<grid*grid/2;i++){tiles.push(i);tiles.push(i);}
  tiles.sort(()=>Math.random()-0.5);

  canvas.addEventListener("click", e=>{
    const x=Math.floor(e.offsetX/size), y=Math.floor(e.offsetY/size), idx=y*grid+x;
    if(matched.includes(idx)||selected.includes(idx)) return;
    selected.push(idx);
    if(selected.length==2){ if(tiles[selected[0]]==tiles[selected[1]]) matched.push(...selected); setTimeout(()=>selected=[],500);}
    draw();
  });

  function draw(){
    ctx.fillStyle="#1e293b"; ctx.fillRect(0,0,canvas.width,canvas.height);
    for(let i=0;i<tiles.length;i++){
      const x=i%grid*size, y=Math.floor(i/grid)*size;
      ctx.fillStyle=matched.includes(i)||selected.includes(i)?"#2563eb":"#10b981";
      ctx.fillRect(x,y,size-2,size-2);
      if(matched.includes(i)||selected.includes(i)){
        ctx.fillStyle="white"; ctx.font="20px sans-serif";
        ctx.fillText(tiles[i],x+size/3,y+size/1.5);
      }
    }
  }
  draw();
})();

// ------------------ Snake Game ------------------
(function(){
  const canvas=document.getElementById("snakeGame");
  const ctx=canvas.getContext("2d");
  const grid=20, width=canvas.width, height=canvas.height;
  let snake=[{x:9,y:9}], vx=0, vy=0, food={x:5,y:5}, running=true;
  function placeFood(){ food={x:Math.floor(Math.random()*(width/grid)), y:Math.floor(Math.random()*(height/grid))}; }
  function step(){
    if(!running) return;
    const head={x:snake[0].x+vx, y:snake[0].y+vy};
    head.x=(head.x+width/grid)%(width/grid);
    head.y=(head.y+height/grid)%(height/grid);
    if(snake.some(s=>s.x===head.x&&s.y===head.y)){ running=false; draw(); return;}
    snake.unshift(head);
    if(head.x===food.x && head.y===food.y) placeFood(); else snake.pop();
    draw();
  }
  function draw(){
    ctx.fillStyle="#0f172a"; ctx.fillRect(0,0,width,height);
    ctx.fillStyle="#ef4444"; ctx.fillRect(food.x*grid,food.y*grid,grid-2,grid-2);
    ctx.fillStyle="#10b981"; snake.forEach(s=>ctx.fillRect(s.x*grid,s.y*grid,grid-2,grid-2));
    if(!running){ ctx.fillStyle="white"; ctx.font="20px sans-serif"; ctx.fillText("Game Over - Refresh to play",10,30);}
  }
  window.addEventListener("keydown", e=>{
    const k=e.key;
    if(k==="ArrowUp"&&vy===0){vx=0;vy=-1;}
    if(k==="ArrowDown"&&vy===0){vx=0;vy=1;}
    if(k==="ArrowLeft"&&vx===0){vx=-1;vy=0;}
    if(k==="ArrowRight"&&vx===0){vx=1;vy=0;}
  });
  setInterval(step,120); draw();
})();

// ------------------ Jumping Game ------------------
(function(){
  const canvas=document.getElementById("jumpGame");
  const ctx=canvas.getContext("2d");
  const width=canvas.width, height=canvas.height;
  const player={x:50,y:height-60,w:30,h:30,vy:0,onGround:true};
  const gravity=0.9;
  const platforms=[{x:0,y:height-30,w:width,h:30}];
  function step(){
    player.vy+=gravity; player.y+=player.vy;
    if(player.y+player.h>height-30){player.y=height-30-player.h;player.vy=0;player.onGround=true;}
    draw();
  }
  function draw(){
    ctx.fillStyle="#001219"; ctx.fillRect(0,0,width,height);
    ctx.fillStyle="#bbf7d0"; platforms.forEach(p=>ctx.fillRect(p.x,p.y,p.w,p.h));
    ctx.fillStyle="#60a5fa"; ctx.fillRect(player.x,player.y,player.w,player.h);
  }
  window.addEventListener("keydown",e=>{if(e.key===" "){if(player.onGround){player.vy=-14;player.onGround=false;}}});
  setInterval(step,16); draw();
})();
