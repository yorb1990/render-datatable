const tagname = "r-td";
let datatable = {
    url:"",
    params: {
        columns:[],
        tablename:"",
        skip:0,
        limit:10,
        filters: {},
        nfilters: {}
    },
    data:{},
    message:"",
    charging:false,
    current:0,
    maxpage: 0    
}
let ydt = -1;
const isexistr=(field,value)=>{
    return field==undefined?value:field;
}
const isexistv=(field,value)=>{
    return field==undefined;
}
const StringFormat=(_String, _Items) =>{
    for (var index = 0; index < _Items.length; index++) {
        _String = _String.replace(new RegExp(this.escapeRegExp("{" + index + "}"), 'g'), _Items[index]);
    }
    return _String;
}
const start = () => {
    let index = 0;
    //customElements.define(tagname);
    for (let element of document.getElementsByTagName(tagname)) {
        if (element.getAttribute('y-dt') == undefined) {
            element.setAttribute('y-dt', index);
            ydt = index;
            if (element.getAttribute('stop') == undefined) {
                init(element.getAttribute('dt'), index);
            }
            break;
        } else {
            if (element.getAttribute('stop') == undefined ) {
                init(element.getAttribute('dt'), element.getAttribute('y-dt'));
            }
            break;
        }
        index++;
    }
}
const init=(dt,n)=>{
    if (dt != undefined) {
        if (typeof dt === 'string') {
            dt = JSON.parse(dt);
        }
        datatable.url = isexistr(dt.url, "/api/SearchUndefined");        
        if(dt.params!=undefined){
            datatable.params.columns=isexistr(dt.params.columns,[]);        
            datatable.params.tablename=isexistr(dt.params.tablename,"sistemas");        
            datatable.params.skip=isexistr(dt.params.skip,0);        
            datatable.params.limit=isexistr(dt.params.limit,0);        
            datatable.params.filters = isexistr(dt.params.filters, {});        
            datatable.params.nfilters = isexistr(dt.params.nfilters, {});                    
        }
        if (dt.options != undefined) {
            datatable.options = isexistr(dt.params.options, { title: "opciones", links: [{ text: "alert", func: function (obj) { console.log(obj); } }] });                    
        }
    }
    if (n != undefined) {
        ydt = n;
    }
    exec(0);
}
const draw = (dt, n) => {
    datatable = isexistr(dt, datatable);
    ydt = isexistr(n, ydt);
    let body = null;
    let index = 0;
    for (let element of document.getElementsByTagName(tagname)) {        
        index++;
        if (parseInt(element.getAttribute('y-dt')) == ydt) {
            body = element;            
            break;
        }        
    }    
    if(index==0){
        body=document.getElementById("r-td-"+ydt);
    }
    let content = document.createElement("div");
    if (datatable.charging) {
        content.innerText = datatable.message;
    } else {        
        let table = document.createElement("table");
        table.classList.add("table");
        let trh = document.createElement("tr");
        for (let col of datatable.params.columns) {
            if (col.show) {
                let th = document.createElement("th");
                let input = document.createElement('input');
                input.classList.add('form-control');
                if (datatable.params.filters != undefined) {
                    input.value = isexistr(datatable.params.filters[col.name],"");
                }
                input.style.display = "none";                
                input.onblur = () => {
                    if (datatable.params.filters == undefined) {
                        datatable.params.filters = {}; 
                    }
                    datatable.params.filters[col.name] = input.value;
                    input.style.display = "none";
                    exec(0);
                };
                th.onclick = () => {                    
                    input.style.display = "block";
                    input.focus();
                };
                th.innerText = isexistr(col.replace, col.name);
                th.appendChild(input);
                trh.appendChild(th);
            }
        }
        if (datatable.options != undefined) {
            let th = document.createElement("th");
            th.innerText = datatable.options.title;
            trh.appendChild(th);
        }
        table.appendChild(trh);
        for (let row of datatable.data.src) {
            let trd = document.createElement("tr");
            for (let col of datatable.params.columns) {
                if (col.show) {
                    let td = document.createElement("td");
                    td.innerText = row[col.name];
                    trd.appendChild(td);
                }
            }
            if (datatable.options != undefined) {
                let td = document.createElement("td");
                for (let opt of datatable.options.links) {                    
                    let link = document.createElement("a");
                    link.setAttribute("href", "#");
                    link.innerText = opt.text;
                    link.onclick = () => {
                        opt.func(row);
                    };
                    td.appendChild(link);
                }
                trd.appendChild(td);
            }
            table.appendChild(trd);
        }
        content.appendChild(table);
        if (datatable.maxpage > 1) {
            let buttons = document.createElement("div");
            let button = [];
            let buttonb = document.createElement("span");
            buttonb.classList.add("btn");
            buttonb.classList.add("btn-default");
            buttonb.innerText = "-";
            if (datatable.current > 0) {
                buttonb.onclick = () => {
                    exec(datatable.current - 1);
                }
            } else {
                buttonb.classList.add("disabled");
            }
            buttons.appendChild(buttonb)
            for (let i = 0; i < datatable.maxpage; i++) {
                button.push(document.createElement("span"));
                button[i].classList.add("btn");
                button[i].innerText = i + 1;
                if (datatable.current == i) {
                    button[i].classList.add("btn-primary");
                    button[i].classList.add("disabled");
                } else {
                    button[i].classList.add("btn-default");                    
                    button[i].onclick = () => {
                        exec(i);
                    }                    
                }
                buttons.appendChild(button[i]);
            }
            let buttonn = document.createElement("span");
            buttonn.classList.add("btn");
            buttonn.classList.add("btn-default");
            buttonn.innerText = "-";
            if (datatable.current < datatable.maxpage-1) {
                buttonn.onclick = () => {
                    exec(datatable.current + 1);
                }
            } else {
                buttonn.classList.add("disabled");
            }
            buttons.appendChild(buttonn)
            content.appendChild(buttons);
        }
    }
    if(body!=null){
        body.innerHTML = '';
        body.appendChild(content);
    }else{
        console.log(datatable);
    }
}
const exec=(c)=>{
    datatable.current = c;
    datatable.params.skip = datatable.params.limit * c;
    datatable.data = {};
    datatable.charging = true;
    datatable.message = "cargando . . .";
    draw();
    request()
        .then((data) => {
            datatable.data = data;
        })
        .catch((data) => {
            datatable.message = "error en la conexion";
        })
        .finally(() => {            
            if (datatable.data != undefined) {
                if (datatable.data.count > 0) {
                    if (datatable.params.columns.length == 0) {
                        setallcolumns(datatable.data.src);
                    }
                    datatable.maxpage = parseInt(datatable.data.count / datatable.params.limit);
                    datatable.maxpage += datatable.data.count % datatable.params.limit == 0 ? 0 : 1;
                    datatable.charging = false;
                } else {
                    datatable.message = "sin datos";
                }
            }
            console.log(datatable)
            draw();
        });           
}
const request = () => {
    return new Promise((resolve, reject ) => {
        let data;        
        fetch(datatable.url,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(datatable.params)
            })
            .then((res) => {
                resolve(res.json());                
            })
            .catch((res) => {
                //error
                reject(res);
            })
    });
}
const setallcolumns = (cols) => {
    datatable.params.columns = [];
    for (let col in cols[0]) {
        datatable.params.columns.push({ name: col, replace: col, show: true });
    }
}
const execn = (dt, c) => {
    datatable = isexistr(dt, datatable);
    return new Promise((resolve, reject) => {
        datatable.current = c;
        datatable.params.skip = datatable.params.limit * c;
        datatable.data = {};
        datatable.charging = true;
        datatable.message = "cargando . . .";
        request()
            .then((data) => {
                datatable.data = data;
            })
            .catch((data) => {
                datatable.message = "error en la conexion";
                reject(datatable);
            })
            .finally(() => {
                if (datatable.data != undefined) {
                    if (datatable.data.count > 0) {
                        if (datatable.params.columns.length == 0) {
                            setallcolumns(datatable.data.src);
                        }
                        datatable.maxpage = parseInt(datatable.data.count / datatable.params.limit);
                        datatable.maxpage += datatable.data.count % datatable.params.limit == 0 ? 0 : 1;
                        datatable.charging = false;
                    } else {
                        datatable.message = "sin datos";
                    }
                }
                resolve(datatable);
            });
    });
}
start();
export { init, draw, execn};