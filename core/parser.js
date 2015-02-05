/**
 * Created by Dzhambulat on 05.02.2015.
 */

function Parser(){

}

Parser.prototype.CFG={
    S:['VS','C'],
    V:['let'],
    C:['I','I PM'],
    I:['id'],
    PM:['st'],
    VL:['I','st','num']
}

Parser.prototype.first=function(nt)
{
    var cands=[];
    cands.push.apply(cands,this.CFG[nt]);
    var terms=[];

    var i=0;
    while (cands.length>0)
    {
        var cand=cands[0];
        cands.splice(i,1);

        var fs=cand.charCodeAt(0);
        if(fs>=97 && fs<=122)
        {
            terms.push(cand[0].match(/([a-z]+)/)[1]); // get terminal
        }
        else
        {
            cands.unshift.apply(cands,this.CFG[cand[0]]);
        }
    }

    return terms;
}