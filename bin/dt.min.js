const tagname="r-td";let datatable={url:"",params:{columns:[],tablename:"sistemas",skip:0,limit:10,filters:[],nfilters:[]},data:{},message:"",charging:!1,current:0,maxpage:0}
let ydt=-1;document.registerElement(tagname);const isexistr=(field,value)=>{return field==undefined?value:field}
const isexistv=(field,value)=>{return field==undefined}
const StringFormat=(_String,_Items)=>{for(var index=0;index<_Items.length;index++){_String=_String.replace(new RegExp(this.escapeRegExp("{"+index+"}"),'g'),_Items[index])}
return _String}
const start=()=>{let index=0;for(let element of document.getElementsByTagName(tagname)){if(element.getAttribute('y-dt')==undefined){element.setAttribute('y-dt',index);ydt=index;if(element.getAttribute('stop')==undefined){init(element.getAttribute('dt'),index)}
break}else{if(element.getAttribute('stop')==undefined){init(element.getAttribute('dt'),element.getAttribute('y-dt'))}
break}
index++}}
const init=(dt,n)=>{if(dt!=undefined){datatable.params=isexistr(dt.params,datatable.params)}
if(n!=undefined){ydt=n}
exec(0)}
const draw=()=>{let body=null;let index=0;for(let element of document.getElementsByTagName(tagname)){if(element.getAttribute('y-dt')==ydt){body=element;break}
index++}
let content=document.createElement("div");if(datatable.charging){content.innerText=datatable.message}else{let table=document.createElement("table");table.classList.add("table");let trh=document.createElement("tr");for(let col of datatable.params.columns){if(col.show){let th=document.createElement("th");th.innerText=col.name;trh.appendChild(th)}}
table.appendChild(trh);for(let row of datatable.data.src){let trd=document.createElement("tr");for(let col of datatable.params.columns){if(col.show){let td=document.createElement("td");td.innerText=row[col.name];trd.appendChild(td)}}
table.appendChild(trd)}
content.appendChild(table)}
if(body!=null){body.innerHTML='';body.appendChild(content)}else{console.log(datatable)}}
const exec=(c)=>{datatable.current=c;datatable.params.skip=datatable.params.limit*c;datatable.data={};datatable.charging=!0;datatable.message="cargando . . .";draw();Request().then((data)=>{datatable.data=data}).catch((data)=>{datatable.message="error en la conexion"}).finally(()=>{if(datatable.data.src!=undefined){if(datatable.data.count>0){if(datatable.params.columns.length==0){setallcolumns(datatable.data.src)}
datatable.maxpage=parseInt(datatable.data.count/datatable.params.limit);datatable.maxpage+=datatable.data.count%datatable.params.limit==0?0:1;datatable.charging=!1}else{message="sin datos"}}
draw()})}
const Request=()=>{return new Promise((resolve,reject)=>{let data;fetch(datatable.url,{headers:{'Content-Type':'application/json'},method:"POST",body:JSON.stringify(datatable.params)}).then((res)=>{resolve(res.json())}).catch((res)=>{reject(res)})})}
const setallcolumns=(cols)=>{datatable.params.columns=[];for(let col in cols[0]){datatable.params.columns.push({name:col,replace:col,show:!0})}}
start();export default init