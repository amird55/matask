var categs=[];
var workers=[];
var mStones=[];
var all_tasks=[];
var mStoneStatus=[];
async function GetStatus(){
    let url="/T/TaskMStoneStatus";
    let response=await fetch(url);
    let reply=await response.json();
    mStoneStatus = reply.data;
    console.log("mStoneStatus=",mStoneStatus);
}
async function GetCateg(){
    let url="/C/";
    let response=await fetch(url);
    let reply=await response.json();
    console.log("reply=",reply);
    categs = reply.categ_by_id;
    console.log("categs=",categs);
}
async function GetWorkers(){
    let url="/W/";
    let response=await fetch(url);
    let reply=await response.json();
    workers = reply.worker_by_id;
    console.log("workers=",workers);
}
async function GetMileStones(){
    let url="/S/";
    let response=await fetch(url);
    let reply=await response.json();
    mStones = reply.data;
    // console.log(mStones);
    CreateTableHeader();
}
function CreateTableHeader() {
    let s = "";
    s+="<tr>";
    s+="    <th>המטלה</th>";
    s+="    <th>אחראי</th>";
    s+="    <th>תאריך יעד</th>";
    s+="    <th>אחוז התקדמות</th>";
    s+="    <th>קטגוריה</th>";
    for(let row of mStones) {
        s += "<th>";
        s += `${row.name}`;
        s += "</th>";
    }
    s+="</tr>";
    document.getElementById("mainHeader").innerHTML = s;
}
async function GetTasks(){
    let url="/T/";
    let response=await fetch(url);
    let reply=await response.json();
    all_tasks = reply.data;
    // console.log(all_tasks);
    CreateTableBody();
}
function CreateTableBody() {
    let s = "";
    for(let row of all_tasks) {
        let is_arsal = Number(row.is_arsal);
        let smart_due=(row.nice_due === "00-00-0000")?"":row.nice_due;
        s += (is_arsal === 1)?
            "<tr class='arsal'>" :
            "<tr>";
        s += `    <td class="lvl${row.Lvl}">${row.description}</td>`;
        s += `    <td>${workers[row.worker_id]}</td>`;
        s += `    <td>${smart_due}</td>`;
        s += `    <td>${row.progress_prcnt}</td>`;
        s += `    <td>${categs[row.categ_id]}</td>`;
        for (let stone of mStones) {
            let sValue="";
            let sCls="";
            // console.log("row.id,stone.id = ",row.id,stone.id);
            if((mStoneStatus[row.id] !== null)&&
                (mStoneStatus[row.id][stone.id] !== null)){
                switch (parseInt(mStoneStatus[row.id][stone.id])) {
                    case 1: sValue="כן";    sCls="green";   break;
                    case 2: sValue="לא";    sCls="red";     break;
                    case 3: sValue="חלקי";  sCls="yellow";  break;
                }
            }
            s += `<td class="${sCls}">`;
            s += `${sValue}`;
            s += "</td>";
        }
        s += "</tr>";
    }
    document.getElementById("mainTableData").innerHTML = s;
}
async function BuildPage() {
    await GetCateg();
    await GetStatus();
    await GetWorkers();
    await GetMileStones();
    await GetTasks();
}
BuildPage();
