var workers=[];
var mStones=[];
var all_tasks=[];
async function GetWorkers(){
    let url="/W/";
    let response=await fetch(url);
    let reply=await response.json();
    workers = reply.worker_by_id;
    console.log(workers);
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
        let smart_due=(row.nice_due === "00-00-0000")?"":row.nice_due;
        s += "<tr>";
        s += `    <td>${row.description}</td>`;
        s += `    <td>${workers[row.worker_id]}</td>`;
        s += `    <td>${smart_due}</td>`;
        s += `    <td>${row.progress_prcnt}</td>`;
        s += `    <td>${row.categ_id}</td>`;
        for (let row of mStones) {
            s += "<td>";
            // s += `${row.name}`;
            s += "</td>";
        }
        s += "</tr>";
    }
    document.getElementById("mainTableData").innerHTML = s;
}

GetWorkers();
GetMileStones();
GetTasks();