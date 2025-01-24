var mStones=[];
async function GetMileStones(){
    let url="/S/";
    let response=await fetch(url);
    let reply=await response.json();
    mStones = reply.data;
    console.log(mStones);
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
    s+="    <th>תיאור</th>";
    for(let row of mStones) {
        s += "<th>";
        s += `${row.name}`;
        s += "</th>";
    }
    s+="</tr>";
    document.getElementById("mainHeader").innerHTML = s;
}

GetMileStones();
