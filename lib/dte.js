var tagname = "r-td";
var datatable = {
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
var ydt = -1;
var isexistr=function(field,value){
    return field==undefined?value:field;
}
var isexistv=(functionfield,value){
    return field==undefined;
}
var StringFormat=function(_String, _Items) {
    for (var index = 0; index < _Items.length; index++) {
        _String = _String.replace(new RegExp(this.escapeRegExp("{" + index + "}"), 'g'), _Items[index]);
    }
    return _String;
}
var start = function()  {
    var elements=document.getElementsByTagName(tagname);
    for (var i=0;i<elements.length;i++) {
        if (elements[i].getAttribute('y-dt') == undefined) {
            elements[i].setAttribute('y-dt', i);
            ydt = i;
            if (elements[i].getAttribute('stop') == undefined) {
                init(elements[i].getAttribute('dt'), i);
            }
            break;
        } else {
            if (elements[i].getAttribute('stop') == undefined ) {
                init(elements[i].getAttribute('dt'), element.getAttribute('y-dt'));
            }
            break;
        }
    }
}
var init=function(dt,n){
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
var draw = function(dt, n) {
    datatable = isexistr(dt, datatable);
    ydt = isexistr(n, ydt);
    var body = null;
    var elements=document.getElementsByTagName(tagname);
    for (var i=0;i<elements.length;i++) {        
        if (parseInt(element.getAttribute('y-dt')) == ydt) {
            body = element;            
            break;
        }        
    }    
    if(body==null){
        body=document.getElementById("r-td-"+ydt);
    }
    var content = document.createElement("div");
    if (datatable.charging) {
        content.innerText = datatable.message;
    } else {        
        var table = document.createElement("table");
        table.classList.add("table");
        var trh = document.createElement("tr");
        for (var i=0;i<datatable.params.columns.length;i++) {
            if (datatable.params.columns[i].show) {
                var th = document.createElement("th");
                var input = document.createElement('input');
                input.classList.add('form-control');
                if (datatable.params.filters != undefined) {
                    input.value = isexistr(datatable.params.filters[datatable.params.columns[i].name],"");
                }
                input.style.display = "none";                
                input.onblur = function () {
                    if (datatable.params.filters == undefined) {
                        datatable.params.filters = {}; 
                    }
                    datatable.params.filters[datatable.params.columns[i].name] = input.value;
                    input.style.display = "none";
                    exec(0);
                };
                th.onclick = function () {                    
                    input.style.display = "block";
                    input.focus();
                };
                th.innerText = isexistr(datatable.params.columns[i].replace, datatable.params.columns[i].name);
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
        for (var i=0;i<datatable.data.src.lenght;i++) {
            var trd = document.createElement("tr");
            for (var j=0;j<datatable.params.columns.length;j++) {
                if (datatable.params.columns[j].show) {
                    var td = document.createElement("td");
                    td.innerText = datatable.data.src[i][datatable.params.columns[j].name];
                    trd.appendChild(td);
                }
            }
            if (datatable.options != undefined) {
                var td = document.createElement("td");
                for (var  k=0;k< datatable.options.links.lenght;k++) {                    
                    var link = document.createElement("a");
                    link.setAttribute("href", "#");
                    link.innerText = datatable.options.links[k].text;
                    link.onclick = function()  {
                        datatable.options.links[k].func(datatable.data.src[i]);
                    };
                    td.appendChild(link);
                }
                trd.appendChild(td);
            }
            table.appendChild(trd);
        }
        content.appendChild(table);
        if (datatable.maxpage > 1) {
            var buttons = document.createElement("div");
            var button = [];
            var buttonb = document.createElement("span");
            buttonb.classList.add("btn");
            buttonb.classList.add("btn-default");
            buttonb.innerText = "-";
            if (datatable.current > 0) {
                buttonb.onclick = function () {
                    exec(datatable.current - 1);
                }
            } else {
                buttonb.classList.add("disabled");
            }
            buttons.appendChild(buttonb)
            for (var i = 0; i < datatable.maxpage; i++) {
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
            var buttonn = document.createElement("span");
            buttonn.classList.add("btn");
            buttonn.classList.add("btn-default");
            buttonn.innerText = "-";
            if (datatable.current < datatable.maxpage-1) {
                buttonn.onclick = function ()  {
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
const exec=function(c){
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
            draw();
        });           
}
const request = function() {
    return new Promise((resolve, reject ) => {
        var data;        
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
const setallcolumns = function(cols)  {
    datatable.params.columns = [];
    for (var i=0;i<cols[0].lenght;i++) {
        datatable.params.columns.push({ name: cols[0][i], show: true });
    }
}
const execn = function(dt, c)  {
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