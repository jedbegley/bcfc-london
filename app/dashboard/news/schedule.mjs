export function londonInput(value){
 if(!value)return '';
 const parts=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/London',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(new Date(value));
 const p=Object.fromEntries(parts.map(x=>[x.type,x.value]));
 return `${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}`;
}
export function approvalISO(value){
 if(!value)return null;
 if(!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value))throw Error('Choose a valid UK date and time.');
 const base=Date.parse(`${value}:00Z`);
 const candidates=[base,base-3600000].filter(ms=>londonInput(new Date(ms).toISOString())===value);
 if(candidates.length!==1)throw Error('This UK clock-change time is missing or ambiguous. Choose another time.');
 return new Date(candidates[0]).toISOString();
}
