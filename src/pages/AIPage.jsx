export function AIPage({zones,notify}) {
  const [running,setRunning] = useState(false);
  const [accuracy,setAccuracy] = useState(93);
  const [selZone,setSelZone] = useState("A");

  const retrain = () => {
    setRunning(true);
    setTimeout(()=>{
      const newAcc = Math.min(99,accuracy + Math.round(Math.random()*2));
      setAccuracy(newAcc);
      setRunning(false);
      notify("🤖",`Model retrained — accuracy now ${newAcc}%`);
    },2500);
  };

  const pieData = [
    {name:"LSTM",value:45,color:T.green},
    {name:"XGBoost",value:28,color:T.blue},
    {name:"CNN",value:16,color:T.purple},
    {name:"RL Agent",value:11,color:T.amber},
  ];

  return (
    <div style={{overflowY:"auto",height:"100%",padding:24}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
        {/* Model overview */}
        <Card>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
            <div>
              <div style={{fontSize:18,fontWeight:700,color:T.charcoal,marginBottom:4}}>LSTM Prediction Model</div>
              <div style={{fontSize:13,color:T.textMuted}}>Time-series soil moisture forecasting</div>
            </div>
            <Badge color="green">{accuracy}% accuracy</Badge>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:20}}>
            {[{l:"Model Type",v:"LSTM (Deep Learning)"},{l:"Training Data",v:"24 months"},{l:"Prediction Window",v:"6 hours ahead"},{l:"Retrain Frequency",v:"Nightly"}].map(({l,v})=>(
              <div key={l} style={{background:T.bgSoft,borderRadius:8,padding:"10px 12px"}}>
                <div style={{fontSize:10,color:T.textMuted,marginBottom:3}}>{l}</div>
                <div style={{fontSize:13,fontWeight:600,color:T.charcoal}}>{v}</div>
              </div>
            ))}
          </div>
          <Btn onClick={retrain} style={{width:"100%",justifyContent:"center"}} size="md">
            {running?<span style={{animation:"spin 1s linear infinite",display:"inline-block"}}>⟳</span>:"🔄"} {running?"Retraining model...":"Retrain Model Now"}
          </Btn>
        </Card>

        {/* Model distribution */}
        <Card>
          <div style={{fontSize:16,fontWeight:700,color:T.charcoal,marginBottom:4}}>AI Model Breakdown</div>
          <div style={{fontSize:12,color:T.textMuted,marginBottom:16}}>Contribution to final irrigation decisions</div>
          <div style={{display:"flex",alignItems:"center",gap:20}}>
            <PieChart width={140} height={140}>
              <Pie data={pieData} cx={65} cy={65} innerRadius={40} outerRadius={65} dataKey="value">
                {pieData.map((entry,i)=><Cell key={i} fill={entry.color}/>)}
              </Pie>
            </PieChart>
            <div style={{flex:1}}>
              {pieData.map(p=>(
                <div key={p.name} style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                  <div style={{width:10,height:10,borderRadius:"50%",background:p.color,flexShrink:0}}/>
                  <div style={{flex:1}}>
                    <div style={{fontSize:12,fontWeight:600,color:T.charcoal}}>{p.name}</div>
                    <div style={{height:4,background:T.border,borderRadius:2,marginTop:2}}>
                      <div style={{height:4,borderRadius:2,width:`${p.value}%`,background:p.color}}/>
                    </div>
                  </div>
                  <div style={{fontSize:12,fontWeight:700,color:T.charcoal,minWidth:32,textAlign:"right"}}>{p.value}%</div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Zone prediction detail */}
      <Card style={{marginBottom:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <div style={{fontSize:16,fontWeight:700,color:T.charcoal}}>Zone-wise AI Predictions</div>
          <div style={{display:"flex",gap:6}}>
            {zones.map(z=>(
              <button key={z.id} onClick={()=>setSelZone(z.id)}
                style={{padding:"4px 12px",borderRadius:20,border:`1px solid ${selZone===z.id?T.green:T.border}`,background:selZone===z.id?T.greenPale:"#fff",color:selZone===z.id?T.greenMid:T.textMuted,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>
                {z.id}
              </button>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={FORECASTS[selZone].vals.map((v,i)=>({hour:`+${i+1}h`,predicted:v,threshold:40}))}>
            <CartesianGrid strokeDasharray="3 3" stroke={T.border}/>
            <XAxis dataKey="hour" tick={{fontSize:11}}/>
            <YAxis tick={{fontSize:11}} domain={[0,100]}/>
            <Tooltip contentStyle={{fontSize:12}}/>
            <Line type="monotone" dataKey="predicted" stroke={T.green} strokeWidth={2.5} dot={{r:4}} name="Predicted Moisture %"/>
            <Line type="monotone" dataKey="threshold" stroke={T.amber} strokeWidth={1.5} strokeDasharray="5 5" dot={false} name="Irrigation Threshold"/>
          </LineChart>
        </ResponsiveContainer>
        <div style={{marginTop:12,padding:"10px 14px",background:T.greenPale,borderRadius:8,fontSize:12,color:T.greenDark,fontWeight:500}}>
          🤖 AI Recommendation for Zone {selZone}: {FORECASTS[selZone].reco}
        </div>
      </Card>

      {/* Pipeline */}
      <Card>
        <div style={{fontSize:16,fontWeight:700,color:T.charcoal,marginBottom:16}}>AI Processing Pipeline</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:10,position:"relative"}}>
          <div style={{position:"absolute",top:"50%",left:"5%",right:"5%",height:2,background:T.border,transform:"translateY(-50%)"}}/>
          {[
            {icon:"📡",title:"Data Ingest",desc:"MQTT → TimescaleDB",color:T.blue},
            {icon:"🔧",title:"Feature Eng.",desc:"ETo, VPD, CWSI",color:T.amber},
            {icon:"🧠",title:"LSTM Inference",desc:"6h moisture forecast",color:T.purple},
            {icon:"⚖️",title:"Decision",desc:"Threshold + dose calc",color:T.green},
            {icon:"⚡",title:"Actuate",desc:"MQTT valve command",color:T.greenDark},
          ].map((s,i)=>(
            <div key={i} style={{textAlign:"center",position:"relative",zIndex:1}}>
              <div style={{width:50,height:50,borderRadius:"50%",background:s.color,color:"#fff",fontSize:22,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 10px",border:`3px solid #fff`,boxShadow:`0 0 0 2px ${s.color}`}}>{s.icon}</div>
              <div style={{fontSize:12,fontWeight:700,color:T.charcoal,marginBottom:3}}>{s.title}</div>
              <div style={{fontSize:10,color:T.textMuted}}>{s.desc}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}