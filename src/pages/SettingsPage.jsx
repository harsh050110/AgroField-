export function SettingsPage({notify}) {
  const [settings,setSettings] = useState({
    autoMode:true, smsAlerts:true, emailAlerts:false,
    critThreshold:20, lowThreshold:35,
    retrainFreq:"daily", farmName:"Greenfield Estates",
    totalHa:480, phone:"+91 98765 43210",
  });

  const toggle = (key) => setSettings(s=>({...s,[key]:!s[key]}));
  const set = (key,val) => setSettings(s=>({...s,[key]:val}));

  const save = () => notify("✅","Settings saved successfully");

  return (
    <div style={{overflowY:"auto",height:"100%",padding:24}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        {/* Farm profile */}
        <Card>
          <div style={{fontSize:16,fontWeight:700,color:T.charcoal,marginBottom:16}}>Farm Profile</div>
          {[{l:"Farm Name",k:"farmName",type:"text"},{l:"Total Area (ha)",k:"totalHa",type:"number"},{l:"Contact Phone",k:"phone",type:"text"}].map(({l,k,type})=>(
            <div key={k} style={{marginBottom:14}}>
              <label style={{fontSize:12,fontWeight:600,color:T.charcoal,marginBottom:5,display:"block"}}>{l}</label>
              <input type={type} value={settings[k]} onChange={e=>set(k,e.target.value)}
                style={{width:"100%",padding:"9px 12px",borderRadius:8,border:`1px solid ${T.border}`,fontSize:13,fontFamily:"'DM Sans',sans-serif",outline:"none"}}/>
            </div>
          ))}
        </Card>

        {/* Automation */}
        <Card>
          <div style={{fontSize:16,fontWeight:700,color:T.charcoal,marginBottom:16}}>Automation Settings</div>
          {[{l:"Auto Irrigation Mode",k:"autoMode",desc:"Let AI control all valves automatically"},{l:"SMS Alerts",k:"smsAlerts",desc:"Receive critical alerts via SMS"},{l:"Email Reports",k:"emailAlerts",desc:"Daily water usage summary by email"}].map(({l,k,desc})=>(
            <div key={k} style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16,paddingBottom:16,borderBottom:`1px solid ${T.border}`}}>
              <div>
                <div style={{fontSize:14,fontWeight:600,color:T.charcoal}}>{l}</div>
                <div style={{fontSize:12,color:T.textMuted}}>{desc}</div>
              </div>
              <div onClick={()=>toggle(k)} style={{width:44,height:24,borderRadius:12,background:settings[k]?T.green:T.border,cursor:"pointer",position:"relative",transition:"background .2s",flexShrink:0}}>
                <div style={{width:20,height:20,borderRadius:"50%",background:"#fff",position:"absolute",top:2,left:settings[k]?22:2,transition:"left .2s",boxShadow:"0 1px 4px rgba(0,0,0,.2)"}}/>
              </div>
            </div>
          ))}
        </Card>

        {/* Thresholds */}
        <Card>
          <div style={{fontSize:16,fontWeight:700,color:T.charcoal,marginBottom:16}}>Alert Thresholds</div>
          {[{l:`Critical threshold: ${settings.critThreshold}%`,k:"critThreshold",min:5,max:40,color:T.red},{l:`Low threshold: ${settings.lowThreshold}%`,k:"lowThreshold",min:20,max:60,color:T.amber}].map(({l,k,min,max,color})=>(
            <div key={k} style={{marginBottom:20}}>
              <label style={{fontSize:12,fontWeight:600,color:T.charcoal,marginBottom:8,display:"block"}}>{l}</label>
              <input type="range" min={min} max={max} value={settings[k]} onChange={e=>set(k,+e.target.value)} style={{width:"100%",accentColor:color}}/>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:T.textMuted,marginTop:3}}>
                <span>{min}%</span><span>{max}%</span>
              </div>
            </div>
          ))}
        </Card>

        {/* AI Model */}
        <Card>
          <div style={{fontSize:16,fontWeight:700,color:T.charcoal,marginBottom:16}}>AI Model Settings</div>
          <div style={{marginBottom:14}}>
            <label style={{fontSize:12,fontWeight:600,color:T.charcoal,marginBottom:5,display:"block"}}>Model Retraining</label>
            <select value={settings.retrainFreq} onChange={e=>set("retrainFreq",e.target.value)}
              style={{width:"100%",padding:"9px 12px",borderRadius:8,border:`1px solid ${T.border}`,fontSize:13,fontFamily:"'DM Sans',sans-serif",background:"#fff"}}>
              <option value="realtime">Real-time (continuous)</option>
              <option value="hourly">Hourly</option>
              <option value="daily">Daily (recommended)</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>
          <div style={{background:T.greenPale,borderRadius:8,padding:"12px 14px",fontSize:12,color:T.greenMid,lineHeight:1.6,marginTop:8}}>
            🧠 Current model: LSTM v4.2 · Trained on 24 months data · 93% accuracy · Last retrained 3h ago
          </div>
        </Card>
      </div>

      <div style={{marginTop:16,display:"flex",justifyContent:"flex-end",gap:10}}>
        <Btn variant="ghost" size="md">Cancel</Btn>
        <Btn onClick={save} size="md">💾 Save Settings</Btn>
      </div>
    </div>
  );
}
