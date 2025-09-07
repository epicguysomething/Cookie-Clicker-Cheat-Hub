javascript:(function(){
  try {
    const old=document.getElementById("moddingHub");if(old)old.remove();
    const i=document.createElement("div");
    i.id="moddingHub";
    Object.assign(i.style,{
      position:"fixed",
      top:"20px",
      right:"20px",
      width:"90vw",
      maxWidth:"350px",
      padding:"15px",
      background:"rgba(0,128,0,0.5)",
      border:"3px solid #004d00",
      borderRadius:"14px",
      color:"white",
      fontFamily:"Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
      userSelect:"none",
      zIndex:"999999",
      display:"flex",
      flexDirection:"column",
      gap:"10px",
      touchAction:"none"
    });

    const header=document.createElement("div");
    header.textContent="Epic Hub";
    Object.assign(header.style,{
      fontWeight:"700",
      fontSize:"20px",
      marginBottom:"10px",
      cursor:"grab",
      userSelect:"none"
    });
    i.appendChild(header);

    function createButton(text,cb){
      const btn=document.createElement("button");
      btn.textContent=text;
      Object.assign(btn.style,{
        width:"100%",
        padding:"12px",
        borderRadius:"10px",
        border:"none",
        background:"linear-gradient(135deg,#3CAF50,#2E7D32)",
        color:"white",
        fontWeight:"700",
        fontSize:"16px",
        cursor:"pointer",
        userSelect:"none"
      });
      btn.addEventListener("touchstart",()=>{btn.style.transform="scale(0.95)";});
      btn.addEventListener("touchend",()=>{
        btn.style.transform="scale(1)";
        cb();
      });
      return btn;
    }

    i.appendChild(createButton("🍪 Infinite Cookies",()=>{Game.cookies=Infinity;Game.Notify("∞ cookies!","","",1,1);}));
    i.appendChild(createButton("👵 1 Trillion Grandmas",()=>{const g=Game.Objects?.Grandma;if(g){g.amount=g.bought=1e12;Game.BuildingsOwned+=1e12;Game.recalculateGains=1;Game.Notify("1T Grandmas!","","",1,1);}}));
    i.appendChild(createButton("🧍 1 Trillion You",()=>{const g=Game.Objects?.You;if(g){g.amount=g.bought=1e12;Game.BuildingsOwned+=1e12;Game.recalculateGains=1;Game.Notify("1T You!","","",1,1);}}));
    i.appendChild(createButton("🖱️ 10 Thousand Cursors",()=>{const g=Game.Objects?.Cursor;if(g){g.amount=g.bought=1e4;Game.BuildingsOwned+=1e4;Game.recalculateGains=1;Game.Notify("10k Cursors!","","",1,1);}}));
    i.appendChild(createButton("🍬 Infinite Sugar Lumps",()=>{Game.lumps=Infinity;Game.Notify("∞ Sugar Lumps!","","",1,1);}));
    i.appendChild(createButton("🔓 Unlock All Upgrades",()=>{for(let id in Game.UpgradesById){const up=Game.UpgradesById[id];if(up){if(!up.unlocked)up.unlock();if(up.unlocked)up.buy();}}Game.Notify("All upgrades unlocked!","","",1,1);}));
    i.appendChild(createButton("🏆 Unlock All Achievements",()=>{for(let id in Game.AchievementsById){const a=Game.AchievementsById[id];if(a&&!a.won)Game.Win(a.name);}Game.Notify("All achievements unlocked!","","",1,1);}));
    i.appendChild(createButton("📈 Level 1 Trillion Grandmas",()=>{const g=Game.Objects?.Grandma;if(g){g.level=1e12;g.refresh();Game.Notify("Grandmas leveled to 1T!","","",1,1);}}));
    i.appendChild(createButton("📈 Level 1 Trillion Yous",()=>{const g=Game.Objects?.You;if(g){g.level=1e12;g.refresh();Game.Notify("Yous leveled to 1T!","","",1,1);}}));

    // Close button
    const closeBtn=document.createElement("button");
    closeBtn.textContent="×";
    Object.assign(closeBtn.style,{
      position:"absolute",
      top:"8px",
      right:"8px",
      background:"transparent",
      border:"none",
      color:"white",
      fontSize:"24px",
      fontWeight:"700",
      cursor:"pointer",
      userSelect:"none",
      padding:"0",
      lineHeight:"1"
    });
    closeBtn.addEventListener("touchstart",()=>{closeBtn.style.color="red";});
    closeBtn.addEventListener("touchend",()=>{i.remove();});
    i.appendChild(closeBtn);

    document.body.appendChild(i);

    // Dragging only on header
    let dragging=false, startX=0, startY=0, origX=0, origY=0;
    header.addEventListener("touchstart",e=>{
      dragging=true;
      startX=e.touches[0].clientX;
      startY=e.touches[0].clientY;
      const rect=i.getBoundingClientRect();
      origX=rect.left;
      origY=rect.top;
