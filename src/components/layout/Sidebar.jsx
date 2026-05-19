const NAV_ITEMS = [
  {id:"home",   icon:"🏠", label:"Home"},
  {id:"dash",   icon:"📊", label:"Dashboard"},
  {id:"zones",  icon:"🌿", label:"Field Zones"},
  {id:"ai",     icon:"🤖", label:"AI Engine"},
  {id:"analytics",icon:"📈",label:"Analytics"},
  {id:"schedule",icon:"⏱", label:"Schedule"},
  {id:"alerts", icon:"🔔", label:"Alerts"},
  {id:"settings",icon:"⚙️", label:"Settings"},
];

function Sidebar({page,setPage}) {
  const [collapsed,setCollapsed] = useState(false);
  return (
    <div style={{width:collapsed?64:220,background:T.greenDark,display:"flex",flexDirection:"column",transition:"width .25s",flexShrink:0,position:"relative",zIndex:10}}>
      {/* Logo */}
      <div style={{padding:"20px 16px",display:"flex",alignItems:"center",gap:12,borderBottom:`1px solid rgba(255,255,255,.1)`}}>
        <Logo size={36}/>
        {!collapsed&&<div>
          <div style={{fontFamily:"'DM Serif Display',serif",fontSize:18,color:"#fff",lineHeight:1}}>AgroMind</div>
          <div style={{fontSize:10,color:"rgba(255,255,255,.45)",marginTop:2}}>v1.0 · AI Irrigation</div>
        </div>}
      </div>
      {/* Nav items */}
      <nav style={{flex:1,padding:"12px 8px",overflowY:"auto"}}>
        {NAV_ITEMS.map(n=>(
          <div key={n.id} onClick={()=>setPage(n.id)}
            style={{display:"flex",alignItems:"center",gap:12,padding:"10px 12px",borderRadius:10,cursor:"pointer",marginBottom:2,transition:"all .15s",background:page===n.id?"rgba(29,158,117,.35)":"transparent",color:page===n.id?"#fff":"rgba(255,255,255,.6)"}}>
            <span style={{fontSize:18,flexShrink:0}}>{n.icon}</span>
            {!collapsed&&<span style={{fontSize:13,fontWeight:page===n.id?600:400}}>{n.label}</span>}
          </div>
        ))}
      </nav>
      {/* Collapse toggle */}
      <div onClick={()=>setCollapsed(p=>!p)}
        style={{padding:"16px",borderTop:`1px solid rgba(255,255,255,.1)`,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:collapsed?"center":"flex-end",color:"rgba(255,255,255,.4)",fontSize:18}}>
        {collapsed?"→":"←"}
      </div>
    </div>
  );
}