export function ZonesPage({zones,setZones,notify}) {
  const [sel,setSel] = useState(null);
  const z = sel ? zones.find(z=>z.id===sel) : null;

  return (
    <div style={{overflowY:"auto",height:"100%",padding:24}}>
      <div style={{display:"grid",gridTemplateColumns:sel?"1fr 360px":"1fr",gap:16}}>
        <div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:14}}>
            {zones.map(zone=>{
              const type=zone.pct<20?"crit":zone.pct<35?"low":zone.valve?"irr":"ok";
              const badgeColor=type==="crit"?"red":type==="low"?"amber":type==="irr"?"blue":"green";
              return (
                <Card key={zone.id} style={{cursor:"pointer",transition:"all .2s",border:`${sel===zone.id?"2px":"1px"} solid ${sel===zone.id?T.green:T.border}`}}
                  onClick={()=>setSel(sel===zone.id?null:zone.id)}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                    <div>
                      <div style={{fontSize:18,fontWeight:700,color:T.charcoal}}>{zone.name}</div>
                      <div style={{fontSize:13,color:T.textMuted,marginTop:2}}>{zone.crop} · {zone.ha} ha</div>
                    </div>
                    <Badge color={badgeColor}>{zone.pct<20?"Critical":zone.pct<35?"Low":zone.valve?"Irrigating":"Optimal"}</Badge>
                  </div>

                  {/* Big moisture circle */}
                  <div style={{display:"flex",alignItems:"center",gap:20,marginBottom:16}}>
                    <div style={{position:"relative",width:70,height:70}}>
                      <svg width="70" height="70" viewBox="0 0 70 70">
                        <circle cx="35" cy="35" r="30" fill="none" stroke={T.border} strokeWidth="6"/>
                        <circle cx="35" cy="35" r="30" fill="none"
                          stroke={zone.pct<20?"#E24B4A":zone.pct<35?T.amber:zone.valve?T.blue:T.green}
                          strokeWidth="6" strokeLinecap="round"
                          strokeDasharray={`${2*Math.PI*30}`}
                          strokeDashoffset={`${2*Math.PI*30*(1-zone.pct/100)}`}
                          transform="rotate(-90 35 35)"/>
                      </svg>
                      <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:700,color:T.charcoal}}>{zone.pct}%</div>
                    </div>
                    <div style={{flex:1}}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                        <span style={{fontSize:12,color:T.textMuted}}>Temperature</span>
                        <span style={{fontSize:12,fontWeight:600,color:T.charcoal}}>{zone.temp}°C</span>
                      </div>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                        <span style={{fontSize:12,color:T.textMuted}}>Valve</span>
                        <span style={{fontSize:12,fontWeight:600,color:zone.valve?T.blue:T.charcoal}}>{zone.valve?"Open":"Closed"}</span>
                      </div>
                      <div style={{display:"flex",justifyContent:"space-between"}}>
                        <span style={{fontSize:12,color:T.textMuted}}>AI Forecast</span>
                        <span style={{fontSize:12,fontWeight:600,color:T.green}}>{FORECASTS[zone.id].conf}% conf.</span>
                      </div>
                    </div>
                  </div>

                  <div style={{display:"flex",gap:8}}>
                    <Btn onClick={e=>{e.stopPropagation();setZones(z=>z.map(z=>z.id===zone.id?{...z,valve:!z.valve}:z));notify(zone.valve?"⛔":"💧",`Zone ${zone.id} valve ${zone.valve?"closed":"opened"}`)}}
                      size="sm" variant={zone.valve?"danger":"secondary"} style={{flex:1,justifyContent:"center"}}>
                      {zone.valve?"Close Valve":"Open Valve"}
                    </Btn>
                    <Btn onClick={e=>{e.stopPropagation();setSel(zone.id)}} size="sm" variant="secondary" style={{flex:1,justifyContent:"center"}}>View Details</Btn>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Zone detail panel */}
        {z&&(
          <Card style={{position:"sticky",top:0,alignSelf:"flex-start"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
              <div style={{fontSize:18,fontWeight:700,fontFamily:"'DM Serif Display',serif",color:T.charcoal}}>{z.name} Detail</div>
              <span onClick={()=>setSel(null)} style={{cursor:"pointer",fontSize:18,color:T.textMuted}}>✕</span>
            </div>
            {/* Mini history chart */}
            <div style={{marginBottom:16}}>
              <div style={{fontSize:11,fontWeight:700,color:T.textMuted,textTransform:"uppercase",letterSpacing:".06em",marginBottom:8}}>24h Moisture History</div>
              <ResponsiveContainer width="100%" height={100}>
                <AreaChart data={HISTORY}>
                  <defs>
                    <linearGradient id={`g${z.id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={T.green} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={T.green} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" tick={{fontSize:8}} interval={5}/>
                  <YAxis tick={{fontSize:8}} domain={[0,100]}/>
                  <Tooltip contentStyle={{fontSize:11}}/>
                  <Area type="monotone" dataKey={z.id} stroke={T.green} fill={`url(#g${z.id})`} strokeWidth={2}/>
                </AreaChart>
              </ResponsiveContainer>
            </div>
            {/* AI Forecast */}
            <div style={{fontSize:11,fontWeight:700,color:T.textMuted,textTransform:"uppercase",letterSpacing:".06em",marginBottom:8}}>AI Forecast (6h)</div>
            <div style={{display:"flex",gap:4,marginBottom:14}}>
              {FORECASTS[z.id].vals.map((v,i)=>{
                const c=v<25?T.red:v<45?T.amber:T.green;
                return <div key={i} style={{flex:1,textAlign:"center",background:T.bgSoft,borderRadius:6,padding:"5px 2px",border:`1px solid ${T.border}`}}>
                  <div style={{fontSize:8,color:T.textMuted}}>{`+${i+1}h`}</div>
                  <div style={{fontSize:12,fontWeight:700,color:c}}>{v}%</div>
                </div>;
              })}
            </div>
            {/* Crop info */}
            <div style={{background:T.bgSoft,borderRadius:10,padding:"14px",fontSize:12}}>
              {[["Crop",z.crop],["Area",`${z.ha} hectares`],["Current Moisture",`${z.pct}%`],["Temperature",`${z.temp}°C`],["Valve Status",z.valve?"Open (Irrigating)":"Closed"],["AI Confidence",`${FORECASTS[z.id].conf}%`]].map(([k,v])=>(
                <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:`1px solid ${T.border}`}}>
                  <span style={{color:T.textMuted}}>{k}</span>
                  <span style={{fontWeight:600,color:T.charcoal}}>{v}</span>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}