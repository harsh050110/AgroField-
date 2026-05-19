export function Topbar({page,setPage,zones,notif,setNotif}) {
  const [time,setTime]=useState(new Date());
  useEffect(()=>{const t=setInterval(()=>setTime(new Date()),30000);return()=>clearInterval(t)},[]);
  const critCount = zones.filter(z=>z.status==="Critical").length;
  return (
    <div style={{height:60,background:"#fff",borderBottom:`1px solid ${T.border}`,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 24px",flexShrink:0}}>
      <div style={{fontFamily:"'DM Serif Display',serif",fontSize:20,color:T.charcoal,textTransform:"capitalize"}}>{NAV_ITEMS.find(n=>n.id===page)?.label||"AgroMind"}</div>
      <div style={{display:"flex",alignItems:"center",gap:12}}>
        <div style={{fontSize:12,color:T.textMuted}}>{time.toLocaleDateString("en-IN",{weekday:"short",day:"numeric",month:"short"})} · {time.toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"})}</div>
        <div style={{display:"flex",alignItems:"center",gap:6,background:T.greenPale,border:`1px solid ${T.greenLight}`,borderRadius:20,padding:"4px 12px",fontSize:11,color:T.greenMid,fontWeight:600}}>
          <span style={{width:6,height:6,background:T.green,borderRadius:"50%",display:"inline-block",animation:"pulse 2s infinite"}}/>
          AI Active
        </div>
        {critCount>0&&<div onClick={()=>setPage("alerts")} style={{cursor:"pointer",background:T.redPale,border:`1px solid #f0a0a0`,borderRadius:20,padding:"4px 12px",fontSize:11,color:T.red,fontWeight:600}}>⚠ {critCount} Critical</div>}
        <div style={{width:34,height:34,borderRadius:"50%",background:T.greenDark,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer"}}>FM</div>
      </div>
    </div>
  );
}