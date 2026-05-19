export function HomePage({setPage}) {
  return (
    <div style={{overflowY:"auto",height:"100%"}}>
      {/* Hero */}
      <div style={{background:`linear-gradient(160deg,${T.greenDark} 0%,#1a4a38 45%,#0D2E20 100%)`,padding:"80px 60px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:"-10%",right:"-5%",width:500,height:500,background:"radial-gradient(circle,rgba(29,158,117,.2) 0%,transparent 70%)",borderRadius:"50%",pointerEvents:"none"}}/>
        <div style={{animation:"fadeUp .6s ease both"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(29,158,117,.25)",border:"1px solid rgba(29,158,117,.4)",color:T.greenLight,fontSize:12,fontWeight:600,padding:"6px 16px",borderRadius:40,marginBottom:24}}>
            <span style={{width:6,height:6,background:T.green,borderRadius:"50%",animation:"pulse 2s infinite"}}/>
            AI-Powered Precision Agriculture
          </div>
          <h1 style={{fontFamily:"'DM Serif Display',serif",fontSize:56,color:"#fff",lineHeight:1.08,marginBottom:20}}>
            Irrigation that<br/><em style={{color:T.greenLight}}>thinks for itself</em>
          </h1>
          <p style={{fontSize:18,color:"rgba(255,255,255,.65)",maxWidth:520,marginBottom:36,lineHeight:1.7}}>
            AgroMind uses LSTM AI and real-time soil sensors to automatically irrigate your crops at exactly the right time — saving water, boosting yield, zero manual effort.
          </p>
          <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
            <Btn onClick={()=>setPage("dash")} size="lg">📊 Open Dashboard</Btn>
            <Btn onClick={()=>setPage("ai")} size="lg" variant="ghost" style={{color:"#fff",borderColor:"rgba(255,255,255,.35)"}}>🤖 Explore AI Engine</Btn>
          </div>
        </div>
        {/* Stats row */}
        <div style={{display:"flex",gap:48,marginTop:60,flexWrap:"wrap"}}>
          {[{n:"50%",l:"Water Saved"},{n:"35%",l:"Yield Increase"},{n:"93%",l:"AI Accuracy"},{n:"~0h",l:"Manual Labor"}].map((s,i)=>(
            <div key={i} style={{textAlign:"center",animation:`fadeUp .6s ${.1+i*.1}s ease both`}}>
              <div style={{fontFamily:"'DM Serif Display',serif",fontSize:40,color:"#fff",lineHeight:1}}>{s.n}</div>
              <div style={{fontSize:12,color:"rgba(255,255,255,.5)",marginTop:4}}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features grid */}
      <div style={{padding:"60px",background:"#fff"}}>
        <div style={{fontSize:11,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:T.green,marginBottom:10}}>FEATURES</div>
        <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:36,color:T.charcoal,marginBottom:40}}>Everything your farm needs</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20}}>
          {[
            {icon:"🌱",title:"Real-time Zone Monitoring",desc:"Live soil moisture from every field zone updated every 15 minutes via IoT sensors."},
            {icon:"🤖",title:"LSTM AI Prediction",desc:"Deep learning forecasts soil moisture 6 hours ahead with 93% accuracy."},
            {icon:"⏱",title:"Automatic Scheduling",desc:"AI-generated irrigation plans accounting for crop type, weather, and growth stage."},
            {icon:"⚡",title:"Remote Valve Control",desc:"Open/close any zone valve instantly from the dashboard with auto-mode."},
            {icon:"🔔",title:"Smart Alerts",desc:"Instant SMS and app notifications for critical zones and sensor failures."},
            {icon:"📊",title:"Water Analytics",desc:"Weekly water usage reports, savings tracking, and yield correlations per zone."},
          ].map((f,i)=>(
            <div key={i} style={{background:T.bgSoft,border:`1px solid ${T.border}`,borderRadius:16,padding:"28px 24px",transition:"all .2s",cursor:"default"}}
              onMouseEnter={e=>e.currentTarget.style.cssText+=`;box-shadow:0 8px 32px rgba(13,92,58,.12);transform:translateY(-3px)`}
              onMouseLeave={e=>{e.currentTarget.style.boxShadow="none";e.currentTarget.style.transform="none"}}>
              <div style={{fontSize:28,marginBottom:14}}>{f.icon}</div>
              <div style={{fontSize:16,fontWeight:700,color:T.charcoal,marginBottom:8}}>{f.title}</div>
              <div style={{fontSize:13,color:T.textMuted,lineHeight:1.7}}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div style={{padding:"60px",background:T.greenDark,position:"relative",overflow:"hidden"}}>
        <div style={{fontSize:11,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:T.greenLight,marginBottom:10}}>HOW IT WORKS</div>
        <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:36,color:"#fff",marginBottom:48}}>5 steps, fully automated</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:16,position:"relative"}}>
          <div style={{position:"absolute",top:28,left:"10%",right:"10%",height:2,background:"rgba(29,158,117,.3)"}}/>
          {[
            {n:1,title:"Soil Sensors",desc:"ESP32 reads moisture every 15 min via LoRaWAN"},
            {n:2,title:"Feature Eng.",desc:"Computes ETo, VPD from weather + sensor data"},
            {n:3,title:"LSTM Model",desc:"Predicts moisture 6h ahead with 93% accuracy"},
            {n:4,title:"Decision Engine",desc:"Decides when, where & how much to irrigate"},
            {n:5,title:"Valve Control",desc:"MQTT command opens valve, closes at target"},
          ].map((s,i)=>(
            <div key={i} style={{textAlign:"center",position:"relative",zIndex:1}}>
              <div style={{width:56,height:56,borderRadius:"50%",background:T.green,color:"#fff",fontSize:20,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px",border:"3px solid rgba(29,158,117,.35)"}}>{s.n}</div>
              <div style={{fontSize:13,fontWeight:700,color:"#fff",marginBottom:6}}>{s.title}</div>
              <div style={{fontSize:11,color:"rgba(255,255,255,.5)",lineHeight:1.6}}>{s.desc}</div>
            </div>
          ))}
        </div>
        <div style={{marginTop:48,textAlign:"center"}}>
          <Btn onClick={()=>setPage("dash")} size="lg">Get Started →</Btn>
        </div>
      </div>
    </div>
  );
}