export default function SchedulePage({zones,notify}) {
  const [schedules,setSchedules] = useState([
    {id:1,time:"08:00",zone:"E",dur:45,vol:22,status:"running",source:"ai"},
    {id:2,time:"09:15",zone:"F",dur:30,vol:15,status:"running",source:"manual"},
    {id:3,time:"11:00",zone:"C",dur:50,vol:28,status:"running",source:"ai"},
    {id:4,time:"15:30",zone:"A",dur:35,vol:18,status:"pending",source:"ai"},
    {id:5,time:"17:00",zone:"D",dur:40,vol:20,status:"pending",source:"manual"},
    {id:6,time:"06:00",zone:"B",dur:30,vol:14,status:"done",source:"ai"},
  ]);

  const [newTime,setNewTime] = useState("12:00");
  const [newZone,setNewZone] = useState("A");
  const [newDur,setNewDur] = useState(30);

  const addSchedule = () => {
    setSchedules(s=>[...s,{id:Date.now(),time:newTime,zone:newZone,dur:+newDur,vol:Math.round(newDur*.5),status:"pending",source:"manual"}]);
    notify("⏱",`Irrigation scheduled for Zone ${newZone} at ${newTime}`);
  };

  const deleteSchedule = (id) => {
    setSchedules(s=>s.filter(s=>s.id!==id));
    notify("🗑","Schedule removed");
  };

  return (
    <div style={{overflowY:"auto",height:"100%",padding:24}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 300px",gap:16}}>
        <Card>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
            <div style={{fontSize:18,fontWeight:700,fontFamily:"'DM Serif Display',serif",color:T.charcoal}}>Today's Irrigation Schedule</div>
            <div style={{fontSize:12,color:T.textMuted}}>Total: {schedules.reduce((s,x)=>s+x.vol,0)} kL planned</div>
          </div>
          {/* Timeline */}
          {["done","running","pending"].map(status=>(
            <div key={status} style={{marginBottom:20}}>
              <div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",color:T.textMuted,marginBottom:8,paddingLeft:28}}>
                {status==="done"?"Completed":status==="running"?"Currently Running":"Upcoming"}
              </div>
              {schedules.filter(s=>s.status===status).sort((a,b)=>a.time.localeCompare(b.time)).map(s=>{
                const zname = zones.find(z=>z.id===s.zone)?.crop||s.zone;
                return (
                  <div key={s.id} style={{display:"flex",alignItems:"center",gap:12,marginBottom:8}}>
                    <div style={{width:20,height:20,borderRadius:"50%",background:status==="done"?T.greenLight:status==="running"?T.green:T.border,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:status==="running"?"#fff":"transparent"}}>
                      {status==="running"&&"▶"}
                    </div>
                    <div style={{flex:1,display:"flex",alignItems:"center",gap:12,background:status==="running"?T.greenPale:"#fff",border:`1px solid ${status==="running"?T.greenLight:T.border}`,borderRadius:10,padding:"10px 14px"}}>
                      <div style={{fontSize:13,fontWeight:700,color:T.charcoal,minWidth:44}}>{s.time}</div>
                      <div style={{flex:1}}>
                        <div style={{fontSize:13,fontWeight:600,color:T.charcoal}}>Zone {s.zone} — {zname}</div>
                        <div style={{fontSize:11,color:T.textMuted}}>{s.dur} min · {s.vol} L/m²</div>
                      </div>
                      <Badge color={s.source==="ai"?"purple":"gray"}>{s.source==="ai"?"AI":"Manual"}</Badge>
                      {status!=="done"&&<span onClick={()=>deleteSchedule(s.id)} style={{cursor:"pointer",color:T.red,fontSize:16,opacity:.6}}>✕</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </Card>

        {/* Add schedule */}
        <Card style={{alignSelf:"flex-start"}}>
          <div style={{fontSize:16,fontWeight:700,color:T.charcoal,marginBottom:16}}>Add New Schedule</div>
          {[{l:"Zone",el:<select value={newZone} onChange={e=>setNewZone(e.target.value)} style={{width:"100%",padding:"8px 10px",borderRadius:8,border:`1px solid ${T.border}`,fontSize:13,fontFamily:"'DM Sans',sans-serif",background:"#fff"}}>
            {zones.map(z=><option key={z.id} value={z.id}>Zone {z.id} — {z.crop}</option>)}
          </select>},
          {l:"Time",el:<input type="time" value={newTime} onChange={e=>setNewTime(e.target.value)} style={{width:"100%",padding:"8px 10px",borderRadius:8,border:`1px solid ${T.border}`,fontSize:13,fontFamily:"'DM Sans',sans-serif"}}/>},
          {l:`Duration: ${newDur} min`,el:<input type="range" min={5} max={120} step={5} value={newDur} onChange={e=>setNewDur(e.target.value)} style={{width:"100%"}}/>},
          ].map(({l,el})=>(
            <div key={l} style={{marginBottom:14}}>
              <label style={{fontSize:12,fontWeight:600,color:T.charcoal,marginBottom:5,display:"block"}}>{l}</label>
              {el}
            </div>
          ))}
          <div style={{background:T.bgSoft,borderRadius:8,padding:"10px 12px",fontSize:11,color:T.textMuted,marginBottom:14}}>
            Est. water volume: <b style={{color:T.charcoal}}>{Math.round(newDur*.5)} L/m²</b>
          </div>
          <Btn onClick={addSchedule} style={{width:"100%",justifyContent:"center"}}>⏱ Add to Schedule</Btn>
        </Card>
      </div>
    </div>
  );
}