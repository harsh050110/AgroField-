export  default function DashboardPage({zones,setZones,alerts,setAlerts,notify}) {
  const [selZone,setSelZone] = useState("A");
  const sel = zones.find(z=>z.id===selZone);
  const fc = FORECASTS[selZone];
  const avgMoisture = Math.round(zones.reduce((s,z)=>s+z.pct,0)/zones.length);
  const activeValves = zones.filter(z=>z.valve).length;

  const toggleValve = (id) => {
    setZones(z=>z.map(z=>z.id===id?{...z,valve:!z.valve}:z));
    const z = zones.find(z=>z.id===id);
    notify(z?.valve?"⛔":"💧",`Zone ${id} valve ${z?.valve?"closed":"opened"} manually`);
  };

  return (
    <div style={{overflowY:"auto",height:"100%",padding:24}}>
      {/* KPI row */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:20}}>
        <StatCard icon="💧" label="Avg Soil Moisture" value={`${avgMoisture}%`} sub="+4% vs yesterday" color={T.green}/>
        <StatCard icon="🚿" label="Water Used Today" value="142 kL" sub="38% below plan" color={T.blue}/>
        <StatCard icon="⚡" label="Active Valves" value={`${activeValves}/12`} sub={zones.filter(z=>z.valve).map(z=>z.id).join(", ")||"None"} color={T.amber}/>
        <StatCard icon="🤖" label="AI Accuracy (7d)" value="93%" sub="+2% this week" color={T.purple}/>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 340px",gap:16}}>
        {/* Left */}
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          {/* Zones grid */}
          <Card>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
              <div style={{fontSize:13,fontWeight:700,color:T.textMuted,textTransform:"uppercase",letterSpacing:".06em"}}>Field Zones</div>
              <span style={{fontSize:11,color:T.textMuted}}>Click zone for AI forecast</span>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
              {zones.map(z=>{
                const type = z.pct<20?"crit":z.pct<35?"low":z.valve?"Irrigating":"ok";
                const badgeColor = type==="crit"?"red":type==="low"?"amber":type==="Irrigating"?"blue":"green";
                return (
                  <div key={z.id} onClick={()=>setSelZone(z.id)}
                    style={{border:`${selZone===z.id?"2px":"1px"} solid ${selZone===z.id?T.green:T.border}`,borderRadius:10,padding:"10px 12px",cursor:"pointer",transition:"all .2s",background:selZone===z.id?T.greenPale:"#fff"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:4}}>
                      <div>
                        <div style={{fontSize:12,fontWeight:700,color:T.charcoal}}>{z.name}</div>
                        <div style={{fontSize:10,color:T.textMuted}}>{z.crop} · {z.ha} ha</div>
                      </div>
                      <Badge color={badgeColor}>{z.pct<20?"Critical":z.pct<35?"Low":z.valve?"Irrigating":"Optimal"}</Badge>
                    </div>
                    <ZoneStatusBar pct={z.pct} type={type}/>
                    <div style={{display:"flex",justifyContent:"space-between",marginTop:4}}>
                      <span style={{fontSize:10,color:T.textMuted}}>Moisture <b style={{color:T.charcoal}}>{z.pct}%</b></span>
                      <span style={{fontSize:10,color:T.textMuted}}>Temp <b style={{color:T.charcoal}}>{z.temp}°C</b></span>
                      <span style={{fontSize:10,color:T.textMuted}}>Valve <b style={{color:z.valve?T.blue:T.charcoal}}>{z.valve?"Open":"Closed"}</b></span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* AI Forecast panel */}
          <Card style={{background:T.greenPale,borderColor:T.greenLight}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
              <div style={{fontSize:13,fontWeight:700,color:T.greenDark}}>🤖 AI Forecast · Zone {selZone} — Next 6 Hours</div>
              <Badge color="green">{fc.conf}% confidence</Badge>
            </div>
            <div style={{display:"flex",gap:6,marginBottom:12}}>
              {fc.vals.map((v,i)=>{
                const cls = v<25?T.red:v<45?T.amber:T.green;
                const lbl = v<25?"Critical":v<45?"Monitor":"Good";
                return (
                  <div key={i} style={{flex:1,background:"#fff",borderRadius:8,padding:"7px 4px",textAlign:"center",border:`1px solid ${T.border}`}}>
                    <div style={{fontSize:9,color:T.textMuted}}>{`+${i+1}h`}</div>
                    <div style={{fontSize:15,fontWeight:700,color:cls,margin:"2px 0"}}>{v}%</div>
                    <div style={{fontSize:9,fontWeight:600,color:cls}}>{lbl}</div>
                  </div>
                );
              })}
            </div>
            <div style={{background:T.green,borderRadius:8,padding:"10px 14px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:8}}>
              <div style={{fontSize:11,color:"rgba(255,255,255,.9)",lineHeight:1.5}}>AI recommends: {fc.reco}</div>
              <button onClick={()=>notify("✅",`Irrigation accepted for Zone ${selZone}`)}
                style={{background:"rgba(255,255,255,.2)",color:"#fff",border:"1px solid rgba(255,255,255,.4)",borderRadius:6,padding:"5px 12px",fontSize:10,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap",fontFamily:"'DM Sans',sans-serif"}}>Accept ✓</button>
            </div>
          </Card>
        </div>

        {/* Right side */}
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          {/* Schedule */}
          <Card>
            <div style={{fontSize:12,fontWeight:700,color:T.textMuted,textTransform:"uppercase",letterSpacing:".06em",marginBottom:12}}>Today's Schedule</div>
            {[
              {time:"08:00",zone:"Zone E — Mango",dur:"45 min",status:"running"},
              {time:"09:15",zone:"Zone F — Onion",dur:"30 min",status:"running"},
              {time:"11:00",zone:"Zone C — Grapes",dur:"50 min",status:"running"},
              {time:"15:30",zone:"Zone A — Tomatoes",dur:"35 min",status:"ai"},
              {time:"17:00",zone:"Zone D — Wheat",dur:"40 min",status:"pending"},
            ].map((s,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 0",borderBottom:`1px solid ${T.border}`}}>
                <div style={{fontSize:11,fontWeight:700,color:T.charcoal,minWidth:40}}>{s.time}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:11,fontWeight:600,color:T.charcoal}}>{s.zone}</div>
                  <div style={{fontSize:10,color:T.textMuted}}>{s.dur}</div>
                </div>
                <Badge color={s.status==="running"?"green":s.status==="ai"?"purple":"gray"}>
                  {s.status==="running"?"Running":s.status==="ai"?"AI":"Pending"}
                </Badge>
              </div>
            ))}
          </Card>

          {/* Alerts */}
          <Card>
            <div style={{fontSize:12,fontWeight:700,color:T.textMuted,textTransform:"uppercase",letterSpacing:".06em",marginBottom:12}}>Live Alerts</div>
            {alerts.slice(0,4).map(a=>(
              <div key={a.id} style={{display:"flex",gap:8,padding:"7px 0",borderBottom:`1px solid ${T.border}`}}>
                <div style={{width:7,height:7,borderRadius:"50%",background:a.type==="crit"?"#E24B4A":a.type==="warn"?T.amber:T.green,marginTop:4,flexShrink:0}}/>
                <div>
                  <div style={{fontSize:11,color:T.charcoal,lineHeight:1.4}}>{a.msg}</div>
                  <div style={{fontSize:10,color:T.textMuted,marginTop:2}}>{a.time}</div>
                </div>
              </div>
            ))}
          </Card>

          {/* Quick controls */}
          <Card>
            <div style={{fontSize:12,fontWeight:700,color:T.textMuted,textTransform:"uppercase",letterSpacing:".06em",marginBottom:12}}>Quick Controls</div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              <Btn onClick={()=>{setZones(z=>z.map(z=>({...z,valve:false})));notify("⛔","All valves closed — manual override")}} variant="danger" style={{width:"100%",justifyContent:"center"}}>⛔ Close All Valves</Btn>
              <Btn onClick={()=>{setZones(z=>z.map(z=>({...z,valve:true})));notify("💧","Emergency irrigation — all valves open")}} variant="secondary" style={{width:"100%",justifyContent:"center",color:T.blue,borderColor:"#90bce8",background:T.bluePale}}>💧 Emergency Irrigate All</Btn>
              <Btn onClick={()=>notify("🤖","AI prediction refreshed successfully")} variant="secondary" style={{width:"100%",justifyContent:"center",color:T.greenMid,borderColor:T.greenLight,background:T.greenPale}}>🤖 Re-run AI Prediction</Btn>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}