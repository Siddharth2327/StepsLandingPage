import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// ─── TIME-OF-DAY CONFIG ────────────────────────────────────────────────────────
const TOD = [
  {
    id:"dawn", label:"Dawn", duration:7000,
    sky:["#060C1A","#0D1E3A","#1A3660","#3A5C90","#B06030","#D88040","#F0B060","#F8D090"],
    skyStops:["0%","12%","26%","42%","58%","72%","86%","100%"],
    ambientLight:0.55,
    glassBase:"rgba(255,170,80,0.13)", glassHigh:"rgba(255,210,150,0.24)",
    bloomColor:"rgba(255,140,40,0.17)", bloomPos:"16% 62%",
    sunX:16, sunY:66, sunColor:"#FFAA30", sunSize:50, sunGlow:"rgba(255,150,40,0.52)",
    moonOpacity:0.14, starOpacity:0.07,
    fogColor:"rgba(200,130,70,0.26)", fogOpacity:0.5,
    riverH:7, riverTop:"#8AACCB", riverMid:"#6A90B2", riverBot:"#4A7090",
    riverFoam:"rgba(255,255,255,0.5)", riverGlow:"rgba(255,160,60,0.28)", riverReflX:260,
    buildFg:"#0D1826", buildMg:"#0A1420", buildBg:"#070E18",
    windowLit:0.07,
  },
  {
    id:"day", label:"Day", duration:20000,
    sky:["#0A50A0","#1870C8","#3A96E0","#64B4EE","#90CCF4","#BEE0F8","#DCF0FC"],
    skyStops:["0%","16%","34%","50%","66%","82%","100%"],
    ambientLight:1.0,
    glassBase:"rgba(120,190,255,0.18)", glassHigh:"rgba(205,238,255,0.36)",
    bloomColor:"rgba(255,255,255,0.06)", bloomPos:"68% 36%",
    sunX:68, sunY:20, sunColor:"#FFFDE0", sunSize:66, sunGlow:"rgba(255,255,200,0.46)",
    moonOpacity:0, starOpacity:0,
    fogColor:"rgba(180,220,248,0.28)", fogOpacity:0.28,
    riverH:7, riverTop:"#2880C0", riverMid:"#1A6DAA", riverBot:"#0E5090",
    riverFoam:"rgba(255,255,255,0.72)", riverGlow:"rgba(60,170,255,0.24)", riverReflX:960,
    buildFg:"#182840", buildMg:"#122030", buildBg:"#0C1828",
    windowLit:0.02,
  },
  {
    id:"sunset", label:"Sunset", duration:16000,
    sky:["#080C18","#101828","#2A1C38","#602040","#B04830","#D87030","#F09A40","#F8C060"],
    skyStops:["0%","10%","24%","40%","56%","72%","86%","100%"],
    ambientLight:0.6,
    glassBase:"rgba(255,110,40,0.16)", glassHigh:"rgba(255,185,85,0.3)",
    bloomColor:"rgba(255,90,20,0.21)", bloomPos:"84% 60%",
    sunX:84, sunY:70, sunColor:"#FF6818", sunSize:54, sunGlow:"rgba(255,80,20,0.56)",
    moonOpacity:0.18, starOpacity:0.08,
    fogColor:"rgba(220,120,50,0.34)", fogOpacity:0.58,
    riverH:7, riverTop:"#AA5A28", riverMid:"#854020", riverBot:"#502810",
    riverFoam:"rgba(255,150,70,0.54)", riverGlow:"rgba(255,110,30,0.44)", riverReflX:1210,
    buildFg:"#140C18", buildMg:"#100A14", buildBg:"#080610",
    windowLit:0.35,
  },
  {
    id:"bluehour", label:"Blue Hour", duration:12000,
    sky:["#030508","#060A10","#0A1220","#102040","#183060","#2848A0","#3860B8"],
    skyStops:["0%","12%","26%","42%","58%","78%","100%"],
    ambientLight:0.28,
    glassBase:"rgba(80,130,240,0.19)", glassHigh:"rgba(125,175,255,0.32)",
    bloomColor:"rgba(60,100,200,0.19)", bloomPos:"50% 44%",
    sunX:50, sunY:98, sunColor:"#2040A0", sunSize:0, sunGlow:"transparent",
    moonOpacity:0.85, starOpacity:0.62,
    fogColor:"rgba(40,80,180,0.34)", fogOpacity:0.48,
    riverH:7, riverTop:"#0E1E3A", riverMid:"#0A1628", riverBot:"#060E1C",
    riverFoam:"rgba(70,120,220,0.44)", riverGlow:"rgba(50,90,200,0.3)", riverReflX:740,
    buildFg:"#080A14", buildMg:"#060810", buildBg:"#03050C",
    windowLit:0.72,
  },
  {
    id:"night", label:"Night", duration:18000,
    sky:["#010204","#020408","#030610","#040810","#060B18","#0A1228","#0E1830"],
    skyStops:["0%","14%","28%","42%","56%","76%","100%"],
    ambientLight:0.0,
    glassBase:"rgba(160,200,255,0.12)", glassHigh:"rgba(200,228,255,0.23)",
    bloomColor:"rgba(160,200,255,0.08)", bloomPos:"50% 44%",
    sunX:50, sunY:112, sunColor:"#000", sunSize:0, sunGlow:"transparent",
    moonOpacity:1.0, starOpacity:1.0,
    fogColor:"rgba(10,22,60,0.54)", fogOpacity:0.63,
    riverH:7, riverTop:"#050B18", riverMid:"#030810", riverBot:"#020508",
    riverFoam:"rgba(60,100,180,0.3)", riverGlow:"rgba(40,70,150,0.22)", riverReflX:740,
    buildFg:"#050810", buildMg:"#040610", buildBg:"#02040A",
    windowLit:1.0,
  },
];

// Stars
const STARS = Array.from({length:140},(_,i)=>({
  x:(Math.sin(i*1.618+0.3)*0.5+0.5)*100,
  y:(Math.cos(i*2.399+0.7)*0.5+0.5)*52,
  r:0.5+(i%6)*0.22, tw:1.8+(i%8)*0.45, delay:i*0.06,
}));

function rng(seed){
  let s=seed%2147483647; if(s<=0)s+=2147483646;
  return()=>{s=(s*16807)%2147483647;return(s-1)/2147483646;};
}

// ─── STARS ────────────────────────────────────────────────────────────────────
function StarsLayer({opacity}){
  return(
    <div className="absolute inset-0 pointer-events-none"
      style={{zIndex:2,opacity,transition:"opacity 4s ease"}}>
      <svg width="100%" height="58%" viewBox="0 0 1440 420" preserveAspectRatio="xMidYMid meet">
        {STARS.map((s,i)=>(
          <motion.circle key={i} cx={`${s.x}%`} cy={`${s.y}%`} r={s.r} fill="white"
            animate={{opacity:[0.35,0.95,0.35]}}
            transition={{duration:s.tw,repeat:Infinity,delay:s.delay,ease:"easeInOut"}}/>
        ))}
      </svg>
    </div>
  );
}

// ─── MOON ─────────────────────────────────────────────────────────────────────
function Moon({opacity}){
  return(
    <div className="absolute pointer-events-none"
      style={{right:"13%",top:"8%",zIndex:4,opacity,transition:"opacity 3s ease"}}>
      <svg width="50" height="50" viewBox="0 0 50 50">
        <defs>
          <radialGradient id="moonG" cx="40%" cy="35%">
            <stop offset="0%"  stopColor="#E8EEF8"/>
            <stop offset="60%" stopColor="#C8D4E8"/>
            <stop offset="100%"stopColor="#A8B8CC"/>
          </radialGradient>
        </defs>
        <circle cx="25" cy="25" r="21" fill="url(#moonG)"/>
        <circle cx="25" cy="25" r="21" fill="none" stroke="rgba(180,200,230,0.4)" strokeWidth="0.5"/>
        <circle cx="31" cy="19" r="3.5" fill="rgba(160,180,210,0.45)"/>
        <circle cx="19" cy="28" r="2.2" fill="rgba(160,180,210,0.38)"/>
        <circle cx="27" cy="30" r="1.6" fill="rgba(160,180,210,0.32)"/>
      </svg>
      <div style={{position:"absolute",inset:-24,borderRadius:"50%",
        background:"radial-gradient(circle,rgba(200,220,255,0.12) 0%,transparent 68%)"}}/>
    </div>
  );
}

// ─── SUN ──────────────────────────────────────────────────────────────────────
function Sun({tod}){
  if(tod.sunSize<=0) return null;
  const sz=tod.sunSize;
  return(
    <div className="absolute pointer-events-none"
      style={{left:`${tod.sunX}%`,top:`${tod.sunY}%`,transform:"translate(-50%,-50%)",zIndex:4,
        transition:"left 3s ease,top 3s ease"}}>
      <div style={{width:sz,height:sz,borderRadius:"50%",
        background:`radial-gradient(circle at 38% 35%,${tod.sunColor}FF 0%,${tod.sunColor}CC 55%,${tod.sunColor}88 100%)`,
        boxShadow:`0 0 ${sz*1.4}px ${sz*0.7}px ${tod.sunGlow}`,
        transition:"all 3s ease"}}/>
      {tod.id==="day"&&<div style={{position:"absolute",inset:-sz*0.8,borderRadius:"50%",
        background:`radial-gradient(circle,${tod.sunColor}22 0%,transparent 68%)`}}/>}
    </div>
  );
}

// ─── CLOUDS ───────────────────────────────────────────────────────────────────
function CloudLayer({tod,scrollX}){
  const isNight  = tod.id==="night"||tod.id==="bluehour";
  const isDawn   = tod.id==="dawn";
  const isSunset = tod.id==="sunset";
  const isDay    = tod.id==="day";

  // Cloud body colours — warm-tinted for dawn/sunset, neutral for day, dark for night
  const cf = isNight  ? "rgba(100,130,200,0.10)"
           : isDawn   ? "rgba(255,248,238,0.45)"
           : isSunset ? "rgba(255,175,120,0.40)"
           : isDay    ? "rgba(255,255,255,0.52)"
           :            "rgba(255,255,255,0.94)";

  const cs = isNight  ? "rgba(60,80,150,0.08)"
           : isDawn   ? "rgba(220,190,150,0.16)"
           : isSunset ? "rgba(180,70,40,0.20)"
           : isDay    ? "rgba(200,215,228,0.28)"
           :            "rgba(200,215,228,0.55)";

  const ch = isNight  ? "rgba(120,150,220,0.12)"
           : isDawn   ? "rgba(255,255,252,0.50)"
           : isSunset ? "rgba(255,210,160,0.45)"
           : isDay    ? "rgba(255,255,255,0.72)"
           :            "rgba(255,255,255,0.94)";

  // Drop-shadow tint
  const shadowColor = isDawn   ? "rgba(220,130,60,0.35)"
                    : isSunset ? "rgba(200,80,30,0.40)"
                    : "rgba(160,190,215,0.30)";

  const clouds=[
    {x:-5, y:6,  s:0.95, spd:22},
    {x:24, y:4,  s:0.72, spd:28},
    {x:52, y:10, s:0.58, spd:21},
    {x:70, y:5,  s:0.88, spd:17},
    {x:-18,y:16, s:0.62, spd:32},
  ];

  return(
    <motion.div className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{zIndex:10,x:scrollX}}>
      {clouds.map((c,i)=>(
        <motion.div key={i} className="absolute"
          style={{left:`${c.x}%`,top:`${c.y}%`,width:`${32*c.s}%`,
            filter:isNight?"none":`drop-shadow(0 6px 18px ${shadowColor})`}}
          animate={{x:[0,`${22*c.s}%`,0]}}
          transition={{duration:c.spd,repeat:Infinity,ease:"easeInOut",delay:i*4.2}}>
          <svg viewBox="0 0 420 170" style={{width:"100%",display:"block"}}>
            {/* Underside / shadow belly */}
            <ellipse cx="210" cy="118" rx="192" ry="52" fill={cs}/>
            {/* Main cloud body */}
            <ellipse cx="210" cy="100" rx="176" ry="62" fill={cf} opacity="0.65"/>
            <ellipse cx="130" cy="84"  rx="108" ry="66" fill={cf} opacity="0.82"/>
            <ellipse cx="275" cy="78"  rx="120" ry="70" fill={cf} opacity="0.82"/>
            <ellipse cx="205" cy="62"  rx="138" ry="56" fill={cf} opacity="0.88"/>
            {/* Bright lit top — catches golden/pink sun directly */}
            <ellipse cx="148" cy="52"  rx="84"  ry="50" fill={ch} opacity="0.78"/>
            <ellipse cx="272" cy="50"  rx="94"  ry="54" fill={ch} opacity="0.82"/>
            <ellipse cx="208" cy="42"  rx="106" ry="42" fill={ch} opacity="0.70"/>
          </svg>
        </motion.div>
      ))}
    </motion.div>
  );
}

// ─── KL SKYLINE — All Iconic Buildings ───────────────────────────────────────
function KLSkylineLayer({tod}){
  const amb=tod.ambientLight;
  const isNight=tod.id==="night"||tod.id==="bluehour";
  const fg=tod.buildFg, mg=tod.buildMg, bg=tod.buildBg;
  const glassTint=tod.glassBase, glassHigh=tod.glassHigh;
  const winLit=isNight?"rgba(255,220,155,0.92)":(amb>0.7?"rgba(210,235,255,0.55)":"rgba(200,230,255,0.38)");
  const winDark=isNight?"rgba(14,24,54,0.95)":"rgba(38,62,108,0.25)";

  // ── Window grid helper ────────────────────────────────
  function Wins({bx,by,bw,bh,seed}){
    const r=rng(seed);
    const cols=Math.max(2,Math.floor(bw/11));
    const rows=Math.max(2,Math.floor(bh/13));
    const wx=bw/cols, wy=bh/rows;
    return Array.from({length:rows},(_,row)=>
      Array.from({length:cols},(_,col)=>{
        const lit=r()<(tod.windowLit+(isNight?0.48:0));
        return <rect key={`${row}-${col}`}
          x={bx+col*wx+wx*0.18} y={by+row*wy+wy*0.2}
          width={wx*0.55} height={wy*0.48} rx={0.4}
          fill={lit?winLit:winDark} opacity={lit?1:0.45}/>;
      })
    );
  }

  // ── Glass facade overlay ──────────────────────────────
  function GlassRect({x,y,w,h,id,flip=false}){
    return(
      <>
        <defs>
          <linearGradient id={id} x1={flip?"1":"0"} y1="0" x2={flip?"0":"1"} y2="0">
            <stop offset="0%"   stopColor={glassHigh} stopOpacity="0.75"/>
            <stop offset="45%"  stopColor={glassTint} stopOpacity="0.5"/>
            <stop offset="100%" stopColor="rgba(0,0,0,0)" stopOpacity="0"/>
          </linearGradient>
        </defs>
        <rect x={x} y={y} width={w} height={h} fill={`url(#${id})`}/>
      </>
    );
  }

  // ─── PETRONAS TWIN TOWERS ────────────────────────────
  // Centred at x=580 (T1) and x=726 (T2) — skybridge at ~55% height
  function PetronasTowers(){
    const floors=Array.from({length:38},(_,i)=>i);
    const SETBACKS=[
      {y:50,w:56},{y:58,w:54},{y:68,w:52},{y:80,w:50},{y:94,w:48},
      {y:110,w:46},{y:128,w:44},{y:148,w:42},{y:170,w:40},
    ];

    function Tower({cx,side}){
      const r=rng(side==="L"?71:83);
      const gid=`ptg${side}`, rfid=`ptrf${side}`, sgid=`pts${side}`;
      const x=cx-28;
      return(
        <g>
          <defs>
            <linearGradient id={gid} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor={amb>0.5?"#1A2C4A":"#070D1C"}/>
              <stop offset="48%"  stopColor={amb>0.5?"#253660":"#0C1630"}/>
              <stop offset="100%" stopColor={amb>0.5?"#0E1C34":"#060C18"}/>
            </linearGradient>
            <linearGradient id={rfid} x1={side==="L"?"0":"1"} y1="0" x2={side==="L"?"1":"0"} y2="0">
              <stop offset="0%"   stopColor={glassHigh} stopOpacity="0.82"/>
              <stop offset="38%"  stopColor={glassTint} stopOpacity="0.55"/>
              <stop offset="100%" stopColor="rgba(0,0,0,0)" stopOpacity="0"/>
            </linearGradient>
            <linearGradient id={sgid} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor={amb>0.4?"#2A3C5A":"#090E1C"}/>
              <stop offset="100%" stopColor={amb>0.4?"#142030":"#050A14"}/>
            </linearGradient>
          </defs>

          {/* Night ambient base glow */}
          {isNight&&<ellipse cx={cx} cy={358} rx={70} ry={12}
            fill="rgba(80,130,255,0.08)" style={{filter:"blur(10px)"}}/>}

          {/* Podium */}
          <rect x={x-16} y={330} width={88} height={36} fill={fg} rx={1}/>
          <rect x={x-10} y={322} width={76} height={12} fill={mg} rx={1}/>
          <rect x={x+4}  y={314} width={48} height={10} fill={mg} rx={0.5}/>

          {/* Main shaft — 8-sided approximated with layered rects */}
          {/* Core body */}
          <rect x={x}   y={68}  width={56} height={268} fill={`url(#${gid})`}/>
          {/* Chamfered sides */}
          <polygon points={`${x},68 ${x+8},60 ${x+8},336 ${x},336`}
            fill={amb>0.5?"#162038":"#060C1C"} opacity="0.7"/>
          <polygon points={`${x+56},68 ${x+48},60 ${x+48},336 ${x+56},336`}
            fill={amb>0.5?"#162038":"#060C1C"} opacity="0.5"/>

          {/* Glass curtain wall */}
          <rect x={x} y={68} width={28} height={268} fill={`url(#${rfid})`} opacity={0.8}/>

          {/* Floor spandrel bands */}
          {floors.map(i=>(
            <rect key={i} x={x} y={68+i*7.25} width={56} height={0.7}
              fill={amb>0.45?"rgba(80,130,200,0.35)":"rgba(40,80,160,0.58)"}/>
          ))}

          {/* Windows */}
          <Wins bx={x+2} by={70} bw={52} bh={263} seed={side==="L"?71:83}/>

          {/* Setback crown sections */}
          {SETBACKS.map((s,i)=>(
            <g key={i}>
              <rect x={cx-s.w/2} y={s.y-8} width={s.w} height={10}
                fill={`url(#${sgid})`}
                stroke={amb>0.4?"rgba(60,100,180,0.25)":"rgba(30,60,130,0.5)"}
                strokeWidth={0.4}/>
            </g>
          ))}

          {/* Pointed crown */}
          {[40,32,26,20,14,8].map((w,i)=>(
            <rect key={i} x={cx-w/2} y={42-i*8} width={w} height={10}
              fill={`url(#${sgid})`}/>
          ))}

          {/* Spire */}
          <rect x={cx-2.5} y={2}  width={5} height={42} fill={amb>0.4?"#2A3C5E":"#0A1228"}/>
          <rect x={cx-1.5} y={0}  width={3} height={8}  fill={amb>0.4?"#344A72":"#0C1430"}/>
          <line x1={cx} y1={0} x2={cx} y2={4} stroke={amb>0.4?"#8AAAC8":"#507090"} strokeWidth="1.5"/>

          {/* Aviation light */}
          <motion.circle cx={cx} cy={2} r={2.8} fill="rgba(255,48,48,0.96)"
            animate={{opacity:[1,0.08,1]}}
            transition={{duration:2,repeat:Infinity,delay:side==="L"?0:0.55}}/>
          {isNight&&<ellipse cx={cx} cy={2} rx={9} ry={9}
            fill="rgba(255,48,48,0.22)" style={{filter:"blur(5px)"}}/>}

          {/* Ringed ornament rings (between setbacks) */}
          {[44,54,64].map((ry,i)=>(
            <ellipse key={i} cx={cx} cy={ry}
              rx={SETBACKS[i]?SETBACKS[i].w/2+2:22} ry={3}
              fill="none"
              stroke={amb>0.45?"rgba(80,120,200,0.4)":"rgba(40,70,150,0.6)"}
              strokeWidth="0.6"/>
          ))}
        </g>
      );
    }

    // Skybridge
    const bx1=647+28, bx2=793-28;
    return(
      <g>
        <Tower cx={647} side="L"/>
        <Tower cx={793} side="R"/>

        {/* Skybridge */}
        <rect x={bx1} y={210} width={bx2-bx1} height={14} rx={3}
          fill={amb>0.45?"#1A2A46":"#080E1C"}
          stroke={amb>0.45?"rgba(80,120,200,0.35)":"rgba(40,70,150,0.55)"}
          strokeWidth="0.6"/>
        <rect x={bx1+4} y={212} width={bx2-bx1-8} height={4} rx={1}
          fill={glassTint} opacity={0.5}/>
        <rect x={bx1} y={209} width={bx2-bx1} height={2}
          fill={amb>0.4?"rgba(100,150,220,0.3)":"rgba(80,130,220,0.5)"}/>
        {/* Skybridge arch supports */}
        <rect x={bx1+8}  y={209} width={6} height={20} rx={1} fill={amb>0.4?"#1E3050":"#0A1222"}/>
        <rect x={bx2-14} y={209} width={6} height={20} rx={1} fill={amb>0.4?"#1E3050":"#0A1222"}/>
        {isNight&&<rect x={bx1} y={210} width={bx2-bx1} height={14}
          fill="rgba(100,150,255,0.08)" rx={3} style={{filter:"blur(3px)"}}/>}
      </g>
    );
  }

  // ─── KL TOWER (Menara KL) ─────────────────────────────
  function KLTower(){
    const tx=507;
    return(
      <g>
        <defs>
          <linearGradient id="kltg" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor={amb>0.5?"#192840":"#080E1C"}/>
            <stop offset="50%"  stopColor={amb>0.5?"#22334E":"#0C1428"}/>
            <stop offset="100%" stopColor={amb>0.5?"#0E1C30":"#060C18"}/>
          </linearGradient>
          <linearGradient id="kltrf" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor={glassTint} stopOpacity="0.85"/>
            <stop offset="55%"  stopColor={glassHigh} stopOpacity="0.5"/>
            <stop offset="100%" stopColor="rgba(0,0,0,0)" stopOpacity="0"/>
          </linearGradient>
        </defs>

        {/* Base on hill */}
        <ellipse cx={tx} cy={355} rx={40} ry={8} fill={fg} opacity="0.9"/>
        <rect x={tx-28} y={310} width={56} height={48} fill={fg} rx={2}/>
        <rect x={tx-22} y={300} width={44} height={14} fill={mg} rx={1}/>

        {/* Tapered shaft */}
        <polygon points={`${tx-10},300 ${tx+10},300 ${tx+7},175 ${tx-7},175`}
          fill="url(#kltg)"/>
        <polygon points={`${tx-10},300 ${tx-2},300 ${tx-2},175 ${tx-10},300`}
          fill="url(#kltrf)" opacity="0.6"/>
        {/* Shaft ribs */}
        {Array.from({length:12},(_,i)=>(
          <rect key={i} x={tx-10+i*0.15} y={175+i*10.5} width={20-i*0.3} height={0.6}
            fill={amb>0.4?"rgba(70,110,180,0.3)":"rgba(40,70,140,0.55)"}/>
        ))}

        {/* Observation bulge */}
        <ellipse cx={tx} cy={168} rx={32} ry={28} fill="url(#kltg)"
          stroke={amb>0.4?"rgba(80,130,200,0.45)":"rgba(40,80,160,0.65)"} strokeWidth="0.8"/>
        <ellipse cx={tx} cy={162} rx={27} ry={14} fill={glassTint} opacity={0.55}/>
        {/* Observation deck windows */}
        {Array.from({length:8},(_,i)=>{
          const angle=(i/8)*Math.PI*2;
          const wx=tx+Math.cos(angle)*22, wy=168+Math.sin(angle)*18;
          return<rect key={i} x={wx-4} y={wy-4} width={8} height={7} rx={1}
            fill={isNight?"rgba(255,215,145,0.85)":(amb>0.7?glassTint:"rgba(180,220,255,0.5)")}/>;
        })}
        {isNight&&<ellipse cx={tx} cy={168} rx={40} ry={34}
          fill="rgba(100,155,255,0.1)" style={{filter:"blur(8px)"}}/>}

        {/* Neck */}
        <rect x={tx-6} y={140} width={12} height={30} fill="url(#kltg)"/>

        {/* Upper antenna mast sections */}
        <rect x={tx-4}   y={90}  width={8}  height={52} fill={amb>0.4?"#1E2E4A":"#080E1C"}/>
        <rect x={tx-2.5} y={44}  width={5}  height={48} fill={amb>0.4?"#243456":"#0A1228"}/>
        <rect x={tx-1.5} y={18}  width={3}  height={28} fill={amb>0.4?"#2A3A62":"#0C1430"}/>
        <rect x={tx-0.8} y={4}   width={1.6}height={16} fill={amb>0.4?"#8AACC8":"#507090"}/>

        {/* Dishes */}
        <ellipse cx={tx} cy={92} rx={10} ry={4} fill={mg}/>
        <ellipse cx={tx} cy={88} rx={8}  ry={3} fill={amb>0.4?"#1A2840":"#06101E"}/>

        {/* Aviation lights */}
        <motion.circle cx={tx} cy={4} r={2.5} fill="rgba(255,50,50,0.96)"
          animate={{opacity:[1,0.08,1]}} transition={{duration:2.3,repeat:Infinity,delay:0.9}}/>
        {isNight&&<ellipse cx={tx} cy={4} rx={8} ry={8}
          fill="rgba(255,50,50,0.2)" style={{filter:"blur(4px)"}}/>}
        {isNight&&<ellipse cx={tx} cy={340} rx={50} ry={10}
          fill="rgba(80,130,255,0.07)" style={{filter:"blur(10px)"}}/>}
      </g>
    );
  }

  // ─── EXCHANGE 106 (tallest in KL after Petronas) ──────
  function Exchange106(){
    const x=877, w=60, h=300;
    const r=rng(106);
    return(
      <g>
        <defs>
          <linearGradient id="ex6g" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor={amb>0.5?"#18283E":"#070D1C"}/>
            <stop offset="55%"  stopColor={amb>0.5?"#223044":"#0B1528"}/>
            <stop offset="100%" stopColor={amb>0.5?"#0E1C30":"#060C18"}/>
          </linearGradient>
          <linearGradient id="ex6rf" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor={glassHigh} stopOpacity="0.78"/>
            <stop offset="42%"  stopColor={glassTint} stopOpacity="0.52"/>
            <stop offset="100%" stopColor="rgba(0,0,0,0)" stopOpacity="0"/>
          </linearGradient>
        </defs>
        {/* Tapered main shaft */}
        <polygon points={`${x},${365-h} ${x+w},${365-h} ${x+w+6},365 ${x-6},365`}
          fill="url(#ex6g)"/>
        <polygon points={`${x},${365-h} ${x+w*0.42},${365-h} ${x+w*0.42+4},365 ${x-6},365`}
          fill="url(#ex6rf)" opacity="0.8"/>
        {/* Spandrels */}
        {Array.from({length:Math.floor(h/8)},(_,i)=>(
          <line key={i} x1={x} y1={365-h+i*8} x2={x+w} y2={365-h+i*8}
            stroke={amb>0.4?"rgba(70,115,185,0.32)":"rgba(40,75,150,0.56)"} strokeWidth="0.6"/>
        ))}
        <Wins bx={x+2} by={365-h+2} bw={w-4} bh={h-4} seed={106}/>
        {/* Crown step */}
        <rect x={x+8} y={365-h-8} width={w-16} height={10} fill={amb>0.4?"#1A2840":"#080E1C"} rx={1}/>
        <rect x={x+16} y={365-h-18} width={w-32} height={12} fill={amb>0.4?"#1A2840":"#080E1C"} rx={1}/>
        <motion.circle cx={x+w/2} cy={365-h-18} r={2.5} fill="rgba(255,48,48,0.95)"
          animate={{opacity:[1,0.08,1]}} transition={{duration:2,repeat:Infinity,delay:0.4}}/>
        {isNight&&<ellipse cx={x+w/2} cy={365-h/2} rx={50} ry={h*0.45}
          fill="rgba(80,125,255,0.06)" style={{filter:"blur(14px)"}}/>}
      </g>
    );
  }

  // ─── MENARA TELEKOM ───────────────────────────────────
  function MenaraTelekom(){
    const x=377, w=52, h=258;
    const r=rng(55);
    return(
      <g>
        <defs>
          <linearGradient id="mtg" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor={amb>0.5?"#1A2C46":"#07101C"}/>
            <stop offset="100%" stopColor={amb>0.5?"#0E1C32":"#060C18"}/>
          </linearGradient>
        </defs>
        {/* Bamboo-shoot tapered profile */}
        <polygon points={`${x+8},${365-h} ${x+w-8},${365-h} ${x+w},365 ${x},365`}
          fill="url(#mtg)"/>
        <rect x={x} y={365-h} width={w*0.4} height={h} fill={glassTint} opacity={0.48}/>
        {/* Horizontal bands (bamboo segments) */}
        {Array.from({length:10},(_,i)=>(
          <rect key={i} x={x} y={365-h+i*(h/10)} width={w} height={3}
            fill={amb>0.4?"#1E3050":"#080E1C"} opacity="0.8"/>
        ))}
        {Array.from({length:Math.floor(h/13)},(_,i)=>(
          <rect key={i} x={x} y={365-h+i*13} width={w} height={0.6}
            fill={amb>0.4?"rgba(70,115,185,0.3)":"rgba(40,75,150,0.55)"}/>
        ))}
        <Wins bx={x+2} by={365-h+4} bw={w-4} bh={h-8} seed={55}/>
        {/* Dome cap */}
        <ellipse cx={x+w/2} cy={365-h} rx={w/2+4} ry={16}
          fill={amb>0.4?"#1A2840":"#07101C"}/>
        <ellipse cx={x+w/2} cy={365-h-8} rx={w/2+2} ry={10}
          fill={amb>0.4?"#1E2F4A":"#090F1E"}/>
        <motion.circle cx={x+w/2} cy={365-h-12} r={2.3} fill="rgba(255,48,48,0.95)"
          animate={{opacity:[1,0.08,1]}} transition={{duration:2,repeat:Infinity,delay:1.5}}/>
        {isNight&&<ellipse cx={x+w/2} cy={365-h/2} rx={42} ry={h*0.42}
          fill="rgba(80,125,255,0.06)" style={{filter:"blur(13px)"}}/>}
      </g>
    );
  }

  // ─── MENARA MAXIS ─────────────────────────────────────
  function MenaraMaxis(){
    const x=291, w=46, h=218;
    return(
      <g>
        <defs>
          <linearGradient id="mmg" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor={amb>0.5?"#182840":"#06101C"}/>
            <stop offset="100%" stopColor={amb>0.5?"#0E1C2E":"#050A16"}/>
          </linearGradient>
        </defs>
        <rect x={x} y={365-h} width={w} height={h} fill="url(#mmg)"/>
        <rect x={x} y={365-h} width={w*0.4} height={h} fill={glassTint} opacity={0.45}/>
        {Array.from({length:Math.floor(h/13)},(_,i)=>(
          <rect key={i} x={x} y={365-h+i*13} width={w} height={0.6}
            fill={amb>0.4?"rgba(70,115,185,0.3)":"rgba(40,75,150,0.55)"}/>
        ))}
        <Wins bx={x+2} by={365-h+2} bw={w-4} bh={h-4} seed={44}/>
        <rect x={x-4} y={365-h-6}  width={w+8} height={8}  fill={amb>0.4?"#1E3050":"#080E1C"} rx={1}/>
        <rect x={x+6} y={365-h-18} width={w-12} height={14} fill={amb>0.4?"#1A2840":"#07101C"} rx={1}/>
        <motion.circle cx={x+w/2} cy={365-h-18} r={2.2} fill="rgba(255,48,48,0.94)"
          animate={{opacity:[1,0.08,1]}} transition={{duration:2,repeat:Infinity,delay:0.7}}/>
        {isNight&&<ellipse cx={x+w/2} cy={365-h/2} rx={38} ry={h*0.42}
          fill="rgba(80,125,255,0.06)" style={{filter:"blur(12px)"}}/>}
      </g>
    );
  }

  // ─── MENARA AFFIN / IQ CITY TOWERS ───────────────────
  function ModernTower({x,h,w,seed,flip=false,avDelay=0}){
    const r=rng(seed);
    const gid=`mt${x}`, rfid=`mtr${x}`;
    return(
      <g>
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor={amb>0.5?"#182844":"#071020"}/>
            <stop offset="55%"  stopColor={amb>0.5?"#223456":"#0C1832"}/>
            <stop offset="100%" stopColor={amb>0.5?"#0E1C30":"#060C18"}/>
          </linearGradient>
          <linearGradient id={rfid} x1={flip?"1":"0"} y1="0" x2={flip?"0":"1"} y2="0">
            <stop offset="0%"   stopColor={glassHigh} stopOpacity="0.75"/>
            <stop offset="44%"  stopColor={glassTint} stopOpacity="0.5"/>
            <stop offset="100%" stopColor="rgba(0,0,0,0)" stopOpacity="0"/>
          </linearGradient>
        </defs>
        <rect x={x} y={365-h} width={w} height={h} fill={`url(#${gid})`}/>
        <rect x={x} y={365-h} width={w*0.42} height={h} fill={`url(#${rfid})`} opacity={0.8}/>
        {Array.from({length:Math.floor(h/13)},(_,i)=>(
          <rect key={i} x={x} y={365-h+i*13} width={w} height={0.55}
            fill={amb>0.4?"rgba(70,110,185,0.3)":"rgba(40,70,150,0.54)"}/>
        ))}
        {/* Stepped crown */}
        {[h,h*0.75,h*0.48,h*0.22].map((sh,i)=>
          i>0?<rect key={i} x={x+(w*(i*0.06))} y={365-sh} width={w*(1-i*0.12)} height={5}
            fill={amb>0.4?"#182840":"#070F1E"} opacity="0.85" rx={0.5}/>:null
        )}
        <Wins bx={x+2} by={365-h+2} bw={w-4} bh={h-4} seed={seed}/>
        {/* Rooftop */}
        <rect x={x+w*0.28} y={365-h-10} width={w*0.44} height={12} fill={mg} rx={1}/>
        <rect x={x+w*0.38} y={365-h-20} width={w*0.24} height={12} fill={mg} rx={1}/>
        <motion.circle cx={x+w/2} cy={365-h-20} r={2.2} fill="rgba(255,48,48,0.94)"
          animate={{opacity:[1,0.08,1]}} transition={{duration:2,repeat:Infinity,delay:avDelay}}/>
        {isNight&&<ellipse cx={x+w/2} cy={365-h/2} rx={w*0.8} ry={h*0.42}
          fill="rgba(80,125,255,0.06)" style={{filter:"blur(13px)"}}/>}
      </g>
    );
  }

  // ─── Pavilion KL / KLCC Mall podium (low rise) ────────
  function MallPodium(){
    return(
      <g>
        <rect x={571} y={316} width={298} height={50} fill={mg} rx={1}/>
        <rect x={579} y={308} width={282} height={12} fill={fg} rx={0.5}/>
        {/* Entrance canopies */}
        {[597,667,747,807].map((cx,i)=>(
          <g key={i}>
            <rect x={cx} y={302} width={28} height={8} fill={amb>0.4?"#1E3050":"#080E1C"} rx={0.5}/>
            <rect x={cx+2} y={302} width={24} height={3} fill={glassTint} opacity={0.5}/>
          </g>
        ))}
        {/* Roof detail */}
        <rect x={577} y={308} width={282} height={2} fill={amb>0.4?"rgba(100,160,230,0.2)":"rgba(80,130,220,0.15)"}/>
      </g>
    );
  }

  // ─── Background city mass ──────────────────────────────
  const bgB=[
    {x:0,  y:260,w:42,h:105},{x:44, y:248,w:50,h:117},{x:96, y:255,w:38,h:110},
    {x:136,y:242,w:58,h:123},{x:196,y:258,w:36,h:107},{x:234,y:252,w:40,h:113},
    {x:880,y:258,w:46,h:107},{x:928,y:244,w:58,h:121},{x:988,y:252,w:44,h:113},
    {x:1034,y:238,w:64,h:127},{x:1100,y:250,w:50,h:115},{x:1152,y:240,w:68,h:125},
    {x:1222,y:254,w:48,h:111},{x:1272,y:244,w:60,h:121},{x:1334,y:256,w:42,h:109},
    {x:1378,y:248,w:62,h:117},
  ];
  // Mid buildings
  const midB=[
    {x:52, y:282,w:32,h:83,s:11},{x:150,y:278,w:38,h:87,s:22},
    {x:252,y:286,w:30,h:79,s:33},{x:290,y:290,w:26,h:75,s:44},
    {x:870,y:284,w:34,h:81,s:55},{x:950,y:280,w:38,h:85,s:66},
    {x:1060,y:282,w:34,h:83,s:77},{x:1180,y:278,w:40,h:87,s:88},
    {x:1300,y:282,w:44,h:83,s:99},{x:1360,y:286,w:38,h:79,s:21},
  ];

  return(
    <svg viewBox="0 0 1440 380" preserveAspectRatio="xMidYMax meet"
      style={{width:"100%",display:"block",position:"absolute",bottom:0,left:0}}>
      <defs>
        <linearGradient id="groundFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={fg} stopOpacity="0"/>
          <stop offset="65%"  stopColor={fg} stopOpacity="0.9"/>
          <stop offset="100%" stopColor={fg}/>
        </linearGradient>
        <linearGradient id="atmoHaze" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%"   stopColor={tod.fogColor} stopOpacity="0"/>
          <stop offset="100%" stopColor={tod.fogColor} stopOpacity={tod.fogOpacity}/>
        </linearGradient>
      </defs>

      {/* Atmospheric depth haze */}
      <rect x={0} y={0} width={1440} height={380} fill="url(#atmoHaze)" opacity={0.38}/>

      {/* Far background buildings */}
      {bgB.map((b,i)=>{
        const br=rng(i*7+3);
        const wc=Math.max(2,Math.floor(b.w/12));
        const wr=Math.max(2,Math.floor(b.h/15));
        return(
          <g key={`bg${i}`} opacity={0.7+amb*0.15}>
            <rect x={b.x} y={b.y} width={b.w} height={b.h} fill={bg}/>
            {Array.from({length:wr},(_,row)=>
              Array.from({length:wc},(_,col)=>{
                const lit=br()<(tod.windowLit+(isNight?0.42:0));
                return<rect key={`${row}-${col}`}
                  x={b.x+2+col*(b.w/wc)} y={b.y+3+row*(b.h/wr)}
                  width={b.w/wc*0.55} height={b.h/wr*0.5} rx={0.4}
                  fill={lit?winLit:winDark} opacity={lit?0.82:0.38}/>;
              })
            )}
          </g>
        );
      })}

      {/* Mid buildings */}
      {midB.map((b,i)=>{
        const mr=rng(b.s);
        return(
          <g key={`mid${i}`}>
            <rect x={b.x} y={b.y} width={b.w} height={b.h} fill={mg}/>
            <rect x={b.x} y={b.y} width={b.w*0.44} height={b.h} fill={glassTint} opacity={0.42}/>
            {Array.from({length:Math.floor(b.h/14)},(_,row)=>
              Array.from({length:Math.floor(b.w/11)},(_,col)=>{
                const lit=mr()<(tod.windowLit+(isNight?0.5:0));
                return<rect key={`${row}-${col}`}
                  x={b.x+2+col*10} y={b.y+3+row*13} width={7} height={7} rx={0.4}
                  fill={lit?winLit:winDark} opacity={lit?1:0.38}/>;
              })
            )}
          </g>
        );
      })}

      {/* ── Signature KL Buildings (front-to-back layering) ── */}

      {/* Flanking modern towers — far left */}
      <ModernTower x={197} h={188} w={44} seed={13} avDelay={1.2}/>
      <ModernTower x={247} h={162} w={40} seed={27} flip avDelay={0.6}/>

      {/* Flanking — far right */}
      <ModernTower x={1015} h={195} w={50} seed={38} avDelay={1.6}/>
      <ModernTower x={1071} h={172} w={44} seed={49} flip avDelay={0.3}/>
      <ModernTower x={1127} h={210} w={56} seed={61} avDelay={2.1}/>

      {/* Menara Maxis */}
      <MenaraMaxis/>

      {/* Menara Telekom */}
      <MenaraTelekom/>

      {/* KL Tower — on slight hill, left of centre */}
      <KLTower/>

      {/* Exchange 106 — right side */}
      <Exchange106/>

      {/* Additional prominent towers */}
      <ModernTower x={943} h={238} w={58} seed={74} avDelay={0.9}/>

      {/* KLCC Mall podium */}
      <MallPodium/>

      {/* ── PETRONAS TWIN TOWERS (centrepiece) ── */}
      <PetronasTowers/>

      {/* Coastal/city ground plane */}
      <rect x={0} y={355} width={1440} height={30} fill="url(#groundFade)"/>

      {/* Horizon atmospheric haze */}
      <rect x={0} y={295} width={1440} height={70} fill={tod.fogColor} opacity={tod.fogOpacity*0.2}/>

      {/* Night city ambient glow pools */}
      {isNight&&<>
        <ellipse cx={647} cy={352} rx={160} ry={18}
          fill="rgba(80,130,255,0.09)" style={{filter:"blur(12px)"}}/>
        <ellipse cx={793} cy={352} rx={160} ry={18}
          fill="rgba(80,130,255,0.09)" style={{filter:"blur(12px)"}}/>
        <ellipse cx={507} cy={350} rx={80}  ry={12}
          fill="rgba(80,130,255,0.07)" style={{filter:"blur(10px)"}}/>
        <ellipse cx={907} cy={352} rx={120} ry={15}
          fill="rgba(80,130,255,0.07)" style={{filter:"blur(11px)"}}/>
      </>}
    </svg>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function Home(){
  const containerRef=useRef(null);
  const [todIndex,setTodIndex]=useState(0);
  const [prevIndex,setPrevIndex]=useState(null);
  const [progress,setProgress]=useState(0);   // 0→1 within current scene
  const [fading,setFading]=useState(false);    // true during crossfade

  const{scrollYProgress}=useScroll({target:containerRef,offset:["start start","end start"]});
  const cloudsX    =useTransform(scrollYProgress,[0,1],[0,-60]);
  const buildingsY =useTransform(scrollYProgress,[0,1],[0,55]);
  const textY      =useTransform(scrollYProgress,[0,1],[0,40]);
  const contentY   =useTransform(scrollYProgress,[0,1],[0,-28]);
  const bgY        =useTransform(scrollYProgress,[0,1],[0,45]);

  // ── Timer: tracks progress and triggers crossfade at end ──────────────────
  useEffect(()=>{
    let elapsed=0;
    const total=TOD[todIndex].duration;
    const tick=50;
    const FADE_MS=2000; // 2 s crossfade window before scene ends

    const timer=setInterval(()=>{
      elapsed+=tick;
      setProgress(Math.min(elapsed/total,1));

      if(elapsed>=total-FADE_MS && !fading){
        // Begin crossfade: mark prev scene, flag fading
        setPrevIndex(todIndex);
        setFading(true);
      }

      if(elapsed>=total){
        clearInterval(timer);
        setTodIndex(p=>(p+1)%TOD.length);
        setProgress(0);
        setFading(false);
        setPrevIndex(null);
      }
    },tick);
    return()=>clearInterval(timer);
  },[todIndex]); // eslint-disable-line

  const tod=TOD[todIndex];
  const prevTod=prevIndex!=null?TOD[prevIndex]:null;
  const isNight=tod.id==="night"||tod.id==="bluehour";
  const skyGrad=(()=>{
    const stops=tod.sky.map((c,i)=>`${c} ${tod.skyStops[i]}`);
    return`linear-gradient(180deg,${stops.join(",")})`;
  })();
  const textColor=tod.ambientLight>0.45?"rgba(255,255,255,0.97)":"rgba(225,238,255,0.97)";
  const subColor =tod.ambientLight>0.45?"rgba(255,255,255,0.72)":"rgba(195,218,255,0.72)";
  const gold     =isNight?"#90AAEE":(tod.id==="dawn"||tod.id==="sunset")?"#F0B860":"#D4A84E";
  const scrollTo =(id)=>document.getElementById(id)?.scrollIntoView({behavior:"smooth"});

  return(
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Jost:wght@200;300;400;500;600&display=swap');
        .kl2*{box-sizing:border-box;}
        .tod-pip{width:5px;height:5px;border-radius:50%;background:rgba(255,255,255,0.28);cursor:pointer;transition:all .35s;border:none;padding:0;}
        .tod-pip.active{background:rgba(255,255,255,0.92);transform:scale(1.6);}
        .cta-p{display:inline-flex;align-items:center;gap:9px;padding:13px 26px;border-radius:12px;border:none;cursor:pointer;
          font-family:'Jost',sans-serif;font-size:12px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;
          transition:all .3s;color:#0A1228;}
        .cta-p:hover{transform:translateY(-2px);filter:brightness(1.08);}
        .cta-g{display:inline-flex;align-items:center;gap:9px;padding:13px 26px;border-radius:12px;cursor:pointer;
          font-family:'Jost',sans-serif;font-size:12px;font-weight:400;letter-spacing:.1em;text-transform:uppercase;
          transition:all .3s;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.22);
          backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);color:#fff;}
        .cta-g:hover{background:rgba(255,255,255,0.15);transform:translateY(-2px);}
        .stat-i{display:flex;flex-direction:column;align-items:center;}
        .divdr{width:1px;height:28px;background:rgba(255,255,255,0.22);}
      `}</style>

      <section ref={containerRef} className="kl2 relative w-full overflow-hidden"
        style={{height:"100vh",minHeight:680}}>

        {/* SKY — current scene */}
        <motion.div className="absolute inset-0"
          style={{background:skyGrad,y:bgY,zIndex:1,transition:"background 3.5s ease"}}/>

        {/* CROSSFADE OVERLAY — previous scene fades out over 2s */}
        {prevTod&&fading&&(()=>{
          const prevStops=prevTod.sky.map((c,i)=>`${c} ${prevTod.skyStops[i]}`);
          const prevGrad=`linear-gradient(180deg,${prevStops.join(",")})`;
          return(
            <motion.div className="absolute inset-0 pointer-events-none"
              style={{background:prevGrad,y:bgY,zIndex:2}}
              initial={{opacity:1}} animate={{opacity:0}}
              transition={{duration:2,ease:"easeInOut"}}/>
          );
        })()}

        {/* STARS */}
        <StarsLayer opacity={tod.starOpacity}/>

        {/* SUN */}
        <div className="absolute inset-0 pointer-events-none" style={{zIndex:3}}>
          <Sun tod={tod}/>
        </div>

        {/* MOON */}
        <Moon opacity={tod.moonOpacity}/>

        {/* CLOUDS */}
        <CloudLayer tod={tod} scrollX={cloudsX}/>

        {/* BLOOM */}
        <div className="absolute inset-0 pointer-events-none" style={{zIndex:11,
          background:`radial-gradient(ellipse 65% 40% at ${tod.bloomPos},${tod.bloomColor} 0%,transparent 72%)`,
          transition:"all 3.5s ease"}}/>

        {/* SKYLINE z=22 */}
        <motion.div className="absolute inset-0 pointer-events-none"
          style={{zIndex:22,y:buildingsY}}
          initial={{opacity:0,y:60}} animate={{opacity:1,y:0}}
          transition={{duration:2.5,ease:[0.22,1,0.36,1]}}>
          <KLSkylineLayer tod={tod}/>
        </motion.div>

        {/* WATERMARK z=18 — sits BEHIND skyline (z=22) so towers overlap it */}
        <motion.div className="absolute inset-0 flex items-end justify-center pointer-events-none"
          style={{zIndex:18,y:textY}} initial={{opacity:0}} animate={{opacity:1}}
          transition={{duration:3.5,delay:1.2}}>
          <div style={{
            fontFamily:"'Cormorant Garamond',serif",
            fontSize:"clamp(72px,16vw,220px)",
            fontWeight:700,
            letterSpacing:".18em",
            color:"white",
            opacity:0.07,
            lineHeight:1,
            paddingBottom:"8rem",
            userSelect:"none",
            whiteSpace:"nowrap",
          }}>
            MALAYSIA
          </div>
        </motion.div>

        {/* HERO CONTENT z=40 — vertically centred upper portion */}
        <motion.div className="absolute inset-0 flex items-center justify-center px-6"
          style={{zIndex:40,y:contentY}}>
          <div style={{textAlign:"center",maxWidth:760}}>

            {/* Welcome heading */}
            <motion.div initial={{opacity:0,y:14}} animate={{opacity:1,y:0}}
              transition={{duration:.8,delay:.35}}
              style={{fontFamily:"'Jost',sans-serif",
                fontSize:"clamp(12px,1.4vw,16px)",
                fontWeight:300,letterSpacing:".38em",textTransform:"uppercase",
                color:subColor,marginBottom:14,transition:"color 2.5s ease"}}>
              Welcome to&nbsp;
              <span style={{fontWeight:700,color:gold,letterSpacing:".22em",
                fontSize:"clamp(14px,1.7vw,20px)",transition:"color 2.5s ease"}}>
                Sree Step Management
              </span>
            </motion.div>

            {/* Badge — below welcome, above headline */}
            <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}}
              transition={{duration:.8,delay:.5}}
              style={{display:"inline-flex",alignItems:"center",gap:8,marginBottom:22,
                padding:"6px 16px",borderRadius:40,
                background:`rgba(${isNight?"80,120,220":"190,150,60"},.12)`,
                border:`1px solid rgba(${isNight?"100,150,240":"210,170,80"},.24)`}}>
              <span style={{width:4,height:4,borderRadius:"50%",background:gold,display:"inline-block"}}/>
              <span style={{fontFamily:"'Jost',sans-serif",fontSize:10,fontWeight:500,
                letterSpacing:".2em",textTransform:"uppercase",color:gold}}>
                Est. 2005 · Kuala Lumpur, Malaysia
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 initial={{opacity:0,y:32}} animate={{opacity:1,y:0}}
              transition={{duration:1.1,delay:.6,ease:[0.22,1,0.36,1]}}
              style={{fontFamily:"'Cormorant Garamond',serif",
                fontSize:"clamp(34px,6vw,76px)",fontWeight:600,lineHeight:1.1,
                color:textColor,marginBottom:36,letterSpacing:"-.01em",
                textShadow:"0 4px 50px rgba(0,0,0,.45)",transition:"color 2.5s ease"}}>
              Connecting Global Talent
              <br/>
              <em style={{color:gold,fontStyle:"italic",transition:"color 2.5s ease",fontWeight:400}}>
                With Malaysia's Future.
              </em>
            </motion.h1>

            {/* CTAs */}
            <motion.div initial={{opacity:0,y:18}} animate={{opacity:1,y:0}}
              transition={{duration:.8,delay:.9}}
              style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:12,marginBottom:22}}>
              <button className="cta-p"
                style={{background:`linear-gradient(135deg,${
                  isNight?"#4268D0,#6A90E8":
                  (tod.id==="dawn"||tod.id==="sunset")?"#C47A20,#E8AA50":
                  "#B89030,#D4A84E"
                })`}}
                onClick={()=>scrollTo("services")}>
                Explore Services
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
              <button className="cta-g" onClick={()=>scrollTo("contact")}>Contact Us</button>
            </motion.div>

          </div>
        </motion.div>

        {/* STATS — behind scroll cue at very bottom, z=38 */}
        <motion.div className="absolute bottom-4 left-0 right-0 flex justify-center pointer-events-none"
          style={{zIndex:38}} initial={{opacity:0}} animate={{opacity:1}}
          transition={{duration:1,delay:1.5}}>
          <div style={{display:"flex",alignItems:"center",gap:26}}>
            {[["20+","Years"],["500+","Clients"],["15+","Countries"]].map(([num,lbl],i)=>(
              <>{i>0&&<div className="divdr" key={`dv${i}`}/>}
              <div className="stat-i" key={lbl}>
                <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:26,
                  fontWeight:700,color:gold,lineHeight:1,transition:"color 2.5s ease"}}>{num}</span>
                <span style={{fontFamily:"'Jost',sans-serif",fontSize:10.5,color:subColor,
                  letterSpacing:".2em",textTransform:"uppercase",marginTop:4}}>{lbl}</span>
              </div></>
            ))}
          </div>
        </motion.div>

        {/* TOD DOTS + PROGRESS BAR z=50 */}
        <motion.div className="absolute right-5 top-1/2 -translate-y-1/2 flex flex-col gap-3 items-center"
          style={{zIndex:50}} initial={{opacity:0}} animate={{opacity:1}}
          transition={{delay:2.2,duration:1}}>
          {TOD.map((t,i)=>(
            <div key={t.id} style={{display:"flex",alignItems:"center",gap:6}}>
              {/* Progress arc for active scene */}
              {i===todIndex?(
                <div style={{position:"relative",width:14,height:14}}>
                  <svg width="14" height="14" viewBox="0 0 14 14" style={{position:"absolute",top:0,left:0,transform:"rotate(-90deg)"}}>
                    <circle cx="7" cy="7" r="5" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5"/>
                    <circle cx="7" cy="7" r="5" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5"
                      strokeDasharray={`${2*Math.PI*5}`}
                      strokeDashoffset={`${2*Math.PI*5*(1-progress)}`}
                      strokeLinecap="round"
                      style={{transition:"stroke-dashoffset 0.1s linear"}}/>
                  </svg>
                  <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",
                    width:4,height:4,borderRadius:"50%",background:"rgba(255,255,255,0.95)"}}/>
                </div>
              ):(
                <button className={`tod-pip${i===todIndex?" active":""}`}
                  onClick={()=>{setTodIndex(i);setProgress(0);setFading(false);setPrevIndex(null);}}
                  title={t.label}
                  style={{width:5,height:5}}/>
              )}
            </div>
          ))}

        </motion.div>

        {/* SCROLL CUE z=50 */}
        <motion.div className="absolute bottom-6 left-1/2 flex flex-col items-center gap-1.5 cursor-pointer"
          style={{zIndex:50,transform:"translateX(-50%)"}}
          initial={{opacity:0}} animate={{opacity:1}}
          transition={{delay:2.4,duration:1}}
          onClick={()=>scrollTo("about")}>
          <motion.div animate={{y:[0,6,0]}} transition={{duration:1.7,repeat:Infinity}}>
            <svg width="15" height="15" fill="none" stroke="rgba(255,255,255,.38)"
              strokeWidth="1.5" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
          </motion.div>
        </motion.div>

        {/* BOTTOM VIGNETTE z=45 */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{zIndex:45,height:80}}>
          <div style={{height:"100%",
            background:`linear-gradient(0deg,${
              tod.ambientLight>0.35?"rgba(4,8,20,.7)":"rgba(1,2,8,.85)"
            } 0%,transparent 100%)`,
            transition:"background 3s ease"}}/>
        </div>

      </section>
    </>
  );
}