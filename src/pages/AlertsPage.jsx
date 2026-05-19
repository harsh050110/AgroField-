export function AlertsPage({alerts,setAlerts,notify}) {
  const [filter,setFilter] = useState("all");
  const filtered = filter==="all"?alerts:alerts.filter(a=>a.type===filter);

  const dismiss = (id) => {
    setAlerts(a=>a.filter(a=>a.id!==id));
    notify("✓","Alert dismissed");
  };

  const dismissAll = () => {
    setAlerts([]);
    notify("✓","All alerts cleared");
  };

  return (
    <div style={{overflowY:"auto",height:"100%",padding:24}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginBottom:20}}>
        <StatCard icon="🔴" label="Critical Alerts" value={alerts.filter(a=>a.type==="crit").length} color={T.red}/>
        <StatCard icon="🟡" label="Warnings" value={alerts.filter(a=>a.type==="warn").length} color={T.amber}/>
        <StatCard icon="🟢" label="Info Alerts" value={alerts.filter(a=>a.type==="ok").length} color={T.green}/>
      </div>

      <Card>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <div style={{display:"flex",gap:6}}>
            {["all","crit","warn","ok"].map(f=>(
              <button key={f} onClick={()=>setFilter(f)}
                style={{padding:"5px 14px",borderRadius:20,border:`1px solid ${filter===f?T.green:T.border}`,background:filter===f?T.greenPale:"#fff",color:filter===f?T.greenMid:T.textMuted,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",textTransform:"capitalize"}}>
                {f==="crit"?"Critical":f==="warn"?"Warning":f==="ok"?"Info":"All"}
              </button>
            ))}
          </div>
          {alerts.length>0&&<Btn onClick={dismissAll} variant="ghost" size="sm">Clear All</Btn>}
        </div>

        {filtered.length===0?(
          <div style={{textAlign:"center",padding:"48px 0",color:T.textMuted}}>
            <div style={{fontSize:40,marginBottom:12}}>✅</div>
            <div style={{fontSize:16,fontWeight:600}}>No alerts</div>
            <div style={{fontSize:13}}>All systems operating normally</div>
          </div>
        ):filtered.map(a=>(
          <div key={a.id} style={{display:"flex",gap:14,padding:"14px 0",borderBottom:`1px solid ${T.border}`,animation:"slideIn .3s ease"}}>
            <div style={{width:36,height:36,borderRadius:"50%",background:a.type==="crit"?T.redPale:a.type==="warn"?T.amberPale:T.greenPale,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>
              {a.type==="crit"?"🔴":a.type==="warn"?"⚠️":"✅"}
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:14,color:T.charcoal,fontWeight:500,lineHeight:1.5}}>{a.msg}</div>
              <div style={{fontSize:12,color:T.textMuted,marginTop:4}}>{a.time}</div>
            </div>
            <Badge color={a.type==="crit"?"red":a.type==="warn"?"amber":"green"}>
              {a.type==="crit"?"Critical":a.type==="warn"?"Warning":"Info"}
            </Badge>
            <span onClick={()=>dismiss(a.id)} style={{cursor:"pointer",color:T.textLight,fontSize:18,lineHeight:1,alignSelf:"flex-start"}}>✕</span>
          </div>
        ))}
      </Card>
    </div>
  );
}