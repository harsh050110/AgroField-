export function AnalyticsPage() {
  return (
    <div style={{overflowY:"auto",height:"100%",padding:24}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:20}}>
        <StatCard icon="💧" label="Total Water This Week" value="1,035 kL" sub="↓ 22% vs last week" color={T.blue}/>
        <StatCard icon="🌱" label="Avg Yield Index" value="87/100" sub="↑ 12 pts this season" color={T.green}/>
        <StatCard icon="💰" label="Est. Water Cost Saved" value="₹42,800" sub="This month" color={T.amber}/>
        <StatCard icon="📉" label="Water Waste Reduced" value="38%" sub="vs conventional" color={T.purple}/>
      </div>

      {/* Weekly usage chart */}
      <Card style={{marginBottom:16}}>
        <div style={{fontSize:16,fontWeight:700,color:T.charcoal,marginBottom:4}}>Weekly Water Usage</div>
        <div style={{fontSize:12,color:T.textMuted,marginBottom:16}}>Daily water used vs. planned (kL)</div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={WEEKLY}>
            <CartesianGrid strokeDasharray="3 3" stroke={T.border}/>
            <XAxis dataKey="day" tick={{fontSize:11}}/>
            <YAxis tick={{fontSize:11}}/>
            <Tooltip contentStyle={{fontSize:12}}/>
            <Bar dataKey="target" fill={T.border} name="Target (200 kL)" radius={[4,4,0,0]}/>
            <Bar dataKey="used" fill={T.green} name="Actual Used" radius={[4,4,0,0]}/>
            <Bar dataKey="saved" fill={T.greenLight} name="Saved" radius={[4,4,0,0]}/>
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        {/* Moisture trend */}
        <Card>
          <div style={{fontSize:16,fontWeight:700,color:T.charcoal,marginBottom:4}}>Soil Moisture Trends</div>
          <div style={{fontSize:12,color:T.textMuted,marginBottom:16}}>All zones · Last 24 hours</div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={HISTORY.filter((_,i)=>i%2===0)}>
              <CartesianGrid strokeDasharray="3 3" stroke={T.border}/>
              <XAxis dataKey="time" tick={{fontSize:9}} interval={3}/>
              <YAxis tick={{fontSize:9}} domain={[0,100]}/>
              <Tooltip contentStyle={{fontSize:11}}/>
              {["A","B","C","D","E","F"].map((z,i)=>(
                <Line key={z} type="monotone" dataKey={z} stroke={[T.green,T.blue,T.amber,T.red,T.purple,T.greenLight][i]} strokeWidth={1.5} dot={false} name={`Zone ${z}`}/>
              ))}
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Zone efficiency */}
        <Card>
          <div style={{fontSize:16,fontWeight:700,color:T.charcoal,marginBottom:4}}>Zone Water Efficiency</div>
          <div style={{fontSize:12,color:T.textMuted,marginBottom:16}}>Litres per kg yield (lower = better)</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={[
              {zone:"A",efficiency:2.1,target:2.5},
              {zone:"B",efficiency:2.4,target:2.5},
              {zone:"C",efficiency:1.9,target:2.5},
              {zone:"D",efficiency:2.8,target:2.5},
              {zone:"E",efficiency:2.2,target:2.5},
              {zone:"F",efficiency:3.1,target:2.5},
            ]} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke={T.border}/>
              <XAxis type="number" tick={{fontSize:10}}/>
              <YAxis dataKey="zone" type="category" tick={{fontSize:11}}/>
              <Tooltip contentStyle={{fontSize:11}}/>
              <Bar dataKey="efficiency" fill={T.green} radius={[0,4,4,0]} name="L/kg"/>
              <Bar dataKey="target" fill={T.border} radius={[0,4,4,0]} name="Target"/>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}