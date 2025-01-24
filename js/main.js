var mStones=[];
async function GetMileStones(){
    let url="/S/";
    let response=await fetch(url);
    let reply=await response.json();
    mStones = reply.data;
}
function CreateTableHeader(){

}